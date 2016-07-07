---
title: Python
---

```python
from cryptography.x509 import load_pem_x509_certificate
from cryptography.hazmat.backends import default_backend

cert_str = "-----BEGIN CERTIFICATE-----MIIDETCCAfm..."
cert_obj = load_pem_x509_certificate(cert_str, default_backend())
public_key = cert_obj.public_key()

jwt.decode(token, public_key, audience='${"<%= api.identifier %>"}', algorithms=['RS256'])
```
