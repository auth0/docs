---
title: Sessions
description: Understand what sessions are and how to implement them.
toc: true
topics:
  - sessions
contentType: concept
useCase:
  - build-an-app
---
# Sessions

A session is a group of interactions between a user and an application that take place within a given timeframe. A single session can contain multiple activities (such as page views, events, social interactions, and e-commerce transactions), all of which the session temporarily stores while the user is connected.

By default, when a user leaves a website or closes their browser, their session ends. To keep users from having to log in every time they return, applications will typically extend sessions by storing session information in a [cookie](/sessions/concepts/cookies). Sessions are then effectively ended when a user logs out or when [session lifetime limits](/sessions/concepts/session-lifetime) are reached.

For examples of how sessions are used with authentication in Auth0, see [Sample Use Cases: Sessions](/sessions/concepts/sample-use-cases-sessions).

## Keep reading 
- Explore [sample use cases](/sessions/concepts/sample-use-cases-sessions) to see how sessions are used with authentication in Auth0.
- Learn how to [configure your session lifetime settings](/sessions/guides/dashboard/configure-session-lifetime-settings).
- Learn how to [log users out](/logout)