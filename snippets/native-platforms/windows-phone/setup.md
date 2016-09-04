Add `static` property to `App` class to save your authentication client

```cs
public static Auth0Client Auth0 { get; private set; }
```

Provide your domain and application's **Client ID** as parameters when creating the client instance and save to that property:

For Windows Phone XAML add initialization code to the end of `App` constructor

```cs
public App()
{
    this.InitializeComponent();
    this.Suspending += this.OnSuspending;

    Auth0 auth0Client = new Auth0Client("<%= account.namespace %>", "<%= account.clientId %>");
}
```

For Windows Phone Silverlight add initialization code to the end of `InitializePhoneApplication` method before `phoneApplicationInitialized = true;`

```cs
private void InitializePhoneApplication()
{
    ...
    Auth0 Auth0Client auth0Client = new Auth0Client("<%= account.namespace %>", "<%= account.clientId %>");

    // Ensure we don't initialize again
    phoneApplicationInitialized = true;
}
```
