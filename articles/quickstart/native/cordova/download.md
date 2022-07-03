To run the sample follow these steps:

1) Set the **Allowed Callback URLs** in the [Application Settings](${manage_url}/#/applications/${account.clientId}/settings) to

```text
com.auth0.cordova.example://${account.namespace}/cordova/com.auth0.cordova.example/callback
```
2) Set the **Allowed Logout URLs** in the [Application Settings](${manage_url}/#/applications/${account.clientId}/settings) to

```text
com.auth0.cordova.example://${account.namespace}/cordova/com.auth0.cordova.example/callback
```
3) Set **Allowed Origins (CORS)s** in the [Application Settings](${manage_url}/#/applications/${account.clientId}/settings) to

```text
file://*
```
4) Make sure [Node.JS LTS](https://nodejs.org/en/download/) is set up and run the following commands:

```bash
npm install -g cordova
npm install
```
5) Run the app (this sample uses Webpack):

```bash
# command to instruct webpack to build the application bundle.
npm run build
# emulate the app, {platform} being ios or android, ensure the Android Emulator is already started
cordova emulate {platform}
```