# Real-time Webtask Logs

_Real-time Webtask Logs_ is an extension that displays all logs in real-time for all custom code in your account. This includes all `console.log` output and exceptions. 

## Configuring the Extension

To install and configure this extension, click on the _Real-time Webtask Logs_ box in the list of provided extensions on the [Extensions](${uiURL}/#/extensions) page of the [Management Portal](${uiURL}). The _Install Extension_ window pops open.

![](/media/articles/extensions/realtime-webtask-logs/extension-mgmt-realtime-logs.png)

Click the _Install_ button.

## Using Your Installed Extension

 To view your installed extension, navigate to the [Extensions](${uiURL}/#/extensions) page of the [Management Portal](${uiURL}), click on the _Installed Extensions_ link, and select the _Real-time Webtask Logs_ line. You can view the logs in full screen by selecting the _FULL SCREEN MODE_ button. Press `Escape` to exit full screen mode. 

![](/media/articles/extensions/realtime-webtask-logs/view-realtime-logs.png)

To clear the logs and start fresh select the the red _CLEAR CONSOLE_ button at the bottom right.

## Debugging Rules

The _Real-time Webtask Logs_ extension can be used to debug any [Rules](https://auth0.com/docs/rules) in your implementation. This includes all `console.log` output and exceptions. Let's follow a simple _hello world_ example.

Navigate to the [Rules](${uiURL}/#/rules) page of the [Management Portal](${uiURL}). Click the [Create Rule](${uiURL}/#/rules/new) button. Select the _empty rule_ button and paste the code below or modify it as you like.

```javascript
function (user, context, callback) {
  user.hello = 'world';
  console.log('===> set "hello" for ' + user.name);
  callback(null, user, context);
}
```

![](/media/articles/extensions/realtime-webtask-logs/create-new-rule.png)

You are now ready to run this rule. Before you do so, open a new tab and navigate to the [Extensions](${uiURL}/#/extensions) page of the [Management Portal](${uiURL}), click on the _Installed Extensions_ link, and select the _Real-time Webtask Logs_ line. You are now viewing logs real-time and are ready to try your rule. Go back to your Rules tab and click _TRY THIS RULE_. Then head back to your _Real-time Webtask Logs_ tab to see the results.

![](/media/articles/extensions/realtime-webtask-logs/view-rules-example.png)

That's it, you are done! 

## Additional Information
- [Rules debugging](/rules#debugging)
- [Real-time Auth0 Webtask Logs GitHub repository](https://github.com/auth0/auth0-extension-realtime-logs)
