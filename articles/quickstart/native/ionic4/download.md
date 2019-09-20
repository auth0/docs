
To run the sample follow these steps:

1) Set the **Allowed Callback URLs** in the [Application Settings](${manage_url}/#/applications/${account.clientId}/settings) to
```text
com.auth0.ionic://${account.namespace}/cordova/com.auth0.ionic/callback
```
2) Set the **Allowed Logout URLs** in the [Application Settings](${manage_url}/#/applications/${account.clientId}/settings) to
```text
com.auth0.ionic://${account.namespace}/cordova/com.auth0.ionic/callback
```
3) Set **Allowed Origins (CORS)s** in the [Application Settings](${manage_url}/#/applications/${account.clientId}/settings) to
Android
```text
http://localhost, http://localhost:8100
```
iOS
```text
ionic://localhost, http://localhost:8100
```
4) Ensure that [Ionic 4](https://ionicframework.com/docs/intro/installation/), [Cordova](https://cordova.apache.org/#getstarted) and make sure [native-run](https://github.com/ionic-team/native-run) are installed.
5) Check that mobile development environments for [Android](https://cordova.apache.org/docs/en/latest/guide/platforms/android/index.html) and [iOS](https://cordova.apache.org/docs/en/latest/guide/platforms/ios/index.html) are setup correctly.
6) Make sure [Node.JS LTS](https://nodejs.org/en/download/) is installed and execute the following commands in the sample directory:
```bash
npm install
# to test it in iOS
ionic cordova run ios --livereload
# to test it in Android
ionic cordova run android --livereload
```
