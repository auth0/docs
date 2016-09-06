---
url: /samlsso-auth0-to-auth0
---

# SAML SSO with Auth0 as ServiceProvider and as an Identity Provider

This tutorial will create a simple example application that uses Auth0 to do SAML Single Sign On (SSO), using one Auth0 account (account 1) as a SAML Service Provider(SP), authenticating users against a second Auth0 account (account 2) serving as SAML Identity Provider(IDP).  This gives you a way to test your Auth0 SAML account (account 1) configuration, using Auth0 as an IDP so you don't have to learn and set up another IDP.

There are **9 sections** to this sample and a troubleshooting section at the end.
CLI
1. Establish two Auth0 accounts.
2. Set up the Auth0 Identity Provider (IDP) (account 2).
3. Set up the Auth0 Service Provider (SP) (account 1).
4. Add your Service Provider metadata to the Identity Provider.
5. Test Identity Provider.
6. Test the connection from Service Provider to Identity Provider.
7. Register a simple HTML application with which to test the end-to-end connection.
8. Create the HTML page for a test application.
9. Test your creation.

## 1. Establish two Auth0 accounts

If you do not already have two Auth0 accounts, you will need to create them.

### In the Auth0 dashboard:

In the upper right corner, click on the name of your account and in the popup menu which appears, select **"New Account"**.  

In the window which appears, enter a name for your second account in the **"Your Auth0 domain"** field and press the **"SAVE"** button.

You can switch back and forth between the accounts by going to the upper right corner of the dashboard, clicking on the name of the current account, and using the popup menu which appears to switch between your accounts.

![](/media/articles/saml/samlsso-auth0-to-auth0/saml-auth0-1.png)

## 2. Set up the Auth0 IDP (account 2)

In this section you will configure one Auth0 account (account 2) to serve as an Identity Provider.  You will do this by registering an application, but in this case, the 'application' you register is really a representation of account 1, the SAML Service Provider.

Log into **Account 2**

**In the Auth0 dashboard:**

1. Click on **"Applications"** link at left.

2. Click on the red **"+ CREATE APP"** button on the right.

3. In the **Name** field, enter a name like "My-Auth0-IDP".

4. Press the blue **"SAVE"** button.

5. Click on the **"Settings"** tab.

6. Scroll down and click on the **"Show Advanced Settings"** link.

7. In the expanded window, scroll down to the **"Certificates"** section and click on the **"DOWNLOAD CERTIFICATE"** link and select PEM from the dropdown, to download a PEM-formatted certificate.  The certificate will be downloaded to a file called "${account.tenant}.pem".  Save this file as you will need to upload this file when configuring the other Auth0 account, account 1.

8. Click on the **"Endpoints"** tab and go to the **"SAML"** section.  Copy the entire contents of the **"SAML Protocol URL"** field and save it as in the next step you will need to paste it into the other Auth0 account, account 1.

![](/media/articles/saml/samlsso-auth0-to-auth0/saml-auth0-2.png)

Next, create a user to use in testing the SAML SSO sequence.
**In the Auth0 dashboard:**

1. Click on the **"+ CREATE YOUR FIRST USER"** button.

2. In the **Email** field, enter an email for your test user.  The domain name for the email should match what you enter in section 3 below.  For example, if your user is `john.doe@abc-example.com`, you would enter that here, and then enter "abc-example.com" in step 3 below for the Email domain.

3. Enter a password for the user

4. For the Connection, leave it at the default value. (Username-Password-Authentication)

5. Press the blue **"SAVE"** button.


## 3. Set up the Auth0 service provider (account 1)

In this section you will configure another Auth0 account (account 1) so it knows how to communicate with the second Auth0 account (account 2) for single sign on via the SAML protocol.

Log out of **Account 2** and log into **Account 1**.

**In the Auth0 dashboard:**

1. Click on **"Connections"** link at left.
2. In the list of options below "Connections", click on **"Enterprise"**
3. In the middle of the screen, click on **"SAMLP Identity Provider"**
4. Click on the blue **"Create New Connection"** button


In the **"Create SAMLP Identity Provider"** connection window, enter the following information into the "Configuration" tab.

**Connection Name:** You can enter any name, such as "SAML-Auth0-IDP"

**Email Domains:** In this example, we will use the Lock Widget, so in the Email Domains field enter the email domain name for the users that will log in via this connection.
For example, if your users have an email domain of 'abc-example.com', you would enter that into this field. You can enter multiple email domains if needed.  Make sure the test user you created in section 2 has an email address with email domain that matches what you enter here.

**Sign In URL:** enter the **"SAML Protocol URL"** field that you copied in section 2 above. (From account 2 dashboard, Apps/APIs link, Settings tab, Advanced Settings, ENDPOINTS section, SAML tab, "SAML Protocol URL" field.)

**Sign Out URL:** enter the same URL as for the Sign In URL above.

**X509 Signing Certificate:**  
Click on the red **"UPLOAD CERTIFICATE..."** button and select the `.pem` file you downloaded from account 2 in section 2 above.

You can ignore the rest of the fields for now.

**Save:** Click on the blue **"SAVE"** button at the bottom.

Here is an example of what the filled-out screen would look like: (you should have filled out the Email domains field as well with your specific test user's email domain.)

![](/media/articles/saml/samlsso-auth0-to-auth0/saml-auth0-3.png)


After pressing the **"SAVE"** button, A window will appear with a red **"CONTINUE"** button. (You might have to scroll up to see it)

Click on the **"CONTINUE"** button.

In the window that appears, metadata about this SAML provider (account 1) is displayed.  You will need to collect two pieces of information about this Auth0 account (the service provider) that you will then paste into the other Auth0 account you set up (the identity provider).

First, look for the second bullet in the list of information that tells you the **"Entity ID"**.  It will be of the form __urn:auth0:${account.tenant}:${connectionName}__.  

Copy and save this entire Entity ID field from "urn" all the way to the end of the connection name.

In that same window, near the bottom, there is a line that says, _"You can access the metadata for your connection in Auth0 here:"_.  

Copy the URL below that line into your browser address bar.  The picture below shows the screen on which this URL will appear and where to find it:

![](/media/articles/saml/samlsso-auth0-to-auth0/saml-auth0-4.png)

In general, you can access the metadata for a SAML connection in Auth0 here: `https://${account.namespace}/samlp/metadata?connection=${connectionName}`.

Once you go to that metadata URL, it will display the metadata for the Auth0 account 1 (service provider side of the federation. It will look something like the following with your account name in place of the 'xxxxx':

![](/media/articles/saml/samlsso-auth0-to-auth0/saml-auth0-5.png)

You need to locate the row that starts with **"AssertionConsumerService"** and copy the value of the **"Location"** field.  It will be a URL of the form __https://${account.tenant}.auth0.com/login/callback?connection=${connectionName}__.

Copy and save this URL.  This is the URL on account 1 that will receive the SAML assertion from the IDP.  In the next section you will give this URL to the IDP so it knows where to send the SAML assertion.


# 4. Add your Service Provider metadata to the Identity Provider

In this section you will go back and add some information about the Service Provider (account 1) to the Identity Provider (account 2) so the Identity Provider Auth0 account knows how to receive and respond to SAML-based authentication requests from the Service Provider Auth0 account.

* Log out of **Account 1** and log back into **Account 2**.

**In the Auth0 dashboard:** for Account 2

1. Click on **"Applications"** link at left.

2. Find the row for the application you created earlier, and click on the **"Add Ons"** icon to the right of the application name. (the angle bracket and slash icon)
3. Locate the box with the **"SAML2 WEB APP"** label and click on the circle toggle to turn it green.


![](/media/articles/saml/samlsso-auth0-to-auth0/saml-auth0-6.png)

4. Next, a configuration window will pop up for the **"Addon: SAML2 Web App"**.  Make sure you are in the **Settings**" tab.

5. In the **"Application Callback URL"** field, paste in the **Assertion Consumer Service URL** that you copied and saved in section 3 above (the last step).

6. In the Settings field below, go to line 2 that has the "audience" attribute.  

First remove the "//" at the beginning of the line to uncomment it.

Next, replace the original value (urn:foo) with the **Entity ID** value you saved and copied in step 3 above. The new line 2 should look something like:

```
    "audience":"urn:auth0:${account.tenant}:${connectionName}"
```

7. Click on the blue **"SAVE"** button at the bottom of the screen

![](/media/articles/saml/samlsso-auth0-to-auth0/saml-auth0-7.png)


# 5. Test Identity Provider

In the same screen, click on the red **"DEBUG"** button.

That will trigger a login screen from account 2, the Identity Provider.

Log in with the credentials for account 2.

If your configuration is correct, you will see a screen titled **"It works!"**

This screen will show you the encoded and decoded SAML response that would be sent by the Identity Provider.

Check the decoded SAML response and locate (about half-way down) the `"<saml:Audience>"` tag and make sure it matches the **Entity ID** you entered in the previous screen (obtained during step 3).

Click on **"Close this window"** at the bottom of the screen.

![](/media/articles/saml/samlsso-auth0-to-auth0/saml-auth0-8.png)

# 6. Test the connection from Service Provider to Identity Provider

In this section, you will test to make sure the SAML configuration between Auth0 account 1 (Service Provider) and Auth0 account 2 (Identity Provider) is working.

Log out of Account 2 and return to Account 1.

* In the **Auth0 dashboard**, navigate to:  __Connections -> Enterprise -> SAMLP Identity Provider__.

* Click on the triangular **"Try"** button for the SAML connection you created earlier.  This button is to the right of the name of the connection.  You can hover your mouse over the button to have the text label appear.

* You will first see a Lock login widget appear that is triggered by the Service Provider.  Enter the username of the test account you created earlier.

You will then be redirected to the Lock login widget of the Identity Provider.  Login with the credentials for the test user you created.

If the SAML configuration works, your browser will be redirected back to an Auth0 page that says __"It works!!!"__.  This page will display the contents of the SAML authentication assertion sent by the Auth0 Identity Provider to Auth0 Service Provider.
This means the SAML connection from Auth0 Service Provider to Auth0 Identity Provider is working.

If it didn't work, double check the above steps and then consult the **troubleshooting** section at the end of this document.

> NOTE: the **Try** button only works for users logged in to the Auth0 dashboard.  You cannot send this to an anonymous user to have them try it.

Here is a sample of the **"It Works"** screen:

![](/media/articles/saml/samlsso-auth0-to-auth0/saml-auth0-9.png)

# 7. Register a simple HTML application with which to test the end-to-end connection.

In this section, you will register an application in Auth0 that will use the SAML connection you set up in the above steps.

Make sure you are logged into the **Account 1 Auth0 dashboard**.

* In the **Auth0 dashboard**, click on the **"Applications"** link at left.

* Click on the red **"+ CREATE APP"** button on the right.

* In the **Name** field, enter a name like "My-HTML-SAML-App".

* Press the blue **"SAVE"** button.

* Click on the **"Settings"** tab.

* In the **"Allowed Callback URLs"** field, enter **[http://jwt.io](http://jwt.io)**.

* The list of allowed callback URLs is a list of URL(s) to which users will be redirected after authentication.  The URL(s) entered here must match the **"callback URL"** in the HTML code created in the next step.  Normally you would enter a URL for your application, but to keep this example simple, users will simply be sent to the Auth0 JWT online tool which will provide some information about the JASON Web Token returned at the end of the authentication sequence.

* Press the blue **"SAVE CHANGES"** button at the bottom of the screen.

* In the same screen, click on the blue **"Connections"** tab (In the row that says Quick Start, Settings etc.

* Scroll down to the section near the bottom where it says **"ENTERPRISE"**.

* Find the row for the SAML connection you created above and click on the on/off toggle at right so that it is green, for "on".  That enables the SAML connection for this application.  

![](/media/articles/saml/samlsso-auth0-to-auth0/saml-auth0-12.png)

# 8. Create the HTML page for a test application

In this section you will create a very simple HTML page that invokes the **Auth0 Lock Widget** which will trigger the SAML login sequence.  This will enable an end-to-end test of the SAML SSO.

Create an HTML page and insert the following HTML and javascript code:


```html
<!DOCTYPE html PUBLIC "-//IETF//DTD HTML 2.0//EN">
<HTML>
<BODY>
<p> Click on the button to log in </p>

<script src="https://cdn.auth0.com/js/lock-9.0.min.js"></script>
<script type="text/javascript">
  var lock = new Auth0Lock('YOUR-APP-CLIENT-ID', '${account.namespace}');

  function signin() {
    lock.show({
        callbackURL: 'http://jwt.io'
      , responseType: 'token'
      , authParams: {
        // see https:///scopes
        scope: 'openid'
      }
    });
  }
</script>
<button onclick="signin()">Login</button>
</HTML>
</BODY>
```

Make sure you replace `YOUR-APP-CLIENT-ID` with the actual value of the app you registered in step 7 above.  

The client ID for your application can be found in the **Auth0 dashboard** for **Account 1** by going to __"Applications"__ link and clicking on the __"Settings"__ (gear) icon to the right of your application name.

Save this file in a place where you can access it via a browser.
For this example, we'll call it **"hello-saml.html"**.

# 9. Test your sample application

In this step, you will test your sample HTML application that uses the Auth0 SAML connection you set up in Account 1 to perform SSO via SAML against Account 2, serving as the SAML Identity Provider.

* Open the HTML file created above with a browser. You should first see a white page with a login button on it.

* Click on the **login** button.

The **Auth0 Lock** widget should appear with one button titled **"saml"**.

If you have other connections turned on for your application, your **Auth0 Lock Widget** may look slightly different.  If you are prompted to enter an email address, make sure the email address you enter has the same domain name as the domain(s) you entered in the __Settings__ tab for the  application in the Account 1 Auth0 dashboard.  (__Apps/APIs -> Settings__)

After entering your email address, the blue button on the Lock widget may have a new label. Click on the button which may be labeled **"saml"** or **ACCESS** or with the email domain of the email address you are logging in with, to initiate the SAML sso sequence with the Auth0 Identity Provider.

![](/media/articles/saml/samlsso-auth0-to-auth0/saml-auth0-10.png)

* You will be redirected to the Identity Provider to log in.

Note that whether you are prompted for credentials at this point depends on whether you still have an active session at the Identity Provider.

From the "try me" test you did earlier, you may still have an active session at the Identity Provider.  If this is the case, you will not be prompted to log in again and will simply be redirected to the callback URL specified in the HTML file. (Remember that this callback URL must also be in the __Allowed Callback URLs__ in the application's Setting tab in the Auth0 dashboard.)

If sufficient time has passed, or if you delete your browser cookies before initiating the test, then you will be prompted to login when redirected to the Identity Provider.  Log in to the Identity Provider using the credentials for the test user you created in Auth0 Account 2.

![](/media/articles/saml/samlsso-auth0-to-auth0/saml-auth0-11.png)

Upon successful authentication, you will be redirected to the callback URL specified in the HTML file (jwt.io).

# 10. Troubleshooting

This section has a few ideas for things to check if your sample doesn't work.

Note that if your application doesn't work the first time, you should clear your browser history and ideally cookies each time before you test again.  Otherwise, the browser may not be picking up the latest version of your html page or it may have stale cookies that impact execution.

When troubleshooting SSO, it is often helpful to capture an HTTP trace of the interaction.  There are many tools that will capture the HTTP traffic from your browser for analysis.  Search for "HTTP Trace" to find some.  Once you have an http trace tool, capture the login sequence from start to finish and analyze the trace to see the sequence of GETs to see how far in the expected sequence you get.  You should see a redirect from your original site to the Service Provider, and then to the Identity Provider, a post of credentials if you had to log in, and then a redirect back to the callback URL or the Service Provider and then finally a redirect to the callback URL specified in your application.

Be sure to check to make sure cookies and javascript are enabled for your browser.

Check to make sure that the callback URL specified in the HTML file is also listed in the **Allowed Callback URLs** field in the __""Settings""__ tab of the application registered in the Auth0 Dashboard.  (In dashboard, Click on __"Applications"__ link, then on the __"Settings"__ icon to the right of the application name.)

The **[http://samltool.io](http://samltool.io)** tool can decode a SAML assertion and is a useful debugging tool.
