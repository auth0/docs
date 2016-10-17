---
description: How to integrate a mobile app or Javascript app with Auth0.
---

# Integrating a Mobile or a JavaScript App with Auth0

Auth0 supports the [OpenID Connect / OAuth2 Login implicit profile](http://openid.net/specs/openid-connect-implicit-1_0.html), which is typically used in situations where you can't store the secrets safely. JavaScript running in a browser and mobile devices are two common examples.

The steps are quite simple though:

1. Redirect the user to:

  <pre style="word-wrap:break-word"><code>GET https://${account.namespace}/authorize/?
        response_type=token
        &client_id=${account.clientId}
        &redirect_uri=${account.callback}
        &state=VALUE_THAT_SURVIVES_REDIRECTS
        &nonce=RANDOM_VALUE
        &scope=openid</code></pre>

  > In a **JavaScript app** you can optionally use the [Login Widget](login-widget2) to trigger the login. Or you can do it manually and send a `connection` parameter in the querystring that will redirect the user straight to the desired connection.
  In a **mobile/native app**, you would use a Web View or the browser. Also, you can optionally send a `connection` parameter in the querystring that will redirect the user straight to the desired connection. This is useful when you want to control the UI instead of relying on the [Login Widget](login-widget2).

2. After the user authenticates, your app will be called to this endpoint with a `GET`

  <pre style="word-wrap:break-word"><code>GET ${account.callback}#
        access_token=2YotnF..........1zCsicMWpAA
        &id_token=......Json Web Token......
        &token_type=bearer
        &state=VALUE_THAT_SURVIVES_REDIRECTS</code></pre>


  Your code would then parse the hash segment of the URL and extract the parameters: `access_token` and `id_token`.

  > The `access_token` can then be used to call Auth0's `userinfo` endpoint to get the attributes of the user.

  > It is a good practice to check that the `state` value received and sent are the same. It can serve as a protection against XSRF attacks. Also, to avoid replay token attacks, you should send a nonce in the initial request. The nonce will be part of the Json Web Token and can be checked in your backend API.

3. Finally, you can get the user profile by calling

  <pre style="word-wrap:break-word"><code>GET https://${account.namespace}/userinfo?access_token=2YotnF..........1zCsicMWpAA</code></pre>

6. The `userinfo` endpoint will return something like this

  <pre><code>{
    "user_id": "google-oauth2|103547991597142817347",
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
    "picture": "https://lh4.googleusercontent.com/-OdsbOXom9qE/AAAAAAAAAAI/AAAAAAAAADU/_j8SzYTOJ4I/photo.jpg"
  }</code></pre>

For more details on Auth0's normalized user profile, see [here](/user-profile).
