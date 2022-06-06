---
name: .env.local
language: sh
---

<!-- markdownlint-disable MD041 -->

```sh
AUTH0_SECRET='use [openssl rand -hex 32] to generate a 32 bytes value'
AUTH0_BASE_URL='http://localhost:3000'
AUTH0_ISSUER_BASE_URL='https://${account.namespace}'
AUTH0_CLIENT_ID='${account.clientId}'
AUTH0_CLIENT_SECRET='${account.clientSecret}'
```
