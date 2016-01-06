---
title: Java API Tutorial
name: Java API
thirdParty: false
alias:
  - java
languages:
  - Java
image: /media/platforms/java.png
tags:
  - quickstart
snippets:
  dependencies: server-apis/java/dependencies
  use: server-apis/java/use
---

## Java API Tutorial

<%= include('../_includes/_package', {
  pkgRepo: 'auth0-java',
  pkgBranch: 'master',
  pkgPath: 'examples/java-api',
  pkgFilePath: null,
  pkgType: 'none'
}) %>

Then, you just need to specify your Auth0 account configuration as enviroment variables. [Check it here](https://github.com/auth0/auth0-java/blob/master/examples/java-api/README.md#running-the-example)

**Otherwise, Please follow the steps below to configure your existing Java app to use it with Auth0.**

### 1. Add java-jwt dependency

You need to add the `java-jwt` and `commons-codec` dependencies.

For that, you can just add them to your `pom.xml` if you're using maven.

${snippet(meta.snippets.dependencies)}

### 2. Add JWT Validation filter

> Dropwizard users: make sure to ignore the requests that contain `OPTIONS` as method. You can do that by checking `"OPTIONS".equals(request.getMethod())` and calling `chain.doFilter(request, response); return;` in  `JWTFilter`.

Now, you need to validate the [JWT](/jwt). For that, we'll use a Filter.

${snippet(meta.snippets.use)}

Please note that we're setting the URL Pattern to `/api/*` in this case. That means that we'll check the user is authenticated only if the request is to the API.

Please note that if you're using Servlets 2.5, you won't be able to use the `@WebFilter` annotation. In that case, add the following to your `web.xml`:

```xml
<filter>
  <filter-name>JWTFilter</filter-name>
  <filter-class>com.auth0.example.JWTFilter</filter-class>
</filter>

<!-- We are going to restrict /api/* paths -->
<filter-mapping>
  <filter-name>JWTFilter</filter-name>
  <url-pattern>/api/*</url-pattern>
</filter-mapping>
```


### 4. You're done!

Now you have both your FrontEnd and Backend configured to use Auth0. Congrats, you're awesome!
