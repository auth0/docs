# auth0_resource_server

Allows you to create, read, update, and delete Auth0 resource servers.

With this resource, you can set up APIs that can be consumed from your authorized applications.

## Example Usage

```hcl
resource "auth0_resource_server" "my_resource_server" {
  name        = "Example Resource Server (Managed by Terraform)"
  identifier  = "https://api.example.com"
  signing_alg = "RS256"

  scopes {
    value       = "create:foo"
    description = "Create foos"
  }

  scopes {
    value       = "create:bar"
    description = "Create bars"
  }

  allow_offline_access                            = true
  token_lifetime                                  = 8600
  skip_consent_for_verifiable_first_party_clients = true
}
```

## Argument Reference

Arguments accepted by this resource include:

* `name` - (Optional) String. Friendly name for the resource server. Cannot include `<` or `>` characters.
* `identifier` - (Optional) String. Unique identifier for the resource server. Used as the audience parameter for authorization calls. Can not be changed once set.
* `scopes` - (Optional) Set(Resource).  List of permissions (scopes) used by this resource server. For details, see [Scopes](#scopes).
* `signing_alg` - (Optional) String. Algorithm used to sign JWTs. Options include `HS256` and `RS256`.
* `signing_secret` - (Optional) String. Secret used to sign tokens when using symmetric algorithms (HS256).
* `allow_offline_access` - (Optional) Boolean. Indicates whether or not refresh tokens can be issued for this resource server.
* `token_lifetime` - (Optional) Integer. Number of seconds during which access tokens issued for this resource server from the token endpoint remain valid.
* `token_lifetime_for_web` - (Optional) Integer. Number of seconds during which access tokens issued for this resource server via implicit or hybrid flows remain valid. Cannot be greater than the `token_lifetime` value.
* `skip_consent_for_verifiable_first_party_clients` - (Optional) Boolean. Indicates whether or not to skip user consent for applications flagged as first party.
* `verification_location` - (Optional) String
* `options` - (Optional) Map(String). Used to store additional metadata
* `enforce_policies` - (Optional) Boolean. Indicates whether or not authorization polices are enforced.
* `token_dialect` - (Optional) String. Dialect of access tokens that should be issued for this resource server. Options include `access_token` or `access_token_authz` (includes permissions).

### Scopes

 `scopes` supports the following arguments:

* `value` - (Optional) String. Name of the permission (scope). Examples include `read:appointments` or `delete:appointments`.
* `description` - (Optional) String. Description of the permission (scope).

## Attribute Reference

Attributes exported by this resource include:

* `signing_alg` - String. Algorithm used to sign JWTs. Options include `HS256` and `RS256`.
* `signing_secret` - String. Secret used to sign tokens when using symmetric algorithms (HS256).
* `token_lifetime` - Integer. Number of seconds during which access tokens issued for this resource server from the token endpoint remain valid.
* `token_lifetime_for_web` - Integer. Number of seconds during which access tokens issued for this resource server via implicit or hybrid flows remain valid. Cannot be greater than the `token_lifetime` value.
