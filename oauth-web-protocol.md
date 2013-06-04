# Integrating a Web App with Auth0

Auth0 implements the [OpenID Connect / OAuth2 Login](http://openid.net/specs/openid-connect-basic-1_0.html) protocol. This is the protocol used by companies like [Google](https://developers.google.com/accounts/docs/OAuth2Login), [Facebook](http://developers.facebook.com/docs/facebook-login/login-flow-for-web-no-jssdk/) and [Microsoft](http://msdn.microsoft.com/en-us/library/live/hh243647.aspx) among others so there are plenty of libraries implementing it on various platforms.

The steps are quite simple though:

1. Redirect the user to:

  <pre style="word-wrap:break-word"><code>GET https://@@account.namespace@@/authorize/?client_id=@@account.clientId@@&response_type=code&redirect_uri=@@account.callback@@state=VALUE_THAT_SURVIVES_REDIRECTS&scope=openid</code></pre>

2. After the user authenticates, your app will be called to this endpoint with a `GET`

  <pre style="word-wrap:break-word"><code>GET @@account.callback@@?code=AUTHORIZATION_CODE&state=VALUE_THAT_SURVIVES_REDIRECTS</code></pre>

3. Your app will have to send the `code` to the Auth0 server through a POST

    <pre style="word-wrap:break-word"><code>POST https://@@account.namespace@@/oauth/token
    Content-type: application/x-www-form-urlencoded
    client_id=@@account.clientId@@&redirect_uri=@@account.callback@@&client_secret=@@account.clientSecret@@&code=AUTHORIZATION_CODE&grant_type=authorization_code</code></pre> 

4. The response of the server will look like this

  <pre style="word-wrap:break-word"><code>{
     "access_token":"2YotnF..........1zCsicMWpAA",
     "id_token": "......Json Web Token......"
     "token_type":"bearer",
  }</code></pre>

5. Finally, you can get the user profile by calling

  <pre style="word-wrap:break-word"><code>GET https://@@account.namespace@@/userinfo/?access_token=2YotnF..........1zCsicMWpAA</code></pre>

6. The `userinfo` endpoint will return something like this

  <pre><code>{
    "_id": "4f2c8414310f59ce5f6aac652170ad43", // internal Auth0 id, don't use
    "email": "johnfoo@gmail.com",
    "family_name": "Foo",
    "gender": "male",
    "given_name": "John",
    "identities": [
      {
        "access_token": "ya29.AsaS6ZQgRHlCHqzZ3....sFFBpQYpVVieSWur-7tmZbzEtwMkA",
        "provider": "google-oauth2",
        "user_id": "103547991597142817347",
        "connection": "google-oauth2",
        "isSocial": true
      }
    ],
    "locale": "en",
    "name": "John Foo",
    "nickname": "matiasw",
    "picture": "https://lh4.googleusercontent.com/-OdsbOXom9qE/AAAAAAAAAAI/AAAAAAAAADU/_j8SzYTOJ4I/photo.jpg",
    "user_id": "google-oauth2|103547991597142817347"
  }</code></pre>

For more details on Auth0's normalized user profile, see [here](user-profile).