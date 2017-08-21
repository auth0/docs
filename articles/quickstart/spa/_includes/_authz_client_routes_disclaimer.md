## Considerations for Client-Side Access Control

For the access control on the client-side, the `scope` values that you get in local storage are only a clue that the user has those scopes. The user could manually adjust the scopes in local storage to access routes they shouldn't have access to. 

::: panel-warning Do not store your sensitive data in your SPA
Browsers are public clients and must be treated as public. You need to keep any sensitive data on your server. Your server is the only place where you can store the data securely.  Do not include any sensitive data in your client-side SPA. 

To get access to data on your server, the user needs a valid access token. Any attempt to modify an access token invalidates the token. If a user tries to edit the payload of their access token to include different scopes, the token will lose its integrity and become useless.