<!-- markdownlint-disable MD002 MD041-->

<%= include('../../_includes/_login_preamble', { library: 'JavaScript' }) %>

## Setting Up the Application

### Create a basic HTML page

Create a folder on your machine to house the application, then add an `index.html` file to the root of the project. This HTML page will display a welcome message and have a "gated" section which requires the user to be authenticated before accessing. You can copy/paste the following content into the file. You will be adding more lines as you progress with this article.

Add the following content to the `index.html` file you just created:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>SPA SDK Sample</title>
    <link rel="stylesheet" type="text/css" href="/css/main.css" />
  </head>

  <body>
    <h2>SPA Authentication Sample</h2>
    <p>Welcome to our page!</p>
    <button id="btn-login" disabled="true" onclick="login()">Log in</button>
    <button id="btn-logout" disabled="true" onclick="logout()">Log out</button>
  </body>
</html>
```

Additionally, create a new folder called `public`, a folder inside that called `css` and a new file in there called `main.css`. This will be used to define how the gated content elements will be hidden in the page.

Open the newly-created `public/css/main.css` file and add the following CSS:

```css
.hidden {
  display: none;
}

label {
  margin-bottom: 10px;
  display: block;
}
```

Finally, create a new directory in the `public` folder called `js`, and a new file in there called `app.js`. This will house the application-specific logic that you will create over the next few sections.

The folder structure so far should look like the following:

```
.
├── index.html
└── public
    ├── css
    │   └── main.css
    └── js
        └── app.js
```

### Reference the SDK

This article is based on the new SPA SDK available [here](https://github.com/auth0/auth0-spa-js/). You can reference the package from the CDN in the `index.html` file by placing the script tags at the very bottom of the `body` tag:

```html
<body>
  
  <!-- other HTML -->
  
  <!-- add the lines below existing code -->
  <script src="${auth0spajs_url}"></script>
  <script src="js/app.js"></script>
</body>
```

### Configure credentials

Create an `auth_config.json` in the root of the project. The values from `domain` and `clientId` should be populated from your [Auth0 application settings](${manage_url}/#/applications/${account.clientId}/settings) as configured [above](#get-your-application-keys).

```json
{
  "domain": "${account.namespace}",
  "clientId": "${account.clientId}"
}
```

:::note
As `auth_config.json` is served publicly, this file should **never** contain sensitive information such as passwords and client secrets.
:::

## Create the server

In this section you will create a basic web server using [ExpressJS](https://expressjs.com). This will be used to serve our HTML page, along with any assets that it requires (JavaScript, CSS, etc).

Run the following command in the same folder as the `index.html` file you created earlier:

```bash
$ npm init -y
```

This will initialize a new NPM project and get us ready to install dependencies.

### Installing dependencies

In the terminal, install the dependencies that are necessary to get the server up and running:

```bash
$ npm install express
```

Also install [`nodemon`](https://npmjs.org/package/nodemon) so that our server can be restarted on any code changes:

```bash
$ npm install -D nodemon
```

Finally, open the `package.json` file and modify the "scripts" entry to look like the following:

```json
{
  // ...
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  // ...
}
```

- `npm start` will run the application as normal
- `npm run dev` will run the application using `nodemon`, watching for changes as we modify files

### Creating server.js

Next, create a new file in the root of the project alongside `index.html` and `package.json`, called `server.js`. This will be our backend server and will be used to serve the SPA pages.

Populate `server.js` with the following code:

```js
const express = require("express");
const { join } = require("path");
const app = express();

// Serve static assets from the /public folder
app.use(express.static(join(__dirname, "public")));

// Endpoint to serve the configuration file
app.get("/auth_config.json", (req, res) => {
  res.sendFile(join(__dirname, "auth_config.json"));
});

// Serve the index page for all other requests
app.get("/*", (_, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

// Listen on port 3000
app.listen(3000, () => console.log("Application running on port 3000"));
```

The server provides two endpoints:

- one which serves the authentication configuration file to the client-side app
- another which serves every other request to the `index.html` file, which will provide support for any client-side routing as all routes go to the same page

The app also serves all of the static files, such as the `.js` and `.css` files from the `/public` folder.

## Initialize the SDK

The SDK must be properly initialized with the information of the Auth0 application created above.

To start, open the `public/js/app.js` file and add a variable to hold the Auth0 client object:

```js
let auth0 = null;
```

This must be initialized using the values from the `auth_config.json` file. This can be done by calling the endpoint on the server that was created in the previous section. To do this, create a new function called `fetchAuthConfig` further down the `app.js` file, which can be used to download this information:

```js

// ..

const fetchAuthConfig = () => fetch("/auth_config.json");
```

Next, create another new function called `configureClient`. This will use `fetchAuthConfig` to download the configuration file and initialize the `auth0` variable:

```js
// ..

const configureClient = async () => {
  const response = await fetchAuthConfig();
  const config = await response.json();

  auth0 = await createAuth0Client({
    domain: config.domain,
    client_id: config.clientId
  });
};
```

This call will also populate the in-memory cache with a valid access token and user profile information if someone has already authenticated before and that session is still valid.

Add a handler for the `window.onload` function that will then make this call to initialize the application:

```js
// ..

window.onload = async () => {
  await configureClient();
}
```

Now go and access it at [http://localhost:3000](http://localhost:3000). You should see the welcome message and both authentication buttons disabled. Note however that some browsers cache the page sources. When checking each step results you should perform a full page refresh ignoring the cache. This can be achieved by using the `CMD+SHIFT+R` keys on OSX and `CTRL+SHIFT+R` keys on Windows.

<%= include('../../_includes/_silent-auth-social-idp') %>

## Evaluate the authentication state

As a first approach, you want to make sure anyone is able to visit the public page but not the page that is meant for authenticated users only, such as a settings panel or the user profile details. You can decide which content is available by hiding, disabling, or removing it if no user is currently logged in. You do so by checking the result of calling the `auth0.isAuthenticated()` method. Use this to enable or disable the **Log in** and **Log out** buttons, which are disabled by default. This can be part of a new `updateUI()` function called from the `window.onload` method right after the initialization.

Still inside the `app.js` file, add a new function called `updateUI` and modify the `onload` handler to call this new function:

```js
// ..

window.onload = async () => {
  await configureClient();

  // NEW - update the UI state
  updateUI();
};

// NEW
const updateUI = async () => {
  const isAuthenticated = await auth0.isAuthenticated();

  document.getElementById("btn-logout").disabled = !isAuthenticated;
  document.getElementById("btn-login").disabled = isAuthenticated;
};
```

> **Checkpoint:** If you run the project again, you should see that the "Log in" button is shown as enabled as no user has previously logged in. But clicking it will not do anything as there is no logic associated to that action yet.

## Log In to the Application

Authentication is achieved through a redirect to the Auth0 [Universal Login Page](https://auth0.com/docs/hosted-pages/login). Once the user signs up or logs in, the result will be passed to your app's redirect URI, which is provided with the authorization request.

Inside the `app.js` file, provide a `login` function that calls `auth0.loginWithRedirect()` to perform the login step. The `login` function is called by the **Log in** button previously defined in the HTML page. In this sample, you will redirect the user back to the same page they are now. You can obtain that value from `window.location.origin` property:

```js
// ..

const login = async () => {
  await auth0.loginWithRedirect({
    redirect_uri: window.location.origin
  });
};
```

Additionally, because this is a _single page application_, the result of this call needs to be handled in the same context. This means that when the page is loaded and the user is not authenticated you could be in one of the following two scenarios:

1. The user does not want to authenticate and is just navigating through public content or
2. The user has recently initiated the authentication process and is now looking to complete it.

This second scenario is the one you need to handle. In your `window.onload` method, check whether the user is authenticated or not, and if the URL query contains both a `code` and `state` parameter. This will indicate that an authentication result is present and needs to be parsed. In that scenario, you do so by calling the `auth0.handleRedirectCallback()` method. This will attempt to exchange the result that the Auth0 backend gave you back for real tokens you can use.

In addition, the query parameters must be removed from the URL so that if the user refreshes the page, the app does not try to parse the `state` and `code` parameters again. This is achieved with the `window.history.replaceState` method.

Modify the `window.onload` function inside `app.js` to include these changes:

```js
// ..

window.onload = async () => {

  // .. code ommited for brevity

  updateUI();

  const isAuthenticated = await auth0.isAuthenticated();

  if (isAuthenticated) {
    // show the gated content
    return;
  }

  // NEW - check for the code and state parameters
  const query = window.location.search;
  if (query.includes("code=") && query.includes("state=")) {

    // Process the login state
    await auth0.handleRedirectCallback();
    
    updateUI();

    // Use replaceState to redirect the user away and remove the querystring parameters
    window.history.replaceState({}, document.title, "/");
  }
};

// ..
```

The callback is now handled properly and the authentication can be completed successfully.

Run the project and click the **Log in** button. You should be taken to the Universal Login Page configured for your application. Go ahead and create a new user or log in using a social connection. After authenticating successfully, you will be redirected to the page you were before. This time, the result will be present in the URL query and the exchange will happen automatically. If everything went fine, you will end up with no query parameters in the URL, the user would now be logged in and the "Log out" button will be enabled.

:::note
If you see any errors from the Auth0 server, check that you have not forgotten to whitelist the callback URL or the allowed origins as explained initially.
:::

## Log the User Out

You may have noticed that the **Log out** button is clickable when the user is authenticated, but does nothing. You need to add the code that will log the user out from the Auth0 backend.

Start the log out by calling the `auth0.logout()` method passing a valid return-to URI. In this sample you will return the user back to the same page they are now. You can obtain that value from `window.location.origin` property. Abstract this logic into a `logout()` method.

```js
// public/js/app.js

const logout = () => {
  auth0.logout({
    returnTo: window.location.origin
  });
};
```

> **Checkpoint:** Being authenticated click the **Log out** button. You should be taken to the Universal Login Page configured for your application and then back to the page you were before. Now the authentication cookies were cleared and the user is logged out. The "Log in" button will be enabled back again.

If you see any errors from the Auth0 server, check that you have not forgotten to whitelist the logout URL as explained initially.

## Read the User Profile

Every time a user is logged in you get access both to the **access token** and the **ID token**. The user's profile information is then extracted from the ID token. Typically, the token is used to call your backend application and the profile information is used to display their name and profile picture. In this section you are going to display them in separate text areas so you can easily inspect them.

Open the `index.html` file and insert the following lines at the bottom of the body.

```html
<body>
  <!-- ... -->

  <div class="hidden" id="gated-content">
    <p>
      You're seeing this content because you're currently
      <strong>logged in</strong>.
    </p>
    <label>
      Access token:
      <pre id="ipt-access-token"></pre>
    </label>
    <label>
      User profile:
      <pre id="ipt-user-profile"></pre>
    </label>
  </div>
  
  <!-- .. existing script tags .. -->
</body>
```

Now re-open the `app.js` file and modify the `updateUI()` function declared previously. Add the logic such that when the user is logged in the gated content is shown. Use the existing variables and functions from the SDK client to obtain and display this information on the page.

In addition, at the start of this article you added a `public/css/main.css` file with the definition of the `hidden` class, which can be used to easily hide elements on the page. Using the authenticated flag as shown below, add or remove this class to the elements you want to show or hide in the `updateUI()` function:

```js
// ...

const updateUI = async () => { 
  const isAuthenticated = await auth0.isAuthenticated();

  document.getElementById("btn-logout").disabled = !isAuthenticated;
  document.getElementById("btn-login").disabled = isAuthenticated;
  
  // NEW - add logic to show/hide gated content after authentication
  if (isAuthenticated) {
    document.getElementById("gated-content").classList.remove("hidden");

    document.getElementById(
      "ipt-access-token"
    ).innerHTML = await auth0.getTokenSilently();

    document.getElementById("ipt-user-profile").textContent = JSON.stringify(
      await auth0.getUser()
    );

  } else {
    document.getElementById("gated-content").classList.add("hidden");
  }
};

// ..
```

Note that calls to the SDK instance can throw an exception if the authentication fails, if there is no user currently authenticated, or if the access token needs to be refreshed and that request fails. You will need to put a try/catch block around them to correctly handle any errors. These error checks are not shown on the article but they are available on the final sample app that you can download.

> **Checkpoint:** Go ahead and run the project for the last time. Now if the user is authenticated you will get to see their access token and profile data. See how this content disappears when you log out.
