---
title: Secure a CLI with Auth0
description: How to use Auth0 to secure a CLI.
topics:
  - integrations
  - cli
contentType: how-to
useCase: 
  - integrate-saas-sso
  - cli-authentication
  - 
---

# Secure a CLI with Auth0

There are three ways to secure a CLI with Auth0 in order of most secure to least secure:

* [Device Authorization Flow](#device-authorization-flow)
* [Client Credentials Grant Flow](#client-credentials-grant-flow)
* [Resource Owner Password Grant Flow](#resource-owner-password-grant-flow) (not recommended)

The first two options are for user-based authentication, whereas the third option is only when you're attempting to authenticate the CLI client itself, which is a very rare situation.

## Device Authorization Flow

With input-constrained devices that connect to the internet, rather than authenticate the user directly, the device asks the user to go to a link on their computer or smartphone and authorize the device. This avoids a poor user experience for devices that do not have an easy way to enter text. To do this, device apps use the Device Authorization Flow (drafted in [OAuth 2.0](https://tools.ietf.org/html/draft-ietf-oauth-device-flow-15)), in which they pass along their Client ID to initiate the authorization process and get a token.

The easiest way to implement the [Device Authorization Flow](/flows/concepts/device-auth) is to follow the steps in [Call API Using Device Authorization Flow](/flows/guides/device-auth/call-api-device-auth).

## Client Credentials Grant Flow

Use the Client Credentials Grant (CCG) flow when users and downstream identity providers aren't involved and you want to authenticate based on distinct machines or devices.

If your identity provider supports sending credentials, then you should use the [Client Credentials Flow](/flows/concepts/client-credentials). For details on how to implement this, refer to [Call API Using the Client Credentials Flow](/flows/guides/client-credentials/call-api-client-credentials).

## Resource Owner Password Grant Flow

We do not recommend using the Resource Owner Password Grant (ROPG) flow for native applications. In the [RFC 8252 OAuth 2.0 for Native Apps](https://tools.ietf.org/html/rfc8252) from the Internet Engineering Task Force (IETF), it is recommended that “OAuth 2.0 authorization request from native apps should ONLY be made through external user-agents, primarily the user’s browser”. For details, see [RFC 8252 Embedded User-Agents](https://tools.ietf.org/html/rfc8252#section-8.12). There is also more information on this in our blog post [OAuth 2.0 Best Practices for Native Apps](https://auth0.com/blog/oauth-2-best-practices-for-native-apps/).

Using Resource Owner Password Grant (ROPG) are less secure than the redirect-based options described above. ROPG is only for legacy. In the context of CLIs, it only makes sense for things like connection strings where you need to support legacy programs.

::: note
If you must use ROPG in your native app instead of Device Flow as we recommend, then you can use our [OIDC compliant ROPG endpoint](/api/authentication#resource-owner-password).
:::