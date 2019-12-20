---
title: Verify Rules
description: Learn how to verify rules to troubleshoot issues. 
topics:
  - rules
contentType: how-to
useCase: troubleshooting
---

# Verify Rules

Failures in a rule can often cause authentication issues. Perform the following checks to see if rules could be behind your issue.

* Turn rules off and see if the issue still occurs.
* Check that your rules catch all possible errors that might be returned. Uncaught errors could cause failures.
* Check that your rules are calling the `callback` function only once for each logical branch in your code.
* Add `console.log()` statements to your rules to debug and check state. For example: `console.log(“output = “ + some_variable);`.
* Click **Debug Rule** in the Dashboard to view the output from your `console.log` statements.
* View the output in the Real-time Webtask Logs to get more information about your rules’ execution.

<%= include('../_includes/_log_events_link') %>

## Keep reading

* [Verify Connections](/troubleshoot/guides/verify-connections)
* [Verify Platform](/troubleshoot/guides/verify-platform)
* [Verify Domain](/troubleshoot/guides/verify-domain)
* [Check Auth0 Status](/monitoring/guides/check-status)
* [Check Supporting Services Status](/monitoring/guides/test-testall-endpoints)
* [Check External Services Status](/monitoring/guides/check-external-services)
* [Monitor Applications](/monitoring/guides/monitor-applications)
* [Monitor Using System Center Operations Manager](/monitoring/guides/monitor-using-SCOM)