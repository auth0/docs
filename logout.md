# Logout

You can logout the user from the identity provider by doing a redirect to:

    https://@@account.namespace@@/logout

Depending on which identity provider the user has logged in to, it will take care of logging the user out of that identity provider.
> If you are working with social identity providers (like Google, Facebook, etc.) make sure to set your own Client ID and Secret on the Auth0 dashboard, otherwise the logout won't work. Also, beware that when you use this, the user will be logged out from the social provider completely. For instance, if the user had Gmail open on another tab, it will close that session as well. This might not be desirable for the user though, so make sure you tailor the experience according to your usecase.

If you specifcy a `returnTo` parameter, we will redirect to the url specified after the logout.

    https://@@account.namespace@@/logout?returnTo=http://somewhere

> The returnTo parameter won't work for social providers, since there is no way to specify that.

Facebook has some special requirements to trigger a logout. You will have to build the logout URL as described below:

    https://@@account.namespace@@/logout?
          returnTo=url_encode(https://@@account.namespace@@/logout?returnTo=http://yoursite)
          &access_token=[facebook access_token]

> Make sure to properly encode the returnTo parameter
