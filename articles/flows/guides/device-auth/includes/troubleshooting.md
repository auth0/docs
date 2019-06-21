# Troubleshooting

[Tenant logs](/logs#log-data-event-listing) are created for any interaction that takes place and can be used to troubleshoot issues.

## Error codes

| Code       | Name | Description |
|------------|------|-------------|
| `fdeaz`    | Failed device authorization request | |	
| `fdeac`    | Failed device activation | |	
| `fdecc`    | User canceled the device confirmation | |
| `fede`     | Failed Exchange | Device Code for Access Token |
| `sede`     | Success Exchange | Device Code for Access Token |

## Limitations

To use the Device Authorization Flow, Applications must:

* Have an [Auth0 application type](/applications/concepts/app-types-auth0) of **Native**
* Have the [**Token Endpoint Authentication Method**](/dashboard/reference/settings-application) set to **None**
* Be [OIDC-conformant](/dashboard/reference/settings-application#oauth)
* Not be created through [Dynamic Client Registration](/api-auth/dynamic-client-registration)
* Not be federated

In addition, the Device Authorization Flow does not support:
* [Social Connections](/connections) using [Auth0 developer keys](/connections/social/devkeys) unless you are using Universal Login without custom domains
* Query string parameters to be accessed from hosted login page or rules

We support the full [Draft 15](https://tools.ietf.org/html/draft-ietf-oauth-device-flow-15), except for confidential Clients.
