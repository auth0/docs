---
toc_title: Build your own UI
description: Customize the UI of Lock in your App
lodash: true
---

# Lock Android: Build your own UI

<% if (configuration.api && configuration.thirdParty) { %>

<div class="package" style="text-align: center;">
  <blockquote>
   <a href="/native-mobile-samples/master/create-package?path=Android/custom-ui-sample&type=replace&filePath=Android/custom-ui-sample/app/src/main/res/values/auth0.xml${account.clientParam}" class="btn btn-lg btn-success btn-package" style="text-transform: uppercase; color: white">
      <span style="display: block">Download Android Custom UI Sample</span>
      <% if (account.userName) { %>
      <span class="smaller" style="display:block; font-size: 11px">with your Auth0 API Keys already set and configured</span>
      <% } %>
    </a>
  </blockquote>
</div>
<% } else  { %>

<div class="package" style="text-align: center;">
  <blockquote>
    <a href="/native-mobile-samples/master/create-package?path=Android/custom-ui-sample&type=replace&filePath=Android/custom-ui-sample/app/src/main/res/values/auth0.xml${account.clientParam}" class="btn btn-lg btn-success btn-package" style="text-transform: uppercase; color: white">
      <span style="display: block">Download Android Custom UI Sample</span>
      <% if (account.userName) { %>
      <span class="smaller" style="display:block; font-size: 11px">with your Auth0 API Keys already set and configured</span>
      <% } %>
    </a>
  </blockquote>
</div>

<% } %>

**Otherwise, if you already have an existing application, please follow the steps below.**

> We are going to use the library [EventBus](https://github.com/greenrobot/EventBus) in order to post authentication related events like *authentication done* and  *authentication failed*

1.  Add the following dependencies to your project:
  ```gradle
  compile 'com.auth0.android:core:1.11.+'
  compile 'de.greenrobot:eventbus:2.4.+'
  ```

1. Create a new resource file named `auth0.xml` under `values` and add the following content, replacing the values with your Auth0 ClientId and Domain
  ```xml
  <?xml version="1.0" encoding="utf-8"?>
  <resources>
      <string name="auth0_client_id">${account.clientId}</string>
      <string name="auth0_domain_name">${account.namespace}</string>
  </resources>
  ```

1. Create two classes `AuthenticationEvent` and `ErrorEvent` that will represent a successful authentication or a failed one
  ```java
  public class AuthenticationEvent {
      private final UserProfile profile;
      private final Token token;

      public AuthenticationEvent(UserProfile profile, Token token) {
          this.profile = profile;
          this.token = token;
      }

      public Token getToken() { return token; }

      public UserProfile getProfile() { return profile; }
  }

  public class ErrorEvent {
      private Dialog dialog;
      private int title;
      private int message;
      private Throwable throwable;

      public ErrorEvent(Dialog dialog) {
          this.dialog = dialog;
      }

      public ErrorEvent(int title, int message, Throwable throwable) {
          this.title = title;
          this.message = message;
          this.throwable = throwable;
      }
  }
  ```

1. Then in your Login *Activity* add the following fields
  ```java
      private APIClient client;
      private EventBus eventBus;
  ```

1. In the same *Activity* `onCreate` method add the following lines to initialize **Auth0** and the fields we added earlier
  ```java
      Auth0 auth0 = new Auth0(getString(R.string.auth0_client_id), getString(R.string.auth0_domain_name));
      this.client = auth0.newAPIClient();
      this.eventBus = new EventBus();
  ```

1. When you need to login your user with email/password credentials, just paste the following code
  ```java
      String email = ... // Get email
      String password = ... // Get password
      client.login(email, password, null, new AuthenticationCallback() {
          @Override
          public void onSuccess(UserProfile userProfile, Token token) {
              eventBus.post(new AuthenticationEvent(userProfile, token));
          }

          @Override
          public void onFailure(Throwable throwable) {
              eventBus.post(new ErrorEvent(R.string.login_failed_title, R.string.login_failed_message, throwable));
          }
      });
  ```
  > More details about the parameters you can use check [this wiki page](/libraries/lock-android/sending-authentication-parameters).

1. Finally handle both `AuthenticationEvent` and `ErrorEvent`
  ```java
      @Override
      protected void onStart() {
          super.onStart();
          eventBus.register(this);
      }

      @Override
      protected void onStop() {
          super.onStop();
          eventBus.unregister(this);
      }

      public void onEvent(ErrorEvent event) {
        //Handle Error
      }

      public void onEvent(AuthenticationEvent event) {
        //Handle authentication
      }
  ```

## Social Authentication

1. Include the following libraries in your `build.gradle`:
  ```gradle
      compile 'com.auth0.android:identity-core:1.9.+'
      compile 'com.auth0.android:lock-facebook:2.1.+'
      compile 'com.auth0.android:lock-googleplus:2.1.+'
  ```

1. In your `auth0.xml` file add the following entry
  ```xml
  <string name="auth0_scheme">a0${account.clientId.toLowerCase()}</string>
  ```

1. Configure your Login *Activity* adding the following intent filters in your `AndroidManifest.xml` file
  ```xml
  <intent-filter>
      <action android:name="android.intent.action.VIEW"/>
      <category android:name="android.intent.category.DEFAULT"/>
      <category android:name="android.intent.category.BROWSABLE"/>
      <data android:scheme="@string/auth0_scheme" android:host="@string/auth0_domain_name"/>
  </intent-filter>
  ```

1. Create a new class that implements `IdentityProviderCallback`, that will handle social authentication (via native integration or using web browser) and post a new event either on success or failure
  ```java
  public class MyIdentityProviderCallback implements IdentityProviderCallback {
      private final EventBus bus;
      private final APIClient client;

      public MyIdentityProviderCallback(EventBus bus, APIClient client) {
          this.bus = bus;
          this.client = client;
      }

      @Override
      public void onFailure(Dialog dialog) {
          //Authentication failed and a Error dialog is provided
          bus.post(new ErrorEvent(dialog));
      }

      @Override
      public void onFailure(int title, int message, Throwable throwable) {
          //Authentication failed and a title & message resource are provided.
          //The throwable parameter will include the reason (if any)
          bus.post(new ErrorEvent(title, message, throwable));
      }

      @Override
      public void onSuccess(String serviceName, String accessToken) {
          //Authenticate with Auth0 using the IdP token obtained from a native integration like Facebook
          client.socialLogin(serviceName, accessToken, null, new AuthenticationCallback() {
              @Override
              public void onSuccess(UserProfile userProfile, Token token) {
                  bus.post(new AuthenticationEvent(userProfile, token));
              }

              @Override
              public void onFailure(Throwable throwable) {
                  bus.post(new ErrorEvent(R.string.login_failed_title, R.string.login_failed_message, throwable));
              }
          });
      }

      @Override
      public void onSuccess(final Token token) {
          //Already authenticated with Auth0 using Web Browser (when no native integration is avaliable), then we just fetch the user's profile
          client.fetchUserProfile(token.getIdToken(), new BaseCallback<UserProfile>() {
              @Override
              public void onSuccess(UserProfile profile) {
                  bus.post(new AuthenticationEvent(profile, token));
              }

              @Override
              public void onFailure(Throwable throwable) {
                  bus.post(new ErrorEvent(R.string.login_failed_title, R.string.login_failed_message, throwable));
              }
          });
      }
  }
  ```

1. In your Login *Activity* add the following fields
  ```java
      private WebIdentityProvider webProvider;
      private IdentityProvider identityProvider;
      private GooglePlusIdentityProvider googleplus;
      private FacebookIdentityProvider facebook;
  ```

1. And implement the following methods
  ```java
      @Override
      protected void onStop() {
          webProvider.stop();
      }

      @Override
      protected void onNewIntent(Intent intent) {
          super.onNewIntent(intent);
          Log.v(TAG, "Received new Intent with URI " + intent.getData());
          if (identity != null) {
              identity.authorize(this, IdentityProvider.WEBVIEW_AUTH_REQUEST_CODE, RESULT_OK, intent);
          }
      }

      @Override
      protected void onActivityResult(int requestCode, int resultCode, Intent data) {
          super.onActivityResult(requestCode, resultCode, data);
          if (identity != null) {
              identity.authorize(this, requestCode, resultCode, data);
          }
      }
  ```

1. In the method `onCreate` initialize Auth0 web provider and store it in a field
  ```java
      final MyIdentityProviderCallback callback = new MyIdentityProviderCallback(eventBus, client);
      this.webProvider = new WebIdentityProvider(new CallbackParser(), auth0.getClientId(), auth0.getAuthorizeUrl());
      this.webProvider.setCallback(callback);
  ```

1. Configure Facebook Native integration
  ```java
    this.facebook = new FacebookIdentityProvider(this);
    this.facebook.setCallback(callback);
  ```
  > **Note**: You need to [configure](https://developers.facebook.com/docs/android/getting-started#app_id) your Android app for Facebook

1. Configure Google+ Native integrationApplication class)
  ```java
    this.googleplus = new GooglePlusIdentityProvider(this);
    this.googleplus.setCallback(callback);
  ```
  > **Note**: Before using Google+, you need to register your Application with Google as explained in this [guide](https://developers.google.com/+/mobile/android/getting-started)

1. To trigger Facebook authentication just add the following code
  ```java
    identity = facebook;
    identity.start(this, Strategies.Facebook.getName());
  ```

1. To trigger Google+ authentication just add the following code
  ```java
    identity = googleplus;
    identity.start(this, Strategies.GooglePlus.getName());
  ```

1. To trigger authentication with any IdP without native integration just add the following code
  ```java
    identity = webProvider;
    identity.start(this, Strategies.Twitter.getName());
  ```
