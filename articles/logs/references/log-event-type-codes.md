---
title: Log Event Type Codes
description: Lists the event codes associated with log events. 
topics:
  - logs
  - log-data
contentType:
  - reference
useCase:
  - manage-logs
---
# Log Event Type Codes

The following table lists the codes associated with the each log event.

| **Event Code** | **Event** | **Event Description** | **Additional Info** |
| --- | --- | --- | --- |
| `admin_update_launch` | Auth0 Update Launched | |
| `api_limit` | Rate Limit on the Authentication API | The maximum number of requests to the Authentication API in given time has reached. | [Rate Limit Policy](/policies/rate-limits) |
| `cls` | Code/Link Sent | <dfn data-key="passwordless">Passwordless</dfn> login code/link has been sent | [Passwordless](/connections/passwordless) |
| `coff` | Connector Offline | AD/LDAP Connector is offline | [Active Directory/LDAP Connector](/connector) |
| `con` | Connector Online | AD/LDAP Connector is online and working | [Active Directory/LDAP Connector](/connector) |
| `cs` | Code Sent | Passwordless login code has been sent | [Passwordless](/connections/passwordless) |
| `depnote` | Deprecation Notice | | |
| `du` | Deleted User | User has been deleted. | [User Profile](/users/concepts/overview-user-profile) |
| `f` | Failed Login | | |
| `fapi` | Failed API Operation | | |
| `fc` | Failed by Connector | | [Active Directory/LDAP Connector](/connector) |
| `fce` | Failed Change Email | Failed to change user email | [User Profile](/users/concepts/overview-user-profile) |
| `fco` | Failed by CORS | Origin is not in the Allowed Origins list for the specified application | [Applications](/dashboard/reference/settings-application) |
| `fcoa` | Failed cross-origin authentication | | |
| `fcp` | Failed Change Password | | [Changing a User's Password](/connections/database/password-change) |
| `fcph` | Failed Post Change Password Hook | | |
| `fcpn` | Failed Change Phone Number | | [User Profile](/users/concepts/overview-user-profile) |
| `fcpr` | Failed Change Password Request | | [Changing a User's Password](/connections/database/password-change) |
| `fcpro` | Failed Connector Provisioning | Failed to provision a AD/LDAP connector | [Active Directory/LDAP Connector](/connector) |
| `fcu` | Failed Change Username | Failed to change username | [User Profile](/users/concepts/overview-user-profile) |
| `fd` | Failed Delegation | Failed to generate delegation token | [Delegation Tokens](/tokens/delegation) |	
| `fdeac`   | Failed Device Activation | Failed to activate device. | [Device Authorization Flow](/flows/concepts/device-auth) |
| `fdeaz`    | Failed Device Authorization Request | Device authorization request failed. | [Device Authorization Flow](/flows/concepts/device-auth) |
| `fdecc`    | User Canceled Device Confirmation | User did not confirm device. | [Device Authorization Flow](/flows/concepts/device-auth) |
| `fdu` | Failed User Deletion | | [User Profile](/users/concepts/overview-user-profile) |
| `feacft` | Failed Exchange | Failed to exchange authorization code for <dfn data-key="access-token">Access Token</dfn> | [Call API Using the Authorization Code Flow](/flows/guides/auth-code/call-api-auth-code)
| `feccft` | Failed Exchange | Failed exchange of Access Token for a Client Credentials Grant | [Asking for Access Tokens for a Client Credentials Grant](/api-auth/config/asking-for-access-tokens) |
| `fede`    | Failed Exchange | Failed to exchange Device Code for Access Token | [Device Authorization Flow](/flows/concepts/device-auth) |
| `fens` | Failed Exchange | Failed exchange for Native Social Login | |
| `feoobft` | Failed Exchange | Failed exchange of Password and OOB Challenge for Access Token | |
| `feotpft` | Failed Exchange | Failed exchange of Password and OTP Challenge for Access Token | |
| `fepft` | Failed Exchange | Failed exchange of Password for Access Token | |
| `fercft` | Failed Exchange | Failed Exchange of Password and MFA Recovery code for Access Token | |
| `fertft` | Failed Exchange | Failed Exchange of <dfn data-key="refresh-token">Refresh Token</dfn> for Access Token | |
| `flo` | Failed Logout | User logout failed | [Logout](/logout) |
| `fn` | Failed Sending Notification | Failed to send email notification | [Emails](/email) |
| `fp` | Failed Login (Incorrect Password) | | |
| `fs` | Failed Signup | | |
| `fsa` | Failed Silent Auth | | |
| `fu` | Failed Login (Invalid Email/Username) | | |
| `fui` | Failed users import | Failed to import users | [User Import/Export](/extensions/user-import-export) |
| `fv` | Failed Verification Email | Failed to send verification email | [Verification Email](/email/custom#verification-email) |
| `fvr` | Failed Verification Email Request | Failed to process verification email request | [Verification Email](/email/custom#verification-email) |
| `gd_auth_failed` | OTP Auth failed | One-time password authentication failed. | [Multi-factor Authentication](/multifactor-authentication) |
| `gd_auth_rejected` | OTP Auth rejected | One-time password authentication rejected. | [Multi-factor Authentication](/multifactor-authentication) |
| `gd_auth_succeed` | OTP Auth success | One-time password authentication success. | [Multi-factor Authentication](/multifactor-authentication) |
| `gd_enrollment_complete` | Guardian enrollment complete | | |
| `gd_module_switch` | Module switch | | |
| `gd_otp_rate_limit_exceed` | Too many failures | | |
| `gd_recovery_failed` | Recovery failed | Multi-factor recovery code failed. | [Multi-factor Authentication](/multifactor-authentication) |
| `gd_recovery_rate_limit_exceed` | Too many failures | Multi-factor recovery code has failed too many times. | [Multi-factor Authentication](/multifactor-authentication) |
| `gd_recovery_succeed` | Recovery success | Multi-factor recovery code succeeded authorization. | [Multi-factor Authentication](/multifactor-authentication) |
| `gd_send_pn` | Push notification sent | Push notification for MFA sent successfully sent. | [MFA with Push Notifications](/multifactor-authentication/factors/push) |
| `gd_send_sms` | SMS sent | SMS for MFA sent successfully. | [Using SMS for MFA](/multifactor-authentication/factors/sms) |
| `gd_send_sms_failure` | SMS sent failures | SMS for MFA sent failed. | [Using SMS for MFA](/multifactor-authentication/factors/sms) |
| `gd_start_auth` | Second factor started | Second factor authentication event started for MFA. | [Multi-factor Authentication](/multifactor-authentication) |
| `gd_start_enroll` | Enroll started | Multi-factor authentication enroll has started. | [Multi-factor Authentication](/multifactor-authentication) |
| `gd_tenant_update` | Guardian tenant update | | [Hosted MFA Page](/universal-login/multifactor-authentication) |
| `gd_unenroll` | Unenroll device account | Device used for second factor authentication has been unenrolled. | [Multi-factor Authentication](/multifactor-authentication) |
| `gd_update_device_account` | Update device account | Device used for second factor authentication has been updated. | [Multi-factor Authentication](/multifactor-authentication) |
| `gd_user_delete` | User delete | Deleted multi-factor user account. | [User Profile](/users/concepts/overview-user-profile) |
| `limit_delegation` | Too Many Calls to /delegation | Rate limit exceeded to `/delegation` endpoint | [API Rate Limit Policy](/policies/rate-limits) |
| `limit_mu` | Blocked IP Address | An IP address is blocked with 100 failed login attempts using different usernames, all with incorrect passwords in 24 hours, or 50 sign-up attempts per minute from the same IP address. | [Anomaly Detection](/anomaly-detection) |
| `limit_wc` | Blocked Account | An IP address is blocked with 10 failed login attempts into a single account from the same IP address. | [Anomaly Detection](/anomaly-detection) |
| `pwd_leak` | Breached password | Someone behind the IP address: `ip` attempted to login with a leaked password. | [Anomaly Detection](/anomaly-detection) |
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
| `sdu` | Success User Deletion | User successfully deleted | [User Profile](/users/concepts/overview-user-profile) |
| `seacft` | Success Exchange | Successful exchange of authorization code for Access Token | [Call API Using the Authorization Code Flow](/flows/guides/auth-code/call-api-auth-code) |
| `seccft` | Success Exchange | Successful exchange of Access Token for a Client Credentials Grant | [Asking for Access Tokens for a Client Credentials Grant](/api-auth/config/asking-for-access-tokens) |
| `sede`     | Success Exchange | Successful exchange of device code for Access Token | [Device Authorization Flow](/flows/concepts/device-auth) |
| `sens` | Success Exchange | Native Social Login | |
| `seoobft` | Success Exchange | Successful exchange of Password and OOB Challenge for Access Token | |
| `seotpft` | Success Exchange | Successful exchange of Password and OTP Challenge for Access Token | |
| `sepft` | Success Exchange | Successful exchange of Password for Access Token | |
| `sercft` | Success Exchange | Successful exchange of Password and MFA Recovery code for Access Token | |
| `sertft` | Success Exchange | Successful exchange of Refresh Token for Access Token | |
| `slo` | Success Logout | User successfully logged out | [Logout](/logout) |
| `ss` | Success Signup | | |
| `ssa` | Success Silent Auth | | |
| `sui` | Success users import | Successfully imported users | [User Import/Export](/extensions/user-import-export) |
| `sv` | Success Verification Email | | |
| `svr` | Success Verification Email Request | | |
| `sys_os_update_end` | Auth0 OS Update Ended | | |
| `sys_os_update_start` | Auth0 OS Update Started | | |
| `sys_update_end` | Auth0 Update Ended | | |
| `sys_update_start` | Auth0 Update Started | | |
| `ublkdu` | User login block released | User block setup by anomaly detection has been released | |
| `w` | Warnings During Login | | |

## Keep reading

* [Administrator and Developer Log Usage Examples](/logs/concepts/logs-admins-devs)
* [View Log Data in the Dashboard](/logs/guides/view-log-data-dashboard)
* [Retrieve Logs Using the Management API](/logs/guides/retrieve-logs-mgmt-api)
* [Anomaly Detection](/anomaly-detection)
* [Log Search Query Syntax](/logs/references/query-syntax)
* [Log Event Filters](/logs/references/log-event-filters)
* [Integrate AWS EventBridge with Auth0](/integrations/aws-eventbridge)
