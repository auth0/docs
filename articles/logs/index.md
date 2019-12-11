---
description: How to view log data, lists log event types.
url: /logs
crews: crew-2
topics:
  - logs
contentType:
  - concept
  - how-to
  - reference
useCase:
  - analyze-logs
  - integrate-analytics
---
# Logs

Using the [Dashboard](${manage_url}/#/logs) or the [Management API logs endpoint](/api/v2#!/Logs/get_logs), you can pull log data on actions performed by administrators using the Dashboard, operations performed via the Management API, and authentications made by your users.

::: warning
Auth0 does not provide real-time logs for your tenant. While we do our best to index events as they arrive, you may see some delays.
:::

## View log data

The **Logs** page of the [Dashboard](${manage_url}/#/logs) displays all events that occur, including user authentication and administrative actions such as adding/updating Applications, Connections, and Rules.

![](/media/articles/logs/dashboard-logs.png)

Please note that administrative actions will show up in the logs as `API Operation` events.

### Log data for administrators

If you are operating your service as an administrator, there are many helpful metrics and bits of information you can gather from the Logs. If a customer has raised a support ticket that they are unable to sign in to your service or application, you can verify in the logs that they have indeed tried, and are attempting in the manner they say they are. They may think it's a password issue, but you may discover they never completed setting up their <dfn data-key="multifactor-authentication">multi-factor authentication (MFA)</dfn>. Additionally, Logs can help expose some business metrics you may not have had available before. These could include:

- Finding prime times of usage for different regions
- Identifying a target audience
- Detecting patterns in user behavior that can be optimized
- Identifying problematic actors by IP address
- Calculating frequency and type of Anomaly Detection triggers

 The deeper the analysis, the more you can learn about your customers and your business.

::: note
Auth0 recommends that you [create reports using tenant traffic data to see anomaly detection events](/anomaly-detection/guides/use-tenant-data-for-anomaly-detection).
:::

### Log data for developers

When debugging an issue, or setting up an integrations, logs are as good as gold. You can utilize the logs as a history of events to see where a flow may be broken, or where customers are getting confused. You can also detect nefarious behavior, or verify that Auth0 anomaly detection is being triggered during questionable behavior. We support searching the logs for specific events using our Dashboard or Management API directly, but also support exporting logs to your existing log processing systems, like Splunk or Sumo Logic, for deeper analysis over time.

## Data retention and export

The length of time log data is stored varies depending on your plan.

Plan | Log Retention
-----|--------------
Free | 2 days
Developer | 2 days
Developer Pro | 10 days
Enterprise | 30 days

To store log data longer than the time period offered by your subscription plan, we recommend you use the [Management API feature that allows you to retrieve the relevant data](api/management/v2#!/Logs/get_logs). Once you've retrieved your data, you can:

* Store the data yourself.
* Send the data to an external service. You can install and configure an Auth0 Extension in order to export logs automatically to another provider, like Sumo Logic or Loggly. For a list of available providers and detailed steps to configure each, see [Export Auth0 logs to an external service](/extensions#export-auth0-logs-to-an-external-service).

## Retrieving logs from the Management API

You can use the Management API v2 to retrieve your logs using the [/api/v2/logs](/api/v2#!/Logs/get_logs) endpoint, which suports two types of consumption: [by checkpoint](/logs#get-logs-by-checkpoint) or [by search criteria](#get-logs-by-search-criteria).

::: note
We highly recommend using [the checkpoint approach](/logs#get-logs-by-checkpoint) to export logs to the external system of your choice and perform any search or analysis there, as logs stored in our system are subject to the retention period. You can use any of the [Export Auth0 logs to an external service](/extensions#export-auth0-logs-to-an-external-service) extensions to export the logs to the system of your choice (like Sumo Logic, Splunk or Loggly).
:::

If you would like to perform a search for specific events you can also use the [search criteria approach](/logs#get-logs-by-search-criteria), which is also the one used by the Management Dashboard.

**Limitation**: When you query for logs with the [list or search logs](/api/v2#!/Logs/get_logs) endpoint, you can retrieve a maximium of 100 logs per request.

### Get logs by checkpoint

This method allows to retrieve logs from a particular log_id. For searching by checkpoint use the following parameters:

- `from`: Log Event Id to start retrieving logs. You can limit the amount of logs using the take parameter.
- `take`: The total amount of entries to retrieve when using the from parameter.

Important: When fetching logs by checkpoint, the `q` or any other parameter other than `from` and `take` will be ignored. Also the order by date is not guaranteed.

### Get logs by search criteria

Retrieves log entries that match the specified search criteria (or list all entries if no criteria is used).

For searching by criteria use the following parameters:
- `q`: Search Criteria using Query String Syntax. Checkout the [Query Syntax docs](/logs/query-syntax) for information of how to build the queries.
- `page`: The page number. Zero based
- `per_page`: The amount of entries per page
- `sort`: The field to use for sorting. Use field:order, where order is 1 for ascending and -1 for descending. For example date:-1
- `fields`: A comma separated list of fields to include or exclude (depending on include_fields) from the result, empty to retrieve all fields
- `include_fields`: true if the fields specified are to be included in the result, false otherwise. Defaults to true
- `include_totals`: true if a query summary must be included in the result, false otherwise. Default false. *This field is **deprecated**, please refer to the [Search Engine Migration](/logs/query-syntax#search-engine-migration)for more info.*

For the list of fields that can be used in the search query and the `fields` and `sort` params, checkout the list of [searcheable fields](logs/query-syntax#searchable-fields).

#### Limitations

Besides the limitation of 100 logs per request to retrieve logs, you may only paginate through up to 1,000 search results.

If you get the error `414 Request-URI Too Large` this means that your query string is larger than the supported length. In this case, refine your search.

::: panel Private Cloud Users
For Private Cloud users searching tenant logs, note that only the following fields are searchable at this time: 

* `user`
* `connection`
* `application`
* `type`
* `ip`

Use double quotes for exact searches (e.g., `application:"test"` will search for all log entries specific to the application named `test`, but `application:test` will search log entries for applications with test in their name.
:::

## Other log endpoints

As an alternative or complement to retrieving logs by checkpoint or search criteria using the [/api/v2/logs](/api/v2#!/Logs/get_logs) endpoint, you can also use the following endpoints to look for logs:

* [/api/v2/logs/{id}](/api/v2#!/Logs/get_logs_by_id): Retrieves the single log entry associated with the provided log id.
* [/api/v2/users/{user_id}/logs](/api/v2#!/Users/get_logs_by_user): Retrieves log events for a specific user id.

## Log data event listing

The following table lists the codes associated with the appropriate log events.

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
| `gd_send_sms` | SMS Sent | SMS for MFA sent successfully sent. | [Using SMS for MFA](/multifactor-authentication/factors/sms) |
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
