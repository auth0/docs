---
title: Log Event Filters
description: Lists the log filters for errors, warnings, and success events. 
topics:
  - logs
  - log-data
  - log-filter
contentType:
  - reference
useCase:
  - manage-logs
  - filter-log-events
---
# Log Event Filters

You can filter logs for errors, warnings, and success events in the [Dashboard](${manage_url}/#/logs) when you click the **Filter** down arrow. 

## Error event filters

| Filter | Description |
| -- | -- |
| Block Account | IP blocked for >10 failed attempts to login to single account |
| Blocked IP Address | IP blocked for >100 failed login attempts or >50 signup attempts |
| Breached password | Attempted login with a leaked password |
| Connector Offline | AD/LDAP Connector is offline |
| Device Confirmation Canceled by User | User did not confirm device |
| Error sending MFA Push Notification | Push notification for MFA failed |
| Error sending MFA SMS | SMS for MFA failed |
| Failed API Operation | Operation on API failed |
| Failed Change Email | Failed to change user email |
| Failed Change Password | Failed to change user password |
| Failed Change Password Request | Change password request failed |
| Failed Change Phone Number | Failed to change user phone number |
| Failed Change Username | Failed to change username |
| Failed Connector Provisioning | Failed to provision a AD/LDAP connector |
| Failed Delegation | Failed to generate delegation token |
| Failed Exchange | Token Exchange |
| Failed Exchange | Native Socal Login |
| Failed Exchange | Authorization Code for Access Token |
| Failed Exchange | Client Credentials for Access Token |
| Failed Exchange | Password for Access Token |
| Failed Exchange | Refresh Token for Access Token |
| Failed Exchange | Password and OOB Challenge for Access Token |
| Failed Exchange | Password and OTP Challenge for Access Token |
| Failed Exchange | Password and MFA Recovery code for Access Token |
| Failed Exchange | Device Code for Access Token |
| Failed Login | User failed to login |
| Failed Login (invalid email/username) | User failed to login due to invalid username |
| Failed Login (wrong password) | User failed to login due to invalid password |
| Failed Logout | User logout failed |
| Failed Post Change Password Hook | Post-change password hook failed |
| Failed Post User Registration Hook | Post user registration hook failed |
| Failed Sending Notification | Failed to send email notification |
| Failed Signup | Sign up failed |
| Failed Silent Auth | Silent authentication failed |
| Failed User Deletion | User deletion failed |
| Failed Verification Email | Failed to send verification email |
| Failed Verification Email Request | Failed to process verification email request |
| Failed CORS | Origin is not in the Allowed Origins list for the specified application |
| Failed by Connector | AD/LDAP Connector Failure |
| Failed cross origin authentication | Cross-origin authentication failed |
| Failed device activation | Failed to activate device |
| Failed device authorization request | Device authorization request failed |
| MFA Enrollment start failed | Multi-factor authentication enroll failed |
| OTP Auth failed | One-time password authentication failed |
| OTP Auth rejected | One-time password authentication rejected |
| Rate Limit on API | Maximum number of requests to the Authentication API in given time has been reached |
| Recovery failed | Multi-factor recovery code failed |
| Second factor email failed | Email for MFA failed |
| Too Many Calls to /delegation | Rate limt exceeded to /delegation endpoint |
| Too Many Calls to /userinfo | Rate limit exceded to /userinfo endpoint |
| Too Many Invalid Device Codes | Rate limit exceeded for invalid device codes |

## Warning event filters 

| Filter | Description |
| -- | -- |
| Deprecation Notice | Feature is deprecated |
| Too many failures | Multi-factor OTP has failed too many times |
| Too many failures | Mutli-factor recovery code has failed too many times |
| Users import | Failed to import users |
| Warning During Login | Warnings during login |

## Success event filters 

| Filter | Description |
| -- | -- |
| API Operation | API operation completed successfully |
| Account unblocked | User block setup by anomay detection has been released |
| Auth0 OS Update Ended | Auth0 OS update ended |
| Auth0 OS Update Started | Auth0 OS update started |
| Auth0 Update Ended | Auth0 update ended |
| Auth0 Update Launched | New version of Auth0 released |
| Auth0 Update Started | Auth0 update started |
| Code Sent | Passwordess login code has been sent |
| Code/Link Sent | Passwordless lgoin code/link has been sent |
| Configuration read | PSaaS configuration has been read |
| Configuration status checked | PSaaS configuration's status has been checked |
| Configuration updated | PSaaS configuration has been updated |
| Connector Online | AD/LDAP Connector is online and working |
| Enroll started | Multi-factor authentication enroll has started |
| MFA enrollment complete | Multi-factor authentication enroll has completed |
| MFA settings update | Mutli-factor tenant settings updated |
| Module switch | Multi-factor module switched |
| OTP Auth Succeed | One-time password authentication success |
| Push notification sent | Push notification for MFA successfully sent | 
| Recovery succeed | Multi-factor recovery code succeeded authorization |
| SMS Sent | SMS for MFA sent successfully sent |
| Second factor email sent | Email for MFA successfully sent |
| Second factor started | Second factor authentication event started for MFA |
| Success Change Email | Email changed successfully |
| Success Change Password | Password changed successfully |
| Success Change Password Request | Change password request succeeded |
| Success Change Phone Number | Phone number changed successfully |
| Success Change Username | Username changed successfully |
| Success Delegation | Delegation token generated successfully |
| Success Exchange | Authorization Code for Access Token |
| Success Exchange | Client Credentials for Access Token |
| Success Exchange | Password for Access Token |
| Success Exchange | Refresh Token for Access Token |
| Success Exchange | Token Exchange |
| Success Exchange | Native Social Login |
| Success Exchange | Password and OOB Challenge for Access Token |
| Success Exchange | Password and OTP Challenge for Access Token |
| Success Exchange | Password and MFA Recovery code for Access Token |
| Success Exchange | Device Code for Access Token |
| Success Login | Successful Login |
| Success Logout | User successfully logged out |
| Success Post Change Password Hook | Post-change password hook ran successfully |
| Success Signup | Successful signup |
| Success Silent Auth | Successful silent authentication |
| Success Verification Email | Successful verification email |
| Success Verification Email Request | Successful verification email request |
| Success cross origin authentication | Successful cross-origin authentication | 
| Successful User Deletion | User successfully deleted |
| Unenroll device account | Device used for second factor authentication has been unenrolled |
| Update device account | Device used for second factor authentication has been updated |
| User delete | Deleted multi-factor user account |
| Users import | Successfully imported users |

## Keep reading

* [Administrator and Developer Log Usage Examples](/logs/concepts/logs-admins-devs)
* [View Log Data in the Dashboard](/logs/guides/view-log-data-dashboard)
* [Retrieve Logs Using the Management API](/logs/guides/retrieve-logs-mgmt-api)
* [Log Event Type Codes](/logs/references/log-event-type-codes)
* [Log Search Query Syntax](/logs/references/query-syntax)
* [Integrate AWS EventBridge with Auth0](/integrations/aws-eventbridge)