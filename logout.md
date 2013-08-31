# Logout

You can logout the user from the identity provider by doing a redirect to:

    https://@@account.namespace@@/logout

Depending on which identity provider the user has logged in to, it will take care of logging the user out of that identity provider

> For example, if the user has logged in with Google, when you redirect to this endpoint it will logout the user from Google. This might not be desirable for the user though, so make sure you tailor the experience according to your usecase.

    https://@@account.namespace@@/logout?returnTo=http://somewhere

If you specifcy a `returnTo` parameter, we will redirect to the url specified after the logout.