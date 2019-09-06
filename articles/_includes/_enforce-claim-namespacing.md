::: warning
By default, Auth0 always enforces namespacing; any custom claims with non-namespaced identifiers will be silently excluded from tokens.

We do allow non-OIDC claims without a namespace for legacy tenants using a non-OIDC-conformant pipeline with the **Legacy User Profile** enabled, but we strongly recommend that legacy tenants migrate to an OIDC-conformant flow.
:::