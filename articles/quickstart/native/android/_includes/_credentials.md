## Set Credentials

You will require the **Client ID** and **Domain** for your client application. These values can be found in your Auth0 dashboard. The suggested approach is to use [String Resources](https://developer.android.com/guide/topics/resources/string-resource.html) like `@string/com_auth0_domain` to define them instead of hard coding the value, as you might need to change them in the future and forget to update them in all the places. Edit your `res/values/strings.xml` file like this:

```xml
<resources>
    <string name="com_auth0_client_id">${account.clientId}</string>
    <string name="com_auth0_domain">${account.namespace}</string>
</resources>
```

If you're logged in with your Auth0 account and download the samples from the "Download Sample" button, the values will be completed for you.
