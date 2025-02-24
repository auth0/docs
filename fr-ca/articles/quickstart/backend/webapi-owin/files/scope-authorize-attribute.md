---
name: ScopeAuthorizeAttribute.cs
language: csharp
---

```csharp
public class ScopeAuthorizeAttribute : AuthorizeAttribute
{
    private readonly string scope;

    public ScopeAuthorizeAttribute(string scope)
    {
        this.scope = scope;
    }

    public override void OnAuthorization(HttpActionContext actionContext)
    {
        base.OnAuthorization(actionContext);

        // Get the Auth0 domain, in order to validate the issuer
        var domain = $"https://{ConfigurationManager.AppSettings["Auth0Domain"]}/";

        // Get the claim principal
        ClaimsPrincipal principal = actionContext.ControllerContext.RequestContext.Principal as ClaimsPrincipal;

        // Get the scope clain. Ensure that the issuer is for the correcr Auth0 domain
        var scopeClaim = principal?.Claims.FirstOrDefault(c => c.Type == "scope" && c.Issuer == domain);
        if (scopeClaim != null)
        {
            // Split scopes
            var scopes = scopeClaim.Value.Split(' ');

            // Succeed if the scope array contains the required scope
            if (scopes.Any(s => s == scope))
                return;
        }

        HandleUnauthorizedRequest(actionContext);
    }
}
```