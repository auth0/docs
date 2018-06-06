---
title: IdP-Initiated SSO
description: How to setup SAML Identity Provider initiated SSO.
tags:
  - saml
  - sso
---

# IdP-Initiated SSO

**Beginning with auth0.js v9.3.4, you must [enable the impersonation flags](/user-profile/user-impersonation#enable-impersonation) to use IdP-initiated login.**

<%= include('../../_includes/_deprecate-impersonation.md') %>

To setup IdP-Initiated SSO, go to the [Enterprise Connections](${manage_url}/#/connections/enterprise) section of the dashboard and choose **SAMLP Identity Provider**. Under the **Settings** section you can see the configuration for IdP-Initiated SSO.

![](/media/articles/protocols/saml/idp-init-sso.png)

**Default Application:** When the IdP initiated login succeeds this is the application where users are routed. This setting shows available applications enabled for this connection. Select the application from the dropdown that you want the users to login with IdP initiated. Only one application can be selected for an IdP-initiated login per SAML connection.

**Response Protocol:** This is the protocol used to connect your selected **Default Application**. Most commonly applications are configured with the OpenID Connect protocol. However if you have configured a SAML2 Web App addon for your application and want to route the SAML assertion you will need to select SAML.

**Query String:** Query string options help to customise the behavior when the OpenID Connect protocol is used. You can set multiple options similar to setting parameters with a [query string](https://en.wikipedia.org/wiki/Query_string). You can set:

* `redirect_uri`: When the IdP-initiated login has completed the request is then redirected to the first URL listed in the **Allowed Callback URLs** for the application. However if you set a `redirect_uri` the IdP will redirect to this URL. This brings flexibility for cases like when you have set subdomain scheme with a wildcard and you only want to redirect to one specific subdomain.
* `scope`: You could define [scopes](/scopes) for the ID Token sent. Note that it is possible to set multiple scopes.
* `response_type`: This field is used to set the token for Implicit Grant Flow for SPA applications. You could set code for Authorization Code Grant Flow for regular web applications.

Example Query String:

`redirect_uri=https://jwt.io&scope=openid email&response_type=token`

## Post-back URL

When using **IdP-Initiated SSO**, please make sure to include the `connection` parameter in the post-back URL: `https://${account.namespace}/login/callback?connection=YOUR_CONNECTION_NAME`