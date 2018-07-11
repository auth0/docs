<div>
  <% if (meta.path !== "articles/libraries/lock/v11") { %>
    <p>For more information on using Lock v11 <a href="/libraries/lock">see the documentation.</a></p>
  <% } %>
</div>

<code-block>
  <code-block-tab data-title="Lock (Modal)">

  ```html
  <script src="${lock_url}"></script>
  <script>
    var lock = new Auth0Lock('${account.clientId}', '${account.namespace}', {
      auth: {
        redirectUrl: '${account.callback}',
        responseType: 'code',
        params: {
          scope: 'openid email' // Learn about scopes: https://auth0.com/docs/scopes
        }
      }
    });
  </script>
  <button onclick="lock.show();">Login</button>
  ```

  </code-block-tab>
  <code-block-tab data-title="Lock (Inline)">

  ```html
  <div id="root" style="width: 320px; margin: 40px auto; padding: 10px; border-style: dashed; border-width: 1px; box-sizing: border-box;">
    embedded area
  </div>
  <script src="${lock_url}"></script>
  <script>
    var lock = new Auth0Lock('${account.clientId}', '${account.namespace}', {
      container: 'root',
      auth: {
        redirectUrl: '${account.callback}',    // If not specified, defaults to the current page 
        responseType: 'token id_token',
        params: {
          scope: 'openid email'                // Learn about scopes: https://auth0.com/docs/scopes
        }
      }
    });
    lock.show();
  </script>
  ```

  </code-block-tab>
  <code-block-tab data-title="Passwordless (SMS)">

  ```html
  <script src="${lock_url}"></script>
  <script>
    var lock = new Auth0LockPasswordless('${account.clientId}', '${account.namespace}', {
          allowedConnections: ['sms'],             // Should match the SMS connection name  
          responseType: 'token id_token',
          auth: {
            redirectUrl: '${account.callback}',    // If not specified, defaults to the current page 
            params: {
              scope: 'openid email'                // Learn about scopes: https://auth0.com/docs/scopes
            }          
          }
        }
    );

    function open() {
      lock.show();
    };

  </script>
  <button onclick="window.open();">SMS</button>
  ```

  </code-block-tab>
  <code-block-tab data-title="Passwordless (Magic Link)">

  ```html
  <script src="${lock_url}"></script>
  <script>
    var lock = new Auth0LockPasswordless('${account.clientId}', '${account.namespace}', {
      passwordlessMethod: "link",              // Sets Lock to use magic link
      responseType: 'token id_token',
      auth: {
        redirectUrl: '${account.callback}',    // If not specified, defaults to the current page 
        params: {
          scope: 'openid email'                // Learn about scopes: https://auth0.com/docs/scopes
        }          
      }
    });

    function open() {
      lock.show();
    }
  </script>
  <button onclick="window.open();">Magic Link</button>
  ```

  </code-block-tab>
  <code-block-tab data-title="Passwordless (Email Code)">

  ```html
  <script src="${lock_url}"></script>
  <script>
    var lock = new Auth0LockPasswordless('${account.clientId}', '${account.namespace}', {
      allowedConnections: ['email'],           // Should match the Email connection name, it defaults to 'email'     
      passwordlessMethod: 'code',              // If not specified, defaults to 'code'
      responseType: 'token id_token',
      auth: {
        redirectUrl: '${account.callback}',    // If not specified, defaults to the current page 
        params: {
          scope: 'openid email'                // Learn about scopes: https://auth0.com/docs/scopes
        }          
      }
    });

    function open() {
      lock.show();
    }
  </script>
  <button onclick="window.open();">Email Code</button>
  ```

  </code-block-tab>
  <code-block-tab data-title="Custom UI">

  ```html
  <button class="signin-google">Sign in with Google (redirect)</button><br>
  <button class="signin-google-popup">Sign in with Google (popup)</button><br>
  <br><p>--- or ---</p>
  <label>Email</label><input type="text" id="email"><br>
  <label>Password</label><input type="password" id="password"><br>
  <button class="signin-db">Sign in with Email/Password</button>

  <script src="${auth0js_url}"></script>
  <script src="http://code.jquery.com/jquery.js"></script>
  <script>
    var webAuth = new auth0.WebAuth({
      domain:         '${account.namespace}',
      clientID:       '${account.clientId}',
      redirectUri:    '${account.callback}'
    });
    // sign-in with social provider with plain redirect
    $('.signin-google').on('click', function() {
      webAuth.authorize({
        connection: 'google-oauth2' // use connection identifier
      });
    });
    // sign-in with social provider using a popup (window.open)
    $('.signin-google-popup').on('click', function() {
      webAuth.popup.authorize({
        connection: 'google-oauth2'
      });
    });

    $('.signin-db').on('click', function() {
      webAuth.login({
        realm: 'tests',
        username: 'testuser',
        password: 'testpass',
      });
    });
    // Parse the authentication result
    webAuth.parseHash((err, authResult) => {
      if (authResult) {
        // Save the tokens from the authResult in local storage or a cookie
        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);
      } else if (err) {
        // Handle errors
        console.log(err);
      }
    });
  </script>
  ```

  </code-block-tab>
  <code-block-tab data-title="Plain Links">

  ```text
  https://${account.namespace}/authorize?response_type=code
    &scope=openid%20profile
    &client_id=${account.clientId}
    &redirect_uri=${account.callback}
    &connection=CONNECTION_NAME
  ```

  </code-block-tab>
</code-block>