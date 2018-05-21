---
description: Explains the basics of creating and using Auth0 Applications.
toc: true
tags:
  - applications
---
# Applications

An Auth0 **application** represents your application and allows use of Auth0 for authentication. The term application does not imply any particular implementation characteristics. Your application can be a native app that executes on a mobile device, a single page app that executes on a browser, or a regular web app that executes on a server.

## Application Types

::: note
Auth0 differentiates between [public and private applications](/applications/application-types#confidential-vs-public-applications), as well as [first- vs. third-party applications](/applications/application-types#first-vs-third-party-applications).
:::

There are four application types in Auth0. Depending on which type you choose, you'll see [different settings you can configure](/applications/application-settings).

- **Native**: Used for mobile, desktop or hybrid apps, than run natively in a device, like Android, Ionic or iOS. For a complete listing of the SDKs Auth0 offers for mobile apps refer to: [Native SDKs](/quickstart/native).

- **Single Page Web Applications**: Used for JavaScript front-end apps that run on a browser, like Angular, jQuery or React. For a complete listing of the SDKs Auth0 offers for SPAs refer to: [Single Page App SDKs](/quickstart/spa).

- **Regular Web Applications**: Used for traditional web applications that run on a server, like ASP .NET, Java or Node.js. For a complete listing of the SDKs Auth0 offers for Web Apps refer to: [Web App SDKs](/quickstart/webapp).

- **Machine to Machine Applications**: Used for server to server applications like CLIs, daemons or services running on your backend. Typically you would use this option if you have a service that requires access to an API.

## How to configure an Application

Navigate to the [dashboard](${manage_url}) and click on the [Applications](${manage_url}/#/applications) menu option on the left. By default, you should have one application named *Default App*. You can either configure this one or create a new one by clicking the **+ Create Application** button.

The *Create Application* windows pops open. Set a descriptive name for your application and select the application type. The application type should match your application.

![Create Application window](/media/articles/applications/create-client-popup.png)

After you set the name and application type, click **Create**.

A new application will be created and you will be redirected to this application's view that has four tabs:

- [Quick Start](${manage_url}/#/applications/${account.clientId}/quickstart): Lists all available Quick Starts, filtered by your application's type.

- [Settings](${manage_url}/#/applications/${account.clientId}/settings): Lists all the available settings for your application.

  ::: note
  Please see [Application Settings](/applications/application-settings) for detailed information.
  :::

- [Addons](${manage_url}/#/applications/${account.clientId}/addons): Add-ons are extensions associated with applications. They are typically third-party APIs used by the application(s) for which Auth0 generates Access Tokens. For more details refer to: [Addons](/applications/addons).

- [Connections](${manage_url}/#/applications/${account.clientId}/connections): Connections are sources of users. They are categorized into Database, Social and Enterprise and can be shared among different applications. For more details refer to: [Connections](/applications/connections). For a detailed list on the supported Identity Providers refer to: [Identity Providers Supported by Auth0](/identityproviders).

::: note
After creating your first application, set the environment for your tenant to: development, staging, or production. For more information refer to [Set Up Multiple Environments](/dev-lifecycle/setting-up-env#set-the-environment).
:::

## How to Delete an Application

Navigate to the [Application Settings](${manage_url}/#/applications/${account.clientId}/settings) and scroll to the end of the page. Under the *Danger Zone* section you can find the **Delete Application** button. This operation cannot be undone.

Once you click on the button a pop-up window will ask you to confirm the action. Click **Yes, delete application** to permanently remove the application.

::: note
You can also delete an application using the [DELETE /api/v2/clients/{id} endpoint](/api/management/v2#!/Clients/delete_clients_by_id) of the Management API.
:::

## Application Auditing

Auth0 stores log data of both actions taken in the dashboard by the administrators, as well as authentications made by your users. The logs include many of the actions performed by the user like failing to login to an application or requesting a password change. For more details refer to: [Logs](/logs).

If you use a third-party application for log management, like Sumo Logic, Splunk or Loggly, you can use Auth0 Extensions to export your logs there. For details on the available extensions and how to configure them refer to: [Extensions](/extensions).

## Dynamic Client Registration

You can use the Auth0 to programmatically create applications, as described in the [OIDC Dynamic Client Registration 1.0 specification](https://openid.net/specs/openid-connect-registration-1_0.html). For more details please refer to [Dynamic Client Registration](/api-auth/dynamic-client-registration).

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
