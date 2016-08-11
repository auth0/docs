---
title: Custom Login
description: This tutorial will show you how to use the Auth0 library to add custom authentication and authorization to your web app.
---

::: panel-info System Requirements
This tutorial and seed project have been tested with the following:

* Java 1.7
* Maven 3.3
:::

<%= include('../../_includes/_package', {
githubUrl: 'https://github.com/auth0-samples/auth0-spring-security-mvc-sample/tree/master/02-Custom-Login',
pkgOrg: 'auth0-samples',
pkgRepo: 'auth0-spring-security-mvc-sample',
pkgBranch: 'master',
pkgPath: '02-Custom-Login',
pkgFilePath: null,
pkgType: 'none'
}) %>


The previous step explains how to login but with a widget called [Lock](/libraries/lock). Lock is completely optional so you can build an application with Auth0 using your custom design without having to include it. You just need to use the [Auth0.js library](https://github.com/auth0/auth0.js). Let's see how.

In our example we will configure a custom database connection to use with our custom login. We will also keep on building on our previous example, the one using Lock. We will add a flag that when set the custom login will be used, while when unset Lock will be used. This is completely optional of course, you can configure your own web app to use only custom login if this is what you want.

### Create a database connection

First we will create a new database connection and we will name it `custom-login-DB`. We will use Auth0 database infrastructure to store our users.

__NOTE:__ If you have an existing user store, or wish to store user credentials on your own server, see the custom database connection tutorial at [Authenticate Users with Username and Password using a Custom Database](/connections/database/mysql) for detailed steps on how to setup and configure it.

Log into Auth0, and select the [Connections > Database](${uiURL}/#/connections/database) menu option. Click the __Create DB Connection__ button and provide a name for the database.

You will be navigated to the connection's settings. At the __Applications Using This Connection__ enable the connection for your app.

Now let's create a user. Select the [Users](${uiURL}/#/users) menu option. Click the __Create User__ button and fill in the email, password, and the database at which the user will be created. Use an email address you have access to since creating the user will trigger a verification email to be sent. Click __Save__.

Head back to [Connections > Database](${uiURL}/#/connections/database) and select the __Try__ button on your new database so we can verify that our user can log in.

__NOTE:__ You can add also social connections. To do so you need to create the relevant button in your login form and the javascript to specify which connection to use, for example `google-oauth2`, `github`, etc. You can find details and some sample code on the [auth0.js](/libraries/auth0js#login) document.


### Create custom login

Since we decided to keep Lock as well, we will leave `login.jsp` as is and we will create a new file named `loginCustom.jsp`. Here is the code:

```html
${'<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>'}
${'<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>'}
${'<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags"%>'}
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="content-type" content="text/html; charset=utf-8"/>
    <title>Login</title>
    <link rel="stylesheet" type="text/css" href="/css/bootstrap.css"/>
    <link rel="stylesheet" type="text/css" href="/css/jquery.growl.css"/>
    <link rel="stylesheet" type="text/css" href="/css/bootstrap-theme.css">
    <link rel="stylesheet" type="text/css" href="/css/signin.css">
    <script src="http://code.jquery.com/jquery.js"></script>
    <script src="/js/jquery.growl.js" type="text/javascript"></script>
    <script src="http://cdn.auth0.com/w2/auth0-6.8.js"></script>
</head>
<body>
    <div class="container">
        <div class="container">
            <div class="form-signin">
                <h2 class="form-signin-heading">Portal Login</h2>
                <label for="email" class="sr-only">Email address</label>
                <input type="email" id="email" class="form-control" placeholder="Email address" required="" autofocus="">
                <label for="password" class="sr-only">Password</label>
                <input type="password" id="password" class="form-control" placeholder="Password" required="">
                <button id="signin-db" class="btn btn-lg btn-primary btn-block">Sign in</button>
            </div>
        </div>
        <script type="text/javascript">
            $(function () {
                var auth0 = new Auth0({
                    domain: '${account.namespace}',
                    clientID: '${account.clientId}',
                    callbackURL: '<%= "${fn:replace(pageContext.request.requestURL, pageContext.request.requestURI, '')}" %>${account.callback}'
                });
                var error = <%= "${error}" %>;
                if (error) {
                    $.growl.error({message: "Please log in"});
                } else {
                    $.growl({title: "Welcome!", message: "Please log in"});
                }
                $('#signin-db').on('click', function() {
                    auth0.login({
                        username: $('#email').val(),
                        password: $('#password').val(),
                        sso: true,
                        connection: '<%= "${connection}" %>',
                        // change scopes to whatever you like
                        // claims are added to JWT id_token - openid profile gives everything
                        scope: 'openid user_id name nickname email picture',
                        state: <%= "${state}" %>
                    }, function (err) {
                        // this only gets called if there was a login error
                        console.error('Portal Login Error: ' + err);
                    });
                });
            });
        </script>
    </div>
</body>
</html>
```

Notice the differences compared to `login.jsp`:

- The code uses the `auth0-6.8.js` library, instead of `lock-9.min.js`.
- We have added html to display a form for email and password input (div `form-signin`).
- The javascript code uses the `Auth0` class, instead of `Auth0Lock`.

__NOTE__: Login is probably not enough for you, users need to be able to sign up. To do so you have to call the `signup` method on the `auth0` instance. You can find details on how to do that in the [Custom Signup](/custom-signup) document.

Now let's go and add this flag we were talking about earlier. Edit the `auth0.properties` file:
- Add the line `auth0.customLogin: true`. If you need to disable it, so you can use Lock again, set the value to `false`.
- Set the value of `auth0.connection` to the name of the database connection you created earlier. If you follow our example, the value is `custom-login-DB`.

The next step is to read these attributes from our code. Edit the `AppConfig.java` file by adding the following code inside the `AppConfig` class:

```java
@Value(value = "<%= "${auth0.customLogin}" %>")
protected boolean customLogin;

@Value(value = "<%= "${auth0.connection}" %>")
protected String connection;

public boolean isCustomLogin() {
    return customLogin;
}

public String getConnection() {
    return connection;
}
```

The final step is to edit the `LoginController.java` class. Edit the `login` method as follows:

```java
protected String login(final Map<String, Object> model, final HttpServletRequest req) {
    logger.debug("Performing login");
    detectError(model);
    // add Nonce to storage
    NonceUtils.addNonceToStorage(req);
    model.put("clientId", auth0Config.getClientId());
    model.put("domain", auth0Config.getDomain());
    model.put("loginCallback", auth0Config.getLoginCallback());
    model.put("state", SessionUtils.getState(req));
    model.put("connection", appConfig.getConnection());
    // for this sample only, this just allows configuration to
    // use Lock Widget or Auth0.js for login presentation
    // should only enable loginCustom for DB connection
    return appConfig.isCustomLogin() ? "loginCustom" : "login";
}
```

Notice the last line. It checks the value of the `auth0.customLogin` and returns either `loginCustom` or `login`.

We have also added code to retrieve the connection name, the value of the `auth0.connection` property: `model.put("connection", appConfig.getConnection());`. This is the method we added in the previous step in the `AppConfig` class.

We are now ready to test the application. Build and run the project using `mvn spring-boot:run`. Then, go to [http://localhost:3099/login](http://localhost:3099/login).

![Custom Login](/media/articles/java/custom_login_form.png)

Enter the credentials of the user you created earlier to test the login.

That's it, you are done! You have implemented login without using Lock.


