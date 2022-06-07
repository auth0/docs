<!--markdownlint-disable MD002 MD041 -->

## Configure Auth0 {{{ data-action=configure }}}

To use Auth0 services, you need to have an application set up in the Auth0 Dashboard. The Auth0 application is where you will configure how you want authentication to work for your project.

:::note
Throughout this article, `YOUR_PACKAGE_ID` is your application's package ID. This can be found and configured in the `appId` field in your `capacitor.config.ts` file. See [Capacitor's Config schema](https://capacitorjs.com/docs/config#schema) for more info.
:::

### Configure an application

Use the interactive selector to create a new Auth0 application or select an existing application that represents the project you want to integrate with. Every application in Auth0 is assigned an alphanumeric, unique client ID that your application code will use to call Auth0 APIs through the SDK.

Any settings you configure using this quickstart will automatically update for your application in the <a href="${manage_url}/#/">Dashboard</a>, which is where you can manage your applications in the future.

If you would rather explore a complete configuration, you can view a sample application instead.

### Configure Callback URLs

A callback URL is a URL in your application that you would like Auth0 to redirect users to after they have authenticated. If not set, users will not be returned to your application after they log in.

::: note
If you are following along with our sample project, set this to `YOUR_PACKAGE_ID://${account.namespace}/capacitor/YOUR_PACKAGE_ID/callback`
:::

### Configure Logout URLs

A logout URL is a URL in your application that you would like Auth0 to redirect users to after they have logged out. If not set, users will not be able to log out from your application and will receive an error.

::: note
If you are following along with our sample project, set this to `YOUR_PACKAGE_ID://${account.namespace}/capacitor/YOUR_PACKAGE_ID/callback`.
:::

### Configure Allowed Origins

To be able to make requests from your native application to Auth0, set the following **Allowed Origins** in your [Application Settings](${manage_url}/#/applications/${account.clientId}/settings).

::: note
If you are following along with our sample project, set this to `capacitor://localhost, http://localhost` for iOS and Android respectively.
:::

Lastly, be sure that the **Application Type** for your application is set to **Native** in the [Application Settings](${manage_url}/#/applications/${account.clientId}/settings).
