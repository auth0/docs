---
name: login-button.tsx
language: javascript
---

```javascript
import { useAuth0 } from '@auth0/auth0-react';
import { Browser } from '@capacitor/browser';
import { IonButton } from '@ionic/react';

const LoginButton: React.FC = () => {
  const { loginWithRedirect } = useAuth0();

  const login = async () => {
    await loginWithRedirect({
      async openUrl(url) {
         // Redirect using Capacitor's Browser plugin
        await Browser.open({
          url,
          windowName: "_self"
        });
      }
    });
  };

  return <IonButton onClick={login}>Log in</IonButton>;
};

export default LoginButton;
```