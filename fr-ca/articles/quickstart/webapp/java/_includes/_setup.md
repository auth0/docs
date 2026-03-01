## Integrate Auth0 in your Application

### Setup Dependencies

To integrate your Java application with Auth0, add the following dependencies:

- **javax.servlet-api**: is the library that allows you to create Java Servlets. You then need to add a Server dependency like Tomcat or Gretty, which one is up to you. Check our sample code for more information.
- **auth0-java-mvc-commons**: is the [Java library](https://github.com/auth0/auth0-java-mvc-common) that allows you to use Auth0 with Java for server-side MVC web apps. It generates the Authorize URL that you need to call in order to authenticate and validates the result received on the way back to finally obtain the [Auth0 Tokens](/tokens) that identify the user.

If you are using Gradle, add them to your `build.gradle`:

```java
// build.gradle

compile 'javax.servlet:javax.servlet-api:3.1.0'
compile 'com.auth0:mvc-auth-commons:1.+'
```

If you are using Maven, add them to your `pom.xml`:

```xml
<!-- pom.xml -->

<dependency>
  <groupId>com.auth0</groupId>
  <artifactId>mvc-auth-commons</artifactId>
  <version>[1.0, 2.0)</version>
</dependency>
<dependency>
  <groupId>javax.servlet</groupId>
  <artifactId>javax.servlet-api</artifactId>
  <version>3.1.0</version>
</dependency>
```

### Configure your Java App

Your Java App needs some information in order to authenticate against your Auth0 account. The samples read this information from the deployment descriptor file `src/main/webapp/WEB-INF/web.xml`, but you could store them anywhere else. The required information is:

```xml
<!-- src/main/webapp/WEB-INF/web.xml -->

<context-param>
    <param-name>com.auth0.domain</param-name>
    <param-value>${account.namespace}</param-value>
</context-param>

<context-param>
    <param-name>com.auth0.clientId</param-name>
    <param-value>${account.clientId}</param-value>
</context-param>

<context-param>
    <param-name>com.auth0.clientSecret</param-name>
    <param-value>YOUR_CLIENT_SECRET</param-value>
</context-param>
```

This information will be used to configure the **auth0-java-mvc-commons** library to enable users to login to your application. To learn more about the library, including its various configuration options, see the [library's documentation](https://github.com/auth0/auth0-java-mvc-common/blob/master/README.md).


::: panel Check populated attributes
If you downloaded this sample using the **Download Sample** button, the `domain`, `clientId` and `clientSecret` attributes will be populated for you. You should verify that the values are correct, especially if you have multiple Auth0 applications in your account.
:::
