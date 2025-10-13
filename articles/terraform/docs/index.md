# Auth0 Provider

The Auth0 provider is used to interact with Auth0 applications and APIs. It provides resources that allow you to create and manage clients, resource servers, client grants, connections, email providers and templates, rules and rule variables, users, roles, tenants, and custom domains as part of a Terraform deployment.

Use the navigation to the left to read about the available resources.

## Example Usage

```hcl
# Configure the Auth0 Provider
provider "auth0" {
  domain = "<domain>"
  client_id = "<client-id>"
  client_secret = "<client-secret>"
  debug = "<debug>"
}

# Add a tenant
resource "auth0_tenant" "tenant" {
  default_audience  = "<client_id>"
  friendly_name = "Tenant Name"
  picture_url   = "http://mysite/logo.png"
  support_email = "support@mysite"
  support_url   = "http://mysite/support"
  allowed_logout_urls = [
    "http://mysite/logout"
  ]
  session_lifetime = 46000
  sandbox_version  = "8"
  }
```

These variables can also be accessed via the `AUTH0_DOMAIN`, `AUTH0_CLIENT_ID`, and `AUTH0_CLIENT_SECRET` environment variables, respectively.

## Argument Reference

* `domain` - (Required) String. Your Auth0 domain name.
* `client_id` - (Required) String. Your Auth0 client ID.
* `client_secret` - (Required) String. Your Auth0 client secret.
* `debug` - (Optional) Boolean. Indicates whether or not to turn on debug mode.