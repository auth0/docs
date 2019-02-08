---
description: Learn to enable universal links support for your Auth0 app in Xcode.
topics:
  - applications
  - ios
  - universal-links
contentType: how-to
useCase:
  - build-an-app
  - enable-mobile-auth
---

# Enable Universal Links Support in Xcode

Universal links establish a *verified relationship between domains and applications*, so both your Auth0 Application settings and your iOS application need to be in sync. To do this, you need to provide Auth0 with the following information:

* `Team ID`;
* `Bundle identifier`.

This guide will show you how to enable universal links support for your Auth0-registered application using the Auth0 Dashboard.

## Find Your Apple `Team ID` and `Bundle Identifier`

To find your Apple `Team ID`, go to your [Apple developer account summary page](https://developer.apple.com/membercenter/index.action#accountSummary).

To find your iOS application's `Bundle identifier`, go to its [Xcode project settings](https://developer.apple.com/library/content/documentation/IDEs/Conceptual/AppDistributionGuide/ConfiguringYourApp/ConfiguringYourApp.html) page:

![](/media/articles/applications/bundle-id.png)

## Provide Your Apple `Team ID` and `Bundle Identifier` to Auth0

1. Navigate to the [Applications](${manage_url}/#/clients) page of the [Auth0 Dashboard](${manage_url}).

2. Click the cog icon next to the Application you want to link with your iOS application to see its settings.

![](/media/articles/applications/settings.png)

3. Scroll to the bottom of the *Settings* page, and click *Show Advanced Settings.*

![](/media/articles/applications/advanced-settings.png)

4. Select the *Mobile Settings* tab, and provide the **Team ID** and the **App bundler identifier** values for your iOS application.

![](/media/articles/applications/mobile-settings.png)

5. Click **Save Changes** when done.


## Test Your Universal Link

Check whether the universal links `apple-app-site-association` file is available for your application by using your browser to navigate to: `${account.namespace}/apple-app-site-association`.

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
