---
toc_title: Using Your Own UI
---

# Lock Android: Using Your Own UI

For this tutorial, you need to create a new account in [Auth0](https://www.auth0.com) and setup a new application. We will then implement mobile authentication in Android.

1.  Add the following dependency to your project:
  ```gradle
compile 'com.auth0.android:core:1.9.+'
  ```

2. Create a new instance of `APIClient` and store it in your `Application` object (or a singleton).
  ```java
  public class CustomApplication extends Application {
      private APIClient client;
  
      @Override
      public void onCreate() {
        String clientId = "YOUR_CLIENT_ID";
        String domainUrl = "YOUR_DOMAIN_URL"; //e.g. https://samples.auth0.com
        client = new APIClient(clientId, domainUrl, BaseAPIClient.AUTH0_US_CDN_URL);
      }
  
      public APIClient getClient() {
        return client;
      }
  }
  ```

3. Create a `Activity` for the Login Screen and declare `EditText` for *username* and *password*. (Also add them to your layout xml)
  ```java
  EditText usernameField;
  EditText passwordField;
  
  public void onCreate(Bundle savedInstanceState) {
      super.onCreate(savedInstanceState);
      usernameField = (EditText) view.findViewById(R.id.username_field);
      passwordField = (EditText) view.findViewById(R.id.password_field);
  
      //Customize your activity
  }
  ```
  > **Note**: The Layout of the Activity is up to you!. We only need these two fields to fetch username and password in this example.

4. Add a `OnClikListener` to a submit button in order to perform the login
  ```java
  Button accessButton = (Button) view.findViewById(R.id.submit_button);
  accessButton.setOnClickListener(new View.OnClickListener() {
      @Override
      public void onClick(View v) {
        login();
      }
});
  ```

  ```java
  private void login() {
      String username = usernameField.getText().toString().trim();
      String password = passwordField.getText().toString();
  
      //Validate username/password
  
      client.login(username, password, authenticationParameters, new   AuthenticationCallback() {  
  
          @Override
          public void onSuccess(UserProfile userProfile, Token token) {
              //User logged in
          }
  
          @Override
          public void onFailure(Throwable throwable) {
              //Login failed
          }
      });
  }
  ``` 

6. In your Sign up `Activity` add the following to sign up users with Auth0 Database connection:
  ```java
  EdiText usernameField;
  EditText passwordField;

  public void onCreate(Bundle savedInstanceState) {
      super.onCreate(savedInstanceState);
      usernameField = (EditText) view.findViewById(R.id.sign_up_username_field);
      passwordField = (EditText) view.findViewById(R.id.sign_up_password_field);
      Button accessButton = (Button) view.findViewById(R.id.submit_button);
      accessButton.setOnClickListener(new View.OnClickListener() {
          @Override
          public void onClick(View v) {
            signUp();
          }
      });

      //Customize your activity
  }
  ```

  ```java
  public void signUp() {
      String username = usernameField.getText().toString().trim();
      String password = passwordField.getText().toString();

      //Validate username/password

      client.signUp(username, password, authenticationParameters, new AuthenticationCallback() {
          @Override
          public void onSuccess(UserProfile profile, Token token) {
              //User signed up + logged in
          }

          @Override
          public void onFailure(Throwable error) {
              //Sign up failed
          }
      });
  }
  ```
  > More details about the parameters you can use check [this wiki page](/libraries/lock/sending-authentication-parameters).

## Social Authentication

1. Include native integration libs in your `build.gradle`:
  ```gradle
  compile 'com.auth0.android:lock-facebook:2.0.+'
  compile 'com.auth0.android:lock-googleplus:2.0.+'
  ```
  
1. Configure Facebook Native integration and store the reference (e.g. in your Application class)
  ```java
  facebook = new FacebookIdentityProvider(this);
  ```
  > **Note**: You need to [configure](https://developers.facebook.com/docs/android/getting-started#app_id) your Android app for Facebook 

1. Configure Google+ Native integration and store the reference (e.g. in your Application class)
  ```java
  googleplus = new GooglePlusIdentityProvider(this);
  ```
  > **Note**: Before using Google+, you need to register your Application with Google as explained in this [guide](https://developers.google.com/+/mobile/android/getting-started)
  
1. Fetch your Auth0 application information, you can do this from your Main activity, so we can start start authenticating with either Social Identity Provider (IdP from now on)
  ```java
  CustomApplication app = ... //Fetch your application object
  app.getAPIClient().fetchApplicationInfo(new BaseCallback<Application>() {
      @Override
      public void onSuccess(Application application) {
          //All is good, we can continue
      }

      @Override
      public void onFailure(Throwable throwable) {
          //Handle failure
      }
  });
  ```

1. In your Activity that will trigger authentication, create a property to store the current IdP handler
  ```java
  private IdentityProvider identityProvider;
  ```
  > We recommend cleaning up this property when `onDestroy()` is called
  
1. Reset any IdP state when Activity is stopped
  ```java
  @Override
  protected void onStop() {
    super.onStop();
    facebook.stop();
    googleplus.stop();
  }
  ```
  
1. Override `onActivityResult(int, int, Intent)` in the Activity and pass the information to current IdP handler
  ```java
  @Override
  protected void onActivityResult(int requestCode, int resultCode, Intent data) {
      super.onActivityResult(requestCode, resultCode, data);
      if (identity != null) {
          identity.authorize(this, requestCode, resultCode, data);
      }
  }
  ```

1. Now we can authenticate with either IdP
  ```java
  identityProvider = facebook;
  identityProvider.setCallback(new IdentityProviderCallback() {
      @Override
      public void onFailure(Dialog dialog) {
          //Authentication with IdP failed, we just need to show the Dialog
          dialog.show();
      }

      @Override
      public void onFailure(int titleResource, int messageResource, Throwable throwable) {
          //An error ocurred with Auth0 integration
          // title & message for an error are always returned
          identityProvider.clearSession();
      }

      @Override
      public void onSuccess(String serviceName, String accessToken) {
          //Authenticated with the IdP, the next step is to authenticate with Auth0
          authenticateWithAuth0(serviceName, accessToken);
      }

      @Override
      public void onSuccess(Token token) {
          //Successfully authenticated with Auth0. 
          // This method is only called when there is no native integration (e.g. Instagram)
      }
  });
  IdentityProviderRequest request = new IdentityProviderAuthenticationRequestEvent(Strategies.Facebook.getName());
  CustomApplication app = ... //Fetch your application object
  identityProvider.start(this, request, app.getAPIClient().getApplication());
  ```
  
1. Send IdP credentials to Auth0
  ```java
  private void authenticateWithAuth0(String serviceName, String accessToken) {
    CustomApplication app = ... //Fetch your application object
    app.getAPIClient().socialLogin(serviceName, accessToken, null, new AuthenticationCallback() {
          @Override
          public void onSuccess(UserProfile profile, Token token) {
              //Successfully authenticated with Auth0.
          }

          @Override
          public void onFailure(Throwable error) {
              //There was an error calling Auth0
          }
      });
  }
  ```
