# Wordpress JWT Authentication

Auth0 provides also a plugin to enable JWT authentication for APIs.

It overrides the standard `determine_current_user` function and it is compatible with any API that uses it to retrieve the logged user like [WP-Api](https://wordpress.org/plugins/json-rest-api/).

## Setup

- Aud: it is usually your client id. It is used to check if the token was intended to you
- Secret: it is used to verify the token signature
- Base64 Secret Encoded: enable the secret is based64 encoded
- User Repository: by default it is empty. If this is the case, the plugins check for a user that matches its `User Property` with the `JWT Attribute` defined in each field. Also, you are able to create a custom User Repository that needs to implement a static method called `getUser` which receives the decoded JWT and should return `WP_User` instance.

## Integration with Auth0 plugin

The latest version of the Auth0 plugin will detect if the wp-jwt-auth plugin is installed and enabled, and will give you the option of configure it for you. In this case, will set up your client id, client secret and the Auth0 User Repository.

## Authenticating requests

To authenticate the request using JWT, you need to add an `Authorization` header to your requests

```
Authorization: Bearer YOUR-TOKEN
```

For example

```
Authorization: Bearer eyJhbGciOiJIUzIsNiIsInR5cCI6IkpXVCJ9.eyJjb250ZW50IjoiVGhpcyBpcyB5b3VyIHVzZXIgSldUIHByb3ZpZGVkIGJ5IHRoZSBBdXRoMCBzZXJ2rXIifQ.b47GoWoY_5n4jIyGghPTLFEQtSegnVydcvl6gpWNeUE
```

## Resources

- [Cookies vs Tokens. Getting auth right with Angular.JS](https://auth0.com/blog/2014/01/07/angularjs-authentication-with-cookies-vs-token/)
- [10 Things You Should Know about Tokens](https://auth0.com/blog/2014/01/27/ten-things-you-should-know-about-tokens-and-cookies/)
