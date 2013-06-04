# Integrating a Mobile or JavaScript App with Auth0

Auth0 supports the [OAuth implicit flow](http://tools.ietf.org/html/rfc6749#section-4.2), which is typically used in situations where you can't store the `clientSecret` safely. Javascript running in a browser and mobile devices are two common examples.

1. Redirect the user to:

  <pre style="word-wrap:break-word"><code>GET https://@@account.namespace@@/authorize/?client_id=@@account.clientId@@&response_type=token&redirect_uri=@@account.callback@@state=VALUE_THAT_SURVIVES_REDIRECTS&scope=openid&connection=YOUR_CONNECTION</code></pre>

2. After the user authenticates, your app will be called to this endpoint with a `GET`

  <pre style="word-wrap:break-word"><code>GET @@account.callback@@#access_token=2YotnF..........1zCsicMWpAA&id_token=......Json Web Token......&token_type=bearer&state=VALUE_THAT_SURVIVES_REDIRECTS</code></pre>


Your code would then parse the hash segment of the URL and extract the parameters: `access_token`, `id_token`, etc.

It is a good practice to check that the `state` value received and sent are the same. 
 
The `access_token` can then be used to call Auth0's API. `id_token` is a Json Web Token, also commonly used to authenticate API calls. Because it is signed, you can use it to call other APIs that trust Auth0. An example of this is Windows Azure Mobile Services. 

> If you are calling a third party API from JavaScript on a browser, and the API is hosted on a different domain your web site is, considering using CORS.

3. Finally, you can get the user profile by calling

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