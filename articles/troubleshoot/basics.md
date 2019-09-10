---
description: Running into an issue? Here are the things you should check to narrow down and solve common issues in Auth0.
toc: true
topics:
  - troubleshooting
  - application
  - authentication
  - errors
contentType:
  - how-to
useCase:
  - troubleshooting
---

# Troubleshooting Basics

In this guide you'll find tips for troubleshooting common issues. If these tips don't outright solve your issue, they can at least narrow down a possible cause and help Auth0 support resolve your issue faster.

## Check Auth0 service availability

Did something stop working that previously worked? Check the Auth0 status page for issues or interruptions to the Auth0 service. If there's an outage, you can determine if it's related to your issue.

* Check the [Auth0 Status](https://status.auth0.com) for notices of any outages.
* If there's an outage listed on the status page, you do not need to file a ticket. Auth0 is already working on the issue.
* Subscribe to the status page to get alerted if there is any outage with the Auth0 service.

## Check your network status

If something isn’t working, first make sure network connectivity isn’t the cause. Here are some quick checks to help you identify if there are any network connectivity issues.

* Can you reach any other, non-Auth0 sites?
    - If not, you may have a general network outage
* Can you reach the [Auth0 website](https://auth0.com)?
* Can you reach the [Auth0 dashboard](${manage_url})?
* Can you reach the authorize URL which invokes a login page? 
    - `https://${account.namespace}/authorize?client_id=${account.clientId}&response_type=token`
    - Note: Login won’t work, but if the login page appears it tells you connectivity exists.
* If any of the above checks fail, try them from a different location or have another person in a different location do the checks. This will help you determine if the issue is in your network or not.

## Check your language, browser, and platform versions

Technology is constantly evolving. It’s a good idea to make sure you are on current versions of your technology stack. If you're using an older version of a programming language or library consider updating to the current version.

* Check the [Auth0 support matrix](/support/matrix) to see if the language or library versions you're using is supported.
* If there's a problem in one environment (such as development) but not another (such as production), compare the versions of the technology stack across the two environments.
* If not, upgrade your technology stack and browser to the latest versions and test again before creating a support request.

## Check the scope of the issue

Testing on different browsers, platforms, locations, and users can help narrow down the source of a problem when it occurs. Perform the following tests and review the [logs in your Auth0 dashboard](${manage_url}/#/logs) after each test for more information.

### Test with different browsers

* Does the issue happen with all browsers or just some?
* Test in a new incognito or private browser session (no previous state).
* Upgrade to the latest browser version and re-test.
* Turn off browser plugins and re-test to see if a plug-in contributes to the issue.

### Test with different users

* Does the issue occur for all users or just some?  
* If some, is there a pattern? Such as location, connection, or <dfn data-key="role">role</dfn>?

### Test with different connections (if possible)

* Does the issue happen with all connections or just one?

### Test with different client applications (if you have more than one)

* Does the issue happen with all clients or just one?

### Test across different environments

* Try the development, staging, and production environments of your application(s).
* Try across different Auth0 tenants to see if any differences.

## Check if the issue is consistent or intermittent

* If the issue is consistent, note the steps to reliably duplicate the issue.
* If the issue intermittent, note any pattern that might cause it.
* Is this an issue with a new setup, or did it work before and is now broken?  
    - If it just broke, what changes were made? 
    - Does undoing the changes fix the issue?

## Check for error messages

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

## Check if the connection works

An authentication transaction often has several parts. Auth0 provides methods so you can try individual parts of the transaction.  This can help you find the possible source of the problem.

Most identity provider connections have a TRY button to see if the connection is working. If that fails, you can debug the connection without involving the rest of the application. If the connection works, you can start debugging the application.

* Use the **TRY** button on a connection to test just the connection.  
* If the test with the **TRY** button fails, you know it is not an issue with your application but rather something with the connection configuration or the connection provider.
* Check the response from the test with the **TRY** button to see if the response contains a useful error message or other information.
* Try logging into the same service through a different path.
* If the same issue occurs you’ll know it’s some sort of issue with the account
* If a test with the **TRY** button fails for a custom DB connection, it is frequently caused by an issue in the custom DB scripts. Putting console.log statements into them and viewing output in the Console Log can help debug them.

## Check if your external service dependencies are working

If your authentication uses external services, like social identity providers, and it suddenly stops working, make sure the external service is working.
If a connection is not working, even with the **TRY** button, check the connection.

## Check if rules cause the issue

Failures in a rule can often cause authentication issues. Perform the following checks to see if rules could be behind your issue.

* Turn rules off (if possible) and see if the issue still occurs.
* Check that your rules catch all possible errors that might be returned. Uncaught errors will cause failures.
* Check that your rules are calling the callback function exactly once for each logical branch in your code.
* Add `console.log()` statements to your rules to debug and check state.
    - For example: `console.log(“output = “ + some_variable);`
* Use the **Debug Rule** button to view the output from your `console.log` statements.
* View the output in the Real-time Webtask Logs as you test, to get more information about your rules’ execution.

## Generate a HAR file

An HTTP Archive (HAR) file shows the sequence of redirects that happen during a login transaction. It's an excellent tool for debugging authentication issues, as it can identify where things get stuck.

Check out [Troubleshooting With HAR Files](/support/troubleshooting-with-har-files) for instructions on generating and analyzing HAR files.

## Keep reading

* [Monitoring Auth0 Implementations](/monitoring)
* [Check Auth0 Status](/monitoring/guides/check-status)
* [Check External Services Status](/monitoring/guides/check-external-services)