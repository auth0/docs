## Implement the Login

At this point, you're all set to implement the login in any activity you want. Inside the activity, add the `onCreate`, `onDestroy`, and `callback` methods.

```java
@Override
protected void onCreate(Bundle savedInstanceState) {
    Auth0 auth0 = new Auth0(${account.clientId}, ${account.namespace});
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

> If you require in-depth configuration, see [Lock Builder](/libraries/lock-android#lock-builder) for more information

> There are multiple ways of implementing the login dialog. What you see above is the default widget; however, if you want, you can use [your own UI](02-custom-login).