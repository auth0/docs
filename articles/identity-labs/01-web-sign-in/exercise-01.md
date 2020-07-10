---
section: exercises
description: Auth0 Digital Identity Lab 1, Exercise 1: Adding Web Sign-In
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

::: warning
If you came to this page directly, go to the [first page of this lab](/identity-labs/01-web-sign-in) and read through the instructions before getting started.
:::

In this exercise, you will learn how to add sign-in to an app using:

- Node.js + Express
- An Express middleware to handle checking authentication and redirecting to login
- Auth0 as an Authorization Server

<div>
  <div>
    <ul class="nav nav-tabs">
      <li class="active">
        <a href="#video-tutorial" data-toggle="tab">
          Video Tutorial
        </a>
      </li>
      <li>
        <a href="#text-tutorial" data-toggle="tab">
          Lab
        </a>
      </li>
    </ul>
  </div>
  <div class="tab-content">
    <div id="video-tutorial" class="tab-pane active">
      <div class="video-wrapper" data-video="0divx974tx"></div>
      <hr>
    </div>
    <div id="text-tutorial" class="tab-pane">

A simple Node.js Express application has been created to get you started. This is a web application with two pages. The first page, served under the root path `/`, shows “Hello World” and a link (“Expenses”) to the second page. The second page, served at `/expenses`, shows a table with expenses. At this point, these expenses are hard-coded; you will learn how to consume them from an API secured with Auth0 in the next lab.

1. Open your Terminal app, clone the [identity exercise repo](https://github.com/auth0/identity-102-exercises/), then go to the `/lab-01/begin` folder:

```bash
❯ git clone https://github.com/auth0/identity-102-exercises.git
Cloning into 'identity-102-exercises'...

❯ cd identity-102-exercises/lab-01/begin
```

2. Open a code editor like VS Code or Atom in the same directory (File > Open) and review the `server.js` code. This is a generic Node.js web application that uses `ejs` for views and `morgan` to log HTTP requests.

3. The `.env-sample` file will be used for the environment variables you need for this lab. It’s populated with a `PORT` (the port number where the app will run) and an `APP_SESSION_SECRET` (value used to encrypt the cookie data). You will set the other values later on in the lab. For now, create a copy of this file in the same folder and name it `.env`. Run the following commands in your terminal (or copy, paste, and rename the sample file in your editor):

```bash
# Make sure we're in the right directory
❯ pwd
/Users/username/identity-102-exercises/lab-01/begin

# Copy the .env-sample file to a new .env file that the app will use
❯ cp .env-sample .env
```

4. In your terminal, use `npm` to install all the dependencies and start the application:

```bash
❯ npm install
# Ignore any warnings

added XX packages in X.XXs
❯ npm start

listening on http://localhost:3000
```

::: note
If you see a message like "Error: listen EADDRINUSE :::3000" in your terminal after starting the application, this means that port 3000 is in use somewhere. Change the `PORT` value in your `.env` file to "4000" and try again.
:::

5. Open a Web browser and go to [localhost:3000](http://localhost:3000) (or `http://localhost:PORT` where PORT is the value of the environment variable, in case you changed its value). You should see a page with a “Hello World” message. Click the Expenses link to view the expenses page.

![First page of the starter app](/media/articles/identity-labs/lab-01-starter-app-rendered.png)

6. Now, we're ready to start adding authentication! Switch to your terminal window and press `[CTRL]` + `[c]` to stop the server, then use `npm` to install the package you'll use to secure the app. The `express-openid-connect` package is a simple Express middleware that provides OpenID Connect and JWT implementation.

```bash
# Continuing from previous terminal session ...
listening on http://localhost:3000
^C # Command to stop the server
❯ npm install express-openid-connect@1.0.2 --save
# Ignore any warnings

+ express-openid-connect@0.6.0
added XX packages in X.XXs
```

7. Next, update your application code to require `express-openid-client` in the `server.js` file:

```js
// lab-01/begin/server.js

require('dotenv').config();
// ... other required packages

// Add the line below 👇
const { auth } = require('express-openid-connect');

// ...
```

8. Now add the authentication middleware that will be used for all application routes:

```js
// lab-01/begin/server.js
// ...

const app = express();
app.set('view engine', 'ejs');
app.use(morgan('combined'));

// Add the code below 👇
app.use(auth({
  auth0Logout: true,
  baseURL: appUrl
}));

// ... other app routes
```

The middleware you installed automatically defines three routes in your application:

- `/login` - builds the OpenID Connect request and redirects to the authorization server (in this case, Auth0). For this to work properly, the middleware needs to include specific parameters with the request. You will configure these values using environment variables in the next step.
- `/callback` - handles the response from the authorization server, performs required validations like nonce, state, and token verification using the `openid-client` package, and sets the user in the session from the ID token claims.
- `/logout` - terminates the session in the application and redirects to Auth0 to end the session there as well.

The middleware will also augment Express’s request object with additional properties whenever the request is authenticated. For example, `req.openid.user` is a property that will contain user information.

::: note
The `auth0Logout: true` configuration key passed to `auth()` tells the middleware that, when the user logs out of the application, they should be redirected to a specific Auth0 URL to end their session there as well.
:::

The middleware needs to be initialized with some information to build a proper OpenID request and send it to the authorization server. This information includes:

- **The URL of the authorization server.** This URL will be used to download the OpenID Connect configuration from the discovery document, available at the URL `https://{your-auth0-domain}/.well-known/openid-configuration` ([here is the configuration](https://auth0.auth0.com/.well-known/openid-configuration) for the main Auth0 tenant). The discovery document is a standard OpenID Connect mechanism used to publish relevant discovery metadata of the OpenID Connect provider, including a link to what keys should be used for validating the tokens it issues.
- **The unique identifier for your application.** This is created on the authorization server and is a unique string that identifies your application. This identifier must be provided in each request, so the authorization server knows what application the authentication request is for.

You will use the Auth0 Dashboard to register your application with Auth0. Afterward, you’ll be able to retrieve the two values above and configure them as environment variables for your app. The middleware will read these environment variables and use them to build the request when a user tries to authenticate.

9. Log into the Auth0 Dashboard, go to the [Applications page](${manage_url}/#/applications), and click the **Create Application** button.

10. Set a descriptive name (e.g., "Identity Lab 1 - Web Sign In"), choose **Regular Web Applications** for the type, and click **Create**.

11. You should now see the Quickstart section that describes how to integrate Auth0 with a production application. Click the **Settings** tab at the top to see the Application settings.

12. Add your application’s callback URL - `http://localhost:3000/callback` (adjust the port number if needed) - to the **Allowed Callback URLs** field. Auth0 will allow redirects **only** to the URLs in this field after authentication. If the one provided in the authorization URL does not match any in this field, an error page will be displayed.

![Application callback URL field](/media/articles/identity-labs/lab-01-callback-url-config.png)

13. Next, add `http://localhost:3000` (adjust the port number if needed) to the **Allowed Logout URLs field**. Auth0 will allow redirects **only** to the URLs in this field after logging out of the authorization server.

![Application logout URL field](/media/articles/identity-labs/lab-01-logout-url-config.png)

14. Scroll down and click **Show Advanced Settings**, then **OAuth**. Make sure **JsonWebToken Signature Algorithm** is set to `RS256`.

15. Scroll down and click **Save Changes**

16. Open your `.env` file. Add `https://` to the **Domain** from Auth0 as the value for the `ISSUER_BASE_URL` key. Add the **Client ID** from Auth0 as the value for the `CLIENT_ID` key. Add a long, random string and the value for the `APP_SESSION_SECRET` key. You `.env` file should look similar to the sample below:

```
ISSUER_BASE_URL=https://your-tenant-name.auth0.com
CLIENT_ID=0VMFtHgN9mUa1YFoDx3CD2Qnp2Z11mvx
APP_SESSION_SECRET=a36877de800e31ba46df86ec947dab2fc8a2f7e1d23688ce2010cd076539bd28
PORT=3000
```

::: note
Mac users can enter the following in Terminal to get a random string suitable for the secret value: `openssl rand -hex 32`. This value is used by the session handler in the SDK to generate opaque session cookies.
:::

17. Save the changes to `.env` and restart the server as before, but do not open it in a browser yet.

Your app is now ready to authenticate with Auth0 using OpenID Connect! Before testing it, continue to the next exercise, where you will review the interactions that happen under the hood between your app and Auth0 while you sign up and log in.

```bash
# Continuing from previous terminal session ...
listening on http://localhost:3000
^C # Command to stop the server
❯ npm start

listening on http://localhost:3000
```
</div>
  </div>
</div>

<a href="/identity-labs/01-web-sign-in/exercise-02" class="btn btn-transparent">Next →</a>
