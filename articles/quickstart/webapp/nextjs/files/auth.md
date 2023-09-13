---
name: "app/api/auth/[auth0]/route.js"
language: javascript
---

<!-- markdownlint-disable MD041 -->

```javascript
import { handleAuth } from '@auth0/nextjs-auth0';

export const GET = handleAuth();
```
