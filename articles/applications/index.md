---
description: Understand the basics of creating and using Auth0 Applications.
classes: topic-page
topics:
  - applications
contentType: 
    - index
    - concept
useCase:
  - build-an-app
---
# Applications

Applications are primarily meant for human interaction as opposed to APIs, which provide data to applications through a standardized messaging system.

Auth0 categorizes apps based on these three characteristics:

* **What type of app it is**: To add authentication to your app, you must register it in the Auth0 Dashboard and select from one of the following [app types](/applications/concepts/app-types-auth0): 
  - [Regular web app](/dashboard/guides/applications/register-app-regular-web)
  - [Single-page app (SPA)](/dashboard/guides/applications/register-app-spa)
  - [Native app](/dashboard/guides/applications/register-app-native)
  - [Machine-to-machine (M2M) app](/dashboard/guides/applications/register-app-m2m) 

* **Whether the app can securely hold credentials**: According to the [OAuth 2.0 spec](https://tools.ietf.org/html/rfc6749#section-2.1), apps can be classified as either *public* or *confidential*. Confidential apps can hold credentials securely, while public apps cannot. See [Confidential and Public Applications](/applications/concepts/app-types-confidential-public) for details.

* **Who owns the app**: Whether an app is classified as first- and third-party depends on the app ownership and control. First-party apps are controlled by the same organization or person that owns the Auth0 domain. Third-party apps enable external parties or partners to securely access protected resources behind your API. See [First-Party and Third-Party Applications](/applications/concepts/app-types-first-third-party) for details.

In addition to setting up apps in the Dashboard, you can also set up apps programmatically as described in the [OpenID Connect (OIDC) Dynamic Client Registration 1.0 specification](https://openid.net/specs/openid-connect-registration-1_0.html). See [Dynamic Client Registration](/api-auth/dynamic-client-registration) for details.

::: panel Multi-Tenancy
You can set up up a more complex configuration that allows users to log in differently for different apps. See [Using Auth0 to Secure Your Multi-Tenant Applications](/design/using-auth0-with-multi-tenant-apps) and [Create Multiple Tenants](/dashboard/guides/tenants/create-multiple-tenants).
:::

## Monitor apps

You can [monitor apps](/monitoring/guides/monitor-applications) and perform end-to-end testing using your own tests. 

Auth0 stores [log data](/logs) for Dashboard administrator actions, successful and failed user authentications, and password change requests. You can use Auth0 [Extensions](/extensions) to export your log data and use tools like Sumo Logic, Splunk, or Loggly to analyze and store your log data. 

## Remove apps

You can [remove an application using the Auth0 Dashboard](/dashboard/guides/applications/remove-app) or the [Management API](/api/management/guides/applications/remove-app).

## Manage client secrets

You can [rotate an app's Client Secret](/dashboard/guides/applications/rotate-client-secret)  using the Auth0 Dashboard or the [Management API](/api/management/guides/applications/rotate-client-secret)

## Grant types

Auth0 provides many different authentication and authorization grant types or *flows* and allows you to indicate which grant types are appropriate based on the `grant_types` property of your Auth0-registered app. See [Application Grant Types](/applications/concepts/application-grant-types) for more details.
