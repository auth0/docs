---
name: Startup.cs
language: csharp
---

```csharp
public void Configure(IApplicationBuilder app, IHostingEnvironment env)
{
    app.UseAuthentication();
    app.UseAuthorization();
}

public void ConfigureServices(IServiceCollection services)
{
    services
        .AddAuth0WebAppAuthentication(options => {
            options.Domain = Configuration["Auth0:Domain"];
            options.ClientId = Configuration["Auth0:ClientId"];
        });

    services.AddControllersWithViews();
}
```