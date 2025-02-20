<!-- markdownlint-disable MD041 -->

To run the sample follow these steps:

1) Add the following URL to **Allowed Callback URLs** in the <a href="$manage_url/#/applications/$account.clientId/settings" target="_blank">Application Settings</a>

```text
com.auth0.samples://${account.namespace}/capacitor/com.auth0.samples/callback
```

2) Add the following URL to **Allowed Logout URLs** in the <a href="$manage_url/#/applications/$account.clientId/settings" target="_blank">Application Settings</a>

```text
com.auth0.samples://${account.namespace}/capacitor/com.auth0.samples/callback
```

3) Add the following to **Allowed Origins (CORS)s** in the <a href="$manage_url/#/applications/$account.clientId/settings" target="_blank">Application Settings</a>

```text
capacitor://localhost, http://localhost
```

4) Check that mobile development environments for <a href="https://capacitorjs.com/docs/android" target="_blank">Android</a> and <a href="https://capacitorjs.com/docs/ios" target="_blank">iOS</a> are setup correctly. For iOS, <a href="https://cocoapods.org/" target="_blank">CocoaPods</a> must be installed.

5) Make sure <a href="https://nodejs.org/en/download/" target="_blank">Node.JS LTS</a> is installed and execute the following commands in the sample directory:

```bash
npm install
npm run build

# to test it in iOS
npx cap run ios

# to test it in Android
npx cap run android
```

Read more about the <a href="https://capacitorjs.com/docs/basics/workflow" target="_blank">Capacitor development workflow</a> on Capacitor's docs site.
