---
description: How to troubleshoot SAML-related configuration issues when Auth0 is the service provider
toc: true
topics:
  - saml
  - sso
contentType:
  - how-to
useCase:
  - add-idp
---

# Troubleshooting SAML when Auth0 is the Service Provider

When troubleshooting a <dfn data-key="security-assertion-markup-language">SAML</dfn> login, there are four primary stages to check:

* Stage 1: The user is successfully redirected to an identity provider (IdP) and is able to login.
* Stage 2: After login with the IdP, the user returns to Auth0 with a successful login event recorded.
* Stage 3: After a successful login event in Auth0, the user profile in Auth0 is correct.
* Stage 4: The user successfully redirects back to application and is able to access application.

The following sections describe how to check each stage and how to identify if there are any issues with a given stage.

## Issue: The IdP Login Page Doesn't Display

### Test the Connection

Navigate to [Connections -> Enterprise](${manage_url}/#/connections/enterprise). Open up the list of **SAMLP Identity Providers**, and click **Try** (represented by the triangle icon) next to the Connection to test the interaction between Auth0 and the remote IdP.

If the Connection does **not** work, continue with the steps detailed in this section. If it does, [proceed to the next section](#).

  ![](/media/articles/protocols/saml/saml-configuration/test-connection.png)

### Check the Connection's Settings

Navigate to [Connections -> Enterprise](${manage_url}/#/connections/enterprise). Open up the list of **SAMLP Identity Providers**, and click **Settings** (represented by the gear icon) to launch the tab associated with your Connection.

  ![](/media/articles/protocols/saml/saml-configuration/check-connection-settings.png)

Check and confirm the following with the IdP administrator:

* That the Sign In URL is the correct <dfn data-key="single-sign-on">Single Sign-on (SSO)</dfn> URL. This is the URL that Auth0 will redirect the user to for authentication.
* If the IdP expects HTTP-POST binding or HTTP-Redirect binding. You can switch the default binding in the __Settings__ tab.
* If your authentication requests should be signed. If so, which signing algorithm does the IdP expect you to use? (Note that authentication requests are not commonly signed.) If you're sending signed requests, enable the Connection Settings **Sign Request** toggle and make sure the **Signing Algorithm** value matches what the IdP expects.
* Ask the IdP administrator to check for log entries that might provide information on the problem.

## Issue: Auth0 Logs Don't Show Successful Login Event

In this case, the user successfully logs in with the identity provider, but the Auth0 logs do not show a successful login event. You can check the [Logs](${manage_url}/#/logs) and [Users](${manage_url}/#/users) pages in the Auth0 Dashboard to see if Auth0 shows a successful login event.

If Auth0's logs don't show a successful login event, there is probably an issue with the SAML Authentication Assertion returned by the IdP or Auth0 is unable to consume the assertion.

### Check the SAML Authentication Assertion

Check the information that Auth0 sends to the application by [capturing an HTTP trace of the login sequence](/troubleshoot/guides/generate-har-files) and analyzing the HTTP trace.

#### Retrieve the Assertion

You can view the HTTP trace in a HAR file analyzer, such as [Google's HAR Analyzer](https://toolbox.googleapps.com/apps/har_analyzer/).

1. First, scan through the sequence of URLs invoked in the HTTP trace.
    * The first few will be URLs for your application.
    * There will then be a redirect to an Auth0 URL (such as `${account.namespace}`).
2. After one or more intervening URLs, there will be a POST back to Auth0 containing the SAML assertion with user information. The URL should be for the Assertion Consumer Service (ACS) of Auth0, which consumes the assertion and extracts the needed information.
3. Click on the row for the POST call in the HAR analyzer.
4. Switch to the POST Data tab, and look for the SAML response.
5. Copy and paste the SAML response into a [SAML debugger](https://samltool.io/).
6. Remove the "SAML response" at the beginning, as well as anything beginning with `&RelayState=` at the end.

#### Check the Assertion

After retrieving and decoding the SAML message, check the following fields:

Field | Description
------|-------------
Destination | Check that the destination for the SAML response is the correct Auth0 Tenant and Connection (`https://{TENANT}.auth0.com/login/callback?connection={CONNECTION}`).
Status Field | This field should indicate success. (`<samlp:StatusCode Value="urn:oasis:names:tc:SAML:2.0:status:Success"/>`).
Recipient | Check that the `<saml:SubjectConfirmation` Method element contains correct tenant and connection in the “Recipient” field (`https://{TENANT}.auth0.com/login/callback?connection={CONNECTION}`).
Audience | Check that the SAML Audience restriction field contains the correct tenant and connection information (`<saml:AudienceRestriction><saml:Audience>urn:auth0:{TENANT}:{CONNECTION}</saml:Audience>`).
Naming | The attribute identified by the `NameIdentifier` field should be known to the application. If it's not, the identifier should be some other attribute within the assertion (such as an internal IdP identifier for the user or an email address).
Signature Key | Check that the value indicated by the `X509Certificate` element matches the value provided to your connection.
Certificate | Compare the certificate sent to the one that you provided to the application

## Issue: The User's Profile Attributes are Incorrect

In this case the user successfully logs in with the IdP, the Auth0 logs show a successful login event, but the user's profile attributes are __not__ correct

Check to see if the user's Auth0 profile populated correctly:

  1. After logging in to the [Auth0 Dashboard, navigate to *Users*](${manage_url}/#/users).

  2. Find and click on the specific user to open up their profile. If there are multiple rows for a given user, be sure to open up the record associated with the SAML Connection.

  3. On the user's profile, you can view their details in one of two ways. You can use the *Details* tab or the *Raw JSON* tab. This shows you what attributes Auth0 has received from the identity provider.

### If the User Profile Attribute is Missing

If the attribute is missing, check to see if the attribute was included in the assertion. You can do this by [decoding the SAML assertion](#), or you can enable debugging for the connection.

To enable debugging for the connection, navigate to [Connections -> Enterprise](${manage_url}/#/connections/enterprise). Open up the list of **SAMLP Identity Providers**, click on **Settings**, and enable **Debug Mode**.

![](/media/articles/protocols/saml/saml-configuration/debug-connection.png)

With **Debug Mode** enabled, **Success Login** log entries [in the dashboard](${manage_url}/#/logs) will have an `original_profile` property listing every attribute included in the SAML assertion by the Identity Provider. You can use this list to see the information that the IdP is sending and to help you create the mappings. If the missing attribute is not in the assertion at all, please work with the IdP to make sure it is included.

### If the User Profile Attribute is Incorrectly Mapped

If an attribute value exists in the Auth0 user profile, but is not mapped to the right attribute, you can correct this via the Connection Mapping capability.

You can do this by navigating to [Connections -> Enterprise](${manage_url}/#/connections/enterprise). Open up the list of **SAMLP Identity Providers**, click on **Settings**, and switching over to the **Mappings** tab.

![](/media/articles/protocols/saml/saml-configuration/mappings.png)

Within the provided editor, there is a JSON snippet you can edit to configure your mappings. The name on the left is the Auth0 user profile attribute to which the assertion value will be mapped. The value on the right is the identifier in the SAML assertion from which the attribute comes.

::: warning
When Auth0 incorporates unmapped SAML attributes into the user profile, attribute identifiers containing dots `.` are replaced with semicolons `:`. While configuring your mappings, ensure the identifiers you provide match those in the SAML assertion.
:::

## Issue: The User Cannot Access the Application

In this case the user successfully logs in with the identity provider, Auth0 logs show a successful login event, and the user's profile attributes are correct; but the user __cannot__ access the application.

### Check the Application Logs

Check your application's log files to see if there are any error messages indicating why the user is unable to access the application.

The two most common causes for this issue are:

* Missing user profile information
* Incorrect or missing authorization information.

### Check the SAML Assertion

Check the information that Auth0 sends to the application by [capturing an HTTP trace of the login sequence](/troubleshoot/guides/generate-har-files) and analyzing the HTTP trace.

#### Retrieve the Assertion

You can view the HTTP trace in a HAR file analyzer, such as [Google's HAR Analyzer](https://toolbox.googleapps.com/apps/har_analyzer/).

1. First, scan through the sequence of URLs invoked in the HTTP trace.
    * The first few will be URLs for your application.
    * There will then be a redirect to an Auth0 URL (such as `${account.namespace}`).
2. After one or more intervening URLs, there will be a POST back to your application containing the SAML assertion with user information. The URL should be for the Assertion Consumer Service (ACS) of your application, which consumes the assertion and extracts the needed information.
3. Click on the row for the POST call in the HAR analyzer.
4. Switch to the POST Data tab, and look for the SAML response.
5. Copy and paste the SAML response into a [SAML debugger](https://samltool.io/).
6. Remove the "SAML response" at the beginning, as well as anything beginning with `&RelayState=` at the end.

#### Check the Assertion

After retrieving and decoding the SAML message, check the following fields:

Field | Description
------|-------------
Destination | The application URL that consumes the SAML assertion, also known as the Assertion Callback URL.
Status Field | This field should indicate success. (`<samlp:StatusCode Value="urn:oasis:names:tc:SAML:2.0:status:Success"/>`).
Recipient | Check that the correct URL appears in the recipient field (indicated by the `<saml:SubjectConfirmation Method…` parameter).
Audience | Check that the SAML Audience restriction field contains the correct tenant and connection information (`<saml:AudienceRestriction><saml:Audience>urn:auth0:{TENANT}:{CONNECTION}</saml:Audience>`).
Naming | The attribute identified by the `NameIdentifier` field should be known to the application. If it's not, the identifier should be some other attribute within the assertion (such as an internal IdP identifier for the user or an email address).
Signature Key | Check that the value indicated by the `X509Certificate` element matches the value provided to your connection.
Certificate | Compare the certificate sent to the one that you provided to the application.

### Check the ID Token

If your authorization flow uses an OIDC-conformant protocol, you can [capture a HAR trace](/troubleshoot/guides/generate-har-files) and view it using [Google's HAR Analyzer](https://toolbox.googleapps.com/apps/har_analyzer/).

1. Scan through the sequence of URLs in the trace, and look for the following:

    * The first few will be URLs for your application.

    * There will then by a redirect to an Auth0 URL (such as `${account.namespace}`).

2. Further down is your application's callback URL. Make sure that it's correct.

3. Retrieve the ID Token from this call, and paste it into [a JWT decoder](https://jwt.io/). Check that the claims in the token contain the information needed by the application.

### Troubleshooting IdP-initiated Flows

If you're using an IdP-initiated flow (for example, the user starts at the identity provider in a portal application), be sure that:

* The  Assertion Consumer Service (ACS) URL at the identity provider includes the connection name (for example `https://${account.namespace}/login/callback?connection=CONNECTION_NAME`)

* The IdP-initiated configuration tab for the Connection is properly filled in, including:

  * The application to which the user should be sent;

  * The protocol between the application and Auth0 (which is not necessarily **SAML** like the connection, and most likely is <dfn data-key="openid">**OpenID Connect**</dfn>);

  * Any protocol-specific values to include in the query string, such as <dfn data-key="scope">`scope`</dfn>, `response_type`, `redirect_uri`, and `audience`. These values should match the ones expected by the application when using a SP-initiated flow.

* Disable your [rules](/rules) temporarily to make sure that nothing is interfering with the login process.

* If you've enabled multi-factor authentication (MFA)</dfn>, disable it temporarily to make sure that it is not interfering with the login process.

* Check that the SAML Connection works in an SP-Initiated flow by [using **Try** to run a Connection test](#issue-the-idp-login-page-doesn-t-display).

## Error: The request could not be performed due to an error on the part of the SAML responder or SAML authority

The error may appear as follows:

```text
<samlp:Status>
<samlp:StatusCode Value="urn:oasis:names:tc:SAML:2.0:status:Responder" />
</samlp:Status>
```

### How to Fix

Make sure that the signature algorithm on your Auth0 connection is the same as the configuration on the ADFS side: either `rsa-sha256` or `rsa-sha1`. Alternatively you can contact your ADFS administrator to learn the expected signing method or to see if their logs contain further information about the reason for the error.

![ADFS SAML Properties](/media/articles/protocols/saml-adfs/adfs-saml-properties.png)
