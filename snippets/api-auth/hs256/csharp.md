---
title: C#
---

```cs
public class Startup
{
  public void ConfigureServices(IServiceCollection services)
  { 
    // 1. Add Authentication Services
    services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
      .AddJwtBearer(options =>
      {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidIssuer = "https://${'<%= tenantDomain %>'}/",
            ValidAudience = "${'<%= api.identifier %>'}",
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("${'<%= api.signing_secret %>'}"))
        };
      });

    services.AddControllers();
  }

  public void Configure(IApplicationBuilder app, IHostingEnvironment env)
  {
    if (env.IsDevelopment())
    {
        app.UseDeveloperExceptionPage();
    }
    else
    {
        app.UseExceptionHandler("/Home/Error");
    }

    app.UseStaticFiles();

    app.UseRouting();

    // 2. Enable authentication and authorization middleware
    app.UseAuthentication();
    app.UseAuthorization();

    app.UseEndpoints(endpoints =>
    {
        endpoints.MapControllers();
    });
  }
}
```
