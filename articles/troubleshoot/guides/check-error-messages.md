---
title: Check Error Messages
description: 
topics:
  - error-messages
contentType: how-to
useCase: troubleshooting
---

# Check Error Messages

Check for error messages displayed in any of the following locations:

* Displayed in browser
* Displayed in developer tools network tab
* Displayed in developer tools console tab
* Response (HTML) error showed in a page
* Response from an Authorization Server

### Check the login screen

The Lock login widget shows error messages for certain types of issues, such as an incorrect username or password.

### Check the error page

Check the **More Information** link if you're using Auth0's standard error page.

### Check the logs

Check your Logs on the Auth0 dashboard for useful information. Note that some categories of errors are note added to the logs.

For example, if an error occurs at a remote Identity Provider, where authentication doesn’t complete and the user is never returned to Auth0, there won’t be any entry in Logs. However, many errors do result in an error message shown

### Check the real-time webtask logs error console

You can put `console.log()` statements into Rules, Hooks, Custom DB scripts, and Webtasks. The output from those statements is viewable in the Realtime Web Log. If you install the Real-time Webtask Logs extension, you can initiate a view of this log console from the **Debug** buttons underneath the Rules, Hooks, and custom DB script editor windows, or from the webtask console for webtasks.

## Check for common errors

* Are your client application’s callback URL(s) registered in Auth0 client settings?
* If you are making cross-origin calls, is the origin in client settings? 
* In a callback URL, only the subdomain can contain a wildcard.
* In the Allowed Origin field no wildcards are allowed at all.
* Check if you are getting a message on the list of common authentication errors

<%= include('../_includes/_log_events_link') %>

## Keep reading

* 