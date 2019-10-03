---
title: Enable Universal Links Support in Apple Xcode
description: Learn how to enable universal links support for your Auth0 app in Apple Xcode using the Auth0 Dashboard.
topics:
  - applications
  - ios
  - universal-links
  - dashboard
contentType: how-to
useCase:
  - build-an-app
  - enable-mobile-auth
---
# Enable Universal Links Support in Apple Xcode

Universal links establish a *verified relationship between domains and applications*, so both your Auth0 Application settings and your iOS application need to be in sync. To do this, you need to provide Auth0 with the following information:

* `Team ID`;
* `Bundle identifier`.

This guide will show you how to enable universal links support for your Auth0-registered application using Auth0's Dashboard.

## Find Your Apple `Team ID` and `Bundle Identifier`

To find your Apple `Team ID`, go to your [Apple developer account summary page](https://developer.apple.com/membercenter/index.action#accountSummary).

To find your iOS application's `Bundle identifier`, go to its [Xcode project settings](https://developer.apple.com/library/content/documentation/IDEs/Conceptual/AppDistributionGuide/ConfiguringYourApp/ConfiguringYourApp.html) page:

![](/media/articles/applications/bundle-id.png)

## Provide Your Apple `Team ID` and `Bundle Identifier` to Auth0

1. Navigate to the [Applications](${manage_url}/#/clients) page of the [Auth0 Dashboard](${manage_url}), and click the name of the Application to view.

![View Applications](/media/articles/dashboard/guides/app-list.png)

2. Scroll to the bottom of the *Settings* page, and click *Show Advanced Settings.*

![Show Advanced Settings](/media/articles/applications/advanced-settings.png)

3. Select the *Device Settings* tab, provide the **Team ID** and the **App bundler identifier** values for your iOS application, and click **Save Changes**.

![](/media/articles/applications/device-settings.png)

## Test Your Universal Link

To check whether the universal links `apple-app-site-association` file is available for your application, navigate tothe following URL in your browser:

`${account.namespace}/apple-app-site-association`.

If the link is successful, you will see the following JSON (formatted for readability):

```json
{
  "applinks": {
    "apps": [],
    "details": [{
      "appID": "86WQXF56BC.com.auth0.Passwordless-Email",
      "paths": ["/ios/com.auth0.Passwordless-Email/*"]
    }]
  }
}
```
