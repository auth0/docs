# auth0_custom_domain

With Auth0, you can use a custom domain to maintain a consistent user experience. This resource allows you to create and manage a custom domain within your Auth0 tenant.

## Example Usage

```hcl
resource "auth0_custom_domain" "my_custom_domain" {
  domain = "auth.example.com"
  type = "auth0_managed_certs"
  verification_method = "txt"
}
```

## Argument Reference

Arguments accepted by this resource include:

* `domain` - (Required) String. Name of the custom domain. 
* `type` - (Required) String. Provisioning type for the custom domain. Options include `auth0_managed_certs` and `self_managed_certs`.
* `verification_method` - (Required) String. Domain verification method. Options include `txt`.

## Attribute Reference

Attributes exported by this resource include:

* `primary` - Boolean. Indicates whether or not this is a primary domain.
* `status` - String. Configuration status for the custom domain. Options include `disabled`, `pending`, `pending_verification`, and `ready`.
* `verification` - List(Resource). Configuration settings for verification. For details, see [Verification](#verification).

### Verification

`verification` exports the following attributes:

* `methods` - List(Map). Verification methods for the domain.
