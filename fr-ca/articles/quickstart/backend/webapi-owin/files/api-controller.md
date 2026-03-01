---
name: ApiController.cs
language: csharp
---

```csharp
[RoutePrefix("api")]
public class ApiController : ApiController
{
    [HttpGet]
    [Route("public")]
    public IHttpActionResult Public()
    {
        return Json(new
        {
            Message = "Hello from a public endpoint!"
        });
    }

    [HttpGet]
    [Route("private")]
    [Authorize]
    public IHttpActionResult Private()
    {
        return Json(new
        {
            Message = "Hello from a private endpoint! You need to be authenticated to see this."
        });
    }

    [HttpGet]
    [Route("private-scoped")]
    [ScopeAuthorize("read:messages")]
    public IHttpActionResult Scoped()
    {
        return Json(new
        {
            Message = "Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this."
        });
    }
}
```