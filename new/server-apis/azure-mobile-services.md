---
lodash: true
---
<% configuration.thirdParty = 'Azure Mobile Services' %>
@@includes.thirdpartyapi@@

### Additional Information

#### 1. Create a client for the application

WAMS endpoints can be used from anywhere: [Android](android-tutorial), [iOS](ios-tutorial), Windows 8 [C#](win8-cs-tutorial) or [JavaScript](win8-tutorial) and [Windows Phone](windowsphone-tutorial). You can use any of these tutorials for configuring your app that will interact with WAMS.

A very good starting point is any of the samples you can download from the Azure Portal. Download and follow these:

![](img/wams-tutorial-4.png)

---

#### 2. Changing the sample to use Auth0

Changing the samples to use Auth0 is very simple. As an example, if you followed the Windows 8 sample (C#), you will end up with an `AuthenticateAsync` method that adds one of the standard WAMS authentication mechanisms.


```
private async System.Threading.Tasks.Task AuthenticateAsync()
{
  while (user == null)
  {
    string message;

    try
    {
      //Adding Auth0
      //Login User
      var auth0 = new Auth0Client("@@account.namespace@@", "@@account.clientId@@");

      var appUser = await auth0.LoginAsync(); //This call presents user with all available options

      //This obtains a token for WAMS
      var api = await auth0.GetDelegationToken("{THE WAMS CLIENT ID IN AUTH0}");

      //Tell WAMS to use this new token
      user = new MobileServiceUser(appUser.Profile["name"].ToString());
      user.MobileServiceAuthenticationToken = api["id_token"].ToString();
      App.MobileService.CurrentUser = user;

      //Old code
      //user = await App.MobileService.LoginAsync(MobileServiceAuthenticationProvider.Facebook);

      message =
        string.Format("You are now logged in - {0}", user.UserId);
    }

    catch (InvalidOperationException)
    {
      message = "You must log in. Login Required";
    }

    var dialog = new MessageDialog(message);

    dialog.Commands.Add(new UICommand("OK"));

    await dialog.ShowAsync();
  }
}

```

These 6 new lines of code do all the work for you. The important aspects:

1. The `Auth0Client` class takes 2 parameters: your `namespace` and the `clientId` of the client application. 
2. There are various overloads for the  `LoginAsync` method. In the example above all options will be presented to the user. You can use other versions of `LoginAsync` to direct login to a specific provider. For example: `LoginAsync("github")` will have users login exclusively with GitHub.
3. The `GetDelegationToken` call exchanges the client token (just received in step #2) for another token to be used for with WAMS.
4. A new `MobileServiceUser` object is created with the new information.

The input for the `GetDelegationToken` method, is the clientID of the App / API where `Windows Azure Mobile Services (WAMS) API` addon was enable.

You might wonder why step #3 is necessary. This abstraction layer allows your client app to interact with multiple WAMS APIs (or even other APIs altogether). You can control in Auth0 which clients can call which API. You could, as an example, login a user with GitHub, then connect him to WAMS, and also interact with an AWS hosted endpoint. The delegation call allows you to flow the identity of the user across multiple environments in a clean, secure way.  

> The sample above is using Windows 8, C#. Clients on other platforms would use almost identical code.

#### 3. Using the user identity in the WAMS backend
The final step is to use the information on the token on the server code. You will likely have to do 2 things:

##### 1. Change permissions on the table for each operation:

![](img/wams-tutorial-5.png)


##### 2. Use the `user` object to change the behavior of the operation. 

This example, inserts the `userId` on new rows:

![](img/wams-tutorial-6.png)

And then when querying, it filters out rows for the logged in user:

![](img/wams-tutorial-7.png)
