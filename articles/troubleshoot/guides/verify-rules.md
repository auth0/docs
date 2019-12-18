---
title: Verify Rules
description: 
topics:
  - rules
contentType: how-to
useCase: troubleshooting
---

# Verify Rules

Failures in a rule can often cause authentication issues. Perform the following checks to see if rules could be behind your issue.

1. Turn rules off and see if the issue still occurs.
2. Check that your rules catch all possible errors that might be returned. Uncaught errors could cause failures.
3. Check that your rules are calling the `callback` function only once for each logical branch in your code.
4. Add `console.log()` statements to your rules to debug and check state. For example: `console.log(“output = “ + some_variable);`.
5. Click **Debug Rule** in the Dashboard to view the output from your `console.log` statements.
6. View the output in the Real-time Webtask Logs to get more information about your rules’ execution.

## Keep reading
