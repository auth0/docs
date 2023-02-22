---
name: Program.cs
language: csharp
---

```csharp
builder.Services.AddControllersWithViews();
builder.Services.AddAuth0WebAppAuthentication(options =>
{
    options.Domain = builder.Configuration["Auth0:Domain"];
    options.ClientId = builder.Configuration["Auth0:ClientId"];
});

app.UseAuthentication();
app.UseAuthorization();
```