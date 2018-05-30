---
description: How to view log data, lists log event types.
url: /logs
crews: crew-2
tags:
  - logs
---

# Logs

Using the [Dashboard](${manage_url}), you can pull log data on actions performed by administrators using the Dashboard, and authentications made by your users.

## How to View Log Data

The **Logs** page of the [Dashboard](${manage_url}) displays all events that occur, including user authentication and administrative actions such as adding/updating Applications, Connections, and Rules.

![](/media/articles/logs/dashboard-logs.png)

Please note that administrative actions will show up in the logs as `API Operation` events.

## Frequently Asked Questions

### How long is log file data available?

The length of time log data is stored varies depending on your plan.

Plan | Log Retention
-----|--------------
Free | 2 days
Developer | 2 days
Developer Pro | 10 days
Enterprise | 30 days

### How do I view or export log file data?

If you would like to store log data longer than the time period offered by your subscription plan, we recommend you use the [Management API feature that allows you to retrieve the relevant data](api/management/v2#!/Logs/get_logs). Once you've retrieved your data, you can:

* Store the data yourself
* Send the data to an external service such as Splunk (consider using the [Auth0 Logs to Splunk Extension](/extensions/splunk))

#### Retrieving logs from the Management API

You can use the Management API v2 retrieve your logs. There are the two available endpoints, each providing slightly different quantities of information:

* [/api/v2/logs](/api/v2#!/Logs/get_logs): Retrieves log entries that match the provided search criteria. If you do not provide any search criteria, you will get a list of all available entries;
* [/api/v2/logs/{id}](/api/v2#!/Logs/get_logs_by_id): Retrieves the single log entry associated with the provided ID.

## Log data event listing

The following table lists the codes associated with the appropriate log events.

| **Event Code** | **Event** | **Event Description** | **Additional Info** |
| --- | --- | --- | --- |
| `admin_update_launch` | Auth0 Update Launched | |
| `api_limit` | Rate Limit On API | The maximum number of requests to the API in given time has reached. | [Rate Limit Policy](/policies/rate-limits) |
| `cls` | Code/Link Sent | Passwordless login code/link has been sent | [Passwordless](/passwordless) |
| `coff` | Connector Offline | AD/LDAP Connector is offline | [Active Directory/LDAP Connector](/connector) |
| `con` | Connector Online | AD/LDAP Connector is online and working | [Active Directory/LDAP Connector](/connector) |
| `cs` | Code Sent | Passwordless login code has been sent | [Passwordless](/passwordless) |
| `du` | Deleted User | User has been deleted. | [User Profile](/user-profile) |
| `f` | Failed Login | | |
| `fapi` | Failed API Operation | | |
| `fc` | Failed by Connector | | [Active Directory/LDAP Connector](/connector) |
| `fce` | Failed Change Email | Failed to change user email | [User Profile](/user-profile) |
| `fco` | Failed by CORS | Origin is not in the Allowed Origins list for the specified application | [Applications](/applications#application-settings) |
| `fcoa` | Failed cross-origin authentication | | |
| `fcp` | Failed Change Password | | [Changing a User's Password](/connections/database/password-change) |
| `fcph` | Failed Post Change Password Hook | | |
| `fcpn` | Failed Change Phone Number | | [User Profile](/user-profile) |
| `fcpr` | Failed Change Password Request | | [Changing a User's Password](/connections/database/password-change) |
| `fcpro` | Failed Connector Provisioning | Failed to provision a AD/LDAP connector | [Active Directory/LDAP Connector](/connector) |
| `fcu` | Failed Change Username | Failed to change username | [User Profile](/user-profile) |
| `fd` | Failed Delegation | Failed to generate delegation token | [Delegation Tokens](/tokens/delegation) |
| `fdu` | Failed User Deletion | | [User Profile](/user-profile) |
| `feacft` | Failed Exchange | Failed to exchange authorization code for Access Token | [Authorization Code Grant Flow](/api-auth/tutorials/authorization-code-grant) 
| `feccft` | Failed Exchange | Failed exchange of Access Token for a Client Credentials Grant | [Asking for Access Tokens for a Client Credentials Grant](/api-auth/config/asking-for-access-tokens) |
| `feoobft` | Failed Exchange | Failed exchange of Password and OOB Challenge for Access Token | |
| `feotpft` | Failed Exchange | Failed exchange of Password and OTP Challenge for Access Token | |
| `fepft` | Failed Exchange | Failed exchange of Password for Access Token | |
| `fercft` | Failed Exchange | Failed Exchange of Password and MFA Recovery code for Access Token | |
| `fertft` | Failed Exchange | Failed Exchange of Refresh Token for Access Token | |
| `flo` | Failed Logout | User logout failed | [Logout](/logout) |
| `fn` | Failed Sending Notification | Failed to send email notification | [Emails](/email) |
| `fp` | Failed Login (Incorrect Password) | | |
| `fs` | Failed Signup | | |
| `fsa` | Failed Silent Auth | | |
| `fu` | Failed Login (Invalid Email/Username) | | |
| `fui` | Failed users import | Failed to import users | [User Import/Export](/extensions/user-import-export) |
| `fv` | Failed Verification Email | Failed to send verification email | [Verification Email](/email/custom#verification-email) |
| `fvr` | Failed Verification Email Request | Failed to process verification email request | [Verification Email](/email/custom#verification-email) |
| `gd_auth_failed` | OTP Auth failed | One-time password authentication failed. | [Multifactor Authentication](/multifactor-authentication) |
| `gd_auth_rejected` | OTP Auth rejected | One-time password authentication rejected. | [Multifactor Authentication](/multifactor-authentication) |
| `gd_auth_succeed` | OTP Auth success | One-time password authentication success. | [Multifactor Authentication](/multifactor-authentication) |
| `gd_enrollment_complete` | Guardian enrollment complete | | |
| `gd_module_switch` | Module switch | | |
| `gd_otp_rate_limit_exceed` | Too many failures | | |
| `gd_recovery_failed` | Recovery failed | Multifactor recovery code failed. | [Multifactor Authentication](/multifactor-authentication) |
| `gd_recovery_rate_limit_exceed` | Too many failures | Multifactor recovery code has failed too many times. | [Multifactor Authentication](/multifactor-authentication) |
| `gd_recovery_succeed` | Recovery success | Multifactor recovery code succeeded authorization. | [Multifactor Authentication](/multifactor-authentication) |
| `gd_send_pn` | Push notification sent | Push notification for MFA sent successfully sent with Guardian. | [Auth0 Guardian](/multifactor-authentication/guardian) |
| `gd_send_sms` | SMS Sent | SMS for MFA sent successfully sent. | [Using SMS for MFA](/multifactor-authentication/guardian/admin-guide#support-for-sms) |
| `gd_start_auth` | Second factor started | Second factor authentication event started for MFA. | [Multifactor Authentication](/multifactor-authentication) |
| `gd_start_enroll` | Enroll started | Multifactor authentication enroll has started. | [Multifactor Authentication](/multifactor-authentication) |
| `gd_tenant_update` | Guardian tenant update | | [Auth0 Guardian](/multifactor-authentication/guardian) |
| `gd_unenroll` | Unenroll device account | Device used for second factor authentication has been unenrolled. | [Multifactor Authentication](/multifactor-authentication) |
| `gd_update_device_account` | Update device account | Device used for second factor authentication has been updated. | [Multifactor Authentication](/multifactor-authentication) |
| `gd_user_delete` | User delete | Deleted multifactor user account. | [User Profile](/user-profile) |
| `limit_delegation` | Too Many Calls to /delegation | Rate limit exceeded to `/delegation` endpoint | [API Rate Limit Policy](/policies/rate-limits) |
| `limit_mu` | Blocked IP Address | An IP address is blocked with 100 failed login attempts using different usernames, all with incorrect passwords in 24 hours, or 50 sign-up attempts per minute from the same IP address. | [Anomaly Detection](/anomaly-detection) |
| `limit_ui` | Too Many Calls to /userinfo | Rate limit exceeded to `/limit_ui` endpoint | [API Rate Limit Policy](/policies/rate-limits) |
| `limit_wc` | Blocked Account | An IP address is blocked with 10 failed login attempts into a single account from the same IP address. | [Anomaly Detection](/anomaly-detection) |
| `pwd_leak` | Breached password | | |
| `s` | Success Login | Successful login event. | |
| `sapi` | Success API Operation | | |
| `sce` | Success Change Email | | [Emails in Auth0](/email) |
| `scoa` | Success cross-origin authentication | | |
| `scp` | Success Change Password | | |
| `scph` | Success Post Change Password Hook | | |
| `scpn` | Success Change Phone Number | | |
| `scpr` | Success Change Password Request | | |
| `scu` | Success Change Username | | |
| `sd` | Success Delegation | | [Delegation Tokens](/tokens/delegation) |
| `sdu` | Success User Deletion | User successfully deleted | [User Profile](/user-profile) |
| `seacft` | Success Exchange | Successful exchange of authorization code for Access Token | [Authorization Code Grant Flow](/api-auth/tutorials/authorization-code-grant) |
| `seccft` | Success Exchange | Successful exchange of Access Token for a Client Credentials Grant | [Asking for Access Tokens for a Client Credentials Grant](/api-auth/config/asking-for-access-tokens) |
| `seoobft` | Success Exchange | Successful exchange of Password and OOB Challenge for Access Token | |
| `seotpft` | Success Exchange | Successful exchange of Password and OTP Challenge for Access Token | |
| `sepft` | Success Exchange | Successful exchange of Password for Access Token | |
| `sercft` | Success Exchange | Successful exchange of Password and MFA Recovery code for Access Token | |
| `sertft` | Success Exchange | Successful exchange of Refresh Token for Access Token | |
| `slo` | Success Logout | User successfully logged out | [Logout](/logout) |
| `ss` | Success Signup | | |
| `ssa` | Success Silent Auth | | |
| `sui` | Success users import | Successfuly imported users | [User Import/Export](/extensions/user-import-export) |
| `sv` | Success Verification Email | | |
| `svr` | Success Verification Email Request | | |
| `sys_os_update_end` | Auth0 OS Update Ended | | |
| `sys_os_update_start` | Auth0 OS Update Started | | |
| `sys_update_end` | Auth0 Update Ended | | |
| `sys_update_start` | Auth0 Update Started | | |
| `ublkdu` | User login block released | User block setup by anomaly detection has been released | |
| `w` | Warnings During Login | | |

### Tools to process logs

* [Auth0 Logs Processor](https://www.npmjs.com/package/auth0-logs-processor)
* [GitHub Repo for the Auth0 Logs Processor](https://github.com/auth0/logs-processor)
