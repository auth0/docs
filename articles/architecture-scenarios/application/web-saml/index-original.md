# Regular Web App (using SAML)

![](/media/articles/architecture-scenarios/web-saml.png)

In this scenario you have a traditional web application which needs to authenticate users using SAML 2.0.

The end result of the SAML flow after the user successfully authenticates is a POST call containing the SAML response to a server-side endpoint (or callback) in the Client. The response contains SAML assertions about the user.

The Client therefore needs a SAML library that is capable of:

* Processing the response
* Validating the user
* Creating the local login session (which is usually stored using cookies)

::: note
In this scenario, Auth0 returns an Access Token. However, the token is rarely used, because there is no API against which the user needs to be authenticated.
:::

## Read More

The following is a list of articles on this website which will help you to implement this scenario:

* [Lock](/libraries/lock)
* [SAML](/saml-configuration)
