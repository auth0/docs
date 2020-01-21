## Configure Java EE to use Auth0

### Set up dependencies

To integrate your Java EE application with Auth0, add the following dependencies:

- **javax.javaee-api**: The Java EE 8 API necessary to write applications using Java EE 8. The actual implementation is provided by the application container, so it does not need to be included in the WAR file.
- **javax.security.enterprise**: The Java EE 8 Security API that enables handling security concerns in an EE application. Like the `javax.javaee-api` dependency, the implementation is provided by the application container, so is not included in the WAR file.
- **auth0-java-mvc-commons**: The [Auth0 Java MVC SDK](https://github.com/auth0/auth0-java-mvc-common) allows you to use Auth0 with Java for server-side MVC web applications. It generates the Authorize URL that your application needs to call in order to authenticate a user using Auth0.

If you are using Maven, add these dependencies to your `pom.xml`:

```xml
<!-- pom.xml -->

<dependency>
    <groupId>com.auth0</groupId>
    <artifactId>mvc-auth-commons</artifactId>
    <version>[1.0, 2.0)</version>
</dependency>
<dependency>
    <groupId>javax</groupId>
    <artifactId>javaee-api</artifactId>
    <version>8.0.1</version>
    <scope>provided</scope>
</dependency>
<dependency>
    <groupId>javax.security.enterprise</groupId>
    <artifactId>javax.security.enterprise-api</artifactId>
    <version>1.0</version>
    <scope>provided</scope>
</dependency>
```

If you are using Gradle, add them to your `build.gradle`:

```java
// build.gradle

providedCompile 'javax:javaee-api:8.0.1'
providedCompile 'javax.security.enterprise:javax.security.enterprise-api:1.0'
implementation 'com.auth0:mvc-auth-commons:1.+'
```

### Configure your Java EE application

::: note
The sample that accompanies this tutorial is written using JSP and tested with the [WildFly](https://wildfly.org/) application server. You may need to adjust some of the steps if you working with a different application container or technologies.
:::

Your Java EE application needs some information in order to authenticate users with your Auth0 application. The deployment descriptor `web.xml` file can be used to store this information, though you could store them in a different secured location. The required information is:


```xml
<!-- `src/main/webapp/WEB-INF/web.xml`-->

<env-entry>
    <env-entry-name>auth0.domain</env-entry-name>
    <env-entry-type>java.lang.String</env-entry-type>
    <env-entry-value>${account.namespace}</env-entry-value>
</env-entry>
<env-entry>
    <env-entry-name>auth0.clientId</env-entry-name>
    <env-entry-type>java.lang.String</env-entry-type>
    <env-entry-value>${account.clientId}</env-entry-value>
</env-entry>
<env-entry>
    <env-entry-name>auth0.clientSecret</env-entry-name>
    <env-entry-type>java.lang.String</env-entry-type>
    <env-entry-value>YOUR_CLIENT_SECRET</env-entry-value>
</env-entry>
<env-entry>
    <env-entry-name>auth0.scope</env-entry-name>
    <env-entry-type>java.lang.String</env-entry-type>
    <env-entry-value>openid profile email</env-entry-value>
</env-entry>
```

This information will be used to configure the **auth0-java-mvc-commons** library to enable users to login to your application. To learn more about the library, including its various configuration options, see the [README](https://github.com/auth0/auth0-java-mvc-common/blob/master/README.md) of the library.

::: panel Check populated attributes
If you downloaded this sample using the **Download Sample** button, the `domain`, `clientId` and `clientSecret` attributes will be populated for you. You should verify that the values are correct, especially if you have multiple Auth0 applications in your account.
:::
