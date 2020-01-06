# auth0_email_template

With Auth0, you can have standard welcome, password reset, and account verification email-based workflows built right into Auth0. This resource allows you to configure email templates to customize the look, feel, and sender identities of emails sent by Auth0. Used in conjunction with configured email providers.

## Example Usage

```hcl
resource "auth0_email" "my_email_provider" {
  name = "ses"
  enabled = true
  default_from_address = "accounts@example.com"
  credentials {
    access_key_id = "AKIAXXXXXXXXXXXXXXXX"
    secret_access_key = "7e8c2148xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    region = "us-east-1"
  }
}

resource "auth0_email_template" "my_email_template" {
  template = "welcome_email"
  body = "<html><body><h1>Welcome!</h1></body></html>"
  from = "welcome@example.com"
  result_url = "https://example.com/welcome"
  subject = "Welcome"
  syntax = "liquid"
  url_lifetime_in_seconds = 3600
  enabled = true

  depends_on = [ "${auth0_email.my_email_provider}" ]
}
```

## Argument Reference

Arguments accepted by this resource include:

* `template` - (Required) String. Template name. Options include `verify_email`, `reset_email`, `welcome_email`, `blocked_account`, `stolen_credentials`, `enrollment_email`, `mfa_oob_code`, `change_password` (legacy), and `password_reset` (legacy).
* `body` - (Required) String. Body of the email template. You can include [common variables](https://auth0.com/docs/email/templates#common-variables).
* `from` - (Required) String. Email address to use as the sender. You can include [common variables](https://auth0.com/docs/email/templates#common-variables).
* `result_url` - (Required) String. URL to redirect the user to after a successful action. [Learn more](https://auth0.com/docs/email/templates#configuring-the-redirect-to-url).
* `subject` - (Required) String. Subject line of the email. You can include [common variables](https://auth0.com/docs/email/templates#common-variables).
* `syntax` - (Required) String. Syntax of the template body. You can use either text or HTML + Liquid syntax.
* `url_lifetime_in_seconds` - (Optional) Integer. Number of seconds during which the link within the email will be valid.
* `enabled` - (Required) Boolean. Indicates whether or not the template is enabled.
