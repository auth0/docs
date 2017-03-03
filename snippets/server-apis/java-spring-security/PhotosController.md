```java
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@Component
public class PhotosController {

    @RequestMapping(value = "/login")
    @ResponseBody
    public String login() {
        return "All good. You DO NOT need to be authenticated to call /login";
    }

    @RequestMapping(value = "/photos", method = RequestMethod.GET)
    @ResponseBody
    public String getPhotos() {
        return "All good. You can see this because you are Authenticated with a Token granted the 'read:photos' scope";
    }

    @RequestMapping(value = "/photos", method = RequestMethod.POST)
    @ResponseBody
    public String createPhotos() {
        return "All good. You can see this because you are Authenticated with a Token granted the 'create:photos' scope";
    }

    @RequestMapping(value = "/photos", method = RequestMethod.PUT)
    @ResponseBody
    public String updatePhotos() {
        return "All good. You can see this because you are Authenticated with a Token granted the 'update:photos' scope";
    }

    @RequestMapping(value = "/photos", method = RequestMethod.DELETE)
    @ResponseBody
    public String deletePhotos() {
        return "All good. You can see this because you are Authenticated with a Token granted the 'delete:photos' scope";
    }

    @RequestMapping(value = "/**")
    @ResponseBody
    public String anyRequest() {
        return "All good. You can see this because you are Authenticated.";
    }

}
```
