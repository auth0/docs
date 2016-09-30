# Integrating a Web App with Auth0

Auth0 supports the [OpenID Connect / OAuth2 Login](http://openid.net/specs/openid-connect-basic-1_0.html) protocol. This is the protocol used by companies like [Google](https://developers.google.com/accounts/docs/OAuth2Login), [Facebook](http://developers.facebook.com/docs/facebook-login/login-flow-for-web-no-jssdk/) and [Microsoft](http://msdn.microsoft.com/en-us/library/live/hh243647.aspx) among others so there are plenty of libraries implementing it on various platforms.

The steps are quite simple though:

1. Setting up the callback URL in Auth0

  <div class="setup-callback">
  <p>After authenticating the user on Auth0, we will do a GET to a URL on your web site. For security purposes, you have to register this URL  on the <strong>Application Settings</strong> section on Auth0 Admin app.</p>

  <pre><code>${account.callback}</pre></code>
  </div>

2. Triggering login manually or integrating the Auth0Lock

<%= include('../_includes/_lock-sdk') %>

3. After the user authenticates, your app will be called to this endpoint with a `GET`

  <pre style="word-wrap:break-word"><code>GET ${account.callback}?
        code=AUTHORIZATION_CODE
        &state=VALUE_THAT_SURVIVES_REDIRECTS</code></pre>

  > It is a good practice to check that the `state` value received and sent are the same. It can serve as a protection against XSRF attacks.

4. Your app will have to send the `code` to the Auth0 server through a POST

    <pre style="word-wrap:break-word"><code>POST https://${account.namespace}/oauth/token
    Content-type: application/x-www-form-urlencoded

    client_id=${account.clientId}
    &redirect_uri=${account.callback}
    &client_secret=${account.clientSecret}
    &code=AUTHORIZATION_CODE
    &grant_type=authorization_code</code></pre>

5. The response of the server will look like this

  <pre style="word-wrap:break-word"><code>{
     "access_token":"2YotnF..........1zCsicMWpAA",
     "id_token": "......Json Web Token......"
     "token_type":"bearer",
  }</code></pre>

  > The `access_token` can then be used to call Auth0's `userinfo` endpoint to get the attributes of the user. The `id_token` is a [Json Web Token](http://tools.ietf.org/html/draft-jones-json-web-token-08), also commonly used to authenticate API calls. Because it is signed with the app secret, you can use it to call other APIs that trust Auth0. An example of this is Windows Azure Mobile Services or your own Web API.

6. Finally, you can get the user profile by calling

  <pre style="word-wrap:break-word"><code>GET https://${account.namespace}/userinfo/?access_token=2YotnF..........1zCsicMWpAA</code></pre>

  The `userinfo` endpoint will return something like this

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
