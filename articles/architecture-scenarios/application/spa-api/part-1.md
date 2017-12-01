---
description: Solution Overview for the SPA + API architecture scenario
toc: true
---

# SPA + API: Solution Overview

In order to ensure that only authorized users and applications are allowed access to the Timesheets API, ExampleCo has decided to make use of the [OAuth 2.0 authorization framework](https://tools.ietf.org/html/rfc6749). The framework provides the flexibility the company wants since the different grants can allow them to easily authorize the various types of applications which need to communicate with the Timesheets API.

## API Authentication and Authorization

An API is a way to expose functionality of your application to other applications. An application can make a request by sending a message to an endpoint on an API and receive information as a response.

An API endpoint can be secured or not. In our case, since the timesheets are sensitive information that affect reviews and payments, it is important to ensure that only authorized users and applications can call the endpoints on our API. When a client application wants to access protected endpoints on an API, it needs to present an access token as proof that it has the required permissions for making the call to the endpoint.

An access token is obtained by authenticating the user with an Authorization Server and the user can then, in turn, authorize the application to access the API on their behalf.

::: panel What is an Access Token?
An access token (also referred to as `access_token`) is an opaque string representing an authorization issued to the client. It may denote an identifier used to retrieve the authorization information or may self-contain the authorization information (for example, the user's identity, permissions, and so forth) in a verifiable manner.

It is quite common for access tokens to be implemented as [JSON Web Tokens](/jwt). For more information on Auth0 Access Tokens refer to [Access Token](/tokens/access-token).
:::

An API can enforce fine-grained control over who can access the various endpoints exposed by the API. These permissions are expressed as scopes.

When a user authorizes a client application, the application can also indicate which permissions it requires. The user is then allowed to review and grant these permissions. These permissions are then included in the access token as part of the `scope` claim.

Subsequently, when the client passes along the access token when making requests to the API, the API can inspect the `scope` claim to ensure that the required permissions were granted in order to call the particular API endpoint.

::: panel What are Scopes?
Each access token may include a list of the permissions that have been granted to the client. When a client authenticates with Auth0, it will specify the list of scopes (or permissions) it is requesting. If those scopes are authorized, then the access token will contain a list of authorized scopes.

For example, the timesheet API may accept four different levels of authorization: reading timesheets (scope `read:timesheets`), creating timesheets (scope `create:timesheets`), deleting timesheets (scope `delete:timesheets`) and approving timesheets (scope `approve:timesheets`).

When a client asks the API to create a new timesheet entry, then the access token should contain the `create:timesheets` scope. In a similar fashion, in order to delete existing timesheets, the access token should contain the `delete:timesheets` scope.

For more information on scopes refer to [Scopes](/scopes).
:::

By using the OAuth 2.0 authorization framework, you can give your own applications or third-party applications limited access to your APIs on behalf of the application itself. Using Auth0, you can easily support different flows in your own APIs without worrying about the OAuth 2.0/OpenID Connect specification, or the many other technical aspects of API authorization.

::: panel OAuth Roles
In any OAuth 2.0 flow we can identify the following roles:

- __Resource Owner__: the entity that can grant access to a protected resource. Typically this is the end-user.
- __Resource Server__: the server hosting the protected resources. This is the API you want to access.
- __Client__: an application requesting access to a protected resource on behalf of the Resource Owner.
- __Authorization Server__: the server that authenticates the Resource Owner, and issues access tokens after getting proper authorization. In this case, Auth0.

Using [different grants types (or flows)](/api-auth/which-oauth-flow-to-use), these participants will interact to grant to the client apps limited access to the APIs you are building. As a result, the client app will obtain an `access_token` that can be used to call the API on behalf of the user.
:::

## Implicit Grant

OAuth 2.0 provides several __grant types__ for different use cases. In this particular use case, we want to access the API from a [client-side app](/quickstart/spa).

The SPA will use the OAuth 2.0 [Implicit Grant](/api-auth/grant/implicit) to do so.

The Implicit Grant (defined in [RFC 6749, section 4.1](https://tools.ietf.org/html/rfc6749#section-4.2)) is similar to the [Authorization Code Grant](/api-auth/grant/authorization-code), but the main difference is that the client app receives an `access_token` directly, without the need for an `authorization_code`. This happens because the client app, which is typically a JavaScript app running within a browser, is less trusted than a web app running on the server, hence cannot be trusted with the `client_secret` (which is required in the Authorization Code Grant).

Once the user authenticates, the client app receives the `id_token` and `access_token` in the hash fragment of the URI. The client app can now use the `id_token` to obtain information about the user, and `access_token` to call the API on behalf of the user.

![Implicit Grant](/media/articles/api-auth/implicit-grant.png)

1. The app initiates the flow and redirects the browser to Auth0 (specifically to the [/authorize endpoint](/api/authentication#implicit-grant)), so the user can authenticate.

1. Auth0 authenticates the user. The first time the user goes through this flow, and if the client is a third party client, a consent page will be shown where the permissions, that will be given to the Client, are listed (for example, post messages, list contacts, and so forth).

1. Auth0 redirects the user to the app with an `access_token` (and optionally an `id_token`) in the hash fragment of the URI. The app can now extract the tokens from the hash fragment.

1. The app can use the `access_token` to call the API on behalf of the user.

## Authorization Extension

The [Auth0 Authorization Extension](/extensions/authorization-extension) allows you to configure Roles, Groups, and Permissions, and assign them to Users.

- The Permissions are actions that someone can do. For ExampleCo's business needs, we will configure four Permissions: read, create, delete and approve timesheets.
- The Roles are collections of Permissions. ExampleCo's timesheets app will be used by two kinds of users (employees and managers), with different permissions each, so we will configure two Roles: employee and manager.

Since this covers our business case we will not create any Groups.

The Authorization Extension will create a [Rule](/rules) which will read the Roles, Groups, and Permissions assigned to a user and add this information to the [User profile](/rules/current#rule-syntax) during the authentication flow. We can use this information to ensure that the `access_token` issued to a user only contains scopes which are allowed. We can later on proceed to customize our app, like disabling the Approve Timesheets functionality if the user does not have the required permission to do so.

<%= include('./_stepnav', {
 prev: ["Introduction", "/architecture-scenarios/application/spa-api"], next: ["2. Auth0 Configuration", "/architecture-scenarios/application/spa-api/part-2"]
}) %>
