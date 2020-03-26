Contains info retrieved from the identity provider with which the user originally authenticates. Users may also [link their profile to multiple identity providers](/users/concepts/overview-user-account-linking); those identities will then also appear in this array. The contents of an individual identity provider object varies by provider, but it will typically include the following:

- `connection` (text): Name of the Auth0 connection used to authenticate the user.
- `isSocial` (boolean): Indicates whether the connection is a social one.
- `provider` (text): Name of the entity that is authenticating the user, such as Facebook, Google, <dfn data-key="security-assertion-markup-language">SAML</dfn>, or your own provider.
- `user_id` (text): User's unique identifier for this connection/provider.
- `profileData` (object): User info associated with the connection. When profiles are linked, it is populated with the associated user info for secondary accounts.

In some cases, it will also include an API Access Token to be used with the provider. 