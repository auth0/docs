---
section: appliance
description: How to use Webtasks on the PSaaS Appliance
topics:
    - appliance
    - webtask
contentType: 
    - concept
    - index
useCase: appliance
applianceId: appliance51
sitemap: false
---

# PSaaS Appliance: Webtasks

Beginning with Build 7247, you may use the PSaaS Appliance's version of [Webtasks](http://webtask.io/) to execute your rules and custom database logic.

::: panel Prerequisites
Prior to working with Webtasks, please ensure that you have configured the:

* [PSaaS Appliance Command Line Interface (CLI)](/appliance/cli/configure-cli);
* [Webtask Command Line Interface (`wt-cli`)](https://webtask.io/docs/101)
:::

Auth0 provides `auth0-sandbox`, a stage (sometimes referred to as a *sandbox*) on which you may run your rules and custom database logic.

## Working with Webtasks

You may use Webtasks by calling its endpoints directly. This can be done using the Webtask Command Line Interface (`wt-cli`) and specifying the ``--url "https://webtask.<a0url>.com"`` parameter (where `a0url` is the address of the PSaaS Appliance node). For additional information on setting up the `wt-cli`, please see [Getting Started with Webtasks](https://webtask.io/docs/101).

### Node.js Modules

Currently, not all of the [Node.js modules available for the Auth0 Cloud Environment](https://auth0-extensions.github.io/canirequire/) are available for the PSaaS Appliance.

To see which modules are available for Webtasks running on PSaaS Appliance instances, execute the [`List Modules` Webtask](https://github.com/auth0-extensions/canirequire/blob/gh-pages/tasks/list_modules.js) on your PSaaS Appliance instance.

#### Set up the List Modules Webtask

First, copy locally the [`List Modules` Webtask](https://github.com/auth0-extensions/canirequire/blob/gh-pages/tasks/list_modules.js), either by downloading the file from GitHub or by copying this code:

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

Next, create a Webtask profile using `wt-cli` (if you don't already have one):

```bash
wt init --container "YOUR_TENANT_NAME" --url "WEBTASK_URL" --token "eyJhbGci..." -p "a``YOUR_TENANT_NAME-default"
```

Finally, you are ready to register your Webtask using the `wt create` command. This command receives as input a path or URL of the ebtask's code and provides as output the URL where the Webtask is available.

If you saved the file under a `my-webtasks` directory as `list_modules.js` you would use the following:

```bash
wt create ./my-webtasks/list_modules.js
```

You should get a message that the Webtask was created, alongside with the URL to access it. The response is a JSON object.

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

## Keep reading

::: next-steps
* [Getting Started with Webtasks](https://webtask.io/docs/101)
* [Using Webtasks as Code Sandboxes](https://webtask.io/docs/sample_multitenant)
* [HTTP API: Executing Webtasks](https://webtask.io/docs/api_run)
* [Webtasks with Dedicated Domains](/appliance/webtasks/dedicated-domains)
:::
