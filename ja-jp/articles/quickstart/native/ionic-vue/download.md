<!-- markdownlint-disable MD041 -->

To run the sample follow these steps:

1) Add the following URL to **Allowed Callback URLs** in the [Application Settings](${manage_url}/#/applications/${account.clientId}/settings)

```text
com.auth0.samples://${account.namespace}/capacitor/com.auth0.samples/callback
```

2) Add the following URL to **Allowed Logout URLs** in the [Application Settings](${manage_url}/#/applications/${account.clientId}/settings)

```text
com.auth0.samples://${account.namespace}/capacitor/com.auth0.samples/callback
```

3) Add the following to **Allowed Origins (CORS)s** in the [Application Settings](${manage_url}/#/applications/${account.clientId}/settings)

```text
capacitor://localhost, http://localhost
```

4) Check that mobile development environments for [Android](https://capacitorjs.com/docs/android) and [iOS](https://capacitorjs.com/docs/ios) are setup correctly. For iOS, [CocoaPods](https://cocoapods.org/) must be installed.

5) Make sure [Node.JS LTS](https://nodejs.org/en/download/) is installed and execute the following commands in the sample directory:

```bash
npm install
npm run build

# to test it in iOS
npx cap run ios

# to test it in Android
npx cap run android
```

Read more about the [Capacitor development workflow](https://capacitorjs.com/docs/basics/workflow) on Capacitor's docs site.
