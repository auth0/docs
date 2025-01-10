---
name: webappexample/urls.py
language: python
---

<!-- markdownlint-disable MD041 -->

```python
from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login, name="login"),
    path("logout", views.logout, name="logout"),
    path("callback", views.callback, name="callback"),
]
```
