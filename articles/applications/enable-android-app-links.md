---
description: How to enable Android App Links support for your Auth0 application
tags:
  - applications
  - android
  - app-links
---

# Enable Android App Links Support for your Auth0 Application

The following document outlines how to configure [Android App Links](https://developer.android.com/training/app-links/index.html) for your Auth0 application.

Android App Links allow an application to designate itself as the default handler of a given type of link. For example, clicking a URL in an email would open the link in the designated application.

## Provide Your App's Package Name and Certificate Fingerprint

You can establish the app link with Auth0 using [Applications](${manage_url}/#/applications) page of the [Auth0 Dashboard](${manage_url}).

Select the Application you want to link with your Android application. You will see the **Settings** page for the Application.

![](/media/articles/applications/settings.png)

Scroll to the bottom of the **Settings** page and click **Show Advanced Settings.**

![](/media/articles/applications/advanced-settings.png)

Select the **Mobile Settings** tab, then provide the [App Package Name](https://developer.android.com/studio/build/application-id.html) and the SHA256 fingerprints of your app’s signing certificate for your Android application.

You can generate the fingerprint using the Java keytool in your terminal:

```bash
keytool -list -v -keystore my-release-key.keystore
```

::: note
For more information on signing certificates, check out the [Sign Your App](https://developer.android.com/studio/publish/app-signing.html) page of the Android developer documentation.
:::

![](/media/articles/applications/mobile-settings.png)

Click **Save Changes** when done.

## Test Your App Link

You can test your app link by navigating to the following URL using your browser:

`https://${account.namespace}/.well-known/assetlinks.json`

If the link is successful, you will return the following JSON (formatted for readability):

```json
[{
  "relation": ["delegate_permission/common.handle_all_urls"],
  "target": {
    "namespace": "android_app",
    "package_name": "com.mycompany.app1",
    "sha256_cert_fingerprints":
    ["14:6D:E9:83:C5:73:06:50:D8:EE:B9:95:2F:34:FC:64:16:A0:83:42:E6:1D:BE:A8:8A:04:96:B2:3F:CF:44:E5"]
  }
}]
```

::: note
See [Verify Android App Links](https://developer.android.com/training/app-links/verify-site-associations.html#testing) for further information on testing your app link.
:::
