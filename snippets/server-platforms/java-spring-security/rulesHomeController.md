```java
package com.auth0.example;

import com.auth0.Auth0User;
import com.auth0.SessionUtils;
import com.auth0.spring.security.mvc.Auth0JWTToken;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;
import java.security.Principal;
import java.util.Map;

@Controller
public class HomeController {

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private AdminService adminService;

    @RequestMapping(value="/portal/home", method = RequestMethod.GET)
    protected String home(final Map<String, Object> model, final HttpServletRequest req, final Principal principal) {
        logger.info("Home page");
        final String name = principal.getName();
        logger.info("Principal name: " + name);
        adminChecks((Auth0JWTToken) principal);
        final Auth0User user = SessionUtils.getAuth0User(req);
        model.put("user", user);
        return "home";
    }

    /**
     *  Simple illustration only
     */
    private void adminChecks(final Auth0JWTToken principal) {
        for(final GrantedAuthority grantedAuthority: principal.getAuthorities()) {
            final String authority = grantedAuthority.getAuthority();
            logger.info(authority);
            if (("ROLE_ADMIN".equals(authority))) {
                // just a simple callout to demonstrate role based authorization at service level
                // non-Admin user would be rejected trying to call this service
                adminService.ensureAdmin();
            }
        }
    }

}
```
