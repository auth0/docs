---
url: /appliance/webtasks
section: appliance
description: How to use Webtasks on the Appliance
---

# Auth0 Appliance: Webtasks

Beginning with Build 7247, you may use the Appliance's version of [Webtasks](http://webtask.io/) to execute your rules and custom database logic.

::: panel-info Prerequisites
Prior to working with Webtasks, please ensure that you have configured the:

* [Appliance Command Line Interface (CLI)](/appliance/cli/configure-cli);
* [Webtask Command Line Interface (`wt-cli`)](https://webtask.io/docs/101)
:::

## Sandboxes

Auth0 provides different stages (which are known as sandboxes) on which you may run your rules and custom database logic:

* `node_sandbox` (default): while more secure than `eval`, `node_sandbox` is more resource intensive;
* `eval`: provides the best performance, but is the least secure of the three available modes;
* `auth0-sandbox`: provides better performance that `node_sandbox`, improved isolation over `eval`, and offers a greater number of Node.js modules for use with your custom code.

**Note**: Only one sandbox mode may be selected at any given time (for example, you may not run selected rules in one sandbox and other rules in another sandbox). If you would like to change the sandbox mode, please discuss this with your Auth0 Customer Success Engineer.

## Code Compatibility

Code that you have written for use with `node-sandbox` or `eval` will work in `auth0-sandbox`. However, code that is written for `auth0-sandbox` may not be compatible with `node-sandbox` or `eval`, especially if your code uses modules.

The `auth0-sandbox` is the recommended method for running your custom code.

## Working with Webtasks

You may use Webtasks by calling its endpoints directly. This can be done using the Webtask Command Line Interface (`wt-cli`) and specifying the ``--url "https://webtask.<a0url>.com"`` parameter (where `a0url` is the address of the Appliance node). For additional information on setting up the `wt-cli`, please see [Getting Started with Webtasks](https://webtask.io/docs/101).

### Node.js Modules

Currently, not all of the [Node.js modules available for the Auth0 Cloud Environment](https://tehsis.github.io/webtaskio-canirequire/) are available for the Appliance.

To see which modules are available for Webtasks running on Appliance instances, execute the [`List Modules` Webtask](https://github.com/tehsis/webtaskio-canirequire/blob/gh-pages/tasks/list_modules.js) using the appropriate sandbox on your Appliance instance.

First, copy locally the [`List Modules` Webtask](https://github.com/tehsis/webtaskio-canirequire/blob/gh-pages/tasks/list_modules.js), either by downloading the file or by copying this code:

```js
'use npm';
const Fs = require('fs');
const Verquire = require('verquire');
const _ = require('lodash@4.8.2');

const abcsort = function (a, b) {
  if (a.name < b.name) {
      return -1;
  }

  if (a.name > b.name) {
      return 1;
  }

  return 0;
};


const natives = Object.keys(process.binding("natives"))
    .filter(nativeDep => nativeDep[0] !== '_')
    .map(dep => ({name: dep, version: 'native'}))
    .sort(abcsort);


const modules = _.flatMap(Verquire.modules, (versions, module_name) => {
   return versions.map((version) => {
       const moduleObj = {
         name: module_name,
         version: version
       };

       return moduleObj;
   });
}).sort(abcsort);

module.exports = cb => {
    cb(null, {
        node_version: process.version,
        modules: natives.concat(modules)
    });
};
```

Afterwards, create a webtask profile using `wt-cli`, if you don't already have one.

```bash
wt init --container "YOUR_TENANT_NAME" --url "WEBTASK_URL" --token "eyJhbGci..." -p "a``YOUR_TENANT_NAME-default"
```

Now you are ready to register your webtask, using the `wt create` command. This command receives as input a path or URL of the webtasks's code and provides as output the URL where the webtask is available.

If you saved the file under a `my-webtasks` directory as `list_modules.js` you would use the following:

```bash
wt create ./my-webtasks/list_modules.js
```

You should get a message that the webtask was created, alongside with the URL to access it. The response is a JSON object.


```json
{
  "node_version":"v4.4.5",
  "modules":[
    {"name":"assert","version":"native"},
    {"name":"buffer","version":"native"},
    {"name":"child_process","version":"native"},
    {"name":"assert-plus","version":"0.1.5"},
    ...
  ]
}
```

## Further Reading

* [Getting Started with Webtasks](https://webtask.io/docs/101)
* [Using Webtasks as Code Sandboxes](https://webtask.io/docs/sample_multitenant)
* [HTTP API: Executing Webtasks](https://webtask.io/docs/api_run)
