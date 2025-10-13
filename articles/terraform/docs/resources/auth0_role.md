# auth0_role

With this resource, you can created and manage collections of permissions that can be assigned to users, which are otherwise known as roles. Permissions (scopes) are created on auth0_resource_server, then associated with roles and optionally, users using this resource.

## Example Usage

```hcl
resource "auth0_resource_server" "my_resource_server" {
  name = "My Resource Server (Managed by Terraform)"
  identifier = "my-resource-server-identifier"
  signing_alg = "RS256"
  token_lifetime = 86400
  skip_consent_for_verifiable_first_party_clients = true

  enforce_policies = true

  scopes {
    value = "read:something"
    description = "read something"
  }
}

resource "auth0_user" "my_user" {
  connection_name = "Username-Password-Authentication"
  user_id = "auth0|1234567890"
  email = "test@test.com"
  password = "passpass$12$12"
  nickname = "testnick"
  username = "testnick"
  roles = [ <%="${auth0_role.my_role.id}"%> ]
}
resource "auth0_role" "my_role" {
  name = "My Role - (Managed by Terraform)"
  description = "Role Description..."

  permissions {
    resource_server_identifier = <%="${auth0_resource_server.my_resource_server.identifier}"%>
    name = "read:something"
  }
}
```

## Argument Reference

Arguments accepted by this resource include:

* `role_id` - (Optional) String. ID for this role.
* `name` - (Required) String. Name for this role.
* `description` - (Optional) String. Description of the role.
* `user_ids` - (Optional) List(String). IDs of the users to which the role is assigned.
* `permissions` - (Optional) Set(Resource). Configuration settings for permissions (scopes) attached to the role. For details, see [Permissions](#permissions).

### Permissions

`permissions` supports the following arguments:

* `name` - (Required) String. Name of the permission (scope).
* `resource_server_identifier` - (Required) String. Unique identifier for the resource server.

## Attribute Reference

Attributes exported by this resource include:

* `role_id` - String. ID for the role.
