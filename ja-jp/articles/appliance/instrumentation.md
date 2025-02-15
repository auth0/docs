---
section: appliance
description: This document covers why and how to enable instrumentation in the PSaaS Appliance.
topics:
    - appliance
    - instrumentation
contentType: 
    - how-to
useCase: appliance
applianceId: appliance45
sitemap: false
---
# PSaaS Appliance Monitoring: Instrumentation

The PSaaS Appliance allows you to collect time series data about individual processes and the overall cluster.

To collect and analyze time series data, you must:

* Have instrumentation enabled (please contact Auth0 for assistance with this)
* Export the data collected to DataDog

If you've chosen to host the PSaaS Appliance in your on-premise data center or in a cloud data center to which you've subscribed (e.g. AWS or Azure), you must use the instrumentation feature to monitor your PSaaS Appliance.

If Auth0 hosts the PSaaS Appliance on your behalf, you do not have access to this feature – Auth0's Managed Service Engineering (MSE) team will use instrumentation to monitor the PSaaS Appliance for you.

## Alerts

The PSaaS Appliance does not come with any built-in tool for sending alerts. To remedy this, we rely on DataDog and Telegraf to help implement robust monitoring and alerting strategies for the PSaaS Appliance.

### Signals to Monitor

These are the signals that the PSaaS Appliance makes available to DataDog via the Telegraf agent. The Telegraf agent defines these signals automatically.

* [CPU](https://github.com/influxdata/telegraf/blob/34b7a4c3611d1ede908ef275401544c34a4a3ba3/plugins/inputs/system/CPU_README.md)
* [Disk](https://github.com/influxdata/telegraf/blob/34b7a4c3611d1ede908ef275401544c34a4a3ba3/plugins/inputs/system/DISK_README.md)
* [Disk IO](https://github.com/influxdata/telegraf/blob/34b7a4c3611d1ede908ef275401544c34a4a3ba3/plugins/inputs/system/DISK_README.md)
* [Memory](https://github.com/influxdata/telegraf/blob/34b7a4c3611d1ede908ef275401544c34a4a3ba3/plugins/inputs/system/MEM_README.md)
* [Processes](https://github.com/influxdata/telegraf/blob/34b7a4c3611d1ede908ef275401544c34a4a3ba3/plugins/inputs/system/PROCESSES_README.md)
* [Swap](https://github.com/influxdata/telegraf/blob/34b7a4c3611d1ede908ef275401544c34a4a3ba3/plugins/inputs/system/MEM_README.md)
* [System](https://github.com/influxdata/telegraf/blob/34b7a4c3611d1ede908ef275401544c34a4a3ba3/plugins/inputs/system/SYSTEM_README.md)
* [MongoDB](https://github.com/influxdata/telegraf/blob/34b7a4c3611d1ede908ef275401544c34a4a3ba3/plugins/inputs/mongodb/README.md)
* [Net](https://github.com/influxdata/telegraf/blob/34b7a4c3611d1ede908ef275401544c34a4a3ba3/plugins/inputs/system/net.go)
* [NGINX](https://github.com/influxdata/telegraf/blob/34b7a4c3611d1ede908ef275401544c34a4a3ba3/plugins/inputs/nginx/README.md)
* [RabbitMQ](https://github.com/influxdata/telegraf/tree/34b7a4c3611d1ede908ef275401544c34a4a3ba3/plugins/inputs/rabbitmq)
* [Procstat](https://github.com/influxdata/telegraf/blob/34b7a4c3611d1ede908ef275401544c34a4a3ba3/plugins/inputs/procstat/README.md)
* [X509](https://github.com/influxdata/telegraf/blob/release-1.11/plugins/inputs/x509_cert/README.md)

### Auth0 Signals to Monitor

Please note that Auth0 exposes many internal metrics that will be visible in your DataDog console. The names of these metrics typically begin with `auth0_`.

The internal metrics may change at any point, so in most cases, we do not recommend that you build monitoring strategies based on these signals (you can safely ignore these metrics, if you'd like). However, there are a few that you **should** monitor. We list the exceptions in the table below.

| Signal | Description |
| - | - |
| auth0_http_requests_received | The total number of requests received by the PSaaS Appliance. |
| auth0_http_requests_replied | The total number of requests replied to by the PSaaS Appliance. |
| auth0_http_response_time.count | The number of responses issued by the PSaaS Appliance. This metric corresponds to `auth0_http_requests_replied`. |
| auth0_http_response_time.lower | The shortest amount of time it took for the PSaaS Appliance to respond to a request. |
| auth0_http_response_time.mean | The average time it took for the PSaaS Appliance to respond to a request. |
| auth0_http_response_time.upper | The longest amount of time it took for the PSaaS Appliance to respond to a request. |
