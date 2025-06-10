# auth0_user

With this resource, you can manage user identities, including resetting passwords, and creating, provisioning, blocking, and deleting users.

## Example Usage

```hcl
resource "auth0_user" "user" {
  connection_name = "Username-Password-Authentication"
  user_id = "12345"
  username = "test"
  nickname = "testnick"
  email = "test@test.com"
  email_verified = true
  password = "passpass$12$12"
  roles = [ auth0_role.admin.id ]
}

resource "auth0_role" "admin" {
	name = "admin"
	description = "Administrator"
}
```

## Argument Reference

Arguments accepted by this resource include:

* `user_id` - (Optional) String. ID of the user.
* `connection_name` - (Required) String. Name of the connection from which the user information was sourced.
* `username` - (Optional) String. Username of the user. Only valid if the connection requires a username.
* `nickname` - (Optional) String. Preferred nickname or alias of the user.
* `password` - (Optional) String, Case-sensitive. Initial password for this user. Used for non-SMS connections.
* `email` - (Optional) String. Email address of the user.
* `email_verified` - (Optional) Boolean. Indicates whether or not the email address has been verified.
* `verify_email` - (Optional) Boolean. Indicates whether or not the user will receive a verification email after creation. Overrides behavior of `email_verified` parameter.
* `phone_number` - (Optional) String. Phone number for the user; follows the E.164 recommendation. Used for SMS connections. 
* `phone_verified` - (Optional) Boolean. Indicates whether or not the phone number has been verified.
* `user_metadata` - (Optional) String, JSON format. Custom fields that store info about the user that does not impact a user's core functionality. Examples include work address, home address, and user preferences.
* `app_metadata` (Optional) String, JSON format. Custom fields that store info about the user that impact the user's core functionality, such as how an application functions or what the user can access. Examples include support plans and IDs for external accounts.
* `roles` - (Optional) Set(String). Set of IDs of roles assigned to the user.
