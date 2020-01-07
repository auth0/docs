# Troubleshooting

[Tenant logs](/logs) are created for any interaction that takes place and can be used to troubleshoot issues.

## Error codes

| Code       | Name | Description |
|------------|------|-------------|
| `fdeaz`    | Failed device authorization request | |	
| `fdeac`    | Failed device activation | |	
| `fdecc`    | User canceled the device confirmation | |
| `fede`     | Failed Exchange | Device Code for Access Token |
| `sede`     | Success Exchange | Device Code for Access Token |

## Limitations

To use the Device Authorization Flow, devices must:

* Support Server Name Indication (SNI) when [Custom Domains](/custom-domains) are used
* Have an [Auth0 application type](/applications) of **Native**
* Have the [**Token Endpoint Authentication Method**](/dashboard/reference/settings-application) set to **None**
* Be [OIDC-conformant](/dashboard/reference/settings-application#oauth)
* Not be created through [Dynamic Client Registration](/api-auth/dynamic-client-registration)

In addition, the Device Authorization Flow does not allow:
* [Social Connections](/connections) using [Auth0 developer keys](/connections/social/devkeys) unless you are using new [New Universal Login Experience](/universal-login/new).
* Query string parameters to be accessed from hosted login page or rules

We support the full [Draft 15](https://tools.ietf.org/html/draft-ietf-oauth-device-flow-15), except for confidential Clients.
