# Using Auth0 in ASP.NET Web API (OWIN)

@@includes.apinote@@

Install the following NuGet package:

    Install-Package Microsoft.Owin.Security.Jwt

Edit `App_Start\Startup.Auth.cs` in order to call the `UseJwtBearerAuthentication` extension method:

    var issuer = "https://@@account.namespace@@/";
    var audience = "@@account.clientId@@";
    var secret = TextEncodings.Base64.Encode(TextEncodings.Base64Url.Decode("@@account.clientSecret@@"));

    // Api controllers with an [Authorize] attribute will be validated with JWT
    app.UseJwtBearerAuthentication(
        new JwtBearerAuthenticationOptions
        {
            AuthenticationMode = AuthenticationMode.Active,
            AllowedAudiences = new[] { audience },
            IssuerSecurityTokenProviders = new IIssuerSecurityTokenProvider[]
            {
                new SymmetricKeyIssuerSecurityTokenProvider(issuer, secret)
            }
        });

Protect your Web API with the `[Authorize]` attribute:

    public class CustomersController : ApiController
    {
        // GET api/customers
        [Authorize]
        public IEnumerable<string> Get()
        ...
    }

You can include new claims by attaching to `OnValidateIdentity`:

    app.UseJwtBearerAuthentication(
        new JwtBearerAuthenticationOptions
        {
            // ...
            Provider = new OAuthBearerAuthenticationProvider
            { 
                OnValidateIdentity = context =>
                {
                    context.Ticket.Identity.AddClaim(new System.Security.Claims.Claim("foo", "var"));
                    return Task.FromResult<object>(null);
                }
            }
        });

You can get the attributes of the user on the Web API side by doing:

      ClaimsPrincipal.Current.FindFirst("email").Value

@@includes.callapi@@

---

## Download the sample

Browse the sample on GitHub: <https://github.com/auth0/auth0-angular/tree/master/examples/api-authentication/aspnet-owin>
