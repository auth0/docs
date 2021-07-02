<!--markdownlint-disable MD002 MD041 -->

### Install Capacitor plugins

This quickstart and sample make use of some of Capacitor's official plugins. Install these into your app using the following command:

```bash
npm install @capacitor/browser @capacitor/app
```

- [`@capacitor/browser`](https://capacitorjs.com/docs/apis/browser) - allows us to interact with the device's system browser, and is used to open the URL to Auth0's authorizaction endpoint
- [`@capacitor/app`](https://capacitorjs.com/docs/apis/app) - allows us to subscribe to high-level app events, useful for handling callbacks from Auth0