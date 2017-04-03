---
  description: How to use multiple APIs and represent them as a single API in Auth0.
---

# How to Manage Multiple APIs Using a Single Auth0 API

To simplify your authentication process, you can create a single [API](/apis) using the Auth0 Dashboard to represent all of your existing APIs. Doing this allows you to implement just one authentication flow. You can then control access to the individual APIs by assigning the appropriate scopes.

This article shows you how to use and represent multiple APIs as a single Resource Server in Auth0 using a [sample application you can download](https://github.com/auth0-samples/auth0-api-auth-implicit-sample) if you would like to follow along as you read.

<%= include('../../../_includes/_package', { org: 'auth0-samples', repo: 'auth0-api-auth-implicit-sample', path: '01-Login' }) %>

## The Sample Application

In the sample application, we have:

* 2 Node.js APIs called `contacts` and `calendars`;
* 1 resource server representing the 2 APIs mentioned above. This is the Auth0 API we will call `Organizer Service`;
* Namespaced scopes to access the APIs. We will work with two (`read:contacts` and `read:calendar`), but you can create any number of scopes when you implement your specific business scenario;
* The [Implicit Grant flow](/api-auth/grant/implicit), which we use to obtain an `access_token` that works with both APIs.

Please see the `README` for additional information on setting up the sample on your local environment.

## Create the Auth0 API

Log in to your Auth0 Dashboard, and navigate to the APIs section.

::: panel-info Auth0 APIs
Please see [APIs](/apis) for detailed information on working with APIs in the Dashboard.
:::

Click **Create API**.

![](/media/articles/api-auth/tutorials/multiple-apis-one-resource-server/dashboard-apis.png)

You will be prompted to provide a **name** and **identifier**, as well as choose the **signing algorithm**, for your new API.

For the purposes of this article, we'll call our API `Organizer Service` and set its unique identifier to `organize`. By default, the signing algorithm for the tokens this API issues is **RS256**, which we will leave as is.

![](/media/articles/api-auth/tutorials/multiple-apis-one-resource-server/create-new-api.png)

Once you've provided the required details, click **Create** to proceed.

### Configure the Auth0 API

After Auth0 creates your API, you'll be directed to its *Quick Start* page. At this point, you'll need to create the appropriate **Scopes**, which you can do via the *Scopes* page.

![](/media/articles/api-auth/tutorials/multiple-apis-one-resource-server/scopes-page.png)

Scopes allow you to define the API data accessible to your client applications. You'll need one scope for each API represented and action. For example, if you want to `read` and `delete` from an API called `samples`, you'll need to create the following scopes:

* `read:samples`
* `delete:samples`

For our sample application, we'll add two scopes:

* `read:calendar`;
* `read:contacts`.

You can think of each one as a microservice.

![](/media/articles/api-auth/tutorials/multiple-apis-one-resource-server/new-scopes.png)

At this point, you've:

* Fully configured your Auth0 API;
* Added the scopes that correspond to the multiple APIs that the Auth0 API represents.

## Grant Access to the Auth0 API

You are now ready to provide access to your APIs by granting access tokens to the Auth0 API. By including specific scopes, you can control a client's application to some or all of the APIs represented by the Auth0 API.

:::panel-info Authorization Flows

The rest of this article covers use of the [Implicit Grant](/api-auth/grant/implicit) to reflect the sample. You can, however, use whichever flow best suits your needs.

* If you have a **Non Interactive Client**, you can authorize it to request access tokens to your API by executing a [client credentials exchange](/api-auth/grant/client-credentials).
* If you are building a **Native App**, you can implement the use of [Authorization Codes using PKCE](/api-auth/grant/authorization-code-pkce).
:::

The app initiates the flow and redirects the browser to Auth0 (specifically to the ``/authorize` endpoint), so the user can authenticate.

```text
https://YOUR_AUTH0_DOMAIN/authorize?
scope=read:contacts%20read:calendar&
audience=organize&
response_type=id_token%20token&
client_id=YOUR_CLIENT_ID&
redirect_uri=http://localhost:3000&
nonce=NONCE
```
The SPA executes this call whenever the user clicks **Login**.

![SPA Home before Login](/media/articles/api-auth/tutorials/multiple-apis-one-resource-server/home.png)

:::panel-info Request Parameters
For additional information on the call's parameters, refer to the [docs on executing an implementing the Implicit Grant](/api-auth/grant/implicit#1-get-the-user-s-authorization).
:::

Lock handles the login process (you can log in with a user that exists in a [Connection](/identityproviders) enabled for your Auth0 Client).

![SPA Login](/media/articles/api-auth/tutorials/multiple-apis-one-resource-server/lock.png)

Next, Auth0 authenticates the user. If this is the first time the user goes through this flow, they will be asked to consent to the scopes that are given to the Client (such as post messages or list contacts).

If the user consents, Auth0 continues the authentication process, and upon completion, redirects them back to the app with an `access_token` in the hash fragment of the URI. The app can now extract the tokens from the hash fragment. In a Single Page Application (SPA) this is be done using JavaScript (see the `getAccessToken` function located in `index.html` for the sample app). The app can then use the `access_token` to call the API on behalf of the user.

After logging in, you can see buttons that allow you to call either of your APIs.

![SPA Home after Login](/media/articles/api-auth/tutorials/multiple-apis-one-resource-server/apis.png)
