---
toc_title: Using Your Own UI
---

# Lock Android: Using Your Own UI

For this tutorial, you need to create a new account in [Auth0](https://www.auth0.com) and setup a new application. We will then implement mobile authentication in Android.

1.  Add the following dependency to your project:
    ```gradle
compile 'com.auth0.android:core:1.7.+'
    ```

2. Create a new instance of `APIClient` and store it in your `Application` object (or a singleton).
    ```java
    public class CustomApplication extends Application {
        private Lock lock;

        @Override
        public void onCreate() {
            lock = new LockBuilder()
                .clientId("YOUR_CLIENT_ID")
                .domainUrl("YOUR_AUTH0_DOMAIN_URL")
                .build();
            client = new APIClient("YOUR_CLIENT_ID", "YOUR_ACCOUNT_NAME");
        }

        public APIClient getClient() {
            return lock.getAPIClient();
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

        client.login(username, password, authenticationParameters, new AuthenticationCallback() {

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
