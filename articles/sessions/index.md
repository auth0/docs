---
title: Sessions
classes: topic-page
description: Understand what sessions are and how to implement them.
topics:
  - sessions
contentType: concept
useCase:
  - build-an-app
---
# Sessions

A session is a group of interactions between a user and an application that take place within a given timeframe. A single session can contain multiple activities (such as page views, events, social interactions, and e-commerce transactions), all of which the session stores temporarily while the user is connected.

By default, when a user leaves a website or closes their browser, their session ends. To keep users from having to log in every time they return, applications can extend sessions by storing session information in a cookie. Sessions end when a user logs out or when session lifetime limits are reached. Password resets cause Auth0 sessions to expire. 

<%= include('../_includes/_topic-links', { links: [
  'sessions/concepts/session-layers',
  'sessions/concepts/session-lifetime',
  'sessions/concepts/cookies',
  'sessions/concepts/cookie-attributes',
  'logout',
  'sessions/references/sample-use-cases-sessions',
  'sessions/references/example-short-lived-session-mgmt'
 ] }) %>
