---
title: Using Passwordless Authentication on Anroid with e-mail
connection: Email
image:
alias:
  - email
  - android
---

## Passwordless Authentication via e-mail

## Authenticate users with a one time code via e-mail

<%= include('./_introduction-email', { isMobile: true }) %>

### Setup

<%= include('./_setup-email') %>

### Implementation

### Using the Auth0 Lock

<%= include('./_introduction-lock', { repository: 'Lock.Android', platform: 'Android', docsUrl: 'lock-android' }) %>

Start by adding the Lock e-mail library to your `build.gradle` file:

```
compile 'com.auth0.android:lock-email:1.7.+'
```

When a user authenticates successfully, LockActivity will send an Action using LocalBroadcaster manager and then finish itself (by calling finish()). The activity that is interested in receiving this Action (In this case the one that will show Lock) needs to register a listener in the LocalBroadcastManager:

```java
// This activity will show Lock
public class HomeActivity extends Activity {
  private LocalBroadcastManager broadcastManager;

  private BroadcastReceiver authenticationReceiver = new BroadcastReceiver() {
    @Override
    public void onReceive(Context context, Intent intent) {
      UserProfile profile = intent.getParcelableExtra(Lock.AUTHENTICATION_ACTION_PROFILE_PARAMETER);
      Token token = intent.getParcelableExtra(Lock.AUTHENTICATION_ACTION_TOKEN_PARAMETER);
      Log.i(TAG, "User " + profile.getName() + " logged in");
    }
  };

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    //Customize your activity

    broadcastManager = LocalBroadcastManager.getInstance(this);
    broadcastManager.registerReceiver(authenticationReceiver, new IntentFilter(Lock.AUTHENTICATION_ACTION));
  }

  @Override
  protected void onDestroy() {
    super.onDestroy();
    broadcastManager.unregisterReceiver(authenticationReceiver);
  }
}
```

Then just call the activity:

```java
Intent emailIntent = new Intent(this, LockEmailActivity.class);
emailIntent.putExtra(LockEmailActivity.REQUEST_EMAIL_CODE_JWT, "API v2 JWT");
startActivity(emailIntent);
```

<%= include('./_using-lock-email', { platform: 'android' }) %>

![](/media/articles/connections/passwordless/passwordless-email-enter-code-android.png)

> A sample application is available in [the Lock.Android repository on GitHub](https://github.com/auth0/Lock.Android/tree/master/app/src/main).

### Using your own UI

If you choose to build your own UI you'll need to start by asking your users for their email address and call `requestEmailVerificationCode` on the `APIClient`

```java
final APIClient client = lock.getAPIClient();
client.requestEmailVerificationCode(email, new BaseCallback<Void>() {
    @Override
    public void onSuccess(Void payload) {
        // Email sent, continue to next page.
    }

    @Override
    public void onFailure(Throwable error) {
        // Error sending email.
    }
});
```

After having started the passwordless login you will need to ask the user for the one time code and authenticate using that code:

```java
final APIClient client = lock.getAPIClient();
client.emailLogin(email, passcode, authenticationParameters, new AuthenticationCallback() {
    @Override
    public void onSuccess(UserProfile userProfile, Token token) {
        // Login success, you can now use the userProfile or token
    }

    @Override
    public void onFailure(Throwable throwable) {
        // Login failed.
    }
});
```

## Authenticate users with a Magic Link via e-mail

<%= include('./_introduction-email-magic-link') %>

The next version of the Android library will also support this.