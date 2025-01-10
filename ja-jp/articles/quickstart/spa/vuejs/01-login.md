---
title: Login
description: This quickstart demonstrates how to add user login to a Vue.JS application using Auth0.
budicon: 448
topics:
  - quickstarts
  - spa
  - vuejs
  - login
github:
  path: 01-Login
sample_download_required_data:
  - client
contentType: tutorial
useCase: quickstart
---

<!-- markdownlint-disable MD034 MD041 -->
:::note
Visit the [Vue.js Authentication By Example](https://developer.auth0.com/resources/guides/spa/vue/basic-authentication) guide for a deep dive into implementing user authentication in Vue. This guide provides additional details on how to create a sign-up button and add route guards to a Vue application.
:::

::: warning
This quickstart is designed for using [Auth0 Vue](https://github.com/auth0/auth0-vue) with Vue 3 applications. If you are using Vue 2, please check out the [Vue 2 Tutorial with Auth0 SPA SDK](https://github.com/auth0/auth0-vue/blob/main/tutorial/vue2-login.md) instead or visit the [Vue.js Authentication 2 By Example](https://developer.auth0.com/resources/guides/spa/vue/basic-authentication/v2-javascript) guide.
:::

<%= include('../_includes/_getting_started', { library: 'Vue.js', callback: 'http://localhost:3000', returnTo: 'http://localhost:3000', webOriginUrl: 'http://localhost:3000', showLogoutInfo: true, showWebOriginInfo: true, new_js_sdk: true, show_install_info: false }) %>

<%= include('_includes/_centralized_login') %>