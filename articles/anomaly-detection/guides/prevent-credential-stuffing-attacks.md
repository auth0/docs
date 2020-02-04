---
title: Prevent Credential Stuffing Attacks
description: Learn how to prevent credential stuffing attacks on your system. 
beta: true
topics:
    - anomaly-detection
    - credential-stuffing
contentType: how-to
useCase:
  - prevent-credential-stuffing
---
# Prevent Credential Stuffing Attacks

Credential stuffing attacks (also known as *list validation attacks*) occur when bad actors automate the process of trying username and password combinations (usually stolen from another site) for many accounts in a short period of time.  According to recent statistics, as many as 71% of accounts use the same password across multiple sites so a credential stuffing attack has the potential to successfully log into your system.  

Consider, for example, the number of errors caused by an incorrect email or username (identified in the logs as type `fu`) for a particular tenant, which suggests an attack occurred November 20, with some abuse patterns afterwards:

![Credential Stuffing Attack Example](/media/articles/anomaly-detection/credential-stuffing-attack.png)

Auth0 provides a number of tools to combat credential stuffing attacks:  

* [Brute Force Protection](/anomaly-detection/guides/enable-disable-brute-force-protection) blocks login attempts after a number of consecutive failed logins. 

* [Breached Password Protection](/anomaly-detection/concepts/breached-passwords) identifies credentials that are known to be stolen.

* [Multi-factor Authentication](/multifactor-authentication) can be effective in preventing unauthorized logins, but it adds friction to the user experience. 

If you do not want to turn on additional features such as MFA, you can add **Automated Credential Stuffing Attack Protection** to provide a standard level of protection against credential stuffing attacks that does not add any friction to legitimate users. 

## How it works

Auth0 uses a large amount of data to identify patterns that signal that a credential stuffing attack is taking place. Auth0 uses sophisticated algorithms to determine when bursts of traffic are likely to be from a bot or script. Users attempting to sign in from IPs which are determined to have a high likelihood of being a credential stuffing attack will see a Captcha step. The algorithms are designed so that this only happens for bad traffic; the objective is to not show any friction to legitimate users.

![Captcha Login Screen Example](/media/articles/anomaly-detection/captcha-login-screen.png)

## Enable automated credential stuffing attack protection

### Prerequisites

* Please read Auth0’s [Beta Service Terms](https://cdn.auth0.com/website/legal/terms/beta-service-terms-11-18-19.pdf) and acknowledge you have read and agreed to the terms by emailing **Antonio Fuentes** at **antonio.fuentes@auth0.com**.

* Determine which type of login experience you have configured: 

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

## Performance impact

This feature is intended to reduce the number of login attempts associated with automated or scripted credential stuffing attacks. It is not expected to cause a degradation in the latency or performance of the login flows. Auth0 monitors the impact on these metrics and will share them with you.  

In addition, you can look at the [tenant logs](/anomaly-detection/guides/use-tenant-data-for-anomaly-detection). Events that indicate a credential stuffing attack is happening.

- `f`: failed login
- `fu`: failed login due to invalid email/username

If you have questions, you can contact Auth0 through your TAM or contact **antonio.fuentes@auth0.com**.
