# auth0_connection

With Auth0, you can define sources of users, otherwise known as connections, which may include identity providers (such as Google or LinkedIn), databases, or passwordless authentication methods. This resource allows you to configure and manage connections to be used with your clients and users.

## Example Usage

```hcl
resource "auth0_connection" "my_connection" {
  name = "Example-Connection"
  strategy = "auth0"
  options {
    password_policy = "excellent"
    password_history {
      enable = true
      size = 3
    }
    brute_force_protection = "true"
    enabled_database_customization = "true"
    custom_scripts = {
      get_user = <<EOF
function getByEmail (email, callback) {
  return callback(new Error("Whoops!"))
}
EOF
    }

    configuration = {
      foo = "bar"
      bar = "baz"
    }
  }
}

resource "auth0_connection" "my_waad_connection" {
   name     = "my-waad-connection"
   strategy = "waad"

   options {
     client_id     = "1234"
     client_secret = "1234"
     tenant_domain = "exmaple.onmicrosoft.com"

     domain_aliases = [
       "example.io",
     ]

     use_wsfed            = false
     waad_protocol        = "openid-connect"
     waad_common_endpoint = false

     app_domain       = "my-auth0-app.eu.auth0.com"
     api_enable_users = true
     basic_profile    = true
     ext_groups       = true
     ext_profile      = true
   }
 }
```

## Argument Reference

* `name` - (Required) String. Name of the connection.
* `is_domain_connection` - (Optional) Boolean. Indicates whether or not the connection is domain level.
* `strategy` - (Optional) String. Type of the connection, which indicates the identity provider. Options include `ad`, `adfs`, `amazon`, `aol`, `auth0`, `auth0-adldap`, `auth0-oidc`, `baidu`, `bitbucket`, `bitly`, `box`, `custom`, `daccount`, `dropbox`, `dwolla`, `email`, `evernote`, `evernote-sandbox`, `exact`, `facebook`, `fitbit`, `flickr`, `github`, `google-apps`, `google-oauth2`, `guardian`, `instagram`, `ip`, `linkedin`, `miicard`, `oauth1`, `oauth2`, `office365`, `paypal`, `paypal-sandbox`, `pingfederate`, `planningcenter`, `renren`, `salesforce`, `salesforce-community`, `salesforce-sandbox` `samlp`, `sharepoint`, `shopify`, `sms`, `soundcloud`, `thecity`, `thecity-sandbox`, `thirtysevensignals`, `twitter`, `untappd`, `vkontakte`, `waad`, `weibo`, `windowslive`, `wordpress`, `yahoo`, `yammer`, `yandex`.
* `options` - (Optional) List(Resource). Configuration settings for connection options. Maximum of one nested object with the following structure:
    **Arguments**
    * `validation` - (Optional) String.
    * `password_policy` - (Optional) String. Indicates level of password strength to enforce during authentication. A strong password policy will make it difficult, if not improbable, for someone to guess a password through either manual or automated means. Options include `none`, `low`, `fair`, `good`, `excellent`.
    * `password_history` - (Optional) List(Resource). Configuration settings for the password history that is maintained for each user to prevent the reuse of passwords. Nested object with the following structure:
        * `enable` - (Optional) Boolean. Indicates whether password history is enabled for the connection. When enabled, any existing users in this connection will be unaffected; the system will maintain their password history going forward.
        * `size` - (Optional) Integer, (Maximum=24). Indicates the number of passwords to keep in history. 
    * `password_no_personal_info` - (Optional) List(Resource). Configuration settings for the password personal info check, which does not allow passwords that contain any part of the user's personal data, including user's name, username, nickname, user_metadata.name, user_metadata.first, user_metadata.last, user's email, or firstpart of the user's email. Maximum of one nested object with the following structure:
        * `enable` - (Optional) Boolean. Indicates whether the password personal info check is enabled for this connection.
    * `password_dictionary` - (Optional) List(Resource). Configuration settings for the password dictionary check, which does not allow passwords that are part of the password dictionary. Maximum of one nested object with the following structure:
        * `enable` - (Optional) Boolean. Indicates whether the password dictionary check is enabled for this connection.
        * `dictionary` - (Optional) Set(String), (Maximum=2000 characters). Customized contents of the password dictionary. By default, the password dictionary contains a list of the [10,000 most common passwords](https://github.com/danielmiessler/SecLists/blob/master/Passwords/Common-Credentials/10k-most-common.txt); your customized content is used in addition to the default password dictionary. Matching is not case-sensitive.
    * `password_complexity_options` - (Optional) List(Resource). Configuration settings for password complexity. Maximum of one nested object with the following structure:
        * `min_length`- (Optional) Integer. Minimum number of characters allowed in passwords.
    * `api_enable_users` - (Optional) Bool
    * `basic_profile` - (Optional) Bool
    * `ext_admin` - (Optional) Bool
    * `ext_is_suspended` - (Optional) Bool
    * `ext_agreed_terms` - (Optional) Bool
    * `ext_groups` - (Optional) Bool
    * `ext_nested_groups` - (Optional) Bool
    * `ext_assigned_plans` - (Optional) Bool
    * `ext_profile` - (Optional) Bool
    * `enabled_database_customization` - (Optional) Bool
    * `brute_force_protection` - (Optional) Boolean. Indicates whether or not to enable brute force protection, which will limit the number of signups and failed logins from a suspicious IP address.
    * `import_mode` - (Optional) Boolean. Indicates whether or not you have a legacy user store and want to gradually migrate those users to the Auth0 user store. [Learn more](https://auth0.com/docs/users/guides/configure-automatic-migration).
    * `disable_signup` - (Optional) Boolean. Indicates whether or not to allow user sign-ups to your application.
    * `requires_username` - (Optional) Boolean. Indicates whether or not the user is required to provide a username in addition to an email address.
    * `custom_scripts` - (Optional) Map(String). 
    * `configuration` - (Optional) Map(String), Case-sensitive. 
    //Azure AD options
    * `app_id` - (Optional) String
    * `app_domain` - (Optional) String. Azure AD domain name.
    * `client_id` - (Optional) String. Client ID for your Azure AD application.
    * `client_secret` - (Optional) String, Case-sensitive. Client secret for your Azure AD application.
    * `domain_aliases` - (Optional) List(String). List of the domains that can be authenticated using the Identity Provider. Only needed for Identifier First authentication flows.
    * `max_groups_to_retrieve` - (Optional) String. Maximum number of groups to retrieve.
    * `tenant_domain` - (Optional) String
    * `use_wsfed` - (Optional) Bool
    * `waad_protocol` - (Optional) String
    * `waad_common_endpoint` - (Optional) Boolean. Indicates whether or not to use the common endpoint rather than the default endpoint. Typically enabled if you're using this for a multi-tenant application in Azure AD.
    //Twilio/Sms options
    * `name` - (Optional) String. 
    * `twilio_sid` - (Optional) String. SID for your Twilio account.
    * `twilio_token` - (Optional) String, Case-sensitive. AuthToken for your Twilio account.
    * `from` - (Optional) String. SMS number for the sender. Used when SMS Source is From.
    * `syntax` - (Optional) String. Syntax of the SMS. Options include `markdown` and `liquid`.
    * `template` - (Optional) String. Template for the SMS. You can use `@@password@@` as a placeholder for the password value.
    * `totp` - (Optional) Map(Resource). Configuration options for one-time passwords. Nested object with the following structure:
        * `time_step` - (Optional) Integer. Seconds between allowed generation of new passwords.
        * `length` - (Optional) Integer. Length of the one-time password.
    * `messaging_service_sid` - (Optional) String. SID for Copilot. Used when SMS Source is Copilot.
    //ADFS options
    * `adfs_server` - (Optional) String. ADFS Metadata source.
    //Salesforce options
    * `community_base_url` - (Optional) String
* `enabled_clients` - (Optional) Set(String). IDs of the clients for which the connection is enabled. If not specified, no clients are enabled.
* `realms` - (Optional) List(String). Defines the realms for which the connection will be used (i.e., email domains). If not specified, the connection name is added as the realm.

## Attribute Reference

* `is_domain_connection` - Boolean. Indicates whether or not the connection is domain level.
* `options` - List(Resource). Configuration settings for connection options. Maximum of one nested object with the following structure:
    * `password_history` - List(Resource). Configuration settings for the password history that is maintained for each user to prevent the reuse of passwords. Nested object with the following structure:
        * `enable` - Boolean. Indicates whether password history is enabled for the connection. When enabled, any existing users in this connection will be unaffected; the system will maintain their password history going forward.
        * `size` - Integer. Indicates the number of passwords to keep in history. 
* `realms` - List(String). Defines the realms for which the connection will be used (i.e., email domains). If the array is empty or the property is not specified, the connection name is added as the realm.