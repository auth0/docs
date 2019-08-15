---
section: exercises
classes: topic-page
title: Exercise 1: Adding Web Sign-In
description: Auth0 digital identity Lab 1, Exercise 1: Adding Web Sign-In
topics:
  - digital identity
  - OIDC
  - OpenId Connect
  - OAuth2
contentType:
    - index
    - concept
---
# Lab 1, Exercise 1: Adding Web Sign-In

In this exercise, you will see in practice how to add sign on to an app. You will use the following:

- Node.js + Express
- The [`express-openid-connect`](https://github.com/auth0/express-openid-connect) middleware that wraps the `openid-client` library
- Auth0 as our Authorization Server (naturally)

A simple Node.js Express application has been created to get you started. This is a web application with two pages. The first page, served under the root path `/`, simply shows “Hello World” and a link (“Expenses”) to the second page. The second page, served at `/expenses`, shows a table with expenses. For now, these expenses are hard-coded. However, in the next lab, you will learn how to consume them from an API secured with Auth0.

![](/media/articles/identity-labs/lab-01-starter-app-rendered.png)

Now that you know the web application you will be securing, complete the following steps to set it up and get it running:

1. Go to the `/lab-01/begin` folder in your locally-cloned copy of the [`auth0/identity-102-exercises` repo](https://github.com/auth0/identity-102-exercises/).
2. Review the `server.js` code. This is a generic Node.js HTTP server that uses `body-parser` to parse the JSON, buffer, string, and URL-encoded data received as well as `morgan` to log HTTP requests.
3. The `.env-sample` file will be used for the environment variables you need for this lab. It’s already populated with the PORT (port number where the app will run). You will set the rest of the values later on in the lab. For now, create a copy of the file in the same folder and name it `.env`. Run the following commands in your terminal:

```bash
# Make sure we're in the right directory
❯ pwd
/Users/username/identity-102-exercises/lab-01/begin

# Copy the .env-sample file to a new .env file that the app will use
❯ cp .env-sample .env
```

::: note
If you don’t see the `.env-sample` file, you need to enable the display of hidden files. On a Mac, press `[Shift]` + `⌘` + `.` together. On Windows, follow [these instructions](https://support.microsoft.com/en-us/help/14201/windows-show-hidden-files).
:::

4. In your terminal, use `npm` install all the dependencies and start the application:

```bash
❯ npm install
# Ignore any warnings

added 55 packages in 3.18s
❯ npm start

listening on http://localhost:3000
```

::: note
If you see a message like "Error: listen EADDRINUSE :::3000" in your terminal after starting the application, this means that port 3000 is in use somewhere. Change the `PORT` value in your `.env` file to "3001" and try again.
:::

5. Open a Web browser and go to http://localhost:3000 (or http://localhost:PORT where PORT is the value of the environment variable, in case you changed its value). You should see a page with a “Hello World” message. Click the Expenses link to view the expenses page shown above.

6. Now, we're ready to start adding authentication! Switch to your terminal window and press `[CTRL]` + `[c]` to stop the server, then use `npm` to install the packages you'll use to secure the app. The `cookie-session` package stores session data for the user in a browser cookie. The `express-openid-connect` package is a simple Express middleware that provides OpenID Connect and JWT implementation.

```bash
# Continuing from previous terminal session ...
listening on http://localhost:3000
^C # Command to stop the server
❯ npm install cookie-session express-openid-connect
# Ignore any warnings

+ express-openid-connect@0.3.0
+ cookie-session@1.3.3
added 122 packages in 9.213s
```

7. Next, update your application code to require `cookie-session` and `express-openid-client` in the `server.js` file:

```js
// lab-01/begin/server.js

require('dotenv').config();
// ... other required packages

// Add the code below 👇
const session = require('cookie-session');
const { auth } = require('express-openid-connect');

// ...
```

8. You need to load the `session()` middleware to add session capability to the application and then load the  middleware to handle authentication. To do this, add the following lines below the last `app.use` statement:

```js
// lab-01/begin/server.js
// ...

app.use(bodyParser.urlencoded({ extended: false }));

// Add the code below 👇
app.use(session({
 name: 'identity102-l01-e01',
 secret: process.env.COOKIE_SECRET
}));

app.use(auth({
 auth0Logout: true
}));

// ... other app routes
```

The middleware you installed automatically defines the following three routes:

- `/login` - builds the OpenID Connect request and redirects to the authorization server (in this case, Auth0). For this to work properly, the middleware needs to include specific parameters with the request. You will configure these values using environment variables in the next step.
- `/callback` - handles the POST response from the authorization server, performs required validations like nonce, state, and token verification using the `openid-client` package, and sets the user in the session from the ID token claims.
- `/logout` - terminates the session in the application.

The middleware will also augment Express’s request object with additional properties whenever the request is authenticated. For example, `req.openid.user` is a property that will contain user information. To learn about these properties, see the [Session and Context](https://github.com/auth0/express-openid-connect/blob/master/API.md#session-and-context) documentation for this package.

::: note
The `auth0Logout: true` property passed to the auth middleware in step 9 tells the middleware that, when the user logs out of the application, they should be redirected to the authorization server to end their session there as well.
:::

The middleware needs to be given some information in order to build a proper OpenID request and send it to the authorization server. This information includes:

- **The URL of the authorization server.** This URL will be used to download the OpenID Connect configuration from the discovery document, available at the URL https://{your-auth0-domain}/.well-known/openid-configuration ([here is the configuration](https://auth0.auth0.com/.well-known/openid-configuration) for the main Auth0 tenant). The discovery document is a standard OpenID Connect mechanism used to publish relevant discovery metadata of the OpenID Connect provider, including a link to what keys should be used for validating the tokens it issues.
- **The unique identifier for your application.** This is created on the authorization server and is a unique string that identifies your application. This identifier must be provided in each request, so the authorization server knows what application the authentication request is for.

You will use the Auth0 Dashboard to register your application with Auth0. Afterwards you’ll be able to retrieve the two values above and configure them as environment variables for your app. The middleware will read these environment variables and use them to build the request when a user tries to authenticate.

9. Log into the Auth0 Dashboard, go to the [Applications page](${manage_url}/#/applications), and click the **Create Application** button.

10. Set a descriptive name (e.g., "Identity Lab 1 - Web Sign In"), choose **Regular Web Application** for the type, and click **Create**.

11. You should now see the Quickstart section that describes how to integrate Auth0 with a production application. Click the **Settings** tab at the top to see the Application settings.

12. Add your application’s callback URL - http://localhost:3000/callback (adjust the port number if needed) - to the **Allowed Callback URLs** field. Auth0 will allow redirects **only** to the URLs in this field after authentication. If the one provided in the authorization URL does not match any in this field, an error page will be displayed.

![](/media/articles/identity-labs/lab-01-callback-url-config.png)

13. Next, add http://localhost:3000 (adjust the port number if needed) to the **Allowed Logout URLs field**. Auth0 will allow redirects **only** to the URLs in this field after logging out of the authorization server.

![](/media/articles/identity-labs/lab-01-logout-url-config.png)

14. Scroll down and click **Save Changes**

14. Open your `.env` file. Add `https://` plus the **Domain** from Auth0 as the value for the `ISSUER_BASE_URL` key. Add the **Client ID** from Auth0 as the value for the `CLIENT_ID` key. Add a long, random string and the value for the `COOKIE_SECRET` key. Your `.env` file should look similar to the example below:

```
ISSUER_BASE_URL=https://your-tenant-name.auth0.com
CLIENT_ID=m7YBmCrUXPWZ58Ki0b0XviVSTnNj0Rbk
COOKIE_SECRET=bMXzdb7RbqOfZEkYINGaUmgI+paVIpj6eXdnQZX5cd0=
PORT=3000
```

::: note
In the Terminal app in Mac, you can enter `openssl rand -base64 16` to get a suitable random string.
:::

15. Now save the changes to `.env` and restart the server as before, but do not open it in a browser yet.

Your app is now ready to authenticate with Auth0 using OpenID Connect! Before testing it, continue to the next exercise, where you will review the interactions that happen under the hood between your app and Auth0 while you sign up and log in.

```bash
# Continuing from previous terminal session ...
listening on http://localhost:3000
^C # Command to stop the server
❯ npm start

listening on http://localhost:3000
```

---

#### [Next: Exercise 2, Using Network Traces →](/identity-labs/01-web-sign-in/exercise-02)
