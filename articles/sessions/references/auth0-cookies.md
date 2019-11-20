---
description: Understand how Auth0 uses cookies. 
topics:
  - cookies
contentType:
  - reference
useCase:
  - third-party-content
---
## Cookies Set by Auth0

| Cookie Name | Description |
| -- | -- |
| `_csrf` | -- |
| `ajs_anonymous_id` | -- |
| `ajs_user_id` | -- |
| `auth0` |	Tracks user's session |
| `auth0_compat` | Copy of auth0 cookie. See Changes in auth0-server cookies |
| `auth01` | -- |
| `auth0DocsSession` | -- |
| `auth0-mf` | Tracks user's multi-factor authentication session. Stores user IDs if they choose to be remembered when performing MFA. |
| `auth0-mf_compat` | Copy of auth0-mf cookie. See Changes in auth0-server cookies |
| `com.auth0.auth...` | -- |
| `current_tenant` | -- |	
| `did` | Tracks user's device, used for anomaly detection |
| `did_compat` | Copy of did cookie. See Changes in auth0-server cookies |
| `a0_users:sess` |	Required for CSRF protection in the Reset Password page |
| `a0_users:sess.sig` |	Required for CSRF protection in the Reset Password page |
| `math0` | -- |	

## Keep reading

* [Web Apps vs Web APIs/Cookies vs Tokens](/design/web-apps-vs-web-apis-cookies-vs-tokens)
* [Cross-Origin Authentication](/cross-origin-authentication)
* [Manage Users](/users)
* [Session Layers](/sessions/concepts/session-layers)
* [Session Use Cases](/sessions/references/sample-use-cases-sessions)
* [Security](/security)