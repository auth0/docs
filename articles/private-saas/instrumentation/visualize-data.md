---
section: private-saas
description: This document covers how to visualize data gathered via Instrumentation.
---

# Auth0 Private SaaS: How to Visualize Your Data

Once you have enabled Instrumentation, you can access your data in one of two places:

* Private SaaS Dashboard
* Grafana

## View Your Data in the Private SaaS Dashboard

If you would like to see your data in the Private SaaS Dashboard, navigate to `https://<private-saas_manage_domain>/configuration#/instrumentation` to access the graphs created from the data collected from your Private SaaS implementation.

![Private SaaS Instrumentation Dashboard](/media/articles/private-saas/instrumentation/general-data.png)

## Access Your Data Directly from Grafana

Each Private SaaS node has its own instances of Grafana, InfluxDB, and Telegraph. To access a given node's Grafana instance:

1. Obtain the node's private IP address
2. Using the private IP address, navigate to `https://<private-saas_manage_domain>.com/grafana/<private_ip>`

### Add Grafana Dashboards to the Instrumentation Page in the Private SaaS Dashboard

If you need to view relationships between datasets that have yet to be graphed, you can create new (or update existing) Grafana Dashboards displayed on the Private SaaS Dashboard's Instrumentation page. To create new Grafana dashboards, please view [this video](https://www.youtube.com/watch?v=sKNZMtoSHN4&index=7&list=PLDGkOdUX1Ujo3wHw9-z5Vo12YLqXRjzg2).

Once you have created your Grafana dashboards, tag them as `instrumentation` so that they appear on the Instrumentation page. To do this:

1. Navigate to the Grafana dashboard's *Settings > General* page.
2. Add a tag to the appropriate Grafana dashboard called `instrumentation`.

![Grafana Dashboard Settings Screen](/media/articles/private-saas/instrumentation/tag-dashboard.png)
