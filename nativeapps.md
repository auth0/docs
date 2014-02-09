# Calling APIs from Native Devices

Once the user has logged in using one of our SDKs as part of the response, you will get a JSON Web Token signed with the secret of that application. 

For instance, this is an iOS example:

    [client loginAsync:self withCompletionHandler:^(BOOL authenticated) {
      // client.auth0User.IdToken <--- this is the JWT

Or using Xamarin

    var user = await auth0.LoginAsync(this);
    // user.IdToken <--- this is the JWT

For other examples, look under the **Mobile/Native** section on the left sidebar.