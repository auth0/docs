---
title: Import/Export Tenant Configuration to Directory Structure
description: Understand how the Auth0 Deploy Command Line Interface (CLI) tool works.
topics:
  - extensions
  - deploy-cli
contentType:
  - how-to
useCase: extensibility-extensions
---
# Import/Export Tenant Configuration to Directory Structure

The `auth0-deploy-cli` tool includes a **directory option** that allows you to export and import an existing Auth0 tenant configuration into a predefined directory structure.

::: note
For information on how the files are expected to be laid out to work with the source control configuration utilities, see [GitHub Deployments](/extensions/github-deploy).
:::

## Import tenant configuration

1. Copy `config.json.example`, making sure to replace the placeholder values with the values specific to your configuration.

  ```json
  {
    "AUTH0_DOMAIN": "<YOUR_TENANT>.auth0.com",
    "AUTH0_CLIENT_ID": "<client_id>",
    "AUTH0_CLIENT_SECRET": "<client_secret>",
    "AUTH0_KEYWORD_REPLACE_MAPPINGS": {
      "AUTH0_TENANT_NAME": "<NAME>",
      "ENV": "DEV"
    },
    "AUTH0_ALLOW_DELETE": false,
    "AUTH0_EXCLUDED_RULES": [
      "rule-1-name",
      "rule-2-name"
    ],
    "INCLUDED_PROPS": {
      "clients": [ "client_secret" ]
    },
    "EXCLUDED_PROPS": {
      "connections": [ "options.client_secret" ]
    }
  }
  ```

Use the `client ID` and secret from your newly-created client (the client is named `auth0-deploy-cli-extension` if you used the extension).

By default, the tool merges with your current environment variables and overrides the `config.json` file (which has the same top key). You can use the `--no-env` option to disable the override via the command line.

You can either set the environment variables, or you can place the values in a configuration file anywhere on the file system that is accessible by the CLI tool.

2. Deploy using the following command:

```bash
a0deploy import -c config.json -i .
```

### Example: configuration file

Here is an example of a `config.json` file:

```json
{
  "AUTH0_DOMAIN": "<your auth0 domain (e.g. fabrikam-dev.auth0.com) >",
  "AUTH0_CLIENT_SECRET": "<your deploy client secret>",
  "AUTH0_CLIENT_ID": "<your deploy client ID>",
  "AUTH0_KEYWORD_REPLACE_MAPPINGS": {
    "YOUR_ARRAY_KEY": [
      "http://localhost:8080",
      "https://somedomain.com"
    ],
    "YOUR_STRING_KEY": "some environment specific string"
  },
  "AUTH0_ALLOW_DELETE": false,
  "INCLUDED_PROPS": {
    "clients": [ "client_secret" ]
  },
  "EXCLUDED_PROPS": {
    "connections": [ "options.client_secret" ]
  },
  "AUTH0_EXCLUDED_RULES": [ "auth0-account-link-extension" ],
  "AUTH0_EXCLUDED_CLIENTS": [ "auth0-account-link" ],
  "AUTH0_EXCLUDED_RESOURCE_SERVERS": [ "SSO Dashboard API" ]
}
```

## Export tenant configuration

To export your current tenant configuration, run a command that's similar to:

`a0deploy export -c config.json -f directory -o path/to/export`

<%= include('../_includes/_strip-option') %>

<%= include('../_includes/_limitations') %>

For more information, see [Environment Variables and Keyword Mappings](/extensions/deploy-cli/references/environment-variables-keyword-mappings).

### Directory structure example

Here is a sample of what the export directory structure looks like (for full details on everything that can be included, please refer to the [extension's repository](https://github.com/auth0/auth0-deploy-cli/tree/master/examples/directory):

```
repository =>
  clients
    client1.json
    client2.json
  connections
    connection1.json
  database-connections
    connection1
      database.json
      create.js
      delete.js
      get_user.js
      login.js
      verify.js
  emails
    provider.json
    verify_email.json
    verify_email.html
    welcome_email.json
    welcome_email.html
  grants
    grant1.json
  pages
    login.html
    login.json
    password_reset.html
    password_reset.json
  resource-servers
    resource_server1.json
    resource_server2.json
  rules
    rule1.js
    rule1.json
    rule2.js
  rules-configs
    env_param1.json
    some_secret1.json
  hooks
     hook1.js
     hook1.json
  guardian
    factors
      sms.json
      email.json
      otp.json
      push-notification.json
    provider
      sms-twilio.json
    templates
      sms.json
```

::: note
To add hook secrets to your environment, add secrets in the .json configuration file (in this example, hook1.json) as follows:

```json
"secrets": { 
  "api-key": "my custom api key" 
}
```

The `secrets` object cannot be nested, so remember to prefix your secrets.
:::

## Keep reading

* [Incorporate Deploy CLI into Build Environment](/extensions/deploy-cli/guides/incorporate-deploy-cli-into-build-environment)
* [Call Deploy CLI Tool Programmatically](/extensions/deploy-cli/guides/call-deploy-cli-programmatically)
* [Deploy CLI Tool Options](/extensions/deploy-cli/references/deploy-cli-options)
* [Import/Export Tenant Configuration to a YAML File](/extensions/deploy-cli/guides/import-export-yaml-file)
* [Troubleshooting Deploy CLI Tool](/extensions/deploy-cli/references/troubleshooting)
