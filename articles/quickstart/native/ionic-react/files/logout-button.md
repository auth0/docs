---
name: logout-button.tsx
language: javascript
---

```javascript
import { useAuth0 } from '@auth0/auth0-react';
import { Browser } from '@capacitor/browser';
import { IonButton } from '@ionic/react';

// This should reflect the URL added earlier to your "Allowed Logout URLs" setting
// in the Auth0 dashboard.
const logoutUri = 'YOUR_PACKAGE_ID://${account.namespace}/capacitor/YOUR_PACKAGE_ID/callback';

const LogoutButton: React.FC = () => {
  const { buildLogoutUrl, logout } = useAuth0();

  const doLogout = async () => {
    // Open the browser to perform a logout
    await Browser.open({ url: buildLogoutUrl({ returnTo: logoutUri }) });

    // Ask the SDK to log out locally, but not do the redirect
    logout({ localOnly: true });
  };

  return <IonButton onClick={doLogout}>Log out</IonButton>;
};

export default LogoutButton;
```