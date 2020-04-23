---
title: Set Anomaly Detection Preferences
description: Learn how to set anomaly detection preferences in the Dashboard.
toc: true
topics:
    - security
    - anomaly-detection
    - brute-force-protection
    - breached-password-detection
contentType: how-to
useCase: customize-anomaly-detection
v2: true
---
# Set Anomaly Detection Preferences

Customize the actions that occur after the triggers in the **Anomaly Detection** section on the [Dashboard](${manage_url}/#/anomaly).

::: warning
Auth0 recommends that you **do not** make changes to your anomaly detection features with the Management API.
:::

![Anomaly Detection Dashboard](/media/articles/anomaly-detection/anomaly-detection-overview.png)

## Automated attack protection

Automated attack protection is [enabled by default](/anomaly-detection/guides/enable-disable-automated-attack-protection) for all connections. It protects against [credential stuffing attacks](/anomaly-detection/concepts/credential-stuffing). 

If you do not want to use additional authentication features such as [MFA](/mfa), you can use Auth0's Automated Attack Protection to provide a standard level of protection against credential stuffing attacks that does not add any friction to legitimate users. See [Enable and Disable Automated Attack Protection](/anomaly-detection/guides/enable-disable-automated-attack-protection) for details. 

[Credential stuffing](/anomaly-detection/concepts/credential-stuffing) is an example of automated injection of breached username/password pairs in order to fraudulently gain access to user accounts. This is a subset of the brute force attack category: large numbers of spilled credentials are automatically entered into websites until they are potentially matched to an existing account, which the attacker can then hijack for their own purposes.

Auth0 automatically analyzes anonymized login data to detect when a customer is likely to be experiencing a credential stuffing attack.  When such an attack is detected, it throws a CAPTCHA step in the login experience to eliminate bot and scripted traffic.

::: warning
Auth0 strongly recommends that you **do not** disable the credential stuffing protection feature, however if you do, you can change it back in the [Dashboard](${manage_url}/#/anomaly).
::: 

Determine which type of login experience you have configured: 

- Go to [Dashboard](${manage_url}/#). 
- Navigate to **Universal Login**. 
- Determine which login experience is selected (Classic or New).
    
### If you are using New Universal Login

No further configuration is required. If you are part of the Beta program, the Early Access features will work for your tenant immediately.

### If you are using Classic Universal Login

Determine if your page is customized. 

1. Select the **Login** tab. 

2. Verify the status of the toggle **Customize Login Page**. 

3. If it is on, you have a customized login page. 

### If you are using customized Classic Universal Login

Upgrade your version of Lock.

1. Navigate to the **Universal Login** section in the Dashboard. 

2. Select the **Login** tab. 

3. Update your version of Auth0’s Lock to version v11.20 by replacing the script tag with the tag for version v11.20. 

For example, replace this tag:
```html
<script src="https://cdn.auth0.com/js/lock/x.x/lock.min.js"></script>
```

With the following:
```html
<script src="https://cdn.auth0.com/js/lock/11.20/lock.min.js"></script>
```

### Performance impact

This feature is intended to reduce the number of login attempts associated with automated or scripted credential stuffing attacks. It is not expected to cause a degradation in the latency or performance of the login flows. Auth0 monitors the impact on these metrics and will share them with you.  

In addition, you can look at the [tenant logs](/anomaly-detection/guides/use-tenant-data-for-anomaly-detection). Events that indicate a credential stuffing attack is happening.

- `f`: failed login
- `fu`: failed login due to invalid email/username

If you have questions, you can contact Auth0 through your TAM or contact **antonio.fuentes@auth0.com**.

## Brute-force protection preferences

Brute-force protection is enabled by default for all connections. Once enabled, you can customize the brute-force protection settings.

![Brute-Force Protection Shield](/media/articles/anomaly-detection/brute-force-shield.png)

::: warning
Auth0 strongly recommends that you **do not** disable brute-force protection, however if you do, you can change it back in the [Dashboard](${manage_url}/#/anomaly).
::: 

Limit the amount of signups and failed logins from a suspicious IP address. For more information, see [Attack Protection Triggers and Actions](/anomaly-detection/references/attack-protection-triggers-actions).

1. Click on the **Brute-force Protection** shield. 

![Brute-Force Protection Shield](/media/articles/anomaly-detection/brute-force-shield.png)

2. Use the toggles to enable or disable actions for single or multiple user accounts. 

3. Add any IP addresses to the **Whitelist** field to avoid erroneously triggering the protection action.

4. Click **Save** when you are finished.

## Breached password detection preferences

Set preferences for breached password detection actions. For more information, see [Attack Protection Triggers and Actions](/anomaly-detection/references/attack-protection-triggers-actions).

1. Click on the **Breached-password Detection** shield.

![Breached Password Detection Shield](/media/articles/anomaly-detection/breached-password-shield.png)

2. Use the toggles to enable or disable actions when login security breaches are detected. 

3. Determine how administrators are notified.

4. Click **Save** when you are finished.

## Restrictions and limitations

Both brute-force protection and breached password detection depend on the IP address of the user. Because of this, the following use cases are *not* supported:

* **Using the [Resource Owner](/api/authentication#resource-owner) from the backend of the application.** Using this call does not get the IP address of the user. See point 2 below as an alternative.

* **Using [Resource Owner Password Grant](/api-auth/grant/password) from the backend of the application.** Using this call does not get the IP address of the user, however, you can [configure your application and send the IP address of the user as part of the request](/api-auth/tutorials/using-resource-owner-password-from-server-side) to make brute-force protection work correctly.

* **Authenticating many users from the same IP address.** For example, users that are behind a proxy are more likely to reach these limits and trigger the associated protection. It is possible to configure a whitelist for the proxy's IP and CIDR range and avoid erroneously triggering the protection.

## Keep reading

* [Attack Protection Triggers and Actions](/anomaly-detection/references/attack-protection-triggers-actions)
* [Breached Password Detection](/anomaly-detection/concepts/breached-passwords)