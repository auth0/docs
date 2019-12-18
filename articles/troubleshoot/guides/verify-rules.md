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

* Turn rules off (if possible) and see if the issue still occurs.
* Check that your rules catch all possible errors that might be returned. Uncaught errors will cause failures.
* Check that your rules are calling the callback function exactly once for each logical branch in your code.
* Add `console.log()` statements to your rules to debug and check state.
    - For example: `console.log(“output = “ + some_variable);`
* Use the **Debug Rule** button to view the output from your `console.log` statements.
* View the output in the Real-time Webtask Logs as you test, to get more information about your rules’ execution.

## Keep reading
