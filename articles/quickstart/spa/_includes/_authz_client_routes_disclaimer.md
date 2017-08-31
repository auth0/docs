## Considerations for Client-Side Access Control

For the access control on the client-side, the `scope` values that you get in local storage are only a clue that the user has those scopes. The user could manually adjust the scopes in local storage to access routes they shouldn't have access to. 

On the other hand, to get access to data on your server, the user needs a valid access token. Any attempt to modify an access token invalidates the token. If a user tries to edit the payload of their access token to include different scopes, the token will lose its integrity and become useless.

You should not store your sensitive data client-side. Make sure you always request it from the server. Even if users manually navigates to a page they are not authorized to see, they will not get the relevant data from the server and your application will still be secured.
