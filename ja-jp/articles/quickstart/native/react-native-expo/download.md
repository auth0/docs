To run the sample follow these steps:

1) Set the **Allowed Callback URLs** in the [Application Settings](${manage_url}/#/applications/${account.clientId}/settings) so it works for both Android and iOS apps:
```text
com.auth0samples://${account.namespace}/ios/com.auth0samples/callback,com.auth0samples://${account.namespace}/android/com.auth0samples/callback
```

2) Set the **Allowed Logout URLs** in the [Application Settings](${manage_url}/#/applications/${account.clientId}/settings) so it works for both Android and iOS apps:
```text
com.auth0samples://${account.namespace}/ios/com.auth0samples/callback,com.auth0samples://${account.namespace}/android/com.auth0samples/callback
```

3) Make sure [Node.JS LTS](https://nodejs.org/en/download/), [Yarn](https://yarnpkg.com/lang/en/docs/install/) and [CocoaPods](http://guides.cocoapods.org/using/getting-started.html) are installed. 

4) Execute the following commands in the sample's directory:

```bash
yarn install # Install dependencies
expo prebuild # Generate the native source code
expo run:ios # Run on iOS device
expo run:android # Run on Android device
```

Read more about how to run Expo apps in their [official documentation](https://docs.expo.dev/workflow/expo-cli/#compiling).