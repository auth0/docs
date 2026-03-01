---
title: Enable Android App Links Support
description: Learn how to enable Android App Links support for your Auth0 application using the Auth0 Dashboard.
topics:
  - applications
  - android
  - app-links
  - dashboard
contentType: how-to
useCase:
  - build-an-app
  - enable-mobile-auth
---
# Enable Android App Links Support

[Android App Links](https://developer.android.com/training/app-links/index.html) allow an application to designate itself as the default handler of a given type of link. For example, clicking a URL in an email would open the link in the designated application. This guide will show you how to enable Android App links support for your Auth0-registered application using Auth0's Dashboard.

## Provide Your App's Package Name and Certificate Fingerprint

1. Navigate to the [Applications](${manage_url}/#/applications) page in the [Auth0 Dashboard](${manage_url}), and click the name of the Application to view.

![View Applications](/media/articles/dashboard/guides/app-list.png)

2. Scroll to the bottom of the **Settings** page, and click **Show Advanced Settings**.

![Show Advanced Settings](/media/articles/applications/advanced-settings.png)

3. Select the **Device Settings** tab, provide the [App Package Name](https://developer.android.com/studio/build/application-id.html) and the SHA256 fingerprints of your app’s signing certificate for your Android application, and click **Save Changes**.

You can use the following command to generate the fingerprint using the Java keytool in your terminal:

```bash
keytool -list -v -keystore my-release-key.keystore
```

::: note
For more info about signing certificates, see Android's [Sign Your App](https://developer.android.com/studio/publish/app-signing.html) developer doc.
:::

![Add Device Settings](/media/articles/applications/device-settings.png)


## Test Your App Link

1. Navigate to the following URL in your browser:

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
For more info about testing your app link, see Android's [Verify Android App Links](https://developer.android.com/training/app-links/verify-site-associations.html#testing) developer doc.
:::
