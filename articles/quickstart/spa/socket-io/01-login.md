---
title: Login
description: This tutorial demonstrates how to use the Auth0 Socket.io SDK to add authentication and authorization to your web app.
budicon: 448
github:
  path: 01-Login
---

## 1. Set up the Allowed Origin (CORS) in Auth0

<div class="setup-origin">
<p>Go to the <a href="${manage_url}/#/applications/${account.clientId}/settings">Application Settings</a> section in the Auth0 dashboard and make sure to add your URL as an <b>Allowed Origin (CORS)</b>. If you're testing it locally, it should contain the following value:</p>

<pre><code>http://localhost:3001</pre></code>

</div>

## 2. Installation

Install [socketio-jwt](https://github.com/auth0/socketio-jwt) from npm and save it to your `package.json` using

```text
npm install --save socketio-jwt
```

## 3. Add the Auth0 Script and Set the Viewport

Add the code below to the `index.html` file to include the Auth0 `lock` script and set the viewport:

${snippet(meta.snippets.dependencies)}

## 4. Configure Auth0Lock

Configure Auth0Lock with your `clientId` and `domain`:

${snippet(meta.snippets.setup)}

To discover all the available options, see [User configurable options](/libraries/lock/v10/customization).

## 5. Implement the Login

To implement the login, call the `.show()` method of Auth0's `lock` instance when a user clicks the login button, and save the JWT token to `localStorage` for later use in calling a server or an API:

${snippet(meta.snippets.use)}
