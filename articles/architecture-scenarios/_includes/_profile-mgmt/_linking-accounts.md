By default, there is one [user profile](/users/concepts/overview-user-profile) (user account) for each user identity. If you enable login from multiple identity providers - via Facebook or Google [social authentication](/architecture-scenarios/implementation/${platform}/${platform}-authentication#social-authentication) as well as via Auth0 [username and password authentication](/architecture-scenarios/implementation/${platform}/${platform}-authentication#username-and-password-authentication) - then each will have a separate user profile. You can use Auth0’s functionality for [linking user accounts](/users/concepts/overview-user-account-linking) to create one profile for a user as an aggregate of all their associated identities. 

The process of linking accounts merges user profiles in pairs: a primary account and a secondary account must be specified in the linking process. The number of accounts that can be linked, however, extends beyond a single pair. For example, you can use an account which already has multiple accounts merged with it as the primary, and link an additional secondary account to it. This means that one user account can have multiple identities associated with it, which provides a number of advantages: 

* Users can log in using multiple identities without creating a separate profile for each one.
* Registered users can use new login identities, but continue using their existing profile.
* Users can carry their profile around, irrespective of which identity they use for login.
* Users can link to an account with more identity information in order to provide a more complete profile.
* Your applications can retrieve connection-specific user profile data.
