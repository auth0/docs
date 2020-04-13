---
title: Log Streams
description: Learn about using Log Streams to export your log events in near real-time.
classes: topic-page
toc: false
topics:
 - logs
 - streams
 - event-streams
contentType: index
---

# Log Streams

Log Streams let you export your log events to a target of your choice given URL or via AWS EventBridge. With Log Streams you can:

* export logs to a tool or service you already use
* react to events, such as changed passwords or new registrations, with your own business logic by sending log events to custom webhooks
* send events to AWS EventBridge for processing with lambdas or additional data pipelines

<%= include('../../_includes/_topic-links', { links: [
  'logs/streams/http-event',
  'logs/streams/aws-eventbridge'
] }) %>
