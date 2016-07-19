---
url: /appliance/webtasks
---

# Auth0 Appliance: Webtasks

Beginning with Build 7247, you may use the Appliance's version of  [Webtasks](http://webtask.io/) to execute your rules and custom database logic.

## Sandboxes

Auth0 provides different stages (which are known as sandboxes) on which you may run your rules and custom database logic:

* `node_sandbox` (default): while more secure than `eval`, `node_sandbox` is more resource intensive;
* `eval`: provides the best performance, but is the least secure of the three available modes;
* `auth0-sandbox`: provides better performance that `node_sandbox`, improved isolation over `eval`, and offers a greater number of Node.js modules for use with your custom code.

**Note:** The `auth0-sandbox` is only available for installations running Ubuntu 14.04.

## Code Compatibility

Much of the code written for use with `node-sandbox` or `eval` should work on `auth0-sandbox`. However, code that uses external modules (which execute in auth0-sandbox) will yield an exception in the other sandboxes.

## Working with Webtasks

You may use Webtasks by calling its endpoints directly. This can be done using the Webtask Command Line Interface (`wt-cli`) and specifying the ``--url "https://webtask.<a0url>.com"`` parameter (where `a0url` is the address of the Appliance node). For additional information on setting up the `wt-cli`, please see [Getting Started with Webtasks](https://webtask.io/docs/101).

## Further Reading

* [Getting Started with Webtasks](https://webtask.io/docs/101)
* [Using Webtasks as Code Sandboxes](https://webtask.io/docs/sample_multitenant)
* [HTTP API: Executing Webtasks](https://webtask.io/docs/api_run)
