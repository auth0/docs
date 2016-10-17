---
title: Introduction
description: This is a multi-step quickstart guide that demonstrates how to setup and manage authentication in your JavaScript app using Auth0
budicon: 715
---

This multi-step quickstart guide will walk you through setting up and managing authentication in your vanilla JS apps using Auth0.

## 1. Create an Application

<%= include('../../_includes/_new_app') %>

![App Dashboard](/media/articles/angularjs/app_dashboard.png)

## 2. Dependencies

To integrate your jQuery application with Auth0, add the Lock widget. You can get it from Bower or from the Auth0 CDN.

**Bower**

```bash
bower install auth0-lock
```

**CDN**

```html
<script src="http://cdn.auth0.com/js/lock/10.2/lock.min.js"></script>
```
