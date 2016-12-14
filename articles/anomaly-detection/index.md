---
description: Explains all the types of Anomaly Detection provided by Auth0 and how to enable them.
url: /anomaly-detection
---

# Anomaly Detection

Auth0 provides built-in tools to detect anomalies and stop malicious attempts to access your application. Anomaly detection can alert you and your users of suspicious activity, as well as block further login attempts. You can set your preferences on the notifications that get sent and you can decide whether to block a suspicious IP address or not.

## What Anomaly Detection Provides

Currently Auth0 has three types of **shields** you can enable to handle anomalies and attacks.  A **shield** specifies the **action** you wish to take given a specific **trigger**.

A **trigger** is a suspicious event that is detected when someone is trying to login to your system, or there may have been a breached password with another 3rd party service.

## Shields

### Brute-Force Protection
There are two different triggers for the brute-force protection shield, for two slightly different attack scenarios.

**Trigger:** *10* failed login attempts into a single account from the same IP address.

**Actions**:
* Send an email to the affected user
* Block the suspicious IP address

::: panel-info Note
The way this anomaly protection works is that if user with "user_id1" signs in from IP1 and fails to login consecutively for 10 attempts their login from this IP - IP1 will be blocked. Another user, say "user_id2" signing in from the same IP (IP1) will not be blocked. The mechanism to clear this block is described below.
:::

If this block is triggered, it can be cleared the following ways:

* An administrator removes the block via the [Dashboard](${manage_url}) (by clicking **unblock for all IPs** under the **ACTIONS** button when viewing the user's details) or by using the [Management API](/api/management/v2#!/User_Blocks/delete_user_blocks) ;
* The User clicks on the "unblock" link provided in the email sent when the block went into effect;
* The User changes their password.


**Trigger:** *100* failed login attempts from a single IP address using different usernames, all with incorrect passwords in 24 hours. 50 sign ups attempts per minute from the same IP address.

**Actions:**
* Notify dashboard owners
* Block suspicious addresses

If this block is triggered, additional access attempts are released one at a time over the course of 24 hours until 100 attempts are allocated. More specifically, you will gain 100 attempts / 24 hours * 60 minutes = 1 additional attempt every 25 minutes.

Auth0 does email the dashboard owner when this block is triggered. Within this email there's a link the owner can click on to remove the block.

#### Restrictions Regarding Brute-Force Protection

Both of these anomaly types depend on the IP address of the user. Because of this, the following use cases are not supported:

1.  Using the [Resource Owner](/auth-api#!#post--oauth-ro) from the backend of the application. Using this call does not get the IP address of the user.
2.  Authenticating many users from the same IP address. For instance, users that are behind a proxy are more likely to reach these limits and trigger the associated protection. It is possible to configure a whitelist for the proxy's IP and CIDR range and avoid erroneously triggering the protection.

### Breached Password Detection

Every day malicious hackers penetrate websites and applications, exposing thousands of email and passwords. Given that it's quite common for users to use the same password to login to multiples sites, this poses a problem, not only for the hacked system, but to any application that shares those credentials.

Auth0 tracks large security breaches that are happening on major third party sites to help keep your users and system secure. By enabling Breached Password Detection, your users can be notified and/or blocked from logging in if we suspect their credentials were part of a published security breach.

**Trigger:** Auth0 suspects that a specific user's credentials were included in a major public security breach.

**Actions:**
* Send an email to the affected user
* Block login attempts for suspected user accounts using that username and password combination

This block remains in place until the user changes their password.

## Setting Your Preferences

To customize the **actions** that get taken from the **triggers**, go to the [Anomaly Detection](${manage_url}/#/anomaly) section on the dashboard.

![](/media/articles/anomaly-detection/anomaly-detection-overview.png)

You can use the toggle to disable all the actions of a certain shield. Or to enable/disable certain actions, click on the shield that has the action in it that you wish to change.

![](/media/articles/anomaly-detection/changing-actions.png)

Then you can use the toggle to enable/disable an action.

Click **Save** when you have finished.
