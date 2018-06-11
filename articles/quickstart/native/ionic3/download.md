
To run the sample follow these steps:

1) Set the **Callback URL** in the [Application Settings](${manage_url}/#/applications/${account.clientId}/settings) to
```bash
com.auth0.ionic://${account.namespace}/cordova/com.auth0.ionic/callback
```
2) Set **Allowed Origins (CORS)s** in the [Application Settings](${manage_url}/#/applications/${account.clientId}/settings) to
```bash
http://localhost:8080
```
3) Ensure that [Ionic 3](https://ionicframework.com/docs/intro/installation/) and [Cordova](https://ionicframework.com/docs/cli/#using-cordova) are installed.

4) Check that mobile development environments are setup correctly for Android or iOS. Follow [these recommendations](https://ionicframework.com/docs/intro/deploying/) by the Ionic team on setting it all up for deployment on mobile.

5) Make sure [Node.JS LTS](https://nodejs.org/en/download/) is installed and execute the following commands in the sample directory:
```bash
npm install
# to test it in iOS
ionic cordova run ios 
# to test it in Android
ionic cordova run android
```
