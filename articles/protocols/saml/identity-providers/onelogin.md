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

In this article, we will cover how you can configure OneLogin for use with Auth0 as a SAML Identity Provider.

## Step 1: Configure app on the OneLogin dashboard

Log in to the [OneLogin](https://www.onelogin.com/) Dashboard, and click **Apps** > **Add Apps**.

![](/media/articles/saml/identity-providers/onelogin/onelogin-add-app.png)

Search for **saml**, and select **SAML Test Connector (IdP w/attr)**.

![](/media/articles/saml/identity-providers/onelogin/onelogin-search-app.png)

Change the **Display Name** of your app. Click **SAVE**.

![](/media/articles/saml/identity-providers/onelogin/onelogin-save-app.png)

Go to the **SSO** tab, and copy the values for **SAML 2.0 Endpoint (HTTP)** and **SLO Endpoint (HTTP)**. Click on the **View Details** link at the **X.509 Certificate** field.

![](/media/articles/saml/identity-providers/onelogin/onelogin-copy-values.png)

Download the X.509 certificate **onelogin.pem**.

![](/media/articles/saml/identity-providers/onelogin/onelogin-download-cert.png)

At this point, you will take the information you just collected to configure Auth0.

## Step 2: Configure the connection using the Auth0 dashboard

Log in to the Auth0 Dashboard, and go to [Connections > Enterprise > SAMLP Identity Provider](${manage_url}/#/connections/enterprise). Click on the **plus icon** to create a new connection.

![](/media/articles/saml/identity-providers/onelogin/auth0-new-samlp.png)

Set the **Connection Name** (you can use something like **onelogin-customer**) Then, paste:

* The **SAML 2.0 Endpoint (HTTP)** value you saved above into the **Sign In URL** field
* The **SLO Endpoint (HTTP)** value into the **Sign Out URL** field. 

Finally, upload the **onelogin.pem** certificate using **Upload Certificate**.

![](/media/articles/saml/identity-providers/onelogin/auth0-set-values.png)

Scroll to the bottom of the window and click **SAVE**.

At this point, you will be presented with a dialog prompting you for your next steps; both links will take you to the following instructions:

![](/media/articles/saml/identity-providers/onelogin/auth0-instructions.png)

The following information is what the OneLogin admin needs to finish the configuration of the SAML application:

* **SAML Consumer URL**: `https://${account.namespace}/login/callback`
* **SAML Audience**: `urn:auth0:${account.tenant}:YOUR_CONNECTION_NAME`

Be sure to also copy the values of the **post-back URL** and the **Entity ID** before heading back to your [OneLogin](https://www.onelogin.com/) app.

On the **Configuration** tab:

- Paste the **post-back URL** value to the **ACS (Consumer) URL** and the **Recipient** fields (you **must** set the Recipient value)
- Paste the **Entity ID** to the **Audience** field
- Provide a valid regular expression for the **ACS (Consumer) URL Validator** field (for example, `[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)`)

![](/media/articles/saml/identity-providers/onelogin/onelogin-set-values.png)

## Step 3: Test your connection

Before testing your connection:

* Be sure that you have a OneLogin user that you can use for testing. If not, go to the **Users** tab on the OneLogin dashboard and add one
* Be sure that your new Auth0 SAMLP connection has been associated with an [application](/application) (otherwise you will get an `invalid_request: the connection was disabled` error)

At this point, you are set to test the connection! Next to your **SAMLP Identity Provider** connection, click the **Try** button.

![](/media/articles/saml/identity-providers/onelogin/auth0-try-conn.png)

If all goes well, you will be redirected to a page informing you that the connection works.

![](/media/articles/saml/identity-providers/onelogin/auth0-try-result.png)

::: note
The **Try** button only works for users logged in to the Auth0 dashboard. You cannot provide a link to this to an anonymous user (such as a customer) for testing.

If you don't have a OneLogin user, please read the following section on configuring IdP-Initiated Signon so that your customer can test using their portal.
:::

## IdP Initiated SignOn

**Beginning with auth0.js v9.3.4, you must [enable the impersonation flags](/users/guides/impersonate-users-using-the-impersonation-api) to use IdP-initiated login.**

<%= include('../../../_includes/_deprecate-impersonation.md') %>

OneLogin offers an Application Portal/Launcher to their users. If you want to take advantage of this functionality, you will have to change the **SAML Consumer URL** in OneLogin dashboard to the **SAML Consumer URL** (e.g., `https://${account.namespace}/login/callback?connection=onelogin-customer`).

Be sure to replace `onelogin-customer` with the name of your Auth0 connection.

Finally, be sure to pick the application to which your user is redirected *after* the SAML assertion is consumed. You can find this information in the **Connection > IdP Initiated SSO** tab.

![](/media/articles/saml/identity-providers/onelogin/idp-initiated-sso.png)

## Edit connection mappings

If you use OneLogin and Auth0 out of the box, users logging in using OneLogin and being created in the Auth0 dashboard will be missing some profile information you might like to have.

As an example, go to [Dashboard > Users](${manage_url}/#/users) and check your test login. It should look something like this:

![](/media/articles/saml/identity-providers/onelogin/user-without-mappings.png)

To collect additional user information, you must edit the appropriate parameters in the OneLogin dashboard, include the parameters in the SAML assertion, and create the mappings in the Auth0 connection.

### User profile attributes

Sometimes the standard User Profile Attributes are not enough for the functionality you want to build. If this is the case, you can use custom attributes in order to enhance the SAML token. Let's work through a basic example.

The SAML token contains, among others, two attributes: `FirstName` and `LastName`. Let's add a new custom attribute, named `FullName`, that will contain the concatenation of first and last name.

In order to do so, navigate to the OneLogin dashboard and edit your app.

On the __Parameters__ tab, click __Add Parameter__.

![](/media/articles/saml/identity-providers/onelogin/custom-attr-01.png)

In the popup, set a name for your new custom attribute using the __Field name__ text box. Make sure you check the __Include in SAML assertion__ flag. Click __Save__.

![](/media/articles/saml/identity-providers/onelogin/custom-attr-02.png)

The new attribute you created is displayed. Click on the __Value__ field, which is currently displaying `- No default -`.

Click the __Value__ dropdown menu and select `- Macro -`.

![](/media/articles/saml/identity-providers/onelogin/custom-attr-03.png)

At the text box, set the value to `{firstname} {lastname}`. Click __Save__.

![](/media/articles/saml/identity-providers/onelogin/custom-attr-04.png)

At this point, we're ready to test our changes.

Go back to [Auth0 dashboard > Connections > Enterprise > SAMLP Identity Provider](${manage_url}/#/connections/enterprise). On your __SAMLP Identity Provider__ connection, click the __Try__ button. The result should include the new attribute `FullName`.

![](/media/articles/saml/identity-providers/onelogin/custom-attr-05.png)

::: note
You can find more information on _Attribute Macros_ at the [OneLogin Help Center](https://support.onelogin.com/hc/en-us/articles/201174464-Attribute-macros).
:::

### Add new parameter to the SAML assertion

For the purposes of demonstration, let's see how we can add the `EmailAddress` information, which is more than the concatenation of two fields we're already sending, to our login.

### OneLogin Configuration

Before you can map users' **EmailAddress**, you must add this field as a custom parameter to the OneLogin dashboard. Set **Field name** to `EmailAddress` and **Value** as `Email`.

You can find details on the steps needed to customize the user profile [in the section above](#customize-the-user-profile).

Once you've made your changes, save them, and test your connection once again. 

Now, review your Auth0 user, making sure that the `EmailAddress` information is now included and that the value is correct.

### Auth0 Mapping

You are now ready to proceed with mapping the user information fields in Auth0.

Go to the __Settings__ of your [SAMLP Identity Provider](${manage_url}/#/connections/enterprise) and navigate to the tab __Mappings__. For the email addresses, copy the mapping below, and paste it into the text box.

```javascript
{
  "email": "EmailAddress"
}
```

![](/media/articles/saml/identity-providers/onelogin/edit-mappings.png)

Save your changes, and try your connection again. Once you have successfully logged in, go to [Dashboard > Users](${manage_url}/#/users), and check your login. It should now look like this:

![](/media/articles/saml/identity-providers/onelogin/user-with-mappings.png)