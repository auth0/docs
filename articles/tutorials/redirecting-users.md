---
description: How to handle returning users after authentication.
---

# Redirecting Users After Login

In order to give your application's users a good experience, it is necessary to handle how users are redirected back to your application after authentication.

The `redirect_uri` field is meant to be used for a callback url, which is not necesarily they URL you want to bring users to after authentication. Callback URLs are the URLs that Auth0 invokes after the authentication process where your application is then routed. Since callback URLs can be manipulated for security only whitelisted URLs set in `Allowed Callback URLs` will be recognized as valid. 

If you want to redirect your users to another page on your site that is not the callback url, there are a few options on how to do so:

## Using the `state` parameter
The `state` parameter is one of the supported Auth0 [Authentication Parameters](/libraries/lock/v10/sending-authentication-parameters). You can use this field to hold multiple values such as a JSON object that holds the URL you want to bring the user to. 

For example:

```
state = {
   "auth0_authorize": "xyzABC123",
   "return_url": "https://yoursite.com/home"
}
```

When the state value is returned after a successful request, you can use the `return_url` contained in the `state` to redirect the user to the desired URL. [Click here to learn more about using the state parameter.](/protocols/oauth-state)

## Storing the redirect URL

Another option is to store the desired redirect URL in web storage to be used after authentication. This is similar to how you would [store a JWT](/security/store-tokens#where-to-store-your-jwts). Like with the `state` parameter, this will hold the URL you want to bring your users to.

These are just a few suggestions and there are other ways you can configure your application to handle redirecting your users after authentication.
