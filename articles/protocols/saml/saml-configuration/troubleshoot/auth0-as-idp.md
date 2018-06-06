---
description: How to troubleshoot SAML-related configuration issues when Auth0 is the identity provider
toc: true
  tags:
    - saml
    - sso
---

# Troubleshooting SAML when Auth0 is the Identity Provider

When troubleshooting a SAML login, there are four primary stages to check:

* Stage 1: The user is successfully redirected to IDP and is able to login.
* Stage 2: After login with the IDP, the user returns to Auth0 with a successful login event recorded.
* Stage 3: After a successful login event in Auth0, the user profile in Auth0 is correct.
* Stage 4: The user successfully redirects back to application and is able to access application.

The following sections describe how to check each stage and how to identify if there are any issues with a given stage.

## A successful login event does not show up in Auth0 logs

In this case, the user successfully logs in with the idp, but a successful login event does *not* show up in auth0 logs.

* If you're using an Auth0 Database Connection:

  * Check that the user exists and the entered password is correct.

  * Disable your [rules](/rules) temporarily to make sure that nothing is interfering with the login process.

  * If you've enabled [multifactor authentication](/multifactor-authentication), disable it temporarily to make sure that it is not interfering with the login process.

* If you're using an Auth0 Database Connection **or** a remote SAML connection:

  * Check that the SAML Connection works by [using **Try** to run a Connection test](#issue-the-idp-login-page-doesn-t-display).

## The user's profile attributes are incorrect

In this case, the user successfully logs in with the idp, a successful login event shows up in auth0 logs, but the user's profile attributes are incorrect.

If the user:

* Appears to log in successfully

* The [Logs](${manage_url}/#/logs) and [Users](${manage_url}/#/users) pages in the Auth0 Dashboard should successful login events

The next step is to check that the user's profile contains the necessary user profile attributes.

### Checking the user profile

1. After logging in to the [Auth0 Dashboard, navigate to *Users*](${manage_url}/#/users).

2. Find and click on the specific user to open up their profile. If there are multiple rows for a given user, be sure to open up the record associated with the SAML Connection.

3. On the user's profile, you can view their details in one of two ways. You can use the *Details* tab or the *Raw JSON* tab. This shows you what attributes Auth0 has received from the identity provider.

If an attribute is missing, check with the identity provider to confirm that it has the attribute and that it is returning that attribute to Auth0.

## The user cannot access the application

In this case, the user successfully logs in with the idp, a successful login event shows up in auth0 logs, and the user's profile attributes are correct, but the user cannot access the application.

* Check to see if the user's Auth0 profile populated correctly:

  1. After logging in to the [Auth0 Dashboard, navigate to *Users*](${manage_url}/#/users).

  2. Find and click on the specific user to open up their profile. If there are multiple rows for a given user, be sure to open up the record associated with the SAML Connection.

  3. On the user's profile, you can view their details in one of two ways. You can use the *Details* tab or the *Raw JSON* tab. This shows you what attributes Auth0 has received from the identity provider. Ensure that the profile includes all of the details required by the application.

  If a user attribute is missing, check with the identity provider to confirm that it has the attribute and that it is returning that attribute to Auth0.

* Check the application's log files to see if there are any error messages indicating why the user is unable to access the application. The two most common causes for this issue are missing user profile information or incorrect/missing authorization information.

* Check the information that Auth0 sends to the application by [capturing an HTTP trace of the login sequence](/har). To analyze the HTTP trace:

  1. View the trace in a HAR file analyzer, such as [Google's HAR Analyzer](https://toolbox.googleapps.com/apps/har_analyzer/).

  2. Scan through the sequence of URLS invoked in the HTTP trace:

    * The first few will be URLs for your application.

    * There will then by a redirect to an Auth0 URL (such as `${account.namespace}`).

    * After one or more intervening URLS, there will be a POST back to your application containing the SAML assertion with user inforation. The URL should be for the Assertion Consumer Service (ACS) of your application, which consumes the assertion and extracts the needed information. Be sure that the assertion includes this information:

      1. Click on the row for the POST call in the HAR analyzer.

      2. Switch to the POST Data tab, and look for the SAML response.

      3. Copy and paste the SAML response into a [SAML debugger](https://samltool.io/).

      4. Remve the SAML response at the beginning, as well as anything beginning with `&RelayState=` at the end.

      5. Click **Decode SAML message** and check the following fields:

        * **Destination**: the application URL that consumes the SAML assertion (and is also known as the Assertion Callback URL)

        * **Status Field**: this field should indicate success: `<samlp:StatusCode Value="urn:oasis:names:tc:SAML:2.0:status:Success"/>`

        * **Recipient**: the correct URL appears in the recipient field (indicated by th `<saml:SubjectConfirmation Method…` parameter)

        * **Audience**: the correct audience information is populated: `<saml:AudienceRestriction><saml:Audience>urn:{DOMAIN}:{YOUR APPLICATION}</saml:Audience>`

        * **Naming**: the attribute identified by the `NameIdentifier` field should be known to the application. If it's not, the identifier should be some other attribute within the assertion (such as an internal IdP identifier for the user or an email address)

        * **Signature Key**: check that the value indicated by the `X509Certificate` element matches the value provided to your connection

        * **Certificate**: compare the certificate sent to the one that you provided to the application

* Ensure that the SAML assertion contains any additional information required by the application and that the information is present in the attributes expected by the application.

  * If you need to alter the assertion sent from Auth0 to your application, you can add or map attributes using [rules](/rules).

    * Log into Auth0 and [navigate to Rules](${manage_url}/#/rules).

    * Click **Create Rule** and, in the next page, choose the **Change your SAML configuration** template.

    * In the rules editor, uncomment the lines you want to use. Lines 9-17 in the template can be used to map attributes as needed. You can also add lines to implement mappings.  The left side of each line specifies the identifier for the attribute in the assertion. The right side of each line references the Auth0 user profile attribute whose value will be used to populate the outgoing assertion sent to the application.

    ```text
    //context.samlConfiguration.mappings = {
    //   "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier":      "user_id",
    //   "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress":        "email",
    //   "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name":                "name",
    //   "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname":           "given_name",
    //   "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname":             "family_name",
    //   "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/upn":                 "upn",
    //   "http://schemas.xmlsoap.org/claims/Group":                                   "groups"
    // };
    ```

    ![](/media/articles/protocols/saml/saml-configuration/saml-rules.png)

## When I try to logout I get the error: No active session(s) found matching LogoutRequest

The `SessionIndex` and `NameID` values in the SAML Logout request need to match the ones received by the service provider in the original SAML assertion.
