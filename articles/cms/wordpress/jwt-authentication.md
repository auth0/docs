---
description: Explains how to install the WordPress JWT Authentication and integration with the Auth0 plugin.
---

# Wordpress JWT Authentication

Auth0 provides a plugin to enable JWT authentication for your APIs. It is compatible with any API that uses the `determine_current_user` function to retrieve the logged in user (such as [WP REST API](https://wordpress.org/plugins/json-rest-api/)).

## Installation

1. Install **WordPress JWT Authentication** from the WordPress Store or download the zip file from [WordPress JWT Authentication](https://wordpress.org/plugins/wp-jwt-auth/) and upload the `wp-jwt-auth` folder to the `/wp-content/plugins/` directory your WordPress installation.
2. Activate the plugin through the **Plugins** menu in WordPress.

### Settings

- **Aud:** Usually your *Client Id*. Verifies that the token was intended for you.
- **Secret:** Your *Client Secret*. Verifies the token signature.
- **Base64 Secret Encoded:** If enabled, encodes the secret in based64.
- **User Repository:** Empty by default. If empty, the plugin checks for a user whose `User Property` matches the `JWT Attribute` defined in each field. You can create a custom *User Repository* by implementing a static method called `getUser` to receive the decoded JWT and return a `WP_User` instance.

## Integration with Auth0 plugin

If the WordPress JWT Authentication plugin is installed and enabled, the latest version of the Auth0 plugin will give you the option to configure the WordPress plugin automatically, setting your *client id*, *client secret* and the *Auth0 User Repository*.

## Authenticating requests

To authenticate a request using JWT, add an `Authorization` header to the request:

```txt
Authorization: Bearer YOUR-TOKEN
```

for example:

```txt
Authorization: Bearer eyJhbGciOiJIUzIsNiIsInR5cCI6IkpXVCJ9.eyJjb250ZW50IjoiVGhpcyBpcyB5b3VyIHVzZXIgSldUIHByb3ZpZGVkIGJ5IHRoZSBBdXRoMCBzZXJ2rXIifQ.b47GoWoY_5n4jIyGghPTLFEQtSegnVydcvl6gpWNeUE
```

## Resources

- [Cookies vs Tokens. Getting auth right with Angular.JS](https://auth0.com/blog/2014/01/07/angularjs-authentication-with-cookies-vs-token/)
- [10 Things You Should Know about Tokens](https://auth0.com/blog/2014/01/27/ten-things-you-should-know-about-tokens-and-cookies/)
