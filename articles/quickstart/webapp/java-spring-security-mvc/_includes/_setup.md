## Configure Spring Security to Use Auth0 

### Setup Dependencies

You'll need to configure **Spring Boot** in your project first. You can generate the base project in [this](https://start.spring.io/) link, choosing `Web` in the dependencies and clicking the button "Generate Project". The downloaded project has the Spring Boot dependencies and plugin applied. 
The next step is to add the **auth0-java-mvc-commons** library. This allows you to use Auth0 with Java for server-side MVC web apps. It generates the Authorize URL that you need to call in order to authenticate and validates the result received on the way back to finally obtain the [Auth0 Tokens](/tokens) that identify the user. You can always check the latest version in the [library's GitHub](https://github.com/auth0/auth0-java-mvc-common).

If you are using Gradle, add it to your `build.gradle`:

```java
// build.gradle

dependencies {
    implementation 'com.auth0:mvc-auth-commons:1.+'
}
```

If you are using Maven, add it to your `pom.xml`:

```xml
<!-- pom.xml -->

<dependency>
  <groupId>com.auth0</groupId>
  <artifactId>mvc-auth-commons</artifactId>
  <version>[1.0, 2.0)</version>
</dependency>
```

### Configure your Java Spring Security App

Your Java Spring Security App needs some information in order to authenticate against your Auth0 account. The samples read this information from the properties file `src/main/resources/auth0.properties`, but you could store them anywhere else. The required information is:

```xml
// src/main/resources/auth0.properties

com.auth0.domain: ${account.namespace}
com.auth0.clientId: ${account.clientId}
com.auth0.clientSecret: 'YOUR_CLIENT_SECRET'
```

By default, the **auth0-java-mvc-commons** library will execute the [Open ID Connect](https://openid.net/specs/openid-connect-core-1_0-final.html) Authorization Code Flow and verify the ID token using the **HS256 symmetric algorithm**. This article will demonstrate how to configure the library for use with the **RS256 asymmetric algorithm**, which is the recommended signing algorithm.

To learn more about the library, including its various configuration options, see the [README](https://github.com/auth0/auth0-java-mvc-common/blob/master/README.md) of the library.

::: panel Check populated attributes
If you download the seed using our **Download Sample** button then the `domain`, `clientId` and `clientSecret` attributes will be populated for you, unless you are not logged in or you do not have at least one registered application. In any case, you should verify that the values are correct if you have multiple applications in your account and you might want to use another than the one we set the information for.
:::
