---
title: Connect Your App using IP Address Authentication [DEPRECATED]
connection: IP Address Authentication
image: /media/connections/ipaddress.png
public: true
alias:
  - ip-based-auth
  - ip
  - address-authentication
description: Learn how to connect your app using IP Address Authentication with an enterprise connection. This feature has been deprecated.
topics:
  - connections
  - enterprise
  - ip-addresses
useCase:
  - customize-connections
  - add-idp
---
# Connect Your App using IP Address Authentication [DEPRECATED]

::: warning
 IP Address Authentication has been deprecated and will not be enabled for new customers. Existing customers who currently have IP Address Authentication enabled may continue to use this feature. If IP Address Authentication functionality is changed or removed from service at some point, customers who currently use it will be notified beforehand and given ample time to migrate.
:::

When users connect to your app using IP Address Authentication, Auth0 checks whether the request is coming from within a specified range of IP addresses. 

## Prerequisites

**Before beginning:**

* [Register your Application with Auth0](/getting-started/set-up-app). 
  * Select an appropriate **Application Type**.
  * Add an **Allowed Callback URL** of **`${account.callback}`**.
  * Make sure your Application's **[Grant Types](/dashboard/guides/applications/update-grant-types)** include the appropriate flows.

## Steps

To connect your application using IP Address Authentication, you must:

1. [Create an enterprise connection in Auth0](#create-an-enterprise-connection-in-auth0).
2. [Enable the enterprise connection for your Auth0 Application](#enable-the-enterprise-connection-for-your-auth0-application).
3. [Test the connection](#test-the-connection).

## Create an enterprise connection in Auth0

1. Navigate to the [Connections > Enterprise](${manage_url}/#/connections/enterprise) page in the [Auth0 Dashboard](${manage_url}/), and click the `+` next to **IP Address Authentication**.

![Create Connection Type](/media/articles/dashboard/connections/enterprise/conn-enterprise-list.png)

2. Enter settings for your connection, and click **Create**:

| Field | Description |
| ----- | ----------- |
| **Connection name** | Logical identifier for your connection; it must be unique for your tenant. Once set, this name can't be changed. |
| **Display name** (optional) | Text used to customize the login button for Universal Login. When set, the Universal Login login button reads: "Continue with {Display name}". |
| **Logo URL** (optional) | URL of image used to customize the login button for Universal Login. When set, the Universal Login login button displays the image as a 20px by 20px square. |
| **IP Range** | Comma-separated list of IP Addresses and/or CIDR blocks, as specified in the [CIDR-notation](http://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing). (For example, `192.168.100.14/24`). |
| **Display username** | Generic username assigned to anyone connecting from this range of IP addresses. |

![Configure IP Address Authentication Settings](/media/articles/dashboard/connections/enterprise/conn-enterprise-ip-addr-auth-settings.png)

## Enable the enterprise connection for your Auth0 application

To use your new IP Address Authentication connection, you must first [enable the connection](/dashboard/guides/connections/enable-connections-enterprise) for your Auth0 Applications.

## Test the connection

Now you're ready to [test your connection](/dashboard/guides/connections/test-connections-enterprise).
