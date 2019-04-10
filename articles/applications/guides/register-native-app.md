---
description: Learn to register and configure native/mobile applications using the Auth0 Dashboard.
toc: true
topics:
  - applications
contentType: 
    - how-to
useCase:
  - build-an-app
  - add-login
  - call-api
---
# Register a Native/Mobile Application

To integrate Auth0 with mobile, desktop, or hybrid apps that run natively on deviced (e.g., Android, iOS, Windows, macOS), you must first register your app as a Native/Mobile App.

<%= include('./_configure', { application_type: 'native/mobile', application_type_create: 'Native Apps' }) %>

## Settings

By default, most of the settings will be created for you. You can explore all available settings at [Dashboard Reference: Application Settings](/dashboard/reference/settings-application). 

### Advanced Settings

If you're developing a mobile app, you can provide the necessary iOS/Android parameters in the Advanced Settings area:

- For iOS apps, provide your Team ID and App Bundle Identifier. For more info, see [Enable Universal Links Support in Xcode](/applications/guides/enable-universal-links-dashboard).

- For Android apps, provide your App Package Name and your Key Hashes. For more info, see [Enable Android App Links Support](/applications/guides/enable-android-app-links-dashboard).

You can explore all available settings at [Dashboard Reference: Advanced Application Settings](/dashboard/reference/settings-application#advanced-settings). 

::: note
After creating your first application, set the environment for your tenant to: development, staging, or production. For more information refer to [Set Up Multiple Environments](/dev-lifecycle/setting-up-env#set-the-environment).
:::

## Next Steps

Once you have configured your Application, some common next steps to take are:

- **Configure a Connection** and enable it for your Application. For details, refer to [Connections](/connections). For a list of the supported Identity Providers refer to [Identity Providers Supported by Auth0](/identityproviders).

- **Configure your app** to use your Auth0 Application. For detailed instructions and samples for a variety of technologies, refer to our [quickstarts](/quickstarts). There you can find information on how to implement login and logout (using [Lock](/libraries/lock) or [Auth0.js](/libraries/auth0js)), handle your user sessions, retrieve and display user profile information, add [Rules](/rules) to customize your flow, and more.

  ::: note
  For background theory on application authentication flows, refer to [Application Authentication](/application-auth).
  :::

- Use our latest [API Authorization](/api-auth) features to **call an API**.

- **Use the [Auth0 APIs](/api/info)**.

  - The [Authentication API](/api/authentication) handles all the primary identity related functions (login, logout, get user profile, and so forth). Most users consume this API through our [Quickstarts](/quickstarts), the [Auth0.js library](/libraries/auth0js) or the [Lock widget](/libraries/lock). However, if you are building all of your authentication UI manually, you will have to interact with this API directly.

  - The [Management API](/api/management/v2) can be used to automate various tasks in Auth0 such as creating users.

