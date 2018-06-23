To run the sample follow these steps:

1) Set the **Callback URL** in the [Application Settings](${manage_url}/#/applications/${account.clientId}/settings) so it works for both Android and iOS apps:
```text
auth0.samples.Auth0Sample://${account.namespace}/ios/auth0.samples.Auth0Sample/callback,com.auth0sample://${account.namespace}/android/com.auth0sample/callback
```

2) Execute the following commands in the sample's directory:

```bash
# Link the native module
react-native link react-native-auth0
# Run on iOS device
react-native run-ios
# Run on Android device
react-native run-android
```

Read more about how to run react-native apps in their [official documentation](https://facebook.github.io/react-native/docs/running-on-device.html).