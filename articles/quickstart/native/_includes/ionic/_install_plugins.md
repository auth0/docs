<!--markdownlint-disable MD002 MD041 -->

### Install Capacitor plugins

This quickstart and sample make use of some of Capacitor's official plugins. Install these into your app using the following command:

```bash
npm install @capacitor/browser @capacitor/app
```

- [`@capacitor/browser`](https://capacitorjs.com/docs/apis/browser) - allows you to interact with the device's system browser and is used to open the URL to Auth0's authorizaction endpoint
- [`@capacitor/app`](https://capacitorjs.com/docs/apis/app) - allows you to subscribe to high-level app events, useful for handling callbacks from Auth0

:::note
Capacitor's Browser plugin on iOS uses [`SFSafariViewController`](https://developer.apple.com/documentation/safariservices/sfsafariviewcontroller), which on iOS 11+ does not share cookies with Safari on the device. This means that [SSO](https://auth0.com/docs/sso) will not work on those devices. If you need SSO, please instead use a compatible plugin that uses [ASWebAuthenticationSession](https://developer.apple.com/documentation/authenticationservices/aswebauthenticationsession).
:::
