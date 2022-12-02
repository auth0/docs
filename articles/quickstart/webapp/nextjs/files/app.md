---
name: _app.jsx
language: jsx
---

<!-- markdownlint-disable MD041 -->

```jsx
import React from 'react';
import { UserProvider } from '@auth0/nextjs-auth0/client';

export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}
```
