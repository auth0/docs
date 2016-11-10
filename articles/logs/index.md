---
description: How to view log data, lists log event types.
url: /logs
---

# Logs

Using the Auth0 Dashboard, you can pull log data on:

* Actions performed by administrators using the Dashboard;
* Authentications made by your users.

## How to View Log Data

The **Logs** page of the [Auth0 Dashboard](${manage_url}) displays all events that occur, including user authentication and administrative actions such as adding/updating Clients, Connections, and Rules.

![](/media/articles/logs/dashboard-logs.png)

Please note that administrative actions will show up in the logs as `API Operation` events.

## Frequently Asked Questions

### How long is log file data available?

The length of time for which your data is stored varies depending on your plan.

You can see how long data is kept for your existing plan using the **Learn More** banner.

![](/media/articles/logs/log-storage-period.png)

### How do I view or export log file data?

If you would like to store log data longer than the time period offered by your subscription plan, we recommend you use the [Management API feature that allows you to retrieve the relevant data](api/management/v2#!/Logs/get_logs). Once you've retrieved your data, you can:

* Store the data yourself;
* Transmit the data to an external service such as Splunk (consider using the [Auth0 Logs to Splunk Extension](/extensions/splunk)).

#### Retrieving Logs from the Management API

You can use the Management API v2 retrieve your logs. There are the two available endpoints, each providing slightly different quantities of information:

* [/api/v2/logs](/api/v2#!/Logs/get_logs): Retrieves log entries that match the provided search criteria. If you do not provide any search criteria, you will get a list of all available entries;
* [/api/v2/logs/{id}](/api/v2#!/Logs/get_logs_by_id): Retrieves the single log entry associated with the provided ID.

## Log Data Event Listing

The following table lists the codes associated with the appropriate log events.

<table>
  <thead>
    <tr>
      <th><strong>Event Code</strong></th>
      <th><strong>Event</strong></th>
      <th><strong>Event Description</strong></th>
      <th><strong>Additional Info</strong></th>
    </tr>
  </thead>
  <tbody>
  <tr>
    <td><code>admin_update_launch</code></td>
    <td>Auth0 Update Launched</td>
  </tr>
  <tr>
    <td><code>api_limit</code></td>
    <td>Rate Limit On API</td>
    <td>The maximum number of requests to the API in given time.</td>
    <td><a href="/policies/rate-limits">Rate Limit Policy</a></td>
  </tr>
  <tr>
    <td><code>cls</code></td>
    <td>Code/Link Sent</td>
  </tr>
    <tr>
    <td><code>cs</code></td>
    <td>Code Sent</td>
  </tr>
  <tr>
    <td><code>coff</code></td>
    <td>Connector Offline</td>
    <td></td>
    <td><a href="/connector">Active Directory/LDAP Connector</a></td>
  </tr>
  <tr>
    <td><code>con</code></td>
    <td>Connector Online</td>
    <td></td>
    <td><a href="/connector">Active Directory/LDAP Connector</a></td>
  </tr>
    <td><code>fc</code></td>
    <td>Failed by Connector</td>
    <td></td>
    <td><a href="/connector">Active Directory/LDAP Connector</a></td>
  </tr>
  <tr>
    <td><code>du</code></td>
    <td>Deleted User</td>
    <td>User has been deleted.</td>
    <td><a href="/user-profile">User Profile</a></td>
  </tr>
  <tr>
    <td><code>f</code></td>
    <td>Failed Login</td>
  </tr>
  <tr>
    <td><code>fapi</code></td>
    <td>Failed API Operation</td>
  </tr>
  <tr>
    <td><code>fce</code></td>
    <td>Failed Change Email</td>
    <td></td>
    <td><a href="/user-profile">User Profile</a></td>
  </tr>
  <tr>
    <td><code>fco</code></td>
    <td>Failed by CORS</td>
  </tr>
  <tr>
    <td><code>fcp</code></td>
    <td>Failed Change Password</td>
    <td></td>
    <td><a href="/connections/database/password-change">Changing a User's Password</a></td>
  </tr>
  <tr>
    <td><code>fcpn</code></td>
    <td>Failed Change Phone Number</td>
    <td></td>
    <td><a href="/user-profile">User Profile</a></td>
  </tr>
  <tr>
    <td><code>fcpr</code></td>
    <td>Failed Change Password Request</td>
    <td></td>
    <td><a href="/connections/database/password-change">Changing a User's Password</a></td>
  </tr>
  <tr>
    <td><code>fcpro</code></td>
    <td>Failed Connector Provisioning</td>
    <td></td>
    <td><a href="/connector">Active Directory/LDAP Connector</a></td>
  </tr>
  <tr>
    <td><code>fcu</code></td>
    <td>Failed Change Username</td>
    <td></td>
    <td><a href="/user-profile">User Profile</a></td>
  </tr>
  <tr>
    <td><code>fd</code></td>
    <td>Failed Delegation</td>
    <td></td>
    <td><a href="/tokens/delegation">Delegation Tokens</a></td>
  </tr>
  <tr>
    <td><code>fdu</code></td>
    <td>Failed User Deletion</td>
    <td></td>
    <td><a href="/user-profile">User Profile</a></td>
  </tr>
  <tr>
    <td><code>sdu</code></td>
    <td>Success User Deletion</td>
    <td></td>
    <td><a href="/user-profile">User Profile</a></td>
  </tr>
  <tr>
    <td><code>feacft</code></td>
    <td>Failed Exchange</td>
    <td>Failed exchange of authorization code for Access Token</td>
    <td><a href="/api-auth/tutorials/authorization-code-grant">Authorization Code Grant Flow</a></td>
  </tr>
  <tr>
    <td><code>feccft</code></td>
    <td>Failed Exchange</td>
    <td>Failed exchange of Access Token for a Client Credentials Grant</td>
    <td><a href="/api-auth/config/asking-for-access-tokens">Asking for Access Tokens for a Client Credentials Grant</a></td>
  </tr>
  <tr>
    <td><code>slo</code></td>
    <td>Success Logout</td>
  </tr>
  <tr>
    <td><code>flo</code></td>
    <td>Failed Logout</td>
  </tr>
  <tr>
    <td><code>fn</code></td>
    <td>Failed Sending Notification</td>
  </tr>
  <tr>
    <td><code>fp</code></td>
    <td>Failed Login (Incorrect Password)</td>
  </tr>
  <tr>
    <td><code>fs</code></td>
    <td>Failed Signup</td>
  </tr>
  <tr>
    <td><code>fu</code></td>
    <td>Failed Login (Invalid Email/Username)</td>
  </tr>
  <tr>
    <td><code>fui</code></td>
    <td>Users import</td>
    <td>Failed user import</td>
    <td><a href="/extensions/user-import-export">User Import/Export</a></td>
  </tr>
    <tr>
    <td><code>sui</code></td>
    <td>Users import</td>
    <td>Successful user import</td>
    <td><a href="/extensions/user-import-export">User Import/Export</a></td>
  </tr>
  <tr>
    <td><code>fv</code></td>
    <td>Failed Verification Email</td>
    <td></td>
    <td><a href="/email/custom#verification-email">Verification Email</a></td>
  </tr>
  <tr>
    <td><code>fvr</code></td>
    <td>Failed Verification Email Request</td>
    <td></td>
    <td><a href="/email/custom#verification-email">Verification Email</a></td>
  </tr>
  <tr>
    <td><code>gd_auth_failed</code></td>
    <td>OTP Auth failed</td>
    <td>One-time password authentication failed.<td>
    <td><a href="/multifactor-authentication">Multifactor Authentication</a></td>
  </tr>
  <tr>
    <td><code>gd_auth_rejected</code></td>
    <td>OTP Auth rejected</td>
    <td>One-time password authentication rejected.<td>
    <td><a href="/multifactor-authentication">Multifactor Authentication</a></td>
  </tr>
  <tr>
    <td><code>gd_auth_succeed</code></td>
    <td>OTP Auth success</td>
    <td>One-time password authentication success.<td>
    <td><a href="/multifactor-authentication">Multifactor Authentication</a></td>
  </tr>
  <tr>
    <td><code>gd_module_switch</code></td>
    <td>Module switch</td>
  </tr>
  <tr>
    <td><code>gd_otp_rate_limit_exceed</code></td>
    <td>Too many failures</td>
  </tr>
  <tr>
    <td><code>gd_recovery_failed</code></td>
    <td>Recovery failed</td>
    <td>Multifactor recovery code failed.<td>
    <td><a href="/multifactor-authentication">Multifactor Authentication</a></td>
  </tr>
  <tr>
    <td><code>gd_recovery_rate_limit_exceed</code></td>
    <td>Too many failures</td>
    <td>Multifactor recovery code has failed too many times.<td>
    <td><a href="/multifactor-authentication">Multifactor Authentication</a></td>
  </tr>
  <tr>
    <td><code>gd_recovery_succeed</code></td>
    <td>Recovery success</td>
    <td>Multifactor recovery code succeeded authorization.<td>
    <td><a href="/multifactor-authentication">Multifactor Authentication</a></td>
  </tr>
  <tr>
    <td><code>gd_send_pn</code></td>
    <td>Push notification sent</td>
    <td>Push notification for MFA sent successfully sent with Guardian.<td>
    <td><a href="/multifactor-authentication/guardian">Auth0 Guardian</a></td>
  </tr>
  <tr>
    <td><code>gd_send_sms</code></td>
    <td>SMS Sent</td>
    <td>SMS for MFA sent successfully sent.<td>
    <td><a href="/multifactor-authentication/guardian/admin-guide#support-for-sms">Using SMS for MFA</a></td>
  </tr>
  <tr>
    <td><code>gd_start_auth</code></td>
    <td>Second factor started</td>
    <td>Second factor authentication event started for MFA.<td>
    <td><a href="/multifactor-authentication">Multifactor Authentication</a></td>
  </tr>
  <tr>
    <td><code>gd_start_enroll</code></td>
    <td>Enroll started</td>
    <td>Multifactor authentication enroll has started.<td>
    <td><a href="/multifactor-authentication">Multifactor Authentication</a></td>
  </tr>
  <tr>
    <td><code>gd_tenant_update</code></td>
    <td>Guardian tenant update</td>
    <td><td>
    <td><a href="/multifactor-authentication/guardian">Auth0 Guardian</a></td>
  </tr>
  <tr>
    <td><code>gd_unenroll</code></td>
    <td>Unenroll device account</td>
    <td>Device used for second factor authentication has been unenrolled.<td>
    <td><a href="/multifactor-authentication">Multifactor Authentication</a></td>
  </tr>
  <tr>
    <td><code>gd_update_device_account</code></td>
    <td>Update device account</td>
    <td>Device used for second factor authentication has been updated.<td>
    <td><a href="/multifactor-authentication">Multifactor Authentication</a></td>
  </tr>
  <tr>
    <td><code>gd_user_delete</code></td>
    <td>User delete</td>
    <td>Deleted multifactor user account.<td>
    <td><a href="/user-profile">User Profile</a></td>
  </tr>
  <tr>
    <td><code>limit_delegation</code></td>
    <td>Too Many Calls to /delegation</td>
    <td>Rate limit exceeded to <code>/delegation</code> endpoint</td>
    <td><a href="/policies/rate-limits">API Rate Limit Policy</a></td>
  </tr>
  <tr>
    <td><code>limit_mu</code></td>
    <td>Blocked IP Address</td>
    <td>An IP address is blocked with 10 failed login attempts into a single account from the same IP address.</td>
    <td><a href="/anomaly-detection">Anomaly Detection</a></td>
  </tr>
  <tr>
    <td><code>limit_ui</code></td>
    <td>Rate limit exceeded to <code>/limit_ui</code> endpoint</td>
    <td><a href="/policies/rate-limits">API Rate Limit Policy</a></td>  </tr>
  <tr>
    <td><code>limit_wc</code></td>
    <td>Blocked Account</td>
    <td></td>
    <td><a href="/anomaly-detection">Anomaly Detection</a></td>
  </tr>
  <tr>
    <td><code>s</code></td>
    <td>Success Login</td>
    <td>Successful login event.</td>
  </tr>
  <tr>
    <td><code>sapi</code></td>
    <td>Success API Operation</td>
  </tr>
  <tr>
    <td><code>sce</code></td>
    <td>Success Change Email</td>
    <td></td>
    <td><a href="/email">Emails in Auth0</a></td>
  </tr>
  <tr>
    <td><code>scp</code></td>
    <td>Success Change Password</td>
  </tr>
  <tr>
    <td><code>scpr</code></td>
    <td>Success Change Password Request</td>
  </tr>
    <tr>
    <td><code>scpn</code></td>
    <td>Success Change Phone Number</td>
  </tr>
  <tr>
    <td><code>scu</code></td>
    <td>Success Change Username</td>
  </tr>
  <tr>
    <td><code>sd</code></td>
    <td>Success Delegation</td>
    <td></td>
    <td><a href="/tokens/delegation">Delegation Tokens</a></td>
  </tr>
  <tr>
    <td><code>seacft</code></td>
    <td>Success Exchange</td>
    <td>Successful exchange of authorization code for Access Token</td>
    <td><a href="/api-auth/tutorials/authorization-code-grant">Authorization Code Grant Flow</a></td>
  </tr>
  <tr>
    <td><code>seccft</code></td>
    <td>Success Exchange</td>
    <td>Successful exchange of Access Token for a Client Credentials Grant</td>
    <td><a href="/api-auth/config/asking-for-access-tokens">Asking for Access Tokens for a Client Credentials Grant</a></td>
  </tr>
  <tr>
    <td><code>ss</code></td>
    <td>Success Signup</td>
  </tr>
  <tr>
    <td><code>sv</code></td>
    <td>Success Verification Email</td>
  </tr>
  <tr>
    <td><code>svr</code></td>
    <td>Success Verification Email Request</td>
  </tr>
  <tr>
    <td><code>sys_os_update_end</code></td>
    <td>Auth0 OS Update Ended</td>
  </tr>
  <tr>
    <td><code>sys_os_update_start</code></td>
    <td>Auth0 OS Update Started</td>
  </tr>
  <tr>
    <td><code>sys_update_end</code></td>
    <td>Auth0 Update Ended</td>
  </tr>
  <tr>
    <td><code>sys_update_start</code></td>
    <td>Auth0 Update Started</td>
  </tr>
  <tr>
    <td><code>w</code></td>
    <td>Warnings During Login</td>
  </tr>
  </tbody>
</table>

### Tools to Process Logs

* [Auth0 Logs Processor](https://www.npmjs.com/package/auth0-logs-processor)
* [GitHub Repo for the Auth0 Logs Processor](https://github.com/auth0/logs-processor)
