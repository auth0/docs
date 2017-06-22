## Configure Callback URLs

Callback URLs are the URLs that Auth0 invokes after the authentication process. Auth0 routes your application back to this URL and appends additional parameters to it, including a token. Since callback URLs can be manipulated, you will need to add your application's URL to your client's **Allowed Callback URLs** for security. This will enable Auth0 to recognize these URLs as valid. If omitted, authentication will not be successful.

Go to your [Client's Dashboard](${manage_url}/#/applications/${account.clientId}/settings) and make sure that "Allowed Callback URLs" contains the following for each platform you are supporting.

#### iOS

```text
{PRODUCT_BUNDLE_IDENTIFIER}://${account.namespace}/ios/{PRODUCT_BUNDLE_IDENTIFIER}/callback
```

Remember to replace `PRODUCT_BUNDLE_IDENTIFIER` with your actual application's bundle identifier name. If you open the project in Xcode you will find this under the `General` tab in your Projects target settings.

#### Android

```text
{YOUR_APP_PACKAGE_NAME}://${account.namespace}/android/{YOUR_APP_PACKAGE_NAME}/callback
```

Remember to replace `YOUR_APP_PACKAGE_NAME` with your actual application's package name. Take note of this URL as it's also defined in the `AndroidManifest.xml` file.
