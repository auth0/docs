# Using Auth0 in ASP.NET Web API

@@includes.apinote@@

Install the following NuGet package

    Install-Package WebApi.JsonWebToken

Add the following code snippet on the `Register` method of `WebApiConfig.cs`:

    config.MessageHandlers.Add(new JsonWebTokenValidationHandler()
    {
        Audience = "@@account.clientId@@",  // client id
        SymmetricKey = "@@account.clientSecret@@"   // client secret
    });

Protect your Web API with the `[Authorize]` attribute

    public class CustomersController : ApiController
    {
        // GET api/customers
        [Authorize]
        public IEnumerable<string> Get()
        ...
    }

You can get the attributes of the user on the Web API side by doing:

      ClaimsPrincipal.Current.Claims.SingleOrDefault(c => c.Type == "email").Value

@@includes.callapi@@

---

## Download the sample

Browse the sample on GitHub: <https://github.com/auth0/auth0-webapi-js-sample>
