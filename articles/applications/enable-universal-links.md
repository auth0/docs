---
description: How to enable Universal Links support for your Auth0 app in Xcode
tags:
  - applications
  - ios
  - universal-links
---

# Enable Universal Links Support for your Auth0 Application in Xcode

Because universal links establish a *verified relationship between domains and applications*, both your Auth0 Application settings and your iOS application need to be in sync. To do this, you need to provide Auth0 with the following information:

* `Team ID`;
* `Bundle identifier`.

## Find Your Apple `Team ID` and `Bundle Identifier`

To find your Apple `Team ID`, go to your [Apple developer account summary page](https://developer.apple.com/membercenter/index.action#accountSummary).

To find your iOS application's `Bundle identifier`, go to its [Xcode project settings](https://developer.apple.com/library/content/documentation/IDEs/Conceptual/AppDistributionGuide/ConfiguringYourApp/ConfiguringYourApp.html) page:

![](/media/articles/applications/bundle-id.png)

## Provide Your Apple `Team ID` and `Bundle Identifier` to Auth0

You can establish the universal link from the Auth0 side using [Applications](${manage_url}/#/clients) page of the [Management Dashboard](${manage_url}).

Select the Application you want to link with your iOS application. You will see the *Settings* page for the Application.

![](/media/articles/applications/settings.png)

Scroll to the bottom of the *Settings* page and click *Show Advanced Settings.*

![](/media/articles/applications/advanced-settings.png)

Select the *Mobile Settings* tab and provide the **Team ID** and the **App bundler identifier** values for your iOS application.

![](/media/articles/applications/mobile-settings.png)

Click **Save Changes** when done.

## Test Your Universal Link

To test this, check whether the universal links apple app site association file is available for your application. Go to your browser and open: https://YOURACCOUNT.auth0.com/apple-app-site-association (replace YOURACCOUNT with your Auth0 account name).

You can test your universal link by navigating to the following URL using your browser:

`${account.namespace}/apple-app-site-association`

If the link is successful, you will return the following JSON (formatted for readability):

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
