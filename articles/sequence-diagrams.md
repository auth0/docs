# Sequence Diagrams

## Single Page Applications

The following sequence diagram shows the typical authentication flow of a single page application.

<i class="icon icon-play"></i>&nbsp;<a href="javascript:$('#implicit').attr('src', $('#implicit').attr('src'))">Replay</a>

<img id="implicit" src="https://cdn.auth0.com/docs/img/implicit-diagram.gif">

1. Initiate the login transaction by redirecting the user to:

  <pre style="word-wrap:break-word"><code>GET https://${account.namespace}/authorize/?
        response_type=token
        &client_id=${account.clientId}
        &redirect_uri=YOUR_CALLBACK_URL
        &state=VALUE_THAT_SURVIVES_REDIRECTS
        &scope=openid</code></pre>

  > You can optionally use the [Lock Widget](/libraries/lock) to trigger the login. Or you can do it manually and send a `connection` parameter in the querystring that will redirect the user straight to the desired connection.

2. The user will authenticate on the identity provider typically hosted somewhere else. Auth0 speaks OAuth2, OAuth1, OpenID, SAML and Ws-Federation.

3. After the user authenticates, your app will be called back to this endpoint with a `GET`

  <pre style="word-wrap:break-word"><code>GET YOUR_CALLBACK_URL#
        access_token=2YotnF..........1zCsicMWpAA
        &id_token=......Json Web Token......
        &state=VALUE_THAT_SURVIVES_REDIRECTS</code></pre>

4. Call the Auth0 API to validate the token and get back the user profile

  <pre style="word-wrap:break-word"><code>GET https://${account.namespace}/api/users/:userid
        Authorization: Bearer ...id_token...</code></pre>

5. Finally, you can call your API

  <pre style="word-wrap:break-word"><code>GET https://your.api/foo
        Authorization: Bearer ...id_token...</code></pre>

6. Your API needs to validate the token as well with the client secret. See **APIs** section on the Sidebar.

----
