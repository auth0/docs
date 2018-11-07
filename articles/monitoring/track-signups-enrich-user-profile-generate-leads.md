---
description: How to track sign-ups, enrich user profiles and generate new leads.
topics:
  - monitoring
  - marketing
contentType:
  - how-to
useCase:
  - analyze-auth0-analytics
  - analyze-logs
  - analyze-external-analytics
  - integrate-analytics
---

# How to track Sign-ups, enrich User Profile and generate new Leads

Upon a signup of a new user to a website with any social credential, we want to:

1. Record a __SignUp__ event on [MixPanel](https://mixpanel.com).
2. __Augment the user profile__ with additional public information through [FullContact](http://www.fullcontact.com/).
3. Record the new signup as a __New Lead__ on [Salesforce](http://www.salesforce.com/) for follow-up.

Implementing this with Auth0 is very easy. You just need 3 [Rules](/rules) in your pipeline:

![](/media/articles/tutorials/signups.png)

## 1. Recording a SignUp in MixPanel

This first rule checks whether the user has already signed up. If they have, it simply skips everything. If not, it calls __MixPanel__ to record the event. In the example below we are simply using a property `application` that you can then use in MixPanel to filter information. But the full `context` and `user` properties are available as sources of more information (such as IP addresses, agent, and so on.).

We also call this event `Sign Up`:

```js
function (user, context, callback) {

  const mpEvent = {
    "event": "Sign In",
    "properties": {
        "distinct_id": user.user_id,
        "token": configuration.MIXPANEL_API_TOKEN,
        "application": context.clientName
    }
  };

  const base64Event = Buffer.from(JSON.stringify(mpEvent)).toString('base64');

  request.get({
    url: 'http://api.mixpanel.com/track/',
    qs: {
      data: base64Event
    }
  }, (err, res, body) => {
      // don’t wait for the MixPanel API call to finish, return right away (the request will continue on the sandbox)`
      callback(null, user, context);
  });
}
```

## 2.Augment User Profile with FullContact

The 2nd step is to obtain more information about this user using their email address. __FullContact__ provides an API to retrieve public information about a user using the email as input. We store this additional information in a property called `fullContactInfo`:

:::note
We are ignoring certain conditions that exist in the API and only doing this when there's a successful call (`statusCode=200`).
:::

```js
function (user, context, callback) {
  const FULLCONTACT_KEY = configuration.FULLCONTACT_KEY;
  const SLACK_HOOK = configuration.SLACK_HOOK_URL;

  const slack = require('slack-notify')(SLACK_HOOK);

  // skip if no email
  if (!user.email) return callback(null, user, context);

  // skip if fullcontact metadata is already there
  if (user.user_metadata && user.user_metadata.fullcontact) return callback(null, user, context);

  request.get('https://api.fullcontact.com/v2/person.json', {
    qs: {
      email:  user.email,
      apiKey: FULLCONTACT_KEY
    },
    json: true
  }, (error, response, body) => {
    if (error || (response && response.statusCode !== 200)) {

      slack.alert({
        channel: '#slack_channel',
        text: 'Fullcontact API Error',
        fields: {
          error: error ? error.toString() : (response ? response.statusCode + ' ' + body : '')
        }
      });

      // swallow fullcontact api errors and just continue login
      return callback(null, user, context);
    }

    // if we reach here, it means fullcontact returned info and we'll add it to the metadata
    user.user_metadata = user.user_metadata || {};
    user.user_metadata.fullcontact = body;

    auth0.users.updateUserMetadata(user.user_id, user.user_metadata);
    context.idToken['https://example.com/fullcontact'] = user.user_metadata.fullcontact;
    return callback(null, user, context);
  });
}
```

## 3. Create a New Lead in Salesforce

In the last step we record the information as a __New Lead__ in Salesforce, so the sales department can followup. This __Rule__ has some interesting things:

1. The Salesforce REST API uses an OAuth Access Token. We are using the OAuth2 `Resource Owner Password Credential Grant` to obtain such Access Token. This is the `getToken` function hat uses credentials as input as opposed to an `API-KEY` as the previous rules.
2. We are just recording the user name and a fixed company name. We would of course us anything available in the enriched user profile we obtained in step 2, to record more information and have better context for the sales representative.
3. If everything went well, we use a __persistent__ property: `user.signedUp` and set it to `true`. So next time this same users logs in, none of these rules will do anything.

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

Check out our [repository of Auth0 Rules](https://github.com/auth0/rules) for more great examples:

* Rules for access control
* Integration with other services: [Firebase](http://firebase.com), [TowerData](https://www.towerdata.com/email-intelligence/email-enhancement)
