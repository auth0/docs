---
description: The Bitbucket Deployments extension allows you to deploy Rules and Database Connection scripts from Bitbucket to Auth0.
---

# Bitbucket Deployments

The **Bitbucket Deployments** extension allows you to deploy [Rules](/rules) and Database Connection scripts from Bitbucket to Auth0. You can configure a Bitbucket repository, keep all of your Rules and Database Connection scripts there, and have them automatically deployed to Auth0 whenever you push changes to your repository.

**NOTE:** This extension is currently available only for Auth0 instances hosted on the public cloud. Extensions are not yet supported in the [Appliance](/appliance).

## Configure the Extension

To install and configure this extension, click on the **Bitbucket Deployments** box in the list of provided extensions on the [Extensions](${uiURL}/#/extensions) page of the Auth0 Management Dashboard. The **Install Extension** window will open.

![](/media/articles/extensions/bitbucket-deploy/configure-extension.png)

Set the following configuration variables:

* **BITBUCKET_REPOSITORY**: the repository from which you want to deploy your Rules and Database Connection scripts (this can be either a public or private repository);
* **BITBUCKET_BRANCH**: the branch the extension will monitor for changes;
* **BITBUCKET_USER**: the username used to access the Bitbucket account;
* **BITBUCKET_PASSWORD**: the password associated with the username used to access the Bitbucket account;
* **SLACK_INCOMING_WEBHOOK**: the Webhook URL for Slack used to notify you of successful and failed deployments.

Once you have provided this information, click **Install**.

Navigate to the [Extensions](${uiURL}/#/extensions) page and click on the **Installed Extensions** tab.

![](/media/articles/extensions/bitbucket-deploy/webhook-setup.png)

Click on the row for the **Bitbucket Deployments** extension. The first time you click on your installed extension, you will be asked to grant it to access your Bitbucket account. Once you agree, you will be directed to the **Bitbucket Integration** page.

The **Configuration** page will display the **Payload URL** you will need to create a [webhook](https://confluence.atlassian.com/bitbucket/manage-webhooks-735643732.html) to your Bitbucket repository pointing to the extension.

![](/media/articles/extensions/bitbucket-deploy/config-parameters.png)

Copy and paste this value into the **Add Webhook** page for your Bitbucket Repository.

![](/media/articles/extensions/bitbucket-deploy/webhook-setup.png)

**NOTE**: You can find details on how to configure a webhook at [Creating Webhooks](https://confluence.atlassian.com/bitbucket/manage-webhooks-735643732.html#Managewebhooks-create_webhookCreatingwebhooks) on Bitbucket.

## Deployment

Once you have set up the webhook in Bitbucket using the provided information, you are ready to start committing to your repository.

With each commit you push to your configured Bitbucket repository, the webhook will call the extension to initiate a deployment if changes were made to the `rules` and/or the `database-connection` folders.

The **Deploy** button on the **Deployments** tab of the extension allows you to manually deploy the Rules and Database Connection scripts that you already have in your Bitbucket repository. This is useful if your repository already contains items that you want to deploy once you have set up the extension or if you have accidentally deleted some scripts in Auth0 and need to redeploy the latest version of your repository.

::: panel-warning Full Deployment
To maintain a consistent state, the extension will always do a full deployment of the contents of these folders. Any rules or database connection scripts that exist in Auth0 but not in your GitHub repository will be **deleted**.
:::

### Deploy Database Connection Scripts

To deploy Database Connection scripts, you must first create a directory under `database-connections`. The name of the directory must match **exactly** the name of your [database connection](${uiURL}/#/connections/database) in Auth0. You can create as many directories as you have Database Connections.

Under the created directory, create one file for each script you want to use. The allowed scripts are:

- `get_user.js`
- `create.js`
- `verify.js`
- `login.js`
- `change_password.js`
- `delete.js`

For a generic Custom Database Connection, only the `login.js` script is required. If you enable the migration feature, you will also need to provide the `get_user.js` script.

You can find examples in [the Auth0 Samples repository](https://github.com/auth0-samples/github-source-control-integration/tree/master/database-connections/my-custom-db). While the samples were authored for GitHub, it will work for a Bitbucket integration as well.

### Deploy Rules

To deploy a rule, you must first create a JavaScript file under the `rules` directory of your Bitbucket repository. Each Rule must be in its own `.js` file.

For example, if you create the file `rules/set-country.js`, the extension will create a Rule in Auth0 with the name `set-country`.

**NOTE**: If you plan to use source control integration for an existing account, first rename your Rules in Auth0 to match the name of the files you will be deploying to this directory.

You can control the Rule order, status (`enabled`/`disabled`) and stage (for now, only `login_success` is available) by creating a JSON file with the same name as your JavaScript file. For this example, you would create a file named `rules/set-country.json`.

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

You can find a `login_success` example in [the Auth0 Samples repository](https://github.com/auth0-samples/github-source-control-integration/tree/master/rules). While the sample was authored for GitHub, it will work for a Bitbucket integration as well.

#### Set Rule Order

To avoid conflicts, you are cannot set multiple Rules of the same order. However, you can create a JSON file for each rule, and within each file, assign a value for `order`. We suggest using number values that allow for reordering with less risk for conflict. For example, assign a value of `10` to the first Rule and `20` to the second Rule, rather than using values of `1` and `2`, respectively).

#### Set the Stage

After you deploy a Rule, you cannot change its stage, or the area where the Rule executes.

If you need the rule to execute in a different stage, you must create a new Rule with the updated stage and delete the original Rule.

Please note that you may have only a single Rule for the `user_registration` and `login_failure` stages.

## Track Deployments

To track your deployments, navigate to the [Extensions](${uiURL}/#/extensions) page, click on the row for the **Bitbucket Deployments** extension, and select the **Deployments** tab. You will see a list of all deployments.

![](/media/articles/extensions/bitbucket-deploy/deploy-tracking.png)

If a deployment fails, you can examine the details of the deployment to determine why. Details are also available for successful deployments.

![](/media/articles/extensions/bitbucket-deploy/logs.png)

If you configured a **Slack Incoming Webhook**, you will be notified on Slack anytime a deployment occurs.
