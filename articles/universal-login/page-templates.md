---
description: Customizing the New Universal Login Page with Page Template
topics:
  - universal-login
  - internationalization
toc: true
---
# Customizing the New Universal Login Page with Page Template

You can customize the New <dfn data-key="universal-login">Universal Login</dfn> pages by providing a Page Template using the [Liquid template language](https://shopify.github.io/liquid/). 

::: warning
This capability only be used if the tenant has [Custom Domains](/custom-domains) enabled.
:::

Page Templates let you define the content that is displayed around the Universal Login widgets (e.g. the Login box, the MFA box). The simplest template you can write is:

```html
<!DOCTYPE html>
<html>
  <head>
    {%- auth0:head -%}
  </head>
  <body>
    {%- auth0:widget -%}
  </body>
</html>
```

The following tags need to be present in the template:

|||
|:-----------------|:------------|
|`auth0:widget`| Includes the HTML for the widget that is displayed in every page (Login, Reset Password, etc.) |
|`auth0:head`| Includes tags that are required to render the widget |

## Page Templates Variables

The Page Templates have a set of context variables that can be used to impact how the page is rendered.

* The login page [application's settings](/dashboard/reference/settings-application#basic-settings):
  - application.id
  - application.name
  - application.logo_uri
  - application.metadata

* Universal Login [branding settings](${manage_url}/#/login_settings):
  - branding.logo_url
  - branding.colors.primary
  - branding.colors.page_background

* Tenant's [settings](/dashboard/reference/settings-tenant#basic-settings):
  - tenant.friendly_name
  - tenant.support_email
  - tenant.support_url

* Information about each the current universal login prompt.

  <%= include('text-customization-prompts/_prompt_definition') %>

  - locale: Locale used to render the login pages, matching one of the [supported tenant languages](/universal-login/i18n)
  - prompt.name: The name of the Universal Login prompt being rendered 
  - prompt.screen.name: The name of the Universal Login screen being rendered.
  - prompt.screen.texts: All the [localized texts](/universal-login/text-customization) needed in the screen being rendered.
  
* Information about the current user, for pages rendered after the user authenticates:
  - user.user_id
  - user.picture
  - user.email
  - user.email_verified
  - user.app_metadata
  - user.user_metadata
  - user.family_name
  - user.given_name
  - user.name
  - user.nickname
  - user.username

By using these variables you can support scenarios like:

* Render different content depending on the Application (e.g. you own two brands that need a different design).
* Render different content depending on the Prompt (e.g. in the Login page you want to add content explaining what the application does, but in the MFA flow, you prefer to only have the MFA box).
* Add a footer with links to the tenant's support page or email.

## Page Templates API

To set the Page Template you need to use the Management API. You first need to get a Management API token with the `update:branding`,`read:branding`, `delete:branding` scopes.

To set the template, you need to use the following endpoint:

```har
{
  "method": "PUT",
  "url": "https://${account.namespace}/api/v2/branding/templates/universal-login",
  "headers": [
    { "name": "Authorization", "value": "Bearer MGMT_API_ACCESS_TOKEN" },
    { "name": "Content-Type", "value": "text/html" }
  ],
  "postData": {
    "mimeType": "text/html",
    "text": "<!DOCTYPE html><html><head>{%- auth0:head -%}</head><body>{%- auth0:widget -%}</body></html>"
  }
}
```

To retrieve the template, you need to use the following endpoint:

```har
{
  "method": "GET",
  "url": "https://${account.namespace}/api/v2/branding/templates/universal-login",
  "headers": [
    { "name": "Authorization", "value": "Bearer MGMT_API_ACCESS_TOKEN" }
  ]
}
```

To delete the template, you need to use the following endpoint:

```har
{
  "method": "DELETE",
  "url": "https://${account.namespace}/api/v2/branding/templates/universal-login",
  "headers": [
    { "name": "Authorization", "value": "Bearer MGMT_API_ACCESS_TOKEN" }
  ]
}
```




** Troubleshooting

- If the template is not being applied, check that you are navigating to `<custom_domain>/authorize`. When you navigate to `${account.namespace}/authorize` Auth0 will not render the page template.



