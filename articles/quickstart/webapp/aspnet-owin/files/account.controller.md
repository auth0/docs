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
  public ActionResult Login(string returnUrl = "/")
  {
    HttpContext.GetOwinContext().Authentication.Challenge(
      new AuthenticationProperties
      {
          RedirectUri = returnUrl ?? Url.Action("Index", "Home")
      },
      "Auth0"
    );
  }

  [Authorize]
  public ActionResult UserProfile()
  {
      var claimsIdentity = User.Identity as ClaimsIdentity;

      return View(new UserProfileViewModel()
      {
          Name = claimsIdentity?
            .FindFirst(c => c.Type == claimsIdentity.NameClaimType)?.Value,
          EmailAddress = claimsIdentity?
            .FindFirst(c => c.Type == ClaimTypes.Email)?.Value,
          ProfileImage = claimsIdentity?
            .FindFirst(c => c.Type == "picture")?.Value
      });
  }

  [Authorize]
  public void Logout()
  {
    HttpContext.GetOwinContext().Authentication.SignOut(CookieAuthenticationDefaults.AuthenticationType);
    HttpContext.GetOwinContext().Authentication.SignOut("Auth0");
  }
}
```