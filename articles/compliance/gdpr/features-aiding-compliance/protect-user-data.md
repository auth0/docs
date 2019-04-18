---
title: "GDPR: Protect and secure user data"
description: This article discusses how customers can use Auth0 to better protect and secure their user's personal data
toc: true
topics:
    - compliance
    - gdpr
contentType: concept
useCase: compliance
---
# GDPR: Protect and secure user data

As per article 32 of GDPR, you must implement appropriate security measures in order to ensure a level of security appropriate to the risk, including (but not limited to):

- Τhe encryption of personal data
- Τhe ability to ensure the ongoing confidentiality, integrity, availability and resilience of processing systems and services
- Τhe ability to restore the availability and access to personal data in a timely manner in the event of a physical or technical incident

There are several Auth0 features than can help you achieve that, like user profile encryption, brute-force protection, breached password detection, step-up authentication, and more.

<%= include('./_legal-warning.md') %>

## Encrypt user profile information

<%= include('./_encrypt-data.md') %>

## Enable brute-force protection

Auth0's brute-force protection shield is enabled by default to stop malicious attempts to access your application. 

There are two types of triggers for this shield:

* 10 consecutive failed login attempts for the same user and from the same IP address
* 100 failed login attempts from the same IP address in 24 hours *or* 50 sign up attempts per minute from the same IP address

For example, if a user with *user_id1* signs in from *IP1* and fails to login consecutively for 10 attempts, their log in attempt from this *IP1* will be blocked. Another user, *user_id2*, signing in from *IP1* will not be blocked.

Every time Auth0 detects 10 failed login attempts into a single account from the same IP, we will:

- Send a notification email to the user.
- Block the suspicious IP address for that user.

Every time Auth0 detects 100 failed login attempts in 24 hours or 50 sign up attempts from the same IP address, we will:

- Notify dashboard administrator(s).
- Block suspicious addresses for 15 minutes.

You can enable brute-force protection, configure which actions you want to take, and customize the blocked account email using the Dashboard. 

For more information, see [Brute Force Protection](/anomaly-detection#brute-force-protection).  

## Enable breached password detection

The breached password detection shield helps you identity user credentials that might have been compromised in a public data breech. 

Auth0 tracks large security breaches that are happening on major third party sites. If one of your users' credentials were included in a public security breech, you can take action and:

- Send an email to the affected user
- Send an email to dashboard owners immediately, and/or have a daily/weekly/monthly summary
- Block login attempts for suspected user accounts using that username and password combination. This block remains in place until the user changes their password

You can enable breached password detection and configure which actions you want to take using the Dashboard. 

For more information and steps to follow, see [Breached Password Detection](/anomaly-detection#breached-password-detection).

## Harden your security with multi-factor authentication

With multi-factor authentication (MFA), you can add an additional layer of security to your applications. It is a method of verifying a user's identity by asking them to present more than one piece of identifying information.

We support MFA using push notifications, SMS, one-time password authentication services, and custom providers. You can enable MFA for specific users or specific actions (for example, access screens with sensitive data). You can also define the conditions that will trigger additional authentication challenges, such as changes in geographic location or logins from unrecognized devices.

To review all available options and their features, and get implementation details for the one that suits your needs, see [Multi-factor Authentication in Auth0](/multifactor-authentication).

## Help your users choose better passwords

You can customize the level of password complexity for new sign ups. For example, you can ask for a password that has at least 10 characters and includes at least one upper-case letter, a number, and a special character.

You can also forbid the use of previous passwords using our Password History feature and stop users from choosing common passwords using our Password Dictionary.

All three features are configurable from the Dashboard. 

For information on how to use them see [Password Strength](/connections/database/password-strength) and [Password Options](/connections/database/password-options).

## Step-up authentication

With step-up authentication, applications can ask users to authenticate with a stronger authentication mechanism to access sensitive resources. For example, you may have a banking application which does not require [Multi-factor Authentication (MFA)](/multifactor-authentication) to view the accounts basic information, but when users try to transfer money between accounts then they must authenticate with one more factor (for example, a code sent via SMS).

You can check if a user has logged in with MFA by reviewing the contents of their ID Token or Access Token. You can then configure your application to deny access to sensitive resources if the token indicates that the user did not log in with MFA.

For details see [Step-up Authentication](/multifactor-authentication/step-up-authentication).

## Availability and resilience

Auth0 is designed and built as a scalable, highly available, multi-tenant cloud service. We are highly resilient to the failure of any of our components, because we  implement redundant components at all levels. We also detect failures rapidly and our failover is very quick. 

We support three deployment models:

<table class="table">
<tr>
    <th>Deployment</th>
    <th>Description</th>
</tr>
<tr>
    <td>Public Cloud</td>
    <td>A multi-tenant cloud service running on Auth0's cloud</td>
</tr>
<tr>
    <td>Private Cloud</td>
    <td>A dedicated cloud service running on Auth0's cloud</td>
</tr>
<tr>
    <td>Managed Private Cloud</td>
    <td>A dedicated cloud service running on either Auth0's cloud or the customer's AWS cloud infrastructure</td>
</tr>
</table>

You decide which deployment model works best for you based on your business and security requirements.

For more information on Auth0 architecture, see [Availability & Trust](https://auth0.com/availability-trust).

For more information on the available deployment models of Auth0, see [Auth0 Deployment Models](/getting-started/deployment-models).
