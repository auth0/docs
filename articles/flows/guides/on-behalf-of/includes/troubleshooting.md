## Troubleshooting

[Tenant logs](/logs#log-data-event-listing) are created for any interaction that takes place and can be used to troubleshoot issues.

### Error codes

| Code       | Name | Description |
|------------|------|-------------|
| | | |

### Limitations

To use the On-Behalf-Of Flow, Target APIs must:

* Allow users to skip consent.

In addition, the Device Authorization Flow does not support:
* Redirect [rules](/rules)
* [Multi-factor Authentication](/multifactor-authentication)

ID Tokens returned for the Target API have a fixed expiration time limit of 36,000 seconds (10 hours).

We support the impersonation path of [OAuth 2.0 Token Exchange, Draft 19](https://tools.ietf.org/html/draft-ietf-oauth-token-exchange-19) (no `actor_` parameter or `act` claim).
