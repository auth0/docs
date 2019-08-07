---
description: Custom DB script templates and checklist and troubleshooting
topics:
    - connections
    - custom-database
    - templates
contentType: 
    - index
useCase:
    - customize-connections
    - script-templates
---
# Custom Database Action Script Templates

<%= include('../_includes/_feature-availability') %>

If you have your own user database, you can use it as an identity provider in Auth0 to authenticate users. 

There are two different types of custom database scripts:

  * **Trickle Migration**: Whenever a user logs into Auth0, if the user is not yet in Auth0, the script will check the legacy database to see if the user is there. If they are there, it will migrate the user to Auth0. This script runs when the **Import users to Auth0** flag is turned on. 

  * **Legacy DB**: Auth0 will always call out to the underlying database anytime a user tries to log in, is created, changes their password, verifies their email, or is deleted. Users stay in the legacy database and do **not** migrate to Auth0.

You can use the following scripts:

* [Change Passwords](/connections/database/custom-db/templates/change-password)
* [Create User](/connections/database/custom-db/templates/create)
* [Delete User](/connections/database/custom-db/templates/delete)
* [Get User](/connections/database/custom-db/templates/get-user)
* [Login](/connections/database/custom-db/templates/login)
* [Verify User](/connections/database/custom-db/templates/verify)

<%= include('../../../../_includes/_ip_whitelist') %>

## Script execution

A custom database connection type allows you to configure action scripts: custom code that is used when interfacing with your legacy identity store. Each action script is essentially a named JavaScript function that is passed a number of parameters, with the name of the function and the parameters passed dependent on the script in question. 

Action script execution supports the asynchronous nature of JavaScript, and constructs such as Promise objects and the like can be used. Asynchronous processing effectively results in suspension pending completion of an operation, and an Auth0 serverless Webtask container typically has a circa 20-second execution limit - after which the container may be recycled. Recycling of a container due to this limit will prematurely terminate operation, ultimately resulting in an error condition being returned (as well as resulting in a potential reset of the global object). 

The callback function supplied to each action script effectively acts as a signal to indicate completion of operation. An action script should complete immediately following a call to the callback function - either implicitly or, preferably, by explicitly executing a (JavaScript) return statement - and should refrain from any other operation. The (Auth0) supplied callback function must be called exactly once; calling the function more than once within an action script will lead to unpredictable results and/or errors.

::: note
Where `callback` is executed with no parameters, as in `callback()`, the implication is that function has been called as though `callback(null)` had been executed. 
:::

If an action script is making use of asynchronous processing, then a call to the (Auth0) supplied callback function must be deferred to the point where asynchronous processing completes, and must be the final thing called. Asynchronous execution will result in a (JavaScript) callback being executed after the asynchronous operation is complete; this callback is typically fired at some point after the main (synchronous) body of a JavaScript function completes. 

Failure to execute the callback function will result in a stall of execution, and ultimately in an error condition being returned. The action script must call the callback function exactly once: the callback function must be called at least once in order to prevent stall of execution, however it must not be called more than once otherwise unpredictable results and/or errors will occur.

## Keep reading

* [Script template best practices](/best-practices/custom-database-connections#script-template-best-practices)
