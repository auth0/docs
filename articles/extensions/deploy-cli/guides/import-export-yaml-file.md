---
title: Import/Export YAML File
description: Learn how to use the YAML Option of the Auth0-deploy-cli tool.
topics:
  - extensions
  - deploy-cli
contentType:
  - how-to
useCase: extensibility-extensions
---
# Import/Export Tenant Configuration to a YAML File

The YAML option supports exporting and importing the Auth0 tenant configuration via a [YAML](http://yaml.org/) file.

## Example Export

You can export your current tenant configuration. For example the following command will export your tenant configuration.

`a0deploy export -c config.json --strip -f yaml -o path/to/export`

> NOTE: The option --strip is used to remove the identifier fields from the Auth0 objects. This means when importing into another Auth0 Tenant new id's are generated otherwise the import will fail as the tool cannot find the existing objects by their id.

> NOTE: Some of the settings cannot be exported for example emailProvider credentials, rulesConfigs values and others. After export you may need to update the `tenant.yaml` values if you experience schema errors on import.

## Example Import
Please refer to [tenant.yaml](tenant.yaml) for an example configuration.

### Instructions

1. Copy config.json.example and fill out details
2. Run deploy
```bash
a0deploy import -c config.json -i tenant.yaml
```

# Usage

## Configuration

The config will need the client ID and secret from your newly created client (the client is named `auth0-deploy-cli-extension` if you used the extension).

You can either set env variables or place the values in a config file anywhere on the filesystem.

::: note
By default the tool will also merge in your current environment variables and override the config.json which have the same top key. You can disable this via the command line with the `--no-env` option.
:::

Here is the example of a `config.json` file:

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
  ]
}
```

## ENV Variables and AUTH0_KEYWORD_REPLACE_MAPPINGS

The mappings are there so that you can use the same configuration file for all of your environments (e.g. dev, uat, staging, and prod) without having to have different versions of the files for each environment.  The mappings allow you to replace certain values in your configuration repo with envrionment specic values.  There are two ways to use the keyword mappings.  You can either wrap the key in `@@key@@` or `##key##`.  If you use the `@` symbols, it will do a JSON.stringify on your value before replacing it.  So if it is a string it will add quotes, if it is an array or object it will add braces.  If you use the `#` symbol instead, till just do a literal replacement.  It will not add quotes or brackets.

> NOTE: By default the tool will also merge in your current environment variables and override the AUTH0_KEYWORD_REPLACE_MAPPINGS which have the same top key. You can disable this via the command line with the `--no-env` option.

For example, you could specify a different JWT timeout in your dev environment then prod for testing and a different environment URL:

Client .json:
```json
{
  ... 
  "callbacks": [
    "##ENVIRONMENT_URL##/auth/callback"
  ],
  "jwt_configuration": {
    "lifetime_in_seconds": @@JWT_TIMEOUT@@,
    "secret_encoded": true
  }
  ...
}
```

Dev Config .json:
```json
  "AUTH0_KEYWORD_REPLACE_MAPPINGS": {
    "ENVIRONMENT_URL": "http://dev.fabrikam.com",
    "JWT_TIMEOUT": 120,
    ...
  }
```

Prod Config .json:
```json
  "AUTH0_KEYWORD_REPLACE_MAPPINGS": {
    "ENVIRONMENT_URL": "http://fabrikam.com",
    "JWT_TIMEOUT": 3600,
    ...
  }
```