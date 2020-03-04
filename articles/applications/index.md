---
description: Understand the basics of creating and using Auth0 Applications.
topics:
  - applications
contentType: 
    - concept
useCase:
  - build-an-app
---
# Applications in Auth0

The term *application* or *app* in Auth0 does not imply any particular implementation characteristics. For example, it could be a native app that executes on a mobile device, a single-page app that executes on a browser, or a regular web app that executes on a server.

Auth0 categorizes apps based on these characteristics:

* **What type of app is it?**: To add authentication to your app, you must register it in the Auth0 Dashboard and select from one of the following app types: 
  - [Regular web app](/dashboard/guides/applications/register-app-regular-web): Traditional web apps that perform most of their application logic on the server (such as Express.js or ASP.NET).
  - [Single-page app (SPA)](/dashboard/guides/applications/register-app-spa): JavaScript apps that perform most of their user interface logic in a web browser, communicating with a web server primarily using APIs (such as AngularJS + Node.js or React).
  - [Native app](/dashboard/guides/applications/register-app-native): Mobile or Desktop apps that run natively in a device (such as iOS or Android).
  - [Machine-to-machine (M2M) app](/dashboard/guides/applications/register-app-m2m): Non-interactive apps, such as command-line tools, daemons, IoT devices, or services running on your back-end. Typically, you use this option if you have a service that requires access to an API.

* **Can the app securely hold credentials?**: According to the [OAuth 2.0 spec](https://tools.ietf.org/html/rfc6749#section-2.1), apps can be classified as either *public* or *confidential*; confidential apps can hold credentials securely, while public apps cannot. See [Confidential and Public Applications](/applications/concepts/app-types-confidential-public) for details.

* **Who owns the app?**: Whether an app is classified as first- or third-party depends on the app ownership and control. First-party apps are controlled by the same organization or person that owns the Auth0 domain. Third-party apps enable external parties or partners to securely access protected resources behind your API. See [First-Party and Third-Party Applications](/applications/concepts/app-types-first-third-party) for details.

## Manage app settings

You register apps on the [Dashboard > Applications > Settings](${manage_url}/#/applications/${account.clientId}/settings) page. See [Application Settings](/dashboard/reference/settings-application) for details.

In addition to setting up apps in the Dashboard, you can also set up apps programmatically as described in the [OpenID Connect (OIDC) Dynamic Client Registration 1.0 ](https://openid.net/specs/openid-connect-registration-1_0.html) specification. See [Dynamic Client Registration](/api-auth/dynamic-client-registration) for details.

::: panel Multi-Tenancy
You can set up up a more complex configuration that allows users to log in differently for different apps. See [Using Auth0 to Secure Your Multi-Tenant Applications](/design/using-auth0-with-multi-tenant-apps) and [Create Multiple Tenants](/dashboard/guides/tenants/create-multiple-tenants).
:::

By default, Auth0 enables all connections associated with your tenant when you create a new application. To change this, [update application connections](/dashboard/guides/applications/update-app-connections) in the Application Settings in the Dashboard.

## Monitor apps

You can [monitor apps](/monitoring/guides/monitor-applications) and perform end-to-end testing using your own tests. Auth0 stores [log data](/logs) including Dashboard administrator actions, successful and failed user authentications, and password change requests. You can use Auth0 [Extensions](/extensions) to export your log data and use tools like Sumo Logic, Splunk, or Loggly to analyze and store your log data. 

## Remove apps

You can [remove an application using the Auth0 Dashboard](/dashboard/guides/applications/remove-app) or the [Management API](/api/management/guides/applications/remove-app).

## Manage client secrets

You can [rotate an app's Client Secret](/dashboard/guides/applications/rotate-client-secret) using the Auth0 Dashboard or the [Management API](/api/management/guides/applications/rotate-client-secret).

## Grant types

Auth0 provides many different authentication and authorization grant types or *flows* and allows you to indicate which grant types are appropriate based on the `grant_types` property of your Auth0-registered app. See [Application Grant Types](/applications/concepts/application-grant-types) for more details.
