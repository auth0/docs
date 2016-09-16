---
url: /saml-sp-generic
---

# Auth0 as ServiceProvider

These instructions explain how to configure Auth0 to serve as a Service Provider in a SAML federation.


There are **5 sections**, including a troubleshooting section at the end.

1. Obtain information from IDP
2. Configure Auth0 as Service Provider
3. Add your Service Provider metadata to the Identity Provider
4. Test the connection from Service Provider to Identity Provider
5. Troubleshooting


## 1. Obtain information from IDP

You will need to obtain some information from the Identity Provider.  The instructions here will be generic.  You will have to locate this information in your specific Identity Provider.

* SSO URL - The URL at the Identity Provider to which SAML authentication requests should be sent.  This is often called an SSO URL.

* Logout URL - The URL at the Identity Provider to which SAML logout requests should be sent.  This is often called a logout URL, a global logout URL or single logout URL.

* Signing certificate - The Identity Provider will digitally sign authentication assertions and the signing certificate is needed by the Service Provider to validate the signature of the signed assertions.  There should be a place to download the signing certificate from the Identity Provider.   If the certificate is not in .pem or .cer format, you should convert it to one of those formats.


## 2. Configure Auth0 as Service Provider

In this section you will configure Auth0 to serve as a SAML Service Provider.


**In the Auth0 dashboard:**

1. Click on **"Connections"** link at left.
2. In the list of options below "Connections", click on **"Enterprise"**
3. In the middle of the screen, click on **"SAMLP Identity Provider"**
4. Click on the blue **"Create New Connection"** button


In the **"Create SAMLP Identity Provider"** connection window, enter the following information into the "Configuration" tab.

**Connection Name:** You can enter any name, such as "SAML-SP"

**Email Domains:** Enter the email domain name for the users that will log in via this connection.
For example, if your users have an email domain of 'abc-example.com', you would enter that into this field. You can enter multiple email domains if needed.  If you leave this field blank, users with any email domain can use the IDP.

**Sign In URL:** enter the **"SAML SSO URL"** that you obtained from the Identity Provider.

**Sign Out URL:** enter the **SAML Logout URL** obtained from the Identity Provider.

**Certificate:**  
Click on the red **"UPLOAD CERTIFICATE"** button and select the `.pem` file you obtained from the Identity Provider.

You can ignore the rest of the fields for now.

**Save:** Click on the blue **"SAVE"** button at the bottom.

Here is an example of what the filled-out screen would look like: (you should have filled out the Email domains field as well with your specific test user's email domain.)

![](/media/articles/saml/saml-sp-generic/saml-sp-generic1.png)


After pressing the **"SAVE"** button, A window will appear with a red **"CONTINUE"** button. (You might have to scroll up to see it)

Click on the **"CONTINUE"** button.

In the window that appears, metadata about this SAML  service provider  is displayed.  You will need to use the information from this screen to configure the Identity Provider.

The first bullet is the post-back URL or Assertion Consumer Service (ACS) URL.  This is the URL to which the Identity Provider will sent Authentication Assertions after authenticating a user.  Enter this value where the Identity Provider asks for Assertion Consumer Service URL.  It may just call this a Service Provider URL.

The second bullet tells you the **"Entity ID"**.  It will be of the form __urn:auth0:${account.tenant}:${connectionName}__.  

Copy and save this entire Entity ID field from "urn" all the way to the end of the connection name.  Use this value if the Identity Provider asks for Entity ID or SAML Audience.

The third bullet indicates the binding that will be used to send the SAML Request from Auth0 to the Identity Provider.    If the Identity Provider provides a choice, select HTTP-Redirect as shown on your metadata screen.

The fourth bullet indicates that Auth0 expects the Identity Provider to respond with an HTTP POST.  e.g. the Authentication Assertion from the Identity Provider will be sent using the HTTP POST binding.  If the Identity Provider provides a choice, indicate that HTTP-POST binding should be used for Authentication Assertions.

The nameid format is the format for the attribute that will be used to identify users.

In that same window, near the bottom, there is a line that says, _"You can access the metadata for your connection in Auth0 here:"_.  

In general, you can access the metadata for a SAML connection in Auth0 here: `https://${account.namespace}/samlp/metadata?connection=${connectionName}`.

Make a note of this metadata URL as you may be able to use it to configure the Identity Provider in the next step.


## 3. Add your Service Provider metadata to the Identity Provider

In this section you will add some information to the Identity Provider  so the Identity Provider knows how to receive and respond to SAML-based authentication requests from the Auth0 Service Provider.  The instructions provided here are generic.  You will need to find the appropriate screens and fields on the Identity Provider.

Locate the screens in the Identity Provider that allow you to configure SAML.

If the Identity Provider supports uploading a metadata file, you can simply provide the metadata URL obtained in the step above.

If the Identity Provider does not support uploading a metadata file, you can configure it manually as follows:

The Identity Provider will need to know where to send the SAML assertions after it has authenticated a user.  This is the Assertion Consumer Service URL in Auth0.  
The Identity Provider may call this any of the following
* Assertion Consumer Service URL
* Application Callback URL

If the Identity Provider has a field called "Audience" or "Entity ID", you should enter into that field the Entity ID" from Auth0.


```
    "audience":"urn:auth0:${account.tenant}:${connectionName}"
```

If the Identity Provider provides a choice for bindings, you should select HTTP-Redirect for Authentication Requests.

If the Identity Provider provides a choice for bindings, you should select HTTP-Redirect for Authentication Requests.


## 4. Test the connection from Service Provider to Identity Provider

In this section, you will test to make sure the SAML configuration between Auth0, the Service Provider, and the remote SAML Identity Provider is working.



* In the **Auth0 dashboard**, navigate to:  __Connections -> Enterprise -> SAMLP Identity Provider__.

* Click on the triangular **"Try"** button for the SAML connection you created earlier.  This button is to the right of the name of the connection.  You can hover your mouse over the button to have the text label appear.

* You will first see a Lock login widget appear that is triggered by the Service Provider.  Enter the username.   If you entered an email domain in the SAMLP connection configuration, the username should belong to that email domain.

You will then be redirected to the login screen of the Identity Provider.  Login with the credentials for a user that exists in the Identity Provider.

If the SAML configuration works, your browser will be redirected back to an Auth0 page that says __"It works!!!"__.  This page will display the contents of the SAML authentication assertion sent by the Identity Provider to Auth0 Service Provider.
This means the SAML connection from Auth0 Service Provider to Identity Provider is working.

If it didn't work, double check the above steps and then consult the **troubleshooting** section at the end of this document.

> NOTE: the **Try** button only works for users logged in to the Auth0 dashboard.  You cannot send this to an anonymous user to have them try it.

Here is a sample of the **"It Works"** screen:

![](/media/articles/saml/saml-sp-generic/saml-auth0-9.png)


## 5. Troubleshooting.

This section has a few ideas for things to check if your sample doesn't work.

Note that if your application doesn't work the first time, you should clear your browser history and ideally cookies each time before you test again.  Otherwise, the browser may not be picking up the latest version of your html page or it may have stale cookies that impact execution.

When troubleshooting SSO, it is often helpful to capture an HTTP trace of the interaction.  There are many tools that will capture the HTTP traffic from your browser for analysis.  Search for "HTTP Trace" to find some.  Once you have an http trace tool, capture the login sequence from start to finish and analyze the trace to see the sequence of GETs to see how far in the expected sequence you get.  You should see a redirect from your original site to the Service Provider, and then to the Identity Provider, a post of credentials if you had to log in, and then a redirect back to the callback URL or the Service Provider and then finally a redirect to the callback URL specified in your application.

Be sure to check to make sure cookies and javascript are enabled for your browser.

Check to make sure that the callback URL specified by your application in its authentication request is listed in the **Allowed Callback URLs** field in the __"Settings"__ tab of the application registered in the Auth0 Dashboard.  (In dashboard, Click on __"Apps/APIs"__ link, then on the __"Settings"__ icon to the right of the application name.)

The **[http://samltool.io](http://samltool.io)** tool can decode a SAML assertion and is a useful debugging tool.

## Supported algorithms for signatures

We currently support the following algorithms for processing XML Digital Signatures:

* Canonicalization
  * 'http://www.w3.org/2001/10/xml-exc-c14n#'
  * 'http://www.w3.org/2001/10/xml-exc-c14n#WithComments'
  * 'http://www.w3.org/2000/09/xmldsig#enveloped-signature'

* Signature

  * 'http://www.w3.org/2000/09/xmldsig#rsa-sha1'
  * 'http://www.w3.org/2001/04/xmldsig-more#rsa-sha256'
  * 'http://www.w3.org/2001/04/xmldsig-more#rsa-sha512'

* Digest
  
  * 'http://www.w3.org/2000/09/xmldsig#sha1'
  * 'http://www.w3.org/2001/04/xmlenc#sha256'
  * 'http://www.w3.org/2001/04/xmlenc#sha512'
