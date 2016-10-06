## Implement the Login

At this point, you're all set to implement the login in any activity you want.

First, add the following lines in the `onCreate` method.

```java
@Override
protected void onCreate(Bundle savedInstanceState) {
    Auth0 auth0 = new Auth0(${account.clientId}, ${account.namespace});
    lock = Lock.newBuilder(auth0, callback)
                    // Add parameters to the Lock Builder
                    .build(this);
}
```

Second, add the following lines in the `onDestroy` method.

```java
@Override
protected void onDestroy() {
    super.onDestroy();
    // Your own Activity code
    lock.onDestroy(this);
    lock = null;
}
```

Third, add the authentication callback, inside your activity.

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

> If you need in depth configuration, you can find more information on [Lock Builder](/libraries/lock-android#lock-builder)

> There are multiple ways of implementing the login dialog. What you see above is the default widget; however, if you want, you can use [your own UI](02-custom-login).