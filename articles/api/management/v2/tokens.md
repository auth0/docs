# The Auth0 APIv2 Token

## Overview

The Auth0 APIv2 token is required to call v2 of the Auth0 Management API, frequently referred to as APIv2.  This token is used by a specific tenant in Auth0 to call Auth0 APIv2 to access or update records for that tenant.  This APIv2 token is a JWT, and contains various scopes, such as `read:users` or `update:clients`, and is signed with a client API key and secret for the entire tenant.

## How to get an APIv2 Token

An Auth0 APIv2 token can be generated on the [Auth0 APIv2 explorer](/api/v2) page or it can be created programmatically by building the JWT, including the desired scopes, and signing it with the tenant api key/secret.  

The [Auth0 APIv2 explorer page](/api/v2) is very useful to experiment with Auth0 APIv2. Each endpoint shows its required scopes. By clicking the scope, it is automatically added to the token. For example, to make a call to the “List or search users” endpoint, one would click on the `read:users` scope to generate the token before invoking it:

![](/media/articles/api/tokens/endpoint-scope.png)

You can see the generated token in the **TOKEN GENERATOR** section. You can also manage scopes from this section to generate tokens. For adding new scopes you need to select an entity, an action and then press the arrow. Once all necessary scopes have been specified, the field underneath **TOKEN GENERATOR** will contain the APIv2 token to pass to the APIv2 endpoint(s).

![](/media/articles/api/tokens/token-generator.png)

To generate an APIv2 token programmatically, build a JSON Web  Token (JWT) containing the necessary information and sign it with the tenant API Secret. To build the JWT, it is helpful to use the APIv2 explorer, specify the desired scopes, and then click **Debug in jwt.io**. This will create the JWT with the scopes you specified and display it in JWT format. To get the API secret with which to sign the JWT, click on **API Key/Secret** in the Auth0 APIv2 API explorer.

### Special Scopes

Notice that within the Users API some endpoints have scopes related to the current user (like `read:current_user` or `update:current_user_identities`). These are [special scopes](/api/v2/changes#the-id_token-and-special-scopes) in the id_token, which are granted automatically to the logged in user, so it makes no sense to click on them to generate an APIv2 token that will be used from server side code.

## How to control contents of APIv2 token

The APIv2 token will be issued for a particular tenant.  To have a token issued in the APIv2 explorer for a particular tenant, log into the Auth0 tenant, and then access the APIv2 explorer page.  Similarly, to obtain the secret with which to sign an APIv2 token, log into the desired tenant first before accessing the APIv2 explorer page.

## Validity

There is no specific validity period for an APIv2 token.  An APIv2 token can be built programmatically, as desired, by a client.

## Renewing the token

There is no mechanism for renewing an APIv2 token.  A new token should be created whenever it is needed.

## Termination of tokens

You can terminate the APIv2 tokens calling the [blacklist endpoint](/api/v2#!/Blacklists/post_tokens).

## Uses

The Auth0 APIv2 access token is used to call the Auth0 Management APIv2.  This token is required to update the app_metadata portions of the user profile.

## API Secret

Auth0 API tokens are generated locally on your browser using your API secret, there is no way for Auth0 to keep track of them. Auth0's API does not currently maintain a list of tokens which have been generated. 

In the event that the API secret has been compromised, or you need to invalidate all tokens generated with that API secret, one can change the API secret. 

You can change the API secret  in the dashboard by visiting this URL directly:
```
https://manage.auth0.com/#/applications/YOUR_API_ID/settings
```

You can then change the `Client Secret` in that page to change your APIv2 secret.
