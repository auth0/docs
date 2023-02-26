---
name: Startup.cs
language: csharp
---

```csharp
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

    services
      .AddAuthorization(options =>
      {
          options.AddPolicy(
            "read:messages",
            policy => policy.Requirements.Add(
              new HasScopeRequirement("read:messages", domain)
            )
          );
      });

    services.AddSingleton<IAuthorizationHandler, HasScopeHandler>();
}

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy(
        "read:messages",
         policy => policy.Requirements.Add(
            new HasScopeRequirement("read:messages", domain)
        )
    );
});

services.AddSingleton<IAuthorizationHandler, HasScopeHandler>();

app.UseAuthentication();
app.UseAuthorization();
```
