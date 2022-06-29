---
name: main.dart
language: dart
---

```dart
// Instantiate the SDK once in your app
final auth0 = Auth('${account.namespace}', '${account.clientId}');

// Redirect to Auth0 Universal Login for authentication
final result = await auth0.webAuthentication.login();

// result.accessToken

// Redirect to the logout endpoint on Auth0
await auth0.webAuthentication.logout();
```