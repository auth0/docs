<!-- markdownlint-disable MD002 MD041 -->

## Add Auth0 Credentials

You will need some details about this application to communicate with Auth0. You can get these details from the <a href="${manage_url}/#/applications/${account.clientId}/settings" target="_blank" rel="noreferrer">Application Settings</a> in the Auth0 dashboard.

You need the following information: 
* **Client ID**
* **Domain**

::: note
If you download the sample from the top of this page, these details are filled out for you.
:::

Add your credentials in `Auth0.plist`. If the file does not exist in your project yet, create one with the information below (<a href="https://developer.apple.com/library/archive/documentation/General/Reference/InfoPlistKeyReference/Articles/AboutInformationPropertyListFiles.html" target="_blank" rel="noreferrer">Apple documentation on Property List Files</a>):

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

<%= include('../../../_includes/_callback_url') %>

In your application's `Info.plist` file, register your iOS Bundle identifier as a custom scheme:

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
If your `Info.plist` file is not in the format shown above, you can right-click `Info.plist` in Xcode and select **Open As** > **Source Code**.
:::

Go to your <a href="${manage_url}/#/applications/${account.clientId}/settings" target="_blank" rel="noreferrer">Dashboard Settings</a> and make sure that the **Allowed Callback URLs** field contains the following callback URL:

```text
{PRODUCT_BUNDLE_IDENTIFIER}://${account.namespace}/ios/{PRODUCT_BUNDLE_IDENTIFIER}/callback
```
