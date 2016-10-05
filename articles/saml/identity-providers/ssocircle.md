---
title: ssocircle
description: How to configure Auth0 to use SAML SSO with SSOCircle as an identity provider.
---
# SAML SSO with SSOCircle as an Identity Provider
This tutorial will create a simple example application that uses Auth0 to do SAML Single Sign On (SSO), authenticating users against the __SSOCircle__ Identity Provider.

There are **7 steps** to this sample

1. Obtain SSOCircle metadata.
2. Set up the Auth0 Service Provider.
3. Configure the SSOCircle Identity Provider (IDP).
4. Test the connection to the SSOCircle IDP.
5. Register a simple HTML application with which to test the end-to-end connection.
6. Create the HTML page for a test application.
7. Test your creation.
8. Troubleshooting.


# 1. Obtain SSOCircle meta data

1. Go to **[ssocircle.com](http://ssocircle.com)** and register for an account (if you haven't already).

2. Complete the registration and make sure you are logged into SSOCircle.

3. Click on the **“Manage Metadata”** link on the left (toward the bottom of the links)

4. Click on the **SSOCircle Public IDP Metadata** link in the middle of the screen.  You will need to copy three attributes from the page displayed, to use in step #2 below.

5. Find the line that starts with "<SingleSignOnService" and has "HTTP-Redirect" as the binding.  Copy the Location URL from that line.

6. Find the line that starts with "<SingleLogoutService" and has "HTTP-Redirect" as the binding.  Copy the Location URL from that line.

7. Find the line that starts with "<KeyDescriptor" and has "use" as "signing".  Copy the lines between, but not including, the "<ds:X509Certificate" and "</ds:X509Certificate" lines.  Paste these lines into a file, called ssocirclecert.pem, making sure to preserve the line breaks exactly as shown in the original.

The portion of the ssocircle metadata URL that shows the certificate is shown below:

![](/media/articles/saml/identity-providers/ssocircle/ssocircle-9.png)

# 2. Set up the Auth0 service provider

In this step you will configure Auth0 so it knows how to communicate with __SSOCircle__ for single sign on via the SAML protocol.

**In the Auth0 dashboard:**

1. Click on **"Connections"** link at left.
2. In the list of options below "Connections", click on **"Enterprise"**
3. In the middle of the screen, click on **"SAMLP Identity Provider"**
4. Click on the blue **"Create New Connection"** button


5. In the "Create SAMLP Identity Provider" connection window, enter the following information into the "Configuration" tab.

**Connection Name:** You can make up any name, such as "SampleSAMLConnection"

**Email Domains:** In this example, we will use the Lock Widget, so in the Email Domains field enter the email domain name for the users that will log in via this connection.
For example, if your users have an email domain of 'abc-example.com', you would enter that into this field. You can enter multiple email domains if needed.

**Sign In URL:** enter the URL copied in step **#5** in section 1:
It should probably be:
`https://idp.ssocircle.com:443/sso/SSORedirect/metaAlias/ssocircle`

**Sign Out URL:** enter the URL copied in step **#6** in section 1:
`https://idp.ssocircle.com:443/sso/IDPSloRedirect/metaAlias/ssocircle`

**Certificate:**  Add a "BEGIN CERTIFICATE" and "END CERTIFICATE" statement to the ssocirclecert.pem file created earlier.  Make sure the file looks like the following:

```
-----BEGIN CERTIFICATE-----
MIICjDCCAXSgAwIBAgIFAJRvxcMwDQYJKoZIhvcNAQEEBQAwLjELMAkGA1UEBhMCREUxEjAQBgNV
BAoTCVNTT0NpcmNsZTELMAkGA1UEAxMCQ0EwHhcNMTEwNTE3MTk1NzIxWhcNMTYwODE3MTk1NzIx
WjBLMQswCQYDVQQGEwJERTESMBAGA1UEChMJU1NPQ2lyY2xlMQwwCgYDVQQLEwNpZHAxGjAYBgNV
BAMTEWlkcC5zc29jaXJjbGUuY29tMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCbzDRkudC/
aC2gMqRVVaLdPJJEwpFB4o71fR5bnNd2ocnnNzJ/W9CoCargzKx+EJ4Nm3vWmX/IZRCFvrvy9C78
fP1cmt6Sa091K9luaMAyWn7oC8h/YBXH7rB42tdvWLY4Kl9VJy6UCclvasyrfKx+SR4KU6zCsM62
2Kvp5wW67QIDAQABoxgwFjAUBglghkgBhvhCAQEBAf8EBAMCBHAwDQYJKoZIhvcNAQEEBQADggEB
AJ0heua7mFO3QszdGu1NblGaTDXtf6Txte0zpYIt+8YUcza2SaZXXvCLb9DvGxW1TJWaZpPGpHz5
tLXJbdYQn7xTAnL4yQOKN6uNqUA/aTVgyyUJkWZt2giwEsWUvG0UBMSPS1tp2pV2c6/olIcbdYU6
ZecUz6N24sSS7itEBC6nwCVBoHOL8u6MsfxMLDzJIPBI68UZjz3IMKTDUDv6U9DtYmXLc8iMVZBn
cYJn9NgNi3ghl9fYPpHcc6QbXeDUjhdzXXUqG+hB6FabGqdTdkIZwoi4gNpyr3kacKRVWJssDgak
eL2MoDNqJyQ0fXC6Ze3f79CKy/WjeU5FLwDZR0Q=
-----END CERTIFICATE-----
```


When you paste the certificate into your file, line breaks may get replaced with spaces.  You need to restore the original line breaks and make sure that the line breaks are **exactly** as shown above (or as shown on the ssocircle public IDP metadata page if changed) and the BEGIN CERTIFICATE and END CERTIFICATE
lines are on their own line, with preceding and following dashes and the first and last lines of the file, respectively.

6. In the Auth0 screen, click on the red **"UPLOAD CERTIFICATE"** button and select the `.pem` file you just created.

You can ignore the rest of the fields for now.

7. **Save:** Click on the blue **"SAVE"** button at the bottom.

Here is an example of what the filled-out screen would look like:

![](/media/articles/saml/identity-providers/ssocircle/ssocircle-1.png)


After pressing the **"SAVE"** button, A window will appear with a red **"CONTINUE"** button.

8. Click on the **"CONTINUE"** button. In the window that appears, near the bottom, there is a line that says, _"You can access the metadata for your connection in Auth0 here:"_.

9. Copy the URL below that line into your browser address bar.  The picture below shows the screen on which this URL will appear and where to find it:

![](/media/articles/saml/identity-providers/ssocircle/ssocircle-2.png)

In general, you can access the metadata for a SAML connection in Auth0 here: `https://${account.namespace}/samlp/metadata?connection=${connectionName}`.

Once you go to that metadata URL, it will display the metadata for the Auth0 side of the federation. It will look something like the following with your tenant name in place of the 'xxxxx':

![](/media/articles/saml/identity-providers/ssocircle/ssocircle-3.png)

This metadata needs to be given to the IDP, in this case SSOCircle, so it knows how to interact with Auth0.  The steps below will show how to do that.

10. Copy the entire contents of the metadata, between and including the start and end `EntityDescriptor` tags:

```
    "<EntityDescriptor> "...
    to ...
    "</EntityDescriptor>"
```

You will paste all this into an SSOCircle configuration screen later.

# 3. Configure the SSOCircle Identity Provider

In this step you will configure SSOCircle so it knows how to receive and respond to SAML-based authentication requests from Auth0.

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

# 4. Test the connection to the SSOCircle IDP

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

# 5. Register a simple HTML application with which to test the end-to-end connection.

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

# 6. Create the HTML page for a test application

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
    </HTML>
    </BODY>

```

Make sure you replace `{YOUR-APP-CLIENT-ID}` with the actual value of the app you registered in step 4.

The client ID for your application can be found in the **Auth0 dashboard** by going to __"Apps/APIs"__ link and clicking on the __"Settings"__ (gear) icon to the right of your application name.

Save this file in a place where you can access it via a browser.
For this example, we'll call it **"hello-saml.html"**.

# 7. Test your sample application

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

#8. Troubleshooting.

This section has a few ideas for things to check if your sample doesn't work.

Note that if your application doesn't work the first time, you should clear your browser history and ideally cookies each time before you test again.  Otherwise, the browser may not be picking up the latest version of your html page.

When troubleshooting SSO, it is often helpful to capture an HTTP trace of the interaction.  There are many tools that will capture the HTTP traffic from your browser for analysis.  Search for "HTTP Trace" to find some.  Once you have an http trace tool, capture the login sequence from start to finish and analyze the trace to see the sequence of GETs to see how far in the expected sequence you get.  You should see a redirect from your original site to the IDP, a post of credentials if you had to log in, and then a redirect back to the callback URL.

Be sure to check to make sure cookies and javascript are enabled for your browser.

Check to make sure that the callback URL specified in the HTML file is also listed in the **Allowed Callback URLs** field in the __""Settings""__ tab of the application registered in the Auth0 Dashboard.  (In dashboard, Click on __"Apps/APIs"__ link, then on the __"Settings"__ icon to the right of the application name.)
