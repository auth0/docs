---
name: Program.cs
language: csharp
---

```csharp
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
.AddJwtBearer(options =>
{
    options.Authority = $"https://{builder.Configuration["Auth0:Domain"]}/";
    options.Audience = builder.Configuration["Auth0:Audience"];
    options.TokenValidationParameters = new TokenValidationParameters
    {
        NameClaimType = ClaimTypes.NameIdentifier
    };
});

    builder.Services
      .AddAuthorization(options =>
      {
          options.AddPolicy(
            "read:messages",
            policy => policy.Requirements.Add(
              new HasScopeRequirement("read:messages", domain)
            )
          );
      });

    builder.Services.AddSingleton<IAuthorizationHandler, HasScopeHandler>();

var app = builder.Build();
app.UseAuthentication();
app.UseAuthorization();
```
