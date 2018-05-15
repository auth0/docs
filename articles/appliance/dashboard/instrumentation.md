---
section: appliance
description: Overview on instrumentation in the PSaaS Appliance
tags:
    - appliance
    - dashboard
    - instrumentation
---

# PSaaS Appliance Dashboard: Instrumentation

The PSaaS Appliance ships with a feature called [Instrumentation](/appliance/instrumentation), which makes it easy for your PSaaS Appliance administrators or Auth0 Customer Success Engineers to gather information about the current (or previous) state of the PSaaS Appliance.

If you have chosen to enable Instrumentation, you can see specific Grafana dashboards in the [PSaaS Appliance Dashboard](${manage_url}/configuration#/instrumentation).

## The Instrumentation Page

If you've never used the PSaaS Appliance Dashboard to view your Grafana data, you'll be asked to sign in to your Grafana account. Without these permissions, Auth0 cannot return and display your data and dashboards.

![](/media/articles/appliance/dashboard/instrumentation-login.png)

Once you've logged in, you'll be able to see your data. You can set the following options to change the data displayed:

* **Nodes**: The PSaaS Appliance node for which you want to view data. Each node ships with its own Grafana instance;
* **Dashboard**: The [Grafana dashboard](http://docs.grafana.org/guides/getting_started/#dashboards-panels-rows-the-building-blocks-of-grafana) you want to see for the node you've selected;
* **Range**: The time period for which you want data. Choose from one of the following:

  * Last minute;
  * Last 5 minutes;
  * Last 15 minutes;
  * Last 30 minutes;
  * Last hour.

![](/media/articles/appliance/dashboard/instrumentation-page.png)
