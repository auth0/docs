A user’s profile is populated from data supplied by an [Identity Provider](/identityproviders) during the login process, and this is referred to as the [Normalized User Profile](/users/normalized/auth0). By default, there is one user profile created for each user identity, and there are a number of things to consider when looking at the management of it:

* What should you do if you need to store information to help customize a user’s experience?
* What if you need to store user information that didn’t originate from an identity provider?
* Why would you need to store user-related information that a user cannot modify?
* What do you do if you need to store user-related information that a user cannot modify?
* What happens if a user forgets their password?
* What should a user do if they want to change their password?