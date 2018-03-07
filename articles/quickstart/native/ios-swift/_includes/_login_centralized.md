[Universal login](/hosted-pages/login) is the easiest way to set up authentication in your application. We recommend using it for the best experience, best security and the fullest array of features.

::: note
You can also embed the Lock widget directly in your application. If you use this method, some features, such as single sign-on, will not be accessible. 
To learn how to embed the Lock widget in your application, follow the [Embedded Login sample](https://github.com/auth0-samples/auth0-ios-swift-sample/tree/embedded-login/01-Embedded-Login).
:::

<div class="phone-mockup"><img src="/media/articles/native-platforms/ios-swift/lock_centralized_login.png" alt="login page"></div>

::: note
Read the [Browser-Based vs. Native Login Flows on Mobile Devices](/tutorials/browser-based-vs-native-experience-on-mobile) article to learn how to choose between the two types of login flows.
:::

<%= include('../../_includes/_ios_dependency_centralized') %>

## Add the Callback

For Auth0 to handle the authentication callback, update your `AppDelegate` file. 

First, import the `Auth0` module:

${snippet(meta.snippets.setup)}

Then, add the following `UIApplicationDelegate` method:

```swift
// AppDelegate.swift

func application(_ app: UIApplication, open url: URL, options: [UIApplicationOpenURLOptionsKey : Any]) -> Bool {
    return Auth0.resumeAuth(url, options: options)
}
```

::: note
To configure callback, you must configure your callback URL first. Read about the Callback URL in the [Configure Callback](/quickstart/native/ios-swift/getting-started#configure-callback-urls) step.
:::

## Implement Login

First, import the `Auth0` module in the file where you want to present the login page:

${snippet(meta.snippets.setup)}

Then, present the login screen:

${snippet(meta.snippets.use)}

This adds the `profile` scope to enable [retrieving the User Profile](/quickstart/native/ios-swift/03-user-sessions#fetch-the-user-profile).

You need to make sure you get a response compliant with the OpenID Connect protocol. You can choose between two options:

* Set the audience
* Turn on the **OIDC conformant** switch in your Auth0 dashboard

This example sets the `audience` parameter to get an OIDC-compliant response. 

::: note
To turn on the **OIDC conformant** switch, in your [Client Settings](${manage_url}/#/applications/${account.clientId}/settings), click on **Show Advanced Settings** > **OAuth**. For more information, read [How to use the new flows](/api-auth/intro#how-to-use-the-new-flows).
:::

After the user authenticates, their information is returned in a `credentials` object.

::: note
To learn more about the `credentials` object, read the [Credentials](https://github.com/auth0/Auth0.swift/blob/master/Auth0/Credentials.swift) article.
:::
