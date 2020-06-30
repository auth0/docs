---
description: How to configure, use debug rules using the Real-time Webtask Logs extension.
topics:
  - extensions
  - realtime-webtask-logs
contentType:
  - how-to
useCase: extensibility-extensions
---

# Real-time Webtask Logs

_Real-time Webtask Logs_ is an extension that displays all logs in real-time for the custom code in your account. This includes all `console.log` output and exceptions. 

## Configuring the extension

To install and configure this extension, click on the _Real-time Webtask Logs_ box in the list of provided extensions on the [Extensions](${manage_url}/#/extensions) page of the [Management Portal](${manage_url}). The _Install Extension_ window pops open.

![](/media/articles/extensions/realtime-webtask-logs/extension-mgmt-realtime-logs.png)

Click the _Install_ button.

## Using your installed extension

 To view your installed extension, navigate to the [Extensions](${manage_url}/#/extensions) page of the [Management Portal](${manage_url}), click on the _Installed Extensions_ link, and select the _Real-time Webtask Logs_ line. You can view the logs in full screen by selecting the _FULL SCREEN MODE_ button. Press `Escape` to exit full screen mode. 

![](/media/articles/extensions/realtime-webtask-logs/view-realtime-logs.png)

To clear the logs and start fresh select the red _CLEAR CONSOLE_ button at the bottom right.

## Secure logging

Because the Webtask Logs extension uses the users request, logging sensitive information is a concern of which you should be mindful.

For example, your custom database scripts work with the `user` object extensively. The `user` object may contain sensitive information, and logging the complete object may lead to its disclosure to the Webtask Logs extension.

Obviously, Auth0 strongly discourages such practices. These actions could lead to the disclosure of your users' sensitive information. **We caution you to be aware of the objects that you log and to ensure sensitive information is not logged**

## Debugging rules

The _Real-time Webtask Logs_ extension can be used to debug any [Rules](/rules) in your implementation. This includes all `console.log` output and exceptions. Let's follow a simple _hello world_ example.

Navigate to the [Rules](${manage_url}/#/rules) page of the [Management Portal](${manage_url}). Click the [Create Rule](${manage_url}/#/rules/new) button. Select the _empty rule_ button and paste the code below or modify it as you like.

```javascript
function (user, context, callback) {
  user.hello = 'world';
  console.log('===> set "hello" for ' + user.name);
  callback(null, user, context);
}
```

![](/media/articles/extensions/realtime-webtask-logs/create-new-rule.png)

You are now ready to run this rule. Before you do so, open a new tab and navigate to the [Extensions](${manage_url}/#/extensions) page of the [Management Portal](${manage_url}), click on the _Installed Extensions_ link, and select the _Real-time Webtask Logs_ line. You are now viewing logs real-time and are ready to try your rule. Go back to your Rules tab and click _TRY THIS RULE_. Then head back to your _Real-time Webtask Logs_ tab to see the results.

![](/media/articles/extensions/realtime-webtask-logs/view-rules-example.png)

## Additional Information
- [Rules debugging](/rules#debugging)
- [Real-time Auth0 Webtask Logs GitHub repository](https://github.com/auth0/auth0-extension-realtime-logs)
