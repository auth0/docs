---
description: Explains how to install the WordPress JWT Authentication and integration with the Auth0 plugin.
tags:
    - wordpress
    - cms
---

# WordPress JWT Authentication

::: warning
The WordPress JWT Authentication plugin is deprecated and will no longer be updated by Auth0.
:::

Auth0 provides a plugin to enable [JWT](/jwt) authentication for your APIs. It is compatible with any API that uses the `determine_current_user` function to retrieve the logged in user (such as [WP REST API](https://wordpress.org/plugins/json-rest-api/)).

## Installation

You can install the plugin using either of the following methods:

1. Install **WordPress JWT Authentication** from the WordPress Store;
2. Download the zip file from [WordPress JWT Authentication](https://wordpress.org/plugins/wp-jwt-auth/) and upload the `wp-jwt-auth` folder to the `/wp-content/plugins/` directory your WordPress installation.

After installation, activate the plugin through the **Plugins** menu in WordPress.

## Configure the Plugins' Settings

After you've activated your plugin, provide the following values for your Auth0 account:

- **Aud:** Usually your *Client Id*. Verifies that the token was intended for you.
- **Secret:** Your *Client Secret*. Verifies the token signature.
- **Base64 Secret Encoded:** If enabled, encodes the secret in based64.
- **User Repository:** Empty by default. If empty, the plugin checks for a user whose `User Property` matches the `JWT Attribute` defined in each field. You can create a custom *User Repository* by implementing a static method called `getUser` to receive the decoded JWT and return a `WP_User` instance.

## Integration with the Auth0 WordPress plugin

If you've also installed and enabled the latest version of the [Auth0 WordPress Plugin](/cms/wordpress/how-does-it-work), you can opt to configure the Auth0 WordPress plugin automatically, which sets your *client id*, *client secret* and the *Auth0 User Repository*.

## Authenticating requests

To authenticate a request using JWT, add an `Authorization` header to the request:

```txt
Authorization: Bearer YOUR-TOKEN
```

for example:

```txt
Authorization: Bearer eyJhbGciOiJIUzIsNiIsInR5cCI6IkpXVCJ9.
eyJjb250ZW50IjoiVGhpcyBpcyB5b3VyIHVzZXIgSldUIHByb3ZpZGVkIG
J5IHRoZSBBdXRoMCBzZXJ2rXIifQ.b47GoWoY_5n4jIyGghPTLFEQtSegn
Vydcvl6gpWNeUE
```

## Resources

- [Cookies vs Tokens. Getting auth right with Angular.JS](https://auth0.com/blog/2014/01/07/angularjs-authentication-with-cookies-vs-token/)
- [10 Things You Should Know about Tokens](https://auth0.com/blog/2014/01/27/ten-things-you-should-know-about-tokens-and-cookies/)

## Keep Reading

More information on the Login by Auth0 WordPress plugin:

::: next-steps
* [How does it work?](/cms/wordpress/how-does-it-work)
* [Install the plugin](/cms/wordpress/installation)
* [Configure the plugin](/cms/wordpress/configuration)
* [Troubleshooting](/cms/wordpress/troubleshoot)
* [Extend the plugin](/cms/wordpress/extending)
:::
