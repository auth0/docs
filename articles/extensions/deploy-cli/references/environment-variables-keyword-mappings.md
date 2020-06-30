---
title: Environment Variables and Keyword Mappings
description: Describes environmental variables and keyword mappings for exporting tenant configurations. 
topics:
  - extensions
  - deploy-cli
contentType:
  - reference
useCase: extensibility-extensions
---
# Environment Variables and Keyword Mappings

The mappings allow you to do the following:

* Use the same configuration file for all of your environments (e.g. dev, uat, staging, and prod).

* Replace certain values in your configuration repo with environment-specific values. There are two ways to use the keyword mappings: You can either wrap the key in `@@key@@` or `##key##`. 

  - If you use the `@` symbols, it will do a `JSON.stringify` on your value before replacing it.  So if it is a string, it will add quotes. and if it is an array or object, it will add braces.  

  - If you use the `#` symbol instead, it will just do a literal replacement; it will not add quotes or brackets.

::: note
By default the tool also merges your current environment variables and overrides the **AUTH0_KEYWORD_REPLACE_MAPPINGS** which have the same top key. You can disable this via the command line with the `--no-env` option.
:::

For example, you could specify a different JWT timeout in your dev environment, and then use prod for testing and a different environment URL. 

See the examples below.

## `Client.json`

```json
{
  ...
  "callbacks": [
    "##ENVIRONMENT_URL##/auth/callback"
  ],
  "jwt_configuration": {
    "lifetime_in_seconds": ##JWT_TIMEOUT##,
    "secret_encoded": true
  }
  ...
}
```

## Dev `Config.json`

```json
"AUTH0_KEYWORD_REPLACE_MAPPINGS": {
  "ENVIRONMENT_URL": "http://dev.fabrikam.com",
  "JWT_TIMEOUT": 120,
  ...
}
```

## Prod `Config.json`

```json
"AUTH0_KEYWORD_REPLACE_MAPPINGS": {
  "ENVIRONMENT_URL": "http://fabrikam.com",
  "JWT_TIMEOUT": 3600,
  ...
}
```

## Keep reading

* [Import/Export Tenant Configuration to a Directory Structure](/extensions/deploy-cli/guides/import-export-directory-structure)
* [Import/Export Tenant Configuration to a YAML file](/extensions/deploy-cli/guides/import-export-yaml-file)
