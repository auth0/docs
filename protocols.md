# Identity Protocols supported by Auth0 

Auth0 implements proven, common and popular identity protocols used in consumer oriented web products (e.g. OAuth / OpenId Connect) and in enterprise deployments (e.g. [SAML](saml-configuration), WS-Federation). In most cases you won't need to go this deep to use Auth0.

> This article is meant as an introduction. See the references section below for more information. 

## OAuth Server Side

This protocol is best suited for web sites that need:

- Authenticated users
- Access to 3rd party APIs on behalf of the logged in user

> In the literature you might find this flow refered to as __Authorization Code Grant__. The full spec of this flow is [here](http://tools.ietf.org/html/rfc6749#section-4.1).

![](img/protocols-oauth-code.png)

### 1. Initiation

Someone using a browser hits a protected resource in your web app (a page that requires users to be authenticated). Your website redirects the user to the Authorization Server (Auth0).  The URL for this is:
            
    https://@@account.namespace@@/authorize/?client_id=@@account.clientId@@&response_type=code&redirect_uri=@@account.callback@@&state=OPAQUE_VALUE&connection=YOUR_CONNECTION
    
 `connection` is the only parameter that is Auth0 specific. The rest you will find in the spec. Its purpose is to instruct Auth0 where to send the user to authenticate. If you omit it, you will get an error.

> A note on `state`. This is an optional parameter, but we __strongly__ recommend you use it as it mitigates [CSRF attacks](http://en.wikipedia.org/wiki/Cross-site_request_forgery).

The `redirect_uri` __must__ match what is defined in your [settings](@@uiURL@@/#/settings) page. `http://localhost` is a valid address and Auth0 allows you to enter many addresses simultaneously.

> Optionally, you can specify a `scope` parameter. The only supported values today are: `openid` and `openid profile`. If you do add a `scope` parameter (with the supported values), Auth0 will return a [JsonWebToken](jwt) in addition to the `access_token` in step #3 (below). 

---

### 2. Authentication

Auth0 will start the authentication against the identity provider configured with the specified `connection`. The protocol between Auth0 and the identity provider could be different. It could be OAuth2 again or something else. (e.g. Office 365 uses WS-Federation, Google Apps uses OAuth2).

The visible part of this process is that the user is redirected to the identity provider site.

---

### 3. Getting the Access Token

Upon successful authentication, the user will eventually return to your web site with a URL that will look like:

    http://CALLBACK/?code=AUTHORIZATION_CODE&state=OPAQUE_VALUE

`CALLBACK` is the URL you specified in step #2 (and configured in your settings). `state` should be the same value you sent in step #1. 

Your web site will then call Auth0 again with a request to obtain an "Access Token" that can be further used to interact with the Auth0 [API](api-reference). 

To get an Access Token, you would send a POST request to the token endpoint in Auth0. You will need to send the `code` obtained before along with your `clientId` and `clientSecret`. 

	POST https://@@account.namespace@@/oauth/token

	Content-type: application/x-www-form-urlencoded

	client_id=CLIENT_ID&redirect_uri=REDIRECT_URI&client_secret=CLIENT_SECRET&code=AUTHORIZATION_CODE&grant_type=authorization_code 

If the request is successful, you will get a JSON object with an `access_token`. You can use this token to call Auth0 API and get additional information such as the user profile.

#####Sample Access Token Response:

	{
       "access_token":"2YotnFZFEjr1zCsicMWpAA",
       "token_type":"bearer",
    }

> Adding a `scope=openid` parameter to the request sent to the `authorize` endpoint as indicated above, will result in an additional property called `id_token`. This is a [JsonWebToken](jwt).

## OAuth for Native Clients and JavaScript in the browser

This protocol is best suited for mobile native apps and javascript running in a browser that need to access an API that expects an Access Token.

> The full spec of this protocol can be found [here](http://tools.ietf.org/html/rfc6749#section-4.2) and it is refered to as the __Implicit Flow__.

![](img/protocols-oauth-implicit.png)

### 1. Initiation

The client requests authorization to Auth0 endpoint:

	https://@@account.namespace@@/authorize/?client_id=@@account.clientId@@&response_type=token&redirect_uri=@@account.callback@@&state=OPAQUE_VALUE&connection=YOUR_CONNECTION

The `redirect_uri` __must__ match one of the addresses defined in your [settings](@@uiURL@@/#/settings) page. 

> Optionally, you can specify a `scope` parameter. The only supported values today are: `openid` and `openid profile`. If you do add a `scope` parameter (with the supported values), Auth0 will return a [JsonWebToken](jwt) in addition to the `access_token` in step #3 (below).

### 2. Authentication

Like described before, Auth0 will redirect the user to the identity provider defined in the `connection` property.

### 3. Getting the Access Token

Upon successful authentication, Auth0 will return a redirection response with the following URL structure:

	https://CALLBACK#access_token=ACCESS_TOKEN

Optionally (if `scope=openid` is added in the authorization request):

	https://CALLBACK#access_token=ACCESS_TOKEN&id_token=JSON_WEB_TOKEN

Clients typically extract the URI fragment with the __Access Token__ and follow the redirection. The client code will then interact with other endpoints using the token in the fragment.


## OAuth Resource Owner Password Credentials Grant

This endpoint is used by clients to obtain an access token (and an options [JsonWebToken](jwt)) by presenting the resource owner's password credentials. These credentials are typically obtained directly from the user, by prompting them for input instead of redirecting the user to the identity provider.

### 1. Login Request

It receives a `client_id`, `client_secret`, `username`, `password` and `connection`. It validates username and password against the connection (if the connection supports active authentication) and generates an access_token.

    POST /oauth/ro HTTP/1.1
	Host: {auth0_domain}.auth0.com
	Content-Type: application/x-www-form-urlencoded
	
	grant_type=password&username=johndoe&password=abcdef&client_id=...&client_secret=...&connection=...

Currently, Auth0 implements the following connections:

* google-oauth2
* google-apps
* database connections

As optional parameter, you can include <code>scope=openid</code>. It will return, not only the *access_token*, but also an *id_token* which is a Json Web Token ([JWT](jwt)).

#### Sample Request

	curl --data "grant_type=password&username=johndoe&password=abcdef&client_id=...&client_secret=...&connection=...&scope=openid" https://{auth0_domain}.auth0.com/oauth/ro

### Login Response
In response to a login request, Auth0 will return either an HTTP 200, if login succeeded, or an HTTP error status code, if login failed.

A successful response contains the *access_token* (that can be exchanged for the userinfo), and the *id_token* (if 'openid' was specified in `scope` parameter).

A failure response will contain error and error_description fields.
	
#### Sample Successful Response

	HTTP/1.1 200 OK
	Server: GFE/1.3
	Content-Type: application/json

	{
		"access_token": "3WAvWLgMCHkUvoM6",
		"id_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2xvZ2luLmF1dGgwLmNvbTozMDAwLyIsInN1YiI6Imdvb2dsZS1vYXV0aDJ8c2ViYXN0aWFub3NAZ21haWwuY29tIiwiYXVkIjoia3d0TzhWRFNKZnpDU010YXBldlQ2YW0xTHRScjFGQ28iLCJleHAiOjEzNzUzMTE4ODQsImlhdCI6MTM3NTI3NTg4NH0.IPLi1Prr_q8xohD6QQ2CbbvCXqn_8HR__batWdv-O8o",
		"token_type": "bearer"
	}

#### Sample Response with incorrect Username/Password

	HTTP/1.1 401 Unauthorized
	Server: GFE/1.3
	Content-Type: application/json
	
	{
	  "error": "Unauthorized",
	  "error_description": "BadAuthentication"
	}
	
#### Sample Response for an unsupported connection

	HTTP/1.1 400 BadRequest
	Server: GFE/1.3
	Content-Type: application/json
	
	{
	  "error": "invalid_request",
	  "error_description": "specified strategy does not support requested operation (windowslive)"
	}


