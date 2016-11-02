---
description: How use hosted pages with Auth0
---

# How to Use Hosted Pages with Auth0

Auth0 provides you the ability to create beautiful hosted pages to which you can redirect to provide functionality for your users. These pages include [Login](/hosted-pages/login-page), [Password Reset](/hosted-pages/password-reset-page), [Guardian Multifactor](/hosted-pages/guardian-multifactor-login-page), and [Error pages](/hosted-pages/error-pages).

## Security Considerations
 
Using Auth0 hosted pages for your authentication, rather than externally hosting them, provides seamless XSRF protection, preventing third party impersonation or hijacking of sessions. The use of hosted pages provides a significantly easier to implement, secure solution for authentication, allowing you to worry about other things, like the security of your application.

## How to Customize Hosted Pages

You can customize your hosted pages from within your [Auth0 Dashboard](). See the following pages for specific instructions about each type of hosted page:

* [Login Page](/hosted-pages/login)
* [Password Reset Page](/hosted-pages/password-reset)
* [Guardian Multifactor Authentication Page](/hosted-pages/guardian)
* [Error Pages](/error-pages)

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