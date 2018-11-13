Example Use Cases
This section covers use cases that illustrate the authentication process using PKCE.

Request the User's Name and Profile Picture
In addition to the usual authentication, this example shows how you can request additional user details.

We assume that your app is capable of generating the appropriate code_verifier and code_challenge.

To return the user's name and picture, add the appropriate scopes to your call to the /authorize endpoint. Therefore, the initial authorization URL is as follows:

https://${account.namespace}/authorize?
    scope=openid%20name%20picture&
    response_type=code&
    client_id=${account.clientId}&
    code_challenge=CODE_CHALLENGE&
    code_challenge_method=S256&
    redirect_uri=${account.namespace}/mobile
After the user submits the request, the app receives an TTP 302 response with a URL containing the authorization code at the end: https://${account.namespace}/callback?code=AUTHORIZATION_CODE

Using the authorization code, you can obtain the ID Token by making a POST call to the tokens endpoint.

{
  "method": "POST",
  "url": "https://${account.namespace}/oauth/token",
  "headers": [
    { "name": "Content-Type", "value": "application/json" }
  ],
  "postData": {
    "mimeType": "application/json",
    "text": "{\"grant_type\":\"authorization_code\",\"client_id\": \"${account.clientId}\",\"code_verifier\": \"YOUR_GENERATED_CODE_VERIFIER\",\"code\": \"YOUR_AUTHORIZATION_CODE\",\"redirect_uri\": \"${account.namespace}/mobile\" }"
  }
}
If all goes well, you'll receive an HTTP 200 response with the following payload:

{
  "access_token":"eyJz93a...k4laUWw",
  "refresh_token":"GEbRxBN...edjnXbL",
  "id_token":"eyJ0XAi...4faeEoQ",
  "token_type":"Bearer",
  "expires_in":86400
}
By extracting the ID Token, which now contains the additional name and picture claims you requested, you'll see something similar to the following once you've decoded the payload:

{
  "name": "auth0user@...",
  "picture": "https://example.com/profile-pic.png",
  "iss": "https://auth0user.auth0.com/",
  "sub": "auth0|581...",
  "aud": "xvt...",
  "exp": 1478113129,
  "iat": 1478077129
}
Request a User Log In with GitHub
You can send a user directly to the GitHub authentication screen by passing the connection parameter and setting its value to github.

:::panel Logins with Social Providers While this example shows how to log in users via GitHub, you can just as easily request that a user log in with other Social providers, such as Google or Facebook.

To do this, configure the appropriate Connection in the Auth0 Dashboard and change the connection value of the call to /authorize to the name of the Connection (google-oauth2 for Google, facebook for Facebook, and so on). You can get the Connection's name from the Settings tab of the Connections page.

Read more:

Identity Providers Supported by Auth0
Social Login using the Authentication API :::
https://${account.namespace}/authorize?
    scope=openid%20name%20picture&
    response_type=code&
    client_id=${account.clientId}&
    code_challenge=CODE_CHALLENGE&
    code_challenge_method=S256&
    redirect_uri=https://${account.namespace}/mobile&
    connection=github
After the user submits the request, the app receives an HTTP 302 response with a URL containing the authorization code at the end: https://${account.namespace}/callback?code=AUTHORIZATION_CODE

Using the authorization code, you can obtain the ID Token by making a POST call to the tokens endpoint.

{
  "method": "POST",
  "url": "https://${account.namespace}/oauth/token",
  "headers": [
    { "name": "Content-Type", "value": "application/json" }
  ],
  "postData": {
    "mimeType": "application/json",
    "text": "{\"grant_type\":\"authorization_code\",\"client_id\": \"${account.clientId}\",\"code_verifier\": \"YOUR_GENERATED_CODE_VERIFIER\",\"code\": \"YOUR_AUTHORIZATION_CODE\",\"redirect_uri\": \"${account.namespace}/mobile\" }"
  }
}
If all goes well, you'll receive an HTTP 200 response with the following payload:

{
  "access_token":"eyJz93a...k4laUWw",
  "refresh_token":"GEbRxBN...edjnXbL",
  "id_token":"eyJ0XAi...4faeEoQ",
  "token_type":"Bearer",
  "expires_in":86400
}
You can pull the user's name, profile picture, and email address from the name, picture, and email claims of the returned ID Token. Note that the sub claim contains the user's unique ID as returned from GitHub:

{
  "name": "John Smith",
  "picture": "https://avatars.example.com",
  "email": "jsmith@...",
  "email_verified": true,
  "iss": "https://auth0user.auth0.com/",
  "sub": "github|100...",
  "aud": "xvt...",
  "exp": 1478114742,
  "iat": 1478078742
}
