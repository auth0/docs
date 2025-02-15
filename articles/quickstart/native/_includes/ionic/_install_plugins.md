<!--markdownlint-disable MD002 MD041 -->

### Install Capacitor plugins

This quickstart and sample make use of some of Capacitor's official plugins. Install these into your app using the following command:

```bash
npm install @capacitor/browser @capacitor/app
```

- <a href="https://capacitorjs.com/docs/apis/browser" target="_blank">`@capacitor/browser`</a> - allows you to interact with the device's system browser and is used to open the URL to Auth0's authorizaction endpoint
- <a href="https://capacitorjs.com/docs/apis/app" target="_blank">`@capacitor/app`</a> - allows you to subscribe to high-level app events, useful for handling callbacks from Auth0

:::note
Capacitor's Browser plugin on iOS uses <a href="https://developer.apple.com/documentation/safariservices/sfsafariviewcontroller" target="_blank">`SFSafariViewController`</a>, which on iOS 11+ does not share cookies with Safari on the device. This means that <a href="https://auth0.com/docs/sso" target="_blank">SSO</a> will not work on those devices. If you need SSO, please instead use a compatible plugin that uses <a href="https://developer.apple.com/documentation/authenticationservices/aswebauthenticationsession" target="_blank">ASWebAuthenticationSession</a>.
:::
