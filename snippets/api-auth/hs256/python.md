---
title: Python
---

```python
import jwt

payload = jwt.decode(
  token,
  '<%= api.signing_secret %>',
  audience='<%= api.identifier %>'
  )
```
