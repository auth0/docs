---
description: New Universal Login UI Customization
topics:
  - login
  - universal-login
  - customization
  - hosted-pages
contentType: how-to
toc: true
useCase: customize-hosted-pages
---
# New Universal Login UI Customization

## Simple Customization

![Customization Settings for Login Page](/media/articles/universal-login/settings.png)

In the [Dashboard](${manage_url}), you can see the settings for your login page by navigating to [Universal Login](${manage_url}/#/login_setting) and looking at the Settings tab.

The settings available here are:

* Logo (recommended size: 150 x 150 pixels)
* Primary Color
* Background Color

You can also configure the favicon URL and a custom font URL using [the Branding API](/api/management/v2#!/Branding). 

## Advanced Customization with Page Templates and CSS

::: warning
This capability can only be used if the tenant has [Custom Domains](/custom-domains) enabled.
:::

You can also customize the New Universal Login pages by providing a Page Template using the [Liquid template language](https://shopify.github.io/liquid/). 

Page Templates let you define the content that is displayed around the Universal Login widgets (e.g. the Login box, the MFA box) plus a CSS that will be applied to the widgets. 

The basic structure of a Page Template would be as follows:

```html
<!DOCTYPE html>
<html>
  <head>
    {%- auth0:head -%}   <!-- Header tags that are required for the widget to render properly  -->
    <style>
       /* Your custom CSS */
    </style>
  </head>
  <body>
    {%- auth0:widget -%} <!-- The corresponding widget (Login, MFA, etc) -->
  </body>
</html>
```

Both the `auth0:widget` and the `auth0:head` tags are mandatory.

### CSS Classes

The Universal Login widgets have an HTML and CSS structure that is consistent across all of them. To prevent our customer's code to take a hard dependency on the internal HTML/CSS structure of those widgets, we defined a set of classes and properties that are safe to override. 

The class selectors that you can override are the ones that start with `_`. You will find one for each basic HTML element, for example:

  - `._input`
  - `._button`
  - `._text`
  - `._link`

You can only override the following properties:

  - Background: `background`, `background-color`, `background-image`, etc.
  - Borders: `border`, `border-radius`, etc.
  - Box Shadow: `box-shadow`
  - Color: `color`
  - Font: `font-size`, `font-family`

You can learn more in our [CSS Customization Reference](/universal-login/css-customization).

## Using the Universal Login Designer Application 

Auth0 provides a [standalone Universal Designer application](https://auth0.github.io/bumblebee/) that you can use to change the Page Template and the CSS, while previewing the changes. In the future, the tool will be integrated in the Dashboard.

![Universal Login Designer Screen](/media/articles/universal-login/ul-designer-screen.png)

You can also preview all the screens for any prompt, in any supported language:

![Universal Login Designer Prompt](/media/articles/universal-login/ul-designer-prompt.png)

It currently has the following limitations:

- You cannot change the text. To do that, you will need to use the [Text Customization API](/universal-login/text-customization).

* It's not connected to your tenant, which implies:
  - The pages will not reflect your tenant customization. For example, it will not show the tenant's connections.
  - You cannot update the Page Template in the tenant. To do that, you'll need to call the [Page Templates API](#page-templates-api)

## Page Templates Variables

Page Templates have a set of context variables that can be used to impact how the page is rendered. This allows you to implement scenarios like:

* Render different content depending on the Application (for example, you own two brands that need a different page design).
* Render different content depending on the Prompt (for example, in the Login page you want to add content explaining what the application does, but in the MFA flow, you prefer to only have the MFA box).
* Add a footer with links to the tenant's support page or email.

### Available Variables

The available variables are:

* The login page [application's settings](/dashboard/reference/settings-application#basic-settings):
    * application.id
    * application.name
    * application.logo_uri
    * application.metadata

* Universal Login [branding settings](${manage_url}/#/login_settings):
    * branding.logo_url
    * branding.colors.primary
    * branding.colors.page_background

* Tenant's [settings](/dashboard/reference/settings-tenant#basic-settings):
    * tenant.friendly_name
    * tenant.support_email
    * tenant.support_url

* Information about the current universal login screen.
    * locale: Locale used to render the login pages, matching one of the [supported tenant languages](/universal-login/i18n)
    * prompt.name: The name of the Universal Login prompt being rendered 
    * prompt.screen.name: The name of the Universal Login screen being rendered.
    * prompt.screen.texts: All the [localized texts](/universal-login/text-customization) needed in the screen being rendered.
  
  <%= include('text-customization-prompts/_prompt_definition') %>


* Information about the current user, for pages rendered after the user authenticates:
    * user.user_id
    * user.picture
    * user.email
    * user.email_verified
    * user.app_metadata
    * user.user_metadata
    * user.family_name
    * user.given_name
    * user.name
    * user.nickname
    * user.username


## Examples

### Login Box + Image Layout

The following template will show the login box to the left, and an image to the right only for the login / signup pages. The rest of the pages will look like the default ones.

```html
<!DOCTYPE html>
<html>
  <head>
    {%- auth0:head -%}
    <style>
      body {
        background-image: url("https://images.unsplash.com/photo-1592450865877-e3a318ec3522?ixlib=rb-1.2.1&auto=format&fit=crop&w=2255&q=80");
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
      }
      .prompt-wrapper {
        position: relative;
        display: flex;
        align-items: center;
        width: 480px;
        height: 100%;
        justify-content: left;
        background-color: rgb(60,60,60);
      }
    </style>
    <title>{{ prompt.screen.texts.pageTitle }}</title>
  </head>
  <body>
    {% if prompt.name == "login" or prompt.name == "signup" %} 
        <div class="prompt-wrapper">
        {%- auth0:widget -%}
        </div>
    {% else %}
        {%- auth0:widget -%}
    {% endif %}
  </body>
</html>
```
![Page Templates Layout](/media/articles/universal-login/page-templates-layout.png)

### Page Footers

The example below adds a gray footer with links to Privacy Policy and Terms of Services:

```html
<!DOCTYPE html>
<html>
  <head>
    {%- auth0:head -%}
    <style>
      body {
        background-image: radial-gradient(white, rgb(200, 200, 200));
      }
      .footer {
        background-color: rgb(120, 120, 120);
        position: absolute;
        bottom: 0;
        left: 0;
        padding: 16px 0; 
        width: 100%;
        color: white;
        /* Use a high z-index for future-proofing */
        z-index: 10;
      }
      .footer ul {
        text-align: center;
      }
      .footer ul li {
        display: inline-block;
        margin: 0 4px;
      }
      .footer ul li:not(:first-of-type) {
        margin-left: 0;
      }
      .footer ul li:not(:first-of-type)::before {
        content: '';
        display: inline-block;
        vertical-align: middle;
        width: 4px;
        height: 4px;
        margin-right: 4px;
        background-color: white;
        border-radius: 50%;
      }
      .footer a {
        color: white;
      }
    </style>
     <title>{{ prompt.screen.texts.pageTitle }}</title>
  </head>
  <body>
    {%- auth0:widget -%}
    <footer class="footer">
      <ul>
        <li><a href="https://company.com/privacy">Privacy Policy</a></li>
        <li><a href="https://company.com/terms">Terms of Service</a></li>
      </ul>
    </footer>
  </body>
</html>
```

![Page Templates Footer](/media/articles/universal-login/page-templates-footer.png)
## Page Templates API

To set the Page Template you need to use the Management API. You first need to get a Management API token with the `update:branding`,`read:branding`, `delete:branding` scopes. If you are using the 'API Explorer Application' to generate tokens, make sure those scopes are enabled for the 'Auth0 Management API'.

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

## Troubleshooting Page Templates

If the template is not being applied, check that you are navigating to `<custom_domain>/authorize`. When you navigate to `${account.namespace}/authorize` Auth0 will not render the page template.

## Combining New Universal Login and Classic Universal Login

Given the Classic Universal Login experience is still more flexible than the New Universal Login experience, you could want to combine pages from both flows. 

For example, if you want to implement Passwordless Login with MFA, you can use the 'Classic' login page for Passwordless and the 'New' MFA page for MFA, you can do so as follows:

1. Enable the New Universal Login Experience.
1. Customize the HTML page of the Login page with whatever content you want, for example, the `Auth0LockPasswordless` widget. 

In this case, users will get a customized Classic behavior login page that allows them to log in via a passwordless connection, but will get the MFA page that looks like the New Universal Login page.

Check the [Classic Universal Login customization documentation](/universal-login/customization-classic) to learn more.
