---
description: How use hosted pages with Auth0
---

# How to Use Hosted Pages with Auth0

Auth0 provides you the ability to create beautiful hosted pages to which you can redirect to provide functionality for your users. These pages include Login, Password Reset, Guardian Multifactor, and Error pages.

## How to Customize Hosted Pages

### Login Page

In your [Auth0 Dashboard](https://manage.auth0.com/#/login_page), you can enable your Hosted Login Page by simply flipping the toggle switch.

<img width="500" src="/media/articles/hosted-pages/login.png" />

If you want to change some of the [configuration options](/libraries/lock/v10/customization) within Lock, you may do so _right on this page_, just make your changes and make sure to remember to hit the "save" button. 

This login page will be a basic login page for your client, and will use Lock to provide your users with a beautiful and smooth authentication process.

### Password Reset Page

In your [Auth0 Dashboard](https://manage.auth0.com/#/password_reset), you can enable your Hosted Password Reset Page by simply flipping the toggle switch.

<img width="500" src="/media/articles/hosted-pages/password_reset.png" />

If you want to change some of the options in the Change Password Widget, you may do so _right on this page_, just make your changes and make sure to remember to hit the "save" button. The options have comments to help document their uses.

Using this page for password resets will allow your users to maintain consistency in appearance, if you are already using the hosted login page, and provide them a reliable and stable platform on which to reset passwords and gain access to their account.

### Guardian Multifactor Login Page

In your [Auth0 Dashboard](https://manage.auth0.com/#/guardian_mfa_page), you can enable your Hosted Guardian Multifactor Login Page by simply flipping the toggle switch.

<img width="500" src="/media/articles/hosted-pages/guardian.png" />

If you want to change some of the options in the Change Password Widget, you may do so _right on this page_, just make your changes and make sure to remember to hit the "save" button. The options have comments to help document their uses.

This hosted page provides the same type of functionality as the login page, with the added protection of Guardian Multifactor Authentication. Take a look at our documentation on [Guardian MFA](/multifactor-authentication/guardian) for more details!

### Error Pages

#### Generic Error Page

Throughout the authentication process, your users may encounter errors. Auth0 provides you the option of using [custom error pages](/error-pages/custom), but you may also choose instead to use the generic error page that Auth0 provides to alert the user of said errors.

<img width="500" src="/media/articles/error-pages/generic-error-page-settings.png" />

By going into the Account Settings page of the Management Dashboard, you may customize your Auth0 error page with the following fields:

* **Friendly Name**: the name of your company;
* **Logo URL**: the URL to your company logo;
* **Support Email**: the email address of your company's support team;
* **Support URL**: the URL to your company's support page.

In addition to these fields, the error page returns the follow information to assist you in troubleshooting the error:

* **Client ID**: the identifier for the client;
* **Connection**: the Connection used at the time of error;
* **Language**: the language set to be used at the time of error;
* **Error**: the code corresponding to the error that occurred;
* **Error Description**: a description of the error that occurred;
* **Show Log URL**: the link to the error logs, if available;
* **Title**: the friendly name of the tenant;
* **Tenant**: the tenant information (the friendly name, logo URL, support email, and support URL fields that you may customize).

#### Custom Error Pages

In the event of an authorization error, you may choose to display to your users either the default Auth0 error page or a customized error page.

The [custom error pages](/error-pages/custom) page details how you can configure your own custom error page for use with Auth0.

## How to Use Version Control to Manage Your Hosted Pages 

It is possible to use version control software to manage the source code of the hosted pages discussed here. Auth0 provides extensions for the following tools which can be used to manage the source of your hosted pages:

* [GitLab Extension](/extensions/gitlab-deploy#deploy-hosted-pages)
* [GitHub Extension](/extensions/github-deploy)
* [BitBucket Extension](/extensions/bitbucket-deploy)
* [Visual Studio Team Services Extension](/extensions/visual-studio-team-services-deploy)

You should take a look at the documentation for the extension that you would like to use, to learn the details about implementing source control for your hosted pages with that specific extension. However, in general, deploying hosted pages with these tools will require just a few steps:

1. Create a folder within your version control repository with the appropriate name (`pages`).
1. Create an HTML page (`login.html`, `password_reset.html`, `guardian_multifactor.html`, or `error_page.html`).
1. Create a JSON file (with the same name, but with the `.json` file extension) for each hosted page that you wish to source control. To enable the page, the JSON file would contain the following:

```json
{
  "enabled": true
}
```

**File Naming Example:**
```text
your-repo/pages/error_page.html
your-repo/pages/error_page.json
```