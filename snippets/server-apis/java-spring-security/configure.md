```java
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.annotation.PropertySources;

@SpringBootApplication
@ComponentScan(basePackages = {"com.auth0.spring.security.api"})
@EnableAutoConfiguration
@PropertySources({
  @PropertySource("classpath:application.properties"),
  @PropertySource("classpath:auth0.properties")
})
/*
 * Your application class
 */
```
