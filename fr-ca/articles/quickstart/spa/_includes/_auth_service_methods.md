The service includes several methods for handling authentication.

* `login` - makes a call for the Lock widget to be opened
* `handleAuthentication` - registers a listener for Lock's `authenticated` event with a callback to save the user's tokens in browser storage
* `setSession` - sets the Access Token, ID Token, and a time at which the Access Token will expire
* `logout` - removes the user's tokens from browser storage
* `isAuthenticated` - checks whether the expiry time for the Access Token has passed
