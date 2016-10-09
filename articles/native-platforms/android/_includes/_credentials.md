## Set Credentials

You will require the **Client ID** and **Domain** for your client application. These values can be found in your Auth0 dashboard. The suggested approach is to add these credentials to your `strings.xml` file so they are accessible to your application.

```xml
<string name="auth0_client_id">${account.clientId}</string>
<string name="auth0_domain">${account.namespace}</string>
```

The data path for Lock also needs to be set.

```xml
<data
  android:host="@string/auth0_domain"
  android:pathPrefix="/android/YOUR_APP_PACKAGE/callback"
  android:scheme="https" />
```
