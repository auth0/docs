---
title: ssocircle
description: Tutorial for creating an Auth0 app that uses SAML SSO with SSOCircle
---

# SAML SSO with SSOCircle as an Identity Provider

This tutorial will create a sample application that uses Auth0 for SAML Single Sign On (SSO), authenticating users against identity provider **SSOCircle**.

## 1. Obtain the SSOCircle Metadata

::: panel-info SSOCircle Metadata
As of July 8, 2016, SSOCircle supports integration via [manual configuration using public settings](http://www.ssocircle.com/en/idp-tips-tricks/public-idp-configuration/). If you have previously used account-specific metadata, your integration will still function, though this usage is now deprecated.
:::

Navigate to [SSOCircle's IDP page](https://idp.ssocircle.com/) to see the metadata required for integration. You will be shown an XML file.

![Metadata XML Display](/media/articles/saml/identity-providers/ssocircle/metadata-xml.png)

From this page, you will need to save the following attributes (you will use these values for Step 2 of this tutorial):

1. The Location URL for the `SingleSignOnService` attribute with an `HTTP-Redirect` type.

![HTTP Redirect URL for Sign On](/media/articles/saml/identity-providers/ssocircle/metadata-snippet1.png)

2. The Location URL for the `SingleLogoutService` attribute with an `HTTP-Redirect` type.

![HTTP Redirect URL for Log Out](/media/articles/saml/identity-providers/ssocircle/metadata-snippet2.png)

[Download](https://idp.ssocircle.com/sso/hoscert/pki/SSOCircleCACertificate.cer) and save the SSOCircle CA Certificate. You will also use this in Step 2.

## 2. Configuring Auth0

In this step, you will configure the integration from the Auth0 side.

While logged in to the [Auth0 Management Dashboard](${manage_url}), navigate to the [Enterprise Connections](${manage_url}/#/connections/enterprise) page. To the right of *SAMLP Identity Provider*, click **+** to create a new Enterprise Connection.

![Auth0 Create Enterprise Connection Screen](/media/articles/saml/identity-providers/ssocircle/create-enterprise-connection.png)

You will be presented with a pop-up window titled *Create SAMLP Identity Provider Connection*. Enter the following information into the appropriate fields on the *Configuration* tab:

* **Connection Name:** the name of your connection
* **Email Domains:** if you are using Lock, the email domain name(s) for the users that will be logging in via this Connection (for example `auth0.com`)
* **Sign In URL:** the location URL for the `SingleSignOnService` attribute with an `HTTP-Redirect` type from SSOCircle's metadata
* **Sign Out URL:** the Location URL for the `SingleLogoutService` attribute with an `HTTP-Redirect` type from SSOCircle's metadata

Finally, upload the **SSOCircle CA Certificate** you saved in [step 1](#1-obtain-the-ssocircle-metadata) as the *X509 Signing Certificate*.

You can leave the rest of the fields on the page blank. Click **Save** to persist your changes.

![Auth0 Configure SSOCircle Connection Screen](/media/articles/saml/identity-providers/ssocircle/configure-ssocircle-connection.png)

At this point, you will see a pop-up window that presents you with two options. If you are an administrator with the necessary privileges for configuring the integration, click **Continue**. If not, forward the link indicated to the person who will be completed this process.

![Prompt if Administrator](/media/articles/saml/identity-providers/ssocircle/is-admin.png)

If you click **Continue**, you will be shown the SAML Identity Provider Configuration information. At the bottom of this information is a URL that will provide you with the necessary metadata for your integration with SSOCircle. Copy this URL.

![SAML Configuration Info Display](/media/articles/saml/identity-providers/ssocircle/saml-config-info.png)

> In general, you can access the metadata for a Auth0 SAML connection using a URL with the following format: `https://${account.namespace}/samlp/metadata?connection=${connectionName}`.

You will need to provide this metadata to SSOCircle at a later point of the configuration process.

## 3. Configure the SSOCircle Identity Provider

In this step, you will configure the integration from the SSOCircle side.

Log in to your [SSOCircle](http://ssocircle.com) account. You will be directed to your user profile, and to the left of that is a navigation bar.

![SSOCircle User Profile](/media/articles/saml/identity-providers/ssocircle/user-profile.png)

In the navigation bar, click on **Manage Metadata**.

![Manage Metadata Screen](/media/articles/saml/identity-providers/ssocircle/manage-provider-metadata.png)

Select **Add New Service Provider**, and provide the following information to configure the new service provider (which, in this case, is Auth0):

* **FQDN of the ServiceProvider:** `auth0.com`
* **Attributes to send in assertion:** check the box for `EmailAddress`
* **Insert your metadata information:** paste in the XML metadata that you downloaded after you configured your Auth0 Connection (the file begins with `<EntityDescriptor`...)

![Configure Service Provider Screen](/media/articles/saml/identity-providers/ssocircle/config-service-provider.png)

Click **“Submit”** to complete the configuration of the IDP.

![Popup Indicating Successful Import of Metadata](/media/articles/saml/identity-providers/ssocircle/metadata-success.png)

## 4. Create an Auth0 Client to Test the Connection.

In this step, you will create a Client in Auth0 that uses your SSOCircle SAML Connection.

While logged in to the [Auth0 Management Dashboard](${manage_url}), click **+ New Client** near the top right of the page.

![Dashboard Homepage](/media/articles/saml/identity-providers/ssocircle/create-new-client.png)

You will be prompted to provide some basic information about your new Client:

* **Name**: enter a name like for your Client;
* **Choose a Client Type**: select *Regular Web Applications*.

![](/media/articles/saml/identity-providers/ssocircle/set-up-client.png)

Click **Create** to finish configuration and begin the Client creation process.

You will be directed to the dashboard landing page for your Client. Click over to the *Settings* page.

In the *Allowed Callback URL* field, enter `http://jwt.io`. The list of allowed callback URLs includes those to which users will be redirected after authentication. The URL(s) entered here must match the **"callback URL"** in the HTML code you will create in a later step. Normally, you would enter a URL for your Client, but to keep this example simple, users will simply be sent to the Auth0 JWT Tool.

![Allowed Callback URLS field](/media/articles/saml/identity-providers/ssocircle/allowed-callback-urls.png)

Click **SAVE CHANGES**.

Returning to the top of *Settings*, click on  **Connections**.

Scroll down to the section with the **Enterprise** heading. Find the row for the SAML Connection you created above and click on the on/off toggle to enable the SAML Connection.

![](/media/articles/saml/identity-providers/ssocircle/enable-connection.png)

## 5. Test the Auth0-SSOCircle Connection

In this step, you will test to make sure the SAML configuration between Auth0 and SSOCircle is working.

While logged in to the [Auth0 Management Dashboard](${manage_url}), navigate to the [Enterprise Connections](${manage_url}/#/connections/enterprise) page and click on the **SAMLP Identity Provider** row.

![Auth0 Create Enterprise Connection Screen](/media/articles/saml/identity-providers/ssocircle/create-enterprise-connection.png)

To test, click on the **triangle** next to the Connection you created earlier.

![Connection Options Screen](/media/articles/saml/identity-providers/ssocircle/test-connection.png)

You should be redirected from Auth0 to the SSOCircle login page. Login with the credentials you provided when creating the SSOCircle account.

![Login Screen](/media/articles/saml/identity-providers/ssocircle/login.png)

You may receive a window that says, *"Your session has timed out."* If so, click on the **Return to Login page** link below this message.

Once you have logged in, you will see a *SAML Consent Page*. Click the box indicating that you're not a robot, then click **Continue SAML Single Sign On**.

![Consent to SAML Screen Screen](/media/articles/saml/identity-providers/ssocircle/saml-consent.png)

At this point, if the SAML configuration works, your browser will be redirected back to an Auth0 page that says **"It works!!!"**.  This page will display the contents of the SAML authentication assertion sent by the SSOCircle IDP to Auth0.

If the test shows that something didn't work, please review the above steps and consult the [Troubleshooting](#8-troubleshooting) section.

## 6. Create the HTML Page for the Test Client

In this section, you will create a simple HTML page that uses the **Auth0 Lock Widget**. Lock will then trigger the SAML login sequence.

Create an HTML file with the following HTML and JavaScript.

```html
<!DOCTYPE html>
<HTML>
<BODY>
<p> Click on the button to log in </p>

<script src="http://cdn.auth0.com/js/lock/10.4.0/lock.min.js"></script>
<script type="text/javascript">
  var lock = new Auth0Lock('{YOUR-APP-CLIENT-ID}', '${account.namespace}');

  function signin() {
    lock.show({
        callbackURL: 'http://jwt.io'
      , responseType: 'token'
      , authParams: {
        scope: 'openid name email' //Details: https:///scopes
      }
    });
  }
});
}
</script>
<button onclick="signin()">Login</button>
</BODY>
</HTML>
```

Be sure to replace `{YOUR-APP-CLIENT-ID}` with the actual value for the [Client you created](#4-create-an-auth0-client-to-test-the-connection).

The Client ID can be found in the **Auth0 Dashboard** by going to **Clients** and clicking on the **Settings** icon to the right of your Client name.

Save this file. For the purposes of this example, we'll call it `hello-saml.html`.

## 7. Test Your Sample Application

In this step, you will complete an end-to-end test using your  sample HTML application that uses the Auth0 SAML connection you set up to perform SSO with SSOCircle.

Open the `hello-saml.html` file with a web browser. You should see a white page with a login button on it.

![Test Homepage](/media/articles/saml/identity-providers/ssocircle/hello-saml.png)

Click **Login**. The **Auth0 Lock** Widget will appear.

![](/media/articles/saml/identity-providers/ssocircle/lock.png)

> If you are prompted to enter an email address, make sure the domain for the email address you enter is listed under *Settings* for the Auth0 Client you previously configured.

Provide the requested log in credentials and click on **Access** to initiate the SAML SSO sequence with SSOCircle.

At this point, you will be redirected to the SSOCircle IDP to log in.

![Login Screen](/media/articles/saml/identity-providers/ssocircle/login.png)

Once you have logged in, you will see a *SAML Consent Page*. Click the box indicating that you're not a robot, then click **Continue SAML Single Sign On**.

![Consent to SAML Screen Screen](/media/articles/saml/identity-providers/ssocircle/saml-consent.png)

> Please note that you will not be prompted for your credentials if you still have an active session at SSOCircle. If this is the case, you will simply be redirected to the callback URL specified in the `hello-saml.html`.

If you successfully authenticate, you will be redirected to the callback URL specified in `hello-saml.html` (`http://jwt.io`). You will see the token that your Client receives.

## 8. Troubleshooting

* If logging in to your Client doesn't work the first time, clear your browser's history and cookies before testing again. The browser may not be picking up the latest version of your HTML.

* When troubleshooting SSO, it is often helpful to capture an HTTP trace of the interaction. There are many tools that will capture the HTTP traffic from your browser for analysis (search for "HTTP Trace" to find one appropriate for your needs).  

  Once you have an HTTP tracer, capture the login sequence from start to finish and analyze the trace to see the sequence of `GET` requests to see where the error occurs. You should see:

  * a redirect from your original site to the IDP;
  * a post of credentials (if you were asked to log in);
  * a redirect to the callback URL.


* Ensure that your browser has enabled cookies and JavaScript.

* Check to make sure that the callback URL specified in the HTML is also listed in the **Allowed Callback URLs** field in the *Settings* tab of the Auth0 Client.
