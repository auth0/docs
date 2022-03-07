---
name: AccountController.cs
language: csharp
---

```csharp
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Auth0.AspNetCore.Authentication;

public class AccountController : Controller
{
  public async Task Login(string returnUrl = "/")
  {
    var authenticationProperties = new LoginAuthenticationPropertiesBuilder()
      // Indicate here where Auth0 should redirect the user after a login.
      // Note that the resulting absolute Uri must be added to the
      // **Allowed Callback URLs** settings for the app.
      .WithRedirectUri(returnUrl)
      .Build();

    await HttpContext.ChallengeAsync(
      Auth0Constants.AuthenticationScheme,
      authenticationProperties
    );
  }

  [Authorize]
  public IActionResult Profile()
  {
    return View(new
    {
      Name = User.Identity.Name,
      EmailAddress = User.Claims
        .FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value,
      ProfileImage = User.Claims
        .FirstOrDefault(c => c.Type == "picture")?.Value
    });
  }

  [Authorize]
  public async Task Logout()
  {
    var authenticationProperties = new LogoutAuthenticationPropertiesBuilder()
      // Indicate here where Auth0 should redirect the user after a logout.
      // Note that the resulting absolute Uri must be added to the
      // **Allowed Logout URLs** settings for the app.
      .WithRedirectUri(Url.Action("Index", "Home"))
      .Build();

    // Logout from Auth0
    await HttpContext.SignOutAsync(
      Auth0Constants.AuthenticationScheme,
      authenticationProperties
    );
    // Logout from the application
    await HttpContext.SignOutAsync(
      CookieAuthenticationDefaults.AuthenticationScheme
    );
  }
}
```