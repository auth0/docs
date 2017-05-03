There are several methods that must be defined in the service, including:

* `login` - makes a call for the Lock widget to be opened
* `handleAuthentication` - registers a listener for Lock's `authenticated` event with a callback to save the user's tokens in browser storage
* `setSession` - sets the `access_token`, `id_token`, and a time at which the `access_token` will expire
* `logout` - removes the user's tokens from browser storage
* `isAuthenticated` - checks whether the expiry time for the `access_token` has passed