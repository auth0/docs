---
title: Store Configuration for Rules
description: A list of the Node.js modules and libraries that are available when creating Rules.
toc: true
topics:
  - rules
  - extensibility
contentType: how-to
useCase: extensibility-rules
---

# Store Configuration for Rules

The global `configuration` object is available in Rules for storing commonly used values, such as URLs. Sensitive information, such as credentials or API keys, should be stored through the `configuration` object and kept out of your Rules code.

## Configure values

You can set configuration values in your [Rules Settings](${manage_url}/#/rules/) on the Dashboard.

To edit or change a configuration key's value, remove the existing configuration setting and replace it with the updated value.

![Rules Configuration](/media/articles/rules/rules-configuration.png)

::: note
You need to have created at least one Rule to see the configuration area, otherwise, the Rules demo shows instead.
:::

## Use the `configuration` object

Any configuration values you set can be accessed through the `configuration` object by key in your Rules code.

```js
var MY_API_KEY = configuration.MY_API_KEY;
```

The following example is a Rule for sending a Slack message when a new user has signed up. The [Slack Webhook](https://api.slack.com/incoming-webhooks) is a `configuration` value set with the key `SLACK_HOOK_URL`.

```js
function (user, context, callback) {
  // short-circuit if the user signed up already or is using a Refresh Token
  if (context.stats.loginsCount > 1 || context.protocol === 'oauth2-refresh-token') {
    return callback(null, user, context);
  }

  // get your slack's hook url from: https://slack.com/services/10525858050
  const SLACK_HOOK = configuration.SLACK_HOOK_URL;

  const slack = require('slack-notify')(SLACK_HOOK);
  const message = 'New User: ' + (user.name || user.email) + ' (' + user.email + ')';
  const channel = '#some_channel';

  slack.success({
    text: message,
    channel: channel
  });

  // don’t wait for the Slack API call to finish, return right away (the request will continue on the sandbox)`
  callback(null, user, context);
}
```
