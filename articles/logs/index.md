---
description: Understand how Auth0 logs work.
url: /logs
classes: topic-page
topics:
  - logs
contentType: index
useCase:
  - analyze-logs
  - integrate-analytics
---
# Logs

Using the [Dashboard](${manage_url}/#/logs) or the [Management API logs endpoint](/api/v2#!/Logs/get_logs), you can pull log data on actions performed by administrators using the Dashboard, operations performed via the Management API, and authentications made by your users.

::: warning
Auth0 does not provide real-time logs for your tenant. While we do our best to index events as they arrive, you may see some delays.
:::

<%= include('../_includes/_topic-links', { links: [
  'logs/streams',
  'logs/references/log-data-retention',
  'logs/guides/view-log-data-dashboard',
  'logs/references/log-event-filters',
  'logs/guides/retrieve-logs-mgmt-api',
  'logs/references/log-event-type-codes',
  'logs/references/query-syntax',
  'logs/concepts/logs-admins-devs'
] }) %>
