---
description: Learn to register and configure regular web applications using the Auth0 Dashboard.
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
# Register a Regular Web Application

To integrate Auth0 with a traditional web application running on a server with the ability to refresh its pages (e.g., ASP.NET, Java, Ruby on Rails, Node.js), you must first register your app as a Regular Web App.

<%= include('./_configure', { application_type: 'regular web', application_type_create: 'Regular Web Apps' }) %>

## Settings

By default, most of the settings will be created for you. You can explore all available settings at [Dashboard Reference: Application Settings](/dashboard/reference/settings-application). 

### Advanced Settings

By default, most of the settings will be created for you. However, for a regular web application, you must:

- Be sure that **Trust Token Endpoint IP Header** is enabled to protect against brute-force attacks on the token endpoint.

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
