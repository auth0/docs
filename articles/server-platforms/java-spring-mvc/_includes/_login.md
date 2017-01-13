## Authenticate the User

You need to add the handler for the Auth0 callback so that you can authenticate the user and get their information. For that, we will use the `Auth0CallbackHandler` provided by the SDK.

Define a new Controller, configure it to use the `auth0.loginCallback` endpoint, and inherit from `Auth0CallbackHandler`.

Create a new `CallbackController.java` file and set the following contents:

${snippet(meta.snippets.use)}


## Display Lock Widget

In order to setup [Lock](/libraries/lock) update the `login.jsp` as follows:

```html
${'<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>'}
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="content-type" content="text/html; charset=utf-8"/>
    <title>Login</title>
    <link rel="stylesheet" type="text/css" href="/css/bootstrap.css"/>
    <link rel="stylesheet" type="text/css" href="/css/jquery.growl.css"/>
    <script src="http://code.jquery.com/jquery.js"></script>
    <script src="${lock_url}"></script>
    <script src="/js/jquery.growl.js" type="text/javascript"></script>
</head>
<body>
<div class="container">
    <script type="text/javascript">
        $(function () {
            var error = <%= "${error}" %>;
            if (error) {
                $.growl.error({message: "Please log in"});
            } else {
                $.growl({title: "Welcome!", message: "Please log in"});
            }
        });
        $(function () {
            var lock = new Auth0Lock('${account.clientId}', '${account.namespace}', {
                auth: {
                    redirectUrl: '<%= "${fn:replace(pageContext.request.requestURL, pageContext.request.requestURI, '')}" %>${account.callback}',
                    responseType: 'code',
                    params: {
                        state: '<%= "${state}" %>',
                        scope: 'openid user_id name nickname email picture'
                    }
                }
            });
            // delay to allow welcome message..
            setTimeout(function () {
                lock.show();
            }, 1500);
        });
    </script>
</div>
</body>
</html>
```

__NOTE__: The sample also includes several css, js, and font files, which are not listed in this document for brevity. These files can be found under the `auth0-spring-mvc-sample/src/main/resources/static/` directory and you don't need to include them if you don't want to.

First, we initialize `Auth0Lock` with a `clientID` and the account's `domain`.

```
var lock = new Auth0Lock('${account.clientId}', '${account.namespace}');
```

We set several parameters as input, like `redirectUrl` and `responseType`. For details on what each parameter does, refer to [Lock: User configurable options](/libraries/lock/customization).

Once the `Auth0Lock` is initialized we display the widget using `lock.show()`.


## Display User Information

Depending on what `scopes` you specified upon login, some user information may be available in the [id_token](/tokens#auth0-id_token-jwt-) received.

The full user profile information is available as a session object keyed on `Auth0User`, you can call `SessionUtils.getAuth0User()` to retrieve the information. However, because the authenticated user is also a `java.security.Principal` object we can inject it into the Controller automatically for secured endpoints.

Add the following to your `HomeController.java` file:

```java
@RequestMapping(value="/portal/home", method = RequestMethod.GET)
protected String home(final Map<String, Object> model, final Principal principal) {
  logger.info("Home page");
  final Auth0User user = (Auth0User) principal;
  logger.info("Principal name: "  user.getName());
  model.put("user", user);
  return "home";
}
```

__NOTE__: The value `/portal/home` should be replaced with the valid one for your implementation.

Once the user has successfully authenticated, the application displays the `home.jsp`. In order to display some user information, as retrieved from Auth0, update the `home.jsp` as follows:

```html
${'<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>'}
${'<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>'}
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Home Page</title>
    <link rel="stylesheet" type="text/css" href="/css/bootstrap.css">
    <link rel="stylesheet" type="text/css" href="/css/jumbotron-narrow.css">
    <link rel="stylesheet" type="text/css" href="/css/home.css">
    <link rel="stylesheet" type="text/css" href="/css/jquery.growl.css"/>
    <script src="http://code.jquery.com/jquery.js"></script>
    <script src="/js/jquery.growl.js" type="text/javascript"></script>
</head>

<body>

    <div class="container">
        <div class="header clearfix">
            <nav>
                <ul class="nav nav-pills pull-right">
                    <li class="active" id="home"><a href="#">Home</a></li>
                    <li id="logout"><a href="#">Logout</a></li>
                </ul>
            </nav>
            <h3 class="text-muted">App.com</h3>
        </div>

        <div class="jumbotron">
            <h3>Hello <%= "${user.name}" %>!</h3>
            <p class="lead">Your nickname is: <%= "${user.nickname}" %></p>
            <p class="lead">Your user id is: <%= "${user.userId}" %></p>
            <p><img class="avatar" src="<%= "${user.picture}" %>"/></p>
        </div>

        <div class="row marketing">
            <div class="col-lg-6">
                <h4>Subheading</h4>
                <p>Donec id elit non mi porta gravida at eget metus. Maecenas faucibus mollis interdum.</p>
                <h4>Subheading</h4>
                <p>Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Cras mattis consectetur purus sit amet fermentum.</p>
            </div>

            <div class="col-lg-6">
                <h4>Subheading</h4>
                <p>Donec id elit non mi porta gravida at eget metus. Maecenas faucibus mollis interdum.</p>

                <h4>Subheading</h4>
                <p>Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Cras mattis consectetur purus sit amet fermentum.</p>
            </div>
        </div>

        <footer class="footer">
            <p> &copy; 2016 Company Inc</p>
        </footer>

    </div>

    <script type="text/javascript">
        $(function () {
            $.growl({title: "Welcome  <%= "${user.nickname}" %>", message: "We hope you enjoy using this site!"});
        });
        $("#logout").click(function(e) {
            e.preventDefault();
            $("#home").removeClass("active");
            $("#password-login").removeClass("active");
            $("#logout").addClass("active");
            // assumes we are not part of SSO so just logout of local session
            window.location = "<%= "${fn:replace(pageContext.request.requestURL, pageContext.request.requestURI, '')}" %>/logout";
        });
    </script>

</body>
</html>
```

## Run the App

In order to build and run the app using Maven, execute the following:

```bash
mvn spring-boot:run
```

Then open your browser and go to [http://localhost:3099/login](http://localhost:3099/login). You can see the Lock widget.

![Login using Lock](/media/articles/java/login-with-lock.png)

The widget displays all the social and database connections that you have defined for this application in the [dashboard](${manage_url}/#/).

Once you login you are redirected to the home page that displays your profile picture, user id, and nickname.

![Display user information](/media/articles/java/display-user-info.png)

Log out by clicking the **Logout** button at the top right of the home page.
