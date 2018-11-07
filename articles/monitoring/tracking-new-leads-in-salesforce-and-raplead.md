---
description: How to track new leads in Salesforce and augment user profile with Towerdata.
topics:
  - monitoring
  - marketing
  - salesforce
  - towerdata
contentType:
  - how-to
useCase:
  - analyze-auth0-analytics
  - analyze-logs
  - analyze-external-analytics
  - integrate-analytics
---

# Tracking new leads in Salesforce, augmenting user profile with Towerdata

Upon a signup of a new user to a website with any social credential, we want to:

1. __Augment the user profile__ with additional public information through [RapLeaf](http://www.rapleaf.com/).
2. Record the new signup as a __New Lead__ on [Salesforce](http://www.salesforce.com/) for follow-up.

Implementing this with Auth0 is very easy. You just need 2 [Rules](/rules) in your pipeline:

![](/media/articles/tutorials/rapleaf-salesforce.png)

## 1. Augment User Profile with Towerdata

The 1st step is to obtain more information about this user using their email address. Towerdata provides an API to retrieve public information about a user using the email as input that is extremely easy to use.

Once the call to Towerdata completes, we store this additional information in a property called `towerdata`:

:::note
We are ignoring certain conditions that exist in the API and only doing this when there's a successful call (`statusCode=200`). The entire rule is ignored if the user has already signed up (signaled by the `user.signedUp` property setup after recording a new lead in step 2 below).
:::

```js
function (user, context, callback) {

  //Filter by app
  //if(context.clientName !== 'AN APP') return callback(null, user, context);

  if (!user.email || !user.email_verified) {
    return callback(null, user, context);
  }

  request.get('https://api.towerdata.com/v5/td', {
      qs: {
        email: user.email,
        api_key: configuration.TOWERDATA_API_KEY
      },
      json: true
    },
    (err, response, body) => {
      if (err) return callback(err);

      if (response.statusCode === 200) {
        context.idToken['https://example.com/towerdata'] = body;
      }

      return callback(null, user, context);
    });
}
```

## 2. Create a New Lead in Salesforce

In this second step we record the information as a __New Lead__ in Salesforce, so the sales department can followup. This __Rule__ has some interesting things:

1. The Salesforce REST API uses an OAuth Access Token. We are using the OAuth2 `Resource Owner Password Credential Grant` to obtain such Access Token. This is the `getToken` function that uses credentials as input as opposed to an `API-KEY` as the previous rule.
2. We are just recording the user name and a fixed company name. We could of course use anything available in the enriched user profile we obtained in step 1, to record more information, and have better context for the sales representative.
3. If everything went well, we use a __persistent__ property: `user.signedUp` and set it to `true`. So next time this same users logs in, these rules will be skipped.

```js
function (user, context, callback) {
  user.app_metadata = user.app_metadata || {};
  if (user.app_metadata.recordedAsLead) {
    return callback(null,user,context);
  }

  const MY_SLACK_WEBHOOK_URL = 'YOUR SLACK WEBHOOK URL';
  const slack = require('slack-notify')(MY_SLACK_WEBHOOK_URL);

  //Populate the variables below with appropriate values
  const SFCOM_CLIENT_ID = configuration.SALESFORCE_CLIENT_ID;
  const SFCOM_CLIENT_SECRET = configuration.SALESFORCE_CLIENT_SECRET;
  const USERNAME = configuration.SALESFORCE_USERNAME;
  const PASSWORD = configuration.SALESFORCE_PASSWORD;
  getAccessToken(
    SFCOM_CLIENT_ID,
    SFCOM_CLIENT_SECRET,
    USERNAME,
    PASSWORD,
    (response) => {
      if (!response.instance_url || !response.access_token) {
        slack.alert({
          channel: '#some_channel',
          text: 'Error Getting SALESFORCE Access Token',
          fields: {
            error: response
          }
        });

        return;
      }

      createLead(
        response.instance_url,
        response.access_token,
        (err, result) => {
        if (err || !result || !result.id) {
          slack.alert({
            channel: '#some_channel',
            text: 'Error Creating SALESFORCE Lead',
            fields: {
              error: err || result
            }
          });

          return;
        }

        user.app_metadata.recordedAsLead = true;
        auth0.users.updateAppMetadata(user.user_id, user.app_metadata);
      });
    });

  //See http://www.salesforce.com/us/developer/docs/api/Content/sforce_api_objects_lead.htm
  function createLead(url, access_token, callback){
    //Can use many more fields
    const data = {
      LastName: user.name,
      Company: 'Web channel signups'
    };

    request.post({
      url: url + "/services/data/v20.0/sobjects/Lead",
      headers: {
        "Authorization": "OAuth " + access_token
      },
      json: data
      }, (err, response, body) => {
        return callback(err, body);
      });
  }

  //Obtains a SFCOM access_token with user credentials
  function getAccessToken(client_id, client_secret, username, password, callback) {
    request.post({
      url: 'https://login.salesforce.com/services/oauth2/token',
      form: {
        grant_type: 'password',
        client_id: client_id,
        client_secret: client_secret,
        username: username,
        password: password
      }}, (err, respose, body) => {
        return callback(JSON.parse(body));
      });
  }

  // don’t wait for the SF API call to finish, return right away (the request will continue on the sandbox)`
  callback(null, user, context);
}
```
That's it!

Check out our [repository of Auth0 Rules](https://github.com/auth0/rules) for more great examples:

* Rules for access control
* Integration with other services: [Firebase](http://firebase.com)
