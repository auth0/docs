# SAML SSO with SalesForce

This article describes how to configure Auth0 to use **SalesForce** as an Identity Provider.

There are 6 steps to this sample:

1. Obtain SalesForce certificate and metadata.
2. Set up Auth0 as a Service Provider.
3. Configure the SalesForce Identity Provider (IDP).
4. Grant Privileges to users in SalesForce.
5. Test the connection to the SalesForce IDP.
6. Troubleshooting

## 1. Obtain SalesForce Certificate and Metadata

1. Register for a [SalesForce.com](http://SalesForce.com) account. You must select one of the account types that include Identity Provider support.
2. Create your [SalesForce Domain](https://help.salesforce.com/apex/HTViewHelpDoc?id=domain_name_setup.htm&language=en_US).
2. Log into your SalesForce domain `https://YOUR_DOMAIN.my.salesforce.com` and click on **Setup** on the top right.
4. In the left menu, expand **Security Controls** and select **Identity Provider**.
 ![](/media/articles/saml/identity-providers/salesforce/salesforceidp-1.png)

5. Create an Identity Provider by clicking **Enable Identity Provider**.
 ![](/media/articles/saml/identity-providers/salesforce/salesforceidp-2.png)

6. Select the default certificate and click **Save**.
 ![](/media/articles/saml/identity-providers/salesforce/salesforceidp-3.png)

7. Click **Download Certificate** to download the Identity Provider certificate.
 ![](/media/articles/saml/identity-providers/salesforce/salesforceidp-4.png)

8. Click **Download Metadata** to download the Identity Provider metadata.
 ![](/media/articles/saml/identity-providers/salesforce/salesforceidp-5.png)

## 2. Set up Auth0 as a Service Provider

In this step, you will configure Auth0 as a Service Provider to communicate with the **SalesForce** Identity Provider for single sign on.

1. Navigate to the [Connections > Enterprise](${manage_url}/#/connections/enterprise) section of the Auth0 dashboard.
2. Click on **SAMLP Identity Provider**
3. Click on **Create New Connection**
4. In the **Create SAMLP Identity Provider connection** window, enter the following information into the **Configuration** tab:

  **Connection Name:** You can choose any name, such as "SFIDP".

  **Email Domains:** Enter the email domain name that your users will be logging in from. For example, if your users have an email domain of `abc-example.com`, you would enter that into this field. You can enter multiple email domains if needed.

  **Sign In URL:** Open the metaData file you downloaded from SalesForce and locate the line that contains the `SingleSignOnService` binding. The value of the `Location` attribute on this line is your Sign In URL. It will be something like:

    `https://{sf-account-name}.my.salesforce.com/idp/endpoint/HttpRedirect`

  where "{sf-account-name}" is your SalesForce account domain name.

  **Sign Out URL:** enter the same URL that was entered for Sign In URL.
  ![](/media/articles/saml/identity-providers/salesforce/salesforceidp-6.png)

  **Certificate:**  The certificate downloaded from SalesForce is in .crt format. Convert this certificate to .pem format with the following command.

    `openssl x509 -in original.crt -out sfcert.pem -outform PEM`

  where `original.crt` is the filename of the downloaded .crt file.

5. Click **UPLOAD CERTIFICATE**  and select the `.pem` file you just created. (`sfcert.pem` in the example above). You can ignore the rest of the fields for now.
6. Click on **SAVE**.
7. Click on **CONTINUE**. In the window that appears, SAML metadata for the Auth0 Service Provider will be displayed. Keep this window open since you will need to enter some of this information into SalesForce to finish the configuration.

  ![](/media/articles/saml/identity-providers/salesforce/salesforceidp-7.png)

**NOTE:** You can always access the metadata for an Auth0 SAML connection with this URL syntax: `https://${account.namespace}/samlp/metadata?connection=${connectionName}`.

## 3. Configure the SalesForce Identity Provider

In this step, you will configure SalesForce with the metadata from Auth0 so it can receive and respond to SAML-based authentication requests from Auth0.

1. Open **[SalesForce.com](http://salesforce.com)**.
2. Click on **Setup** in upper right.
3. Click on **Manage Apps**  on the left.
4. Click on **Connected Apps**.
5. Create a new Connected App and fill out the following fields:

  **Entity ID:** `urn:auth0:${account.namespace}:${connectionName}`

  **ACS URL:** `https://${account.namespace}/login/callback`

  **Subject Type:** `Persistent ID`

  **Name ID Format:** Choose the one with emailAddress

  **Issuer:** `https://{your-saleforce-domain}.my.salesforce.com`

6. Click **Save** to complete the configuration of the IDP.

## 4. Grant Privileges to Users in SalesForce

1. Open **[SalesForce.com](http://salesforce.com)** and click **Setup**.
2. Under **Manage Users**, click on **Profiles**.
3. Scroll down to find the profile called **Standard User** (on page 2).
4. Click on **Edit** to edit the profile.
5. Scroll down to the **Connected App Access** section.
6. Check the box next to the name of your connected app to enable it for this profile.
  ![](/media/articles/saml/identity-providers/salesforce/salesforceidp-9.png)

7. Click **Save**.
8. Under **Manage Users**, click **Users**.
9. Click **Edit** to edit your test user and set the profile to **Standard User**.
  ![](/media/articles/saml/identity-providers/salesforce/salesforceidp-10.png)

**NOTE:** If you wish to use a different SalesForce profile, you must enable the connected app for that profile and ensure that all users that login through the SalesForce Identity Provider have that profile.

## 5. Test the connection to the SalesForce IDP

In this step, you will test the SAML configuration between Auth0 and SalesForce.

* Navigate to the [Connections > Enterprise](${manage_url}/#/connections/enterprise) section of the Auth0 dashboard. Select the **SAMLP Identity Provider**.
* Click the **Try** button for the SAML connection you created earlier. You should be redirected from Auth0 to the SalesForce login page.
* Once you are at the **SalesForce login screen**, login with the credentials you provided when you created the SalesForce account.

If the SAML configuration works, your browser will be redirected back to an Auth0 page that says **"It works!!!"**. This page will display the contents of the SAML authentication assertion sent by the SalesForce IDP to Auth0.

If it didn't work, double check the steps above and consult the **troubleshooting** section below.

**NOTE:** The **Try** button only works for users logged into the Auth0 dashboard.

## 6. Troubleshooting.

When troubleshooting SSO, it is often helpful to capture an HTTP trace of the interaction and save it in a .har file. See: [Troubleshooting with HAR files](/har).

Once you have an http trace tool, capture the login sequence from start to finish and analyze the trace for the sequence of *GET*s. You should see a redirect from your original site to the IDP, a post of credentials if you had to log in, and then a redirect back to the callback URL. The .har file will also contain the SAML response.

Make sure that cookies and JavaScript are enabled for your browser.

Make sure that the user's profile in SalesForce has permission to login via the SalesForce IDP (See section 4 above).
