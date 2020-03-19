Set the requested permissions to `public_profile` and `email`. This way, the user email will also be included as part of the response, provided the access request is accepted by the user.

```kotlin
login_button.setPermissions(listOf("public_profile", "email"))
```