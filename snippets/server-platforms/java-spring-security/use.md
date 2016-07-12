```java
package com.auth0.example;

import com.auth0.web.Auth0CallbackHandler;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Controller
public class CallbackController extends Auth0CallbackHandler {

    @RequestMapping(value = "<%= "${auth0.loginCallback}" %>", method = RequestMethod.GET)
    protected void callback(final HttpServletRequest req, final HttpServletResponse res) throws ServletException, IOException {
        super.handle(req, res);
    }
}
```
