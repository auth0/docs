---
title: Introduction
description: A multi-step quickstart guide to setup and manage authentication in your jQuery app using Auth0.
---

This multistep quickstart guide will walk you through setting up and managing authentication in your jQuery apps using Auth0.

## 1. Create an Application

<%= include('../../_includes/_new_app') %>_

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