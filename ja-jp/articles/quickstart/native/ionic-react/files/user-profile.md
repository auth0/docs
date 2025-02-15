---
name: user-profile.tsx
language: javascript
---

```javascript
import { useAuth0 } from '@auth0/auth0-react';

const Profile: React.FC = () => {
  const { user, isLoading } = useAuth0();

  // If the SDK is not ready, or a user is not authenticated, exit.
  if (isLoading || !user) return null;

  return (
    <div>
      <img src={user.picture} alt={user.name} />
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
};

export default Profile;
```