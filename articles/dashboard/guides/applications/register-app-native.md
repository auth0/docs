---
title: Register Native Applications
description: Learn how to register and configure a native application using the Auth0 Management Dashboard. These may include mobile, desktop, or hybrid apps running natively in a device (e.g., i0S, Android).
topics:
  - applications
  - native-app
  - mobile-app
  - dashboard
contentType: 
  - how-to
useCase:
  - build-an-app
  - add-login
  - call-api
---
# Register Native Applications

To integrate Auth0 with a [native application](/applications), you must first register your app with Auth0. This guide will show you how to register a native application using Auth0's Dashboard.

<%= include('./_includes/_register-app-part1', { application_type: 'native', application_type_create: 'Native App' }) %>

<%= include('./_includes/_register-app-part2', { application_type: 'native', application_type_create: 'Native App' }) %> 

3. If you're developing a mobile app, provide the necessary iOS/Android parameters in the **Advanced Settings** area, and click **Save Changes**.

- For iOS apps, [provide your **Team ID** and **App Bundle Identifier**](/dashboard/guides/applications/enable-universal-links).

- For Android apps, [provide your **App Package Name** and your **Key Hashes**](/dashboard/guides/applications/enable-android-app-links).

<%= include('./_includes/_register-app-next-steps') %>

