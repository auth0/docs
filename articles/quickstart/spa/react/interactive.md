---
title: Add Login to your React App
description: "Auth0 allows you to add authentication to your React application quickly and to gain access to user profile information. This guide demonstrates how to integrate Auth0 with any new or existing React application using the Auth0 React SDK."
interactive: true
files:
  - _files/index
  - _files/login
  - _files/logout
  - _files/profile
github:
  path: Sample-01
---

# Add Login to your React App

<!-- TODO should we pull from the `description` like current design for opening paragraph?" -->
Auth0 allows you to quickly add authentication and gain access to user profile information in your application. This guide demonstrates how to integrate Auth0 with any new or existing React application using the Auth0 React SDK. 

## Configure Auth0 {{{ data-action=configure }}}

### Create a new application

<!-- TODO need to handle logged in/logged out behavior like in _new_app.html include? -->
Create a new <a href="${manage_url}/applications">application</a> or select an existing application to integrate with. You can also create and manage your applications in the <a href="${manage_url}/#/">Dashboard</a> at Dashboard > Applications > Applications. 

If you are logged in configuring your settings in the quickstart will automatically update your settings in the dashboard.

### Configure Callback URLs

A callback URL is a URL in your application where Auth0 redirects the user after they have authenticated. If not set, users won't have a place to be redirected to after logging in.

### Configure Logout URLs

A logout URL is a URL in your application that Auth0 can return to after the user has been logged out of the authorization server. This is specified in the returnTo query parameter. If this field is not set, users will be unable to log out from the application and will get an error.

### Configure Allowed Web Origins

You need to add the URL for your app to the Allowed Web Origins field in your Application Settings. If you don't register your application URL here, the application will be unable to silently refresh the authentication tokens and your users will be logged out the next time they visit the application, or refresh the page. 

<!-- TODO this normally comes in from the _getting_started include (along with other things). Should this be part of app configuration? Any logged in/logged out different behaviors needed? -->
::: note
If you are following along with the sample project you downloaded from the top of this page, you should set the **Allowed Web Origins** to `http://localhost:3000`.
:::

## Install the Auth0 React SDK {{{ data-action=code data-code="index.js#13:22" }}}

In your terminal, run the command within your application directory to install the Auth0 React SDK.

<!-- TODO the code block component includes a feedback block. Do we want that? If so, need to differentiate the feedback for this new QS design -->

```bash
npm install @auth0/auth0-react
```

### Configure the Auth0Provider component

The Auth0Provider component takes the following properties:

- `domain` and `clientId`: The values of these properties correspond to the "Domain" and "Client ID" values present under the "Settings" of the single-page application that you registered with Auth0.
- `redirectUri`: The URL to where you'd like to redirect your users after they authenticate with Auth0.

:::note
If you are using a [custom domain with Auth0](https://auth0.com/docs/custom-domains), the value of the domain property is the value of your custom domain instead of the value reflected in the "Settings" tab.
:::

::::checkpoint

:::checkpoint-default

Now that you have configured `Auth0Provider`, run your application to verify that:
* the SDK is initializing correctly
* your application is not throwing any errors related to Auth0

:::

:::checkpoint-failure
Sorry about that. Here's a couple things to double check:
* make sure the correct application is selected
* did you save after entering your URLs?
* make sure the domain and client ID imported correctly

Still having issues? Check out our [documentation](https://auth0.com/docs) or visit our [community page](https://community.auth0.com) to get more help.

:::

## Add Login to Your Application {{{ data-action=code data-code="login.js#4:7" }}}

The Auth0 React SDK gives you tools to quickly implement user authentication in your React application. Create a [login](https://auth0.com/docs/login) button using `loginWithRedirect()` to redirect users to the Auth0 Universal Login page. After the user successfully logs in, they are redirected back to your React application's Callback URL.

Create a new file in your application called `login.js`, then copy in the following code sample containing the logic needed for login. Next, update your `index.js` file to include the new login button.

<%= include('../../_includes/_auth0-react-classes-info.md') %>

::::checkpoint

:::checkpoint-default

You should now be able to log in or sign up using a username and password or social provider.

Click the login button and verify that:
* your React Application redirects you to the Auth0 Universal Login page
* you can log in or sign up
* Auth0 redirects you to your application using the value of the `redirectUri` you used to configure the `Auth0Provider`

:::

:::checkpoint-failure
Sorry about that. Here's a couple things to double check:
* you configured the correct `redirectUri`
* you added the Login button to the `index.js` file

Still having issues? Check out our [documentation](https://auth0.com/docs) or visit our [community page](https://community.auth0.com) to get more help.

:::
::::

## Add Logout to your Application {{{ data-action=code data-code="logout.js#10:18" }}}

Create a logout button using the `logout()` method from the `useAuth0` hook. Executing `logout()` redirects your users to your [Auth0 logout](https://auth0.com/docs/api/authentication?javascript#logout) endpoint (`https://YOUR_DOMAIN/v2/logout`) and then immediately redirects them to your application.

Create a new `logout.js` file for the logout button component and add the following code to the file. Finally, add the logout button to the main screen of your app.

::::checkpoint

:::checkpoint-default

Run your application and click the logout button, verify that:
* your React application redirects you to the address you specified as one of the Allowed Logout URLs in your Application Settings
* you are no longer logged in to your application

:::

:::checkpoint-failure
Sorry about that. Here's a couple things to double check:
* you configured the correct Logout URL
* you added the Logout button to the `index.js` file 

Still having issues? Check out our [documentation](https://auth0.com/docs) or visit our [community page](https://community.auth0.com) to get more help.

:::

::::

## Show User Profile Information {{{ data-action=code data-code="profile.js#11:26" }}}

The Auth0 React SDK helps you retrieve the [profile information](https://auth0.com/docs/users/concepts/overview-user-profile) associated with logged-in users quickly in whatever component you need, such as their name or profile picture. The profile information is available through the `user` property exposed by the `useAuth0()` hook. This `Profile` component is an example of how to use it.

The `user` property contains sensitive information and artifacts related to the user's identity. As such, its availability depends on the user's authentication status. To prevent any render errors, use the `isAuthenticated` property from `useAuth0()` to check if Auth0 has authenticated the user before React renders any component that consumes the user property. Ensure that the SDK has completed loading before accessing the `isAuthenticated` property, by checking that `isLoading` is `false`.

::::checkpoint

:::checkpoint-default

Verify that:
* you can display the `user.name` or any other user property within a component correctly after you have logged in

:::

<!-- TODO real failure scenario checks -->
:::checkpoint-failure
Sorry about that. Here's a couple things to double check:
* TODO
* TODO 

Still having issues? Check out our [documentation](https://auth0.com/docs) or visit our [community page](https://community.auth0.com) to get more help.

:::

::::
