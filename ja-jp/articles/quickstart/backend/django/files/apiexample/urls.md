---
name: apiexample/urls.py
language: python
---
    
```python
from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/public', views.public),
    path('api/private', views.private),
    path('api/private-scoped', views.private_scoped)
]
```
