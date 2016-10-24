---
description: Overview of single sign on with username and password logins.
---

# Single Sign On with username/password logins

To initiate SSO for a username/password connection (e.g. database connections, AD/LDAP, etc.) you can use this endpoint:

```
POST
https://${account.namespace}/usernamepassword/login
```

This endpoint accepts the following parameters:

```
{
  scope:'openid',
  response_type:'code',
  connection:'{YOUR CONNECTION}',
  username: username,
  password: password,
  sso: true|false,
  client_id:'{THE APP CLIENT ID}',
  redirect_uri:'{YOUR CALLBACK}',
  tenant:'${account.tenant}'
}
```

The response from this is an HTML form that can be injected on your web page DOM. The form is then submitted to complete the authentication. Through this process, a session cookie (that is, an auth0 cookie) is set on the users' browser that can then be used for SSO.

## Sample

```html
<html>
  <head>
    <title>Username Password SSO</title>
  </head>
  <body>
    <script src="https://code.jquery.com/jquery-2.2.3.min.js"></script>
    <h1>Username Password SSO</h1>
    <p>Welcome to Username Password SSO</p>
    <br>
    Username:<input id="username" type="text" name="username"><br>Password:<input id="password" type="text" name="password"><br>
    <button onclick="signin()">Login</button>
    <script>
      function signin(){
        var username = $('#username').val();
        var password = $('#password').val();

        var data = {
          scope:'openid',
          response_type:'code',
          connection:'{YOUR CONNECTION}',
          username: username,
          password: password,
          sso: true,
          client_id:'{YOUR CLIENT ID}',
          redirect_uri:'{YOUR APP CALLBACK}',
          tenant:'${account.tenant}'
        };

        $.post('https://${account.namespace}.auth0.com/usernamepassword/login', data, 
            function(formHtml){
              var div = document.createElement('div');
              div.innerHTML = formHtml;
              var form = document.body.appendChild(div).children[0];
              form.submit();
        },'text');
      }
    </script>
  </body>
</html>
```

This endpoint is conceptually similar to `/ro` (Resource Owner), the difference is that while `/ro` returns a JSON object with the result of the authentication (containing an `access_token` and optionally an `id_token`), `/usernamepassword/login` returns HTML of the form:

```html
<form method="post" name="hiddenform" action="https://{account.namespace}/login/callback">
    <input type="hidden" name="wa" value="wsignin1.0">
    <input type="hidden" 
           name="wresult" 
           value="eyJ0eXAiOiJKV........6RZk5oAcf2dknZfE">
    <input type="hidden" name="wctx" value="{&quot;strategy&quot;:&quot;auth0&quot;,&quot;auth0Client&quot;:&quot;&quot;,&quot;tenant&quot;:&quot;${account.tenant}&quot;,&quot;connection&quot;:&quot;YOUR_CONNECTION&quot;,&quot;client_id&quot;:&quot;YOUR_CLIENT_ID&quot;,&quot;response_type&quot;:&quot;code&quot;,&quot;scope&quot;:&quot;openid&quot;,&quot;redirect_uri&quot;:&quot;YOUR_CALLBACK&quot;,&quot;session_user&quot;:&quot;123456789&quot;}">
    <noscript>
        <p>
          Script is disabled. Click Submit to continue.
        </p>
        <input type="submit" value="Submit">
    </noscript>
</form>
```

Submitting this form to Auth0 will result in the completion of the authentication request (a final redirect to your application callback URL). Notice this works for both `response_types=code|token`. (See [Protocols](/protocols) for details on both).

A complete sample is available [here](https://github.com/auth0-samples/auth0-database-connection-custom-sso).
