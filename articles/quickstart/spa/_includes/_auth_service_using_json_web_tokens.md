Authentication using JSON Web Tokens is stateless. This means that when you use it, no information about the user's session is stored on your server. 

To set up a session for the user on the client side, save the following information in browser storage: 
* `access_token`
* `id_token`
* `expires_in`

To log the user out, you must remove these values from the storage. 

::: note
The examples below use local storage to save the user's authentication information. You can also use session storage or cookies.
:::