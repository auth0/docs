---
title: Import/Export Tenant Configuration to YAML File
description: Learn how to use the YAML option of the Auth0-deploy-cli tool.
topics:
  - extensions
  - deploy-cli
contentType:
  - how-to
useCase: extensibility-extensions
---
# Import/Export Tenant Configuration to YAML File

The `auth0-deploy-cli` tool's **YAML option** supports the exporting to and importing of an Auth0 tenant configuration using a [YAML](http://yaml.org/) file.

## Import tenant configuration

To import an Auth0 tenant configuration:

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
   a0deploy import -c config.json -i tenant.yaml
   ```

### Example: configuration file

Here is the example of a `config.json` file:

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

### Import configuration example

The following is an example of an import config file called `tenant.yaml` (for full details on everything that can be included, please refer to the [extension's repository](https://github.com/auth0/auth0-deploy-cli/tree/master/examples/directory):

```yaml
tenant:
  # Any tenant settings can go here https://auth0.com/docs/api/management/v2#!/Tenants/get_settings
  friendly_name: 'Auth0 Deploy Example'

pages:
  - name: "login"
    html: "pages/login.html"

  - name: "password_reset"
    html: "pages/password_reset.html"

  - name: "guardian_multifactor"
    html: "pages/guardian_multifactor.html"
    enabled: false

  - name: "error_page"
    html: "pages/error_page.html"

clients:
  -
    name: "My SPA"
    app_type: "spa"
    # Add other client settings https://auth0.com/docs/api/management/v2#!/Clients/post_clients
  -
    name: "My M2M"
    app_type: "non_interactive"
    # Add other client settings https://auth0.com/docs/api/management/v2#!/Clients/post_clients

databases:
  - name: "users"
    enabled_clients:
      - "My SPA"
    options:
      enabledDatabaseCustomization: true
      customScripts:
        login: "databases/users/login.js"
        create: "databases/users/create.js"
        delete: "databases/users/delete.js"
        get_user: "databases/users/get_user.js"
        change_email: "databases/users/change_email.js"
        change_password: "databases/users/change_password.js"
        verify: "databases/users/verify.js"

connections:
  - name: "myad-waad"
    strategy: "waad"
    enabled_clients:
      - "My SPA"
    options:
      tenant_domain: 'office.com'
      client_id: 'some_client_id'
      client_secret: 'some_client_secret'
      domain: 'office.com'
      waad_protocol: 'openid-connect'
      api_enable_users: true
      basic_profile: true
      ext_profile: true
      ext_groups: true
    # Add other connection settings (https://auth0.com/docs/api/management/v2#!/Connections/post_connections)

rules:
  - name: "Common-Functions"
    order: 10
    script: "rules/enrich_tokens.js"

rulesConfigs:
  # Key/Value pairs for Rule configuration settings
  - key: "SOME_SECRET"
    value: 'some_key'

hooks:
  - name: "Client Credentials Exchange"
    triggerId: "credentials-exchange"
    enabled: true
    secrets:
      api-key: "my custom api key"
    dependencies: 
      bcrypt: "3.0.6"
    script: "hooks/client-credentials-exchange.js"

resourceServers:
  -
    name: "My API"
    identifier: "https://##ENV##.myapp.com/api/v1"
    scopes:
      - value: "update:account"
        description: "update account"
      - value: "read:account"
        description: "read account"
    # Add other resource server settings (https://auth0.com/docs/api/management/v2#!/Resource_Servers/post_resource_servers)

emailProvider:
  name: "smtp"
  enabled: true
  credentials:
    smtp_host: "smtp.mailtrap.io"
    smtp_port: 2525
    smtp_user: "smtp_user"
    smtp_pass: "smtp_secret_password"

emailTemplates:
  - template: "verify_email"
    enabled: true
    syntax: "liquid"
    from: "test@email.com"
    subject: "something"
    body: "emails/change_email.html"

  - template: "welcome_email"
    enabled: true
    syntax: "liquid"
    from: "test@email.com"
    subject: "something"
    body: "emails/change_email.html"

clientGrants:
  - client_id: "My M2M"
    audience: "https://##ENV##.myapp.com/api/v1"
    scope:
      - "update:account"

guardianFactors:
  - name: sms
    enabled: true
  - name: push-notification
    enabled: true
  - name: otp
    enabled: true
  - name: email
    enabled: false
  - name: duo
    enabled: false

guardianFactorProviders:
  - name: sms
    provider: twilio
    auth_token: "some_token"
    sid: "some_sid"
    messaging_service_sid: "some_message_sid"

guardianFactorTemplates:
  - name: sms
    enrollment_message: >-
      {{code}} is your verification code for {{tenant.friendly_name}}. Please
      enter this code to verify your enrollment.
    verification_message: '{{code}} is your verification code for {{tenant.friendly_name}}'

roles:
  - name: Admin
    description: App Admin
    permissions:
      - permission_name: 'update:account'
        resource_server_identifier: 'https://##ENV##.myapp.com/api/v1'
      - permission_name: 'read:account'
        resource_server_identifier: 'https://##ENV##.myapp.com/api/v1'
  - name: User
    description: App User
    permissions:
      - permission_name: 'read:account'
        resource_server_identifier: 'https://##ENV##.myapp.com/api/v1'
```

## Export tenant configuration

To export your current tenant configuration, run a command that's similar to:

`a0deploy export -c config.json -f yaml -o path/to/export`

<%= include('../_includes/_strip-option') %>

<%= include('../_includes/_limitations') %>

For more information, see [Environment Variables and Keyword Mappings](/extensions/deploy-cli/references/environment-variables-keyword-mappings).

## Keep reading

* [Incorporate Deploy CLI into Build Environment](/extensions/deploy-cli/guides/incorporate-deploy-cli-into-build-environment)
* [Call Deploy CLI Tool Programmatically](/extensions/deploy-cli/guides/call-deploy-cli-programmatically)
* [Deploy CLI Tool Options](/extensions/deploy-cli/references/deploy-cli-options)
* [Import/Export Tenant Configuration to a Directory Structure](/extensions/deploy-cli/guides/import-export-directory-structure)
* [Troubleshooting Deploy CLI Tool](/extensions/deploy-cli/references/troubleshooting)
