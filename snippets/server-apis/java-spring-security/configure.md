```java
import org.springframework.context.annotation.*;

@Configuration
@ComponentScan("com.auth0")
@ImportResource("classpath:auth0-security-context.xml")
@PropertySource("classpath:auth0.properties")
/*
 * Your application class
 */
```
