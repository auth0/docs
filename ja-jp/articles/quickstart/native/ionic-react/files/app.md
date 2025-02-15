---
name: app.tsx
language: javascript
---

```javascript
// Import Capacitor's app and browser plugins, giving us access to `addListener` and `appUrlOpen`,
// as well as the bits needed for Auth0 and React
import { App as CapApp } from '@capacitor/app';
import { Browser } from '@capacitor/browser';
import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

// ...

const App: React.FC = () => {
  // Get the callback handler from the Auth0 React hook
  const { handleRedirectCallback } = useAuth0();

  useEffect(() => {
    // Handle the 'appUrlOpen' event and call `handleRedirectCallback`
    CapApp.addListener('appUrlOpen', async ({ url }) => {
      if (url.includes('state') && (url.includes('code') || url.includes('error'))) {
        await handleRedirectCallback(url);
      }
      // No-op on Android
      await Browser.close();
    });
  }, [handleRedirectCallback]);

  // ..
};
```