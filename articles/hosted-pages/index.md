---
description: Overview of hosted pages with Auth0, and how to use them
---

# How to Use Hosted Pages with Auth0

Auth0 offers you the ability to display customized pages containing Auth0-related functionality and to which your users can be redirected. You can create the following types of hosted pages:

* [Login](/hosted-pages/login)
* [Password Reset](/hosted-pages/password-reset)
* [Guardian Multifactor](/hosted-pages/guardian)
* [Error pages](/hosted-pages/error-pages)

While Auth0 hosts your custom pages, you can still manage your pages using the version control system of your choice.

## Security Considerations

Hosted pages are an easy to implement and secure. For example, using Auth0 hosted pages instead of hosting them externally provides seamless XSRF protection. This helps prevent third party impersonation or the hijacking of sessions.

## How to Customize Hosted Pages

You can customize your hosted pages using the [Auth0 Dashboard](${manage_url}). Please see the following pages for specific instructions for each type of hosted page:

* [Login Page](/hosted-pages/login)
* [Password Reset Page](/hosted-pages/password-reset)
* [Guardian Multifactor Authentication Page](/hosted-pages/guardian)
* [Error Pages](/error-pages)

## How to Use Version Control to Manage Your Hosted Pages

You can use version control software to manage the source code of your hosted pages.
To do so, you can use the Auth0-provided extension that works with the version control system you're using:

* [GitLab Extension](/extensions/gitlab-deploy#deploy-hosted-pages)
* [GitHub Extension](/extensions/github-deploy#deploy-hosted-pages)
* [BitBucket Extension](/extensions/bitbucket-deploy#deploy-hosted-pages)
* [Visual Studio Team Services Extension](/extensions/visual-studio-team-services-deploy#deploy-hosted-pages)

While the specific documentation pages contain detailed information for the extensions, the general deploying process requires just the following steps:

1. Create a folder in your version control repository with the appropriate name (`pages`).
2. Create an HTML page (`login.html`, `password_reset.html`, `guardian_multifactor.html`, or `error_page.html`) within your folder.
3. Create a JSON file with the same name as your HTML page for each hosted page that you wish to source control. To enable the page, the JSON file needs to contain the following:

```json
{
  "enabled": true
}
```

### File Naming Example

```text
your-repo/pages/error_page.html
your-repo/pages/error_page.json
```
