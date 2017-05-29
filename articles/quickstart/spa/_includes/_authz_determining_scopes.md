## Determining a User's Scopes

When login transactions are initiated, you can specify which `scope`s you would like to request. Typically this is done when `auth0.WebAuth` is instantiated, but it can also be done in an options object passed to the `authorize` method.

If a requested `scope` is available for the user, the `access_token` that gets signed and sent back for them will have a `scope` claim in the payload. The value of this claim will be a string with any `scope`s that were granted.

Determining UI behavior in the client-side application can be done by using the `scope`s that were granted for a user, but there's a catch: the `access_token` must be treated as opaque in client-side applications and thus must not be decoded there. This means that you cannot decode and read the payload of the `access_token` itself to find out which `scope`s were granted for the user.

The solution is to use the value of the `scope` param that comes back after authentication. This will be a string value containing **all** of the `scope`s that were granted for the user, separated by spaces. However, this param will _only_ be populated if the `scope`s that are granted for the user differ in any way from what was originally requested.

The resulting workflow for determining which `scope`s a user has is as such:

1. Check for a value on `authResult.scope`. If one exists, use that value because these are the `scope`s that were granted for the user.
2.  If there is no value for `authResult.scope`, it means that all of the `scope`s requested for the user were granted. In this scenario, the `scope`s that were requested when the authentication transaction was initiated can be used directly to make UI decisions.