<!-- markdownlint-disable MD041 -->

To run the sample follow these steps:

1. Set the **Allowed Callback URLs** and **Allowed Logout URLs** in the [Application Settings](${manage_url}/#/applications/${account.clientId}/settings) to the following value so it works for both Android and iOS apps:

```text
com.auth0.samples.FlutterSample://${account.namespace}/ios/com.auth0.samples.FlutterSample/callback,com.auth0.sample://${account.namespace}/android/com.auth0.sample/callback
```

2. Rename the file `.env.example` to `.env` and fill in the following values:

```sh
AUTH0_DOMAIN=${account.namespace}
AUTH0_CLIENT_ID=${account.clientId}
AUTH0_CUSTOM_SCHEME=com.auth0.sample
```

3. Rename the file `strings.xml.example` in `android/app/src/main/res/values` to `strings.xml` and fill in the following values:

```xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <string name="com_auth0_domain">${account.namespace}</string>
    <string name="com_auth0_scheme">com.auth0.sample</string>
</resources>
```

4. Use the [Flutter CLI's](https://docs.flutter.dev/reference/flutter-cli) `run` command to run the app:

```sh
flutter run
```
