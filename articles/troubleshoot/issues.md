---
description: This guide has troubleshooting tips for each authentication step and for things like getting user profile information.
toc: true
topics:
  - troubleshooting
  - errors
contentType:
  - how-to
useCase:
  - troubleshooting
---

# Troubleshooting Issues With ...

In this guide you'll find tips for troubleshooting each authentication step and for things like getting user profile information. If these tips don't outright solve your issue, they can at least narrow down a possible cause and help Auth0 support resolve your issue faster.

## Login issues

Here are things to check to help you narrow down where issues are occurring during login.

### Is the user prompted for login credentials?

* Does the HAR file show a call to the authorization server (`/authorize` endpoint)?
* Is the connection enabled for the application?
* Is the remote authorization service available? 
* If using the [Auth0 Universal Login Page](/hosted-pages/login), try turning off customization and see if authentication works. If login works without your customizations, review your Universal Login Page customization code.

### Is an error message shown after entering credentials?

* Can you test login another way to ensure credentials are correct?
* If password expiration is a possibility, check if password has expired.
* Check your browser's developer tools or web inspector console for errors in the flow before returning to Auth0.
* Check the HAR file - does it show a return to Auth0 (`/login/callback`endpoint)?
    - If not, check that the identity provider has the correct callback URL for Auth0.

### Is a login session established for the user at the authorization server?

* To test this, open a second tab in the same browser and go to the same URL. Are you prompted to log in again?
    - If you're not prompted to log in, a session is there.

### Is a log entry created in your Auth0 Logs?

* If no log entry was created the authentication transaction did not complete or return to Auth0.
* Check the response from the authorization server for error messages.
* Check authorization server logs (if possible) for errors.

### Is an entry created in Auth0 user’s screen with all correct profile info?

* If not, check the response from authorization server in the HAR file. It may not be returning information about the user
* If you're using rules, check your rules scripts for issues.
* If you're using a custom database connection, check your database action scripts for issues.
* If you're using LDAP, check the profile mapper script (`profileMapper.js`) for issues.
* Check your social connection configurations for what profile information is requested.

### Does the HAR file show a token or assertion returned to application?

* Look in the HAR file for the call to your application callback URL.
* Find the ID Token (`id_token`) and check if it has the information needed by the application.

### If you decode the token or assertion does it have information you expect?

* JSON Web Tokens (JWT) can be viewed with [JWT.io](http://jwt.io)
* <dfn data-key="security-assertion-markup-language">SAML</dfn> assertions can be viewed with [SAMLTool.io](http://samltool.io)

### Check your application logs

* Do your application logs show any errors?
* Did the application receive all the information it needs, such as groups or user profile attributes?

## Single Sign-on issues

Here's some things to check if the user logged in to one application, but cannot access a second application through <dfn data-key="single-sign-on">Single Sign-on (SSO)</dfn>.

### If the logged in user cannot access another application with Single Sign-on

* Is the user trying to login to the second application from the same browser as their initial login?
* Go to your [Tenant Settings > Advanced Settings](${manage_url}/#/tenant/advanced) and check the **Log In Session Management** settings.
    - Was the second login attempt within the timeout periods?
* Check the value passed as the `prompt` parameter in `/authorize` call.
* Is the connection used to log in to the first application enabled for the second application?
* Did the second application receive all the necessary user profile information?
* If using a mobile device, you'll need to use a browser-based flow. For more information, check out [Browser-Based vs. Native Login Flows on Mobile Devices](/design/browser-based-vs-native-experience-on-mobile).

## Issues with getting user profile information

* Is user profile information correct at the source (authorization server)?
* Check the HTTP Archive, look for an `id_token`.
* Decode the `id_token` at [JWT.io](https://jwt.io) to see if it has the correct information.
* Check any custom database scripts or rule logic.
* Check if you called `/tokeninfo` endpoint and have a custom domain configured within Auth0. If so, you need to use `/userinfo` endpoint instead
* Check if you called `/userinfo` endpoint properly. You should pass an access token. You should call this endpoint with the default Auth0 domain even if the tenant has a custom domain enabled.  
* Check if you specified the correct [scope](/scopes) to get an Access Token?

## Issues with checking session state

* Are you using the correct domain?
    - The domain should be the same as that used during authentication.
* If using an Auth0 [Custom Domain](/custom-domains), it is important to use the same domain as used in the application to invoke authentication.

## Logout issues

* Did you whitelist your logout redirect URLs? If you are using a redirect URL in a logout call it must be registered in either the tenant or application settings.
* If you need federated logout, did you append the `?federated` parameter to the logout call?
* Make sure that the logout redirect URL is different from the login callback URL.
* Make the logout redirect URL an anonymous page (not protected by login) so that redirects to the logout redirect URL do not immediately trigger a login, which may confuse users.

## Issues with calling the Management API

* Do you have a [Management API Access Token](/api/management/v2/tokens)?
* Did the Access Token expire?
* Did the Access Token contain the scopes needed for the call you made?
* If a rule adjusts the scopes in the Access Token or checks whether specific users are allowed to have the scopes, have you checked the rule to make sure it is executing correctly?  
* Get the Access Token from [a HAR file](/troubleshoot/har) and test it in the [Auth0 Management API Explorer](/api/management/v2/) to see if it works there
* If you are calling the Auth0 Management API from an application that authenticates with Client Credentials flow, note that rules are not executed in this context. The Client Credentials Exchange Hook can be used in this context instead, for functionality similar to a rule.

## Issues with calling your API

* Check in the [HAR file](/troubleshoot/har) if the Access Token contains correct scopes to call the API.
* Check if the response to the `/authorize` endpoint call contains a scopes object. If so, check if the returned scopes are different from the requested scopes.
* Make sure your [API can validate the Access Token](/tokens/guides/access-token/validate-access-token).  It should validate the audience, issuer, client (if any), signature algorithm, signature, claims and permissions.
* If you experience errors with Access Token expiration, they could be caused by [clock skew differences manifested across different systems](/connector/troubleshooting#clock-skew) or even different language libraries, such as Java and Node.js.  This can be handled by running NTP on servers and configuring a clock skew tolerance in libraries used to validate tokens such as [jwt.verify](https://github.com/auth0/node-jsonwebtoken#jwtverifytoken-secretorpublickey-options-callback).

## Issues that affect only one or a few users

* Check the user's profile, browser, or device for any issues.
* Check to see if it happens in all browsers for the affected users (indicating a data issue) or just certain types of browsers (indicating a browser-specific issue).
* Check to see if the browser has enabled JavaScript and cookies.
* Check that the caps lock key is disabled.
* If the user is using a mobile device, check to see if there's any software that might impact authentication and/or authorization (such as not running some type of required software).
* Check to see if the user can access some of the application's key URLs, such as the identity provider's <dfn data-key="single-sign-on">Single Sign-on (SSO)</dfn> URL (indicating a network connectivity issue).

## Issues that occur after go-live (worked before, then stopped working)

* Check if any recent changes to your application or any APIs you call?
* Check if any recent network changes (load balancer, firewall, proxy config changes).
* Check if any recent infrastructure changes (e.g. credentials for LDAP or DB servers?)
* Check for any patches or updates to applications, infrastructure, or technology stacks.
* Check that all your servers are running NTP and have accurate time sync
* Check if any of your certificates have expired.
* Check with owners of any remote identity providers if anything changed.
    - Check network connectivity to any remote identity providers.
* Check notifications in Auth0 dashboard/migrations - any changes you overlooked?
* Check Auth0 change log - any recent configuration changes related to your issue?
* Check if any component in the technology stack has been updated or patched recently?

