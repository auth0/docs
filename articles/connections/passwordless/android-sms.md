---
title: Using Passwordless Authentication on Android with SMS
---

# Authenticate users with a one-time code via SMS

<%= include('./_introduction-sms', { isMobile: true }) %>

## Setup

<%= include('./_setup-sms-twilio') %>

## Implementation

### Using Auth0 Lock

<%= include('../../_includes/_package', {
  org: 'auth0',
  repo: 'Mobile-Samples.Android',
  path: 'Passwordless-SMS/Lock'
}) %>

<%= include('./_introduction-lock', { repository: 'Lock.Android', platform: 'Android', docsUrl: 'lock-android' }) %>

Begin by adding the Lock SMS library to your `build.gradle` file:

```
compile 'com.auth0.android:lock-sms:1.10.+'
```

Once the user is successfully authenticated, LockActivity will send an Action using LocalBroadcasterManager and then end itself by calling finish(). The activity that will receive this Action and will show Lock needs to register a listener in the LocalBroadcastManager:

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
Intent smsIntent = new Intent(this, LockSMSActivity.class);
startActivity(smsIntent);
```

<%= include('./_using-lock-sms', { platform: 'android' }) %>

![](/media/articles/connections/passwordless/passwordless-sms-enter-code-android.png)

### Using your own UI

If you choose to build your own UI, first ask the user for their phone number. Then call `requestSMSVerificationCode` on the `APIClient`

```java
final APIClient client = lock.getAPIClient();
client.requestSMSVerificationCode(phoneNumber, new BaseCallback<Void>() {
    @Override
    public void onSuccess(Void payload) {
        // SMS sent, continue to next page.
    }

    @Override
    public void onFailure(Throwable error) {
        // Error sending email.
    }
});
```

Once the passwordless login process begins, ask the user for the one-time code. Then authenticate using that code:

```java
final APIClient client = lock.getAPIClient();
client.smsLogin(phoneNumber, passcode, authenticationParameters, new AuthenticationCallback() {
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
