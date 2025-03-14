---
name: index.tsx
language: javascript
---
    
```javascript
import { LoginId } from '@auth0/auth0-acul-js';
import { useState } from 'react';

export const LoginIdScreen = () => {
  const loginManager = new LoginId();
  const [email, setEmail] = useState('');

  return (
    <div className="w-[100vw] min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6 bg-white p-8 rounded-lg shadow-md">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />

        <button 
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          onClick={() => loginManager.login({ username: email })}
        >
          Continue
        </button>

        {loginManager.transaction.alternateConnections?.map(({ name, strategy }) => (
          <button
            key={name}
            className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={() => loginManager.socialLogin({ connection: name })}
          >
            Continue with {strategy}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LoginIdScreen
```
