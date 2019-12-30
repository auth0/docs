---
title: Verify Platform
description: Learn how to verify your platform to troubleshoot issues.
topics:
  - platform
  - language
  - browser
contentType: how-to
useCase: troubleshooting
---

# Verify Platform

Ensure that you are on current versions of your technology stack. If you're using an older version of a programming language or library consider updating to the current version.

* Check the [Auth0 support matrix](/support/matrix) to see if the language or library versions you're using is supported.
* If there's a problem in one environment (such as development) but not another (such as production), compare the versions of the technology stack across the two environments.
* If not, upgrade your technology stack and browser to the latest versions and test again before creating a support request.

## Check the scope of the issue

Testing on different browsers, platforms, locations, and users can help narrow down the source of a problem when it occurs. Perform the following tests and review the [logs in your Auth0 dashboard](${manage_url}/#/logs) after each test for more information.

<%= include('../_includes/_log_events_link') %>

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

## Issues that affect only one or a few users

* [Check the user's profile](/troubleshoot/guides/verify-user-profiles), browser, or device for any issues.
* Check to see if it happens in all browsers for the affected users (indicating a data issue) or just certain types of browsers (indicating a browser-specific issue).
* Check to see if the browser has enabled JavaScript and cookies.
* Check that the caps lock key is disabled.
* If the user is using a mobile device, check to see if there's any software that might impact authentication and/or authorization (such as not running some type of required software).
* Check to see if the user can access some of the application's key URLs, such as the identity provider's <dfn data-key="single-sign-on">Single Sign-on (SSO)</dfn> URL (indicating a network connectivity issue).

## Issues that occur after go-live (worked before, then stopped working)

* Check if any recent changes to your application or any APIs you call?
* Check if any recent network changes (load balancer, firewall, proxy config changes).
* Check if any recent infrastructure changes (e.g. credentials for LDAP or DB servers?)
* Check for any patches or updates to applications, infrastructure, or technology stacks.
* Check that all your servers are running NTP and have accurate time sync
* Check if any of your certificates have expired.
* Check with owners of any remote identity providers if anything changed.
    - Check network connectivity to any remote identity providers.
* Check notifications in Auth0 dashboard/migrations - any changes you overlooked?
* Check Auth0 change log - any recent configuration changes related to your issue?
* Check if any component in the technology stack has been updated or patched recently?

## Keep reading

* [Check Auth0 Status](/monitoring/guides/check-status)
* [Verify Connections](/troubleshoot/guides/verify-connections)
* [Verify Domain](/troubleshoot/guides/verify-domain)
* [Verify Rules](/troubleshoot/guides/verify-rules)
* [Check Supporting Services Status](/monitoring/guides/test-testall-endpoints)
* [Check External Services Status](/monitoring/guides/check-external-services)
* [Monitor Applications](/monitoring/guides/monitor-applications)
* [Monitor Using System Center Operations Manager](/monitoring/guides/monitor-using-SCOM)