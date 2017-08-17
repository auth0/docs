## Considerations for Client-Side Access Control

From the access control on the client-side perspective, the `scope` values that you get in local storage are only a clue that the user has those scopes. The user could manually adjust the scopes in local storage to gain a higher access level. The user could get access to routes they shouldn't have access to. 

::: panel-warning Don't store your sensitive data in your SPA
Browsers are public clients and must be treated as public. You need to keep any sensitive data on your server. Your server is the only place where you can store the data securely.  Don't include any sensitive data in your client-side SPA. 

To get access to the data on your server, users need a valid access token. Any attempt to modify an access token invalidates the token. This means that if a user tries to edit the payload of their access token to include different scopes, the token will lose its integrity and will become useless.