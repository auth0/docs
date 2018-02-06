# Introduction

The Authorization Extension API enables you to:

- automate provisioning for your users, roles, groups, and permissions
- query the authorization context of your users in real time

In order to use it you first have to [enable API access](/extensions/authorization-extension/v2#enable-api-access) from your Authorization Dashboard.

For more information on the Authorization Extension and how to configure it refer to [Auth0 Authorization Extension](/extensions/authorization-extension).

For each endpoint in this explorer, you will find sample snippets you can use, in three available formats:

- HTTP request
- Curl command
- JavaScript: depending on the endpoint each snippet may use Node.js or simple JavaScript

## Find your extension URL

All endpoints in this explorer, start with `https://{extension_url}`. This is the URL of your Authorization Dashboard. It differs based on you tenant's region:

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

To do so you will have to configure a non interactive client which will have access to this API and which you will use to get an [Access Token](/tokens/access-token).

Follow these steps to setup your client (you will have to do this only once):

1. Go to [Dashboard > Clients](${manage_url}/#/clients) and create a new client of type `Non Interactive`.
2. Go to the [Dashboard > APIs](${manage_url}/#/apis) and select the `auth0-authorization-extension-api`.
3. Go to the `Non Interactive Clients` tab, find the client you created at the first step, and toggle the `Unauthorized` to `Authorized`.
4. Select the [scopes](/scopes#api-scopes) that should be granted to your client, based on the endpoints you want to access. For example, `read:users` to [get all users](#get-all-users).

In order to get an `access_token` you need to `POST` to the `/oauth/token` endpoint. You can find detailed instructions [here](/api-auth/tutorials/client-credentials#ask-for-a-token).

Use this `access_token` to access the Authorization Extension API.