---
section: appliance
description: This document covers the metrics available when using Instrumentation.
topics:
    - appliance
    - instrumentation
contentType: reference
useCase: appliance
applianceId: appliance43
---

# PSaaS Appliance: Metrics Available via Instrumentation

The following metrics are available to you when Instrumentation is enabled on your PSaaS Appliance:

## Metrics Regarding PSaaS Appliance Infrastructure

* [CPU](https://github.com/influxdata/telegraf/blob/master/plugins/inputs/system/CPU_README.md)
* [Disk](https://github.com/influxdata/telegraf/blob/master/plugins/inputs/system/DISK_README.md)
* [Disk I/O](https://github.com/influxdata/telegraf/blob/master/plugins/inputs/system/DISK_README.md)
* [Memory](https://github.com/influxdata/telegraf/blob/master/plugins/inputs/system/MEM_README.md)
* [Processes](https://github.com/influxdata/telegraf/blob/master/plugins/inputs/system/PROCESSES_README.md)
* [Swap](https://github.com/influxdata/telegraf/blob/master/plugins/inputs/system/MEM_README.md)
* [System](https://github.com/influxdata/telegraf/blob/master/plugins/inputs/system/SYSTEM_README.md)
* [MongoDB](https://github.com/influxdata/telegraf/blob/master/plugins/inputs/mongodb/README.md)
* [Net](https://github.com/influxdata/telegraf/blob/master/plugins/inputs/system/net.go)
* [NGINX](https://github.com/influxdata/telegraf/blob/master/plugins/inputs/nginx/README.md)
* [RabbitMQ](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/rabbitmq)
* [Procstat](https://github.com/influxdata/telegraf/blob/master/plugins/inputs/procstat/README.md)

## Metrics Regarding PSaaS Appliance Processes

* auth0-api2_http_requests_authenticated
* auth0-api2_http_requests_received
* auth0-api2_http_requests_replied
* auth0-api2_http_response_time
* auth0-import-users-worker_event-loop_blocked
* auth0-import-users-worker_resources_cpu_usage
* auth0-import-users-worker_resources_memory_heapTotal
* auth0-import-users-worker_resources_memory_heapUsed
* auth0-import-users-worker_resources_memory_usage
* auth0-notifications_event-loop_blocked
* auth0-notifications_resources_cpu_usage
* auth0-notifications_resources_memory_heapTotal
* auth0-notifications_resources_memory_heapUsed
* auth0-notifications_resources_memory_usage
* auth0-server_auth_step_time
* auth0-server_clients_findByTenantAndClientId
* auth0-server_connections_getByName
* auth0-server_http_requests_received
* auth0-server_http_requests_replied
* auth0-server_http_response_time
* auth0-server_tenants_get
* auth0-users_bootup_time
* auth0-users_http_requests_received
* auth0-users_http_requests_replied
* auth0-users_http_requests_size
* auth0-users_http_response_time
