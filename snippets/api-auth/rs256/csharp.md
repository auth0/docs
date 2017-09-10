---
title: C#
---

```cs
public class Startup
{
  public void ConfigureServices(IServiceCollection services)
  {
    services.AddMvc();
    
    // 1. Add Authentication Services
    services.AddAuthentication(options =>
    {
        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;

    }).AddJwtBearer(options =>
    {
        options.Authority = "https://${'<%= tenantDomain %>'}/";
        options.Audience = "${'<%= api.identifier %>'}";
    });
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

    // 2. Enable authentication middleware
    app.UseAuthentication();

    app.UseMvc(routes =>
    {
        routes.MapRoute(
            name: "default",
            template: "{controller=Home}/{action=Index}/{id?}");
    });
  }
}
```
