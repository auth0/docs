---
toc: true
description: The Account Link extension allows users with two accounts with the same email to be prompted to link them.
tags:
  - extensions
  - account-linking
---
# Account Link

The **Account Link** extension prompts users that may have created a second account by mistake to link the new account with their old one on their first login. The user may choose to either link the two accounts or keep them separate if it was intentional.

## Install the Extension

To install this extension, click on the __Account Link__ box in the list of provided extensions on the [Extensions](${manage_url}/#/extensions) page of the dashboard. The __Install Extension__ window will open.

![Install Account Link Extension](/media/articles/extensions/account-link/install-extension.png)

The extension will create a new **Application** named `auth0-account-link` to use internally and a new **Rule** to redirect users to the extension if they login with a new account that has an email matching an existing account.

## Setup

First, navigate to the [Advanced Settings](${manage_url}/#/tenant/advanced) for your tenant, scroll to the bottom of the page, and click the toggle to enable **Allow ID Tokens for Management API v2 Authentication**.

### Changing the Application Name

We recommend changing the name of the default application used for the extension to something descriptive and easy to read for your customers, like `Account Linking`, since it will appear on the **Login Page** when they authenticate their primary account.

### Updating the Login Page

By default, Auth0's [Universal Login](/hosted-pages/login) allows a user to both login and sign up as one may expect. However, when the account linking asks you to authenticate your primary account in order to link it with the new account, providing a sign up option can be confusing for users.

To prevent this, we send over a query parameter to let the login page know that it should hide the **Sign Up** option. In order for this query parameter to take effect, however, we must first customize the login page.

First go to your [Dashboard](${manage_url}) and click on **Hosted Pages**. It should open to the login page by default. 

If it is not already enabled, toggle the **Customize Login Page** to enable the custom editor below. In the editor we're going to add a new line to the Lock config.

Toward the bottom of the object configuring the Lock widget, add the following line (after the `closable` setting works well):

```text
allowSignUp: !config.extraParams.prevent_sign_up,
```

![Updating the Login Page](/media/articles/extensions/account-link/hosted-page-code.png)

Then save your changes and attempt to link an account. You'll notice that the **Sign Up** option is no longer present and your users are safe from an extra level of confusion.

![Account Linking Hosted Page](/media/articles/extensions/account-link/hosted-page-example.png)

## Customization

At installation, or any time after by clicking the **Settings** icon for the Account Link Extension, you can add a URL to a custom stylesheet if you would like to customize the extension page to look a bit different from the default theme.

![Account Linking Page](/media/articles/extensions/account-link/extension-page-example.png)

## Administration Panel

::: warning
This feature is available in version 2.0 and up.
:::

You can customize your account linking login page and widget using the extension administration panel. 

Go to **Dashboard > Extensions > Installed Extensions > Auth0 Account Link**.

![Dashboard > Extensions > Installed Extensions](/media/articles/extensions/account-link/installed-extensions.png)

You will be redirected to the admin site. 

There you can edit the HTML code of your hosted page and change some settings of the account linking widget such as title, logo, color and language.

![HTML Editor](/media/articles/extensions/account-link/html-editor.png)

::: warning
Do not remove `{{ ExtensionCSS }}`, `{{ CustomCSS }}`, `{{ Auth0Widget }}`, or `{{ ExtensionScripts }}` from the HTML code of the site. This will cause the extension to not display the account linking widget.
:::

![Widget Settings](/media/articles/extensions/account-link/widget-settings.png)
