---
name: Program.cs
language: csharp
---

```csharp
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllersWithViews();
builder.Services.ConfigureSameSiteNoneCookies();
// Cookie configuration for HTTPS
//  builder.Services.Configure<CookiePolicyOptions>(options =>
//  {
//     options.MinimumSameSitePolicy = SameSiteMode.None;
//  });
builder.Services.AddAuth0WebAppAuthentication(options =>
{
    options.Domain = builder.Configuration["Auth0:Domain"];
    options.ClientId = builder.Configuration["Auth0:ClientId"];
});

var app = builder.Build();

app.UseAuthentication();
app.UseAuthorization();
```