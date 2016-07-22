# Identity Protocols supported by Auth0

Auth0 implements proven, common and popular identity protocols used in consumer oriented web products (e.g. OAuth / OpenId Connect) and in enterprise deployments (e.g. [SAML](/saml-configuration), WS-Federation, LDAP). In most cases you won't need to go this deep to use Auth0.

## OAuth Server Side

This protocol is best suited for web sites that need:

- Authenticated users
- Access to 3rd party APIs on behalf of the logged in user

> In the literature you might find this flow referred to as __Authorization Code Grant__. The full spec of this flow is [here](http://tools.ietf.org/html/rfc6749#section-4.1).

![](https://docs.google.com/drawings/d/1RZYKxbO5LM3fBhL8hs5-wefUkwDgPo-lOuoHWBdc0RI/pub?w=793&amp;h=437)

### 1. Initiation

Someone using a browser hits a protected resource in your web app (a page that requires users to be authenticated). Your website redirects the user to the Authorization Server (Auth0).  The URL for this is:

    https://${account.namespace}/authorize/?client_id=${account.clientId}&response_type=code&redirect_uri=${account.callback}&state=OPAQUE_VALUE&connection=YOUR_CONNECTION

 `connection` is the only parameter that is Auth0 specific. The rest you will find in the spec. Its purpose is to instruct Auth0 where to send the user to authenticate. If you omit it, you will get an error.

> A note on `state`. This is an optional parameter, but we __strongly__ recommend you use it as it mitigates [CSRF attacks](http://en.wikipedia.org/wiki/Cross-site_request_forgery).

The `redirect_uri` __must__ match what is defined in your [settings](${uiURL}/#/settings) page. `http://localhost` is a valid address and Auth0 allows you to enter many addresses simultaneously.

Optionally you can specify a `scope` parameter. There are various possible values for `scope`:

* `scope: 'openid'`: _(default)_ It will return, not only the `access_token`, but also an `id_token` which is a _JSON Web Token ([JWT](/jwt)). The JWT will only contain the user id (`sub` claim).
* `scope: 'openid {attr1} {attr2} {attrN}'`: If you want only specific user's attributes to be part of the `id_token` (For example: `scope: 'openid name email picture'`).

You can get more information about this in the [Scopes documentation](/scopes).

---

### 2. Authentication

Auth0 will start the authentication against the identity provider configured with the specified `connection`. The protocol between Auth0 and the identity provider could be different. It could be OAuth2 again or something else. (e.g. Office 365 uses WS-Federation, Google Apps uses OAuth2, AD will use LDAP or Kerberos).

The common visible part of this process is that the user is redirected to the identity provider site.

> When using Auth0's built-in user store (created through __Connections -> Database -> New__), there's no redirection. Auth0 in this case is the identity provider.

---

### 3. Getting the Access Token

Upon successful authentication, the user will eventually return to your web site with a URL that will look like (steps 3 & 4 in the diagram above):

    ${account.callback}/?code=AUTHORIZATION_CODE&state=OPAQUE_VALUE

`CALLBACK` is the URL you specified in step #2 (and configured in your settings). `state` should be the same value you sent in step /libraries/lock/customization#rememberlastlogin-boolean-.

Your web site will then call Auth0 again with a request to obtain an "Access Token" that can be further used to interact with Auth0's API.

To get an Access Token, you would send a POST request to the token endpoint in Auth0. You will need to send the `code` obtained before along with your `clientId` and `clientSecret` (step 5 in the diagram).

	POST /oauth/token
	Host: ${account.namespace}
	Content-type: application/x-www-form-urlencoded

	client_id=CLIENT_ID&redirect_uri=REDIRECT_URI&client_secret=CLIENT_SECRET&code=AUTHORIZATION_CODE&grant_type=authorization_code

If the request is successful, you will get a JSON object with an `access_token`. You can use this token to call the Auth0 API and get additional information such as the user profile.

##### Sample Access Token Response:

	{
       "access_token": ".....Access Token.....",
       "token_type": "bearer",
       "id_token": "......The JWT......"
  }

> Adding a `scope=openid` parameter to the request sent to the `authorize` endpoint as indicated above, will result in an additional property called `id_token`. This is a [JSON Web Token](/jwt). You can control what properties are returned in the JWT (e.g. `scope=openid name email`). See [scopes](/scopes) for more details.

Notice that the call to exchange the `code` for an `access_token` is __server to server__ (usually your web backend to Auth0). The system initiating this call has to have access to the public internet to succeed. A common source of issues is the server running under an account that doesn't have access to internet.

## OAuth2 PKCE for Public Clients

This protocol is best suited for public clients that require increased security in the token exchange process. It is a better alternative to the [implicit flow]().

> The full spec of this protocol can be found [here](https://tools.ietf.org/html/rfc7636).

![](https://docs.google.com/drawings/d/1VAhgi3-Gz7QZ5eBSmMY76L77awjrHWKmZ5qqIYqUqis/pub?w=752&h=282)

### 1. Initiation

The client requests authorization to Auth0 endpoint:

	https://${account.namespace}/authorize/?client_id=${account.clientId}&response_type=code&redirect_uri=${account.callback}&state=OPAQUE_VALUE&code_challenge={Base64UrlEncode(SHA256(THE VERIFIER))}&code_challenge_method=S256&connection=YOUR_CONNECTION

The `redirect_uri` __must__ match one of the addresses defined in your [settings](${uiURL}/#/settings) page.

> Adding a `scope=openid` parameter to the request sent to the `authorize` endpoint as indicated above, will result in an additional property called `id_token`. This is a [JSON Web Token](/jwt). You can control what properties are returned in the JWT (e.g. `scope=openid name email`).

### 2. Authentication

Auth0 will redirect the user to the identity provider defined in the `connection` property.

### 3. Getting the Authorization Code

Upon successful authentication, Auth0 will return a redirection response with the following URL structure:

	${account.callback}?code={THE CODE}

### 4. Getting the token

The client then issues a final request to Auth0, to exchange the `code` for a token:

```
POST /oauth/token HTTP/1.1
Host: ${account.namespace}
Content-type: application-json
{
  "code": {THE CODE},
  "code_verifier": {THE VERIFIER},
  "client_id": "${account.clientId}",
  "grant_type": "authorization_code",
  "redirect_uri": "${account.callback}"
}
``` 

If successful the response is another JSON object, with an `id_token`, and `access_token`. 

> Note that if the `verifier` doesn't match what is sent in the `/authorize` endpoint, the request will fail.

You will have to set `Token Endpoint Authentication Method` to `none` in your application for this to work. Look under **Settings** of the app.

## OAuth2 Implicit flow

This protocol is available for public clients that might not require the additional security provisions of PKCE, as described above.

> The full spec of this protocol can be found [here](http://tools.ietf.org/html/rfc6749#section-4.2).

![](https://docs.google.com/drawings/d/1S_p6WdsOno50aKlr08SueWL25a86l86e8CQLMyDQx_8/pub?w=752&amp;h=282)

### 1. Initiation

The client requests authorization to Auth0 endpoint:

	https://${account.namespace}/authorize/?client_id=${account.clientId}&response_type=token&redirect_uri=${account.callback}&state=OPAQUE_VALUE&connection=YOUR_CONNECTION

> Notice `response_type=token` in this request.

As before, the `redirect_uri` __must__ match one of the addresses defined in your [settings](${uiURL}/#/settings) page.

> Adding a `scope=openid` parameter to the request sent to the `authorize` endpoint as indicated above, will result in an additional property called `id_token`. This is a [JSON Web Token](/jwt). You can control what properties are returned in the JWT (e.g. `scope=openid name email`).

### 2. Authentication

Like described before, Auth0 will redirect the user to the identity provider defined in the `connection` property.

### 3. Getting the Access Token

Upon successful authentication, Auth0 will return a redirection response with the following URL structure:

	https://CALLBACK#access_token=ACCESS_TOKEN

Optionally (if `scope=openid` is added in the authorization request):

	https://CALLBACK#access_token=ACCESS_TOKEN&id_token=JSON_WEB_TOKEN

Clients typically extract the URI fragment with the __Access Token__ and cancel the redirection. The client code will then interact with other endpoints using the token in the fragment.

> Note that tokens can become large and under certain conditions the URL might be truncated (e.g. some browsers have URL length limitations). Be especially careful when using the `scope=openid profile` that will generate a JWT with the entire user profile in it. You can define specific attributes to return in the JWT (e.g. `scope=openid email name`).

### 4. Calling your API with a JWT (optional)

Once your application has a JWT (returned in the `id_token` part of the hash fragment), it can be used to make authenticated calls to your API.
The way this is done depends on how your API is implemented, but the most common way (which is used by all Auth0 seed projects) is to use the [Bearer authentication scheme](https://tools.ietf.org/html/rfc6750#section-2.1).
For example:

```
GET /my-secured-endpoint HTTP/1.1
Host: my-api.example.com
Authorization: Bearer eyJ...
```

where `eyJ...` is the JWT obtained from Auth0.
The `curl` equivalent would be as follows:

```
curl https://my-api.example.com/my-secured-endpoint -H "Authorization: Bearer eyJ..."
```

Note that the header name in this case is `Authorization`, and its value is `Bearer eyJ...` (separated by one space).
--------

## OAuth Resource Owner Password Credentials Grant

This endpoint is used by clients to obtain an access token (and optionally a [JSON Web Token](/jwt)) by presenting the resource owner's password credentials. These credentials are typically obtained directly from the user, by prompting them for input instead of redirecting the user to the identity provider.

### 1. Login Request

It receives a `client_id`, `client_secret`, `username`, `password` and `connection`. It validates username and password against the connection (if the connection supports active authentication) and generates an access_token.

	POST /oauth/ro HTTP/1.1
	Host: ${account.namespace}
	Content-Type: application/x-www-form-urlencoded

	grant_type=password&username=johndoe&password=abcdef&client_id=${account.clientId}&connection=YOUR CONNECTION

Currently, Auth0 implements the following connections for a resource owner grant:

* google-oauth2
* google-apps
* AD/LDAP
* Database connections

> Note: For Google authentication we are relying on an endpoint that is marked as deprecated, so use it at your own risk. The user might get a warning saying that someone has logged in from another IP address and will have to complete a captcha challenge allowing the login to happen.

As optional parameter, you can include <code>scope=openid</code>. It will return, not only the *access_token*, but also an *id_token*. This is a [JSON Web Token](/jwt). You can control what properties are returned in the JWT (e.g. `scope=openid name email`). `scope=openid profile` will return the entire user profile.

#### Sample Request

	curl --data "grant_type=password&username=johndoe&password=abcdef&client_id=${account.clientId}&connection=<YOUR CONNECTION>&scope=openid" https://${account.namespace}/oauth/ro

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

## Validating tokens

OAuth access tokens can be validated by calling the [`/userinfo` API endpoint](/auth-api#!#get--userinfo),
which returns a JSON object with the full user profile.
If the access token is invalid or has expired, this endpoint will return a 401 Unauthorized response.

An `id_token` can be validated using the token's signature:

* If the token was signed with symmetric encryption (HMAC SHA256),
the signature can be verified **server-side** using the issuer's secret.

* If it was signed with asymmetric encryption (RSA SHA256),
the signature can be verified using the issuer's public key.

Another way of validating an `id_token` is by calling the [`/tokeninfo` API endpoint](/auth-api#!#post--tokeninfo),
which returns a JSON object with the full user profile.
If the JWT has been tampered with or has expired, this endpoint will return a 401 Unauthorized response.

## OAuth2 / OAuth1

These protocols are implemented mostly when interacting with well-known [identity providers](identityproviders). Most of the __social identity providers__ implement one or the other. The default protocol in Auth0 is OpenID Connect (see above).

`scopes` for each identity provider can be configured on the Auth0 dashboard, but these can also be sent on-demand on each authentication request through the `connection_scopes` parameter. (See [this topic](/libraries/lock/sending-authentication-parameters#connection_scopes-object-) for more details)

## WS-Federation

WS-Federation is supported both for apps (e.g. any WIF based app) and for identity providers (e.g. ADFS or ACS).

### For apps
All registered apps in Auth0 get a WS-Fed endpoint of the form:

	https://${account.namespace}/wsfed/${account.clientId}

The metadata endpoint that you can use to configure the __Relying Party__:

	https://${account.namespace}/wsfed/${account.clientId}/FederationMetadata/2007-06/FederationMetadata.xml

All options for WS-Fed are available under the [advanced settings](${uiURL}/#/applications/${account.clientId}/settings) for an App.

Claims sent in the SAML token, as well as other lower level settings of WS-Fed & SAML-P can also be configured with the `samlConfiguration` object through [rules](/saml-configuration).

The following optional parameters can be used when redirecting to the WS-Fed endpoint:

* `wreply`: Callback URL
* `wctx`: Your application's state
* `whr`: The name of the connection (to skip the login page)

```
https://${account.namespace}/wsfed/${account.clientId}?whr=google-oauth2
```


### For IdP
If you are connecting a WS-Fed IdP (e.g. ADFS, Azure ACS and IdentityServer are examples), then the easiest is to use the __ADFS__ connection type. Using this you just enter the server address. Auth0 will probe for the __Federation Metadata__ endpoint and import all the required parameters: certificates, URLs, etc.

> You can also upload a Federation Metadata file.

If both primary and secondary certificates are present in the __Federation Metadata__, then both would work. Connection parameters can be updated anytime (by clicking on __Edit__ and __Save__). This allows simple certificate rollover.

## Redirect protocol in Rules

Auth0 allows you to customize and extend the authentication transaction through code functions you write in JavaScript called __[Rules](/rules)__. Rules run after the user is authenticated with a connection, but before the result is sent back to an app.

The __Redirect__ protocol allows you to interrupt the normal flow, and send the user to an arbitrary endpoint when a condition is met:

```
function(user,context,callback){

	if( someCondition() ){
		context.redirect = {
			url: "https://some_location"
		};
	}

	callback(null,user,context);
}
```

if `context.redirect` is set, and after all rules are executed, the user will be redirected to the `url`, with at least one additional query string parameter `state`.

What happens in that location is up to the developer. Typical uses of this facility include:

* Generic MFA
* Profile enrichment.
* User enrollment.
* Consent & legal terms acceptance.
* User claims consent pages.

To resume the transaction, user needs to `POST` or `GET` to the url: `https://${account.namespace}/continue`:



	POST /continue&state={the state value} HTTP/1.1
	Host: ${account.namespace}
	Content-Type: application/x-www-form-urlencoded

	{body}

Notice that `state` __must__ match what was sent by Auth0 to the endpoint. The `{body}` or other query string parameters are app specific.

Transactions that are resumed can be easily be identified with the `protocol=redirect-callback` property:

```
function(user,context,callback){

	if( context.protocol === 'redirect-callback' ){
		//Resuming from a redirect
	}

	callback(null,user,context);
}
```

> Note that all rules are run all over again on `/continue`. You need to make sure you don't end up on an infinte redirect loop with checks like the above.

A common and convenient way of transferring information from Auth0 to the external site and back is through a [JWT](/jwt).
