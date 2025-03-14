---
description: How to set up a Client Grant using the Auth0 Dashboard
crews: crew-2
topics:
  - client-credentials
  - api-authorization
contentType: how-to
useCase: secure-api
---

# Set Up Client Credentials Grants Using the Dashboard

Auth0 lets you authorize applications that have the **Client Credentials** grant type enabled to call APIs using the [Client Credentials Flow](/flows/concepts/client-credentials). 

By default, the **Client Credentials** grant is enabled for all Machine-to-Machine Applications and Regular Web Applications, but they are _not yet_ authorized to call any API.

To authorize the applications to call an API:

1. Open the Auth0 Management Dashboard and browse to the [API section](${manage_url}/#/apis).

2. Select the API you want to invoke using the **Client Credentials** Grant.

3. Under the **Authorized Application** tab, look for the application you want to authorize, click the Authorize button, and optionally, select the list of <dfn data-key="scope">scopes</dfn> that will be granted in the <dfn data-key="access-token">Access Token</dfn>. This will create a 'client grant' in Auth0, which will allow the application to call the API.

![Authorize the Application](/media/articles/api-auth/apis-authorize-client-tab.png)

4. In the Test tab, you can select the application to which you granted access, and see the Access Tokens that will be generated for it.

## Keep reading

* [Call API using the Client Credentials Flow](/flows/guides/client-credentials/call-api-client-credentials)
* [Use Hooks with Client Credentials Grant](/api-auth/tutorials/client-credentials/customize-with-hooks)
* [Add Custom Claims Tokens Using Rules](/scopes/current/sample-use-cases#add-custom-claims-to-a-token)
