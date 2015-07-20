```cs
protected override void ApplicationStartup(TinyIoCContainer container, IPipelines pipelines)
{
  // ...

  Auth0Authentication.Enable(pipelines, new AuthenticationConfig
  {
    RedirectOnLoginFailed = "login",
    CookieName = "_auth0_userid",
    UserIdentifier = "userid"
  });

  // ...
}
```
