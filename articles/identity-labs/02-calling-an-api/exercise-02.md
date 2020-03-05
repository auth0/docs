---
section: exercises
description: Auth0 digital identity Lab 2, Exercise 2: Securing APIs with Auth0
topics:
  - digital identity
  - OIDC
  - OpenId Connect
  - OAuth2
contentType:
  - index
  - concept
---
# Lab 2, Exercise 2: Securing APIs with Auth0

::: warning
If you came to this page directly, go to the [first page of this lab](/identity-labs/02-calling-an-api) and read through the instructions before getting started.
:::

In this exercise, you will register the API with Auth0 so that tokens can be issued for it. You will also learn how to secure your API with Auth0. You will refactor the API that your web application is consuming by installing and configuring some libraries needed to secure it with Auth0.

1. To register the API with Auth0, open the Auth0 Dashboard and go to the [APIs screen](${manage_url}/#/apis).

2. Click the **Create API** button. Add a descriptive Name, paste `https://expenses-api` into the **Identifier** field, and click **Create**.

3. Click the **Permissions** tab and add a new permission called `read:reports` with a suitable description. This custom permission is the one you will use to determine whether the client is authorized to retrieve expenses.

4. In your terminal, restart your web application with `[CTRL]` + `[c]`, then `npm start`.

5. Log out of the web application by clicking [logout](http://localhost:3000/logout), then log in again. When logging in, you will see a consent screen where Auth0 mentions that the web application is requesting access to the read:reports scope:

![API consent screen on the authorization server](/media/articles/identity-labs/lab-02-api-consent-initial.png)

6. Agree to this delegation by clicking the **Accept** button, and Auth0 will redirect you back to the application. Now, you should still be able to see your expenses on the expenses page, [localhost:3000/expenses](http://localhost:3000/expenses):

![Application expenses page](/media/articles/identity-labs/lab-02-starter-app-rendered.png)

::: note
If at any point, you want to see the consent screen again when logging in, you can go to the Users screen in the Auth0 Dashboard, click on the user you'd like to modify, click the **Authorized Applications** tab, find the application you're using, and click **Revoke**. The next time you log in, the consent screen will appear again.
:::

As mentioned earlier, the expenses API is still not secure. You can see this by navigating directly to [localhost:3001](http://localhost:3001/). The expense data is available publicly, without an access token. The next steps will change the API to require a properly-scoped access token to view.

4. In your terminal, stop your API with `[CTRL]` + `[c]`.

5. Install the `express-oauth2-bearer` npm package. This is an Express authentication middleware used to protect OAuth2 resources, which validates access tokens:

```bash
# Make sure we're in the right directory
❯ pwd
/Users/username/identity-102-exercises/lab-02/begin/api

❯ npm install express-oauth2-bearer@0.4.0 --save
# Ignore any warnings

+ express-oauth2-bearer@0.4.0
added XX packages in X.XXs
```

6. Open the `api/api-server.js` file and add a statement to import the library. Make sure this is added after the dotenv require statement:

```js
// api/api-server.js

require('dotenv').config();
// ... other require statements

// Add the line below 👇
const { auth, requiredScopes } = require('express-oauth2-bearer');
```

7. Configure the Express app to use the authentication middleware for all requests:

```js
// api/api-server.js

// ... other require statements
const app = express();

// Add the line below 👇
app.use(auth());
```

8. Find the `/` endpoint code and update it to require the `read:reports` scope in access tokens. This is done by adding a `requiredScopes` middleware, as shown below:

```js
// lab-02/begin/api/api-server.js

// Change only the line below 👇
app.get('/', requiredScopes('read:reports'), (req, res) => {

    // ... leave the endpoint contents unchanged.

});
```

The next time you run your API, all requests that do not include a valid access token (expired token, incorrect scopes, etc.) will return an error instead of the desired data.

9. Open the `api/.env` file you created before and change the `ISSUER_BASE_URL` value to your own Auth0 base URL (same as the one in your application). The `.env` file should look like this:

```text
PORT=3001
ISSUER_BASE_URL=https://your-tenant-name.auth0.com
ALLOWED_AUDIENCES=https://expenses-api
```

10. Once again, start the API server with npm:

```bash
❯ npm start

listening on http://localhost:3001
```

To test your secured API, refresh the expenses page in your application - [localhost:3000/expenses](http://localhost:3000/expenses). If everything works as expected, you will still be able to access this view (which means that the web app is consuming the API on your behalf). If you browse directly to the API at [localhost:3001](http://localhost:3001), however, you will get an error saying the token is missing.

<a href="/identity-labs/02-calling-an-api/exercise-03" class="btn btn-transparent">Next →</a>
