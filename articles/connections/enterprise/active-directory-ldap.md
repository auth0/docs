---
title: Connect Your App to Active Directory using LDAP
connection: Active Directory / LDAP
image: /media/connections/ad.png
public: true
alias:
  - ad
  - ldap
seo_alias: active-directory
description: Learn how to connect your app to Active Directory (AD) using Lightweight Directory Access Protocol (LDAP) through an enterprise connection.
crews: crew-2
topics:
    - connections
    - enterprise
    - azure
    - active-directory
    - microsoft
    - ldap
contentType: how-to
useCase:
    - customize-connections
    - add-idp
---

# Connect Your App to Active Directory using LDAP

Auth0 integrates with Active Directory (AD)  using Lightweight Directory Access Protocol (LDAP) through an **Active Directory/LDAP Connector** that you install on your network.

The **AD/LDAP Connector** (1), is a bridge between your **Active Directory/LDAP** (2) and the **Auth0 Service** (3). This bridge is necessary because AD/LDAP is typically restricted to your internal network, and Auth0 is a cloud service running in a completely different context.

![Overview Diagram of AD/LDAP Connector](/media/articles/connections/enterprise/active-directory/ldap-connect.png)

For [high availability and load balancing](/connector/high-availability), you can install multiple instances of the connector. All connections are outbound from the connector to the Auth0 Server, so changes to your firewall are generally unnecessary.

::: warning
The AD/LDAP Connector is designed for scenarios where your company controls the AD/LDAP server. The connector should not be installed on your customer's servers.

For B2B scenarios where you want to allow your customer's users to access your applications using their enterprise credentials, connect to your customer's federation service (for example, their own Auth0 service, ADFS, or any SAML identity provider) using one of the available enterprise connections.

If you install an AD/LDAP connector on your customer's servers and it is connected directly to your Auth0 domain, you will have to handle the passwords of your customer's users directly. Auth0 strongly recommends against these types of deployments and does not support them.
:::

## Prerequisites

**Before beginning:**

* [Register your Application with Auth0](/getting-started/set-up-app). 
  * Select an appropriate **Application Type**.
  * Add an **Allowed Callback URL** of **`${account.callback}`**.
  * Make sure your Application's **[Grant Types](/dashboard/guides/applications/update-grant-types)** include the appropriate flows.

## Steps

To connect your application to Active Directory/LDAP, you must:

1. [Create an enterprise connection in Auth0](#create-an-enterprise-connection-in-auth0) and download the installer.
2. [Install the connector on your network](#install-the-connector-on-your-network).
3. [Enable the enterprise connection for your Auth0 Application](#enable-the-enterprise-connection-for-your-auth0-application).
4. [Test the connection](#test-the-connection).

## Create an enterprise connection in Auth0

1. Navigate to [Auth0 Dashboard > Authentication > Enterprise](${manage_url}/#/connections/enterprise), locate **Active Directory / LDAP**, and select its `+`.

    ![Create AD / LDAP Connection](/media/articles/connections/dashboard-connections-enterprise-list.png)

2. Enter details for your connection, and select **Create**:

| Field | Description |
| ----- | ----------- |
| **Connection name** | Logical identifier for your connection; it must be unique for your tenant. Once set, this name can't be changed. |
| **Display name** (optional) | Text used to customize the login button for Universal Login. When set, the Universal Login login button reads: "Continue with {Display name}". |
| **Logo URL** (optional) | URL of image used to customize the login button for Universal Login. When set, the Universal Login login button displays the image as a 20px by 20px square. |
| **IdP Domains** (optional) | Comma-separated list of valid email domains that will be allowed to log in using this connection. Only needed if using the <dfn data-key="lock">Lock</dfn> login widget. |
| **Disable cache** | When enabled, disables caching. |
| **Use client SSL certificate authentication** | When enabled, uses client SSL certificate authentication. |
| **Use Windows Integrated Auth (Kerberos)** | When enabled, you will be asked to enter a range of IP addresses. When users log in through these IP addresses, Kerberos will be used; otherwise, AD/LDAP username/password will be requested. Typically, the IP range entered represent intranet addresses. |
| **Sync user profile attributes at each login** | When enabled, Auth0 automatically syncs user profile data with each user login, thereby ensuring that changes made in the connection source are automatically updated in Auth0. |

![Enter AD / LDAP Connection Details](/media/articles/connections/dashboard-connections-enterprise-create_ad-ldap_default-empty.png)

3. Download the provided installer and make note of the provided **Provisioning Ticket URL**.

::: note
We ship different versions of the connector to install on Windows or Linux platforms.
:::

## Install the connector on your network

Set up the [AD/LDAP Connector](/connector) by following the instructions for your platform:

- [Install the AD/LDAP Connector on Windows](/connector/install)
- [Install the AD/LDAP Connector on Non-Microsoft Platforms](/connector/install-other-platforms)

## Enable the enterprise connection for your Auth0 application

To use your new AD connection, you must first [enable the connection](/dashboard/guides/connections/enable-connections-enterprise) for your Auth0 Applications.

## Test the connection

Now you're ready to [test your connection](/dashboard/guides/connections/test-connections-enterprise).

<%= include('../_quickstart-links.md') %>
