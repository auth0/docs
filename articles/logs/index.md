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
  'logs/concepts/logs-admins-devs',
  'logs/guides/retrieve-logs-mgmt-api',
  'logs/references/log-data-retention',
  'logs/references/log-event-data',
  'logs/references/query-syntax',
  'logs/references/log-event-filters',
  'integrations/aws-eventbridge'
] }) %>
