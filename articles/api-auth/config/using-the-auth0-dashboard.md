---
description: How to set up a Client Grant using the Auth0 Dashboard
crews: crew-2
topics:
  - client-credentials
  - api-authorization
contentType: how-to
---

# Set up a Client Grant using the Dashboard

Auth0 lets you authorize applications that have the 'Client Credential' grant type enabled to call APIs using the OAuth Client Credentials Grant. 

By default, all Machine to Machine Applications and Regular Web Applications have it the 'Client Credentials' grant enabled, but they are not authorized to call any API.

To authorize the applications to call an API you need to:

1. Open the Auth0 Management Dashboard and browse to the [API section](${manage_url}/#/apis).

2. Select the API you want to invoke using the Client Credentials Grant.

3. Under the **Authorized Application** tab, look for the application you want to authorize, click the Authorize button, and optionally select the list of scopes that will be granted in the Access Token. This will create a 'client grant' in Auth0, which will allow the application to call the API.

![Authorize the Application](/media/articles/api-auth/apis-authorize-client-tab.png)

4. In the Test tab, you can select the application you granted access to, and see the Access Tokens that will be generated for it.

## Keep reading

:::next-steps
* [How to implement the Client Credentials Grant](/api-auth/tutorials/client-credentials)
* [How to change the scopes and add custom claims to a token using Hooks](/api-auth/tutorials/client-credentials/customize-with-hooks)
* [How to add custom claims to a token using Rules](/scopes#custom-claims)
:::
