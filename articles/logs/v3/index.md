---
toc: true
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

Using the [Dashboard](${manage_url}), you can pull log data on actions performed by administrators using the Dashboard, and authentications made by your users.

::: warning
Auth0 does not provide real-time logs for your tenant. While we do our best to index events as they arrive, you may see some delays.
:::

## What Can I Use Logs For?

### As an Administrator
If you are operating your service as an administrator, there are many helpful metrics and bits of information you can gather from the Logs. If a customer has raised a support ticket that they are unable to sign in to your service or application, you can verify in the logs that they have indeed tried, and are attempting in the manner they say they are. They may think it's a password issue, but you may discover they never completed setting up their Multi-Factor Authentication. Additionally, Logs can help expose some business metrics you may not have had available before. These could include:

- Finding prime times of usage for different regions
- Identifying a target audience
- Detecting patterns in user behavior that can be optimized
- Identifying problematic actors by IP address
- Calculating frequency and type of Anomaly Detection triggers

The deeper the analysis, the more you can learn about your customers and your business.

### As a Developer
When debugging an issue, or setting up an integrations, logs are as good as gold. You can utilize the logs as a history of events to see where a flow may be broken, or where customers are getting confused. You can also detect nefarious behavior, or verify that Auth0 anomaly detection is being triggered during questionable behavior. We support searching the logs for specific events using our Dashboard or Management API directly, but also support exporting logs to your existing log processing systems, like Splunk or Sumo Logic, for deeper analysis over time.

## Before You Start

* Review the [Log Search Query Syntax](/logs/v3/search/query-syntax).
* If you are using [log search engine v2](/api/management/v2/get_logs), check out the [section on migrating from v2 to v3](#migrate-from-search-engine-v2-to-v3) below.

## Limitations

When you query for logs with the [list or search logs]() endpoint, you can retrieve a maximium of 100 logs. Additionally, you may only paginate through up to 1,000 search results. If would like to receive more logs, please retrieve your logs [by checkpoint] retrieval.

If you get the error `414 Request-URI Too Large` this means that your query string is larger than the supported length. In this case, refine your search.

## How to View Log Data

The **Logs** page of the [Dashboard](${manage_url}) displays all events that occur, including user authentication and administrative actions such as adding/updating Applications, Connections, and Rules.

![](/media/articles/logs/dashboard-logs.png)

Please note that administrative actions will show up in the logs as `API Operation` events.

## How to Search for Logs

For example, to search for logs with connections that match `Username-Password-Authentication`, use `q=connection:"Username-Password-Authentication"`:

```har
{
    "method": "GET",
    "url": "https://${account.namespace}/api/v2/logs",
    "httpVersion": "HTTP/1.1",
    "headers": [{
        "name": "Authorization",
        "value": "Bearer YOUR_MGMT_API_ACCESS_TOKEN"
    }],
    "queryString":  [
        {
          "name": "q",
          "value": "connection:\"Username-Password-Authentication\""
        },
        {
          "name": "sort",
          "value": "application:1"
        },
        {
          "name": "search_engine",
          "value": "v3"
        }
    ]
}
```

### Searchable Fields

The following list of fields are searchable and case sensitive

- `connection`
- `connection_id`
- `client_id`
- `client_name`
- `user_agent`
- `hostname`
- `user_id`
- `user_name`
- `strategy`
- `strategy_type`
- `description`
- `log_id`
- `date`

### Fields Searchable Against Bare Terms

If a search term is entered without a field name, it will only be searched against the following fields:

- `user_name`
- `connection`
- `client_name`
- `type`
- `ip`
- `log_id`
- `description`

### Example Queries

Below are some examples to show the kinds of queries you can make with the Management API.

Use Case | Query
---------|------
Search all logs with connections that contains "Pass" | `connection:*pass*`
Search all logs for users with a user name that contains "fred" | `user_name:*fred*`
Search all logs with user id's matching exactly "123" | `user_id:"123"`
Search for all logs with a type starting with "s" | `type:s*`
Search for user names that start with "jane" and end with "smith" | `user_name:jane*smith`
Search for all logs in December 2018 | `date:[2018-12 TO 2018-01-01}`
Search for all logs from December 10, 2018 forward | `date:[2018-12-10 TO *]`

----------------

## Migrate from Search Engine v2 to v3

The logs search engine v2 has been deprecated as of **January 22nd 2018** and will be removed from service on **June 13th 2018**. We recommend migrating logs search functionality to search engine v3 (`search_engine=v3`) as soon as possible. Before you start migrating, there are a few things you should know:

* You must update all your calls to the `GET /api/v2/logs`, `GET /api/v2/logs/{id}`, and `GET /api/v2/users/{id}/logs` endpoints to include the `search_engine=v3` parameter. This will ensure you are running the latest version of the search engine and that you will not experience downtime when search v2 is fully removed.
* If you are performing log search operations through any of the [impacted SDKs](#impacted-sdks), you must also pass the `search_engine=v3` parameter.
* Search values for log fields are case sensitive.
* v3 limits the number of logs you can retrieve per request to 100, and may be paged through up to 10 times, yielding a max of 1,000 logs for a search(see [page results](#page-results)). If you are reaching this limit, we recommend that you redefine your search query to obtain more granular results, or you export your logs to an external service using one of our extensions or a custom exporting script.
* We have a maintained list of [searchable fields](#searchable-fields).
* Log fields are not tokenized like in v2, so `user_id:auth0` will not match a `user_id` with value `auth0|12345`, instead, use `user_id:auth0*`. See [wildcards](/logs/v3/query-syntax#wildcards) and [exact matching](/logs/v3/query-syntax#exact-match).
* Wildcards can be used for prefix matching, for example `application:j*`. For other uses of wildcards (e.g. suffix matching), literals must have 3 characters or more. For example, `name:*usa` is allowed, but `name:*sa` is not.
* The `.raw` field extension is no longer supported and must be removed. In v3, fields match the whole value that is provided and are not tokenized as they were in v2 without the `.raw` suffix.
* Logs returned from searches against `v2` are not guaranteed to have the same `log_id` as their counterparts in `v3`. This is important to note when comparing result sets as you upgrade from `v2` to `v3`. The logs themselves are not changed despite having different identifiers.

### Queries to Migrate

Use case | v2 | v3
---------|----|---
Search by date | `updated_at:>=2018-01-15` | `updated_at:[2018-01-15 TO *]`
Search by date | `updated_at:>2018-01-15` | `updated_at:[2018-01-16 TO *]`
Search by date | `updated_at:<=2018-01-15` | `updated_at:[* TO 2018-01-16}`
Search by date | `updated_at:<2018-01-15` | `updated_at:[* TO 2018-01-15}`
Search by date | `last_login:<=2017-12` | `last_login:[* TO 2018-01-01}`
String exact match | `user_name.raw:"janedoe"` | `name:"janedoe"`
Phrase contains a word | `description:"works"`, `description:works` | `description:*works*`
Phrase contains a word (with less than 3 characters) | `user_name:*ri`,`user_name:*a`, `user_name:*ab*` | _(not supported)_

### Impacted SDKs

The following SDKs make use of the Log Search engine. If you are using them, make sure you are using the versions listed below (or a later version), and pass the `search_engine=v3` parameter when performing user search operations.

NOTE: Machuga fill out
SDK | Version with Support for v3 | Impacted Methods | Considerations
----|-----------------------------|------------------|---------------
[Auth0 Java](https://github.com/auth0/auth0-java) | 1.8.0 | com.auth0.client.mgmt.UsersEntity.list | Provide a `UserFilter` with `withSearchEngine("v3")`
[Auth0 Python](https://github.com/auth0/auth0-python) | 3.0.0 | management.Users.list | Provide the parameter `search_engine='v3'`
[Auth0 Node](https://github.com/auth0/node-auth0) | 2.0.0 | UsersManager.getAll, ManagementClient.getUsers | Provide the parameter `search_engine:'v3'`
[Auth0 .NET](https://github.com/auth0/auth0.net) | 3.0.0 or 4.0.0 | Auth0.ManagementApi.IUsersClient.GetAllAsync | Provide a `GetUsersRequest` object with `SearchEngine` = `"v3"`
[Auth0 PHP](https://github.com/auth0/auth0-php) | 5.2.0 | Auth0.SDK.API.Management.Users.getAll | Provide the parameter `'search_engine' => 'v3'`
[Auth0 Ruby](https://github.com/auth0/ruby-auth0) | 4.5.0 | Auth0.Api.V2.Users.users | Provide the parameter `search_engine: 'v3'`

### Impacted Extensions

Our log export extensions do not utilize search functionality, but rather export via our checkpoint functionality. They are not impacted by this change.

## Keep Reading

* [Query Syntax](/users/search/v3/query-syntax)
* [Search Best Practices](/best-practices/search-best-practices)
------------------------------------------------------

## Frequently Asked Questions

### How Long is Log Data Available?

The length of time log data is stored varies depending on your plan.

Plan | Log Retention
-----|--------------
Free | 2 days
Developer | 2 days
Developer Pro | 10 days
Enterprise | 30 days

### How Do I View or Export Log Data?

If you would like to store log data longer than the time period offered by your subscription plan, search through more than 1,000 logs, or would like to inspect your logs with your own tooling, we recommend you use the [Management API feature that allows you to retrieve the relevant data](api/management/v2#!/Logs/get_logs). Once you've retrieved your data, you can:

* Store the data yourself
* Send the data to an external service such as Splunk (consider using the [Auth0 Logs to Splunk Extension](/extensions/splunk))

#### Retrieving Logs from the Management API

You can use the Management API v2 retrieve your logs. There are the two available endpoints, each providing slightly different quantities of information:

* [/api/v2/logs](/api/v2#!/Logs/get_logs): Retrieves log entries that match the provided search criteria. If you do not provide any search criteria, you will get a list of all available entries;
* [/api/v2/logs/{id}](/api/v2#!/Logs/get_logs_by_id): Retrieves the single log entry associated with the provided ID.

## Log Data Event Listing

The following table lists the codes associated with the appropriate log events.

| **Event Code** | **Event** | **Event Description** | **Additional Info** |
| --- | --- | --- | --- |
| `admin_update_launch` | Auth0 Update Launched | |
| `api_limit` | Rate Limit On API | The maximum number of requests to the API in given time has reached. | [Rate Limit Policy](/policies/rate-limits) |
| `cls` | Code/Link Sent | Passwordless login code/link has been sent | [Passwordless](/passwordless) |
| `coff` | Connector Offline | AD/LDAP Connector is offline | [Active Directory/LDAP Connector](/connector) |
| `con` | Connector Online | AD/LDAP Connector is online and working | [Active Directory/LDAP Connector](/connector) |
| `cs` | Code Sent | Passwordless login code has been sent | [Passwordless](/passwordless) |
| `du` | Deleted User | User has been deleted. | [User Profile](/users/concepts/overview-user-profile) |
| `f` | Failed Login | | |
| `fapi` | Failed API Operation | | |
| `fc` | Failed by Connector | | [Active Directory/LDAP Connector](/connector) |
| `fce` | Failed Change Email | Failed to change user email | [User Profile](/users/concepts/overview-user-profile) |
| `fco` | Failed by CORS | Origin is not in the Allowed Origins list for the specified application | [Applications](/applications#application-settings) |
| `fcoa` | Failed cross-origin authentication | | |
| `fcp` | Failed Change Password | | [Changing a User's Password](/connections/database/password-change) |
| `fcph` | Failed Post Change Password Hook | | |
| `fcpn` | Failed Change Phone Number | | [User Profile](/users/concepts/overview-user-profile) |
| `fcpr` | Failed Change Password Request | | [Changing a User's Password](/connections/database/password-change) |
| `fcpro` | Failed Connector Provisioning | Failed to provision a AD/LDAP connector | [Active Directory/LDAP Connector](/connector) |
| `fcu` | Failed Change Username | Failed to change username | [User Profile](/users/concepts/overview-user-profile) |
| `fd` | Failed Delegation | Failed to generate delegation token | [Delegation Tokens](/tokens/delegation) |
| `fdu` | Failed User Deletion | | [User Profile](/users/concepts/overview-user-profile) |
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
| `gd_tenant_update` | Guardian tenant update | | [Hosted MFA Page](/hosted-pages/guardian) |
| `gd_unenroll` | Unenroll device account | Device used for second factor authentication has been unenrolled. | [Multi-factor Authentication](/multifactor-authentication) |
| `gd_update_device_account` | Update device account | Device used for second factor authentication has been updated. | [Multi-factor Authentication](/multifactor-authentication) |
| `gd_user_delete` | User delete | Deleted multi-factor user account. | [User Profile](/users/concepts/overview-user-profile) |
| `limit_delegation` | Too Many Calls to /delegation | Rate limit exceeded to `/delegation` endpoint | [API Rate Limit Policy](/policies/rate-limits) |
| `limit_mu` | Blocked IP Address | An IP address is blocked with 100 failed login attempts using different usernames, all with incorrect passwords in 24 hours, or 50 sign-up attempts per minute from the same IP address. | [Anomaly Detection](/anomaly-detection) |
| `limit_ui` | Too Many Calls to /userinfo | Rate limit exceeded to `/limit_ui` endpoint | [API Rate Limit Policy](/policies/rate-limits) |
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
| `sui` | Success users import | Successfully imported users | [User Import/Export](/extensions/user-import-export) |
| `sv` | Success Verification Email | | |
| `svr` | Success Verification Email Request | | |
| `sys_os_update_end` | Auth0 OS Update Ended | | |
| `sys_os_update_start` | Auth0 OS Update Started | | |
| `sys_update_end` | Auth0 Update Ended | | |
| `sys_update_start` | Auth0 Update Started | | |
| `ublkdu` | User login block released | User block setup by anomaly detection has been released | |
| `w` | Warnings During Login | | |

### Tools to Process Logs

* [Auth0 Logs Processor](https://www.npmjs.com/package/auth0-logs-processor)
* [GitHub Repo for the Auth0 Logs Processor](https://github.com/auth0/logs-processor)
