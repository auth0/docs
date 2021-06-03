---
title: Login
description: This tutorial demonstrates how to add user login to a Vue.JS application using Auth0.
budicon: 448
topics:
  - quickstarts
  - spa
  - vuejs
  - login
github:
  path: 01-Login
contentType: tutorial
useCase: quickstart
---

<!-- markdownlint-disable MD034 MD041 -->

<%= include('../_includes/_getting_started', { library: 'Vue.js', callback: 'http://localhost:3000', returnTo: 'http://localhost:3000', webOriginUrl: 'http://localhost:3000', showLogoutInfo: true, showWebOriginInfo: true, new_js_sdk: true, show_install_info: false }) %>

<%= include('_includes/_centralized_login') %>

:::note
For a deep dive into implementing user authentication in Vue, visit the [Complete Guide to Vue User Authentication with Auth0](https://auth0.com/blog/complete-guide-to-vue-user-authentication/). This guide provides you with additional details, such as creating a signup button. 
:::
