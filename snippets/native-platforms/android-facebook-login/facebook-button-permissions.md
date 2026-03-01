Set the requested permissions to `public_profile` and `email`. This way, the user email will also be included as part of the response, provided the access request is accepted by the user.

```java
loginButton.setPermissions(Arrays.asList("public_profile", "email"));
```