---
section: exercises
description: Auth0 digital identity Lab 2, Exercise 1: Consuming APIs
topics:
  - digital identity
  - OIDC
  - OpenId Connect
  - OAuth2
contentType:
    - index
    - concept
---
# Lab 2, Exercise 1: Consuming APIs

::: warning
If you came to this page directly, go to the [first page of this lab](/identity-labs/02-calling-an-api) and read through the instructions before getting started.
:::

After learning how to secure your web application with Auth0 in [lab 1](/identity-labs/01-web-sign-in), you will now learn how to make this application consume APIs on behalf of your users. You will start by running an unsecured API and a web application to see both working together, and then you will secure your API with Auth0.

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
      <div class="video-wrapper" data-video="ucdc0nohs4"></div>
      <hr>
      <div class="video-wrapper" data-video="xjimnp9iqt"></div>
      <hr>
    </div>
    <div id="text-tutorial" class="tab-pane">

1. Open a new terminal and browse to `/lab-02/begin/api` in your locally-cloned copy of the [identity exercise repo](https://github.com/auth0/identity-102-exercises/). This is where the code for your API resides. The API is an Express backend that contains a single endpoint. This endpoint (served under the root path) returns expenses, which are data that belong to each user (though they are static and the same for all).

<%= include('../_includes/_git-clone-note') %>

2. Install the dependencies using npm:

```bash
# Make sure we're in the right directory
❯ pwd
/Users/username/identity-102-exercises/lab-02/begin/api

❯ npm install
# Ignore any warnings

added XX packages in X.XXs
```

3. Next, copy `.env-sample` to `.env` and start the API:

```bash
❯ cp .env-sample .env
❯ npm start

listening on http://localhost:3001
```

::: note
If you see a message like *Error: listen EADDRINUSE :::3001* in your terminal after starting the application, this means that port 3001 is in use somewhere. Change the `PORT` value in your `.env` file to "3002" and try again.
:::

4. In a new terminal window or tab, navigate to the `/lab-02/begin/webapp` directory and install the dependencies using npm:

```bash
# Navigating from the previous directory
❯ cd ../webapp

# Make sure we're in the right directory
❯ pwd
/Users/username/identity-102-exercises/lab-02/begin/webapp

❯ npm install
# Ignore any warnings

added XX packages in X.XXs
```

5. Once again, copy the `.env-sample` to `.env` for the web application:

```bash
❯ cp .env-sample .env
```

6. Update the web application `.env` file you just created with the same values as you used in lab 1. If you did not do lab 1 first, follow steps 9 through 15 [on this page](/identity-labs/01-web-sign-in/exercise-01) to create and configure an application with Auth0 and update the `.env` file.

```text
ISSUER_BASE_URL=https://YOUR_DOMAIN
CLIENT_ID=YOUR_CLIENT_ID
API_URL=http://localhost:3001
PORT=3000
APP_SESSION_SECRET=LONG_RANDOM_STRING
```

::: note
If you changed the port for the API above, make sure to update the `API_URL` with this new value.
:::

7. Start the web application using npm:

```bash
❯ npm start

listening on http://localhost:3000
```

8. Open [localhost:3000](http://localhost:3000) in your browser. There, you will see the homepage of the web application and, if you log in, you will be able to access the expenses report. The page might look similar to the Lab 1 solution, however, the difference is that an external API provides the Expenses information instead of being hard-coded in the Web app.

![First page of the starter application](/media/articles/identity-labs/lab-02-starter-app-rendered.png)

Right now, even though the application requires authentication, the API does not. That is, you are calling the API from the Web app, without any authentication information. If you browse to the API's URL at [localhost:3001](http://localhost:3001) without logging in, you will see the expenses. In the following steps, you will update your application to call the API with a token.

9. Open `webapp/server.js` in your code editor and make the following change:

```js
// webapp/server.js

app.use(auth({
  required: false,
  auth0Logout: true,
  baseURL: appUrl,

  // Add the additional configuration keys below 👇
  authorizationParams: {
    response_type: 'code id_token',
    response_mode: 'form_post',
    audience: process.env.API_AUDIENCE,
    scope: 'openid profile email read:reports'
  },
  handleCallback: async function (req, res, next) {
    req.session.openidTokens = req.openidTokens;
    req.session.userIdentity = req.openidTokens.claims();
    next();
  },
  getUser: async function (req) {
    return req.session.userIdentity;
  }
  // 👆

}));
```

This change updates the configuration object passed to `auth()` and defines how you want the `express-openid-connect` library to behave. In this case, you configured the library with a new property called `authorizationParams` and passed in an object with three properties:

- `response_type` - setting this field to `code id_token` indicates that you no longer want the middleware to fetch just an ID token (which is the default behavior for this package). Instead, you are specifying that you want an ID token *and* an authorization code. When you configure the `express-openid-connect` library to fetch an authorization code, the middleware automatically exchanges this code for an access token (this process is known as the Authorization Code Grant flow). Later, you will use the access token to call the API.
- `response_mode` - This is the same mode used in lab 1, a POST request from the authorization server to the application.
- `audience` - this tells the middleware that you want access tokens valid for a specific resource server (your API, in this case). As you will see soon, you will configure an `API_AUDIENCE` environment variable to point to the identifier of an API that you will register with Auth0.
- `scope` - securing your API uses a delegated authorization mechanism where an application (your web app) requests access to resources controlled by the user (the resource owner) and hosted by an API (the resource server). Scopes, in this case, are the permissions that the access token grants to the application on behalf of the user. In your case, you are defining four scopes: the first three (`openid`, `profile`, and `email`) are scopes related to the user profile (part of OpenID Connect specification). The last one, `read:reports`, is a custom scope that will be used to determine whether the caller is authorized to retrieve the expenses report from the API on behalf of a user.

The `appSessionSecret`, `handleCallback`, and `getUser` additions change how the user session is handled and stores the incoming access and refresh tokens somewhere we can access later.

10. Back in the `webapp/server.js` file, find the `/expenses` endpoint definition. In this code, you are making a request to the API, without any authorization information, to get a JSON resource. Note the use of the `requiresAuth()` middleware. This will enforce authentication for all requests to this endpoint.

11. Update the endpoint definition to include authorization information in the request:

```js
// webapp/server.js

app.get('/expenses', requiresAuth(), async (req, res, next) => {
  try {

    // Replace this code ❌
    /*
    const expenses = await request(process.env.API_URL, {
      json: true
    });
    */

    // ... with the code below 👇
    let tokenSet = req.openid.makeTokenSet(req.session.openidTokens);
    const expenses = await request(process.env.API_URL, {
      headers: { authorization: "Bearer " + tokenSet.access_token },
      json: true
    });

    // ... keep the rest
  }
  // ...
});
```

In the new version of this endpoint, you are sending the access token in an `Authorization` header when sending requests to the API. By doing so, the web application consumes the API on behalf of the logged in user.

12. Add the following two environment variables to the `webapp/.env` file:

```text
API_AUDIENCE=https://expenses-api
CLIENT_SECRET=YOUR_APPLICATION_CLIENT_SECRET
```

The `API_AUDIENCE` value is the identifier for the API that will be created in the following exercise. To get your Client Secret, go to your Application settings page in the Auth0 Dashboard:

![Application client secret field](/media/articles/identity-labs/lab-02-client-secret-config.png)

**And that's it!** You have just configured your web application to consume the API on behalf of the logged in user.

If you restart the application in your terminal, logout, and try to log back in, you will see an error because no resource server with the identifier `https://expenses-api` has been registered yet. In the next exercise, you will learn how to create and secure APIs with Auth0, and this request will begin to work.

</div>
  </div>
</div>

<a href="/identity-labs/02-calling-an-api/exercise-02" class="btn btn-transparent">Next →</a>
