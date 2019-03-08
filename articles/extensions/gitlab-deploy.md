---
toc: true
description: The GitLab Deployments extension allows you to deploy Rules, Hosted Pages and Database Connection scripts from GitLab to Auth0.
topics:
  - extensions
  - gitlab-deployments
contentType:
  - how-to
useCase: extensibility-extensions
---

# GitLab Deployments

The **GitLab Deployments** extension allows you to deploy [rules](/rules), rules configs, connections, database connection scripts, clients, client grants, resource servers, hosted pages and email templates from GitLab to Auth0. You can configure a GitLab repository, keep all of your scripts there, and have them automatically deployed to Auth0 whenever you push changes to your repository.

## Configure the Auth0 extension

1. To install and configure this extension, click on the **GitLab Deployments** box in the list of provided extensions on the [Extensions](${manage_url}/#/extensions) page of the Auth0 Management Dashboard. The **Install Extension** window will open.

![Install extension popup window](/media/articles/extensions/gitlab-deploy/install-extension.png)

2. Set the following configuration variables:

* **REPOSITORY**: The name of your GitLab repository.
* **BRANCH**: The branch of your GitLab repository your extension should monitor.
* **URL**: The URL of your GitLab instance, in case of gitlab.com use `https://gitlab.com`
* **TOKEN**: The personal Access Token to your GitLab repository for this account. For details on how to configure one refer to [Configure a GitLab Token](configure-a-gitlab-token).
* **BASE_DIR**: The base directory, where all your tenant settings are stored. If you want to keep your tenant settings under `org/repo/tenant/production`, `org/repo` goes to the `REPOSITORY` and `tenant/production` - to `BASE_DIR`
* **ENABLE_CIPHER**: Enables secrets encryption/decryption support
* **CIPHER_PASSWORD**: The password for encryption/decryption of secrets
* **SLACK_INCOMING_WEBHOOK**: The URL used to integrate with Slack to deliver notifications.

::: note
Some of the configuration variables were changed in version **2.7.0** of this extension. If you are updating the extension from a prior version, make sure that you update your configuration accordingly.
:::

3. Once you have provided this information, click **Install**.

### Configure a GitLab token

1. Log in to your [GitLab](https://about.gitlab.com/) account and navigate to [Profile Settings > Access Tokens](https://gitlab.com/profile/personal_access_tokens).

2. Create a new Access Token for Auth0. Make sure you copy the generated value and save it locally because you will not be able to access it again once you navigate away from this page.

::: panel-warning API access
Make sure that you create the token with the `api` permission in Gitlab settings (this grants complete read/write access to the API). If your Gitlab token does not contain the necessary permissions, you may receive a "rejecting request of a tenant under quarantine" message because there was some uncaught error in the extension causing the Webtask context to be quarantined. 
:::

![Generate a personal Access Token](/media/articles/extensions/gitlab-deploy/new-access-token.png)

3. Go back to the [Extensions](${manage_url}/#/extensions) page and set this value at the **Gitlab_Token** configuration variable.

## Authorize access

1. Navigate to the [Extensions](${manage_url}/#/extensions) page and click on the **Installed Extensions** tab.

![](/media/articles/extensions/gitlab-deploy/installed-extensions-view.png)

2. Click on the row for the **GitLab Deployments** extension. The first time you click on your installed extension, you will be asked to grant it to access your GitLab account.

![](/media/articles/extensions/gitlab-deploy/user-consent.png)

3. Once you agree, you will be directed to the **GitLab Integration** page.

![](/media/articles/extensions/gitlab-deploy/gitlab-integration-page.png)

4. Copy the **Payload URL** and **Secret** values. You will use them to configure the GitLab Webhook in the next step.

## Configure the GitLab Webhook

Once you have configured your Auth0 Extension, you will need to configure the GitLab Webhook to complete the integration.

1. In your GitLab repository, click on the gear (Settings) icon. In the menu that appears, click on **Integrations**. This brings up the Webhook configuration area.

![](/media/articles/extensions/gitlab-deploy/gitlab-settings-menu.png)

2. Set the following configuration variables:

* **URL**: Set the value of the **Payload URL** from the previous step.
* **Secret Token**: Set the value of the **Secret** from the previous step.
* **Trigger**: Enable the actions that should trigger the URL.
* **Enable SSL verification**: Check to enable SSL verification.

![](/media/articles/extensions/gitlab-deploy/gitlab-add-webhook.png)

3. Scroll down, and click **Add Webhook** to save your changes.

## Deployment

Once you have set up the webhook in GitLab using the provided information, you are ready to start committing to your repository.

With each commit you push to your configured GitLab repository, the webhook will call the extension to initiate a deployment if changes were made to one of these folders:
- `clients`
- `grants`
- `emails`
- `resource-servers`
- `connections`
- `database-connections`
- `rules-configs`
- `rules`
- `pages`

The **Deploy** button on the **Deployments** tab of the extension allows you to manually deploy the Rules, Pages, and Database Connection scripts that you already have in your GitLab repository. This is useful if your repository already contains items that you want to deploy once you have set up the extension or if you have accidentally deleted some scripts in Auth0 and need to redeploy the latest version of your repository.

::: panel-warning Full Deployment
To maintain a consistent state, the extension will always do a full deployment of the contents of these folders. **Any rules, pages or database connection scripts that exist in Auth0 but not in your GitHub repository will be deleted**.
:::

### Deploy Database Connection scripts

1. To deploy Database Connection scripts, you must first create a directory under `database-connections`. The name of the directory must match **exactly** the name of your [database connection](${manage_url}/#/connections/database) in Auth0. You can create as many directories as you have Database Connections.

2. Under the created directory, create one file for each script you want to use. The allowed scripts are:

- `get_user.js`
- `create.js`
- `verify.js`
- `login.js`
- `change_password.js`
- `delete.js`

For a generic Custom Database Connection, only the `login.js` script is required. If you enable the migration feature, you will also need to provide the `get_user.js` script.

You can find examples in [the Auth0 Samples repository](https://github.com/auth0-samples/github-source-control-integration/tree/master/database-connections/my-custom-db). While the samples were authored for GitHub, it will work for a GitLab integration as well.

### Deploy Database Connection settings

To deploy Database Connection settings, you must create `database-connections/[connection-name]/settings.json`. 

_This will work only for Auth0 connections (1strategy === auth01), for non-Auth0 connections use `connections`._

See [Management API v2 Docs](https://auth0.com/docs/api/management/v2#!/Connections/patch_connections_by_id) for more info on allowed attributes for Connections.



### Deploy Connections

To deploy a connection, you must create a JSON file under the `connections` directory of your GitLab repository. Example:

__facebook.json__
```json
{
  "name": "facebook",
  "strategy": "facebook",
  "enabled_clients": [
    "my-client"
  ],
  "options": {}
}
```

_This will work only for non-Auth0 connections (`strategy !== auth0`); for Auth0 connections, use `database-connections`._

See [Management API v2 Docs](https://auth0.com/docs/api/management/v2#!/Connections/post_connections) for more info on allowed attributes for Connections.

### Deploy hosted pages

The supported hosted pages are:
- `error_page`
- `guardian_multifactor`
- `login`
- `password_reset`

To deploy a page, you must create an HTML file under the `pages` directory of your GitLab repository. For each HTML page, you need to create a JSON file (with the same name) that will be used to mark the page as enabled or disabled. For example, to deploy an `error_page`, you would create two files:

```text
your-gitlab-repo/pages/error_page.html
your-gitlab-repo/pages/error_page.json
```

To enable the page, the `error_page.json` would contain the following:

```json
{
  "enabled": true
}
```

### Deploy rules

To deploy a rule, you must first create a JavaScript file under the `rules` directory of your GitLab repository. Each Rule must be in its own JavaScript file.

For example, if you create the file `rules/set-country.js`, the extension will create a Rule in Auth0 with the name `set-country`.

::: note
If you plan to use source control integration for an existing account, first rename your Rules in Auth0 to match the name of the files you will be deploying to this directory.
:::

You can mark rules as manual. In that case, the source control extension will not delete or update them. To mark a rule navigate to the *Rules Configuration* tab of the **GitLab Integration** page. Toggle the **Manual Rule** switch for the rules you want to mark as manual. Click **Update Manual Rules** to save your changes.

![Mark rules as manual](/media/articles/extensions/gitlab-deploy/manual-rule.png)

You can also control the Rule order and status (`enabled`/`disabled`) by creating a JSON file with the same name as your JavaScript file. For this example, you would create a file named `rules/set-country.json`.

__set-country.js__
```javascript
function (user, context, callback) {
  if (context.request.geoip) {
    user.country = context.request.geoip.country_name;
  }
  callback(null, user, context);
}
```

__set-country.json__
```json
{
  "enabled": false,
  "order": 15,
  "stage": "login_success"
}
```

You can find a `login_success` example in [the Auth0 Samples repository](https://github.com/auth0-samples/github-source-control-integration/tree/master/rules). While the sample was authored for GitHub, it will work for a GitLab integration as well.

#### Set rule order

To avoid conflicts, you cannot set multiple Rules of the same order. However, you can create a JSON file for each rule, and within each file, assign a value for `order`. We suggest using number values that allow for reordering with less risk of conflict. For example, assign a value of `10` to the first Rule and `20` to the second Rule, rather than using values of `1` and `2`, respectively).

#### Set the stage

After you deploy a Rule, you cannot change its stage or the area where the Rule executes.

If you need the rule to execute in a different stage, you must create a new Rule with the updated stage and delete the original Rule.

::: note
You may have only a single Rule for the `user_registration` and `login_failure` stages.
:::

### Deploy Rules Configs

To deploy a rule config, you must create a JSON file under the `rules-configs` directory of your GitLab repository. Example:

__secret_number.json__
```json
{
  "key": "secret_number",
  "value": 42
}
```

### Deploy Clients

To deploy a client, you must create a JSON file under the `clients` directory of your GitLab repository. Example:

__my-client.json__
```json
{
  "name": "my-client"
}
```

See [Management API v2 Docs](https://auth0.com/docs/api/management/v2#!/Clients/post_clients) for more info on allowed attributes for Clients and Client Grants.

### Deploy Clients Grants

You can specify the client grants for each client by creating a JSON file in the `grants` directory.

__my-client-api.json__
```json
{
  "client_id": "my-client",
  "audience": "https://myapp.com/api/v1",
    "scope": [
      "read:users"
    ]
}
```

### Deploy Resource Servers

To deploy a resource server, you must create a JSON file under the `resource-servers` directory of your GitLab repository. Example:

__my-api.json__
```json
{
  "name": "my-api",
  "identifier": "https://myapp.com/api/v1",
  "scopes": [
    {
      "value": "read:users",
      "description": "Allows getting user information"
    }
  ]
}
```

See [Management API v2 Docs](https://auth0.com/docs/api/management/v2#!/Resource_Servers/post_resource_servers) for more info on allowed attributes for Resource Servers.

### Deploy Email Provider

To deploy an email provider, you must create `provider.json` file under the `emails` directory of your GitLab repository. Example:

__provider.json__
```json
{
    "name": "smtp",
    "enabled": true,
    "credentials": {
        "smtp_host": "smtp.server.com",
        "smtp_port": 25,
        "smtp_user": "smtp_user",
        "smtp_pass": "smtp_secret_password"
    }
}
```

See [Management API v2 Docs](https://auth0.com/docs/api/management/v2#!/Emails/patch_provider) for more info on allowed attributes for Email Provider.

### Deploy Email Templates

The supported email templates are:
- `verify_email`
- `reset_email`
- `welcome_email`
- `blocked_account`
- `stolen_credentials`
- `enrollment_email`
- `mfa_oob_code`

To deploy an email template, you must create an HTML file under the `emails` directory of your GitLab repository. For each HTML file, you need to create a JSON file (with the same name) with additional options for that template. For example, to deploy a `blocked_account` template, you would create two files:

```text
your-gitlab-repo/emails/blocked_account.html
your-gitlab-repo/emails/blocked_account.json
```

__blocked_account.json__
```json
{
    "template": "blocked_account",
    "from": "",
    "subject": "",
    "resultUrl": "",
    "syntax": "liquid",
    "body": "./blocked_account.html",
    "urlLifetimeInSeconds": 432000,
    "enabled": true
}
```

## Encrypt Secrets

Beginning with version **2.8.0**, you can encrypt sensitive data (e.g., Rules configurations) so that you can store your files in public repositorieis.

To encrypt your data, log in to your extension and go to the **Secrets Encryption Tool** (you should have enabled the cipher in the extension's configuration settings).

![](/media/articles/extensions/gitlab-deploy/encryption.png)

Copy `Encrypted Secret` to any string field that should remain private as shown:

__rules-configs/biggest_secret.json__
```json
{
  "key": "biggest_secret",
  "value": "nobody should know that [!cipher]0dcd9c0696b1feb7878bd4d8360db09e8885319046955d4a6ae1cd6135e5f58cce654f15b136eacc06981c0c7a4bb32f3a5c19-2c84a546cb503666382f87d87af82cb1657dab51d1583b40[rehpic!]"
}
```

The extension will decrypt all encrypted secrets automatically.

## Track deployments

To track your deployments, navigate to the [Extensions](${manage_url}/#/extensions) page, click on the row for the **GitLab Deployments** extension, and select the **Deployments** tab. You will see a list of all deployments.

![](/media/articles/extensions/gitlab-deploy/gitlab-deployments-tab.png)

If a deployment fails, you can examine the details of the deployment to determine why. Details are also available for successful deployments.

![](/media/articles/extensions/gitlab-deploy/failed-deployment-log.png)

If you configured a **Slack Incoming Webhook**, you will be notified on Slack anytime a deployment occurs.
