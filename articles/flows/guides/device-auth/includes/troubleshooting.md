# Troubleshooting

[Tenant logs](/logs#log-data-event-listing) are created for any interaction that takes place and can be used to troubleshoot issues.

## Error codes

| Code       | Name | Description |
|------------|------|-------------|
| `limit_dc` | Too Many Invalid Device Codes	| |
| `fdeaz`    | Failed device authorization request | |	
| `fdeac`    | Failed device activation | |	
| `fede`     | Failed Exchange | Device Code for Access Token |
| `sede`     | Success Exchange | Device Code for Access Token |

## Limitations

The Device Authorization Flow does not work for:

* Non-OIDC-conformant Applications
* Federated Applications
* Application types where the authentication method is not set to **None**
* Applications created through Dynamic Client Registration.

We support the full [Draft 15](https://tools.ietf.org/html/draft-ietf-oauth-device-flow-15), except for confidential Clients.