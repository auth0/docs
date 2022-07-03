---
name: login-button.tsx
language: javascript
---

```javascript
import { useAuth0 } from '@auth0/auth0-react';
import { Browser } from '@capacitor/browser';
import { IonButton } from '@ionic/react';

const LoginButton: React.FC = () => {
  const { buildAuthorizeUrl } = useAuth0();

  const login = async () => {
    // Ask auth0-react to build the login URL
    const url = await buildAuthorizeUrl();

    // Redirect using Capacitor's Browser plugin
    await Browser.open({ url });
  };

  return <IonButton onClick={login}>Log in</IonButton>;
};

export default LoginButton;
```