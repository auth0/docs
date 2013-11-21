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

## Consuming the secure API

* If you are building a Single Page / HTML5 Application, make sure to read [Using Auth0 in Single Page Apps / HTML5](singlepageapp-tutorial) to understand how to get a token on your application and send it to the Web API.
* If you are building a regular web site then you might want to read [Using Auth0 with ASP.NET](aspnet-tutorial).
* If you want to call this API from a console application or a powershell script, you could create a database connection to store credentials and obtain JSON Web Tokens based on those credentials as described in [Protocols - OAuth Resource Owner Password Credentials Grant](protocols#9). 
* If you want to call this API from a WPF/Winforms app, read [Using Auth0 with WPF or Winforms](wpf-winforms-tutorial).

## Download the sample

Browse the sample on GitHub: <https://github.com/auth0/auth0-webapi-js-sample>
