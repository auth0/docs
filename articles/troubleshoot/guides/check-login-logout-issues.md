---
title: Check Login and Logout Issues
description: Learn how to check login and logout to troubleshoot issues. 
topics:
  - login-issues
contentType: how-to
useCase: troubleshooting
---

# Check Login and Logout Issues

Here are things to check to help you narrow down when issues occur during login and logout.

## Login Issues

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

* Look in the [HAR file](/troubleshoot/guides/generate-har-files) for the call to your application callback URL.
* Find the ID Token (`id_token`) and check if it has the information needed by the application.

### If you decode the token or assertion does it have information you expect?

* View JWTs with [JWT.io](http://jwt.io).
* View <dfn data-key="security-assertion-markup-language">SAML</dfn> assertions with [SAMLTool.io](http://samltool.io).

### If the logged in user cannot access another application with Single Sign-on

1. Is the user trying to login to the second application from the same browser as their initial login?
2. Go to your [Tenant Settings > Advanced Settings](${manage_url}/#/tenant/advanced) and check the **Log In Session Management** settings. Was the second login attempt within the timeout periods?
3. Check the value passed as the `prompt` parameter in `/authorize` call.
4. Is the connection used to log in to the first application enabled for the second application?
5. Did the second application receive all the necessary user profile information?
6. If using a mobile device, you'll need to use a browser-based flow. For more information, see [Browser-Based vs. Native Login Flows on Mobile Devices](/design/browser-based-vs-native-experience-on-mobile).

### Check application logs

* Do your application logs show any errors?
* Did the application receive all the information it needs, such as groups or user profile attributes?

## Logout issues

* Did you whitelist your logout redirect URLs? If you are using a redirect URL in a logout call it must be registered in either the tenant or application settings.
* If you need federated logout, did you append the `?federated` parameter to the logout call?
* Make sure that the logout redirect URL is different from the login callback URL.
* Make the logout redirect URL an anonymous page (not protected by login) so that redirects to the logout redirect URL do not immediately trigger a login, which may confuse users.

## Keep reading

* [Common Auth0 Library Authentication Errors](/libraries/error-messages)
* [Troubleshoot Passwordless Authentication](/connections/passwordless/reference/troubleshoot)
* [Troubleshoot WordPress Plugin](/cms/wordpress/troubleshoot)