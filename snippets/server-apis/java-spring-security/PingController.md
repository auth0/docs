```java
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@Component
public class PingController {

	@RequestMapping(value = "/ping")
	@ResponseBody
	public String ping() {
		return "All good. You DO NOT need to be authenticated to call /ping";
	}

	@RequestMapping(value = "/secured/ping")
	@ResponseBody
	public String securedPing() {
		return "All good. You DO need to be authenticated to call /secured/ping";
	}

}
```
