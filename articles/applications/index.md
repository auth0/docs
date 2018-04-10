---
description: Explains the basics of creating and using Auth0 Clients.
toc: true
---
# Clients

An Auth0 **client** represents your application and allows use of Auth0 for authentication. The term client does not imply any particular implementation characteristics. Your application can be a native app that executes on a mobile device, a single page app that executes on a browser, or a regular web app that executes on a server.

## Client Types

::: note
Auth0 differentiates between [public and private clients](/clients/client-types#confidential-vs-public-clients), as well as [first- vs. third-party clients](/clients/client-types#first-vs-third-party-clients).
:::

There are four client types in Auth0. Depending on which type you choose, you'll see [different settings you can configure](/clients/client-settings).

- **Native**: Used for mobile, desktop or hybrid apps, than run natively in a device, like Android, Ionic or iOS. For a complete listing of the SDKs Auth0 offers for mobile apps refer to: [Native SDKs](/quickstart/native).

- **Single Page Web Applications**: Used for JavaScript front-end apps that run on a browser, like Angular, jQuery or React. For a complete listing of the SDKs Auth0 offers for SPAs refer to: [Single Page App SDKs](/quickstart/spa).

- **Regular Web Applications**: Used for traditional web applications that run on a server, like ASP .NET, Java or Node.js. For a complete listing of the SDKs Auth0 offers for Web Apps refer to: [Web App SDKs](/quickstart/webapp).

- **Non Interactive Clients**: Used for server to server applications like CLIs, daemons or services running on your backend. Typically you would use this option if you have a service that requires access to an API.

## How to configure a Client

Navigate to the [dashboard](${manage_url}) and click on the [Clients](${manage_url}/#/clients) menu option on the left. By default, you should have one client named *Default App*. You can either configure this one or create a new one by clicking the **+ Create Client** button.

The *Create Client* windows pops open. Set a descriptive name for your client and select the client type. The client type should match your application.

![Create Client window](/media/articles/applications/create-client-popup.png)

After you set the name and client type, click **Create**.

A new client will be created and you will be redirected to this client's view that has four tabs:

- [Quick Start](${manage_url}/#/clients/${account.clientId}/quickstart): Lists all available Quick Starts, filtered by your client's type.

- [Settings](${manage_url}/#/clients/${account.clientId}/settings): Lists all the available settings for your client.

  ::: note
  Please see [Client Settings](/clients/client-settings) for detailed information.
  :::

- [Addons](${manage_url}/#/clients/${account.clientId}/addons): Add-ons are extensions associated with clients. They are typically third-party APIs used by the client(s) for which Auth0 generates Access Tokens. For more details refer to: [Addons](/clients/addons).

- [Connections](${manage_url}/#/clients/${account.clientId}/connections): Connections are sources of users. They are categorized into Database, Social and Enterprise and can be shared among different clients. For more details refer to: [Connections](/clients/connections). For a detailed list on the supported Identity Providers refer to: [Identity Providers Supported by Auth0](/identityproviders).

::: note
After creating your first client, set the environment for your tenant to: development, staging, or production. For more information refer to [Set Up Multiple Environments](/dev-lifecycle/setting-up-env#set-the-environment).
:::

## How to Delete a Client

Navigate to the [Client Settings](${manage_url}/#/clients/${account.clientId}/settings) and scroll to the end of the page. Under the *Danger Zone* section you can find the **Delete Client** button. This operation cannot be undone.

Once you click on the button a pop-up window will ask you to confirm the action. Click **Yes, delete client** to permanently remove the client.

::: note
You can also delete a client using the [DELETE /api/v2/clients/{id} endpoint](/api/management/v2#!/Clients/delete_clients_by_id) of the Management API.
:::

## Client Auditing

Auth0 stores log data of both actions taken in the dashboard by the administrators, as well as authentications made by your users. The logs include many of the actions performed by the user like failing to login to a client or requesting a password change. For more details refer to: [Logs](/logs).

If you use a third-party application for log management, like Sumo Logic, Splunk or Loggly, you can use Auth0 Extensions to export your logs there. For details on the available extensions and how to configure them refer to: [Extensions](/extensions).

## Dynamic Client Registration

You can use the Auth0 to programmatically create clients, as described in the [OIDC Dynamic Client Registration 1.0 specification](https://openid.net/specs/openid-connect-registration-1_0.html). For more details please refer to [Dynamic Client Registration](/api-auth/dynamic-client-registration).

## Next Steps

Once you have configured your Client, some common next steps to take are:

- **Configure a Connection** and enable it for your Client. For details refer to [Client Connections](/clients/connections). For a list of the supported Identity Providers refer to [Identity Providers Supported by Auth0](/identityproviders).

- **Configure your app** to use your Auth0 Client. For detailed instructions and samples for a variety of technologies, refer to our [quickstarts](/quickstarts). There you can find information on how to implement login and logout (using [Lock](/libraries/lock) or [Auth0.js](/libraries/auth0js)), handle your user sessions, retrieve and display user profile information, add [Rules](/rules) to customize your flow, and more.

  ::: note
  For background theory on client authentication flows, refer to [Client Authentication](/client-auth).
  :::

- Use our latest [API Authorization](/api-auth) features to **call an API**.

- **Use [our APIs](/api/info)**.

  - The [Authentication API](/api/authentication) handles all the primary identity related functions (login, logout, get user profile, and so forth). Most users consume this API through our [Quickstarts](/quickstarts), the [Auth0.js library](/libraries/auth0js) or the [Lock widget](/libraries/lock). However, if you are building all of your authentication UI manually you will have to interact with this API directly.

  - The [Management API](/api/management/v2) can be used to automate various tasks in Auth0 such as creating users.
