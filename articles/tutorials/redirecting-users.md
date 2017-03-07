---
description: How to handle returning users after authentication.
---

# Redirect Users After Login

In order to give your application's users a good experience, it is necessary to handle how users are redirected back to your application after authentication.

The `redirect_uri` field is meant to be used for a callback url, which is not necesarily the URL you want to bring users to after authentication. Callback URLs are invoked by Auth0 after the authentication process and where your application is then routed. Since callback URLs can be manipulated for security only whitelisted URLs set in the `Allowed Callback URLs` field of a Client's Settings will be recognized as valid. 

If you want to redirect your users to another page on your site that is not the callback url, there are a few options on how to do so:

## Store the desired URL in the `state` parameter

The `state` parameter is one of the supported Auth0 [Authentication Parameters](/libraries/lock/v10/sending-authentication-parameters). You can use this field to hold multiple values such as a JSON object that holds the URL you want to bring the user to. 

For example:

```
state = {
   "auth0_authorize": "xyzABC123",
   "return_url": "https://yoursite.com/home"
}
```

When the state value is returned after a successful request, you can use the `return_url` contained in the `state` to redirect the user to the desired URL. 

[Click here to learn more about using the state parameter.](/protocols/oauth-state)

## Store the redirect URL in web storage

Another option is to store the desired redirect URL in web storage to be used after authentication. The way this could be stored is similar to [how you would store a JWT](/security/store-tokens#where-to-store-your-jwts). Like with the `state` parameter, this will hold the URL you want to bring your users to. After authentication you can create logic to redirect your users and use this field for where you will redirect your users.

## Additional Information

These are just a few suggestions and there are other ways you can configure your application to handle redirecting your users after authentication. 

[Redirects can also be configured for users using rules](/rules/redirect) to programatically redirect users *before* an authentication transaction is complete, allowing the implementation of custom authentication flows which require input on behalf of the user.

