## Configure Spring to Use Auth0 

### Setup Dependencies

You will need to add the following dependencies to your Spring project:

* [Spring Boot Web Starter](https://mvnrepository.com/artifact/org.springframework.boot/spring-boot-starter-web) is a Spring Boot Starter for building Spring MVC web applications. This tutorial requires version **1.5**.
* [Auth0 Java MVC Commons](https://github.com/auth0/auth0-java-mvc-common) enables authentication with Auth0 in Java MVC web applications.

You also need to add a Servlet Container as a dependency. You can refer to the [sample application](https://github.com/auth0-samples/auth0-spring-mvc-sample) to see an example using [Apache Tomcat](https://tomcat.apache.org/).

If you are using Gradle, update your `build.gradle` file to include:

```java
compile 'org.springframework.boot:spring-boot-starter-web:1.5.+'
compile 'com.auth0:mvc-auth-commons:1.+'
```

If you are using Maven, update your `pom.xml` to include:

```xml
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-web</artifactId>
  <version>[1.5, 2.0)</version>
</dependency>
<dependency>
  <groupId>com.auth0</groupId>
  <artifactId>mvc-auth-commons</artifactId>
  <version>[1.0, 2.0)</version>
</dependency>
```

### Configure your Java Spring App

Your Spring application needs some information about your Auth0 Application in order for users to login. The sample stores this information in the `src/main/resources/auth0.properties` file. The required information is:

```xml
com.auth0.domain: ${account.namespace}
com.auth0.clientId: ${account.clientId}
com.auth0.clientSecret: YOUR_CLIENT_SECRET
```

::: panel Check populated attributes
If you download the sample using the **Download Sample** button, the `domain`, `clientId` and `clientSecret` attributes will be populated for you. You should verify that the values are correct, especially if you have multiple Auth0 Applications.
:::
