# How to track __Sign-ups__, enrich __User Profile__ and generate new __Leads__

Upon a signup of a new user to a website with any social credential, we want to:

1. Record a __SignUp__ event on [MixPanel](https://mixpanel.com).
2. __Augment the user profile__ with additional public information through [FullContact](http://www.fullcontact.com/).
3. Record the new signup as a __New Lead__ on [Salesforce](http://www.salesforce.com/) for follow-up.

Implementing this with Auth0 is very easy. You just need 3 [Rules](/rules) in your pipeline:

![](https://docs.google.com/drawings/d/16Xz2h0OaNDyGUCmV_NCTjzL38jetrZEmDVdUBd9jJcA/pub?w=869&amp;h=377)

### 1. Recording a __SignUp__ in MixPanel:

This first rule checks whether the user has already signed up before or not. If the user has signed up, it simply skips everything. If not, it calls __MixPanel__ to record the event. In the example below we are simply using a property `application` that you can then use in MixPanel to filter information. But the full `context` and `user` properties are available as sources of more information (e.g. IP addresses, agent, etc.).

We also call this event `Sign Up`:

```
function (user, context, callback) {

  if(user.signedUp) return callback(null,user,context);

  var mixPanelEvent = {
    "event": "Sign Up",
    "properties": {
        "distinct_id": user.user_id,
        "token": YOUR_MIXPANEL_TOKEN,
        "application": context.clientName
    }
  };

  var base64Event = new Buffer(JSON.stringify(mixPanelEvent)).toString('base64');

  request('http://api.mixpanel.com/track/?data=' + base64Event,
           function(e,r,b){
              	if(e) return callback(e);
                return callback(null,user,context);
              });
}

```

### 2.Augment __User Profile__ with FullContact:

The 2nd step is to obtain more information about this user using his email address. __FullContact__ provides an API to retrieve public information about a user using the email as input. We store this additional information in a property called `fullContactInfo`:

>Note we are ignoring certain conditions that exist in the API and only doing this when there's a successful call (`statusCode=200`).

```
function (user, context, callback) {

  if(user.signedUp) return callback(null,user,context);

  var fullContactAPIKey = 'YOUR FULLCONTACT API KEY';

  if(user.email){
    request('https://api.fullcontact.com/v2/person.json?email=' + encodeURIComponent(user.email) + '&apiKey=' + fullContactAPIKey,
            function(e,r,b){
              if(e) return callback(e);
              if(r.statusCode===200){
                user.fullContactInfo = JSON.parse(b);
              }
              return callback(null, user, context);
            });
  }
  else{
    return callback(null, user, context);
  }
}
```

### 3.Create a __New Lead__ in Salesforce:

In the last step we record the information as a __New Lead__ in Salesforce, so the sales department can followup. This __Rule__ has some interesting things:

1. The Salesforce REST API uses an OAuth `access_token`. We are using the OAuth2 `Resource Owner Password Credential Grant` to obtain such `access_token`. This is the `getToken` function hat uses credentials as input as opposed to an `API-KEY` as the previous rules.
2. We are just recording the user name and a fixed company name. We would of course us anything available in the enriched user profile we obtained in step 2, to record more information and have better context for the sales representative.
3. If everything went well, we use a __persistent__ property: `user.signedUp` and set it to `true`. So next time this same users logs in, none of these rules will do anything.

```
function (user, context, callback) {

  if(user.signedUp) return callback(null,user,callback);

  getAccessToken(SFCOM_CLIENT_ID, SFCOM_CLIENT_SECRET, USERNAME, PASSWORD,
            function(e,r){
                    if( e ) return callback(e);

                    createLead(r.instance_url, r.access_token, function(e,result){
                        if(e) return callback(e);
              			    //Everyhting worked fine. We signal this signup was succesful.
                        user.persistent.signedUp = true;
                        return callback(null,user,context);
                    });
                });

  function createLead(url,access_token, callback){

    //Just a few fields. The Lead object is much richer
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
        }, function(e,r,b){
            if(e) return callback(e);
            return callback(null,b);
        });
  }

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

Check out our [repository of Auth0 Rules](https://github.com/auth0/rules) for more great examples:

* Rules for access control
* Integration with other services: [Firebase](http://firebase.com), [Rapleaf](http://rapleaf.com)
