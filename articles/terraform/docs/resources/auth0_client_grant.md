# auth0_client_grant

Auth0 uses various grant types, or methods by which you grant limited access to your resources to another entity without exposing credentials. The OAuth 2.0 protocol supports several types of grants, which allow different types of access. This resource allows you to create and manage client grants used with configured Auth0 clients.

## Example Usage

```hcl
resource "auth0_client" "my_client" {
  name = "Example Application - Client Grant (Managed by Terraform)"
}

resource "auth0_resource_server" "my_resource_server" {
  name       = "Example Resource Server - Client Grant (Managed by Terraform)"
  identifier = "https://api.example.com/client-grant"

  scopes {
    value       = "create:foo"
    description = "Create foos"
  }

  scopes {
    value       = "create:bar"
    description = "Create bars"
  }
}

resource "auth0_client_grant" "my_client_grant" {
  client_id = "${auth0_client.my_client.id}"
  audience  = "${auth0_resource_server.my_resource_server.identifier}"
  scope     = ["create:foo"]
}
```

## Argument Reference

Arguments accepted by this resource include:

* `client_id` - (Required) String. ID of the client for this grant.
* `audience` - (Required) String. Audience or API Identifier for this grant.
* `scope` - (Required) List(String). Permissions (scopes) included in this grant.
