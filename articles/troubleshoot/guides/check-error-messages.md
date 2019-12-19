---
title: Check Error Messages
description: Learn how to check for error message to troublshoot issues. 
topics:
  - error-messages
contentType: how-to
useCase: troubleshooting
---

# Check Error Messages

Check for error messages displayed in any of the following locations:

* Browsers
* Developer tools network tabs
* Developer tools console tabs
* HTML page responses
* Authorization Server responses

### Check login screen

The Lock login widget shows error messages for certain types of issues, such as an incorrect username or password.

### Check error page

Check the **More Information** link if you're using Auth0's standard error page.

### Check logs

Check your Logs on the Auth0 dashboard for useful information. 

:::
Some types of errors do not appear in the logs. For example, if an error occurs at a remote Identity Provider, where authentication doesn’t complete and the user is never returned to Auth0, there won’t be any entry in Logs. 
:::

### Check real-time webtask logs error console

You can put `console.log()` statements into Rules, Hooks, Custom DB scripts, and Webtasks. The output from those statements is viewable in the Realtime Web Log. If you install the Real-time Webtask Logs extension, you can initiate a view of this log console from the **Debug** buttons underneath the Rules, Hooks, and custom DB script editor windows, or from the webtask console for webtasks.

## Check for common errors

* Are your client application’s callback URL(s) registered in Auth0 client settings?
* If you are making cross-origin calls, is the origin in client settings? 
* In a callback URL, only the subdomain can contain a wildcard.
* In the Allowed Origin field no wildcards are allowed at all.
* Check if you are getting a message on the list of common authentication errors

<%= include('../_includes/_log_events_link') %>

## Keep reading

* [Standard Error Responses](/api/authentication#standard-error-responses)
* [Common Authentication Errors](/libraries/error-messages)
* [Errors with Code `invalid_token`](/errors/libraries/auth0-js/invalid-token)
* [Self Change Password Errors](/errors/dbconnections/self_change_password)
* [Deprecation Error Reference](/errors/deprecation-errors)
* [Auth0.js Error Codes and Descriptions](/libraries/auth0js/v9#error-codes-and-descriptions)