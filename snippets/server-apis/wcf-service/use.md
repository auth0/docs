```cs
public class Service1 : IService1
{
    public string DoWork()
    {
        var claims = ((IClaimsIdentity)Thread.CurrentPrincipal.Identity).Claims;
        string email = claims.SingleOrDefault(c => c.ClaimType == "email");

        return "Hello from WCF " + User.Identity.Name +  " (" + email + ")";
    }
}
```
