---
url: /anomaly-detection
---

# Anomaly Detection

Auth0 provides built-in tools to detect anomalies and stop malicious attempts to access your application. Anomaly detection can alert you and your users of suspicious activity, as well as block further login attempts. You can set your preferences on the notifications that get sent and whether to block a suspicious IP address.

## What Anomaly Detection Provides

Currently Auth0 has two types of **shields** you can enable to handle anomalies and attacks.  A **shield** specifies the **action** you wish to take given a specific **trigger**. 

A **trigger** is a suspicious event that is detected when someone is trying to login to your system. Auth0 currently supports two types of triggers, one per shield:

**Brute force protection**

* Multiple failed login attempts into a single account from the same IP address.

**2nd level brute force protection**

* Failed login attempts from a single IP address using different usernames.

The **actions** you can take with these triggers are:

* Email account owners
* Email the specific user whose account is affected 
* Block a certain IP address

The anomalies that are currently supported depend on the IP address of the user, because of this the following cases are not supported:

1.  Using the [Resource Owner](/auth-api#!#post--oauth-ro) from the backend of the application. Using this call does not get the IP address of the user.
2. Many users authenticating from the same IP address.  If this is an issue for you, disable the **2nd level brute force protection** shield.

## Setting Your Preferences

To customize the **actions** that get taken from the **triggers**, go to the [Anomaly Detection](${uiURL}/#/anomaly) section on the dashboard.

![](/media/articles/anomaly-detection/anomaly-detection-overview.png)

You can use the toggle to disable all the actions of a certain shield. Or to enable/disable certain actions, click on the shield that has the action in it that you wish to change.

![](/media/articles/anomaly-detection/changing-actions.png)

Then you can use the toggle to enable/disable an action.

Click **Save** when you have finished.
