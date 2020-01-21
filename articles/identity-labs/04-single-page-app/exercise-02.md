---
section: exercises
description: Auth0 digital identity Lab 4, Exercise 2: Calling a Protected API
topics:
  - digital identity
  - OIDC
  - OpenId Connect
  - OAuth2
contentType:
  - index
  - concept
---
# Lab 4, Exercise 2: Calling a Protected API

::: warning
If you came to this page directly, go to the [first page of this lab](/identity-labs/04-single-page-app) and read through the instructions before getting started.
:::

In this exercise, you will learn how to make your SPA consume, on behalf of the user, the private endpoint exposed by the API.

::: note
You can continue using the source code from the previous exercise, or if you are starting from scratch, use the code in the `exercise-02/begin` folder. Make sure you run steps 1-6 in [exercise 1](/identity-labs/04-single-page-app/exercise-01) either way.
:::

To make your SPA consume the private endpoint on the user's behalf, it must fetch an access token first, then call the protected API. The first time your application asks for an access token for an API, the authorization server will request explicit consent from your users.

To request this consent, your application will open a popup that will load a page from the authorization server. On that page, your users will learn what type of access your application is requesting, and they will be able to grant access or deny it.

1. Open `spa/scripts/expenses.js`. You will see a few constants that reference DOM elements (like `loadExpensesButton` and `loadingExpenses`). Right after these constants, add the configuration code for the API.

```js
// spa/scripts/expenses.js
(async function() {
  // ... other constants
  const loadingExpenses = document.getElementById('loading-expenses');

  // Add the code below 👇
  const expensesAPIOptions = {
    audience: 'https://expenses-api',
    scope: 'read:reports',
  };

  // ...
})();
```

The `expensesAPIOptions` constant is a configuration object that will tell the SPA SDK the audience and scope needed in the access token your application will request. The SDK will try to fetch access tokens capable of consuming the `https://expenses-api` API with the `read:reports` scope.

2. Request the access token required to retrieve the expenses from the protected API on behalf of the user with the code below.

```js
// spa/scripts/expenses.js
(async function() {
  // ... code from the previous example

  // Add the code below 👇
  try {
    const accessToken = await auth0Client.getTokenSilently(expensesAPIOptions);
    await loadExpenses(accessToken);
  } catch (err) {
    if (err.error !== 'consent_required') {
      alert('Error while fetching access token. Check browser logs.');
      return console.log(err);
    }

    loadExpensesButton.onclick = async () => {
      accesstoken = await auth0Client.getTokenWithPopup(expensesAPIOptions);
      await loadExpenses(accesstoken);
    };

    consentNeeded.style.display = 'block';
    loadExpensesButton.style.display = 'inline-block';
    loadingExpenses.style.display = 'none';
  }

  // ...
})();
```

The lines above are nested inside a `try/catch` block and are executed when the expenses view is requested. First, the application calls the `getTokenSilently()` method (provided by the SPA SDK) to see if your application is able to fetch a token without involving your user. If your app fetches the access token successfully, the application calls the `loadExpenses()` function with this token to load and display expenses (you will define this function in the next step).

If your application is not able to fetch an access token (an error occurs, or the user is not logged in), the application checks if the problem is `consent_required`, which means that the user has not given consent to access the API yet. If that is not the case, it means an unknown error has been raised, and your application will alert the user and log the error to the browser’s console.

If `consent_required` is indeed the problem, then you define the behavior of the `loadExpensesButton` and show the `consentNeeded` and `loadExpensesButton` DOM elements. These DOM elements are responsible for letting the user know that they will need to give your application explicit consent to consume the API on their behalf. More specifically, after reading the message, if your users click the `loadExpensesButton`, your application will trigger the SDK-provided `getTokenWithPopup()` method to open a popup where your users will be able to give consent.

3. Call the API using the access token with the code below.

```js
// spa/scripts/expenses.js
(async function() {
  // ... code from the previous example

  // Add the code below 👇
  async function loadExpenses(accesstoken) {
    try {
      const response = await fetch('http://localhost:3001/', {
        method: 'GET',
        headers: { authorization: 'Bearer ' + accesstoken }
      });

      if (!response.ok) {
        throw 'Request status: ' + response.status;
      }

      const expenses = await response.json();
      displayExpenses(expenses);
    } catch (err) {
      console.log(err);
      alert('Error while fetching expenses. Check browser logs.');
    }
  }

  // ...
})();
```

After fetching an access token (silently or explicitly through the popup), your application will invoke the function above to issue a request to the private API on the user's behalf. Note the `authorization` header passed to the `fetch()` function; this header includes the access token required to consume the expenses API.

After executing the request to the API, if successful, the `displayExpenses()` function is called. This function creates the DOM elements on the page to represent the expenses and is already defined in the `spa/scripts/expenses.js` file at the bottom.

4. Open `spa/scripts/navbar.js` and search for the block that gets executed when the user `isAuthenticated`. Inside this block, right after changing the display property of the `logOutButton`, add the code below. This will display a link to the expenses view in the navigation bar when the user is authenticated.

```js
// spa/scripts/navbar.js
(async function() {
  // ... code from the previous example

  const isAuthenticated = await auth0Client.isAuthenticated();
  if (isAuthenticated) {
    // ...

    // Add the line below 👇
    expensesLink.style.display = 'inline-block';
  } // ...

})();
```

5. You are now ready to test the new version of the application. Save all the changes and reload the application in your browser. You should see the **Expenses** link in the navigation bar at the top.

![Expenses link on single-page application](/media/articles/identity-labs/lab-04-expenses-link-showing.png)

6. Click **Expenses** link, and you should see the consent prompt.

![Consent link on single-page application](/media/articles/identity-labs/lab-04-consent-link-showing.png)

7. Because you have not provided consent yet, you will see an **Allow App to Load Expenses** button. Clicking it will open the consent popup; note that the **Reports** scope is now included.

![Consent prompt on single-page application](/media/articles/identity-labs/lab-04-consent-prompt.png)

In the popup, click the **Accept** button to give consent. The popup will close, and your application will get the access token it needs. With this token, the SPA will call the `loadExpenses()` function and show the data retrieved from the API.

![Expenses API data loading in single-page application](/media/articles/identity-labs/lab-04-expenses-data-showing.png)

::: note
If you want to recreate the scenario where consent is needed, go to the [Users screen of the Auth0 Dashboard](${manage_url}/#/users), view your test user, click the **Authorized Applications** tab, and click **Revoke** for the single-page application with the Expenses API audience.

![Revoke application permission for an API](/media/articles/identity-labs/lab-04-revoke-app.png)
:::

🎉 **You have completed Lab 4 by building a single-page application calling a secure API!** 🎉

<a href="/identity-labs/" class="btn btn-transparent">← All Identity Labs</a>
