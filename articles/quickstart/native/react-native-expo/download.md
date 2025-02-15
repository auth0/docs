To run the sample follow these steps:

1) Set the **Allowed Callback URLs** in the <a href="$manage_url/#/applications/$account.clientId/settings" target="_blank">Application Settings</a> so it works for both Android and iOS apps:
```text
com.auth0samples://${account.namespace}/ios/com.auth0samples/callback,com.auth0samples://${account.namespace}/android/com.auth0samples/callback
```

2) Set the **Allowed Logout URLs** in the <a href="$manage_url/#/applications/$account.clientId/settings" target="_blank">Application Settings</a> so it works for both Android and iOS apps:
```text
com.auth0samples://${account.namespace}/ios/com.auth0samples/callback,com.auth0samples://${account.namespace}/android/com.auth0samples/callback
```

3) Make sure <a href="https://nodejs.org/en/download/" target="_blank">Node.JS LTS</a>, <a href="https://yarnpkg.com/lang/en/docs/install/" target="_blank">Yarn</a> and <a href="http://guides.cocoapods.org/using/getting-started.html" target="_blank">CocoaPods</a> are installed. 

4) Execute the following commands in the sample's directory:

```bash
yarn install # Install dependencies
expo prebuild # Generate the native source code
expo run:ios # Run on iOS device
expo run:android # Run on Android device
```

Read more about how to run Expo apps in their <a href="https://docs.expo.dev/workflow/expo-cli/#compiling" target="_blank">official documentation</a>.