To run the sample follow these steps:

1) Set the **Callback URL** in the [Application Settings](${manage_url}/#/applications/${account.clientId}/settings) so it works for both Android and iOS apps:
```text
auth0.samples.Auth0Sample://${account.namespace}/ios/auth0.samples.Auth0Sample/callback,com.auth0sample://${account.namespace}/android/com.auth0sample/callback
```

2) Make sure [Node.JS LTS](https://nodejs.org/en/download/) is installed and execute the following commands in the sample's directory:

```bash
npm install # Install dependencies
react-native link react-native-auth0 # Link the native module
react-native run-ios # Run on iOS device
react-native run-android # Run on Android device
```

Read more about how to run react-native apps in their [official documentation](https://facebook.github.io/react-native/docs/running-on-device.html).