# Logout

You can log a user out from Auth0 by redirecting to the following URL:

```text
https://${account.namespace}/v2/logout
```

This will clear any single sign-on cookies set by Auth0 for that user.
If you also want to log the user out of their identity provider, add a `federated` query string parameter to the logout URL:

```text
https://${account.namespace}/v2/logout?federated
```

> If you are working with social identity providers such as Google or Facebook, make sure to set your own Client ID and Secret in the Auth0 dashboard; otherwise the logout won't work.

If you specify a `returnTo` parameter, Auth0 will redirect to that URL after logging out:

```text
https://${account.namespace}/v2/logout?returnTo=http://somewhere
```

> The returnTo parameter won't work for social providers, since there is no way to specify that.

Facebook has some special requirements to trigger a logout. You will have to build the logout URL as described below:

```text
https://${account.namespace}/v2/logout?federated&
      returnTo=url_encode(https://${account.namespace}/logout?returnTo=http://yoursite)
      &access_token=[facebook access_token]
```

> Make sure to properly encode the `returnTo` parameter.

## SAML logout

To logout users from an external SAML identity provider, a [SAML logout URL](https://auth0.com/docs/saml-sp-generic#1-obtain-information-from-idp) must be configured in the settings for the SAML connection.
If a logout URL is not configured, Auth0 will use the SAML login URL instead.
To log out a user from both Auth0 and their SAML identity provider, they must be redirected to the logout endpoint including the `federated` query string parameter as described above.

Note that even if a logout URL has been configured correctly, it's possible that Auth0 will not be able to make a logout request to the SAML identity provider in some cases.
When logging in, the SAML identity provider should uniquely identify the user's session with a `SessionIndex` attribute in the `AuthnStatement` element of the SAML assertion.
This same `SessionIndex` value must be used when a user tries to log out; if it was not present in the initial login assertion, a logout request will not be made to the SAML identity provider.
