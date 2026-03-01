<!--markdownlint-disable MD002 MD041 -->

<%= include('../../../../_includes/_callback_url') %>

:::note
Throughout this article, `YOUR_PACKAGE_ID` is your application's package ID. This can be found and configured in the `appId` field in your `capacitor.config.ts` file. See [Capacitor's Config schema](https://capacitorjs.com/docs/config#schema) for more info.
:::

Go to the [Application Settings](${manage_url}/#/applications/${account.clientId}/settings) section in your Auth0 dashboard and set your **Callback URL** in the **Allowed Callback URLs** box.

You should set the **Allowed Callback URL** to:

```bash
YOUR_PACKAGE_ID://${account.namespace}/capacitor/YOUR_PACKAGE_ID/callback
```

<%= include('../../../../_includes/_logout_url') %>

You should set the **Allowed Logout URLs** to

```bash
YOUR_PACKAGE_ID://${account.namespace}/capacitor/YOUR_PACKAGE_ID/callback
```

### Configure Origins

To be able to make requests from your application to Auth0, set the following **Allowed Origins** in your [Application Settings](${manage_url}/#/applications/${account.clientId}/settings).

```bash
capacitor://localhost, http://localhost
```

These origins are required for iOS and Android respectively.

Lastly, be sure that the **Application Type** for your application is set to **Native** in the [Application Settings](${manage_url}/#/applications/${account.clientId}/settings).