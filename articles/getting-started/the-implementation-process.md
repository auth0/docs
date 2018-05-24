---
description: Roadmap of what you need to do to add authentication to your app and secure your APIs with Auth0
toc: true
public: false
tags:
  - auth0-101
  - auth0-basics
---
# The Implementation Process - UNDER CONSTRUCTION

## Integrate Auth0 with your Application

The default [protocol](/protocols) between your application and Auth0 is [OpenID Connect](/protocols/oidc), a modern, lightweight, simple to use, and simple to integrate protocol.

<%= include('../_includes/_pipeline2') %>

Auth0 ships [SDKs for all major platforms](/support/matrix#sdks) (.NET, Java, PHP, Python, node, iOS, and many more), but the use of Auth0 SDKs is not required. Virtually anything able to send HTTP requests can integrate with Auth0.

Auth0 also supports other common identity protocols, such as [WS-Federation](/protocols/ws-fed) and [SAML](/protocols/saml). Applications that are already "claims enabled" can easily connect to Auth0.

The **best** solution for integrating Auth0 with your application is to use Auth0's [Universal Login](/hosted-pages/login). Using Universal Login is a much less complicated process, and circumvents the dangers of cross-origin authentication. Universal Login uses the [Lock](/libraries/lock) widget to allow your users to authenticate by default, but has other starting templates as well. You can customize the login page in the [Dashboard](${manage_url}/#/login_page).

## Access your APIs

Auth0's [API authorization](/api-auth) features allow you to manage the authorization requirements for server-to-server and client-to-server applications, using the [OAuth 2.0 protocol](/protocols/oauth2). Using Auth0, you can easily support [different flows](/api-auth/which-oauth-flow-to-use) in your own APIs without worrying about the OAuth 2.0/OpenID Connect specification, or the many other technical aspects of API authorization.
