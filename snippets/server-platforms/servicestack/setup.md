```cs

	private void ConfigureAuth(Funq.Container container){
		var appSettings = new AppSettings();

		Plugins.Add(new AuthFeature(() => new Auth0UserSession(),
		                                  new IAuthProvider[]
			                             {
				new Auth0Provider(appSettings, appSettings.GetString("oauth.auth0.OAuthServerUrl"))
			                             }));
	}

```
