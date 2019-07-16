---
title: Connect your app to GitHub
connection: Github
image: /media/connections/github.png
seo_alias: github
index: 7
description: How to add GitHub login to your app and access their API
toc: true
topics:
  - connections
  - social
  - github
contentType: how-to
useCase:
    - customize-connections
    - add-idp
---
# Connect your app to GitHub

To configure a GitHub connection, you will need to register Auth0 with GitHub.

This doc refers to the steps to connect your application. If you are looking to manage authentication in your application, see [Next Steps](#next-steps) below.

## 1. Add a new application

To add a new application, log in to [GitHub](https://github.com/) and go to **OAuth applications** in your [developer settings](https://github.com/settings/developers). Next click [Register a new application](https://github.com/settings/applications/new).

![](/media/articles/connections/social/github/github-add-app-1.png)

## 2. Register your new app

On the [Register a new application](https://github.com/settings/applications/new) page fill out the form with the following information. Modify the parameters to reflect your application (e.g., the Homepage and Authorization <dfn data-key="callback">callback URLs</dfn>):

| Field | Description |
| - | - |
| Application name | The name of your app |
| Homepage URL | `https://${account.namespace}` |
| Application description | The description of your app users will see (Optional) |
| Authorization callback URL | `https://${account.namespace}/login/callback` |

<%= include('../_find-auth0-domain-redirects') %>

![](/media/articles/connections/social/github/github-add-app-2.png)

After completing the form click **Register application** to proceed.

## 3. Get your GitHub app's Client ID and Client Secret

Once the application is registered, your app's `Client ID` and `Client Secret` will be displayed on the following page:

![](/media/articles/connections/social/github/github-add-app-3.png)

## 4. Copy your GitHub app's Client ID and Client Secret

Go to your [Auth0 Dashboard](${manage_url}) and select **Connections > Social**, then choose **Github**. Copy the `Client ID` and `Client Secret` from the **Developer Applications** of your app on Github into the fields on this page on Auth0.

![](/media/articles/connections/social/github/github-add-app-4.png)

## 5. Access GitHub API

<%= include('../_call-api', {
  "idp": "GitHub"
}) %>

## Troubleshooting

If you are receiving `Access Denied` when calling the GitHub API, you probably have not requested the correct permissions for the user during login. For information on how to fix that, refer to [Add scopes/permissions to call Identity Provider's APIs](/connections/adding-scopes-for-an-external-idp).

<%= include('../_quickstart-links.md') %>

