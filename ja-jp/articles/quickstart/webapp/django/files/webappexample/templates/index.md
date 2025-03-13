---
name: webappexample/templates/index.html
language: html
---
    
```html
<html>
<head>
  <meta charset="utf-8" />
  <title>Auth0 Example</title>
</head>
<body>
{% if session %}
  <h1>Welcome {{session.userinfo.name}}!</h1>
  <p><a href="{% url 'logout' %}">Logout</a></p>
  <div><pre>{{pretty}}</pre></div>
{% else %}
  <h1>Welcome Guest</h1>
  <p><a href="{% url 'login' %}">Login</a></p>
{% endif %}
</body>
</html>
```
