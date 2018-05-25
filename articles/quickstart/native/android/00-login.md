---
title: Login
description: This tutorial demonstrates how to add user login to an Android application using Auth0.
seo_alias: android
budicon: 448
github:
  path: 00-Login
---

<%= include('../_includes/_getting_started', { library: 'Android') %>

We suggest you do not hardcode these values as you may need to change them in the future. Instead, use [String Resources](https://developer.android.com/guide/topics/resources/string-resource.html), such as `@string/com_auth0_domain`, to define the values. 

Edit your `res/values/strings.xml` file as follows:

```xml
<resources>
    <string name="com_auth0_client_id">${account.clientId}</string>
    <string name="com_auth0_domain">${account.namespace}</string>
</resources>
```

<%= include('../../../_includes/_callback_url') %>

::: note
If you are following along with the sample project you downloaded from the top of this page, you should set the **Allowed Callback URL** to  'demo://${account.namespace}/android/YOUR_APP_PACKAGE_NAME/callback' }`.
:::

Replace `YOUR_APP_PACKAGE_NAME` with your application's package name, available as the `applicationId` attribute in the `app/build.gradle` file.

<%= include('_includes/_auth0') %>

<%= include('_includes/_login') %>