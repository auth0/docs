## Adding Auth0 Credentials

The dependencies listed above require your client credentials in order for them to work. If you downloaded any sample project from here, these credentials are automatically set. Either way, you have to make sure they are there otherwise your app might crash.

Add your credentials in `Auth0.plist`. You have to create that file if it doesn't already exist in your project:

```xml
<!-- Auth0.plist -->

<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>ClientId</key>
  <string>${account.clientId}</string>
  <key>Domain</key>
  <string>${account.namespace}</string>
</dict>
</plist>
```

## Configure Callback URLs

Callback URLs are the URLs that Auth0 invokes after the authentication process. Auth0 routes your application back to this URL and appends additional parameters to it, including a token. Since callback URLs can be manipulated, you will need to add your application's URL to your client's **Allowed Callback URLs** for security. This will enable Auth0 to recognize these URLs as valid. If omitted, authentication will not be successful.

In your application's `Info.plist` file, register your iOS Bundle Identifier as a custom scheme:

```xml
<!-- Info.plist -->

<key>CFBundleURLTypes</key>
<array>
    <dict>
        <key>CFBundleTypeRole</key>
        <string>None</string>
        <key>CFBundleURLName</key>
        <string>auth0</string>
        <key>CFBundleURLSchemes</key>
        <array>
            <string>$(PRODUCT_BUNDLE_IDENTIFIER)</string>
        </array>
    </dict>
</array>
```

::: note
If your `Info.plist` is not shown in this format, you can **Right Click** on `Info.plist` in Xcode and then select **Open As / Source Code**.
:::

Finally, go to your [Client's Dashboard](${manage_url}/#/applications/${account.clientId}/settings) and make sure that "Allowed Callback URLs" contains the following:

```text
{PRODUCT_BUNDLE_IDENTIFIER}://${account.namespace}/ios/{PRODUCT_BUNDLE_IDENTIFIER}/callback
```
