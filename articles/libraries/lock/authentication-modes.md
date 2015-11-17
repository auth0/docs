# Lock: Authentication Modes

After Auth0 Lock is opened, you can choose any of the Identity Providers (IdP) that Auth0 has, to Login. Depending on how the IdP Web/App is openned, a different authentication mode is used.

## Redirect Mode

If after you click on the IdP button (Facebook for example), the Webapp you built gets redirected to Facebook, it means you're using Redirect Mode. Once you successfully login to Facebook, Facebook will redirect you back to your app (through Auth0). This means that if you had **any state in memory in your WebApp, it will be lost**. This is why a successful login with Redirect mode **cannot be handled with a callback** and must be handled with the `parseHash` method.

![Widget redirect](http://cl.ly/image/2o423i362s2P/WidgetRedirect.gif)

You can [click here](/libraries/lock/types-of-applications#redirect-mode) to learn how to implement Redirect mode with Single Page Apps, or you can [click here](/libraries/lock/types-of-applications#redirect-mode-1) to learn how to implement it with Regular WebApps.

## Popup Mode

If after you click on the IdP button (Facebook for example), a popup (new tab or window) is openned, it means you're using Popup Mode. In that popup, you'll see that Facebook page is displayed. Once you successfully login to Facebook, the popup will be closed and your WebApp will recognize that the user has been authenticated. The WebApp has **never been redirected to any other page. This means that you won't lose any state in memory that your application had**. This is why we can **handle successful login with a callback** in this case.

> WARNING: There is a known bug in Chrome for iOS that prevents popup mode from functioning properly. As such we recommend either only using redirect mode or detecting Chrom on iOS and selectively enabling redirect mode.

![Widget Popup](https://cloudup.com/cg8u9kVV5Vh+)

You can [click here](/libraries/lock/types-of-applications#popup-mode) to learn how to implement Popup mode with Single Page Apps.
