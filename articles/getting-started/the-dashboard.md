---
title: The Dashboard
description: Learn the basics of the Auth0 Dashboard
toc: true
---
# The Dashboard

The [dashboard](${manage_url}) is where you manage all aspects of your Auth0 account and configuration. 

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
            <th><i class="icon icon-budicon-375"></i>&nbsp;Clients</th>
            <td colspan="3"><%= include('./_list-processes', {"screen": "clients"}) %></td>
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
            <th><i class="icon icon-budicon-292"></i>&nbsp;Users</th>
            <td colspan="3"><%= include('./_list-processes', {"screen": "users"}) %></td>
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
            <th><i class="icon icon-budicon-243"></i>&nbsp;Multifactor Auth</th>
            <td colspan="3"><%= include('./_list-processes', {"screen": "mfa"}) %></td>
        </tr>
        <tr>
            <th><i class="icon icon-budicon-725"></i>&nbsp;Hosted Pages</th>
            <td colspan="3"><%= include('./_list-processes', {"screen": "hlp"}) %></td>
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