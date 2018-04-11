---
description: The Android implementation of the API for the Mobile + API architecture scenario
url: /architecture-scenarios/application/mobile-api/mobile-implementation-android
toc: true
---

# Mobile + API: Android Implementation for the Mobile App

This document is part of the [Mobile + API Architecture Scenario](/architecture-scenarios/application/mobile-api) and it explains how to implement the mobile application in Android. Please refer to the scenario for information on the implemented solution.

## 1. Set Up the Application

<%= include('../../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-pnp-exampleco-timesheets',
  path: 'timesheets-mobile/android',
  requirements: [
    'Android Studio 2.3',
    'Android SDK 25',
    'Emulator - Nexus 5X - Android 6.0'
  ]
}) %>

### Set the Dependencies

For this implementation, we will use the following dependencies within the app’s `build.gradle` file:

- [Auth0.Android](https://github.com/auth0/Auth0.Android): this package enables integration with Auth0 to authenticate users.
- [OkHttp](http://square.github.io/okhttp/): this package provides an HTTP application to make requests to the Node.JS API.
- [JWTDecode.Android](https://github.com/auth0/JWTDecode.Android): this package will assist with decoding JWTs.
- AppCompat: this package lets us use the toolbar widget for navigation in our activities.

```gradle
dependencies {
    compile 'com.squareup.okhttp:okhttp:2.7.5'
    compile 'com.auth0.android:auth0:1.10.0'
    compile 'com.auth0.android:jwtdecode:1.1.1'
    compile 'com.android.support:appcompat-v7:25.3.1'
    testCompile 'junit:junit:4.12'
}
```

### Update the Manifest

Open the application's `AndroidManifest.xml` and add the internet permission:

```xml
<uses-permission android:name="android.permission.INTERNET" />
```

We’ll also update the application details to utilize the Toolbar widget:

```xml
    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/Theme.AppCompat.Light.NoActionBar">
    </application>
```

### Set Configuration Values

Set your Auth0 Client ID, Auth0 Domain, and API’s url in the `strings.xml` resource located in `/res/values/strings.xml`:

```xml
<resources>
    <string name="app_name">ExampleCo Timesheets</string>
    <string name="login">Log in</string>
    <string name="auth0_client_id">...</string>
    <string name="auth0_domain">...</string>
    <string name="api_url">http://10.0.2.2:8080/timesheets</string>
</resources>
```

### Create Package Structure

For this implementation, create directories for activities, models, and utils in the application package.

- `activities/`: this package will contain the `LoginActivity.java`, `TimeSheetActivity.java`, `FormActivity.java`, and `UserActivity.java`.
- `models/`: this package will contain the `TimeSheet.java` and `User.java` data models.
- `utils/`: this package will contain the `UserProfileManager.java`, `TimeSheetAdapter.java`, and `ImageTask.java`

## 2. Authorize the User

### Update the Manifest

Open the app's `AndroidManifest.xml` and add the `LoginActivity`:

```xml
<activity
            android:name="com.auth0.samples.activities.LoginActivity"
            android:launchMode="singleTask">

            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>

            <intent-filter>
                <action android:name="android.intent.action.VIEW" />

                <category android:name="android.intent.category.DEFAULT" />
                <category android:name="android.intent.category.BROWSABLE" />

                <data
                    android:host="@string/auth0_domain"
                    android:pathPrefix="/android/com.auth0.samples/callback"
                    android:scheme="demo" />
            </intent-filter>
</activity>
```

### Create the Login Activity Layout

Next create `login_activity.xml`, the layout for the `LoginActivity`:

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    android:padding="15dp">

    <ImageView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_gravity="center"
        android:layout_marginTop="30dp"
        android:src="@drawable/logo" />

    <Button
        android:id="@+id/loginButton"
        android:layout_width="300dp"
        android:layout_height="wrap_content"
        android:layout_gravity="center"
        android:layout_marginTop="30dp"
        android:background="@android:color/white"
        android:padding="15dp"
        android:text="@string/login" />

</LinearLayout>
```

### Create the Login Activity

The `LoginActivity` will handle user authorization and be the initial screen users see. We'll create a `login()` method to initialize a `WebAuthProvider` and start authentication. Ensure you provide the correct scheme, audience, and scope to the `WebAuthProvider`. For this implementation we will use:

- __scheme__: `demo`
- __audience__: `https://api.exampleco.com/timesheets` (the Node.JS API)
- __response_type__: `code`
- __scope__: `create:timesheets read:timesheets openid profile email offline_access`. These scopes will enable us to `POST` and `GET` to the Node.JS API, as well as retrieve the user profile and a Refresh Token.

```java
private void login() {
        Auth0 auth0 = new Auth0(getString(R.string.auth0_client_id), getString(R.string.auth0_domain));
        auth0.setOIDCConformant(true);

        WebAuthProvider.init(auth0)
                .withScheme("demo")
                .withAudience("https://api.exampleco.com/timesheets")
                .withResponseType(ResponseType.CODE)
                .withScope("create:timesheets read:timesheets openid profile email offline_access")
                .start(
                    // ...
                );
}
```

In the `login()` method, upon successful authentication we'll redirect the user to the `TimeSheetActivity`.

```java
package com.auth0.samples.activities;

import android.app.Activity;
import android.app.Dialog;
import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;

import com.auth0.android.Auth0;
import com.auth0.android.authentication.AuthenticationException;
import com.auth0.android.jwt.JWT;
import com.auth0.android.provider.AuthCallback;
import com.auth0.android.provider.ResponseType;
import com.auth0.android.provider.WebAuthProvider;
import com.auth0.android.result.Credentials;
import com.auth0.samples.R;
import com.auth0.samples.models.User;
import com.auth0.samples.utils.CredentialsManager;
import com.auth0.samples.utils.UserProfileManager;

public class LoginActivity extends Activity {

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.login_activity);
        Button loginWithTokenButton = (Button) findViewById(R.id.loginButton);
        loginWithTokenButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                login();
            }
        });
    }

    @Override
    protected void onNewIntent(Intent intent) {
        if (WebAuthProvider.resume(intent)) {
            return;
        }
        super.onNewIntent(intent);
    }

    private void login() {
        Auth0 auth0 = new Auth0(getString(R.string.auth0_client_id), getString(R.string.auth0_domain));
        auth0.setOIDCConformant(true);

        WebAuthProvider.init(auth0)
                .withScheme("demo")
                .withAudience("https://api.exampleco.com/timesheets")
                .withResponseType(ResponseType.CODE)
                .withScope("create:timesheets read:timesheets openid profile email")
                .start(LoginActivity.this, new AuthCallback() {
                    @Override
                    public void onFailure(@NonNull final Dialog dialog) {
                        runOnUiThread(new Runnable() {
                            @Override
                            public void run() {
                                dialog.show();
                            }
                        });
                    }

                    @Override
                    public void onFailure(final AuthenticationException exception) {
                        runOnUiThread(new Runnable() {
                            @Override
                            public void run() {
                                Toast.makeText(LoginActivity.this, "Error: " + exception.getMessage(), Toast.LENGTH_SHORT).show();
                            }
                        });
                    }

                    @Override
                    public void onSuccess(@NonNull final Credentials credentials) {
                        runOnUiThread(new Runnable() {
                            @Override
                            public void run() {
                                Toast.makeText(LoginActivity.this, "Log In - Success", Toast.LENGTH_SHORT).show();
                            }
                        });
                        startActivity(new Intent(LoginActivity.this, TimeSheetActivity.class));
                    }
                });
    }
}
```

### Store the Credentials

To store the credentials received after login, we’ll use the `CredentialsManager` from the Auth0.Android library and [SharedPreferences](https://developer.android.com/reference/android/content/SharedPreferences.html) for storage.

Before initializing the `WebAuthProvider` in the `login()` method, we can create the `CredentialsManager`. Passing an `AuthenticationAPIClient` to the `CredentialsManager` enables it to refresh the Access Tokens if they are expired.

```java
private void login() {
        Auth0 auth0 = new Auth0(getString(R.string.auth0_client_id), getString(R.string.auth0_domain));
        auth0.setOIDCConformant(true);

        AuthenticationAPIClient authAPIClient = new AuthenticationAPIClient(auth0);
        SharedPreferencesStorage sharedPrefStorage = new SharedPreferencesStorage(this);
        final CredentialsManager credentialsManager = new CredentialsManager(authAPIClient, sharedPrefStorage);

        WebAuthProvider.init(auth0)
        // ...
    }
```

Now update the `login()` method so that credentials are stored via the `CredentialsManager` after a successful authentication.

```java
// ...
@Override
public void onSuccess(@NonNull final Credentials credentials) {
    runOnUiThread(new Runnable() {
        @Override
        public void run() {
            Toast.makeText(LoginActivity.this, "Log In - Success", Toast.LENGTH_SHORT).show();
        }
    });

    credentialsManager.saveCredentials(credentials);
    startActivity(new Intent(LoginActivity.this, TimeSheetActivity.class));
// ...
}
```

## 3. Get the User Profile

### Create the User Model

Create a simple User model that will be utilized by the `UserProfileManager` and `UserActivity`.

```java
package com.auth0.samples.models;

public class User {
    private String email;
    private String name;
    private String pictureURL;

    public User(String email, String name, String pictureURL) {
        this.email = email;
        this.name = name;
        this.pictureURL = pictureURL;
    }

    public String getEmail() {
        return email;
    }

    public String getName() {
        return name;
    }

    public String getPictureURL() {
        return pictureURL;
    }
}

```

### Store the User Profile

To handle storing user profile information we'll create a manager class `UserProfileManager`. The `UserProfileManager` will use [SharedPreferences](https://developer.android.com/reference/android/content/SharedPreferences.html) to store data.

```java
package com.auth0.samples.utils;

import android.content.Context;
import android.content.SharedPreferences;

import com.auth0.android.result.UserProfile;
import com.auth0.samples.models.User;

public class UserProfileManager {

    private static final String PREFERENCES_NAME = "auth0_user_profile";
    private static final String EMAIL = "email";
    private static final String NAME = "name";
    private static final String PICTURE_URL = "picture_url";

    public static void saveUserInfo(Context context, User userInfo) {
        SharedPreferences sp = context.getSharedPreferences(
                PREFERENCES_NAME, Context.MODE_PRIVATE);

        sp.edit()
                .putString(EMAIL, userInfo.getEmail())
                .putString(NAME, userInfo.getName())
                .putString(PICTURE_URL, userInfo.getPictureURL())
                .apply();
    }

    public static User getUserInfo(Context context) {
        SharedPreferences sp = context.getSharedPreferences(
                PREFERENCES_NAME, Context.MODE_PRIVATE);

        return new User(
                sp.getString(EMAIL, null),
                sp.getString(NAME, null),
                sp.getString(PICTURE_URL, null)
        );
    }

    public static void deleteUserInfo(Context context) {
        SharedPreferences sp = context.getSharedPreferences(
                PREFERENCES_NAME, Context.MODE_PRIVATE);

        sp.edit()
                .putString(EMAIL, null)
                .putString(NAME, null)
                .putString(PICTURE_URL, null)
                .apply();
    }
}
```

Next, update the `login()` method in the `LoginActivity` to retrieve the ID Token and get the user profile from the token with the JWTDecode.Android library. Then store the user profile with the `UserProfileManager`.

```java
// ...
@Override
public void onSuccess(@NonNull final Credentials credentials) {
    runOnUiThread(new Runnable() {
        @Override
        public void run() {
            Toast.makeText(LoginActivity.this, "Log In - Success", Toast.LENGTH_SHORT).show();
        }
    });

    credentialsManager.saveCredentials(credentials);
    JWT jwt = new JWT(credentials.getIdToken());
    User user = new User(
            jwt.getClaim("email").asString(),
            jwt.getClaim("name").asString(),
            jwt.getClaim("picture").asString()
    );
    UserProfileManager.saveUserInfo(LoginActivity.this, user);

    startActivity(new Intent(LoginActivity.this, TimeSheetActivity.class));
}
// ...
```

## 4. Display UI Elements Conditionally Based on Scope

To determine whether a user has permissions to perform certain actions, we can look at the `scope` that was granted to the user during the authentication process. The `scope` will contain a string with all the scopes granted to a user, so to determine whether a particular scope was granted, we simply need to look whether the string of scopes contain the substring for that particular scope.

### Store the Scope

First, we can update the `User` class to store the granted scopes, and then provide a helper method, `hasScope()` which can be used to determine whether the granted scopes contain a particular scope:

```java
public class User {
    private String email;
    private String name;
    private String pictureURL;
    private String grantedScope;

    public User(String email, String name, String pictureURL, String grantedScope) {
        this.email = email;
        this.name = name;
        this.pictureURL = pictureURL;
        this.grantedScope = grantedScope;
    }

    public String getEmail() {
        return email;
    }

    public String getGrantedScope() { 
        return grantedScope; 
    }

    public String getName() {
        return name;
    }

    public String getPictureURL() {
        return pictureURL;
    }

    public Boolean hasScope(String scope) {
        return grantedScope.contains(scope);
    }
}
```

Also remember to update the `UserProfileManager` to store the extra field:

```java
public class UserProfileManager {

    private static final String PREFERENCES_NAME = "auth0_user_profile";
    private static final String EMAIL = "email";
    private static final String NAME = "name";
    private static final String PICTURE_URL = "picture_url";
    private static final String SCOPE = "scope";

    public static void saveUserInfo(Context context, User userInfo) {
        SharedPreferences sp = context.getSharedPreferences(
                PREFERENCES_NAME, Context.MODE_PRIVATE);

        sp.edit()
                .putString(EMAIL, userInfo.getEmail())
                .putString(NAME, userInfo.getName())
                .putString(PICTURE_URL, userInfo.getPictureURL())
                .putString(SCOPE, userInfo.getGrantedScope())
                .apply();
    }

    public static User getUserInfo(Context context) {
        SharedPreferences sp = context.getSharedPreferences(
                PREFERENCES_NAME, Context.MODE_PRIVATE);

        return new User(
                sp.getString(EMAIL, null),
                sp.getString(NAME, null),
                sp.getString(PICTURE_URL, null),
                sp.getString(SCOPE, null)
        );
    }

    public static void deleteUserInfo(Context context) {
        SharedPreferences sp = context.getSharedPreferences(
                PREFERENCES_NAME, Context.MODE_PRIVATE);

        sp.edit()
                .putString(EMAIL, null)
                .putString(NAME, null)
                .putString(PICTURE_URL, null)
                .putString(SCOPE, null)
                .apply();
    }
}
```

Next, update the `LoginActivity` to pass along the `scope` so it can be stored in the `User` object:

```java
// ...
@Override
public void onSuccess(@NonNull final Credentials credentials) {
    runOnUiThread(new Runnable() {
        @Override
        public void run() {
            Toast.makeText(LoginActivity.this, "Log In - Success", Toast.LENGTH_SHORT).show();
        }
    });

    credentialsManager.saveCredentials(credentials);
    JWT jwt = new JWT(credentials.getIdToken());
    String scopes = credentials.getScope();
    User user = new User(
            jwt.getClaim("email").asString(),
            jwt.getClaim("name").asString(),
            jwt.getClaim("picture").asString(),
            credentials.getScope()
    );
    UserProfileManager.saveUserInfo(LoginActivity.this, user);

    startActivity(new Intent(LoginActivity.this, TimeSheetActivity.class));
}
// ...
```

### Display Approval Menu Based on Scope

Now, we can display certain UI elements based on whether the user was granted a particular scope. As an example, we have an approval menu item which should only be visible to users who have been granted the `approve:timesheets` scope. 

Below you can see the code from the `BaseActivity` class which checks whether a user has the `approve:timesheets` scope, and based on that will set the visibility of the menu item which displays the approval activity:

```java
// ...
@Override
public boolean onCreateOptionsMenu(Menu menu) {
    Boolean canApprove = UserProfileManager.getUserInfo(this).hasScope("approve:timesheets");
    MenuInflater inflater = getMenuInflater();
    inflater.inflate(R.menu.actions, menu);
    MenuItem item = menu.findItem(R.id.action_approve);
    item.setVisible(canApprove);
    return super.onCreateOptionsMenu(menu);
}
// ...
```

## 5. Call the API

### Update the Manifest

Open the app's `AndroidManifest.xml` and add the `TimeSheetActivity`:

```xml
<activity android:name="com.auth0.samples.activities.TimeSheetActivity" />
```

### Create the Timesheets Activity Layouts

Next create `timesheet_activity.xml`, the layout for the `TimeSheetsActivity`:

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:orientation="vertical"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <android.support.v7.widget.Toolbar
        android:id="@+id/navToolbar"
        android:layout_width="match_parent"
        android:layout_height="?attr/actionBarSize"
        android:background="?attr/colorPrimary"
        android:elevation="4dp"
        android:theme="@style/ThemeOverlay.AppCompat.ActionBar"
        app:popupTheme="@style/ThemeOverlay.AppCompat.Light"/>

    <ListView
        android:id="@+id/timesheetList"
        android:layout_width="match_parent"
        android:layout_height="match_parent" />
</LinearLayout>
```

The `ListView` widget will contain individual entries which are represented by the `item_entry.xml` layout:

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:orientation="vertical" android:layout_width="match_parent"
    android:layout_height="match_parent">

    <TextView
        android:id="@+id/tvUserID"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="UserID"
        android:textStyle="bold" />
    <TextView
        android:id="@+id/tvDate"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Date" />

    <TextView
        android:id="@+id/tvProjectName"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Project"
        android:textStyle="italic" />
    <TextView
        android:id="@+id/tvHours"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Hours" />
</LinearLayout>
```

And for the Toolbar navigation on the `TimeSheetActivity`, we’ll create the `timesheet_action_menu.xml` menu resource (`/res/menu/`):

```xml
<?xml version="1.0" encoding="utf-8"?>
<menu xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto">

    <item
        android:id="@+id/action_profile"
        android:title="Profile"
        app:showAsAction="always" />
    <item
        android:id="@+id/action_new"
        android:title="New Timesheet"
        app:showAsAction="always" />
</menu>
```

### Create the Timesheet Model

Create a model for working with timesheet data in our views:

```java
package com.auth0.samples.models;

import java.util.Date;

/**
 * Created by ej on 7/9/17.
 */

public class TimeSheet {
    private String userID;
    private String projectName;
    private String date;
    private double hours;
    private int ID;

    public TimeSheet(String gUserID, String gProjectName, String gDate, double gHours, int gID) {
        this.userID = gUserID;
        this.projectName = gProjectName;
        this.date = gDate;
        this.hours = gHours;
        this.ID = gID;
    }

    public String getUserID() {
        return userID;
    }

    public String getProjectName() {
        return projectName;
    }

    public String getDateString() {
        return date;
    }

    public double getHours() {
        return hours;
    }

    public int getID() {
        return ID;
    }
}
```

### Create the Timesheet Adapter

The `TimeSheetAdapter` is a utility class which will take an array of timesheet entries and apply them to the `ListView` on the `TimeSheetActivity`.

```java
package com.auth0.samples.utils;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.TextView;
import com.auth0.samples.R;
import com.auth0.samples.models.TimeSheet;
import java.util.ArrayList;

public class TimeSheetAdapter extends ArrayAdapter<TimeSheet> {

    public TimeSheetAdapter(Context context, ArrayList<TimeSheet> timesheets) {
        super(context, 0, timesheets);
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {

        TimeSheet timesheet = getItem(position);

        if (convertView == null) {
            convertView = LayoutInflater.from(getContext()).inflate(R.layout.item_entry, parent, false);
        }

        TextView tvUserID = (TextView) convertView.findViewById(R.id.tvUserID);
        TextView tvDate = (TextView) convertView.findViewById(R.id.tvDate);
        TextView tvProjectName = (TextView) convertView.findViewById(R.id.tvProjectName);
        TextView tvHours = (TextView) convertView.findViewById(R.id.tvHours);

        tvUserID.setText(timesheet.getUserID());
        tvDate.setText(timesheet.getDateString());
        tvProjectName.setText(timesheet.getProjectName());
        tvHours.setText(Double.toString(timesheet.getHours()));

        return convertView;
    }
}
```

### Create the Timesheet Activity

The `TimeSheetActivity` displays the timesheet entries for the logged in user which are stored on the server.

- The `@string/api_url` is set to `http://10.0.2.2:8080/timesheets` so the Android Emulator can connect to the Node.JS API running on `http://localhost:8080`.
- The `callAPI()` method retrieves timesheets from the Node.JS API.
- The `processResults()` method takes the JSON response from `callAPI()` and converts it `TimeSheet` objects.
- The `onCreateOptionsMenu()` and `onOptionsItemSelected()` methods handle the Toolbar widget navigation functionality.

```java
package com.auth0.samples.activities;

import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.util.Log;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.widget.ListView;
import android.widget.Toast;

import com.auth0.android.Auth0;
import com.auth0.android.authentication.AuthenticationAPIClient;
import com.auth0.android.authentication.storage.CredentialsManager;
import com.auth0.android.authentication.storage.CredentialsManagerException;
import com.auth0.android.authentication.storage.SharedPreferencesStorage;
import com.auth0.android.callback.BaseCallback;
import com.auth0.android.result.Credentials;
import com.auth0.samples.R;
import com.auth0.samples.utils.TimeSheetAdapter;
import com.auth0.samples.models.TimeSheet;
import com.squareup.okhttp.Callback;
import com.squareup.okhttp.OkHttpClient;
import com.squareup.okhttp.Request;
import com.squareup.okhttp.Response;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.util.ArrayList;

public class TimeSheetActivity extends AppCompatActivity {

    private ArrayList<TimeSheet> timesheets = new ArrayList<>();

    private String accessToken;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.timesheet_activity);
        Toolbar navToolbar = (Toolbar) findViewById(R.id.navToolbar);
        setSupportActionBar(navToolbar);

        Auth0 auth0 = new Auth0(getString(R.string.auth0_client_id), getString(R.string.auth0_domain));
        auth0.setOIDCConformant(true);

        AuthenticationAPIClient authAPIClient = new AuthenticationAPIClient(auth0);
        SharedPreferencesStorage sharedPrefStorage = new SharedPreferencesStorage(this);

        CredentialsManager credentialsManager = new CredentialsManager(authAPIClient, sharedPrefStorage);
        credentialsManager.getCredentials(new BaseCallback<Credentials, CredentialsManagerException>() {
            @Override
            public void onSuccess(Credentials payload) {
                accessToken = payload.getAccessToken();
                callAPI();
            }

            @Override
            public void onFailure(CredentialsManagerException error) {
                Toast.makeText(TimeSheetActivity.this, "Error: " + error.getMessage(), Toast.LENGTH_SHORT).show();
            }
        });
    }

    private void callAPI() {
        final Request.Builder reqBuilder = new Request.Builder()
                .get()
                .url(getString(R.string.api_url))
                .addHeader("Authorization", "Bearer " + accessToken);

        OkHttpClient client = new OkHttpClient();
        Request request = reqBuilder.build();
        client.newCall(request).enqueue(new Callback() {
            @Override
            public void onFailure(Request request, IOException e) {
                Log.e("API", "Error: ", e);
                runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        Toast.makeText(TimeSheetActivity.this, "An error occurred", Toast.LENGTH_SHORT).show();
                    }
                });
            }

            @Override
            public void onResponse(final Response response) throws IOException {
                timesheets = processResults(response);
                final TimeSheetAdapter adapter = new TimeSheetAdapter(TimeSheetActivity.this, timesheets);
                runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        if (response.isSuccessful()) {
                            ListView listView = (ListView) findViewById(R.id.timesheetList);
                            listView.setAdapter(adapter);
                            adapter.addAll(timesheets);
                        } else {
                            Toast.makeText(TimeSheetActivity.this, "API call failed.", Toast.LENGTH_SHORT).show();
                        }
                    }
                });
            }
        });
    }

    private ArrayList<TimeSheet> processResults (Response response) {
        ArrayList<TimeSheet> timesheets = new ArrayList<>();
        try {
            String jsonData = response.body().string();
            if (response.isSuccessful()) {
                JSONArray timesheetJSONArray = new JSONArray(jsonData);
                for (int i = 0; i < timesheetJSONArray.length(); i++) {
                    JSONObject timesheetJSON = timesheetJSONArray.getJSONObject(i);
                    String userID = timesheetJSON.getString("user_id");
                    String projectName = timesheetJSON.getString("project");
                    String dateStr = timesheetJSON.getString("date");
                    Double hours = timesheetJSON.getDouble("hours");
                    int id = timesheetJSON.getInt("id");

                    TimeSheet timesheet = new TimeSheet(userID, projectName, dateStr, hours, id);
                    timesheets.add(timesheet);
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        } catch (JSONException e) {
            e.printStackTrace();
        }
        return timesheets;
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        MenuInflater inflater = getMenuInflater();
        inflater.inflate(R.menu.timesheet_action_menu, menu);
        return super.onCreateOptionsMenu(menu);
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        switch (item.getItemId()) {
            case R.id.action_new:
                startActivity(new Intent(TimeSheetActivity.this, FormActivity.class));
                break;
            case R.id.action_profile:
                startActivity(new Intent(TimeSheetActivity.this, UserActivity.class));
                break;
            default:
                return super.onOptionsItemSelected(item);
        }
        return true;
    }
}
```

## 6. View the User Profile

To display the logged in user’s profile we’ll create the `UserActivity`, a corresponding `user_activity.xml` layout, and the `user_action_menu.xml` for the Toolbar navigation. The view will display the user’s name, email, and profile picture.

### Update the Manifest

Open the app's `AndroidManifest.xml` and add the `UserActivity`:

```xml
<activity android:name="com.auth0.samples.activities.UserActivity" />
```

#### Create the User Activity Layouts

Next create `user_activity.xml`, the layout for the `UserActivity`, with an `ImageView` for the profile picture and `TextViews` for the user's name and email.

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:orientation="vertical"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <android.support.v7.widget.Toolbar
        android:id="@+id/navToolbar"
        android:layout_width="match_parent"
        android:layout_height="?attr/actionBarSize"
        android:background="?attr/colorPrimary"
        android:elevation="4dp"
        android:theme="@style/ThemeOverlay.AppCompat.ActionBar"
        app:popupTheme="@style/ThemeOverlay.AppCompat.Light"/>

    <ImageView
        android:id="@+id/ivPicture"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        app:srcCompat="@android:color/darker_gray" />

    <TextView
        android:id="@+id/tvName"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="Name"
        android:textSize="24sp" />

    <TextView
        android:id="@+id/tvEmail"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="Email"
        android:textSize="24sp" />
</LinearLayout>
```

And create the `user_actions_menu.xml` for the `UserActivity` Toolbar:

```xml
<?xml version="1.0" encoding="utf-8"?>
<menu xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto">

    <item
        android:id="@+id/action_view"
        android:title="View Timesheets"
        app:showAsAction="always" />
    <item
        android:id="@+id/action_new"
        android:title="New Timesheet"
        app:showAsAction="always" />
</menu>
```

### Load the Profile Picture from URL

In order to load the user profile picture from the URL, create a task which extends `AsyncTask` and executes in the background.

```java
package com.auth0.samples.utils;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.AsyncTask;
import android.util.Log;
import android.widget.ImageView;

import java.io.InputStream;
import java.net.URL;

public class ImageTask extends AsyncTask<String, Void, Bitmap> {

    private ImageView bmImage;

    public ImageTask(ImageView bmImage) {
        this.bmImage = bmImage;
    }

    protected Bitmap doInBackground(String... urls) {
        String urldisplay = urls[0];
        Bitmap mIcon11 = null;

        try {
            InputStream in = new URL(urldisplay).openStream();
            mIcon11 = BitmapFactory.decodeStream(in);
        } catch (Exception e) {
            Log.e("Error", e.getMessage());
            e.printStackTrace();
        }
        return mIcon11;
    }

    protected void onPostExecute(Bitmap result) {
        bmImage.setImageBitmap(result);
    }
}
```

### Create the User Activity

In the `onCreate()` method we'll retrieve the user information from the `UserProfileManager` and set the values in the view. As before, the `onCreateOptionsMenu()` and `onOptionsItemSelected()` methods handle the Toolbar widget navigation functionality.

```java
package com.auth0.samples.activities;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.widget.ImageView;
import android.widget.TextView;

import com.auth0.samples.R;
import com.auth0.samples.utils.ImageTask;
import com.auth0.samples.utils.UserProfileManager;

public class UserActivity extends AppCompatActivity {

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.user_activity);
        Toolbar navToolbar = (Toolbar) findViewById(R.id.navToolbar);
        setSupportActionBar(navToolbar);

        TextView tvName = (TextView) findViewById(R.id.tvName);
        TextView tvEmail = (TextView) findViewById(R.id.tvEmail);

        tvName.setText(UserProfileManager.getUserInfo(this).getName());
        tvEmail.setText(UserProfileManager.getUserInfo(this).getEmail());

        new ImageTask((ImageView) findViewById(R.id.ivPicture))
                .execute(UserProfileManager.getUserInfo(this).getPictureURL());

                UserProfileManager.getUserInfo(this).getName();
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu items for use in the action bar
        MenuInflater inflater = getMenuInflater();
        inflater.inflate(R.menu.user_action_menu, menu);
        return super.onCreateOptionsMenu(menu);
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        switch (item.getItemId()) {
            case R.id.action_new:
                startActivity(new Intent(UserActivity.this, FormActivity.class));
                break;
            case R.id.action_view:
                startActivity(new Intent(UserActivity.this, TimeSheetActivity.class));
                break;
            default:
                // If we got here, the user's action was not recognized.
                // Invoke the superclass to handle it.
                return super.onOptionsItemSelected(item);

        }
        return true;
    }
}
```

## 7. Form for New Timesheets

Next create the `FormActivity` and layout to handle creating new timesheet entries.

### Update the Manifest

Open the app's `AndroidManifest.xml` and add the `FormActivity`:

```xml
<activity android:name="com.auth0.samples.activities.FormActivity" />
```

### Create the Form Activity Layouts

Create the `form_activity.xml` layout with `EditText` for the project name and hours worked inputs, and a `DatePicker` for the day worked.

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:id="@+id/mainForm"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    android:weightSum="1">

    <android.support.v7.widget.Toolbar
        android:id="@+id/navToolbar"
        android:layout_width="match_parent"
        android:layout_height="?attr/actionBarSize"
        android:background="?attr/colorPrimary"
        android:elevation="4dp"
        android:theme="@style/ThemeOverlay.AppCompat.ActionBar"
        app:popupTheme="@style/ThemeOverlay.AppCompat.Light"/>

    <EditText
        android:id="@+id/editProjectName"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:ems="10"
        android:hint="Project Name"
        android:inputType="textPersonName" />

    <EditText
        android:id="@+id/editHours"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:ems="10"
        android:hint="Hours Worked"
        android:inputType="number|numberDecimal" />

    <DatePicker
        android:id="@+id/datePicker"
        android:layout_width="match_parent"
        android:layout_height="191dp"
        android:layout_weight="0.93" />

    <Button
        android:id="@+id/submitTimeSheetButton"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="Submit" />
</LinearLayout>
```

And create the `form_actions_menu.xml` for the `FormActivity` Toolbar:

```xml
<?xml version="1.0" encoding="utf-8"?>
<menu xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto">

    <item
        android:id="@+id/action_profile"
        android:title="Profile"
        app:showAsAction="always" />
    <item
        android:id="@+id/action_view"
        android:title="View Timesheets"
        app:showAsAction="always" />
</menu>
```

### Create the Form Activity

- The `@string/api_url` is set to `http://10.0.2.2:8080/timesheets` so the Android Emulator can connect to the Node.JS API running on `http://localhost:8080`.
- The `onCreate()` method initializes the form and collects the input for the `postAPI()` method when the submit button is pressed.
- The `postAPI()` method will send the user input retrieved from the form to the Node.JS API in JSON format.
- The `clearForm()` method clears the input forms.
- The `onCreateOptionsMenu()` and `onOptionsItemSelected()` methods handle the Toolbar widget navigation functionality.

```java
package com.auth0.samples.activities;

import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.util.Log;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.DatePicker;
import android.widget.EditText;
import android.widget.Toast;

import com.auth0.android.Auth0;
import com.auth0.android.authentication.AuthenticationAPIClient;
import com.auth0.android.authentication.storage.CredentialsManager;
import com.auth0.android.authentication.storage.CredentialsManagerException;
import com.auth0.android.authentication.storage.SharedPreferencesStorage;
import com.auth0.android.callback.BaseCallback;
import com.auth0.android.result.Credentials;
import com.auth0.samples.R;
import com.squareup.okhttp.Callback;
import com.squareup.okhttp.MediaType;
import com.squareup.okhttp.OkHttpClient;
import com.squareup.okhttp.Request;
import com.squareup.okhttp.RequestBody;
import com.squareup.okhttp.Response;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.util.Calendar;
import java.util.Date;

public class FormActivity extends AppCompatActivity {

    private static final MediaType MEDIA_TYPE_JSON = MediaType.parse("application/json; charset=utf-8");

    private String accessToken;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.form_activity);
        Toolbar navToolbar = (Toolbar) findViewById(R.id.navToolbar);
        setSupportActionBar(navToolbar);

        Auth0 auth0 = new Auth0(getString(R.string.auth0_client_id), getString(R.string.auth0_domain));
        auth0.setOIDCConformant(true);

        AuthenticationAPIClient authAPIClient = new AuthenticationAPIClient(auth0);
        SharedPreferencesStorage sharedPrefStorage = new SharedPreferencesStorage(this);

        CredentialsManager credentialsManager = new CredentialsManager(authAPIClient, sharedPrefStorage);
        credentialsManager.getCredentials(new BaseCallback<Credentials, CredentialsManagerException>() {
            @Override
            public void onSuccess(Credentials payload) {
                accessToken = payload.getAccessToken();
            }

            @Override
            public void onFailure(CredentialsManagerException error) {
                Toast.makeText(FormActivity.this, "Error: " + error.getMessage(), Toast.LENGTH_SHORT).show();
            }
        });

        Button submitTimeSheetButton = (Button) findViewById(R.id.submitTimeSheetButton);
        final EditText editProjectName = (EditText) findViewById(R.id.editProjectName);
        final EditText editHours = (EditText) findViewById(R.id.editHours);
        final DatePicker datePicker = (DatePicker) findViewById(R.id.datePicker);

        submitTimeSheetButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                int day = datePicker.getDayOfMonth();
                int month = datePicker.getMonth();
                int year =  datePicker.getYear();

                Calendar calendar = Calendar.getInstance();
                calendar.set(year, month, day);

                postAPI(
                        editProjectName.getText().toString(),
                        calendar.getTime(),
                        editHours.getText().toString()
                );
            }
        });
    }

    private void postAPI(String projectName, Date date, String hours) {

        JSONObject postBody = new JSONObject();
        try {
            postBody.put("project", projectName);
        } catch (JSONException e) {
            e.printStackTrace();
        }
        try {
            postBody.put("date", date);
        } catch (JSONException e) {
            e.printStackTrace();
        }
        try {
            postBody.put("hours", hours);
        } catch (JSONException e) {
            e.printStackTrace();
        }
        String postStr = postBody.toString();

        final Request.Builder reqBuilder = new Request.Builder()
                .post(RequestBody.create(MEDIA_TYPE_JSON, postStr))
                .url(getString(R.string.api_url))
                .addHeader("Authorization", "Bearer " + accessToken);

        OkHttpClient client = new OkHttpClient();
        Request request = reqBuilder.build();

        client.newCall(request).enqueue(new Callback() {
            @Override
            public void onFailure(Request request, IOException e) {
                Log.e("API", "Error: ", e);
                runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        Toast.makeText(FormActivity.this, "An error occurred", Toast.LENGTH_SHORT).show();
                    }
                });
            }

            @Override
            public void onResponse(final Response response) throws IOException {
                final String resBody = response.body().string();

                runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        if (response.isSuccessful()) {
                            clearForm((ViewGroup) findViewById(R.id.mainForm));
                            Intent intent = new Intent(FormActivity.this, TimeSheetActivity.class);
                            FormActivity.this.startActivity(intent);
                        } else {
                            Toast.makeText(FormActivity.this, "Timesheet creation failed.", Toast.LENGTH_SHORT).show();
                        }
                    }
                });
            }
        });
    }

    private void clearForm(ViewGroup group) {
        for (int i = 0, count = group.getChildCount(); i < count; ++i) {
            View view = group.getChildAt(i);
            if (view instanceof EditText) {
                ((EditText)view).setText("");
            }

            if(view instanceof ViewGroup && (((ViewGroup)view).getChildCount() > 0))
                clearForm((ViewGroup)view);
        }
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        MenuInflater inflater = getMenuInflater();
        inflater.inflate(R.menu.form_action_menu, menu);
        return super.onCreateOptionsMenu(menu);
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        switch (item.getItemId()) {
            case R.id.action_view:
                startActivity(new Intent(FormActivity.this, TimeSheetActivity.class));
                break;
            case R.id.action_profile:
                startActivity(new Intent(FormActivity.this, UserActivity.class));
                break;
            default:
                return super.onOptionsItemSelected(item);

        }
        return true;
    }
}
```

## Test the App

Before continuing, ensure you have [implemented the Node.JS API](/architecture-scenarios/application/mobile-api/api-implementation-nodejs). 

1. Start the API by navigating to the API's directory in your terminal and entering the `node server` command.
2. Open the mobile app in Android Studio and press the __Run__ button.
3. Select the Nexus 5X API 23 virtual device.
4. Once the emulator has loaded the mobile app, you can login user then, create and view timesheet entries from the running Node.JS API.

That's it! You are done!
