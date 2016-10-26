---
title: Custom Login
description: This tutorial demonstrates how to use the Auth0 library to add custom authentication and authorization to your web app
budicon: 448
---

<%= include('../../_includes/_package2', {
  org: 'auth0-samples',
  repo: 'auth0-spring-security-mvc-sample',
  path: '02-Custom-Login',
  requirements: [
    'Java 7 or above',
    'Maven 3.0.x or above'
  ]
}) %>



The previous step explains how to login but with the [Lock](/libraries/lock) widget. Lock is completely optional so you can build an application with Auth0 using your custom design without having to include it. You just need to use the [Auth0.js library](https://github.com/auth0/auth0.js). Let's see how.

In our example we will configure a custom database connection to use with our custom login. We will also keep on building on our previous example, the one using Lock. We will add a flag that when set the custom login will be used, while when unset Lock will be used. This is completely optional of course, you can configure your own web app to use only custom login if this is what you want.

## Create a Database Connection

First we will create a new database connection and we will name it `custom-login-DB`. We will use Auth0 database infrastructure to store our users.

**NOTE:** If you have an existing user store, or wish to store user credentials on your own server, see the custom database connection tutorial at [Authenticate Users with Username and Password using a Custom Database](/connections/database/mysql) for detailed steps on how to setup and configure it.

Log into Auth0, and select the [Connections > Database](${manage_url}/#/connections/database) menu option.

Click the **Create DB Connection** button and provide a name for the database.

You will be navigated to the connection's settings.

At the **Clients Using This Connection** section, enable the connection for your app.

Now let's create a user.

Select the [Users](${manage_url}/#/users) menu option.

Click the **Create User** button and fill in the email, password, and the database at which the user will be created. Use an email address you have access to since creating the user will trigger a verification email to be sent.

Click **Save**.

Head back to [Connections > Database](${manage_url}/#/connections/database) and select the **Try** button on your new database so we can verify that our user can log in.

**NOTE:** You can add also social connections. To do so you need to create the relevant button in your login form and the javascript to specify which connection to use, for example `google-oauth2`, `github`, etc. You can find details and some sample code on the [auth0.js](/libraries/auth0js#login) document.


## Create Custom Login

Since we decided to keep Lock as well, we will leave `login.jsp` as is and we will create a new file named `loginCustom.jsp`. Here is the code:

${snippet(meta.snippets.customLoginJsp)}

Notice the differences compared to `login.jsp`:

- The code uses the `auth0-6.8.js` library, instead of `lock.min.js`.
- We have added html to display a form for email and password input (div `form-signin`).
- The javascript code uses the `Auth0` class, instead of `Auth0Lock`.

**NOTE**: Login is probably not enough for your app, users need to be able to sign up. To do so you have to call the `signup` method on the `auth0` instance. You can find details on how to do that in the [Custom Signup](/custom-signup) document.

Now let's go and add this flag we were talking about earlier. Remember that this step is optional.

Edit the `auth0.properties` file:
- Add the line `auth0.customLogin: true`. If you need to disable it, so you can use Lock again, set the value to `false`.
- Set the value of `auth0.connection` to the name of the database connection you created earlier. If you follow our example, the value is `custom-login-DB`.

The next step is to read these attributes from our code. Edit the `/src/main/java/com/auth0/example/AppConfig.java` file by adding the following code inside the `AppConfig` class:

${snippet(meta.snippets.customLoginGetValues)}

The final step is to edit the `LoginController.java` class. Edit the `login` method as follows:

${snippet(meta.snippets.customLoginEditController)}

Notice the last line. It checks the value of the `auth0.customLogin` and returns either `loginCustom` or `login`.

We have also added code to retrieve the connection name, the value of the `auth0.connection` property: `model.put("connection", appConfig.getConnection());`. This is the method we added in the previous step in the `AppConfig` class.

## Test the App

We are now ready to test the application!

Build and run the project using `mvn spring-boot:run`. Then, go to [http://localhost:3099/login](http://localhost:3099/login).

You should see the custom login page, instead of Lock.

![Custom Login](/media/articles/java/custom_login_form.png)

Enter the credentials of the user you created earlier to test the login.
