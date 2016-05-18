---
url: /anomaly-detection
---

# Anomaly Detection

Auth0 provides built-in tools to detect anomalies and stop malicious attempts to access your application. Anomaly detection can alert you and your users of suspicious activity, as well as block further login attempts. You can set your preferences on the notifications that get sent and whether to block a suspicious IP address.

## What Anomaly Detection Provides

Currently Auth0 has three types of **shields** you can enable to handle anomalies and attacks.  A **shield** specifies the **action** you wish to take given a specific **trigger**. 

A **trigger** is a suspicious event that is detected when someone is trying to login to your system, or there may have been a breached password with another 3rd party service.

## Shields

### Brute force protection

**Trigger:** Multiple failed login attempts into a single account from the same IP address.

**Actions**:
* Notify dashboard owners
* Send an email to the affected user
* Block the suspicious IP address

### 2nd level brute force protection

**Trigger:** Failed login attempts from a single IP address using different usernames.

**Actions:**
* Notify dashboard owners
* Block suspicious addresses

Both of these anomaly types depend on the IP address of the user, because of this the following cases are not supported:

1.  Using the [Resource Owner](/auth-api#!#post--oauth-ro) from the backend of the application. Using this call does not get the IP address of the user.
2. Many users authenticating from the same IP address.  If this is an issue for you, disable the **2nd level brute force protection** shield.

### Breached Password Detection

Every day malicious hackers penetrate websites and applications exposing thousands of email and passwords. Given that is quite common for users to use the same password to login to multiples sites, this poses a problem not only for the hacked system but to any application that shares those credentials.

At Auth0, we are tracking large security breaches that are happening on major third party sites to help keep your users and system secure. By enabling Breached Password Detection, your users can be notified and/or blocked from logging in if we suspect their credentials were part of a published security breach.

**Trigger:** We suspect that a specific user's credentials were included in a major public security breach.

**Actions:** 
* Send an email to the affected user
* Block login attempts for suspected user accounts (until they change their password)

## Setting Your Preferences

To customize the **actions** that get taken from the **triggers**, go to the [Anomaly Detection](${uiURL}/#/anomaly) section on the dashboard.

![](/media/articles/anomaly-detection/anomaly-detection-overview.png)

You can use the toggle to disable all the actions of a certain shield. Or to enable/disable certain actions, click on the shield that has the action in it that you wish to change.

![](/media/articles/anomaly-detection/changing-actions.png)

Then you can use the toggle to enable/disable an action.

Click **Save** when you have finished.
