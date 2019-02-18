---
title: Track New Sign-Ups in Salesforce
description: Learn how to track your sign-ups in Salesforce MixPanel, enrich your user profiles with public information gathered from FullContact, and generate new sales leads.
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

# Track New Sign-Ups in Salesforce

You can track new sign-ups in Salesforce with FullContact-Enriched User Profiles, and Send Auth0 Events to MixPanel.

Whenever a new user signs up with a website using a social credential, you want to:

1. __Record a `signup` event__ in [MixPanel](https://mixpanel.com).
2. __Augment the user profile__ with additional public information through [FullContact](http://www.fullcontact.com/).
3. __Record the sign-up as a New Lead__ in [Salesforce](http://www.salesforce.com/), so a sales professional can follow up.

To implement this with Auth0, you need to create three [Rules](/rules) in your pipeline:

![](/media/articles/tutorials/signups.png)

## 1. Record sign-up event in MixPanel

Create a rule to record the event by calling MixPanel. In the example below, we record the application name in the `application` property to help you filter information in MixPanel. However, the full `context` and `user` properties are available as sources of additional information (e.g., IP addresses, agent).

::: note
This rule will be skipped if the user has already signed up, which is signaled by the `user.app_metadata.recordedAsLead` property being set to true (see step 3).
:::

```js
function (user, context, callback) {

  const mpEvent = {
    "event": "Sign up",
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

## 2. Enrich user profile with FullContact

Create a rule to obtain more information about the user by retrieving public information from FullContact's API using the user's email address as input.

Once the call to FullContact completes, we store this additional information in a property called `fullContactInfo`:

:::note
We ignore certain conditions that exist in the API and only do this when there's a successful call (`statusCode=200`). This rule will also be skipped if the user has already signed up, which is signaled by the `user.app_metadata.recordedAsLead` property being set to true (see step 3).
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

## 3. Create New Lead in Salesforce

Create a rule to record the information as a New Lead in Salesforce, so the sales department can follow up. Please note:

* The Salesforce REST API uses an OAuth Access Token. So for this rule, we use the OAuth2 `Resource Owner Password Credential Grant` to obtain this token, and use the `getToken` function, which uses credentials as input, as opposed to an `API-KEY` as was used in the rules in the previous steps.

* In this example, we expect your Salesforce credentials to be stored in the [global `configuration` object](/rules/current#use-the-configuration-object). Be sure to add your credentials here before running your rule. Doing this allows you to use your credentials in multiple rules and prevents you from having to store them directly in the code.

* For this rule, we record only the username and a fixed company name. However, we could use anything available in the enriched user profile we obtained in step 2 to record more information and provide additional context for the sales representative.

* For this rule, we use a property called `user.app_metadata.recordedAsLead`, and if everything goes well, set it to true. The next time the user signs in, all of these rules will be skipped.


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
* Integration with other services: [Firebase](http://firebase.com), [TowerData](https://www.towerdata.com/email-intelligence/email-enhancement), [Parse](http://parse.com), [Splunk](https://www.splunk.com/), [Segment](https://segment.com/), [Keen](https://keen.io/)
