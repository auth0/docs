---
section: appliance
description: Overview of the Appliance Dashboard Troubleshoot page
---

# Auth0 Appliance Dashboard: Troubleshoot

::: panel-info Appliance Dashboard Navigation

For additional information on navigating to and using the Appliance Dashboard, please see the section on [Appliance Controls](/appliance/dashboard#appliance-controls).

:::

The Troubleshoot page of the Appliance Dashboard provides you with tools to help diagnose any issues that might occur.

![](/media/articles/appliance/dashboard/troubleshoot.png)

## Diagnostics Package

You may create a diagnostic package containing detailed information about your Appliance instance(s) by clicking on the "Generate New Package" button.

Once you've clicked "Generate New Package", you will see a notification message that indicates that your package is being generated. Once your package is ready, the message will disappear and a link to download the package related to a particular node instance will appear in the last column of your Nodes table.

### Contents of the Diagnostics Package

Upon downloaded your package, you'll notice that the file name formatted as follows: `appliance-logs-[name of node]`. Within this file are the following sub-folders, each containing a series of logs:

* auth0
* mongodb
* nginx
* rabbitmq
* ssh-auth

## Health Check

The Health Check offers a quick overview of the status of your Appliance instances. Data is available for the past hour through the past twenty-nine (29) days.

To obtain data for a specific period of time, change the `Day` and/or `Hour` field to correspond to the time period whose data you want to analyze. Click "Get" to return the specified data.

You can refresh the listed data by clicking on the "refresh" button located on the right hand side.

The following bits of data are available at a glance:

* **Status**: in the column headed by a picture of weather clouds are status symbols reflecting the state of a given node. If all is well, the column appears with a green sunshine icon. If there is something that is attention-worthy, the column appears with a red rain/lightening icon;
* **Time**: the time at which the data was retrieved;
* ** All Nodes/IP Addresses: by changing the column heading from "All Nodes" to the IP address of a specific node (and vice versa), you can choose to display data from ALL nodes or just data from a specific node;
* **Host**: the name of the node in question;
* **Avail Memory**: the amount of memory available to the node at the time of the Health Check;
* **CPU**: CPU usage (as a percent) on the node at the time of the Health Check;
* **Email**: indicates status of email services;
* **Disk**: indicates status of disk resources;
* **Network**: indicates status of network availability;
* **Services**: indicates status of services;
* **DB**: indicates status of database availability.

By clicking on an individual row listed under the Health Check section, you may view additional information about the resources that are currently running.
