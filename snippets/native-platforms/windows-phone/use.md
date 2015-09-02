The simplest way is to simply call:
```cs
try
{
    var user = await App.Auth0.LoginAsync();
    // Do whatever you need with a user
}
catch (AuthenticationCancelException)
{
    // Handle case when user canceled authentication
}
catch (AuthenticationErrorException)
{
    // Handle case when some error happen while authentication
}
catch (AuthenticationException)
{
    // Handle all Auth0 Authentication error cases
}
```

If you want to specify a particular connection you can do that using:
```cs
var user = await App.Auth0.LoginAsync("{CONNECTION_NAME}");
```

Alternatively, if you want to allow database users to sign in and you have their credentials in memory:
```cs
var user = await App.Auth0.LoginAsync("{CONNECTION_NAME}", "{USER_NAME}", "{PASSWORD}");
```
