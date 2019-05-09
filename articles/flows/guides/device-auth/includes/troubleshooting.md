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

The Device Authorization Flow does not work for:

* [Auth0 application types](/applications/concepts/app-types-auth0) other than **Native**
* Applications where the [**Token Endpoint Authentication Method**](/dashboard/reference/settings-application) is anything other than **None**
* [Non-OIDC-conformant](/dashboard/reference/settings-application#oauth) Applications
* Federated Applications
* Applications created through [Dynamic Client Registration](/api-auth/dynamic-client-registration)
* [Social Connections](/connections) using [Auth0 developer keys](/connections/social/devkeys)
* Custom query string parameters

We support the full [Draft 15](https://tools.ietf.org/html/draft-ietf-oauth-device-flow-15), except for confidential Clients.