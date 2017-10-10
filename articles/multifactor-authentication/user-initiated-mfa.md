# User-Initiated Multifactor Authentication

Customer end goal: enable user initiated MFA (using SMS) (i.e. a user can select to enable MFA). Is this possible, or does MFA have to be initiated after registration?

## Enable Multifactor Authentication

You can enable Multifactor Authentication (MFA) using the Dashboard.

Log in to your Auth0 account and navigate to the [**Multifactor Auth** page of the Management Dashboard](${manage_url}/#/guardian).

![](/mfa-home.png)

You'll have the option to enable MFA that uses either **Push Notifications** or **SMS**. You can also use both. Click the slider(s) next to the option(s) you want enabled.

Once you've enabled one or more types of MFA, you'll see the **Customize MFA** section, which is a text editor that allows you to write the code to determine when MFA is necessary. The code runs as part of your [rules](/rules) whenever a user logs in.

To help you get started, you'll see a template you can modify. Additional templates that implement various MFA features are available under **Templates**, which is located to the top right of the code editor.

As an example, the follow code snippet calls for MFA when:

* The client specified is used
* The user's `app_metadata` has a `use_mfa` flag set to `true`

Finally, if the two parameters above are met, MFA occurs every login.

```js
function (user, context, callback) {

    // run only for the specified clients
    var CLIENTS_WITH_MFA = ['{REPLACE_WITH_YOUR_CLIENT_ID}'];
    
    if (CLIENTS_WITH_MFA.indexOf(context.clientID) !== -1) {
        if (user.user_metadata && user.user_metadata.use_mfa){

            context.multifactor = {
                // required
                provider: 'guardian', 

                // set to false to force Guardian authentication every login
                allowRememberBrowser: false
            };
        }
    }

    callback(null, user, context);
}
```

## Get Management API Access Token

You'll need to [get an access token](/api/management/v2/tokens) to call the [Management API](/api/management/v2). The only scope that you need to grant to the issued token is `update:users_app_metadata`.

Using this token, you can place a flag on app_metadata that indicates whether MFA is needed whenever that user logs in.  More specifically, you'll be programmatically setting their the user's `app_metadata` field with `useMfa = true`.

You can do this by making the appropriate `PATCH` call to the [Update a User endpoint of the Management API](/api/management/v2#!/Users/patch_users_by_id).

```json
{
  "\blocked"\: false,
  "\email_verified"\: false,
  "\email"\: "\"\,
  "\verify_email"\: false,
  "\phone_number"\: "\"\,
  "\phone_verified"\: false,
  "\verify_phone_number"\: false,
  "\password"\: "\"\,
  "\verify_password"\: false,
  "\user_metadata"\: {},
  "\app_metadata"\: {
      "\useMfa"\: true
  },
  "\connection"\: "\"\,
  "\username"\: "\"\,
  "\client_id"\: "\DaM8...rdyX"\
}
```

```har
{
	"method": "POST",
	"url": "https://${account.namespace}.auth0.com/api/v2/users/USER_ID",
	"httpVersion": "HTTP/1.1",
	"cookies": [],
	"headers": [{
		"name": "Authorization",
		"value": "Bearer MGMT_API_ACCESS_TOKEN"
	}],
	"queryString": [],
	"postData": {
		"mimeType": "application/json",
		"text": "{ \"blocked\": false, \"email_verified\": false, \"email\": \"\", \"verify_email\": false, \"phone_number\": \"\", \"phone_verified\": false, \"verify_phone_number\": false, \"password\": \"\", \"verify_password\": false,\"user_metadata\": {},\"app_metadata\": { \"useMfa\": true }, \"connection\": \"\", \"username\": \"\",\"client_id\": \"DaM8...rdyX\"}"
	},
	"headersSize": -1,
	"bodySize": -1,
	"comment": ""
}
```

## Initiate Guardian Enrollment

You'll need to [get an access token](/api/management/v2/tokens) to call the [Management API](/api/management/v2). The only scope that you need to grant to the issued token is `create:guardian_enrollment_tickets`.

Call https://auth0.com/docs/api/management/v2#!/Guardian/post_ticket, which initiates an out-of-band Guardian enrollment