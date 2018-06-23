## Implement the Login

At this point, you're all set to implement the login in any activity you want. Inside the activity, override the `onCreate` and `onDestroy` methods to initialize and release **Lock**, and define an instance of `LockCallback` to handle the authentication result. The `Auth0` instance holds the client information such as Client ID and Domain. If you've added the `R.string.com_auth0_client_id` and `R.string.com_auth0_domain` String resources, you'll be able to use the constructor that receives an android Context. If you prefer to hardcode them, use the constructor that receives both strings.

```java
@Override
protected void onCreate(Bundle savedInstanceState) {
    Auth0 auth0 = new Auth0(this);
    lock = Lock.newBuilder(auth0, callback)
        .withScheme("demo")
        .withAudience(String.format("https://%s/userinfo", getString(R.string.com_auth0_domain)))
        // Add parameters to the Lock Builder
        .build(this);
}
```

```java
@Override
protected void onDestroy() {
    super.onDestroy();
    // Your own Activity code
    lock.onDestroy(this);
    lock = null;
}
```

```java
private LockCallback callback = new AuthenticationCallback() {
    @Override
    public void onAuthentication(Credentials credentials) {
        // Login Success response
    }

    @Override
    public void onCanceled() {
        // Login Cancelled response
    }

    @Override
    public void onError(LockException error){
        // Login Error response
    }
};
```

Finally, whenever you want to start the login widget, call:

```java
startActivity(lock.newIntent(this));
```

<div class="phone-mockup"><img src="/media/articles/libraries/lock-android/login.png" alt="Mobile example screenshot"/></div>

::: note
If you require in-depth configuration, see [Lock Builder](/libraries/lock-android#lock-builder) for more information
:::

::: note
There are multiple ways of implementing the login dialog. What you see above is the default widget; however, if you want, you can use [your own UI](/quickstart/native/android/02-custom-login).
:::
