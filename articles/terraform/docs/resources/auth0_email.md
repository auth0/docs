# auth0_email

With Auth0, you can have standard welcome, password reset, and account verification email-based workflows built right into Auth0. This resource allows you to configure email providers so you can route all emails that are part of Auth0's authentication workflows through the supported high-volume email service of your choice.

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
```

## Argument Reference

Arguments accepted by this resource include:

* `name` - (Required) String. Name of the email provider. Options include `mailgun`, `mandrill`, `sendgrid`, `ses`, `smtp`, and `sparkpost`.
* `enabled` - (Optional) Boolean. Indicates whether or not the email provider is enabled.
* `default_from_address` - (Required) String. Email address to use as the sender when no other "from" address is specified.
* `credentials` - (Required) List(Resource). Configuration settings for the credentials for the email provider. For details, see [Credentials](#credentials).

### Credentials

`credentials` supports the following arguments:

* `api_user` - (Optional) String. API User for your email service.
* `api_key` - (Optional) String, Case-sensitive. API Key for your email service. Will always be encrypted in our database.
* `access_key_id` - (Optional) String, Case-sensitive. AWS Access Key ID. Used only for AWS.
* `secret_access_key` - (Optional) String, Case-sensitive. AWS Secret Key. Will always be encrypted in our database. Used only for AWS.
* `region` - (Optional) String. Default region. Used only for AWS, Mailgun, and SparkPost.
* `smtp_host` - (Optional) String. Hostname or IP address of your SMTP server. Used only for SMTP.
* `smtp_port` - (Optional) Integer. Port used by your SMTP server. Please avoid using port 25 if possible because many providers have limitations on this port. Used only for SMTP.
* `smtp_user` - (Optional) String. SMTP username. Used only for SMTP.
* `smtp_pass` - (Optional) String, Case-sensitive. SMTP password. Used only for SMTP.
