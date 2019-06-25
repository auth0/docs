---
title: Track New Leads in Salesforce
description: Learn how to track new leads in Salesforce and augment user profiles with public information gathered from TowerData.
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

# Track New Leads in Salesforce

You can track new leads in Salesforce with TowerData-Enriched User Profiles. 

Whenever a new user signs up with a website using any social credential we want to:

1. __Augment the user profile__ with additional public information obtained through [TowerData](https://www.towerdata.com/email-intelligence/email-enhancement).

2. __Record the sign-up as a New Lead__ on [Salesforce](http://www.salesforce.com/), so a sales professional can follow up.

To implement this with Auth0, you just need to create two [Rules](/rules) in your pipeline:

![](/media/articles/tutorials/rapleaf-salesforce.png)

## 1. Enrich User Profile with TowerData

Create a rule that will obtain more information about the user by retrieving public information from TowerData's API using the user's email address as input.

Once the call to TowerData completes, we store this additional information in a property called `towerdata`:

:::note
We ignore certain conditions that exist in the API and only do this when there's a successful call (`statusCode=200`). This rule will also be skipped if the user has already signed up, which is signaled by the `user.app_metadata.recordedAsLead` property being set to true (see step 2).
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

## 2. Create New Lead in Salesforce

Create a rule that will record the information as a __New Lead__ in Salesforce, so the sales department can follow up. Please note:

* The Salesforce REST API uses an OAuth Access Token. So for this rule, we use the OAuth2 `Resource Owner Password Credential Grant` to obtain this token, and use the `getToken` function, which uses credentials as input, as opposed to an `API-KEY` as was used in the rule in the previous step.

* In this example, we expect your Salesforce credentials to be stored in the [global `configuration` object](/rules/current#use-the-configuration-object). Be sure to add your credentials here before running your rule. Doing this allows you to use your credentials in multiple rules and prevents you from having to store them directly in the code.

* For this rule, we record only the username and a fixed company name. However, we could use anything available in the enriched user profile we obtained in step 1 to record more information and provide additional context for the sales representative.

* For this rule, we use a property called `user.app_metadata.recordedAsLead`, and if everything goes well, we set it to `true`. The next time the user signs in, this rule will be skipped.

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

## Keep reading

Check out our [repository of Auth0 Rules](https://github.com/auth0/rules) for more great examples:

* Rules for access control
* Integration with other services: [MixPanel](http://mixpanel.com), [Firebase](http://firebase.com), [Parse](http://parse.com), [Splunk](https://www.splunk.com/), [Segment](https://segment.com/), [Keen](https://keen.io/)
