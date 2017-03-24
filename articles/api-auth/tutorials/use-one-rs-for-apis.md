---
  description: How to use multiple APIs and represent them as a single Resource Server in Auth0.
---

# Represent Multiple APIs as a Single Resource Server

This article shows you how to use and represent multiple APIs as a single Resource Server in Auth0.

## Create the Auth0 API

Log in to your Auth0 Dashboard, and navigate to the APIs section.

::: panel-info Auth0 APIs
Please see [APIs](/apis) for detailed information on working with APIs in the Dashboard.
:::

Click **Create API**.

![](/media/articles/api-auth/tutorials/multiple-apis-one-resource-server/dashboard-apis.png)

You will be prompted to provide a **name** and **identifier**, as well as choose the **signing algorithm**, for your new API.

For the purposes of this article, we'll call our API `Auth0API` and set its unique identifier to `auth0api`. By default, the signing algorithm for the tokens this API issues is **RS256**, which we will leave as is.

![](/media/articles/api-auth/tutorials/multiple-apis-one-resource-server/create-new-api.png)

Once you've provided the required details, click **Create** to proceed.

### Configure the Auth0 API

After Auth0 creates your API, you'll be directed to its *Quick Start* page. At this point, you'll need to create the appropriate **Scopes**, which you can do via the *Scopes* page.

![](/media/articles/api-auth/tutorials/multiple-apis-one-resource-server/scopes-page.png)

Scopes allow you to define the API data accessible to your client applications. You'll need one scope for each API represented and action. For example, if you want to `read` and `delete` from an API called `samples`, you'll need to create the following scopes:

* `read:samples`
* `delete:samples`

As an example, we'll add two scopes: `read:calendar` and `read:contacts`. You can think of each one as a microservice.

![](/media/articles/api-auth/tutorials/multiple-apis-one-resource-server/new-scopes.png)

At this point, you've:

* Fully configured your Auth0 API;
* Added the scopes that correspond to the multiple APIs that the Auth0 API represents.

## Grant Access to the Auth0 API

You are now ready to provide access to your APIs by granting access tokens to the Auth0 API. By including specific scopes, you can control a client's application to some or all of the APIs represented by the Auth0 API.

* If you have a **Non Interactive Client**, you can authorize it to request access tokens to your API by executing a [client credentials exchange](/api-auth/grant/client-credentials).
* If you are building a **Single Page App**, you can access the APIs using an [Implicit Grant](/api-auth/grant/implicit).
* If you are building a **Native App**, you can implement the use of [Authorization Codes using PKCE](/api-auth/grant/authorization-code-pkce).
