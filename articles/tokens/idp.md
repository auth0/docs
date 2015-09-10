# Identity Provider Access Tokens

## Overview

Third Party Access Tokens are issued by third party social providers, such as Facebook or LinkedIn, when a user authenticates with the provider.  These third party access tokens can be used to call the API of the third party provider that issued the token.

## How to get Identity Provider access tokens

Identity Provider access tokens can be obtained in one of two ways.  First, if a user authenticates to a social Identity Provider, such as Facebook, an Identity Provider access token for that social Identity Provider will be returned in the first element of the `identities` array within the user profile object returned by Auth0.

For example, if authentication is invoked via a call to the Lock widget’s .show method, the following code would be used to put the Identity Provider access token into a variable called `identityProviderAccessToken`. .

```js
lock.show({
  responseType: 'token',
  authParams: {
     scope: 'openid name email'
  }
}, function(err, profile, token) {
    identityProviderAccessToken = profile.identities[0].access_token;
});
```

More information is available at [User Profile](/user-profile) and [Normalized User Profile](/user-profile/normalized) contains examples of the `identities` array and profiles as returned by various social providers.

## How to control contents of Identity Provider access tokens

The contents of third party access tokens will vary by the issuing Identity Provider.

## Validity

The validity period for third party access tokens will vary by the issuing Identity Provider.

## Renewing the token

There is no standard way to renew Identity Provider access tokens through Auth0.  The mechanism, if available, for renewal of Identity Provider access tokens would vary by Identity Provider and be handled by each Identity Provider.

## Termination of tokens

The ability to terminate Identity Provider access tokens is up to each individual Identity Provider.

## Uses

The Identity Provider access is used to call an API offered by the Identity Provider that issued the token.  For example, an access token issued after authentication to Facebook could be used to call the Facebook Graph API.

For additional information see:
* [Calling an external IDP API](/what-to-do-once-the-user-is-logged-in/calling-an-external-idp-api)

* [Adding Scopes for external IDP](/what-to-do-once-the-user-is-logged-in/adding-scopes-for-an-external-idp)

## Best practices

### Validation

In general, Identity Provider access tokens are passed to the issuing provider, and the issuing provider is responsible for validation of the token.
