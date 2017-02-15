---
section: appliance
description: This document covers how to access the data gathered via Instrumentation.
---

# Auth0 Appliance: Access Your Data

By connecting to your Appliance via SSH, you can access your data in one of two ways.

## Run Quick Queries from the Command Line

From the command line, you can run the `query-metrics` script, which provides you with one or more of the following metrics:

* The number of MongoDB queries made every second
* The number of attempted logins per second
* The CPU usage per process
* The memory used per process

### Get Detailed Usage Information

By running the `query-metrics` script *without* arguments, you can view detailed usage information:

`query metrics`

### Get Specific Usage Information

To see specific information about a given usage scenario, you can add the appropriate arguments when running the `query-metrics` script. To do this, modify your command as follows:

`query-metrics <query_idx> <start_time> <end_time> [<additional_args>...]`

The following table lists the query index and the metric to which it corresponds:

<table class="table">
  <th>Index</th>
  <th>Metric</th>
  <th>Resolution of Metric</th>
  <th>Retention Time</th>
  <tr>
    <td>0</td>
    <td>Number of MongoDB Queries Per Second</td>
    <td>5 seconds</td>
    <td>1 day</td>
  </tr>
  <tr>
    <td>1</td>
    <td>Number of MongoDB Queries Per Second</td>
    <td>1 minute</td>
    <td>7 days</td>
  </tr>
  <tr>
    <td>2</td>
    <td>Number of Attempted Logins Per Second</td>
    <td>5 seconds</td>
    <td>1 day</td>
  </tr>
  <tr>
    <td>3</td>
    <td>Number of Attempted Logins Per Second</td>
    <td>1 minute</td>
    <td>7 days</td>
  </tr>
  <tr>
    <td>4</td>
    <td>CPU Usage By Process</td>
    <td>5 seconds</td>
    <td>7 days</td>
  </tr>
  <tr>
    <td>5</td>
    <td>Memory Usage By Process</td>
    <td>5 seconds</td>
    <td>7 days</td>
  </tr>
</table>

#### Example 1: View the Number of MongoDB Queries for the Past 2 Minutes

`query-metrics 1 "time > now() - 2m" "time < now()"`

#### Example 2: View the CPU Usage by NGINX Processes for the Past 10 Minutes

`query-metrics 4 "time > now() - 10m" "time < now()" nginx`

## Access Data Directly from InfluxDB via Command-Line Interface

::: panel-warning Warning
You can delete data and drop measurements and databases using the InfluxDB Command-Line Interface. Proceed with caution.
:::

You can access you data directly by querying your InfluxDB instance using its Command-Line Interface (CLI). To do this, run the `influx` command from the Appliance. The CLI allows you to run custom queries and explore your data. To see a full list of acceptable arguments for this command, please refer to the [InfluxDB documentation](https://docs.influxdata.com/influxdb/v1.0/tools/shell/).

Within InfluxDB, the database containing Appliance-related data is named `auth0`. There are two data retention policies under `auth0`:

1. `1day`: contains metrics that get downsampled and stored for 1 day
2. `1week`: contains metrics that get downsampled and stored for 1 week

> The retention policy and measurement names should be surrounded by double quotes in queries.

### Example Query

The following query allows you to view the number of MongoDB queries per second for the last two minutes.

```text
USE auth 0

SELECT queries_per_sec FROM auth0."1day"."mongodb" WHERE time > now() - 2m
```

For additional information on querying InfluxDB, please refer to the [InfluxDB documentation on data exploration](https://docs.influxdata.com/influxdb/v1.0/query_language/data_exploration/).
