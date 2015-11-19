# SAML SSO with SalesForce as an Identity Provider
This describes how to configure Auth0 to use __SalesForce__ as an Identity Provider.

There are **5 steps** to this sample

1. Obtain SalesForce metadata.
2. Set up Auth0 as a Service Provider.
3. Configure the SalesForce Identity Provider (IDP).
4. Grant Privileges to Users in SalesForce.
5. Test the connection to the SalesForce IDP.
6. Troubleshooting



# 1. Obtain SalesForce Metadata

1. Go to **[SalesForce.com](http://SalesForce.com)** and register for an account (if you haven't already).  The account must be an account type that allows use of SalesForce as an Identity Provider.

2. Log into SalesForce and click on **"Setup"** in upper right.

3. If you don't already have a SalesForce Domain, follow the  **[SalesForce Domain instructions](https://help.salesforce.com/apex/HTViewHelpDoc?id=domain_name_setup.htm&language=en_US)** to set up a domain.

4. At the left, expand **“Security Controls”** and select **"Identity Provider"**.

 ![](https://cdn.auth0.com/docs/img/salesforceidp-1.png)


5. Create an Identity Provider, by clicking to enable SalesForce as an Identity Provider.

 ![](https://cdn.auth0.com/docs/img/salesforceidp-2.png)

6. Choose the default certificate and Save.

 ![](https://cdn.auth0.com/docs/img/salesforceidp-3.png)

7. Click on **"Download Certificate"** to download the Identity Provider certificate.  Save the file downloaded for use in step 2 below.

 ![](https://cdn.auth0.com/docs/img/salesforceidp-4.png)

7. Click on **"Download Metadata"** to download the Identity Provider metadata.  Save the file downloaded for use in step 2 below.

 ![](https://cdn.auth0.com/docs/img/salesforceidp-5.png)


# 2. Set up Auth0 as a Service Provider

In this step you will configure Auth0 as a Service Provider so it knows how to communicate with the __SalesForce__ Identity Provider for single sign on.

**In the Auth0 dashboard:**

1. Click on **"Connections"** at left.
2. In the list of options below "Connections", click on **"Enterprise"**
3. In the middle of the screen, click on **"SAMLP Identity Provider"**
4. Click on **"Create New Connection"**


5. In the "Create SAMLP Identity Provider" connection window, enter the following information into the "Configuration" tab.

**Connection Name:** You can make up any name, such as "SFIDP"

**Email Domains:** In this example, we will use the Lock Widget, so in the Email Domains field enter the email domain name for the users that will log in via this connection.
For example, if your users have an email domain of 'abc-example.com', you would enter that into this field. You can enter multiple email domains if needed.

**Sign In URL:** Open the MetaData file downloaded from SalesForce and locate the line that contains the SingleSignOnService Binding. The value of the "Location" attribute on this line is the Sign In URL.  It will be something like:

 https://{sf-account-name}.my.salesforce.com/idp/endpoint/HttpRedirect

 where "{sf-account-name}" would be replaced by your SalesForce account domain name.


**Sign Out URL:** enter the same URL that was entered for Sign In URL.

 ![](https://cdn.auth0.com/docs/img/salesforceidp-6.png)


**Certificate:**  The certificate downloaded from SalesForce is in .crt format.
Convert this certificate to .pem format with the following command.

openssl x509 -in original.crt -out sfcert.pem -outform PEM
where "original.crt" is the downloaded .crt file from SalesForce.

6. In the Auth0 screen, click on  **"UPLOAD CERTIFICATE"**  and select the `.pem` file you just created. (sfcert.pem in the example above)

You can ignore the rest of the fields for now.

7. **Save:** Click on  **"SAVE"**.


8. Click on  **"CONTINUE"**. In the window that appears, SAML metadata for the Auth0 Service Provider will be displayed.  Keep this window as you will need to enter some of this information into SalesForce to finish the federation Configuration.

 ![](https://cdn.auth0.com/docs/img/salesforceidp-7.png)


In general, you can access the metadata for a SAML connection in Auth0 here: `https://${account.namespace}/samlp/metadata?connection=${connectionName}`.


# 3. Configure the SalesForce Identity Provider

In this step you will configure SalesForce with the metadata from Auth0 so it knows how to receive and respond to SAML-based authentication requests from Auth0.

1. Go back to **[SalesForce.com](http://salesforce.com)**

2. Click on **"Setup"** in upper right

3. Click on  **“Manage Apps”**  on the left

3. Click on  **“Connected Apps”**

4. Create a new Connected App and fill out the following fields:

**Entity ID:** `urn:auth0:${account.namespace}:${connectionName}``

**ACS URL:** `https://${account.namespace}/login/callback`

**Subject Type:** `Persistent ID`

**Name ID Format:** Choose the one with emailAddress

**Issuer:** `https://{your-saleforce-domain}.my.salesforce.com`

5. Then press  **“Save”** to complete the configuration of the IDP

 ![](https://cdn.auth0.com/docs/img/salesforceidp-8.png)



#4. Grant Privileges to Users in SalesForce

1. In SalesForce, click on Setup.
2. Under **"Manage Users**, click on **"Profiles"**
3. Scroll down to find the profile called **"Standard User"** (on page 2)
4. Click on **"Edit"** to edit the profile
5. Scroll down to the **"Connected App Access"** section
6. Check the box next to the name of your connected app to enable it for the profile

 ![](https://cdn.auth0.com/docs/img/salesforceidp-9.png)

7
. Click on **"Save"**
8. Under **"Manage Users"** Click on **"Users"**
9. Click on **"Edit"** to edit your test user and set the profile to **"Standard User"**


 ![](https://cdn.auth0.com/docs/img/salesforceidp-10.png)

If you wish to use a different SalesForce profile, be sure to enable the connected app for the profile, and ensure that all users who need to log in via the SalesForce Identity Provider have that profile.

# 5. Test the connection to the SalesForce IDP

In this step, you will test to make sure the SAML configuration between Auth0 and SalesForce is working.

* In the Auth0 dashboard, navigate to:  __Connections -> Enterprise -> SAMLP Identity Provider__.

* Click on the triangular **"Try"** button for the SAML connection you created earlier.    You should be redirected from Auth0 to the SalesForce login page.

* Once you are at the **SalesForce login screen**, login with the credentials you provided when you created the SalesForce account.

If the SAML configuration works, your browser will be redirected back to an Auth0 page that says __"It works!!!"__.  This page will display the contents of the SAML authentication assertion sent by the SalesForce IDP to Auth0.
This means the connection from Auth0 to the SalesForce IDP is working.

If it didn't work, double check the above steps and then consult the **troubleshooting** section at the end of this document.

> NOTE: the **Try** button only works for users logged in to the Auth0 dashboard.  You cannot send this to an anonymous user to have them try it.



#6. Troubleshooting.

This section has a few ideas for things to check if your sample doesn't work.


When troubleshooting SSO, it is often helpful to capture an HTTP trace of the interaction and save it in a .har file.

 **[har file instructions](/har)**

Once you have an http trace tool, capture the login sequence from start to finish and analyze the trace to see the sequence of GETs to see how far in the expected sequence you get.  You should see a redirect from your original site to the IDP, a post of credentials if you had to log in, and then a redirect back to the callback URL.  The .har file will also contain the SAML response.

Be sure to check to make sure cookies and javascript are enabled for your browser.

Make sure that the user's profile in SalesForce has permission to login via the SalesForce IDP.  (See section 4 above)
