---
title: Single-Page App Authentication Using Cookies
description: Use your backend server to authenticate a single page app with cookies
topics:
  - login
  - spa
contentType: how-to
toc: true
useCase: spa-cookies
---

# Single-Page App Authentication Using Cookies

Securing a single-page application (SPA) can be a challenge. However, if your SPA:

* is served to the client using your own backend
* has the same domain as your backend
* makes API calls that require authentication to your backend

Then you can simplify your implementation by using cookies to authenticate your SPA. In the following guide you'll find an overview of this approach as well as a sample implementation using [Node.js](https://nodejs.org/en/).

## How it works

The steps below show how tokens are retrieved and used. In this approach, the [Form Post Response Mode](https://openid.net/specs/oauth-v2-form-post-response-mode-1_0.html) is used instead of a traditional [Authorization Code flow](/flows/concepts/auth-code). This is because Form Post Response Mode is a simpler way to implement login when it’s your own resource you are requesting access to.

![SPA Cookie Authentication](/media/articles/login/spa/image1.png)

1. The user accesses a protected route using the browser, or performs some action that requires an authentication step to be initiated (such as clicking on a Login button)
2. The browser client redirects to a `/login` route on the backend, or to the protected route depending on what the user did
3. The backend constructs a request to the authorization server’s `/authorize` endpoint and redirects the browser client there
4. The user is prompted to authenticate themselves using whatever method the authorization server presents
5. The authorization server POSTs the tokens to the redirect URI as a URL-encoded form post. The backend is able to retrieve those tokens by parsing the body data.

At this point, the user is authenticated and the backend has the required tokens. A cookie can now be created to represent this state on the client. The client browser is then redirected to a route that serves the SPA and also receives the authentication cookie.

From now on, this cookie is traded between the client and backend when API calls are made using an AJAX call. On each request, the backend verifies if the cookie is still valid and if so, allows the request to continue.

![Cookie Exchange Between Client & Backend](/media/articles/login/spa/image2.png)

### Dealing with invalid or missing cookies

When implementing this approach you'll need to handle cases where the authentication cookie is invalid or missing. The API call to the backend from the client happens in the background, so the client has to deal with any response from the server indicating the user should reauthenticate.

In the following sample application, this case is handled in a naive way by prompting the user to reauthenticate if the API call results in a 302 Redirect result. The 302 occurs because, upon unsuccessful validation of the cookie, the server tries to redirect to the authorization endpoint of the authorization server and sends this response to the client.

## Example: Authenticating a SPA using cookies

The example application uses Node.js and Express to demonstrate the concepts covered above.

### Prerequisites

To follow along, make sure you have the [latest version of Node](https://nodejs.org/en/download/) installed.

Once Node is installed, [download or clone the source code](https://github.com/auth0-blog/spa-cookie-demo/) and open the project folder inside a terminal window.

```bash
// Clone the tutorial respository using SSH
$ git clone git@github.com:auth0-blog/spa-cookie-demo
// ... or if you use HTTPS:
$ git clone https://github.com/auth0-blog/spa-cookie-demo.git
// Move into the project directory
$ cd spa-cookie-demo
```
The `master` branch represents the state of the application before any authentication is added. If you would like to refer to the final version of the application, `checkout` the `with-oidc` branch:
```bash
$ git checkout with-oidc
```
### Initialize the Node.js application
Install the application dependencies by running `npm install` from your terminal window. To run the application, use `npm run dev`. This starts the Express server. Go to [http://localhost:3000](http://localhost:3000) in your browser to view the application.
::: note
The development server uses [`nodemon`](https://www.npmjs.com/package/nodemon), which automatically restarts whenever it detects any file changes.
:::
### Explore the application
With the application open at [http://localhost:3000](http://localhost:3000), click the **Call API** button. You should see a message displayed on the screen.
![Call API Message](/media/articles/login/spa/image3.png)
Note that you were able to make the API call without being logged in. Let's fix that by adding authentication some middleware that requires the user to authenticate before the API call can be made.
### Adding authentication middleware
Inside the terminal, run the following command to install the additional libraries:
```bash
$ npm install express-session express-openid-connect
```
- [`express-openid-connect`](https://www.npmjs.com/package/express-openid-connect) — OpenID Connect middleware for Express. Creates authentication sessions and protects application routes
- [`express-session`](https://www.npmjs.com/package/express-session) — session middleware for Express; required by `express-openid-connect`
Next, open `server/index.js` and add in the middleware libraries underneath the existing `require` statements at the top of the file:
```js
// server/index.js
// Other 'require' statements...
// NEW - bring in our new middleware libraries
const { auth } = require("express-openid-connect")
const session = require("express-session")
```
The  `express-session` middleware can now be configured by adding the following code above the existing configuration for `body-parser` further down the file:
```js
// server/index.js
// Existing config for morgan
app.use(morgan("dev", {
  stream: {
    write: m => debug(m)
  }
}))
// NEW - add this configuration for express-session
app.use(
  session({
    secret: process.env.APP_SECRET || "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true
    }
  })
)
// Existing config for body-parser
app.use(bodyParser.urlencoded({
  extended: false
}))
```
Finally, add in the configuration for the `express-openid-connect` middleware. The location of this is important; it should be inserted _after_ the configuration for the static file server, but _before_ the definition of the API routes. This ensures the static files can be served without requiring authentication, but the API routes are secured:
```js
// server/index.js
// Existing config for the static file server
app.use(express.static(join(__dirname, "..", "public")))
// NEW - Configure the OpenID Connect middleware
app.use(
  auth({
    required: req => req.originalUrl !== "/"
  })
)
// Existing config for the API routes
app.use("/api", require("./api"))
```
Note that in this case, the authentication step is only applied if the request is for something other than the homepage. This lets us show some kind of UI even if the user is not logged in. We can display a "log in" button if they have not yet authenticated, or some other UI if they have.
After these changes, your server script should more-or-less look like this:
```js
require("dotenv").config()
const express = require("express")
const helmet = require("helmet")
const morgan = require("morgan")
const debug = require("debug")("app:server")
const session = require("express-session")
const bodyParser = require("body-parser")
const {
  auth
} = require("express-openid-connect")
const {
  join
} = require("path")
const app = express()
app.use(helmet())
app.use(morgan("dev", {
  stream: {
    write: m => debug(m)
  }
}))
// Set up express-session (required by express-openid-connect)
app.use(
  session({
    secret: process.env.APP_SECRET || "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true
    }
  })
)
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(express.static(join(__dirname, "..", "public")))
// Set up authentication middleware, only strictly required if
// the request isn't for the home page
app.use(
  auth({
    required: req => req.originalUrl !== "/"
  })
)
app.use("/api", require("./api"))
app.get("/*", (req, res) => {
  res.sendFile(join(__dirname, "..", "public", "index.html"))
})
const port = process.env.PORT || 3000
app.listen(port, () => debug("Application listening on port " + port))
```
### Setting up the environment
In order for the application to work with authentication, `express-openid-connect` requires some environment variables to be present. For this application, these variables can be specified in a `.env` file.
Create a `.env` file in the root of the project directory and populate it with the following:
```bash
ISSUER_BASE_URL=<YOUR OIDC URL>
CLIENT_ID=<YOUR OIDC CLIENT ID>
BASE_URL=http://localhost:3000
```
### Setting up an Auth0 app
If you don't already have an Auth0 account, you can [sign up for a free Auth0 account here](https://auth0.com/signup).
Next, set up an Auth0 Client and API so Auth0 can interface with your app and API.
![Create App Dashboard](/media/articles/login/spa/image4.png)
1. Go to your [Auth0 Dashboard](${manage_url}) and click the [Create Application](https://manage.auth0.com/#/applications/create) button.
2. Name your new app, select **Regular Web Applications** and click the **Create** button.
3. In the **Settings** for your new Auth0 app, add `http://localhost:3000/callback` to the **Allowed Callback URLs**.
4. Add `http://localhost:3000` to the **Allowed Logout URLs**.
5. Click the **Save Changes** button.
6. If you'd like, you can [set up some social connections](${manage_url}/#/connections/social). You can then enable them for your app in the **Application** options under the **Connections** tab. The example shown in the screenshot above utilizes username/password database, Facebook, Google, and Twitter.
On the **Settings** screen, note the domain and client ID settings at the top.
![Application Settings](/media/articles/login/spa/image5.png)
These are the two values that need to be configured as part of the application. Reopen the `.env` file and set these values:
```
ISSUER_BASE_URL=${account.namespace}
CLIENT_ID=${account.clientId}
BASE_URL=http://localhost:3000
```
### Running the application
With the server and environment configuration done, find your browser window that has the application open. If you've closed the browser and stopped the server, run the following from the terminal to restart the application
```bash
$ npm run dev
```
Then open [http://localhost:3000](http://localhost:3000) in the browser. From a user interface perspective, the application should look the same. However, this time when the **Call API** button is clicked, you should receive a warning that the user is not logged in. Also note that you do not see the "Hello, World" message as before, since the call to the API has been rejected.
![User Is Not Logged In](/media/articles/login/spa/image6.png)
Click the "Log in now" to login. Once you have been authenticated, you'll return to the application and see an updated UI that reflects your newly-logged in state. You should be able to press the **Call API** button once more to invoke an API call to the server, and it now works!
![User Is Logged In](/media/articles/login/spa/image7.png)
You can click the "Profile" link at the top of the page to show user information retrieved from the ID token.
![User Profile](/media/articles/login/spa/image8.png)