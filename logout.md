# Logout

You can log a user out from Auth0 by redirecting to the following URL:

    https://@@account.namespace@@/v2/logout

This will clear any single sign-on cookies set by Auth0 for that user.
If you also want to log the user out of their identity provider, add a `federated` query string parameter to the logout URL:

    https://@@account.namespace@@/v2/logout?federated

> If you are working with social identity providers such as Google or Facebook, make sure to set your own Client ID and Secret in the Auth0 dashboard; otherwise the logout won't work.

If you specify a `returnTo` parameter, Auth0 will redirect to that URL after logging out:

    https://@@account.namespace@@/v2/logout?returnTo=http://somewhere

> The returnTo parameter won't work for social providers, since there is no way to specify that.

Facebook has some special requirements to trigger a logout. You will have to build the logout URL as described below:

    https://@@account.namespace@@/v2/logout?
          returnTo=url_encode(https://@@account.namespace@@/logout?returnTo=http://yoursite)
          &access_token=[facebook access_token]

> Make sure to properly encode the `returnTo` parameter.
