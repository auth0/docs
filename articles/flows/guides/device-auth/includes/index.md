::: note
This tutorial will help you call your own API from an input-constrained device using the Device Authorization Flow. If you want to learn how the flow works and why you should use it, see <a href="/flows/concepts/device-auth" target="_blank" rel="noreferrer">Device Authorization Flow</a>.
:::

Auth0 makes it easy for your app to implement the Device Authorization flow using:

* Authentication API: Keep reading to learn how to call our API directly. For an interactive experience, see our <a href="https://auth0.github.io/device-flow-playground/" target="_blank" rel="noreferrer">Device Flow Playground</a>.

## Prerequisites

**Before beginning this tutorial:**

* Check [limitations](#limitations) to be sure the Device Authorization flow is suitable for your implementation.

* <a href="/dashboard/guides/applications/register-app-native" target="_blank" rel="noreferrer">Register the Application with Auth0</a>. 
  * Select an **Application Type** of **Native**.
  * If necessary, set **Allowed Web Origins**. You can use this to allow localhost as an origin for local development, or to set an allowed origin for specific TV software with architecture subject to CORS (eg: HTML5 + JS). Most applications will not use this setting.
  * Ensure that the **OIDC Conformant** toggle is enabled. This setting is in the <a href="${manage_url}" target="_blank" rel="noreferrer">Dashboard</a> under **Application Settings > Advanced > OAuth**.
  * Make sure the Application's <a href="/dashboard/guides/applications/update-grant-types" target="_blank" rel="noreferrer">**Grant Types**</a> include **Device Code**. This is also in the <a href="${manage_url}" target="_blank" rel="noreferrer">Dashboard</a>, under **Application Settings > Advanced > Grant Types**.
  * If you want your Application to be able to use <a href="/tokens/concepts/refresh-tokens" target="_blank" rel="noreferrer">Refresh Tokens</a>, make sure the Application's <a href="/dashboard/guides/applications/update-grant-types" target="_blank" rel="noreferrer">**Grant Types**</a> include **Refresh Token**.

* Set up and enable at least one connection for the Application: <a href="/dashboard/guides/connections/set-up-connections-database" target="_blank" rel="noreferrer">Database connections</a>, <a href="/dashboard/guides/connections/set-up-connections-social" target="_blank" rel="noreferrer">Social connections</a>

* <a href="/architecture-scenarios/mobile-api/part-2#create-the-api" target="_blank" rel="noreferrer">Register your API with Auth0</a>
  * If you want your API to receive <a href="/tokens/concepts/refresh-tokens" target="_blank" rel="noreferrer">Refresh Tokens</a> to allow it to obtain new tokens when the previous ones expire, enable **Allow Offline Access**.

* <a href="/dashboard/guides/tenants/configure-device-user-code-settings" target="_blank" rel="noreferrer">Configure Device User Code Settings</a> to define the character set, format, and length of your randomly-generated user code.

## Steps

1. [Request device code](#request-device-code) (Device Flow): Request a device code that the user can use to authorize the device.
2. [Request device activation](#request-device-activation) (Device Flow): Request that the user authorize the device using their laptop or smartphone.
3. [Request Tokens](#request-tokens) (Device Flow): Poll the token endpoint to request a token.
4. [User authorization](#user-authorization) (Browser Flow): The user authorizes the device, so the device can receive tokens.
5. [Receive Tokens](#receive-tokens) (Device Flow): After the user successfully authorizes the device, receive tokens.
6. [Call your API](#call-your-api) (Device Flow): Use the retrieved Access Token to call your API.
7. [Refresh Tokens](#refresh-tokens) (Device Flow): Use a Refresh Token to request new tokens when the existing ones expire.

Optional: [Explore Sample Use Cases](#sample-use-cases)

Optional: [Troubleshooting](#troubleshooting)

<%= include('./request-device-code') %>

<%= include('./request-device-activation') %>

<%= include('./request-tokens') %>

<%= include('./user-authorization') %>

<%= include('./receive-tokens') %>

<%= include('./call-api') %>

<%= include('./refresh-tokens') %>

<%= include('./sample-use-cases-call-api') %>

<%= include('./troubleshooting') %>

## Keep reading

- <a href="/protocols/oauth2" target="_blank" rel="noreferrer">The OAuth 2.0 protocol</a>
- <a href="/protocols/oidc" target="_blank" rel="noreferrer">The OpenID Connect protocol</a>
- <a href="/tokens" target="_blank" rel="noreferrer">Tokens</a>
- <a href="/logs" target="_blank" rel="noreferrer">Tenant Logs for Devices</a>
