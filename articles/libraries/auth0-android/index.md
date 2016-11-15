---
description: How to install, initialize and use Auth0.Android
url: /libraries/auth0-android
---

# Auth0.Android

Auth0.Android is a client-side library for [Auth0](http://auth0.com).

## Requirements

Android API version 15 or newer

## Installation

Auth0.android is available through [Gradle](https://gradle.org/). To install it, simply add the following line to your `build.gradle` file:

```gradle
dependencies {
    compile "com.auth0.android:auth0:1.1.0"
}
```

## Usage

### Permissions 

Open your app's `AndroidManifest.xml` file and add the following permission.

```xml
<uses-permission android:name="android.permission.INTERNET" />
```

### Initializing Auth0

First create an instance of `Auth0` with your client information

```java
Auth0 account = new Auth0("${account.clientId}", "${account.namespace}");
```

Alternatively, you can save your client information in the `strings.xml` file using the following names:
 
```xml
<resources>
    <string name="com_auth0_client_id">${account.clientId}</string>
    <string name="com_auth0_domain">${account.namespace}</string>
</resources>

```

And then create a new Auth0 instance by passing an Android Context:

```java
Auth0 account = new Auth0(context);
```

### Using the Authentication API

The client provides methods to authenticate the user against Auth0 server.
 
Create a new instance by passing the account:
 
```java
AuthenticationAPIClient authentication = new AuthenticationAPIClient(account);
```

#### Login with database connection

```java
authentication
    .login("info@auth0.com", "a secret password", "my-database-connection")
    .start(new BaseCallback<Credentials>() {
        @Override
        public void onSuccess(Credentials payload) {
            //Logged in!
        }
    
        @Override
        public void onFailure(AuthenticationException error) {
            //Error!
        }
    });
```

::: panel-info Scope
Note that the default scope used is `openid`
:::

#### Passwordless Login

**Step 1:** Request the code

```java
authentication
    .passwordlessWithEmail("info@auth0.com", PasswordlessType.CODE, "my-passwordless-connection")
    .start(new BaseCallback<Credentials>() {
        @Override
        public void onSuccess(Void payload) {
            //Code sent!
        }
    
        @Override
        public void onFailure(AuthenticationException error) {
            //Error!
        }
    });
```

::: panel-info Scope
Note that the default scope used is `openid`
:::

**Step 2:** Input the code

```java
authentication
    .loginWithEmail("info@auth0.com", "a secret password", "my-passwordless-connection")
    .start(new BaseCallback<Credentials>() {
        @Override
        public void onSuccess(Credentials payload) {
            //Logged in!
        }
    
        @Override
        public void onFailure(AuthenticationException error) {
            //Error!
        }
    });
```


#### Signing up with database connection

```java
authentication
    .signUp("info@auth0.com", "a secret password", "my-database-connection")
    .start(new BaseCallback<Credentials>() {
        @Override
        public void onSuccess(Credentials payload) {
            //Signed Up & Logged in!
        }
    
        @Override
        public void onFailure(AuthenticationException error) {
            //Error!
        }
    });
```


#### Getting user information

```java
authentication
   .tokenInfo("user token")
   .start(new BaseCallback<Credentials>() {
       @Override
       public void onSuccess(UserProfile payload) {
           //Got the profile!
       }
   
       @Override
       public void onFailure(AuthenticationException error) {
           //Error!
       }
   });
```


### Using the Management API (Users)

The client provides methods to link and unlink users account.

Create a new instance by passing the account and the token:

```java
Auth0 account = new Auth0("${account.clientId}", "${account.namespace}");
UsersAPIClient users = new UsersAPIClient(account, "api token");
```
 
#### Linking users

```java
users
    .link("primary user id", "secondary user token")
    .start(new BaseCallback<List<UserIdentity>>() {
        @Override
        public void onSuccess(List<UserIdentity> payload) {
            //Got the updated identities! Accounts linked.
        }

        @Override
        public void onFailure(Auth0Exception error) {
            //Error!
        }
    });
```

#### Unlinking users

```java
users
    .unlink("primary user id", "secondary user id", "secondary provider")
    .start(new BaseCallback<List<UserIdentity>>() {
        @Override
        public void onSuccess(List<UserIdentity> payload) {
            //Got the updated identities! Accounts linked.
        }

        @Override
        public void onFailure(Auth0Exception error) {
            //Error!
        }
    });
```

### Updating user metadata

```java
Map<String, Object> metadata = new HashMap<>();
metadata.put("name", Arrays.asList("My", "Name", "Is"));
metadata.put("phoneNumber", "1234567890");

users
    .updateMetadata("user id", metadata)
    .start(new BaseCallback<UserProfile, ManagementException>() {
        @Override
        public void onSuccess(UserProfile payload) {
            //Metadata updated
        }
    
        @Override
        public void onFailure(ManagementException error) {
            //Error!
        }
    });
```

### Implementing web-based auth

First go to [Auth0 Dashboard](${manage_url}/#/clients) and go to your client's settings. Make sure you have in *Allowed Callback URLs* a URL with the following format:

```
https://${account.namespace}/android/{YOUR_APP_PACKAGE_NAME}/callback
```

Open your app's `AndroidManifest.xml` file and add the following permission.

```xml
<uses-permission android:name="android.permission.INTERNET" />
```

Also register the intent filters inside your activity's tag, so you can receive the call in your activity. Note that you will have to specify the callback url inside the `data` tag.

```xml
    <application android:theme="@style/AppTheme">

        <!-- ... -->
        
        <activity
            android:name="com.mycompany.MainActivity"
            android:theme="@style/MyAppTheme">
            
            <intent-filter>
                <action android:name="android.intent.action.VIEW" />

                <category android:name="android.intent.category.DEFAULT" />
                <category android:name="android.intent.category.BROWSABLE" />

                <data
                    android:host="${account.namespace}"
                    android:pathPrefix="/android/{YOUR_APP_PACKAGE_NAME}/callback"
                    android:scheme="https" />
            </intent-filter>
            
        </activity>
            
        <!-- ... -->

    </application>
```

In your `Activity` class define a constant like `WEB_REQ_CODE` that holds the request code (an `int`), that will be sent back with the intent once the auth is finished in the browser/webview. To capture the response, override the `OnActivityResult` and the `onNewIntent` methods and call `WebAuthProvider.resume()` with the received parameters:

```java
public class MyActivity extends Activity {

    private static final int WEB_REQ_CODE = 110;

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        switch (requestCode) {
            case WEB_REQ_CODE:
                lockView.showProgress(false);
                WebAuthProvider.resume(requestCode, resultCode, data);
                break;
            default:
                super.onActivityResult(requestCode, resultCode, data);
        }
    }
    
    @Override
    protected void onNewIntent(Intent intent) {
        if (WebAuthProvider.resume(intent)) {
            return;
        }
        super.onNewIntent(intent);
    }
}

```

#### Authenticate with a specific Auth0 connection

```java
WebAuthProvider.init(account)
                .withConnection("twitter")
                .start(MainActivity.this, authCallback, WEB_REQ_CODE);
```

#### Authenticate using a code grant with PKCE

Before you can use `Code Grant` in Android, make sure to go to your [client's section](${manage_url}/#/applications) in dashboard and check in the Settings that `Client Type` is `Native`.


```java
WebAuthProvider.init(account)
                .useCodeGrant(true)
                .start(MainActivity.this, authCallback, WEB_REQ_CODE);
```

#### Authenticate using a specific scope

```java
WebAuthProvider.init(account)
                .withScope("user openid")
                .start(MainActivity.this, authCallback, WEB_REQ_CODE);
```

::: panel-info Scope
Note that the default scope used is `openid`
:::

#### Authenticate using a specific connection scope

```java
WebAuthProvider.init(account)
                .withConnectionScope("email", "profile", "calendar:read")
                .start(MainActivity.this, authCallback, WEB_REQ_CODE);
```

#### Authenticate with Auth0 hosted login page

```java
WebAuthProvider.init(account)
                .start(MainActivity.this, authCallback, WEB_REQ_CODE);
```
