---
title: OneLogin
---
# Configuring OneLogin as an Identity Provider

## Configure app on OneLogin dashboard

Go to [OneLogin](https://www.onelogin.com/) dashboard and click on **Apps** > **Add Apps**.

![](/media/articles/saml/identity-providers/onelogin/onelogin-add-app.png)

Search for *saml* and select **SAML Test Connector (IdP w/attr)**

![](/media/articles/saml/identity-providers/onelogin/onelogin-search-app.png)

Change the **Display Name** of your app if you wish and click **SAVE**.

![](/media/articles/saml/identity-providers/onelogin/onelogin-save-app.png)

Go to the **SSO** tab and copy the values of **SAML 2.0 Endpoint (HTTP)** and **SLO Endpoint (HTTP)**. Click on the *View Details* link at the **X.509 Certificate** field.

![](/media/articles/saml/identity-providers/onelogin/onelogin-copy-values.png)

Download the X.509 certificate (onelogin.pem)

![](/media/articles/saml/identity-providers/onelogin/onelogin-download-cert.png)

## Configure connection on Auth0 dashboard

Go to [Auth0 dashboard > Connections > Enterprise > SAMLP Identity Provider](${manage_url}/#/connections/enterprise) and click **Create New** (plus icon)

![](/media/articles/saml/identity-providers/onelogin/auth0-new-samlp.png)

Set a **Connection Name** (e.g. onelogin-customer) and copy the **SAML 2.0 Endpoint (HTTP)** on the **Sign In URL** input, and the **SLO Endpoint (HTTP)** on the **Sign Out URL** input. Upload the `onelogin.pem` certificate.

![](/media/articles/saml/identity-providers/onelogin/auth0-set-values.png)

Click on **SAVE**. You will get a dialog with a **Continue** button and a link, both will take you to the following instructions:

![](/media/articles/saml/identity-providers/onelogin/auth0-instructions.png)

The information here is what the OneLogin admin needs to finish the configuration of the SAML application.

* **SAML Consumer URL**: `https://${account.namespace}/login/callback`
* **SAML Audience**: `urn:auth0:${account.tenant}:${connectionName}`

Copy the values of the **post-back URL** and the **Entity ID** and head back to your [OneLogin](https://www.onelogin.com/) app. At the **Configuration** tab copy the **post-back URL** on the **ACS (Consumer) URL** input, the **Entity ID** on the **Audience** input, and set a valid regular expression on the **ACS (Consumer) URL Validator** input (e.g.  `[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)`).

![](/media/articles/saml/identity-providers/onelogin/onelogin-set-values.png)

## Testing

If you do not already have a user on OneLogin go at the **Users** tab and add one. Also, your new Auth0 SAMLP connection should be associated with an App, otherwise you will get an `invalid_request: the connection was disabled` error.

We are now set to test the connection! On your **SAMLP Identity Provider** connection click the **Try** button.

![](/media/articles/saml/identity-providers/onelogin/auth0-try-conn.png)

You are redirected to a page informing you that the connection works. Well done!

![](/media/articles/saml/identity-providers/onelogin/auth0-try-result.png)

> **Note**: the **Try** button only works for users logged in to Auth0 dashboard. You can't send this to an anonymous user (e.g. a customer). If you don't have a OneLogin user, read the following section to configure Idp Initiated SignOn so the customer can try on their portal.

## IdP Initiated SignOn

OneLogin has an Application Portal / Launcher for their users. If you want to support that, you will have to change the **SAML Consumer URL** in OneLogin dashboard to be:

* SAML Consumer URL: `https://${account.namespace}/login/callback?connection=onelogin-customer`

Where `onelogin-customer` is the connection name you assigned in Auth0 dashboard.

Also, you have to pick the application to redirect after the SAML assertion is consumed. You can find this in the **Connection > IdP Initiated SSO tab**.

![](/media/articles/saml/identity-providers/onelogin/idp-initiated-sso.png)

## Edit connection mappings

If you use OneLogin and Auth0 out-of-the-box, users logging in using OneLogin and being created in the Auth0 dashboard, will be missing some information. Go to [Auth0 dashboard > Users](${manage_url}/#/users) and check your login. It should look like that:

![](/media/articles/saml/identity-providers/onelogin/user-without-mappings.png)

You have to edit the mappings in the Auth0 connection, along with the parameters in the OneLogin dashboard in order to map the information. Let's see how we could add the `EmailAddress` information to our login. 

> Before you map the `EmailAddress` information, you have to add it as a custom parameter to the OneLogin dashboard. Use `EmailAddress` as __Field name__ and `Email` as __Value__. You can find details on the steps [here](#customize-the-user-profile). Save your changes and test the connection via Auth0 dashboard. Check that the `EmailAddress` is included in the attributes and the value is correct. You are now ready to proceed with mapping the information.

Go to the _Settings_ of your [SAMLP Identity Provider](${manage_url}/#/connections/enterprise) and navigate to the tab __Mappings__. Copy the mappings below and paste it in the text box.

```javascript
{
  "email": "EmailAddress"
}
```

![](/media/articles/saml/identity-providers/onelogin/edit-mappings.png)

Save your changes and try your connection again. Once you have successfully logged in, go to [Auth0 dashboard > Users](${manage_url}/#/users) and check your login. It should look like that:

![](/media/articles/saml/identity-providers/onelogin/user-with-mappings.png)


## Customize the User Profile

Some times the standard User Profile Attributes are not enough for the functionality you want to build. If this is the case, you can use custom attributes in order to enhance the SAML token. Let's work through a basic example.

The SAML token contains, among others, two attributes: `FirstName` and `LastName`. Let's add a new custom attribute, named `FullName` that will contain the concatenation of first and last name. 

In order to do so navigate to the OneLogin dashboard and edit your app. 

At the __Parameters__ tab click the __Add Parameter__ link. 

![](/media/articles/saml/identity-providers/onelogin/custom-attr-01.png)

At the popup set a name for your new custom attribute at the __Field name__ text box. Make sure you check the __Include in SAML assertion__ flag. Click __Save__.

![](/media/articles/saml/identity-providers/onelogin/custom-attr-02.png)

The new attribute you created is displayed. Click on the __Value__ field, currently displaying `- No default -`.

Click on the __Value__ dropdown menu and select `- Macro -`.

![](/media/articles/saml/identity-providers/onelogin/custom-attr-03.png)

At the text box set the value to `{firstname} {lastname}`. Click __Save__.

![](/media/articles/saml/identity-providers/onelogin/custom-attr-04.png)

Let's test this. Go back to [Auth0 dashboard > Connections > Enterprise > SAMLP Identity Provider](${manage_url}/#/connections/enterprise) and on your __SAMLP Identity Provider__ connection click the __Try__ button. The result should include the new attribute `FullName`.

![](/media/articles/saml/identity-providers/onelogin/custom-attr-05.png)

You can find more information on _Attribute Macros_ at the [OneLogin Help Center](https://support.onelogin.com/hc/en-us/articles/201174464-Attribute-macros).
