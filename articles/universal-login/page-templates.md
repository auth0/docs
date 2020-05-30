---
description: Customizing the New Universal Login Page with Page Template
topics:
  - universal-login
  - internationalization
toc: true
---
# Customizing the New Universal Login Page with Page Template

You can customize the New <dfn data-key="universal-login">Universal Login</dfn> pages by providing a Page Template using the [Liquid template language](https://shopify.github.io/liquid/). 

:::note
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

|||
|:-----------------|:------------|
|locale| Current locale, matching one of the [supported tenant languages](/universal-login/i18n)|
|application.id| The Application ID |
|application.name| The [Application Name](/dashboard/reference/settings-application#basic-settings)) |
|application.logo_uri| The [Application Logo](/dashboard/reference/settings-application#basic-settings) |
|application.metadata| The [Application Metadata](/dashboard/reference/settings-application#application-metadata) |
|branding.logo_url| [Tenant friendly name](/dashboard/reference/settings-tenant#basic-settings)|
|branding.colors.primary| Primary color configured in the [Universal Login Settings](${manage_url}/#/login_settings) |
|branding.colors.page_background| Page background color configured in the [Universal Login Settings](${manage_url}/#/login_settings)   |
|tenant.friendly_name| [Tenant friendly name](/dashboard/reference/settings-tenant#basic-settings) |
|tenant.support_email| [Tenant support email](/dashboard/reference/settings-tenant#basic-settings)  |
|tenant.support_url| [Tenant support url](/dashboard/reference/settings-tenant#basic-settings) |
|prompt.name| The name of the Universal Login prompt being rendered |
|prompt.screen.name| The name of the Universal Login screen being rendered |
|prompt.screen.custom_text| Localized text for the all the strings displayed in the page. [Read more](/universal-login/text-customization) |

By using these variables you can support scenarios like:

* Render different content depending on the Application (e.g. you own two brands that need a different design).
* Render different content depending on the Prompt (e.g. in the Login page you want to add content explaining what the application does, but in the MFA flow, you prefer to only have the MFA box).
* Add a footer with links to the tenant's support page or email.

## Page Templates API

To set the Page Template you need to use the Management API. You first need to get a Management API token with the "update:branding","read:branding","delete:branding" scopes.

{
    "method": "PUT",
    "url": "${account.namespace}/api/v2/branding/templates/universal-login",
    "headers": [
      { "name": "Authorization", "value": "Bearer MGMT_API_ACCESS_TOKEN" },
      { "name":  "Content-Type", "value": "text/html" }
    ],
    "postData" : {
      "mimeType": "text/html",
      "text": "{\"user_metadata\": {\"displayName\": \"J-vald3z\"}"
    }
}


{
    "method": "PUT",
    "url": ",
    "headers": [
      { "name": "Authorization", "value": "Bearer MGMT_API_ACCESS_TOKEN" },
      { "name":  "Content-Type", "value": "text/html" }
    ],
    "postData" : {
      "mimeType": "text/html",
      "text": "{\"user_metadata\": {\"displayName\": \"J-vald3z\"}"
    }
}

```har
{
  "method": "POST",
  "url": "https://${account.namespace}/api/v2/branding/templates/universal-login",
  "headers": [
    { "name": "Authorization", "value": "Bearer MGMT_API_ACCESS_TOKEN" },
    { "name":  "Content-Type", "value": "text/html" }
  ],
  "postData": {
    "mimeType": "application/json",
    "text": "{\"client_name\":\"My Dynamic Application\",\"redirect_uris\": [\"https://application.example.com/callback\", \"https://application.example.com/callback2\"]}"
  }
}
```

