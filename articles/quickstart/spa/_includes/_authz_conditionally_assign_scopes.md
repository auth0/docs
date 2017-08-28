## Conditionally Assign Scopes to Users

The default behavior when registering `scope`s in your API settings is that all of those `scope`s become immediately available and can be requested by any user. To properly handle access control, you will need to create policies which stipulate the conditions under which users can be granted certain `scope`s. This can be done with Rules. See the [documentation](/rules) for how to use Rules to create `scope` policies.
