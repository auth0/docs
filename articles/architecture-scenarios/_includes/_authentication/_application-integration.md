Once you've figured out how you want to authenticate your users, the next step is to determine how you will initiate that authentication. Each application will typically have its own starting point.

::: warning
Native mobile applications (and desktop applications) should use the system browser for authentication, or they open themselves up to additional security risks. See [Native vs. Browser Login on Mobile](/design/browser-based-vs-native-experience-on-mobile) for more information. 
:::

As discussed, we've found that most of our customers use <dfn data-key="openid">[OpenID Connect (OIDC)](/protocols/oidc)</dfn> as the industry-standard protocol when it comes to their customer-facing applications. Figuring out which [OIDC flow](/api-auth/intro) to use is your first task, and you will want to start by reviewing the our [grant mapping](/applications/reference/grant-types-auth0-mapping) guidance in the first instance.  

If you want to allow anonymous users access to any part of our application then you need to determine if you will be redirecting right away or prompting your users to redirect only when required (or perhaps some combination of both; see [Redirect Users After Login Authentication](/users/guides/redirect-users-after-login) for further discussion). If users can [deep link](#deep-linking-to-protected-endpoints) to a protected version (or area) of your site then you will need to determine the links to your application that will result in an automatic redirect to Auth0. 

### Anonymous access

It is important to consider the user experience when someone first comes to your application. If your application supports anonymous user access (quite common for eCommerce applications) there are different scenarios to consider:

* Are they returning to the application after having already logged in, or
* If this is the first time they are accessing the application:
  * Have they already accessed a different application that uses the same Auth0 tenant,
  * Have they ever (or perhaps not in a long time) authenticated on this device or browser.

When an anonymous user accesses your application, it can often be desirable for the application to discover if the user has already logged into a different application in the same family, or to remember this user even if the application is a [SPA](/quickstart/spa) with no state. For example, if you can determine that the user is already logged in, you might decide to have the UI header in the application skip displaying a login button and instead have an account or profile menu for the user. To accomplish this you will want to utilize "[silent authentication](/api-auth/tutorials/silent-authentication)". Silent authentication will allow you to check to see if the user is logged in without prompting them to log in if they are not. Then the application can present a login button if necessary. If the user is logged in already, however, then you will receive tokens and will not have to present the user with a login button again.

::: warning
Checking for a login session by redirecting to Auth0 can be really helpful for your application, but if this will result in a lot of requests it is important to employ some sort of throttling mechanism to avoid latency and/or rate limiting. <%= include('../../_includes/_rate-limit-policy.md') %>
:::

### Deep linking to protected endpoints

There are a variety of reasons why someone might link directly to a particular page within your application that is only accessible by authenticated users. If this is possible for your application you should automatically redirect your user to Auth0 if they are not authenticated. Once they authenticate and the authorization server returns them to your application, you can [redirect them](/users/guides/redirect-users-after-login) to where they intended to go in the first place.

::: panel Best Practice
Most modern authentication frameworks support middleware for redirecting to an authorization server such as Auth0. Ensure yours:

* Is configurable
* Can check expirations
* Supports <dfn data-key="refresh-token">Refresh Tokens</dfn> (for confidential clients)
:::

### Authenticating the user

Authentication is the process of determining user identity. The result of authentication in an OIDC context is an ID Token. This token contains information about the user and should only be able to be obtained if the user authenticates using one or more factors as defined by the authorization server (the most common form being [user ID and password](#username-and-password-authentication)). There are a few things you may also need to consider in addition to obtaining an ID Token:

* Do we also need an [Access Token](/tokens/concepts/access-tokens) in order to call a shared API?
* Is your application a single-page application and only requires an [ID Token](/tokens/concepts/id-tokens)? See [Implicit Grant](/api-auth/tutorials/implicit-grant) for more information. 
* Is your application a native application (mobile or desktop) and/or do you need a [Refresh Token](/tokens/concepts/refresh-tokens)? See [Authorization Code Grant with PKCE](/api-auth/tutorials/authorization-code-grant-pkce) for more information. 

::: warning
Before you go live, you should ensure that **only** the grants that you are using for each application are enabled in your [configuration for your Application](/dashboard/guides/applications/update-grant-types).
:::

### Implicit grant

If all your application needs is the ID Token and the application is browser-based, then you can always use the [implicit grant](/api-auth/tutorials/implicit-grant) to get your ID Token. This is a simple authentication flow and should be supported by your SDK (depending on the language you are developing in).

::: warning
If you need a [Refresh Token](/tokens/concepts/refresh-tokens) so that you can obtain a new Access Token or ID Token without having to re-authenticate the user, then you must use the [authorization code grant](/api-auth/tutorials/authorization-code-grant).
:::

### Authorization code grant (with or without PKCE)

If your SDK only supports the Authorization Code grant, or you need an Access Token or Refresh Token, then Authorization Code grant (with or without [PKCE](/flows/concepts/auth-code-pkce)) can also be used to retrieve an ID Token.  The Authorization Code grant includes an additional API call to exchange the code for a token which can result in additional unnecessary latency if all you need is the ID Token. In many cases the [hybrid flow](/api-auth/tutorials/hybrid-flow) is implemented to provide optimum access to the ID Token while still leveraging Authorization Code grant workflow for the secure and safe retrieval of Access and Refresh Tokens.
