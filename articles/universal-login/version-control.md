---
description: How to back up your Universal Login pages using the Auth0 version control extensions
topics:
  - version-control
  - hosted-pages
contentType: how-to
useCase: customize-hosted-pages
---
# How to Use Version Control to Manage Your Universal Login Pages

You can use version control software to manage the source code of your pages.
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

<!-- markdownlint-disable MD001 -->
### File Naming Example
<!-- markdownlint-enable MD001 -->

```text
your-repo/pages/error_page.html
your-repo/pages/error_page.json
```
