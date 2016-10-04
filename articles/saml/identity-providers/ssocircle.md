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

1. Go back to **[ssocircle.com](http://ssocircle.com)**

2. Click on the **“Manage Metadata”** link on the left (toward the bottom of the links)

3. Click on the link **“Add new Service Provider”**

4. Fill out the following fields:

**FQDN of the ServiceProvider:** Auth0.com

**Attributes to send in assertion:** check the box for ‘EmailAddress’ (the attribute that will be used to login)

**Insert your metadata information:** paste in the XML metadata that you copied in Section 2, step 10 above, after configuring Auth0.  E.g. the info that starts with:
`<EntityDescriptor ...`

5. Then press the **“Submit”** button to complete the configuration of the IDP

![](/media/articles/saml/identity-providers/ssocircle/ssocircle-4.png)

## 4. Test the connection to the SSOCircle IDP

In this step, you will do a quick test to make sure the SAML configuration between Auth0 and SSOCircle is working.

* In the Auth0 dashboard, navigate to:  __Connections -> Enterprise -> SAMLP Identity Provider__.

* Click on the triangular **"Try"** button for the SAML connection you created earlier.  This button is to the right of the name of the connection.  You can hover your mouse over the button to have the text label appear.

* Click on the **"Try"** button. You should be redirected from Auth0 to the SSOCircle login page.  You may receive a window that says _"Your session has timed out."_ with a link to _"Return to Login page"_ below it.  If so, just click on the _"Return to Login page"_ link.

* Once you are at the **SSOCircle login screen**, login with the credentials you provided when you created the SSOCircle account and press the "Login" button.

If the SAML configuration works, your browser will be redirected back to an Auth0 page that says __"It works!!!"__.  This page will display the contents of the SAML authentication assertion sent by the SSOCircle IDP to Auth0.
This means the connection from Auth0 to the SSOCircle IDP is working.

If it didn't work, double check the above steps and then consult the **troubleshooting** section at the end of this document.

> NOTE: the **Try** button only works for users logged in to the Auth0 dashboard.  You cannot send this to an anonymous user to have them try it.

Here is a sample of the "It Works" screen:

![](/media/articles/saml/identity-providers/ssocircle/ssocircle-5.png)

## 5. Register a simple HTML application with which to test the end-to-end connection.

In this step, you will register an application in Auth0 that will use the SAML connection you set up in the above steps.

* In the **Auth0 dashboard**, click on the **"Apps/APIs"** link at left.

* Click on the red **"+ NEW APP/API"** button on the right.

* In the **Name** field, enter a name like "My-HTML-SAML-App".

* Press the blue **"SAVE"** button.

* In the **Auth0 dashboard**, click again on the **"Apps/APIs"** link at left

* Find the row for the application you just created, and click on the **"Settings"** icon to the right of the application name. (the round gear icon)

* In the **"Allowed Callback URL"** field, enter **http://jwt.io**.
* The list of allowed callback URLs is a list of URL(s) to which users will be redirected after authentication.  The URL(s) entered here must match the **"callback URL"** in the HTML code created in the next step.  Normally you would enter a URL for your application, but to keep this example simple, users will simply be sent to the Auth0 JWT online tool.

* Press the blue **"SAVE CHANGES"** button at the bottom of the screen.

* In the same screen, click on the blue **"Connections"** tab (In the row that says Quick Start, Settings etc.

* Scroll down to the section near the bottom where it says **"ENTERPRISE"**.

* Find the row for the SAML connection you created above and click on the on/off toggle at right so that it is green, for "on".  That enables the SAML connection for this application.

![](/media/articles/saml/identity-providers/ssocircle/ssocircle-6.png)

## 6. Create the HTML page for a test application

In this section you will create a very simple HTML page that invokes the **Auth0 Lock Widget** which will trigger the SAML login sequence.  This will enable an end-to-end test of the SAML SSO.

Create an HTML page and insert the following HTML and javascript code:


```
<!DOCTYPE html PUBLIC "-//IETF//DTD HTML 2.0//EN">
<HTML>
<BODY>
<p> Click on the button to log in </p>

<script src="https://cdn.auth0.com/js/lock-6.2.min.js"></script>
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
</script>
<button onclick="signin()">Login</button>
</BODY>
</HTML>
```

Make sure you replace `{YOUR-APP-CLIENT-ID}` with the actual value of the app you registered in step 4.

The client ID for your application can be found in the **Auth0 dashboard** by going to __"Apps/APIs"__ link and clicking on the __"Settings"__ (gear) icon to the right of your application name.

Save this file in a place where you can access it via a browser.
For this example, we'll call it **"hello-saml.html"**.

## 7. Test your sample application

In this step, you will test your sample HTML application that uses the Auth0 SAML connection you set up to perform SSO with SSOCircle.

* Open the HTML file created above with a browser. You should first see a white page with a login button on it.

* Click on the **login** button.

The **Auth0 Lock** widget should appear with one button titled **"saml".**

If you have other connections turned on for your application, your **Auth0 Lock Widget** may look slightly different.  If you are prompted to enter an email address, make sure the email address you enter has the same domain name as the domain(s) you entered in the __Settings__ tab for the  application in the Auth0 dashboard.  (__Apps/APIs -> Settings__)

Click on the **"saml"** button or the **ACCESS** button to initiate the SAML sso sequence with ssocircle.

![](/media/articles/saml/identity-providers/ssocircle/ssocircle-7.png)

* You will be redirected to the SSOCircle IDP to log in.

Note that whether you are prompted for credentials at this point depends on whether you still have an active session at SSOCircle.

From the "try me" test you did earlier, you may still have an active session at SSOCircle.  If this is the case, you will not be prompted to log in again and will simply be redirected to the callback URL specifed in the HTML file. (Remember that this callback URL must also be in the __Allowed Callback URLs__ in the application's Setting tab in the Auth0 dashboard.)

If sufficient time has passed, or if you delete your browser cookies before initiating the test, then you will be prompted to login when redirected to ssocircle.com.  Log in to SSOCircle using the credentials with which you established your account at SSOCircle.

![](/media/articles/saml/identity-providers/ssocircle/ssocircle-8.png)

Upon successful authentication, you will be redirected to the callback URL specified in the HTML file (jwt.io). This tool will display the token that your app would receive.

## 8. Troubleshooting.

This section has a few ideas for things to check if your sample doesn't work.

Note that if your application doesn't work the first time, you should clear your browser history and ideally cookies each time before you test again.  Otherwise, the browser may not be picking up the latest version of your html page.

When troubleshooting SSO, it is often helpful to capture an HTTP trace of the interaction.  There are many tools that will capture the HTTP traffic from your browser for analysis.  Search for "HTTP Trace" to find some.  Once you have an http trace tool, capture the login sequence from start to finish and analyze the trace to see the sequence of GETs to see how far in the expected sequence you get.  You should see a redirect from your original site to the IDP, a post of credentials if you had to log in, and then a redirect back to the callback URL.

Be sure to check to make sure cookies and javascript are enabled for your browser.

Check to make sure that the callback URL specified in the HTML file is also listed in the **Allowed Callback URLs** field in the __""Settings""__ tab of the application registered in the Auth0 Dashboard.  (In dashboard, Click on __"Apps/APIs"__ link, then on the __"Settings"__ icon to the right of the application name.)
