## Implement the Login

At this point, you're all set to implement the login in any activity you want. Inside the activity override the `onCreate` and `onDestroy` methods and define a `LockCallback` instance.

```java
@Override
protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    Auth0 auth0 = new Auth0("${account.clientId}", "${account.namespace}");
    auth0.setOIDCConformant(true);
    lock = Lock.newBuilder(auth0, callback)
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
        // Credentials received
    }

    @Override
    public void onCanceled() {
        // User cancelled the login
    }

    @Override
    public void onError(LockException error){
        // Log in failed
    }
};
```

Finally, whenever you want to start the login widget, call:

```java
startActivity(lock.newIntent(this));
```

<div class="phone-mockup"><img src="/media/articles/libraries/lock-android/login.png" alt="Mobile example screenshot"/></div>

> If you require in-depth configuration, see [Lock Builder](/libraries/lock-android#lock-builder) class for more information

> There are multiple ways of implementing the login dialog. What you see above is the default widget; however, if you want, you can use [your own UI](/native-platforms/android/02-custom-login).
