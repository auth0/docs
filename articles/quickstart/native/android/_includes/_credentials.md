## Set Credentials

Your application needs some details about your client to communicate with Auth0. You can get these details from the **Settings** section for your client in the [Auth0 dashboard](${manage_url}/#/).

You need the following information: 

* **Client ID**
* **Domain**

We suggest you do not hardcode these values as you may need to change them in the future. Instead, use [String Resources](https://developer.android.com/guide/topics/resources/string-resource.html), such as `@string/com_auth0_domain`, to define the values. 

Edit your `res/values/strings.xml` file as follows:

```xml
<resources>
    <string name="com_auth0_client_id">${account.clientId}"</string>
    <string name="com_auth0_domain">${account.namespace}"</string>
</resources>
```

::: note
If you download the sample from the top of this page, these details are filled out for you. If you have more than one client in your account, the sample comes with the values for your **Default App**.
:::