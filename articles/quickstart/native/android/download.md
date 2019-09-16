To run the sample first set the **Callback URL** in the [Application Settings](${manage_url}/#/applications/${account.clientId}/settings) to
```text
demo://${account.namespace}/android/com.auth0.samples/callback
```

To run the sample first set the **Logout URL** in the [Application Settings](${manage_url}/#/applications/${account.clientId}/settings) to
```text
demo://${account.namespace}/android/com.auth0.samples/callback
```

Then, to run it from the **command line**:

1) Make sure the target device is available and install the App running the next command:

```bash
# In Linux / macOS
./gradlew installDebug
# In Windows
gradlew installDebug
```
2) On the Android device, locate the App icon on the App Drawer and click it to launch it.

To run it from the **Android Studio IDE**:

1) Open the project on [Android Studio](https://developer.android.com/studio/index.html). 
2) Click the `Run` button (The green play) or select the menu option `Run | Run 'app'` and then choose a target device.