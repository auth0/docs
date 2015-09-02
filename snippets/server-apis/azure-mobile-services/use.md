```cs
private async System.Threading.Tasks.Task AuthenticateAsync()
{
  while (user == null)
  {
    string message;

    try
    {
      //Adding Auth0
      //Login User
      var auth0 = new Auth0Client("${account.namespace}", "${account.clientId}");

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
