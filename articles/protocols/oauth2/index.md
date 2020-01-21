---
description: What is the OAuth 2.0 Authorization Framework and how it works.
toc: true
topics:
    - protocols
    - oauth2
    - oauth
contentType:
  - concept
useCase:
  - development
---
# OAuth 2.0 Authorization Framework

[OAuth 2.0](https://oauth.net/2/) is a protocol that allows a user to grant limited access to their resources on one site, to another site, without having to expose their credentials.

According to [OAuth‘s website](http://oauth.net/about/) the protocol is not unlike a valet key.

> Many luxury cars today come with a valet key. It is a special key you give the parking attendant and unlike your regular key, will not allow the car to drive more than a mile or two. Some valet keys will not open the trunk, while others will block access to your onboard cell phone address book. Regardless of what restrictions the valet key imposes, the idea is very clever. You give someone limited access to your car with a special key, while using your regular key to unlock everything.

To get access to the protected resources OAuth 2.0 uses **Access Tokens**. An <dfn data-key="access-token">Access Token</dfn> is a string representing the granted permissions.

::: panel Access Token Format
By default, Auth0 generates Access Tokens, for [API Authorization scenarios](/api-auth), in <dfn data-key="json-web-token">JSON Web Token (JWT)</dfn> format. JWTs contain three parts: a header, a payload, and a signature:
 - The header contains metadata about the type of token and the cryptographic algorithms used to secure its contents.
 - The payload contains a set of claims, which are statements about the permissions that should be allowed, and other information like the intended <dfn data-key="audience">audience</dfn> and the expiration time.
 - The signature is used to validate that the token is trustworthy and has not been tampered with.

::: note
Auth0 also generates opaque Access Tokens for the (deprecated) [Management API v1](/api/management/v1).
:::

The permissions represented by the Access Token, in OAuth 2.0 terms are known as <dfn data-key="scope">**scopes**</dfn>. When an application authenticates with Auth0, it specifies the scopes it wants. If those scopes are authorized by the user, then the Access Token will represent these authorized scopes.

For example, a Contacts API may accept three different levels of authorization: reading contacts (scope `read:contacts`), creating contacts (scope `create:contacts`) and deleting contacts (scope `delete:contacts`). When an application asks the API to create a new contact, then the Access Token should contain the `create:contacts` scope. In a similar fashion, in order to delete existing contacts, the Access Token should contain the `delete:contacts` scope.

For more information refer to [Scopes](/scopes).


## OAuth roles

In any OAuth 2.0 flow we can identify the following roles:

- **Resource Owner**: the entity that can grant access to a protected resource. Typically this is the end-user.

- **Resource Server**: the server hosting the protected resources. This is the API you want to access.

- **Client**: the app requesting access to a protected resource on behalf of the Resource Owner.

- **Authorization Server**: the server that authenticates the Resource Owner, and issues Access Tokens after getting proper authorization. In this case, Auth0.


## Protocol flow

We will now have a more detailed look on how the protocol works. As we will see in a while, OAuth has many "flavors" (called authorization grant types) that you can use. For now we will have a more generic look into the flow.

![Generic OAuth Flow](/media/articles/protocols/oauth2-generic-flow.png)

1. The Application (Client) asks for authorization from the Resource Owner in order to access the resources.

1. Provided that the Resource Owner authorizes this access, the Application receives an **Authorization Grant**. This is a credential representing the Resource Owner's authorization.

1. The Application requests an **Access Token** by authenticating with the Authorization Server and giving the Authorization Grant.

1. Provided that the Application is successfully authenticated and the Authorization Grant is valid, the Authorization Server issues an Access Token and sends it to the Application.

1. The Application requests access to the protected resource by the Resource Server, and authenticates by presenting the Access Token.

1. Provided that the Access Token is valid, the Resource Server serves the Application's request.


## Authorization grant types

The [OAuth 2.0 Authorization Framework specification](https://tools.ietf.org/html/rfc6749) defines four flows to get an Access Token. These flows are called **grant types**. Deciding which one is suited for your case depends mostly on the type of your application.

- [Authorization Code](/flows/concepts/auth-code): used by Web Apps executing on a server. This is also used by mobile apps, using the [Proof Key for Code Exchange (PKCE) technique](/flows/concepts/auth-code-pkce).

- [Implicit](/flows/concepts/implicit): used by JavaScript-centric apps (Single-Page Applications) executing on the user's browser.

- [Resource Owner Password Credentials](/api-auth/grant/password): used by trusted apps.

- [Client Credentials](/flows/concepts/client-credentials): used for machine-to-machine communication.

The specification also provides an extensibility mechanism for defining additional types.

For details on how each grant type works and when it should be used refer to [API Authorization](/api-auth).


## OAuth endpoints

OAuth 2.0 utilizes two endpoints: the **Authorization** endpoint and the **Token** endpoint.

### Authorization endpoint

The Authorization endpoint is used to interact with the resource owner and get the authorization to access the protected resource. To better understand this, imagine that you want to log in to a service using your Google account. First, the service will redirect you to Google in order to authenticate (if you are not already logged in) and then you will get a consent screen, where you will be asked to authorize the service to access some of your data (protected resources), for example your email address and your list of contacts.

The request parameters of the Authorization endpoint are:
- `response_type`: Tells the authorization server which grant to execute. Refer to the [How Response Type Works paragraph](#how-response-type-works) for details.
- `client_id`: The id of the application that asks for authorization.
- `redirect_uri`: Holds a URL. A successful response from this endpoint results in a redirect to this URL.
- `scope`: A space-delimited list of permissions that the application requires.
- `state`: An opaque value, used for security purposes. If this request parameter is set in the request, then it is returned to the application as part of the `redirect_uri`.

#### How response type works

This endpoint is used by the **Authorization Code** and the **Implicit** [grant types](#authorization-grant-types). The authorization server needs to know which grant type the application wants to use, since it affects the kind of credential it will issue: for **Authorization Code** grant it will issue an authorization code  (which later can be exchanged with an Access Token), while for **Implicit** grant it will issue an **Access Token**.

::: panel Authorization Code vs Access Token
An authorization code is an opaque string, meant to be exchanged with an Access Token at the [token endpoint](#token-endpoint). An Access Token is an opaque string (or a [JWT](/tokens/concepts/jwts) in Auth0 implementation) that denotes who has authorized which permissions (scopes) to which application.
:::

In order to inform the authorization server which grant type to use, the `response_type` request parameter is used:

- For **Authorization Code** grant set `response_type=code`. This way the response will include an authorization code.

- For **Implicit** grant set `response_type=token`. This way the response will include an Access Token. An alternative is to set `response_type=id_token token`. In this case the response will include both an Access Token and an ID Token.

::: panel ID Token
The ID Token is a JWT that contains information about the logged in user. It was introduced by <dfn data-key="openid">**OpenID Connect (OIDC)**</dfn>. For more info, see [OpenID Connect](/protocols/oidc) and [ID Token](/tokens/concepts/id-tokens).
:::

#### How response mode works

The [OAuth 2.0 Multiple Response Type Encoding Practices](https://openid.net/specs/oauth-v2-multiple-response-types-1_0.html) specification, added a new parameter that specifies how the result of the authorization request is formatted. This parameter is called `response_mode`, it's optional, and it can take the following values:

- `query`: This is the default for **Authorization Code** grant. A successful response is `302 Found`, which triggers a redirect to the `redirect_uri`. The response parameters are embedded in the query component (the part after `?`) of the `redirect_uri` in the `Location` header.

  For example, a response might be:

  ```text
  HTTP/1.1 302 Found
  Location: https://my-redirect-uri/callback?code=js89p2x1
  ```

  Where, the `redirect_uri` is `https://my-redirect-uri/callback` and the authorization code is `js89p2x1`.

- `fragment`: This is the default for **Implicit** grant. A successful response is `302 Found`, which triggers a redirect to the `redirect_uri` (which is a request parameter). The response parameters are embedded in the fragment component (the part after `#`) of the `redirect_uri` in the `Location` header.

  For example, a response might be:

  ```text
  HTTP/1.1 302 Found
  Location: https://my-redirect-uri/callback#access_token=eyB...78f&token_type=Bearer&expires_in=3600
  ```

  Where, the `redirect_uri` is `https://my-redirect-uri/callback`, the Access Token is `eyB...78f`, it's a Bearer token and it expires in 3600 seconds.

- `form_post`: This response mode is defined by the [OAuth 2.0 Form Post Response Mode](https://openid.net/specs/oauth-v2-form-post-response-mode-1_0.html) specification. A successful response is `200 OK` and the response parameters are embedded in an HTML form as hidden params. The `action` of the form is the `redirect_uri` and the `onload` attribute is configured to submit the form. Hence, after the HTML is loaded by the browser, a redirection to the `redirect_uri` is done.

  For example, a response might be:

  ```html
  HTTP/1.1 200 OK
  <html>
   <head><title>Submit</title></head>
   <body onload="javascript:document.forms[0].submit()">
    <form method="post" action="https://my-redirect-uri.com/callback">
      <input type="hidden" name="state" value="klsdfY78FVN3sl6DWSjsdhfsd8r67832nb"/>
      <input type="hidden" name="id_token" value="eyJ...plD"/>
    </form>
   </body>
  </html>
  ```

- `web_message`: This response mode is defined by the [OAuth 2.0 Web Message Response Mode specification](https://tools.ietf.org/html/draft-sakimura-oauth-wmrm-00). It uses HTML5 Web Messaging instead of the redirect for the Authorization Response from the Authorization Endpoint. This is particularly useful when using [Silent Authentication](/api-auth/tutorials/silent-authentication). To use this response mode you have to register your app's URL at the __Allowed Web Origins__ field of your [Application's settings](${manage_url}/#/applications/${account.clientId}/settings).

### Token endpoint

The Token endpoint is used by the application in order to get an [Access Token](/tokens/concepts/access-tokens) or a <dfn data-key="refresh-token">[Refresh Token](/tokens/concepts/refresh-tokens)</dfn>. It is used by all flows, except for the [Implicit Flow](/flows/concepts/implicit) (since an Access Token is issued directly).

In the [Authorization Code Flow](/flows/concepts/auth-code), the application exchanges the authorization code it got from the Authorization endpoint for an Access Token.

In the [Client Credentials Flow](/flows/concepts/client-credentials) and [Resource Owner Password Credentials Grant](/api-auth/grant/password), the application authenticates using a set of credentials and then gets an Access Token.

## Keep reading

* [Which OAuth 2.0 flow should I use?](/api-auth/which-oauth-flow-to-use)
* [API Authorization](/api-auth)
* [State Parameter](/protocols/oauth2/oauth-state)
* [Mitigate CSRF Attacks](/protocols/oauth2/mitigate-csrf-attacks)
* [Redirect Users](/protocols/oauth2/redirect-users)
