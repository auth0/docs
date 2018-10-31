## Register your Application

Go to the [Auth0 Dashboard](${manage_url}) and click on [Applications](${manage_url}/#/applications) in the left-hand navigation bar. Click **Create Application**.

The **Create Application** window will open, allowing you to enter the name of your new Application. Choose **Native** as the **Application Type**. When done, click on **Create** to proceed. By default, the Authorization Code Grant using PKCE will be enabled for your app.

::: warning
The Authorization Code flow with PKCE can only be used for Native Applications.
:::

![](/media/articles/client-auth/mobile-desktop/create-client.png)

Once Auth0 creates the Application, navigate to the Application's **Settings** tab to:

* Add the following URL to the **Allowed Callback URLs** field: `https://${account.namespace}/mobile`;
* Enable the **OIDC Conformant** Flag under the *OAuth* area of *Advanced Settings*.

Scroll to the bottom of the page and click **Save**.

![](/media/articles/client-auth/mobile-desktop/allowed-callback-url.png)
