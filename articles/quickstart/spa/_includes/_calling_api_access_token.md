To give the authenticated user access to secured resources in your API, you need to include the user's access token in requests you send to your API. 
There are two common ways to do this. 
* Store the access token in a cookie. The access token is then included in all requests sent to your server. 
Or
* Add `access_token` to the `Authorization` header using the `Bearer` scheme. 

::: note
The examples below use the second approach.
:::