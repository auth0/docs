# Protocols supported by Auth0 

Auth0 implements proven, common and popular identity protocols used in consumer oriented web products (e.g. OAuth2) and in enterprise deployments (e.g. SAML, WS-Federation). In most cases you won't need to go this deep to use Auth0.

>This article is meant as an introduction. See the references section below for more information. 

## OAuth Server Side

This protocol is best suited for web sites that need:

- Authenticated users
- Access to 3rd party APIs on behalf of the logged in user

> In the literature you might find this flow refered to as __Authorization Code Grant__. The full spec of this flow is [here](http://tools.ietf.org/html/rfc6749#section-4.1).

#### 1. Initiation

Someone using a browser hits a protected resource in your web app (a page that requires users to be authenticated). Your website redirects the user to the Authorization Server (Auth0).  The URL for this is:
            
    https://@@account.namespace@@.auth0.com/authorize/?client_id=@@account.clientId@@&response_type=code&redirect_uri=CALLBACK&state=OPAQUE_VALUE&connection=YOUR_CONNECTION
    
 `connection` is the only parameter that is Auth0 specific. The rest you will find in the spec. Its purpose is to instruct Auth0 where to send the user to authenticate. If you omit it, you will get an error.

> A note on `state`. This is an optional parameter, but we __strongly__ recommend you use it as it mitigates [CSRF attacks](http://en.wikipedia.org/wiki/Cross-site_request_forgery).

The `redirect_uri` __must__ match what is defined in your [settings](https://app.auth0.com/#/settings) page. `http://localhost` is a valid URL.

---

#### 2. Authentication

Auth0 will start the authentication against the identity provider configured with the specified `connection`. The protocol between Auth0 and the identity provider could be different. It could be OAuth2 again or something else. (e.g. Office 365 uses WS-Federation, Google Apps uses OAuth2).

The visible part of this process is that the user is redirected to the identity provider site.

---

#### 3. Getting the Access Token

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

## OAuth for Native Clients and JavaScript in the browser

This protocol is best suited for mobile native apps and javascript running in a browser that need to access an API that expects an Access Token.

> The full spec of this protocol can be found [here](http://tools.ietf.org/html/rfc6749#section-4.2) and it is refered to as the __Implicit Flow__.

#### 1. Initiation

The client requests authorization to Auth0 endpoint:

	https://@@account.namespace@@.auth0.com/authorize/?client_id=@@account.clientId@@&response_type=token&redirect_uri=CALLBACK&state=OPAQUE_VALUE&connection=YOUR_CONNECTION

The `redirect_uri` __must__ match what is defined in your [settings](https://app.auth0.com/#/settings) page. `http://localhost` is a valid URL.

#### 2. Authentication

Like described before, Auth0 will redirect the user to the identity provider defined in the `connection` property.

#### 3. Getting the Access Token

Upon successful authentication, Auth0 will return a redirection response with the following URL structure:

	https://CALLBACK#access_token=ACCESS_TOKEN

Clients typically extract the URI fragment with the __Access Token__ and follow the redirection. The client code will then interact with other endpoints using the token in the fragment.
