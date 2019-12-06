---
title: SAML Single Sign-On with SSOCircle as an Identity Provider
description: Learn how to configure an application to use Auth0 for SAML Single Sign-on (SSO), authenticating users against SSOCircle
toc: true
topics:
    - saml
    - identity-providers
    - ssocircle
contentType:
  - how-to
useCase:
  - add-idp
---
# Configure SSOCircle as an Identity Provider

In this article, we will cover how you can configure SSOCircle for use with Auth0 as a <dfn data-key="security-assertion-markup-language">SAML</dfn> Identity Provider.

::: warning
As of July 8, 2016, SSOCircle supports integration via [manual configuration using public settings](http://www.ssocircle.com/en/idp-tips-tricks/public-idp-configuration/). If you have previously used account-specific metadata, your integration will still function, though this usage is now deprecated.
:::

## 1. Obtain the SSOCircle Metadata

Navigate to [SSOCircle's IDP page](https://idp.ssocircle.com/) to see the metadata required for integration. You will be shown an XML file.

From this page, you will need to save the following attributes (you will use these values for Step 2 of this tutorial):

1. The Location URL for the `SingleSignOnService` attribute with an `HTTP-Redirect` type.

2. The Location URL for the `SingleLogoutService` attribute with an `HTTP-Redirect` type.

[Download](http://www.ssocircle.com/en/idp-tips-tricks/public-idp-configuration) and save the SSOCircle CA Certificate. You will also use this in Step 2.

## 2. Configure an enterprise connection in Auth0

In this step, you will configure the integration from the Auth0 side.

To do so, see [Connect Your App to SAML Identity Providers](/connections/enterprise/saml). 

While setting up your connection, make sure you use the following settings:

| Field | Description |
| ----- | ----------- |
| **Connection name** | Logical identifier for your connection; it must be unique for your tenant. Once set, this name can't be changed. |
| **IdP Domains** (optional) | Comma-separated list of valid domains. Only needed if using the <dfn data-key="lock">Lock</dfn> login widget. |
| **Sign In URL** | SAML single login URL. Enter the location URL for the `SingleSignOnService` attribute with an `HTTP-Redirect` type from SSOCircle's metadata. |
| **X.509 Signing Certificate** | Signing certificate (encoded in PEM or CER). Upload the **SSOCircle CA Certificate** you saved in [step 1](#1-obtain-the-ssocircle-metadata). |
| **Sign Out URL** (optional) | SAML single logout URL. Enter the Location URL for the `SingleLogoutService` attribute with an `HTTP-Redirect` type from SSOCircle's metadata. |

When setting up mappings, use the following JSON to properly map SAML attributes from SSO Circle, and click **Save**:

```json
{
  "email": "EmailAddress",
  "given_name": "FirstName",
  "family_name": "LastName"
}
```

::: note
In general, you can access the metadata for an Auth0 SAML connection using a URL with the following format: `https://${account.namespace}/samlp/metadata?connection=YOUR_CONNECTION_NAME`.

You will need to provide this metadata to SSOCircle at a later point during the configuration process.
:::

## 3. Configure the SSOCircle Identity Provider

In this step, you will configure the integration from the SSOCircle side.

Log in to your [SSOCircle](http://ssocircle.com) account. You will be directed to your user profile, and to the left of that is a navigation bar.

In the navigation bar, click **Manage Metadata**.

Select **Add New Service Provider**, and provide the following information to configure the new service provider (which, in this case, is Auth0):

* **FQDN of the ServiceProvider:** `auth0.com`
* **Attributes to send in assertion:** check the box for `EmailAddress`
* **Insert your metadata information:** paste in the XML metadata that you downloaded after you configured your Auth0 Connection (the file begins with `<EntityDescriptor`...)

Click **“Submit”** to complete the configuration of the IDP.

## 4. Create an Auth0 Application to Test the Connection

In this step, you will create an application in Auth0 that uses your SSOCircle SAML Connection.

While logged in to the [Auth0 Management Dashboard](${manage_url}), click **+ New Application** near the top right of the page.

You will be prompted to provide some basic information about your new Application:

* **Name**: enter a name like for your Application;
* **Choose an Application Type**: select **Regular Web Applications**.

Click **Create** to finish configuration and begin the Application creation process.

You will be directed to the dashboard landing page for your Application. Click over to the **Settings** page.

In the **Allowed Callback URL** field, enter `http://jwt.io`. The list of allowed <dfn data-key="callback">callback URLs</dfn> includes those to which users will be redirected after authentication. The URL(s) entered here must match the **callback URL** in the HTML code you will create in a later step. Normally, you would enter a URL for your Application, but to keep this example simple, users will simply be sent to the Auth0 JWT Tool.

Click **SAVE CHANGES**.

Returning to the top of **Settings**, click on  **Connections**.

Scroll down to the section with the **Enterprise** heading. Find the row for the SAML Connection you created above and click the on/off toggle to enable the SAML Connection.

## 5. Test the Auth0-SSOCircle Connection

In this step, you will test to make sure the SAML configuration between Auth0 and SSOCircle is working.

To test your connection, see [Test Enterprise Connections](/dashboard/guides/connections/test-connections-enterprise).

During this process you will be asked to log in and consent. Everything should go smoothly, but if the test shows that something didn't work, please review the above steps and consult the [Troubleshooting](#8-troubleshooting) section.

Additionally, if you receive a window that says, "Your session has timed out," click the **Return to Login page** link below the message.

## 6. Create the HTML Page for the Test Application

In this section, you will create a simple HTML page that uses the **Auth0 Lock Widget**. Lock will then trigger the SAML login sequence.

```html
<!DOCTYPE html>
<HTML>
  <BODY>
    <p> Click on the button to log in </p>

    <script src="${lock_url}"></script>
    <script type="text/javascript">
      var lock = new Auth0Lock('${account.clientId}', '${account.namespace}', {
        auth: {
          redirectUrl: 'http://jwt.io',
          responseType: 'token',
          params: {
            scope: 'openid profile email'
          }
        }
      });

      function signin() {
        lock.show();
      }
    </script>
    <button onclick="signin()">Login</button>
  </BODY>
</HTML>
```

Be sure to fill in the first parameter of the `Auth0Lock` with your Client ID. To find the Client ID, go to **[Auth0 Dashboard](${manage_url}) > [Applications](${manage_url}/#/applications)** and click the **Settings** icon to the right of your Application name. Copy the **Client ID** value.

Save this file. For the purposes of this example, we'll call it `hello-saml.html`.

## 7. Test Your Sample Application

In this step, you will complete an end-to-end test using your sample HTML application that uses the Auth0 SAML connection you set up to perform SSO with SSOCircle.

Open the `hello-saml.html` file with a web browser. You should see a white page with a login button on it.

![Test Homepage](/media/articles/saml/identity-providers/ssocircle/hello-saml.png)

Click **Login**. The **Auth0 Lock** Widget will appear.

::: note
If you are prompted to enter an email address, make sure the domain for the email address you enter is listed under **Settings** for the Auth0 Application you previously configured.
:::

Provide the requested log in credentials and click **Access** to initiate the SAML SSO sequence with SSOCircle.

At this point, you will be redirected to the SSOCircle IDP to log in.

![Login Screen](/media/articles/saml/identity-providers/ssocircle/login.png)

Once you have logged in, you will see a SAML Consent Page. Click the box indicating that you're not a robot, then click **Continue SAML Single Sign-On**.

![Consent to SAML Screen Screen](/media/articles/saml/identity-providers/ssocircle/saml-consent.png)

::: note
Please note that you will not be prompted for your credentials if you still have an active session at SSOCircle. If this is the case, you will simply be redirected to the callback URL specified in `hello-saml.html`.
:::

If you successfully authenticate, you will be redirected to the callback URL specified in `hello-saml.html` (`http://jwt.io`). You will see the token that your Application receives.

## 8. Troubleshooting

* If logging in to your Application doesn't work the first time, clear your browser's history and cookies before testing again. The browser may not be picking up the latest version of your HTML.
* When troubleshooting SSO, it is often helpful to capture an HTTP trace of the interaction. There are many tools that will capture the HTTP traffic from your browser for analysis (search for "HTTP Trace" to find one appropriate for your needs). Once you have an HTTP tracer, capture the login sequence from start to finish and analyze the trace to see the sequence of `GET` requests to see where the error occurs. You should see:
  * A redirect from your original site to the IDP;
  * A post of credentials (if you were asked to log in);
  * A redirect to the callback URL.
* Ensure that your browser has enabled cookies and JavaScript.
* Check to make sure that the callback URL specified in the HTML is also listed in the **Allowed Callback URLs** field in the **Settings** tab of the Auth0 Application.
