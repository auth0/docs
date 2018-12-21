---
description: How to use multiple APIs and represent them as a single API in Auth0.
topics:
  - api-authentication
  - oidc
  - apis
contentType: tutorial
useCase:
  - secure-api
  - call-api
---

# How to Represent Multiple APIs Using a Single Auth0 API

To simplify your authentication process, you can create a single [API](/apis) using the Auth0 Dashboard to represent all of your existing APIs. Doing this allows you to implement just one authentication flow. You can then control access to the individual APIs by assigning the appropriate scopes.

This article shows you how to use and represent multiple APIs as a single Resource Server in Auth0 using a [sample application you can download](https://github.com/auth0-samples/auth0-api-auth-implicit-sample) if you would like to follow along as you read. Before you set up the sample on your local environment, please make sure you [set up your application in Auth0](#the-auth0-application).

## The Sample Application

The sample application contains:

* 1 Single Page Application (SPA);
* 2 APIs (called `contacts` and `calendar`).

We will represent the two APIs using just one Auth0 API called `Organizer Service`. We will then create two namespaced scopes to demonstrate how you can use the [Single-Page Login Flow](/flows/concepts/single-page-login-flow) to access the `calendar` and `contacts` APIs from the SPA. The SPA also uses [Lock](/libraries/lock) to implement the signin screen.

Please see the `README` for additional information on setting up the sample on your local environment.

## The Auth0 Application

If you don't already have an Auth0 Application (of type **Single Page Web Applications**) with the **OIDC Conformant** flag enabled, you'll need to create one. This represents your application.

1. In the [Auth0 Dashboard](${manage_url}), click on [Applications](${manage_url}/#/applications) in the left-hand navigation bar. Click **Create Application**.
2. The **Create Application** window will open, allowing you to enter the name of your new Application. Choose **Single Page Web Applications** as the **Application Type**. When done, click on **Create** to proceed.
3. Navigate to the [Auth0 Application Settings](${manage_url}/#/applications/${account.clientId}/settings) page. Add `http://localhost:3000` and `http://localhost:3000/callback.html` to the Allowed Callback URLs field of your [Auth0 Application Settings](${manage_url}/#/applications/${account.clientId}/settings).
4. Scroll to the bottom of the [Settings](${manage_url}/#/applications/${account.clientId}/settings) page, where you'll find the *Advanced Settings* section. Under the *OAuth* tab, enable the **OIDC Conformant** Flag under the *OAuth* area of *Advanced Settings*.

### Enable a Connection for Your Application

[Connections](/identityproviders) are sources of users to your application, and if you don't have a sample Connection you can use with your newly-created Application, you will need to configure one. For the purposes of this sample, we'll create a simple [Database Connection](/connections/database) that asks only for the user's email address and a password.

1. In the [Auth0 Dashboard](${manage_url}), click on [Connections > Database](${manage_url}/#/connections/database) in the left-hand navigation bar. Click **Create DB Connection**.
2. The **Create DB Connection** window will open. Provide a **Name** for your Connection, and click **Create** to proceed.
3. Once your Connection is ready, click over to the *Applications* tab, and enable the Connection for your Application.

### Create a Test User

If you're working with a newly-created Connection, you won't have any users associated with the Connection. Before you can test your sample's login process, you'll need to create and associate a user with your Connection.

1. In the [Auth0 Dashboard](${manage_url}), click on [Users](${manage_url}/#/users) in the left-hand navigation bar. Click **Create User**.
2. Provide the requested information about the new user (**email address** and **password**), and select your newly-created **Connection**.
3. Click **Save** to proceed.

## Create the Auth0 API

Log in to your Auth0 Dashboard, and navigate to the APIs section.

::: note
  For detailed information on working with APIs in the <a href="${manage_url}">Dashboard</a>, refer to <a href="/apis">APIs</a>.
:::

Click **Create API**.

![](/media/articles/api-auth/tutorials/represent-multiple-apis/dashboard-apis.png)

You will be prompted to provide a **name** and **identifier**, as well as choose the **signing algorithm**, for your new API.

For the purposes of this article, we'll call our API `Organizer Service` and set its unique identifier to `organize`. By default, the signing algorithm for the tokens this API issues is **RS256**, which we will leave as is.

![](/media/articles/api-auth/tutorials/represent-multiple-apis/create-new-api.png)

Once you've provided the required details, click **Create** to proceed.

### Configure the Auth0 API

After Auth0 creates your API, you'll be directed to its *Quick Start* page. At this point, you'll need to create the appropriate **Scopes**, which you can do via the *Scopes* page.

![](/media/articles/api-auth/tutorials/represent-multiple-apis/scopes-page.png)

Scopes allow you to define the API data accessible to your applications. You'll need one scope for each API represented and action. For example, if you want to `read` and `delete` from an API called `samples`, you'll need to create the following scopes:

* `read:samples`
* `delete:samples`

For our sample application, we'll add two scopes:

* `read:calendar`;
* `read:contacts`.

You can think of each one as a microservice.

![](/media/articles/api-auth/tutorials/represent-multiple-apis/new-scopes.png)

Add these two scopes to your API and **Save** your changes.

## Grant Access to the Auth0 API

You are now ready to provide access to your APIs by granting Access Tokens to the Auth0 API. By including specific scopes, you can control an application to some or all of the APIs represented by the Auth0 API.

:::panel Authorization Flows

The rest of this article covers use of the [Single-Page Login Flow](/flows/concepts/single-page-login-flow) to reflect the sample. However, you can use whichever flow best suits your needs.

* If you have a **Machine-to-Machine Application**, you can authorize it to request Access Tokens to your API by executing a [Machine-to-Machine (M2M) Flow](/flows/concepts/m2m-flow).
* If you are building a **Native App**, you can implement the [Native/Mobile Login Flow](/flows/concepts/mobile-login-flow).

For a full list of available Authorization flows, see [API Authorization](/api-auth).
:::

The app initiates the flow and redirects the browser to Auth0 (specifically to the `/authorize` endpoint), so the user can authenticate.

```text
https://YOUR_AUTH0_DOMAIN/authorize?
scope=read:contacts%20read:calendar&
audience=organize&
response_type=id_token%20token&
client_id=YOUR_CLIENT_ID&
redirect_uri=http://localhost:3000&
nonce=NONCE
```

For additional information on the call's parameters, refer to our tutorial, [Call Your API Using the Single-Page Login Flow](/flows/guides/single-page-login-flow/call-api-using-single-page-login-flow#authorize-the-user).

The SPA executes this call whenever the user clicks **Login**.

![SPA Home before Login](/media/articles/api-auth/tutorials/represent-multiple-apis/home.png)

Lock handles the login process.

![SPA Login](/media/articles/api-auth/tutorials/represent-multiple-apis/lock.png)

Next, Auth0 authenticates the user. If this is the first time the user goes through this flow, they will be asked to consent to the scopes that are given to the Application. In this case, the user's asked to consent to the app reading their contacts and calendar.

![Consent Screen](/media/articles/api-auth/tutorials/represent-multiple-apis/consent-screen.png)

If the user consents, Auth0 continues the authentication process, and upon completion, redirects them back to the app with an Access Token in the hash fragment of the URI. The app can now extract the tokens from the hash fragment. In a Single Page Application (SPA) this is done using JavaScript.

```js
function getParameterByName(name) {
  var match = RegExp('[#&]' + name + '=([^&]*)').exec(window.location.hash);
  return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

function getAccessToken() {
  return getParameterByName('access_token');
}
```

The app can then use the Access Token to call the API on behalf of the user.

After logging in, you can see buttons that allow you to call either of your APIs.

![SPA Home after Login](/media/articles/api-auth/tutorials/represent-multiple-apis/apis.png)

## Polling checkSession() to attain SSO or SLO

<%= include('../../_includes/_checksession_polling') %>
