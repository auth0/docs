## API Authentication and Authorization

An API is a way to expose functionality of your application to other applications. An application can make a request by sending a message to an endpoint on an API and receive information as a response.

An API endpoint can be secured or not. In our case, since the timesheets are sensitive information that affect reviews and payments, it is important to ensure that only authorized users and applications can call the endpoints on our API. When a client application wants to access protected endpoints on an API, it needs to present an Access Token as proof that it has the required permissions for making the call to the endpoint.

An Access Token is obtained by authenticating the user with an Authorization Server and the user can then, in turn, authorize the application to access the API on their behalf.

::: panel What is an Access Token?
An Access Token (also referred to as `access_token`) is an opaque string representing an authorization issued to the application. It may denote an identifier used to retrieve the authorization information or may self-contain the authorization information (for example, the user's identity, permissions, and so forth) in a verifiable manner.

It is quite common for Access Tokens to be implemented as [JSON Web Tokens](/tokens/concepts/jwts).

For more information on Auth0 Access Tokens refer to [Access Token](/tokens/concepts/access-tokens).
:::

An API can enforce fine-grained control over who can access the various endpoints exposed by the API. These permissions are expressed as scopes.

When a user authorizes a client application, the application can also indicate which permissions it requires. The user is then allowed to review and grant these permissions. These permissions are then included in the Access Token as part of the `scope` claim.

Subsequently, when the client passes along the Access Token when making requests to the API, the API can inspect the `scope` claim to ensure that the required permissions were granted in order to call the particular API endpoint.

::: panel What are Scopes?
Each Access Token may include a list of the permissions that have been granted to the client. When a client authenticates with Auth0, it will specify the list of scopes (or permissions) it is requesting. If those scopes are authorized, then the Access Token will contain a list of authorized scopes.

For example, the timesheet API may accept four different levels of authorization: reading timesheets (scope `read:timesheets`), creating timesheets (scope `create:timesheets`), deleting timesheets (scope `delete:timesheets`) and approving timesheets (scope `approve:timesheets`).

When a client asks the API to create a new timesheet entry, then the Access Token should contain the `create:timesheets` scope. In a similar fashion, in order to delete existing timesheets, the Access Token should contain the `delete:timesheets` scope.

For more information on scopes refer to [Scopes](/scopes).
:::

By using the OAuth 2.0 authorization framework, you can give your own applications or third-party applications limited access to your APIs on behalf of the application itself. Using Auth0, you can easily support different flows in your own APIs without worrying about the OAuth 2.0/<dfn data-key="openid">OpenID Connect (OIDC)</dfn> specification, or the many other technical aspects of API authorization.

::: panel OAuth Roles
In any OAuth 2.0 flow we can identify the following roles:

- __Resource Owner__: the entity that can grant access to a protected resource. Typically this is the end-user.
- __Resource Server__: the server hosting the protected resources. This is the API you want to access.
- __Client__: an application requesting access to a protected resource on behalf of the Resource Owner.
- __Authorization Server__: the server that authenticates the Resource Owner, and issues Access Tokens after getting proper authorization. In this case, Auth0.

Using [different grants types (or flows)](/api-auth/which-oauth-flow-to-use), these participants will interact to grant to the client apps limited access to the APIs you are building. As a result, the client app will obtain an Access Token that can be used to call the API on behalf of the user.
:::
