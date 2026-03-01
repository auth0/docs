# Introduction

The Authorization Extension API enables you to:

- automate provisioning for your users, <dfn data-key="role">roles</dfn>, groups, and permissions
- query the authorization context of your users in real time

In order to use it, you first have to [enable API access](/extensions/authorization-extension/v2#enable-api-access) from your Authorization Dashboard.

For more information on the Authorization Extension and how to configure it, refer to [Auth0 Authorization Extension](/extensions/authorization-extension).

For each endpoint in this explorer, you will find sample snippets you can use, in three available formats:

- HTTP request
- Curl command
- JavaScript: depending on the endpoint each snippet may use Node.js or simple JavaScript

Each request should be sent with a Content-Type of `application/json`.

## Find your extension URL

All endpoints in this explorer start with `https://{extension_url}`. This is the URL of your Authorization Dashboard. It differs based on you tenant's region:

<%
  var urlUS = 'https://' + account.tenant + '.us.webtask.io/adf6e2f2b84784b57522e3b19dfc9201/api';
  var urlEU = 'https://' + account.tenant + '.eu.webtask.io/adf6e2f2b84784b57522e3b19dfc9201/api';
  var urlAU = 'https://' + account.tenant + '.au.webtask.io/adf6e2f2b84784b57522e3b19dfc9201/api';
%>

| Region | Extension URL |
|--------|---------------|
| US West | `${urlUS}` |
| Europe | `${urlEU}` |
| Australia | `${urlAU}` |

## Get an Access Token

When you [enabled API access for your tenant](/extensions/authorization-extension/v2#enable-api-access), an API was created at your [dashboard](${manage_url}), which you can use to access the Authorization Extension API.

To do so you will have to configure a machine to machine application which will have access to this API and which you will use to get an <dfn data-key="access-token">Access Token</dfn>.

Follow these steps to set up your application (you will have to do this only once):

1. Go to [Dashboard > Applications](${manage_url}/#/applications) and create a new application of type `Machine to Machine`.
2. Go to the [Dashboard > APIs](${manage_url}/#/apis) and select the `auth0-authorization-extension-api`.
3. Go to the `Machine to Machine Applications` tab, find the application you created at the first step, and toggle the `Unauthorized` to `Authorized`.
4. Select the <dfn data-key="scope">[scopes](/scopes/current/api-scopes)</dfn> that should be granted to your application, based on the endpoints you want to access. For example, `read:users` to [get all users](#get-all-users).

To get an Access Token, you need to `POST` to the `/oauth/token` endpoint. You can find detailed instructions [here](/flows/guides/client-credentials/call-api-client-credentials#request-token).

Use this Access Token to access the Authorization Extension API.
