---
name: reactivenative.js
language: javascript
---

```javascript
// React Native - Placeholder for Native to Web SSO
// SDK support is not available yet. This is a conceptual guide only.

import { WebView } from 'react-native-webview';

/**
 * Concept:
 * - Use your Auth0 refresh_token to call a backend that performs the session_transfer_token exchange
 * - Receive the short-lived session_transfer_token
 * - Inject it into a WebView via a cookie header or query param (if cookies aren't supported)
 * - Load the web login URI
 */


```
