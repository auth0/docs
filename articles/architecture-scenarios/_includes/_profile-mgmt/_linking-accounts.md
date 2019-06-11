By default, there is one [user profile](/users/concepts/overview-user-profile) (i.e., one user account) for each user identity. If you enable login from multiple identity providers--via, say, Facebook or Google [social authentication](/architecture-scenarios/implementation/${platform}/${platform}-authentication#social-authentication) as well as via Auth0 [username and password authentication](/architecture-scenarios/implementation/${platform}/${platform}-authentication#username-and-password-authentication) --then each will have a separate user profile. Auth0’s functionality for [linking user accounts](/link-accounts) (a.k.a. account linking) can be used to create one profile for a user, as an aggregate of all their associated identities. 

The process of linking accounts essentially merges user profiles in pairs: a primary account and a secondary account must be specified in the linking process. The number of accounts that can be linked, however, extends beyond a single pair. For example, an account which already has multiple accounts merged with it can be used as the primary, and an additional secondary account can be linked to it. This means that one user account can have multiple identities associated with it, which additionally provides a number of advantages: 

* Allows users to log in using multiple identities without creating a separate profile for each
* Allows registered users to use new login identities, but continue using their existing profile
* Allows users to carry their profile around, irrespective of which identity they use for login
* Allows users to link to an account with more identity information in order to provide a more complete profile
* Allows your apps to retrieve connection-specific user profile data
