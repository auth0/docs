---
description: Explains the basics of creating and using Auth0 Applications.
toc: true
topics:
  - applications
contentType: 
    - index
    - reference
    - how-to
    - concept
useCase:
  - build-an-app
---
# Applications

Applications are primarily meant for human interaction, as opposed to APIs, which provide data to applications through a standardized messaging system.

The term application does not imply any particular implementation characteristics. Your application can be a native app that executes on a mobile device, a single page app that executes on a browser, or a regular web app that executes on a server.


## Applications in Auth0

To add authentication to your application, you must first register it with Auth0 and select an application type. Auth0 recognizes four application types:

- **Native/Mobile Apps**: Mobile, desktop, or hybrid apps that run natively in a device (e.g., Android, iOS, Ionic, Windows, OS/X). Learn to [configure your Native/Mobile App using the Dashboard](/applications/native).

- **Single Page Apps (SPAs)**: JavaScript front-end applications that run in a browser (e.g., Angular, jQuery, React). Learn to [configure your Single Page App using the Dashboard](/applications/spa).

- **Regular Web Apps**: Traditional web applications that run on a server (e.g., ASP .NET, Java, Ruby on Rails, Node.js). Learn to [configure your Regular Web App using the Dashboard](/applications/webapps).

- **Machine-to-Machine (M2M) Apps**: Non-interactive applications, such as command-line tools, daemons, IoT devices, or services running on your back-end. Typically, you use this option if you have a service that requires access to an API. Learn to [configure your M2M App using the Dashboard](/applications/machine-to-machine).



::: note
After creating your first application, set the environment for your tenant to: development, staging, or production. For more information refer to [Set Up Multiple Environments](/dev-lifecycle/setting-up-env#set-the-environment).
:::

Auth0 also differentiates between [public and private applications](/applications/application-types#confidential-vs-public-applications), as well as [first- vs. third-party applications](/applications/application-types#first-vs-third-party-applications).


## Application Auditing

Auth0 stores log data of both actions taken in the dashboard by the administrators, as well as authentications made by your users. The logs include many of the actions performed by the user like failing to login to an application or requesting a password change. For more details refer to: [Logs](/logs).

If you use a third-party application for log management, like Sumo Logic, Splunk or Loggly, you can use Auth0 Extensions to export your logs there. For details on the available extensions and how to configure them refer to: [Extensions](/extensions).



## Next Steps

Once you have configured your Application, some common next steps to take are:

- **Configure a Connection** and enable it for your Application. For details refer to [Application Connections](/applications/connections). For a list of the supported Identity Providers refer to [Identity Providers Supported by Auth0](/identityproviders).

- **Configure your app** to use your Auth0 Application. For detailed instructions and samples for a variety of technologies, refer to our [quickstarts](/quickstarts). There you can find information on how to implement login and logout (using [Lock](/libraries/lock) or [Auth0.js](/libraries/auth0js)), handle your user sessions, retrieve and display user profile information, add [Rules](/rules) to customize your flow, and more.

  ::: note
  For background theory on application authentication flows, refer to [Application Authentication](/application-auth).
  :::

- Use our latest [API Authorization](/api-auth) features to **call an API**.

- **Use [our APIs](/api/info)**.

  - The [Authentication API](/api/authentication) handles all the primary identity related functions (login, logout, get user profile, and so forth). Most users consume this API through our [Quickstarts](/quickstarts), the [Auth0.js library](/libraries/auth0js) or the [Lock widget](/libraries/lock). However, if you are building all of your authentication UI manually you will have to interact with this API directly.

  - The [Management API](/api/management/v2) can be used to automate various tasks in Auth0 such as creating users.
  
  ## Keep reading
  * [Remove an Application using the Dashboard](/applications/guides/remove-application-dashboard)
  * [Remove an Application using the Management API](/applications/guides/remove-application-mgmt-api)
  * Auth0 allows you to programmatically create applications, as described in the [OIDC Dynamic Client Registration 1.0 specification](https://openid.net/specs/openid-connect-registration-1_0.html). See [Dynamic Client Registration](/api-auth/dynamic-client-registration).
