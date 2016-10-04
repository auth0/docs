## Authenticate the User

You can use the `Auth0CallbackHandler` provided by the SDK to authenticate the user. This should work as-is based on the configuration you setup in `web.xml`.

For more fine-grained control, you can inherit the library version of `Auth0CallbackHandler` to override methods for tailored behavior. See the [Auth0 Servlet ReadMe](https://github.com/auth0/auth0-servlet) on GitHub for details.


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
  <script src="http://cdn.auth0.com/js/lock/10.0.0-rc.2/lock.min.js"></script>
  <script src="/js/jquery.growl.js" type="text/javascript"></script>
</head>
<body>
  <div class="container">
    <script type="text/javascript">
      $(function () {
        $.growl({title: "Welcome!", message: "Please log in"});
      });

      $(function () {
        var lock = new Auth0Lock('${account.clientId}', '${account.namespace}', {
          auth: {
            params: {
              state: <%= "${state}" %>,
              // change scopes to whatever you like, see https:///scopes
              // claims are added to JWT id_token - openid profile gives everything
              scope: 'openid user_id name nickname email picture'
            },
            responseType: 'code',
            redirectUrl: '<%= "${fn:replace(pageContext.request.requestURL, pageContext.request.requestURI, '')}" %>' + '/callback'
          }
        });
        lock.show();
      });
    </script>
  </div>
</body>
</html>
```

__NOTE__: The sample also includes several css, js, and font files, which are not listed in this document for brevity. These files can be found under the `webapp` directory and you don't need to include them if you don't want to. The only necessary file is the `${lock_url}`.

First, we initialize `Auth0Lock` with a `clientID` and the account's `domain`.

```js
var lock = new Auth0Lock('${account.clientId}', '${account.namespace}');
```

Afterwards, we use the `showSignin` method to open the widget on signin mode. We set several parameters as input, like `authParams` and `responseType`. For details on what each parameter does, refer to [Lock: User configurable options](/libraries/lock/customization).


## Display User Information

Depending on which `scopes` you specified upon login, some user information may be available in the [id_token](/tokens#auth0-id_token-jwt-) received.

The full user profile information is available as a session object keyed on `Auth0User`, you can call `SessionUtils.getAuth0User()` to retrieve it.

However, because the authenticated user is also a `java.security.Principal` object we can inject it into the Controller automatically for secured endpoints.

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
        $.growl({title: "Welcome <%= "${user.nickname}" %>", message: "We hope you enjoy using this site!"});
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

### Run the App

To build and run the app using Maven, execute the following:

```bash
mvn clean install tomcat7:run
```

Then open your browser and go to [http://localhost:3099/login](http://localhost:3099/login). You can see the Lock widget.

![Login using Lock](/media/articles/java/login-with-lock.png)

The widget displays all the social and database connections that you have defined for this application in the [dashboard](${manage_url}/#/).

Once you login you are redirected to the home page that displays your profile picture, user id, and nickname.

![Display user information](/media/articles/java/display-user-info.png)

Logout by clicking the **Logout** button at the top right of the home page.