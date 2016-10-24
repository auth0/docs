---
description: The GitLab Deployments extension allows you to deploy Rules, Hosted Pages and Database Connection scripts from GitLab to Auth0.
---

# GitLab Deployments

The **GitLab Deployments** extension allows you to deploy [Rules](/rules), Database Connection scripts and hosted pages from GitLab to Auth0. You can configure a GitLab repository, keep all of your scripts there, and have them automatically deployed to Auth0 whenever you push changes to your repository.

## Configure the Auth0 Extension

To install and configure this extension, click on the **GitLab Deployments** box in the list of provided extensions on the [Extensions](${manage_url}/#/extensions) page of the Auth0 Management Dashboard. The **Install Extension** window will open.

![Install extension popup window](/media/articles/extensions/gitlab-deploy/install-extension.png)

Set the following configuration variables:

* **GITLAB_REPOSITORY**: The name of your GitLab repository.
* **GITLAB_BRANCH**: The branch of your GitLab repository your extension should monitor.
* **GITLAB_TOKEN**: The personal access token to your GitLab repository for this account. For details on how to configure one refer to [Configure a GitLab Token](configure-a-gitlab-token).
* **SLACK_INCOMING_WEBHOOK**: The URL used to integrate with Slack to deliver notifications.

Once you have provided this information, click **Install**.

### Configure a GitLab Token

Log in to your [GitLab](https://about.gitlab.com/) account and navigate to [Profile Settings > Access Tokens](https://gitlab.auth0.com/profile/personal_access_tokens).

Create a new access token for Auth0. Make sure you copy the generated value and save it locally because you will not be able to access it again once you navigate away from this page.

![Generate a personal access token](/media/articles/extensions/gitlab-deploy/new-access-token.png)

Go back to the [Extensions](${manage_url}/#/extensions) page and set this value at the **Gitlab_Token** configuration variable.

## Authorize Access

Navigate to the [Extensions](${manage_url}/#/extensions) page and click on the **Installed Extensions** tab.

![](/media/articles/extensions/gitlab-deploy/installed-extensions-view.png)

Click on the row for the **GitLab Deployments** extension. The first time you click on your installed extension, you will be asked to grant it to access your GitLab account.

![](/media/articles/extensions/gitlab-deploy/user-consent.png)

Once you agree, you will be directed to the **GitLab Integration** page.

![](/media/articles/extensions/gitlab-deploy/gitlab-integration-page.png)

Copy the **Payload URL** and **Secret** values. You will use them in order to configure the GitLab Webhook in the next step.

## Configure the GitLab Webhook

Once you have configured your Auth0 Extension, you will need to configure the GitLab Webhook to complete the integration.

In your GitLab Repository, click on the gear icon near the top right of the page to open the menu. Click on **Webhooks**.

![](/media/articles/extensions/gitlab-deploy/gitlab-settings-menu.png)

Set the following configuration variables:

* **URL**: Set the value of the **Payload URL** from the previous step.
* **Secret Token**: Set the value of the **Secret** from the previous step.
* **Trigger**: Enable the actions that should trigger the URL.
* **Enable SSL verification**: Check to enable SSL verification.

![](/media/articles/extensions/gitlab-deploy/gitlab-add-webhook.png)

Click **Add Webhook** to save your changes.

## Deployment

Once you have set up the webhook in GitLab using the provided information, you are ready to start committing to your repository.

Your repository should have a predefined structure:
- Rules are expected to be found under `rules` directory.
- Database connections are expected to be found under `database-connections` directory.
- Hosted pages are expected to be found under `pages` directory.

With each commit you push to your configured GitLab repository, the webhook will call the extension to initiate a deployment if changes were made to these predefined directories.

The **Deploy** button on the **Deployments** tab of the extension allows you to manually deploy the Rules, Pages and Database Connection scripts that you already have in your GitLab repository. This is useful if your repository already contains items that you want to deploy once you have set up the extension or if you have accidentally deleted some scripts in Auth0 and need to redeploy the latest version of your repository.

::: panel-warning Full Deployment
To maintain a consistent state, the extension will always do a full deployment of the contents of these folders. **Any rules, pages or database connection scripts that exist in Auth0 but not in your GitHub repository will be deleted**.
:::

### Deploy Database Connection Scripts

To deploy Database Connection scripts, you must first create a directory under `database-connections`. The name of the directory must match **exactly** the name of your [database connection](${manage_url}/#/connections/database) in Auth0. You can create as many directories as you have Database Connections.

Under the created directory, create one file for each script you want to use. The allowed scripts are:

- `get_user.js`
- `create.js`
- `verify.js`
- `login.js`
- `change_password.js`
- `delete.js`

For a generic Custom Database Connection, only the `login.js` script is required. If you enable the migration feature, you will also need to provide the `get_user.js` script.

You can find examples in [the Auth0 Samples repository](https://github.com/auth0-samples/github-source-control-integration/tree/master/database-connections/my-custom-db). While the samples were authored for GitHub, it will work for a GitLab integration as well.

### Deploy Hosted Pages

The supported hosted pages are:
- `error_page`
- `guardian_multifactor`
- `login`
- `password_reset`

To deploy a page, you must create an HTML file under the `pages` directory of your GitLab repository. For each HTML page you need to create a JSON file (with the same name) that will be used to mark the page as enabled or disabled. For example, in order to deploy an `error_page`, you would create two files:

```text
your-gitlab-repo/pages/error_page.html
your-gitlab-repo/pages/error_page.json
```

To enable the page the `error_page.json` would contain the following:

```json
{
  "enabled": true
}
```

### Deploy Rules

To deploy a rule, you must first create a JavaScript file under the `rules` directory of your GitLab repository. Each Rule must be in its own `.js` file.

For example, if you create the file `rules/set-country.js`, the extension will create a Rule in Auth0 with the name `set-country`.

**NOTE**: If you plan to use source control integration for an existing account, first rename your Rules in Auth0 to match the name of the files you will be deploying to this directory.

You can mark rules as manual. In that case, the source control extension will not delete or update them. To mark a rule navigate to the *Rules Configuration* tab of the **GitLab Integration** page. Toggle the **Manual Rule** switch for the rules you want to mark as manual. Click **Update Manual Rules** to save your changes.

![Mark rules as manual](/media/articles/extensions/gitlab-deploy/manual-rule.png)

You can also control the Rule order, status (`enabled`/`disabled`) and stage (for now, only `login_success` is available) by creating a JSON file with the same name as your JavaScript file. For this example, you would create a file named `rules/set-country.json`.

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
```javascript
{
  "enabled": false,
  "order": 15,
  "stage": "login_success"
}
```

You can find a `login_success` example in [the Auth0 Samples repository](https://github.com/auth0-samples/github-source-control-integration/tree/master/rules). While the sample was authored for GitHub, it will work for a GitLab integration as well.

#### Set Rule Order

To avoid conflicts, you are cannot set multiple Rules of the same order. However, you can create a JSON file for each rule, and within each file, assign a value for `order`. We suggest using number values that allow for reordering with less risk for conflict. For example, assign a value of `10` to the first Rule and `20` to the second Rule, rather than using values of `1` and `2`, respectively).

#### Set the Stage

After you deploy a Rule, you cannot change its stage, or the area where the Rule executes.

If you need the rule to execute in a different stage, you must create a new Rule with the updated stage and delete the original Rule.

Please note that you may have only a single Rule for the `user_registration` and `login_failure` stages.

## Track Deployments

To track your deployments, navigate to the [Extensions](${manage_url}/#/extensions) page, click on the row for the **GitLab Deployments** extension, and select the **Deployments** tab. You will see a list of all deployments.

![](/media/articles/extensions/gitlab-deploy/gitlab-deployments-tab.png)

If a deployment fails, you can examine the details of the deployment to determine why. Details are also available for successful deployments.

![](/media/articles/extensions/gitlab-deploy/failed-deployment-log.png)

If you configured a **Slack Incoming Webhook**, you will be notified on Slack anytime a deployment occurs.
