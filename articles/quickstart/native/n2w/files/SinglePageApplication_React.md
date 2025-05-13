---
name: react.jsx
language: javascript
---

```javascript
import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const sessionTransferToken = searchParams.get("session_transfer_token");

    // Automatically trigger the login when receiving session transfer token
    if (sessionTransferToken) {
      loginWithRedirect({
        authorizationParams: {
          session_transfer_token: sessionTransferToken,
        },
      });
    }
  }, [loginWithRedirect, searchParams]);

  return <button onClick={() => loginWithRedirect()}>Log In</button>;
};

export default LoginButton;
```
