---
description: Example workflow shows how the auth0-spa-js SDK should be implemented to support multi-site session management.
toc: true
topics:
  - sessions
  - sso-session
  - auth0-session
  - application-session
contentType: concept
useCase:
  - application-session-workflow
---

# Example: Application Sessions and SSO Sessions Workflow

This workflow shows how the `auth0-spa-js` SDK should be implemented to support multi-site session management.  In this scenario, it is assumed that the tenant SSO Inactivity Timeout is set to 300 seconds, and the ID Token Expiration of each SPA application is set to 150 seconds. This is considered a "short-lived" session. 

::: panel Support for Long-Lived Sessions
Auth0 supports long-lived sessions for enterprise Auth0 customers. With long-lived sessions, you can configure session limits with up to 100 days of inactivity (idle timeout) and up to one year in total duration (absolute timeout). If you have quarterly, monthly, or other timelines, this allows you to reduce friction for end-users and provide access to low-risk content and capabilities. In addition, media companies can leverage long-lived sessions for improving user experiences through seamless access to content. You can also make the choices between long-lived sessions and password validation based on your requirements around user experience and security. 

Workflow details would change in the case of a long-lived session where the application session would most likely be shorter than the <dfn data-key="single-sign-on">[Single Sign-on (SSO)](/sso)</dfn> session.

Learn more about this feature in the [When UX Equals Keeping or Losing the Customer](https://auth0.com/blog/when-ux-equals-keeping-or-losing-the-customer/) launch announcement blog post. You can also see [Configure Session Lifetime Limits](/sso/current/configure-session-lifetime-limits) and [Update Access Token Lifetime](/dashboard/guides/apis/update-token-lifetime) for more information.
:::

## SDK features

### PKCE flow

For all methods of retrieving an ID Token or Access Token, the SDK manages all the intricacies of the Proof Key for Code Exchange workflow. No additional effort or configuration is needed for this to work.

### Deep linking

To improve the user experience the SDK includes an `appState` parameter for the `loginWithRedirect()` method. Details about the current app are packaged as part of the request to the Auth server that will be returned upon successful authentication. Allowing a seamless continuation of the user journey. 

In the Quickstart, the `PrivateRoute` component sets a state parameter of `targetUrl` and the `onRedirectCallback` function of `index.js` unpacks this value to redirect the user when authentication is complete.

### Token storage

To keep the returned tokens stored in the safest manner possible all tokens are placed into a local cache. The ID and Access Tokens are stored as pairs with the audience and scope values being used to retrieve the tokens as needed.

Additionally the cache tokens are removed once either the ID Token or Access Token expires so that if a token is in the cache it can be assumed to stil be valid.

### Calling APIs

The `getTokenSilently()` method is used to leverage the token cache first, and if none exists, will launch an invisible iframe to retrieve a new token.  For this purpose all requests to APIs can use this method to construct the bearer token header without the need for additional logic to handle for expired tokens.

In the Quickstart, the `ExternalService` view makes a request to the express API using this feature.

### Warn users to continue their sessions

In the case where a user has not taken any actions that would cause the Auth0 session to be updated, Auth0 recommends that you raise a warning to the user to choose to explicitly continue their session.

The intent of this approach allows the session to go inactive if the user is no longer present, but otherwise provides a means to trigger the silent token refresh so that the can continue their session without the need to be prompted again for credentials. 

See [Application-specific logout URLs](/sessions/concepts/session-lifetime#application-specific-logout-urls) for more information about inactivity timers and timeout modals. 

## Example workflow

1. [Initial Authentication](#initial-authentication)
2. [Maintaining Auth0 Session](#maintaining-auth0-session)
3. [Seamless SSO](#seamless-sso)
4. [Prompting user to extend session](#prompting-user-to-extend-session)
5. [User explicitly logs out of application](#user-explicitly-logs-out-of-application)
6. [User returns to initial app after logging out](#user-returns-to-initial-app-after-logging-out)

### Initial authentication

![Initial Authentication](/media/articles/sessions/initial-authentication.png)

### Maintaining Auth0 session

![Maintain Auth0 Session](/media/articles/sessions/maintain-auth0-session.png)

### Seamless SSO

![Seamless SSO](/media/articles/sessions/seamless-sso.png)

### Prompting user to extend session

![Prompting User to Extend Session](/media/articles/sessions/prompt-user-extend-session.png)

### User explicitly logs out of application

![User Explicitly Logs Out of Application](/media/articles/sessions/user-explicitly-logs-out-of-app.png)

### User returns to initial application after logging out

![User Returns to Initial Application After Logging Out](/media/articles/sessions/user-returns-to-initial-app.png)

## Keep reading

* [Sessions](/sessions)
* [Session Layers](/sessions/concepts/session-layers)
* [Cookies](/sessions/concepts/cookies)
* [sameSite Cookie Attributes](/sessions/concepts/cookie-attributes)
* [Session Lifetime](/sessions/concepts/session-lifetime)
* [Logout](/logout)
* [Session Use Cases](/sessions/references/sample-use-cases-sessions)
