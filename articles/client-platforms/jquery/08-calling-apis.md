---
title: Calling APIs
description: This tutorial demonstrates how to use $.ajaxSetup() to make authenticated API calls.
budicon: 546
---

<%= include('../../_includes/_package2', {
  org: 'auth0-samples',
  repo: 'auth0-jquery-samples',
  path: '08-Calling-Api'
}) %>

<%= include('../../_includes/_calling_apis') %>

## Sending Authenticated HTTP Requests

In order to make an authenticated request, you need to use `$.ajaxSetup()` in order to automatically add the `Authorization` header to every request.

```javascript
// app.js

$.ajaxSetup({
  'beforeSend': function(xhr) {
    if (localStorage.getItem('id_token')) {
      xhr.setRequestHeader('Authorization',
        'Bearer ' + localStorage.getItem('id_token'));
    }
  }
});
```

Your requests will have the `Authorization` header added automatically:

`Authorization: Bearer eyJ0eXAiOiJKV1Qi...`

Here, before every AJAX request, we are fetching the token from `localStorage` stored in the `id_token` key. You can choose a different key name if you like.
