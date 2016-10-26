---
description: The Visual Studio Team Services Deployments extension allows you to deploy Rules, Hosted Pages and Database Connection scripts from Visual Studio Team Services to Auth0.
---

# Visual Studio Team Services Deployments

The **Visual Studio Team Services Deployments** extension allows you to deploy [Rules](/rules), Database Connection scripts and hosted pages from Visual Studio Team Services to Auth0. You can configure a Visual Studio Team Services project, keep all of your scripts there, and have them automatically deployed to Auth0 whenever you push changes to your project.

## Configure the Auth0 Extension

To install and configure this extension, click on the **Visual Studio Team Services Deployments** box in the list of provided extensions on the [Extensions](${manage_url}/#/extensions) page of the Auth0 Management Dashboard. The **Install Extension** window will open.

![Install extension popup window](/media/articles/extensions/visual-studio-ts/install-extension.png)

Set the following configuration variables:

* **TFS_TYPE**: The type of repository, choose from TFVC or Git
* **TFS_PROJECT**: The project from which you want to deploy rules and database scripts.
* **TFS_BRANCH**: The branch we should monitor for commits.
* **TFS_INSTANCE**: Your Visual Studio Team Services instance name (without .visualstudio.com).
* **TFS_COLLECTION**: Your visualstudio collection
* **TFS_USERNAME**: Your Visual Studio Team Services username
* **TFS_TOKEN**: Your personal access token for Visual Studio Team Services, for details on how to configure one refer to [Configure a Personal Access Token](configure-a-personal-access-token) below.
* **SLACK_INCOMING_WEBHOOK**: Webhook URL for Slack used to notify you of successful and failed deployments.

Once you have provided this information, click **Install**.

## Configure a Personal Access Token

1. Sign in to either your Visual Studio Team Services account (https://{youraccount}.visualstudio.com) or your Team Foundation Server web portal (https://{server}:8080/tfs/).

2. From your home page, click on your profile in the top right corner of the page, then from the drop-down menu select **Security**.

![Profile drop down](/media/articles/extensions/visual-studio-ts/profile-menu.png)

3. This will bring up the **Personal access tokens** page, click **Add**.

![Add personal access token](/media/articles/extensions/visual-studio-ts/add-token.png)

4. Add a description for the new token, select the desired lifetime, and the account the token will be associated with. Then choose the scopes you wish to authorize and then click **Create Token**.

![Creating the access token](/media/articles/extensions/visual-studio-ts/create-token.png)

5. Once the token is created, you will need to copy right away as it is not saved. Use this value as your **TFS_TOKEN**.

![Copy access token](/media/articles/extensions/visual-studio-ts/copy-token.png)

## Authorize Access

Navigate to the [Extensions](${manage_url}/#/extensions) page and click on the **Installed Extensions** tab.

![Installed Extensions](/media/articles/extensions/visual-studio-ts/installed-extensions-view.png)

Click on the row for the **Visual Studio Team Services Deployments** extension. The first time you click on your installed extension, you will be asked to grant it to access your Visual Studio Deployments account.

![Auth0 Integration Page](/media/articles/extensions/visual-studio-ts/vs-integration-page.png)

Once you agree, you will be directed to the **Visual Studio Team Services Integration** page.

![Visual Studio Team Services Integration Page](/media/articles/extensions/visual-studio-ts/vsts-integration.png)

Copy the **Payload URL** and **HTTP headers** values. You will use them in order to configure the Visual Studio Team Services Webhook in the next step.

## Configure the Visual Studio Team Services Webhook

Once you have configured your Auth0 Extension, you will need to configure the the Visual Studio Team Services Webhookk to complete the integration.

In your Visual Studio Team Services account, go to **Overview** and click on the name the project being used for the integration, then click **Service Hooks**.

![Select Service Hooks](/media/articles/extensions/visual-studio-ts/service-hooks.png)

Then click the link **Create the first subscription for this project**. Then select **Web Hooks** from the menu.

![Select Web Hooks](/media/articles/extensions/visual-studio-ts/web-hooks.png)

Then click the **Next** button, choose the trigger for the event and the filters are optional. Then click **Next**.

![Configure Web Hook](/media/articles/extensions/visual-studio-ts/configure-web-hook.png)

The only required field **URL** which you should enter the **Payload URL** from the previous step. Enter any of the optional fields, then click **Finish**.

## Deployment

Once you have set up the webhook in Visual Studio Team Services using the provided information, you are ready to start committing to your project.

Your project should have a predefined structure:
- Rules are expected to be found under `rules` directory.
- Database connections are expected to be found under `database-connections` directory.
- Hosted pages are expected to be found under `pages` directory.

With each commit you push to your configured Visual Studio Team Services project, the webhook will call the extension to initiate a deployment if changes were made to these predefined directories.

The **Deploy** button on the **Deployments** tab of the extension allows you to manually deploy the Rules, Pages and Database Connection scripts that you already have in your 
With each commit you push to your configured Visual Studio Team Services project. This is useful if your project already contains items that you want to deploy once you have set up the extension or if you have accidentally deleted some scripts in Auth0 and need to redeploy the latest version of your project.

::: panel-warning Full Deployment
To maintain a consistent state, the extension will always do a full deployment of the contents of these folders. **Any rules, pages or database connection scripts that exist in Auth0 but not in your Visual Studio Team Services project will be deleted**.
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

You can find examples in [the Auth0 Samples repository](https://github.com/auth0-samples/github-source-control-integration/tree/master/database-connections/my-custom-db). While the samples were authored for GitHub, it will work for a Visual Studio Team Services integration as well.

### Deploy Hosted Pages

The supported hosted pages are:
- `error_page`
- `guardian_multifactor`
- `login`
- `password_reset`

To deploy a page, you must create an HTML file under the `pages` directory of your Visual Studio Team Services project. For each HTML page you need to create a JSON file (with the same name) that will be used to mark the page as enabled or disabled. For example, in order to deploy an `error_page`, you would create two files:

```text
your-project/pages/error_page.html
your-project/pages/error_page.json
```

To enable the page the `error_page.json` would contain the following:

```json
{
  "enabled": true
}
```
### Deploy Rules

To deploy a rule, you must first create a JavaScript file under the `rules` directory of your Visual Studio Team Services project. Each Rule must be in its own `.js` file.

For example, if you create the file `rules/set-country.js`, the extension will create a Rule in Auth0 with the name `set-country`.

**NOTE**: If you plan to use source control integration for an existing account, first rename your Rules in Auth0 to match the name of the files you will be deploying to this directory.

You can mark rules as manual. In that case, the source control extension will not delete or update them. To mark a rule navigate to the *Rules Configuration* tab of the **Visual Studio Team Services Integration** page. Toggle the **Manual Rule** switch for the rules you want to mark as manual. Click **Update Manual Rules** to save your changes.

![Mark rules as manual](/media/articles/extensions/visual-studio-ts/manual-rule.png)

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

You can find a `login_success` example in [the Auth0 Samples repository](https://github.com/auth0-samples/github-source-control-integration/tree/master/rules). While the sample was authored for GitHub, it will work for a Visual Studio Team Services integration as well.

#### Set Rule Order

To avoid conflicts, you are cannot set multiple Rules of the same order. However, you can create a JSON file for each rule, and within each file, assign a value for `order`. We suggest using number values that allow for reordering with less risk for conflict. For example, assign a value of `10` to the first Rule and `20` to the second Rule, rather than using values of `1` and `2`, respectively).

#### Set the Stage

After you deploy a Rule, you cannot change its stage, or the area where the Rule executes.

If you need the rule to execute in a different stage, you must create a new Rule with the updated stage and delete the original Rule.

Please note that you may have only a single Rule for the `user_registration` and `login_failure` stages.

## Track Deployments

To track your deployments, navigate to the [Extensions](${manage_url}/#/extensions) page, then **Installed Extensions** and click on the row for the **Visual Studio Team Services Deployments** extension, and select the **Deployments** tab. You will see a list of all deployments.

![](/media/articles/extensions/visual-studio-ts/deployments-tab.png)

If a deployment fails, you can examine the details of the deployment to determine why. Details are also available for successful deployments.

If you configured a **Slack Incoming Webhook**, you will be notified on Slack anytime a deployment occurs.

