# auth0_rule

With Auth0, you can create custom Javascript snippets that run in a secure, isolated sandbox as part of your authentication pipeline, which are otherwise known as rules. This resource allows you to create and manage rules. You can create global variable for use with rules by using the auth0_rule_config resource.

## Example Usage

```hcl
resource "auth0_rule" "my_rule" {
  name = "empty-rule"
  script = <<EOF
function (user, context, callback) {
  callback(null, user, context);
}
EOF
  enabled = true
}

resource "auth0_rule_config" "my_rule_config" {
  key = "foo"
  value = "bar"
}
```

## Argument Reference

Arguments accepted by this resource include:

* `name` - (Required) String. Name of the rule. May only contain alphanumeric characters, spaces, and hyphens. May neither start nor end with hyphens or spaces.
* `script` - (Required) String. Code to be executed when the rule runs.
* `order` - (Optional) Integer. Order in which the rule executes relative to other rules. Lower-valued rules execute first.
* `enabled` - (Optional) Boolean. Indicates whether the rule is enabled.

## Attribute Reference

Attributes exported by this resource include:

* `order` - Integer. Order in which the rule executes relative to other rules. Lower-valued rules execute first.
