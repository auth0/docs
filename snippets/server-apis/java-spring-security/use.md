```java
@Controller
public class SecuredPingController {

 @RequestMapping(value = "/secured/ping")
  @ResponseBody
  public String securedPing() {
    return "All good. You only get this message if you're authenticated";
  }
}
```
