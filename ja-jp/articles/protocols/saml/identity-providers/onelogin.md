---
title: OneLogin
description: How to configure OneLogin as an identity provider.
toc: true
topics:
    - saml
    - identity-providers
    - onelogin
contentType:
  - how-to
useCase:
  - add-idp
---
# Configure OneLogin as an Identity Provider

In this article, we will cover how you can configure OneLogin for use with Auth0 as a <dfn data-key="security-assertion-markup-language">SAML</dfn> Identity Provider.

## Step 1: Configure OneLogin

1. Log in to the [OneLogin](https://www.onelogin.com/) Dashboard, and click **Apps** > **Add Apps**.
2. Search for **SAML**, and select **SAML Test Connector (IdP w/attr)**.
3. When prompted, change the **Display Name** of your app. Click **SAVE**.
4. Go to the **SSO** tab, and copy the values for **SAML 2.0 Endpoint (HTTP)** and **SLO Endpoint (HTTP)**. Click on the **View Details** link at the **X.509 Certificate** field.
5. Download the X.509 certificate **onelogin.pem**.

## Step 2: Configure the connection using the Auth0 dashboard

At this point, you will configure the integration from the Auth0 side.

Log in to your Auth0 account, and go to the [Management Dashboard](${manage_url}). Go to **Connections** -> **Enterprise** -> **SAMLP** and click the **plus** icon to be redirected to the page that allows you to create a new Connection.

You will be prompted to provide the appropriate configuration settings for this Connection.

The only mandatory fields are as follows:

* **Sign In URL**: provide the **SAML 2.0 Endpoint (HTTP)** value you made note of when setting up your OneLogin app
* **Sign Out URL**: provide the **SLO Endpoint (HTTP)** value you made note of when setting up your OneLogin app 
* **X509 Signing Certificate**: the certificate you downloaded from Onelogin. You will need to upload the certificate directly to Auth0.

Click **Save** to persist your changes and proceed.

In the next window, you'll be provided two options. If you are a domain administrator, you can click **Continue** for additional instructions on SAML Identity Provider Configuration. If you are not, you can give your domain administrator the provided URL so that they can finish the configuration.

### Auth0 configuration values

To finish configuration of the SAML application, the admin will need the following information regarding Auth0:

* **SAML Consumer URL**: `https://${account.namespace}/login/callback`
* **SAML Audience**: `urn:auth0:${account.tenant}:YOUR_CONNECTION_NAME`

Also make sure to copy the values of the **post-back URL** and the **Entity ID** before heading back to the Configuration tab of your [OneLogin](https://www.onelogin.com/) app:

| Auth0 value | OneLogin configuration field |
| - | - |
| Post-back URL | ACS (Consumer) URL **and** Recipient |
| Entity ID | Audience |

You'll also need to provide a valid regular expression for the **ACS (Consumer) URL Validator** (for example, `[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)`)

## Step 3: Test your connection

Before testing your connection:

* Be sure that you have a OneLogin user that you can use for testing. If not, go to the **Users** tab on the OneLogin dashboard and add one
* Be sure that your new Auth0 SAMLP connection has been associated with an [application](/application) (otherwise you will get an `invalid_request: the connection was disabled` error)

At this point, you are set to test the connection! Next to your **SAML** connection, click the **Try** button.

If all goes well, you will be redirected to a page informing you that the connection works.

::: note
The **Try** button only works for users logged in to the Auth0 dashboard. You cannot provide a link to this to an anonymous user (such as a customer) for testing.

If you don't have a OneLogin user, please read the following section on configuring IdP-Initiated Signon so that your customer can test using their portal.
:::

## IdP-initiated sign on

OneLogin offers an Application Portal/Launcher to their users. If you want to take advantage of this functionality, you will have to change the **SAML Consumer URL** in OneLogin dashboard to include the `connection` parameter (e.g., `https://${account.namespace}/login/callback?connection=onelogin-customer`). Be sure to replace `onelogin-customer` with the name of your Auth0 connection.

Finally, be sure to pick the application to which your user is redirected *after* the SAML assertion is consumed. You can find more information in the [IdP-Initiated SSO page](/protocols/saml/idp-initiated-sso).

## Edit connection mappings

If you use OneLogin and Auth0 out of the box, users logging in using OneLogin and being created in the Auth0 dashboard will be missing some profile information you might like to have.

To collect additional user information, you must edit the appropriate parameters in the OneLogin dashboard, include the parameters in the SAML assertion, and create the mappings in the Auth0 connection.

### User profile attributes

Sometimes the standard User Profile Attributes are not enough for the functionality you want to build. If this is the case, you can use custom attributes in order to enhance the SAML token. Let's work through a basic example.

The SAML token contains, among others, two attributes: `FirstName` and `LastName`. Let's add a new custom attribute, named `FullName`, that will contain the concatenation of first and last name.

In order to do so, navigate to the OneLogin dashboard and edit your app.

On the __Parameters__ tab, click __Add Parameter__.

In the pop-up, set a name for your new custom attribute using the __Field name__ text box. Make sure you check the __Include in SAML assertion__ flag. Click __Save__.

The new attribute you created is displayed. Click on the __Value__ field, which is currently displaying `- No default -`.

Click the __Value__ dropdown menu and select `- Macro -`.

At the text box, set the value to `{firstname} {lastname}`. Click __Save__.

At this point, we're ready to test our changes.

Go back to [Auth0 dashboard > Connections > Enterprise > SAML](${manage_url}/#/connections/enterprise). On your __SAML__ connection, click the __Try__ button. The result should include the new attribute `FullName`.

::: note
You can find more information on _Attribute Macros_ at the [OneLogin Help Center](https://support.onelogin.com/hc/en-us/articles/201174464-Attribute-macros).
:::

### Add new parameter to the SAML assertion

For the purposes of demonstration, let's see how we can add the `EmailAddress` information, which is more than the concatenation of two fields we're already sending, to our login.

### OneLogin configuration

Before you can map users' **EmailAddress**, you must add this field as a custom parameter to the OneLogin dashboard. Set **Field name** to `EmailAddress` and **Value** as `Email`.

You can find details on the steps needed to customize the user profile [in the section above](#customize-the-user-profile).

Once you've made your changes, save them, and test your connection once again. 

Now, review your Auth0 user, making sure that the `EmailAddress` information is now included and that the value is correct.

### Auth0 mappings

You are now ready to proceed with mapping the user information fields in Auth0.

Go to the __Settings__ of your [SAML](${manage_url}/#/connections/enterprise) and navigate to the tab __Mappings__. For the email addresses, copy the mapping below, and paste it into the text box.

```javascript
{
  "email": "EmailAddress"
}
```

Save your changes, and try your connection again. Once you have successfully logged in, go to [Dashboard > Users](${manage_url}/#/users), and check your login. You will see additional information for the appropriate user.