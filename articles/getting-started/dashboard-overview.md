---
title: Dashboard Overview
description: Learn the basics of the Auth0 Dashboard
toc: true
topics:
  - auth0-101
  - dashboard
contentType:
    - how-to
useCase:
    - manage-accounts
    - get-started
---
# Dashboard Overview

The [Dashboard](${manage_url}) is where you manage all aspects of your Auth0 account and configuration.

![Auth0 Dashboard Homepage](/media/articles/getting-started/auth0-dashboard.png)

It consists of several sections which you can navigate using the sidebar menu on your left.

## Configure your implementation

The following table contains a brief overview of the different dashboard pages and what you can do on each.

<table class="table">
    <thead>
        <tr>
            <th class="info"><strong>Screen</strong></th>
            <th class="info" colspan="3"><strong>What can I do here?</strong></th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th><i class="icon icon-budicon-497"></i>&nbsp;Dashboard</th>
            <td colspan="3"><%= include('./_list-processes', {"screen": "dashboard"}) %></td>
        </tr>
        <tr>
            <th><i class="icon icon-budicon-375"></i>&nbsp;Applications</th>
            <td colspan="3"><%= include('./_list-processes', {"screen": "applications"}) %></td>
        </tr>
        <tr>
            <th><i class="icon icon-budicon-546"></i>&nbsp;APIs</th>
            <td colspan="3"><%= include('./_list-processes', {"screen": "apis"}) %></td>
        </tr>
        <tr>
            <th><i class="icon icon-budicon-143"></i>&nbsp;SSO Integrations</th>
            <td colspan="3"><%= include('./_list-processes', {"screen": "sso"}) %></td>
        </tr>
        <tr>
            <th><i class="icon icon-budicon-341"></i>&nbsp;Connections</th>
            <td colspan="3"><%= include('./_list-processes', {"screen": "connections"}) %></td>
        </tr>
        <tr>
            <th><i class="icon icon-budicon-725"></i>&nbsp;Universal Login</th>
            <td colspan="3"><%= include('./_list-processes', {"screen": "universal-login"}) %></td>
        </tr>
        <tr>
            <th><i class="icon icon-budicon-292"></i>&nbsp;Users & Roles</th>
            <td colspan="3"><%= include('./_list-processes', {"screen": "users-roles"}) %></td>
        </tr>
        <tr>
            <th><i class="icon icon-budicon-173"></i>&nbsp;Rules</th>
            <td colspan="3"><%= include('./_list-processes', {"screen": "rules"}) %></td>
        </tr>
        <tr>
            <th><i class="icon icon-budicon-346"></i>&nbsp;Hooks</th>
            <td colspan="3"><%= include('./_list-processes', {"screen": "hooks"}) %></td>
        </tr>
        <tr>
            <th><i class="icon icon-budicon-243"></i>&nbsp;Multi-factor Auth</th>
            <td colspan="3"><%= include('./_list-processes', {"screen": "mfa"}) %></td>
        </tr>
        <tr>
            <th><i class="icon icon-budicon-778"></i>&nbsp;Emails</th>
            <td colspan="3"><%= include('./_list-processes', {"screen": "emails"}) %></td>
        </tr>
        <tr>
            <th><i class="icon icon-budicon-754"></i>&nbsp;Logs</th>
            <td colspan="3"><%= include('./_list-processes', {"screen": "logs"}) %></td>
        </tr>
        <tr>
            <th><i class="icon icon-budicon-528"></i>&nbsp;Anomaly Detection</th>
            <td colspan="3"><%= include('./_list-processes', {"screen": "anomaly"}) %></td>
        </tr>
        <tr>
            <th><i class="icon icon-budicon-324"></i>&nbsp;Extensions</th>
            <td colspan="3"><%= include('./_list-processes', {"screen": "extensions"}) %></td>
        </tr>
        <tr>
            <th><i class="icon icon-budicon-803"></i>&nbsp;Get Support</th>
            <td colspan="3"><%= include('./_list-processes', {"screen": "support"}) %></td>
        </tr>
    </tbody>
</table>

## Manage your account

On the top right you can see your tenant's name and icon, and a little arrow. This arrow displays a drop-down menu that you can use to configure different aspects of your account:

- **Settings**: Here you can configure several aspects of your tenant. For more info see [Tenant Settings in the Auth0 Dashboard](/dashboard/reference/settings-tenant).
- **Invite an admin**: Use this option to add another person as admin to your tenant configuration. For more info see [Manage Admins in the Dashboard](/dashboard/manage-dashboard-admins). 
- **Create tenant**: Use this to [create a new tenant](/getting-started/create-tenant).
- **Switch tenant**: If you have multiple [tenants](/getting-started/the-basics#account-and-tenants) you can use this option to switch between them. All configuration described in the previous section is per tenant. If you create an application for `tenant-A`, you will not see it listed for `tenant-B`. If you have more than one tenant, you will find this switching option handy. 
- **View profile**: Use this to view information about your [account profile](${manage_url}/#/profile).
- **Account usage**: This option navigates you to our [Account Center](${env.DOMAIN_URL_SUPPORT}/tenants/public) where you can see information about your subscription and your tenants.
- **Logout**: Log out from your account.