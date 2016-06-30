---
title: C#
---

```cs
public class Startup
{
  public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
  {
    var options = new JwtBearerOptions
    {
      Audience = "<%= api.identifier %>",
      Authority = "https://<%= tenantDomain %>/"
    };
    app.UseJwtBearerAuthentication(options);
    
    app.UseMvc();
  }
}
```
