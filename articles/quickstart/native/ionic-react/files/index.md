---
name: index.tsx
language: javascript
---

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';

ReactDOM.render(
  <Auth0Provider
    domain="${account.namespace}"
    clientId="${account.clientId}"
    redirectUri="YOUR_PACKAGE_ID://${account.namespace}/capacitor/YOUR_PACKAGE_ID/callback"
  >
    <App />
  </Auth0Provider>,
  document.getElementById('root')
);
```