---
description: Guardian Logging
---
## Tracking your Users' MFA Events 

In the [Logs](${manage_url}/#/logs) section of the dashboard, you can see the various events related to your users signing up and signing in using MFA.

![](/media/articles/mfa/logs.png)

Here are all the possible events related to MFA:

| Event Type  | Description |
| --- | --- |
| `gd_unenroll` | When a device account is deleted |
| `gd_update_device_account` | When a device account is updated |
| `gd_send_pn` | When a push notification is sent |
| `gd_send_sms` | When a SMS is sent |
| `gd_start_auth` | Start second factor authentication  |
| `gd_start_enroll` | Second factor auth enrollment is started |
| `gd_module_switch` | When changing feature config |
| `gd_tenant_update` | When tenant info has been updated |
| `gd_user_delete` | When calling (user delete => unenroll) |
| `gd_auth_failed` | When second factor login has failed |
| `gd_auth_succeed` | When second factor authentication has succeeded |
| `gd_recovery_succeed` | Recovery succeeded |
| `gd_recovery_failed` | Failed recovery |
| `gd_otp_rate_limit_exceed` | When One Time Password fails validation because rate limit is exceeded |
| `gd_recovery_rate_limit_exceed` | When recovery validation fails because rate limit is exceeded |

These events can also be searched using the [Management APIv2](/api/management/v2#!/Logs) using [query string syntax](/api/management/v2/query-string-syntax). You can search criteria using the `q` parameter or you can search by a specific log ID.

### Examples searching with the `q` parameter

To see the events for users who are enrolling with MFA:

`type: gd_start_enroll`

To see all the times an SMS is sent:

`type: gd_send_sms`
