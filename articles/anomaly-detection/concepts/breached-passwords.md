---
title: Breached Password Detection
description: Understand why a user receives a breached password email and general web security tips.
topics:
    - security
    - passwords
contentType: concept
useCase: customize-anomaly-detection
v2: true
---

# Breached Password Detection

Every day, malicious hackers penetrate websites and applications, exposing thousands of email and passwords. Because it's common for users to use the same password to login to multiples sites, this poses a problem, not only for the hacked system, but to any application that shares those [breached passwords](/anomaly-detection/concepts/breached-passwords).

Auth0 tracks large security breaches that are happening on major third party sites to help keep your users and system secure. By [enabling breached password detection](/anomaly-detection/guides/set-anomaly-detection-preferences), when a [trigger](/anomaly-detection/references/attack-protection-triggers-actions) occurs, your users can be notified and/or blocked from logging in if we suspect their credentials were part of a published security breach. You can [customize blocked account emails](/anomaly-detection/guides/customize-blocked-account-emails).

You can configure the **URL Lifetime** and **Redirect To** values in the Dashboard by going to [Emails > Templates > Change Password Template](${manage_url}/#/emails).

::: note
Breached password detection works when logging in using the Resource Owner Password Grant (ROPG) and when using custom databases with your tenants.
:::

When a user receives an email requesting that they change their password immediately, it is because their account could be the victim of a security breach. This may be the result of a compromise by a third-party application that experienced a security breach. The breach may not have happened to this account, but based on available data, the user's credentials may have been released. Since many people reuse passwords, the request to change passwords is a precaution to make sure the user stays protected. 

Users may also want to change their password at any other sites where they suspect they used a shared password. 

## General security tips

Users can't usually prevent certain sites from experiencing security breaches, but there are some things they can do to help keep their accounts safe.

### Check emails carefully

Check where an email is coming from and the links that they provide. Often phishing emails do not include a user's name but something generic such as "Dear Customer."  

### Reset passwords directly from sites

Always do a password reset through the actual site itself not via potentially false links in emails. Also note that secure website URL always starts with `https`.

Here are some links for password resets on commonly used sites:
* [Google](https://www.google.com/accounts/recovery/)
* [Facebook](https://www.facebook.com/settings)
* [Twitter](https://twitter.com/settings/password)

### Never enter personal or financial information in email

Emails in general are not very secure and are not a good way to communicate sensitive information. A trusted company/application would not ask for  information in this way. Make sure not to enter confidential information through false links in emails. 

### Never download files from unreliable sources

Most web browsers detect suspicious sites. An alert should appear when you try to access a malicious site. Never download files from suspicious emails or websites.

### Do not reuse passwords

When one site has a breach of user data, if a user uses the same credentials elsewhere, information in other sites can also be accessed. The only way to prevent this is by not reusing passwords for multiple sites. The problem is that remembering countless passwords is frustrating and often impossible. One solution to this problem is the use of a password manager. There are many password managers available which can help users to use separate and secure passwords for each account, but at the same time not be responsible for remembering all of them. 

### Use strong passwords

The longer a password is, the harder it becomes to be guessed via brute force methods. Many sites allow the use of pass-phrases (a phrase or sentence instead of just a complicate word.) Try to make passwords long and use a mix of special characters, numbers, and upper- and lowercase letters.

### Keep software current

Applications release patches and updates when they find security vulnerabilities in their systems. Keeping applications, web browsers, and operating systems up to date can help prevent security breaches.

### Check the security of your email inbox

If you use Gmail, Google offers the [Security Checkup](https://myaccount.google.com/security-checkup) tool to let you know if there are any security issues related to your inbox.

You can also use third-party tools, such as websites like [HaveIBeenPawned](https://haveibeenpwned.com/PwnedWebsites) to see if there might be security issues associated with your email address.

## Restrictions and limitations

Breached password detection depends on the IP address of the user. Because of this, the following use cases are *not* supported:

* If you use the [Resource Owner](/api/authentication#resource-owner) from the backend of the application. Using this call does not get the IP address of the user. 

* If you use [Resource Owner Password Grant](/api-auth/grant/password) from the backend of the application. 

* If you authenticate a large number of users from the same IP address. For example, users that are behind a proxy are more likely to reach these limits and trigger the associated protection. It is possible to configure a whitelist for the proxy's IP and CIDR range and avoid erroneously triggering the protection.

## Keep reading

* [Attack Protection Triggers and Actions](/anomaly-detection/references/attack-protection-triggers-actions)
* [Customize Blocked Account Emails](/anomaly-detection/guides/customize-blocked-account-emails)
* [View Anomaly Detection Events](/anomaly-detection/guides/view-anomaly-detection-events)
