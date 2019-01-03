---
title: Call Deploy CLI Tool Programmatically
description: Learn how call the Auth0 Deploy Command Line Interface (CLI) programmatically.
topics:
  - extensions
  - deploy-cli
contentType:
  - index
  - concept
useCase: extensibility-extensions
---
# Call Deploy CLI Tool Programmatically

The tool can be called programmatically as in the following example. 

```js
import { deploy, dump } from 'auth0-deploy-cli';

const config = {
  AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
  AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_ID,
  AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_SECRET,
  AUTH0_ALLOW_DELETE: false
};


// Export Tenant Config
deploy({
  output_folder: 'path/to/yaml/or/directory',   // Input file for directory, change to .yaml for YAML
  base_path: basePath,                          // Allow to override basepath, if not take from input_file
  config_file: configFile,                      // Option to a config json
  config: configObj,                            // Option to sent in json as object
  strip,                                        // Strip the identifier field for each object type
  secret                                        // Optionally pass in auth0 client secret seperate from config
})
  .then(() => console.log('yey deploy was successful'))
  .catch(err => console.log(`Oh no, something went wrong. Error: ${err}`));


// Import tenant config
dump({
  input_file: 'path/to/yaml/or/directory',  // Input file for directory, change to .yaml for YAML
  base_path: basePath,                      // Allow to override basepath, if not take from input_file
  config_file: configFile,                  // Option to a config json
  config: configObj,                        // Option to sent in json as object
  env,                                      // Allow env variable mappings from process.env
  secret                                    // Optionally pass in auth0 client secret seperate from config
})
  .then(() => console.log('yey deploy was successful'))
  .catch(err => console.log(`Oh no, something went wrong. Error: ${err}`));
```

## Troubleshooting

The `auth0-deploy-cli` tool leverages the [Auth0 Management API](https://auth0.com/docs/api/management/v2) passing through objects for creates, updates and deletions.

You may experience `Bad Request` and `Payload validation` errors. These errors are returned from the Auth0 Management API, and usually mean the object has attributes which are not writable or no longer available (legacy). This can happen when exporting from an older Auth0 tenant and importing into a newly created tenant. In this scenario you may need to update your configuration to support the new object format. See #45 for a potential fix.

## Keep reading

* 