---
title: C#
---

```cs
public class Startup
{
  public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
  {
    var keyAsBytes = Encoding.ASCII.GetBytes("<%= api.signing_secret %>");

    var options = new JwtBearerOptions
    {
      Audience = "<%= api.identifier %>",
      Authority = "https://<%= tenantDomain %>/",
      TokenValidationParameters =
      {
        IssuerSigningKey = new SymmetricSecurityKey(keyAsBytes)
      }
    };
    app.UseJwtBearerAuthentication(options);

    app.UseMvc();
  }
}
```
