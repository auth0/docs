# GitHub Deployments

The _GitHub Deployments_ extension allows you to deploy [rules](/rules) and database connections from [GitHub](https://github.com) to Auth0. Now you can configure a GitHub repository, keep all your rules and database connection scripts there, and have them automatically deployed to Auth0 each time you push into your repository.

__NOTE__: This extension is currently available only for the public cloud, as extensions are not yet supported in the [appliance](/appliance).


## Configure the extension

To install and configure this extension, click on the _GitHub Deployments_ box in the list of provided extensions on the [Extensions](${uiURL}/#/extensions) page of the [dashboard](${uiURL}). The __Install Extension__ window pops open.

![](/media/articles/extensions/github-deploy/install-extension.png)

At this point you should set the following configuration variables:

- **GITHUB_REPOSITORY**: The repository from which you want to deploy rules and database scripts. It can be either public or private. 
- **GITHUB_BRANCH**: The branch that the extension should monitor for commits.
- **GITHUB_TOKEN**: Your [personal access token](https://help.github.com/articles/creating-an-access-token-for-command-line-use/#creating-a-token) for GitHub.
- **SLACK_INCOMING_WEBHOOK_URL**: The Webhook URL for Slack, used in order to get Slack notifications on successful and failed deployments. Setting this value is optional.

Once you have provided this information, click the *Install* button to finish installing the extension.

Now you have to configure the extension. Navigate to the [Extensions](${uiURL}/#/extensions) page and click on the __Installed Extensions__ tab. 

Click on the row displayed for __GitHub Deployments__ extension. The first time you click on your installed extension you will be asked to authorize it to access your GitHub account. Once you agree you will be navigated to the __GitHub Integration__ configuration page.

![](/media/articles/extensions/github-deploy/configure-extension.png)

The first page is the __Configuration__ and it will explain how you can create a [webhook](https://help.github.com/articles/about-webhooks/) in your GitHub repository pointing to the extension. 

> You can find details on how to configure a webhook in [GitHub documentation](https://developer.github.com/webhooks/creating/).

You are now ready to start deploying.


## Start deploying

Once you setup the webhook using the displayed information you are ready to start committing to your repository. With each commit you make in your configured GitHub repository, if changes were made in the `rules` or `database-connection` folders the webhook will call the extension to start the deployment. Note that we always do a full redeploy of all contents to make sure we keep a consistent state.

The __Deploy__ button let's you manually deploy the rules and database connection scrips you already have in your GitHub repository. This is useful if you already have a repository filled with scripts and you want to deploy them once you setup the extension. It can also come in handy in case you accidentally deleted some things in Auth0 and you want to redeploy the latest version of your repository again.

::: panel-warning Full redeploy
The full redeployment means that any rules or database connection scripts that exist in Auth0 but don't exist in your GitHub repository will be deleted, because your GitHub repository becomes the single source of truth.
:::


### Deploy database connection scripts

In order to start deploying database connection scripts, first you have to create a directory under `database-connections`. The name of the directory should match __exactly__ the name of your [database connection](${uiURL}/#/connections/database) in Auth0. Of course you can create as many directories as your database connections.

Under the created directory, create one file for every script you want to use. The allowed scripts are:

- get_user.js
- create.js
- verify.js
- login.js
- change_password.js
- delete.js

Only the `login.js` script is required in a custom database connection. 

If you enabled the migration feature, you'll also need to provide the `get_user.js` script.

You can find an example in [this GitHub repository](https://github.com/auth0-samples/github-source-control-integration/tree/master/database-connections/my-custom-db).


### Deploy rules

In order to deploy a rule, you have to create a JavaScript file under the `rules` directory of your GitHub repository. Each rule should be on its own `.js` file. 

For example, if you create the file `rules/set-country.js`, then the extension will create a rule in Auth0 with the name `set-country`. 

__NOTE__: If you plan to use Source Control integration for an existing account, make sure you rename your rules in Auth0 first to the same name of the files you'll deploy to this directory.

Moreover, you can control the rule order, status (`enabled`/`disabled`) and stage (`login_success`, `login_failure`, `user_registration`), by creating a JSON file next to your JavaScript file, using the same name. So for this example you would create a file named `rules/set-country.json`.

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

Having multiple rules with the same order is not allowed, so make sure you don't have any collisions. Also, keep in mind that for the `user_registration` and `login_failure` stage only a single rule is allowed.

You can find some examples in [this GitHub repository](https://github.com/auth0-samples/github-source-control-integration/tree/master/rules).


## Track deployments

You can track all of your deployments by navigating to your [extensions](${uiURL}/#/extensions) page of the [dashboard](${uiURL}):

![](/media/articles/extensions/github-deploy/deployments-overview.png)

If a deployment fails you can look at the details of the deployment and figure out why it failed:

![](/media/articles/extensions/github-deploy/deployment-log.png)

Finally, if you configured a Slack Incoming Webhook you'll be notified on Slack if a deployment succeeded or failed:

![](/media/articles/extensions/github-deploy/slack-messages.png)

That's it, you are done! Happy deploying!

