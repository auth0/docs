---
description: Learn about custom database action script templates.
topics:
    - connections
    - custom-database
    - templates
contentType: 
    - index
    - concept
useCase:
    - customize-connections
    - script-templates
---
# Custom Database Action Script Templates

<%= include('../_includes/_panel-feature-availability') %>

If you have your own database (known as a legacy data store in Auth0) containing user identity data, you can use it as an identity provider to authenticate users.
You create and configure the connection to your legacy data store as a custom database in Auth0. You can choose to migrate data to Auth0's data store from your legacy database incrementally over time, or you can continue to use it without migrating data. We provide script templates to perform functions on the custom database that you can use and customize. 

There are two different types of custom database scripts:

* **Trickle Migration**: Whenever a user logs into Auth0, if the user is not yet in Auth0, the script will check the legacy database to see if the user exists there. If found and the **Import users to Auth0** flag is turned on, user data migrates the user to Auth0 data store. 

* **Legacy Database**: Auth0 will always query the underlying database when a user tries to log in, is created, changes their password, verifies their email, or is deleted. If found and the **Import users to Auth0** flag is **not** turned on, user data stays in the legacy database and does **not** migrate to Auth0.

Auth0 provides the following custom database action scripts:

* [Change Passwords](/connections/database/custom-db/templates/change-password)
* [Create](/connections/database/custom-db/templates/create)
* [Delete](/connections/database/custom-db/templates/delete)
* [Get User](/connections/database/custom-db/templates/get-user)
* [Login](/connections/database/custom-db/templates/login)
* [Verify](/connections/database/custom-db/templates/verify)
* [Change Email](/connections/database/custom-db/templates/change-email)

<%= include('../../../../_includes/_ip_whitelist') %>

## Script execution

As described in the [Custom Database Connections Overview](/connections/database/custom-db/custom-db-connection-overview#how-it-works), a custom database connection type allows you to configure action scripts: custom code that is used when interfacing with your legacy identity store. Each action script is essentially a named JavaScript function that is passed a number of parameters, with the name of the function and the parameters passed depending on the script. 

### Limits

Action script execution supports the asynchronous nature of JavaScript, and constructs such as [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) objects can be used. Asynchronous processing effectively results in suspension pending completion of an operation, and an Auth0 serverless Webtask container typically has a 20-second execution limit, after which the container may be recycled. Recycling a container due to this limit will prematurely terminate operation, ultimately resulting in an error condition being returned (as well as resulting in a potential reset of the `global` object). 

### Completion and the `callback` function

The `callback` function supplied to each action script effectively acts as a signal to indicate completion of operation. An action script should complete immediately following a call to the `callback` function (either implicitly or by explicitly executing a JavaScript return statement) and should refrain from any other operation. 

::: warning
The Auth0 supplied `callback` function must be called exactly **once**; calling the function more than once within an action script will lead to unpredictable results and/or errors.
:::

::: note
Where `callback` is executed with no parameters, as in `callback()`, the implication is that function has been called as though `callback(null)` had been executed. 
:::

If an action script uses asynchronous processing, then a call to the `callback` function must be deferred to the point where asynchronous processing completes, and must be the final thing called. Asynchronous execution will result in a JavaScript `callback` being executed after the asynchronous operation is complete; this callback is typically fired at some point after the main (synchronous) body of a JavaScript function completes. 

::: warning
Failure to execute the `callback` function will result in a stall of execution, and ultimately in an error condition being returned. The action script must call the `callback` function exactly once: the `callback` function must be called at least once in order to prevent stall of execution, however it must not be called more than once otherwise unpredictable results and/or errors will occur.
:::

## Keep reading

* [Custom Database Action Script Execution Best Practices](/best-practices/custom-db-connections/execution)
* [Handle Errors and Troubleshoot Your Custom DB Scripts](/connections/database/custom-db/error-handling)
