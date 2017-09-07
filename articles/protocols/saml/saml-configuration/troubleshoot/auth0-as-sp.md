---
description: How to troubleshoot SAML-related configuration issues when Auth0 is the service provider
toc: true
---

# Troubleshooting SAML when Auth0 is the Service Provider

When troubleshooting a SAML login, there are four primary stages to check:

* Stage 1: The user is successfully redirected to IDP and is able to login.
* Stage 2: After login with the IDP, the user returns to Auth0 with a successful login event recorded.
* Stage 3: After a successful login event in Auth0, the user profile in Auth0 is correct.
* Stage 4: The user successfully redirects back to application and is able to access application.

The following sections describe how to check each stage and how to identify if there are any issues with a given stage.

## Issue: The IdP Login Page Doesn't Display

* Test the Connection. Navigate to [Connections -> Enterprise](${manage_url}/#/connections/enterprise). Open up the list of **SAMLP Identity Providers**, and click **Try** (represented by the triangle icon) next to the Connection to test the interaction between Auth0 and the remote IdP.  If the Connection does **not** work, continue with the steps detailed in this section. If it does, proceed to the next section.

  ![](/media/articles/protocols/saml/saml-configuration/test-connection.png)

* Check the Connection's settings. Navigate to [Connections -> Enterprise](${manage_url}/#/connections/enterprise). Open up the list of **SAMLP Identity Providers**, and click **Settings** (represented by the gear icon) to launch the tab associated with your Connection.

  ![](/media/articles/protocols/saml/saml-configuration/check-connection-settings.png)

  * Check and confirm with the administrator of the IdP that the value in the  Sign In URL field is the correct SSO URL. This is the URL to which Auth0 will redirect the user for authentication.

  * Check with the IdP administrator for information on whether the IdP expects HTTP-POST binding or HTTP-Redirect binding. You can switch the default binding in the *Settings* tab.

  * Check with the IdP administrator for information on whether your authentication requests should be signed. If so, which signing algorithm does the IdP expect you to use? (Note that authentication requests are not commonly signed.) If you're sending signed requests, enable the Connection Settings **Sign Request** toggle and make sure the **Signing Algorithm** value matches what the IDP expects.

* Ask IdP administrator to check for log entries that might provide information on the problem.

## Issue: Auth0 Logs Don't Show Successful Login Event

In this case, the user successfully logs in with the identity provider, but the Auth0 logs do not show a successful login event.

* If the user appears to log in successfully with the IdP, check the [Logs](${manage_url}/#/logs) and [Users](${manage_url}/#/users) pages in the Auth0 Dashboard to see if Auth0 shows a successful login event.

  * If Auth0's logs don't show a successful login event, there is probably an issue with the SAML Authentication Assertion returned by the IdP *or* Auth0 is unable to consume the assertion.

  * Check the information that Auth0 sends to the application by [capturing an HTTP trace of the login sequence](/har). To analyze the HTTP trace:

    1. View the trace in a HAR file analyzer, such as [Google's HAR Analyzer](https://toolbox.googleapps.com/apps/har_analyzer/).

    2. Scan through the sequence of URLS invoked in the HTTP trace:

      * The first few will be URLs for your application.

      * There will then by a redirect to an Auth0 URL (such as `${account.namespace}`).

      * After one or more intervening URLS, there will be a POST back to Auth0 containing the SAML assertion with user inforation. The URL should be for the Assertion Consumer Service (ACS) of Auth0, which consumes the assertion and extracts the needed information. Be sure that the assertion includes this information:

        1. Click on the row for the POST call in the HAR analyzer.

        2. Switch to the POST Data tab, and look for the SAML response.

        3. Copy and paste the SAML response into a [SAML debugger](https://samltool.io/).

        4. Remove the "SAML response" at the beginning, as well as anything beginning with `&RelayState=` at the end.

        5. View the decoded SAML message and check the following fields:

          * **Destination**: destination for the SAML response is correct Auth0 Tenant and Connection (`https://{TENANT}.auth0.com/login/callback?connection={CONNECTION}`)

          * **Status Field**: this field should indicate success: `<samlp:StatusCode Value="urn:oasis:names:tc:SAML:2.0:status:Success"/>`

          * **Recipient**: the `<saml:SubjectConfirmation` Method...element contains correct tenant and connection in the “Recipient” field (`https://{TENANT}.auth0.com/login/callback?connection={CONNECTION}`)

          * **Audience**: the SAML Audience restriction field contains the correct tenant and connection information (`<saml:AudienceRestriction><saml:Audience>urn:auth0:{TENANT}:{CONNECTION}</saml:Audience>`)

          * **Naming**: the attribute identified by the `NameIdentifier` field should be known to the application. If it's not, the identifier should be some other attribute within the assertion (such as an internal IdP identifier for the user or an email address)

          * **Signature Key**: check that the value indicated by the `X509Certificate` element matches the value provided to your connection

          * **Certificate**: compare the certificate sent to the one that you provided to the application

## Issue: The User's Profile Attributes are Incorrect

In this case:

* The user successfully logs in with the IdP
* The Auth0 logs show a successful login event
* The user's profile attributes are *not* correct

* Check to see if the user's Auth0 profile populated correctly:

  1. After logging in to the [Auth0 Dashboard, navigate to *Users*](${manage_url}/#/users).

  2. Find and click on the specific user to open up their profile. If there are multiple rows for a given user, be sure to open up the record associated with the SAML Connection.

  3. On the user's profile, you can view their details in one of two ways. You can use the *Details* tab or the *Raw JSON* tab. This shows you what attributes Auth0 has received from the identity provider.

### If the User Profile Attribute is Missing

If the attribute is missing, check to see if the attribute was included in the assertion. You can do this by decoding the SAML assertion (see instructions in previous step), or you can enable debugging for the connection. You can do this by navigating to [Connections -> Enterprise](${manage_url}/#/connections/enterprise). Open up the list of **SAMLP Identity Providers**, click on **Settings**, and enable **Debug Mode**.

![](/media/articles/protocols/saml/saml-configuration/debug-connection.png)

With **Debug Mode** enabled, **Success Login** log entries [in the dashboard](${manage_url}/#/logs) will have an `original_profile` property listing every attribute included in the SAML assertion by the Identity Provider. You can use this list to know the information that the IdP is sending and to help you create the mappings. If the missing attribute is not in the assertion at all, please work with the IdP to make sure it is included.

### If the User Profile Attribute is Incorrectly Mapped

If an attribute value exists in the Auth0 user profile, but is not mapped to the right attribute, you can correct this via the Connection Mapping capability.

You can do this by navigating to [Connections -> Enterprise](${manage_url}/#/connections/enterprise). Open up the list of **SAMLP Identity Providers**, click on **Settings**, and switching over to the *Mappings* tab.

![](/media/articles/protocols/saml/saml-configuration/mappings.png)

Within the provided editor, there is a JSON snippet you can edit to configure your mappings. The name on the left is the Auth0 user profile attribute to which the assertion value will be mapped. The value on the right is the identifier in the SAML assertion from which the attribute comes.

## Issue: The User Cannot Access the Application

In this case:

* The user successfully logs in with the identity provider;
* The Auth0 logs show a successful login event;
* The user's profile attributes are correct;
* The user *cannot* access the application.

* Check to see if the user's Auth0 profile populated correctly:

  1. After logging in to the [Auth0 Dashboard, navigate to *Users*](${manage_url}/#/users).

  2. Find and click on the specific user to open up their profile. If there are multiple rows for a given user, be sure to open up the record associated with the SAML Connection.

  3. On the user's profile, you can view their details in one of two ways. You can use the *Details* tab or the *Raw JSON* tab. This shows you what attributes Auth0 has received from the identity provider.

* Check the application's log files to see if there are any error messages indicating why the user is unable to access the application. The two most common causes for this issue are missing user profile information or incorrect/missing authorization information.

* Check the information that Auth0 sends to the application by [capturing an HTTP trace of the login sequence](/har). To analyze the HTTP trace:

  1. View the trace in a HAR file analyzer, such as [Google's HAR Analyzer](https://toolbox.googleapps.com/apps/har_analyzer/).

  2. Scan through the sequence of URLS invoked in the HTTP trace:

    * The first few will be URLs for your application.

    * There will then by a redirect to an Auth0 URL (such as `${account.namespace}`).

    * After one or more intervening URLS, there will be a POST back to your application containing the SAML assertion with user inforation. The URL should be for the Assertion Consumer Service (ACS) of your application, which consumes the assertion and extracts the needed information. Be sure that the assertion includes this information:

      1. Click on the row for the POST call in the HAR analyzer.

      2. Switch to the POST Data tab, and look for the SAML response.

      3. Copy and paste the SAML response into a [SAML debugger](https://rnd.feide.no/simplesaml/module.php/saml2debug/debug.php).

      4. Remve the SAML response at the beginning, as well as anything beginning with `&RelayState=` at the end.

      5. Click **Decode SAML message** and check the following fields:

        * **Destination**: the application URL that consumes the SAML assertion (and is also known as the Assertion Callback URL)

        * **Status Field**: this field should indicate success: `<samlp:StatusCode Value="urn:oasis:names:tc:SAML:2.0:status:Success"/>`

        * **Recipient**: the correct URL appears in the recipient field (indicated by th `<saml:SubjectConfirmation Method…` parameter)

        * **Audience**: the correct audience information is populated: `<saml:AudienceRestriction><saml:Audience>urn:{DOMAIN}:{YOUR APPLICATION}</saml:Audience>`

        * **Naming**: the attribute identified by the `NameIdentifier` field should be known to the application. If it's not, the identifier should be some other attribute within the assertion (such as an internal IdP identifier for the user or an email address)

        * **Signature Key**: check that the value indicated by the `X509Certificate` element matches the value provided to your connection

        * **Certificate**: compare the certificate sent to the one that you provided to the application

* If your authorization flow uses an OIDC-conformant protocol, you can [capture a HAR trace](/har) and view it using [Google's HAR Analyzer](https://toolbox.googleapps.com/apps/har_analyzer/).

  * Scan through the sequence of URLs in the trace, and look for the following:

    * The first few will be URLs for your application.

    * There will then by a redirect to an Auth0 URL (such as `${account.namespace}`).

    * Further down is your application's callback URL. Make sure that it's correct.

  * Retrieve the `id_token` from this call, and paste it into [a JWT decoder](https://jwt.io/). Check that the claims in the token contain the information needed by the application.

### Troubleshooting IdP-initiated Flows

If you're using an IdP-initiated flow (for example, the user starts at the identity provider in a portal application), be sure that:

* The ACS URL at the identity provider includes the connection name (for example `https://${account.namespace}.auth0.com/login/callback?connection=CONNECTION_NAME`)

* The IdP-initiated configuration tab for the Connection is properly filled in, including:

  * The application to which the user should be sent;

  * The protocol between the application and Auth0 (which is not necessarily **SAML** like the connection, and most likely is **Open ID Connect**);

  * Any protocol-specific values to include in the query string, such as `scope`, `response_type`, `redirect_uri`, and `audience`. These values should match the ones expected by the application when using a SP-initiated flow.

* Disable your [rules](/rules) temporarily to make sure that nothing is interfering with the login process.

* If you've enabled [multifactor authentication](/multifactor-authentication), disable it temporarily to make sure that it is not interfering with the login process.

* Check that the SAML Connection works in an SP-Initiated flow by [using **Try** to run a Connection test](#issue-the-idp-login-page-doesn-t-display).
