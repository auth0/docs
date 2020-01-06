# auth0_tenant

With this resource, you can manage Auth0 tenants, including setting logos and support contact information, setting error pages, and configuring default tenant behaviors.

## Example Usage

```hcl
resource "auth0_tenant" "tenant" {
  change_password {
    enabled = true
    html    = "${file("./password_reset.html")}"
  }

  guardian_mfa_page {
    enabled = true
    html    = "${file("./guardian_multifactor.html")}"
  }

  default_audience  = "<client_id>"
  default_directory = "Connection-Name"

  error_page {
    html          = "${file("./error.html")}"
    show_log_link = true
    url           = "http://mysite/errors"
  }

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

## Argument Reference

Arguments accepted by this resource include:

* `change_password` - (Optional) List(Resource). Configuration settings for change passsword page. For details, see [Change Password Page](#change-password-page).
* `guardian_mfa_page` - (Optional) List(Resource). Configuration settings for the Guardian MFA page. For details, see [Guardian MFA Page](#guardian-mfa-page).
* `default_audience` - (Optional) String. API Audience to use by default for API Authorization flows. This setting is equivalent to appending the audience to every authorization request made to the tenant for every application.
* `default_directory` - (Optional) String. Name of the connection to be used for Password Grant exchanges. Options include `auth0-adldap`, `ad`, `auth0`, `email`, `sms`, `waad`, and `adfs`.
* `error_page` - (Optional) List(Resource). Configuration settings for error pages. For details, see [Error Page](#error-page).
* `friendly_name` - (Optional) String. Friendly name for the tenant.
* `picture_url` - (Optional). String URL of logo to be shown for the tenant. Recommended size is 150px x 150px. If no URL is provided, the Auth0 logo will be used. 
* `support_email` - (Optional) String. Support email address for authenticating users.
* `support_url` - (Optional) String. Support URL for authenticating users.
* `allowed_logout_urls` - (Optional) List(String). URLs that Auth0 may redirect to after logout.
* `session_lifetime` - (Optional) Integer. Number of hours during which a session will stay valid.
* `sandbox_version` - (Optional) String. Selected sandbox version for the extensibility environment, which allows you to use custom scripts to extend parts of Auth0's functionality.
* `idle_session_lifetime` - (Optional) Integer. Number of hours during which a session can be inactive before the user must log in again.
* `flags` - (Optional) List(Resource). Configuration settings for tenant flags. For details, see [Flags](#flags).
* `universal_login` - (Optional) List(Resource). Configuration settings for Universal Login. For details, see [Universal Login](#universal-login).

### Change Password Page

`change_password_page` supports the following arguments:

* `enabled` - (Required) Boolean. Indicates whether or not to use the custom change password page.
* `html` - (Required) String, HTML format with supported Liquid syntax. Customized content of the change password page.

### Guardian MFA Page

`guardian_mfa_page` supports the following arguments:

* `enabled` - (Required) Boolean. Indicates whether or not to use the custom Guardian page.
* `html` - (Required) String, HTML format with supported Liquid syntax. Customized content of the Guardian page.

### Error Page

`error_page` supports the following arguments:

* `html` - (Required) String, HTML format with supported Liquid syntax. Customized content of the error page.
* `show_log_link` - (Required) Boolean. Indicates whether or not to show the link to logs as part of the default error page.
* `url` - (Required) String. URL to redirect to when an error occurs rather than showing the default error page.

### Flags

`flags` supports the following arguments:

* `change_pwd_flow_v1` - (Optional) Boolean. Indicates whether or not to use the older v1 change password flow. Not recommended except for backward compatibility.
* `enable_client_connections` - (Optional) Boolean. Indicates whether or not all current connections should be enabled when a new client is created.
* `enable_apis_section` - (Optional) Boolean. Indicates whether or not the APIs section is enabled for the tenant.
* `enable_pipeline2` - (Optional) Boolean. Indicates whether or not advanced API Authorization scenarios are enabled.
* `enable_dynamic_client_registration` - (Optional) Boolean. Indicates whether or not the tenant allows dynamic client registration.
* `enable_custom_domain_in_emails` - (Optional) Boolean. Indicates whether or not the tenant allows custom domains in emails.
* `universal_login` - (Optional) Boolean. Indicates whether or not the tenant uses universal login.
* `enable_legacy_logs_search_v2` - (Optional) Boolean. Indicates whether or not to use the older v2 legacy logs search.
* `disable_clickjack_protection_headers` - (Optional) Boolean. Indicated whether or not classic Universal Login prompts include additional security headers to prevent clickjacking.
* `enable_public_signup_user_exists_error` - (Optional) Boolean. Indicates whether or not the public sign up process shows a user_exists error if the user already exists.

### Universal Login

`universal_login` supports the following arguments:

* `colors` - (Optional) List(Resource). Configuration settings for Universal Login colors. See [Universal Login - Colors](#colors).

#### Colors 

`colors` supports the following arguments:

* `primary` - (Optional) String, Hexadecimal. Primary button background color.
* `page_background` - (Optional) String, Hexadecimal. Background color of login pages.

## Attribute Reference

Attributes exported by this resource include:

* `sandbox_version` - String. Selected sandbox version for the extensibility environment, which allows you to use custom scripts to extend parts of Auth0's functionality.
