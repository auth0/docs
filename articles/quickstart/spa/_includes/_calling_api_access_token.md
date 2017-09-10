To give the authenticated user access to secured resources in your API, include the user's access token in the requests you send to your API. 
There are two common ways to do this. 
* Store the access token in a cookie. The access token is then included in all requests. 
* Send `access_token` in the `Authorization` header using the `Bearer` scheme. 

::: note
The examples below use the `Bearer` scheme.
:::
