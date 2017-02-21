---
title: Login
description: This tutorial demonstrates how to integrate Lock in your iOS Swift project in order to present a login screen.
budicon: 448
---

<%= include('../../_includes/_package', {
  Guide:articles/native-platforms/ios-swift/01-login.md
  org: 'auth0-samples',
  repo: 'auth0-ios-swift-v2-sample',
  path: '01-Login',
  requirements: [
    'CocoaPods 1.1.1',
    'Version 8.2 (8C38)',
    'iPhone 6 - iOS 10.2 (14C89)'
  ]
}) %>

<%= include('_includes/_login') %>

## Configure Callback URLs

Callback URLs are the URLs that Auth0 invokes after the authentication process. Auth0 routes your application back to this URL and appends additional parameters to it, including a token. Since callback URLs can be manipulated, you will need to add your application's URL to your client's *Allowed Callback URLs* for security. This will enable Auth0 to recognize these URLs as valid. If omitted, authentication will not be successful.

In your application's `Info.plist` file, register your iOS Bundle Identifer as a custom scheme:

```xml
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

Finally, go to your [Client's Dashboard](${manage_url}/#/applications/${account.clientId}/settings) and make sure that *Allowed Callback URLs* contains the following:

`{YOUR_BUNDLE_IDENTIFIER}://{YOUR_AUTH0_DOMAIN}/ios/{YOUR_BUNDLE_IDENTIFIER}/callback`
