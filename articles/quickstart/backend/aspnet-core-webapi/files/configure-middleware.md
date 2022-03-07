---
name: Startup.cs
language: csharp
---

```csharp
public void ConfigureServices(IServiceCollection services)
{
  // Some code omitted for brevity...
  services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.Authority = $"https://{Configuration["Auth0:Domain"]}/";
        options.Audience = Configuration["Auth0:Audience"];
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

public void Configure(IApplicationBuilder app, IHostingEnvironment env)
{
  // Some code omitted for brevity...
  app.UseAuthentication();
  app.UseAuthorization();
}
```
