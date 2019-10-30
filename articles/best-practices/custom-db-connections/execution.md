---
description: Best practices for custom database action script execution.
classes: topic-page
topics:
  - best-practices
  - custom-database
  - extensibility
  - database-action-scripts
  - custom-database-connections
  - scripts
contentType: reference
useCase:
  - best-practices
  - custom-database
  - database-action-scripts
---
# Custom Database Action Script Execution

As described in [Custom Database Connection Anatomy](/best-practices/custom-db-connections/anatomy), a custom database connection type allows you to configure action scripts: custom code that is used when interfacing with your legacy identity store. Each action script is essentially a named JavaScript function that is passed a number of parameters, with the name of the function and the parameters passed dependent on the script in question. 

Action script execution supports the asynchronous nature of JavaScript, and constructs such as [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) objects and the like can be used. Asynchronous processing effectively results in suspension pending completion of an operation, and an Auth0 serverless Webtask container typically has a circa 20-second execution limit - after which the container may be recycled. Recycling of a container due to this limit will prematurely terminate operation, ultimately resulting in an error condition being returned (as well as resulting in a potential reset of the `global`(#global-object) object). 

The `callback` function supplied to each action script effectively acts as a signal to indicate completion of operation. An action script should complete immediately following a call to the callback function - either implicitly or, preferably, by explicitly executing a (JavaScript) `return` statement - and should refrain from any other operation. The (Auth0) supplied callback function must be called exactly once; calling the function more than once within an action script will lead to unpredictable results and/or errors.

::: note
Where callback is executed with no parameters, as in callback(), the implication is that function has been called as though `callback(null)` had been executed. 
:::

If an action script is making use of asynchronous processing, then a call to the (Auth0) supplied `callback` function must be deferred to the point where asynchronous processing completes, and must be the final thing called. Asynchronous execution will result in a (JavaScript) callback being executed after the asynchronous operation is complete; this callback is typically fired at some point after the main (synchronous) body of a JavaScript function completes. 

Failure to execute the `callback` function will result in a stall of execution, and ultimately in an error condition being returned. The action script must call the `callback` function exactly once: the `callback` function must be called at least once in order to prevent stall of execution, however it must not be called more than once otherwise unpredictable results and/or errors will occur.

## Login action script

## Get User action script

## Create action script

## Verify action script

## Change Password action script

## Delete action script

## Change Email action script

## Keep reading

<%= include('../../_includes/_topic-links', { links: [
  'best-practices/custom-db-connections/error-handling',
  'best-practices/custom-db-connections/debugging',
  'best-practices/custom-db-connections/testing',
  'best-practices/custom-db-connections/deployment',
  'best-practices/custom-db-connections/performance',
  'best-practices//custom-db-connections/security'
] }) %>
