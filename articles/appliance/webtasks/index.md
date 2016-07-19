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
