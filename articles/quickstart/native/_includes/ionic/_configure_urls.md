<!--markdownlint-disable MD002 MD041 -->

<%= include('../../../../_includes/_callback_url') %>

:::note
Throughout this article, `YOUR_PACKAGE_ID` is your application's package ID. This can be found and configured in the `appId` field in your `capacitor.config.ts` file. See <a href="https://capacitorjs.com/docs/config#schema" target="_blank">Capacitors Config schema</a> for more info.
:::

Go to the <a href="$manage_url/#/applications/$account.clientId/settings" target="_blank">Application Settings</a> section in your Auth0 dashboard and set your **Callback URL** in the **Allowed Callback URLs** box.

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

To be able to make requests from your application to Auth0, set the following **Allowed Origins** in your <a href="$manage_url/#/applications/$account.clientId/settings" target="_blank">Application Settings</a>.

```bash
capacitor://localhost, http://localhost
```

These origins are required for iOS and Android respectively.

Lastly, be sure that the **Application Type** for your application is set to **Native** in the <a href="$manage_url/#/applications/$account.clientId/settings" target="_blank">Application Settings</a>.