---
description: Solutions Overview for the Server + API architecture scenario
toc: true
---

# Server + API: Solution Overview

To ensure that only authorized users and applications are allowed access to the Timesheets API, ABC Inc. has decided to make use of the [OAuth 2.0 authorization framework](https://tools.ietf.org/html/rfc6749). The framework provides the flexibility the company wants since the different grants can allow them to easily authorize the various types of application which need to communicate with the Timesheets API.

## API Authentication and Authorization

An API is a way to expose functionality of your application to other applications. An application can make a request by sending a message to an endpoint on an API and receive information as a response.

An API endpoint can be secured or not. In our case, since the timesheets are sensitive information that affect reviews and payments, it is important to ensure that only authorized users and applications can call the endpoints on our API. When a client application wants to access protected endpoints on an API it needs to present an **access token** as proof that it has the required permissions for make the call to the endpoint.

An access token is obtained by authenticating the user with an Authorization Server and the user can then in turn authorize the application to access the API on their behalf.

An API can enforce fine grained control over who can access the various endpoints exposed by the API. These permissions are expressed as scopes.

When a user authorizes a client application, the application can also indicate which permissions it requires. The user is then allowed to review and grant these permissions. These permissions are then included in the access token as part of the `scope` claim.

Subsequently when the client passes along the access token when making requests to the API, the API can query the `scope` claim to ensure that the required permissions were granted in order to call the particular API endpoint.

::: panel What is an Access Token?
An access token (also referred to as `access_token`) is an opaque string representing an authorization issued to the client. It may denote an identifier used to retrieve the authorization information or may self-contain the authorization information (e.g. the user's identity, permissions, etc.) in a verifiable manner.

It is quite common for access tokens to be implemented as [JSON Web Tokens](/jwt).
:::

::: panel What are Scopes?
Each access token may include a list of the permissions that have been granted to the client. When a client authenticates with Auth0, it will specify the list of scopes (or permissions) it is requesting. If those scopes are authorized, then the access token will contain a list of authorized scopes.

For example, the timesheet API may accept different levels of authorization: reading timesheets (scope `read:timesheets`), creating timesheets (scope `create:timesheets`), deleting timesheets (scope `delete:timesheets`) and approving timesheets (scope `approve:timesheets`). You can also create a scope for batch processes such as the timesheet uploading client, e.g. `batch:upload`.

When a client asks the API to create a new timesheet entry, then the access token should contain the `create:timesheets` scope. In a similar fashion, in order to delete existing timesheets, the access token should contain the `delete:timesheets` scope.
:::

By using the OAuth 2.0 authorization framework, you can give your own applications or third-party applications limited access to your APIs on behalf of the application itself. Using Auth0, you can easily support different flows in your own APIs without worrying about the OAuth 2.0/OpenID Connect specification, or the many other technical aspects of API authorization.

### Participants

Several participants in the OAuth 2.0 specification can be identified:

- **Authorization Server**: The server issuing access tokens to the client after successfully authenticating the resource owner and obtaining authorization. In this case the authorization server is Auth0.
- **Resource Servers**: The server hosting the protected resources, capable of accepting and responding to protected resource requests using access tokens. In this case the resource server is the Timesheet API.
- **Clients**: An application making protected resource requests on behalf of the resource owner and with its authorization.
- **Resource Owner**: An entity capable of granting access to a protected resource when the resource owner is a person, it is referred to as an end-user.

Using different grants types (or flows), these participants will interact to grant Clients limited access to the Resource Servers you are building. As a result, the Client will obtain an `access_token` that can be used to call the Resource Server on behalf of the user or of the Client itself.

## Client Credentials Grant

OAuth 2 provides several *grant types* for different use cases. In this particular use case where a cron job will be uploading timesheets via an API, there is no interactive user (or resource owner) who grants permission to the cron job to access the API.

The cron job is also not making the API calls on behalf of any user. Instead there is a machine-to-machine authorization and the client (i.e. the cron job) makes calls to the Resource Server (i.e. the API) on its own behalf.

For situations like this where there is no user interaction involved, the Client Credentials Grant is ideal. With Client Credentials Grant (defined in [RFC 6749, section 4.4](https://tools.ietf.org/html/rfc6749#section-4.4)) a Client can directly request an `access_token` from the Authorization Server by using its Client Credentials (a Client Id and a Client Secret). Instead of identifying a Resource Owner, this token will represent the Client itself.

![Client Credentials Grant Flow](/media/articles/architecture-scenarios/server-api/client-credentials-grant.png)

1. The Client authenticates with the Authorization Server using its Client Id and Client Secret.
1. The Authorization Server validates this information and returns an `access_token`.
1. The Client can use the `access_token` to call the Resource Server on behalf of itself.

<%= include('./_stepnav', {
 prev: ["Introduction", "/architecture-scenarios/application/server-api"], next: ["2. Auth0 Configuration", "/architecture-scenarios/application/server-api/part-2"]
}) %>