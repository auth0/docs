---
description: How to redirect users to URLs that have not been whitelisted
topics:
  - users
  - user-management
  - redirection
contentType:
  - how-to
useCase:
  - manage-users
---
# Redirect Users After Login Authentication

You can return users to specific pages (URLs) within your application after validating their ID Tokens (authentication). To see an example of how this works, try the [React: Login Quickstart](/quickstart/spa/react). 

## Redirect users to whitelisted callback URLs

Because callback URLs can be manipulated by unauthorized parties, Auth0 recognizes only whitelisted URLs set in the **Allowed Callback URLs** field of an [Application's Settings](${manage_url}/#/applications/${account.clientId}/settings) as valid. To return users to whitelisted callback URLs, it is necessary for your application to know how to continue the user on their journey. 

There are two methods for doing this:

* Using cookies and browser sessions
* Using `state` parameters

During a user's authentication, the `redirect_uri` request parameter is used as a callback URL. This is where your application receives and processes the response from Auth0, and is often the URL to which users are redirected once the authentication is complete. For more information on how the `redirect_uri` works, see [OAuth 2.0](/protocols/oauth2).

### Use cookies or browser sessions

You can use a cookie or the browser session to store a return URL value. This is a simple solution to implement, however it can cause issues in cases where a cookie does not persist. There are two separate user sessions initiated in this situation. Each serves a separate purpose and requires some consideration to achieve the desired user experience.

* **Auth0-provided OIDC SSO Session**: Auth0 provides a session for enabling [OIDC Single Sign On (SSO)](/api-auth/tutorials/adoption/single-sign-on) to allow your user to maintain an authentication session without being prompted for credentials more than once. This session is maintained by Auth0 and referenced as a cookie bound to your tenant domain (or `CNAME`). There are two [tenant settings](/sso/current/configure-session-lifetime-limits) that determine the length of the Auth0 Session:
  - The `idle_session_lifetime` is how long the session will remain alive without interaction.  
  - The `session_lifetime` is the maximum duration that the session is allowed to remain alive. 
  
  These settings apply to all applications within your tenant and should be configured to align with the security model that matches your use case.  

* **Application Session**: Your application must also maintain a concept of session.  Throughout the user session, your application may need to request additional tokens or renew expired ones. You should store these tokens in your application and reference them using an identifier passed back to the browser using a secure cookie. 

Once your user has authenticated with Auth0 it is up to your application to determine how long it persists this session.

### Use `state` parameters

As an alternative method, you can create a [deep link using the `state` parameter](/protocols/oauth2/redirect-users) which your callback would interpret to determine a forwarding path. This solution takes a little more work to implement but guarantees that the application has the information it needs once the redirect is complete. 

In essence, you send a random value when starting an authentication request and validate the received value when processing the response (this implies you store something on the client application side, in session or other medium, that allows you to perform the validation). If you receive a response with a state that does not match, you were likely been target of an attack because this is either a response for an unsolicited request or someone trying to forge the real response.

Your application type determines the best place to keep the data that allows your app to validate the response. For example, assuming a pregressive web app is leveraging a SPA framework then it could store this in local storage while a traditional web app framework would store it in server-side session.

## Redirect users to other URLs

Sometimes, the callback URL is not necessarily where you want users redirected after authentication. For example, if a user intends to access a protected page in your application, and that action triggers the request to authenticate, you can store that URL to redirect the user back to their intended page after the authentication finishes. Store the desired URL using the following methods:

* [Redirect users with state parameters](/protocols/oauth2/redirect-users)
* [Redirect users from within rules](/rules/current/redirect)

Choose the option that works best for your application type and the type of [flow](/api-auth/which-oauth-flow-to-use) that you are using. Create the necessary logic in your application to retrieve the stored URL and redirect your users where you want them to go. The [Auth0 SDKs](/libraries/auth0js/v9#available-parameters) also include support for redirect URLs.
  
## Keep reading

* [Progressive Profiling](/users/concepts/overview-progressive-profiling)
* [Redirect Users After Logout](/logout/guides/redirect-users-after-logout)
* [Redirect Rule Best Practices](/best-practices/rules#redirection)
* [OAuth 2.0 Authorization Framework](/protocols/oauth2)
* [API Authorization](/api-auth)
