You have already migrated to Lock 11 but you still see this error in your logs:

```text
Legacy Lock API: This feature is being deprecated. Please refer to our documentation to learn how to migrate your application.
```

These deprecation notices most likely originate from a user visiting the [Universal Login page](/hosted-pages/login) directly without initiating the authentication flow from your app. This can happen if a user bookmarks the login page directly. If this happens after **July 16, 2018** the user will not be able to log in.
