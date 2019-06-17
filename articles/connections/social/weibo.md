---
title: Add Weibo Login to Your App
connection: Weibo
image: /media/connections/weibo.png
seo_alias: weibo
description: How to add Weibo login to your app
toc: true
topics:
  - connections
  - social
  - weibo
contentType: how-to
useCase:
    - customize-connections
    - add-idp
---
# Add Weibo Login to Your App

This guide will show you how to enable your users to log in to your Auth0 app using their Weibo credentials.

## 1. Register Auth0 with Weibo

Begin by [registering your Auth0 app with Weibo](https://open.weibo.com/authentication).

You will be prompted to provide a <dfn data-key="callback">callback URL</dfn> during the registration process. Use `https://${account.namespace}/login/callback`.

<%= include('../_find-auth0-domain-redirects') %>

After the registration process, Weibo provides you with an **appkey** and a corresponding **appkey secret**. Make a note of these values, since you'll need to provide them to Auth0.

## 2. Create and enable your Auth0 connection

[Set up the Weibo social connection](/dashboard/guides/connections/set-up-connections-social) in Auth0. Make sure you have the **App key** and the **App secret** that Weibo provided to you in Step 1.

## 3. Test the connection

At this point, you're ready to [test your connection](/dashboard/guides/connections/test-connections-social).

<%= include('../_quickstart-links.md') %>
