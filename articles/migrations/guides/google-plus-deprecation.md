---
title: Google+ API Deprecation
description: Information on the Google+ API deprecation and Google Social Connection changes.
toc: false
contentType:
  - how-to
useCase:
  - add-login
  - migrate
---

# Google+ API Deprecation

On March 7th, 2019, [Google deprecated the Google+ service and APIs](https://developers.google.com/+/api-shutdown). As part of this change [Google+ scopes](https://developers.google.com/+/scopes-shutdown) are no longer valid.

We've updated [Google Social Connections](/connections/social/google) to reflect these changes.

## What's changed?

The `https://www.googleapis.com/auth/plus.me` scope, labeled as **Google+** on the Auth0 Dashboard and `google_plus` in the Management API, has been removed from Google Social Connections.

The removal of the Google+ scope does not change the user profile response from the API. However, it will limit the actions you can perform with the access token on Google APIs. So you may need to update your application code to accomodate these API changes.
