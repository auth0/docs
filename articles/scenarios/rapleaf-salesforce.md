# Tracking new leads in Salesforce, augmenting user profile with RapLeaf

Upon a signup of a new user to a website with any social credential, we want to:

1. __Augment the user profile__ with additional public information through [RapLeaf](http://www.rapleaf.com/).
2. Record the new signup as a __New Lead__ on [Salesforce](http://www.salesforce.com/) for follow-up.

Implementing this with Auth0 is very easy. You just need 2 [Rules](/rules) in your pipeline:

![](https://docs.google.com/drawings/d/1PFj7JsAZiQCCQaM7pN5c0Fi8UbMvfAMGjgt-_SdTC6Q/pub?w=850&amp;h=430)

### 1. Augment __User Profile__ with RapLeaf:

The 1st step is to obtain more information about this user using his email address. __RapLeaf__ provides an API to retrieve public information about a user using the email as input that is extremely easy to use. 

Once the call to RapLeaf completes, we store this additional information in a property called `rapLeafData`:

>Note we are ignoring certain conditions that exist in the API and only doing this when there's a successful call (`statusCode=200`). The entire rule is ignored if the user has already signed up (signaled by the `user.signedUp` property setup after recording a new lead in step 2 below).

```
function (user, context, callback) {

  if(user.signedUp) return callback(null,user,callback);

  var rapLeafAPIKey = 'YOUR RAPLEAF API KEY';

  if(user.email){
    request('https://personalize.rapleaf.com/v4/dr?email=' + 
            encodeURIComponent(user.email) + 
            '&api_key=' + rapLeafAPIKey, 
            function(e,r,b){  
              if(e) return callback(e);

              if(r.statusCode===200){
               user.rapLeafData = JSON.parse(b);
              }

              return callback(null,user,context);
            });
  }
  else {
    return callback(null,user,context);
  }
}
```

### 2. Create a __New Lead__ in Salesforce: 

In this second step we record the information as a __New Lead__ in Salesforce, so the sales department can followup. This __Rule__ has some interesting things:

1. The Salesforce REST API uses an OAuth `access_token`. We are using the OAuth2 `Resource Owner Password Credential Grant` to obtain such `access_token`. This is the `getToken` function that uses credentials as input as opposed to an `API-KEY` as the previous rule.
2. We are just recording the user name and a fixed company name. We could of course use anything available in the enriched user profile we obtained in step 1, to record more information, and have better context for the sales representative.
3. If everything went well, we use a __persistent__ property: `user.signedUp` and set it to `true`. So next time this same users logs in, these rules will be skipped.

```
function (user, context, callback) {

  if(user.signedUp) return callback(null, user, callback);

  getAccessToken(SFCOM_CLIENT_ID, SFCOM_CLIENT_SECRET, USERNAME, PASSWORD, 
            function(err, response){
                    if(err) return callback(err);

                    createLead(response.instance_url, response.access_token, function(err, result){
                        if(err) return callback(err);
              			    //Everyhting worked fine. We signal this signup was successful.
                        user.persistent.signedUp = true;
                        return callback(null, user, context);
                    });
                });
  
  function createLead(url, access_token, callback){

    //Just a few fields. The Lead object is much richer.
    var data = {
        LastName: user.name,
        Company: 'Web channel signups'
    };

    request.post({
        url: url + "/services/data/v20.0/sobjects/Lead/",
        headers: {
            "Authorization": "OAuth " + access_token,
            "Content-type": "application/json"
        },
        body: JSON.stringify(data)
        }, function(err, response, body){
            if(err) return callback(err);
            return callback(null,body);
        });
  }

  //Helper function to get an access_token from Salesforce
  function getAccessToken(client_id, client_secret, username, password, callback){
    request.post({
        url: 'https://login.salesforce.com/services/oauth2/token',
        form: {
            grant_type: 'password',
            client_id: client_id,
            client_secret: client_secret,
            username: username,
            password: password
        }}, function(e,r,b){
            if(e) return callback(e);
            return callback(null,JSON.parse(b));
        });
  }
}
```
That's it!

Check out our [repository of Auth0 Rules](https://github.com/auth0/rules) for more great examples:

* Rules for access control
* Integration with other services: [Firebase](http://firebase.com)
