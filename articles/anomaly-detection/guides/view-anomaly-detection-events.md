---
description: Learn how to use tenant traffic log data to view anomaly detection events. 
topics:
    - security
    - anomaly-detection
contentType: how-to
useCase: tenant-logs
---

# View Anomaly Detection Events

Your tenant logs contain useful data that you can use to build charts to look at the profile of the traffic going through your tenant. This is helpful when evaluating anomaly detection activity. For example, you can look for the following events to determine if you're under attack:
- Abnormal bursts in traffic to the login flow that result in error (such as wrong username or password errors).
- Abnormal bursts in traffic coming from IP locales that are not expected.

The above tend to happen without much change to the rate of successful sign ins.

You can use your tenant log data `event` field to view tenant traffic data. We recommend building a daily histogram of failure events of the following types:

| Event Code | Event |
| -- | -- |
| `f` | Failed login |
| `fcoa` | Failed cross-origin authentication |
| `feccft` | Failed exchange |
| `fepft` | Failed exchange |
| `fsa` | Failed silent authentication |
| `fu` | Failed login (invalid email/username) |
| `ip` | Source IP (Use in conjunction with `fu` event traffic to determine where the failure traffic is coming from) |
| `sepft` | Success exchange |

These failure events depend on the flow you have set up with Auth0. 

The following example shows a credential stuffing attack on 11/20, with a large surge of events of type `fu` which is a failed username (typical of a credential stuffing attack).

![Traffic Failure Trends](/media/articles/anomaly-detection/traffic-failure-trends.png)

## Rate of errors in login flow

Look for a surge or abnormal number of errors for incorrect username or password. For example: Do you expect >30,000 errors per hour?

| Event Code | Event |
| -- | -- |
| `s` | Login success |
| `fu` | Failed login, invalid email/username |
| `fp` | Failed login, incorrect password |

Here's an example of what the data might look like.

![Rate of Errors in Login Flow](/media/articles/anomaly-detection/login-flow-errors.png)

## Rate of anomaly detection events

Look for abnormally high traffic for anomaly detection events, such as [breached password detection](/anomaly-detection/concepts/breached-passwords) or [brute-force protection](/anomaly-detection/concepts/brute-force-protection) for multiple accounts.

| Event Code | Event |
| -- | -- |
| `limit_mu` | Blocked IP address |
| `limit_wc` | Blocked account |
| `pwd_leak` | Breached password |

Here's an example of what that data might look like.

![Anomaly Detection Events](/media/articles/anomaly-detection/anomaly-detection-events.png)

## Number of IPs producing errors and their location

Look for a high number of IPs from locales that do not make sense. For example: Do you expect traffic from 10,000 IPs from Russia every day? Observe `ip` addresses in conjunction with `fu` event traffic to determine where the failure traffic is coming from.  

::: note
IP geolocation data isn't available in the tenant logs unless you're able to enrich it from another location. The IP locale is only  available from Kibana where the logs are already enriched with the information. 
:::

Here's an example of what that data might look like.

![IP Addresses Failed Attempts](/media/articles/anomaly-detection/ips-location.png)

## Keep reading

* [Log Event Type Codes](/logs/references/log-event-type-codes)
* [Log Search Query Syntax](/logs/references/query-syntax)
* [Export Log Data to External Services](/extensions#Monitor)
* [Retrieve Logs Using the Management API](/logs/guides/retrieve-logs-mgmt-api)
