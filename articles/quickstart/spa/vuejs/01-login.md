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
Visit the <a href="https://developer.auth0.com/resources/guides/spa/vue/basic-authentication" target="_blank">Vue.js Authentication By Example</a> guide for a deep dive into implementing user authentication in Vue. This guide provides additional details on how to create a sign-up button and add route guards to a Vue application.
:::

::: warning
This quickstart is designed for using <a href="https://github.com/auth0/auth0-vue" target="_blank">Auth0 Vue</a> with Vue 3 applications. If you are using Vue 2, please check out the <a href="https://github.com/auth0/auth0-vue/blob/main/tutorial/vue2-login.md" target="_blank">Vue 2 Tutorial with Auth0 SPA SDK</a> instead or visit the <a href="https://developer.auth0.com/resources/guides/spa/vue/basic-authentication/v2-javascript" target="_blank">Vue.js Authentication 2 By Example</a> guide.
:::

<%= include('../_includes/_getting_started', { library: 'Vue.js', callback: 'http://localhost:3000', returnTo: 'http://localhost:3000', webOriginUrl: 'http://localhost:3000', showLogoutInfo: true, showWebOriginInfo: true, new_js_sdk: true, show_install_info: false }) %>

<%= include('_includes/_centralized_login') %>