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