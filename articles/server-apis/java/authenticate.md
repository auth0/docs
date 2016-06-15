---
title: Authenticate
description: This tutorial will show you how to use the Auth0 Java SDK to add authentication and authorization to your API.
---

## Java API Tutorial

You can get started by either downloading the seed project or if you would like to add Auth0 to an existing application you can follow the tutorial steps.

::: panel-info System Requirements
This tutorial and seed project have been tested with the following:

* Java 1.8
* Maven 3.3
:::

<%= include('../../_includes/_package', {
  pkgRepo: 'auth0-servlet',
  pkgBranch: 'master',
  pkgPath: 'examples/java-api',
  pkgFilePath: null,
  pkgType: 'none'
}) %>

Then, you just need to specify your Auth0 account configuration as enviroment variables. [Check it here](https://github.com/auth0/auth0-servlet/blob/master/examples/java-api/README.md#running-the-example)

**If you have an existing application, please follow the steps below.**

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


### 3. Call Your API

You can now make requests against your secure API by providing the Authorization header in your requests with a valid JWT id_token.

```har
{
  "method": "GET",
  "url": "http://localhost:8000/path_to_your_api",
  "headers": [
    { "name": "Authorization", "value": "Bearer YOUR_ID_TOKEN_HERE" }
  ]
}
```

### 4. You're done!

Now you have both your FrontEnd and Backend configured to use Auth0. Congrats, you're awesome!
