---
title: Add Login to your React App
description: "Auth0 allows you to add authentication to your React application quickly and to gain access to user profile information. This guide demonstrates how to integrate Auth0 with any new or existing React application using the Auth0 React SDK."
interactive: true
files:
  - files/index
  - files/login
  - files/logout
  - files/profile
github:
  path: Sample-01
---

:::note
Visit the [React Authentication By Example](https://developer.auth0.com/resources/guides/spa/react/basic-authentication) guide for a deep dive into implementing user authentication in React. This guide provides additional details on how to create a sign-up button, add route guards using React Router, and call a protected API from React.
:::

# Add Login to Your React Application

Auth0 allows you to add authentication to almost any application type quickly. This guide demonstrates how to integrate Auth0, add authentication, and display user profile information in any React application using the Auth0 React SDK.

To use this quickstart, you’ll need to:
- Sign up for a free Auth0 account or log in to Auth0.
- Have a working React project that you want to integrate with. Alternatively, you can view or download a sample application after logging in.

<%= include('../../_includes/_configure_auth0_interactive', { 
  callback: 'http://localhost:3000',
  returnTo: 'http://localhost:3000',
  webOriginUrl: 'http://localhost:3000',
  showWebOriginInfo: true
}) %>

## Install the Auth0 React SDK {{{ data-action=code data-code="index.js#13:22" }}}

Auth0 provides a [React SDK](https://github.com/auth0/auth0-react) (auth0-react.js) to simplify the process of implementing Auth0 authentication and authorization in React apps.

Install the Auth0 React SDK by running the following commands in your terminal:

```bash
cd <your-project-directory>
npm install @auth0/auth0-react
```

### Configure the Auth0Provider component

For the SDK to function properly, you must set the following properties in the Auth0Provider component:

- `domain`: The domain of your Auth0 tenant. Generally, you can find this in the Auth0 Dashboard under your Application's Settings in the Domain field. If you are using a [custom domain](https://auth0.com/docs/custom-domains), you should set this to the value of your custom domain instead.
- `clientId`: The ID of the Auth0 Application you set up earlier in this quickstart. You can find this in the Auth0 Dashboard under your Application's Settings in the Client ID field.
- `authorizationParams.redirect_uri`: The URL in your application that you would like Auth0 to redirect users to after they have authenticated. This corresponds to the callback URL you set up earlier in this quickstart. You can also find this value in the Auth0 Dashboard under your Application's Settings in the Callback URLs field. Make sure what you enter in your code matches what you set up earlier or your users will see an error.

::::checkpoint

:::checkpoint-default

Your Auth0Provider component should now be properly configured. Run your application to verify that:
- the SDK is initializing correctly
- your application is not throwing any errors related to Auth0

:::

:::checkpoint-failure
Sorry about that. Here's a couple things to double check:
* make sure the correct application is selected
* did you save after entering your URLs?
* make sure the domain and client ID imported correctly

Still having issues? Check out our [documentation](https://auth0.com/docs) or visit our [community page](https://community.auth0.com) to get more help.

:::
::::

## Add login to your application {{{ data-action=code data-code="login.js#4:7" }}}

Now that you have configured your Auth0 Application and the Auth0 React SDK, you need to set up login for your project. To do this, you will use the SDK’s loginWithRedirect() method to create a login button that redirects users to the Auth0 Universal Login page. After a user successfully authenticates, they will be redirected to the callback URL you set up earlier in this quickstart.

<%= include('../../_includes/_auth0-react-classes-info.md') %>

Create a new file in your application called `login.js` for the login button component, and copy in the code from the interactive panel to the right, which contains the logic needed for login. Then, update your `index.js` file to include the new login button.

::::checkpoint

:::checkpoint-default

You should now be able to log in or sign up using a username and password.

Click the login button and verify that:
* your React Application redirects you to the Auth0 Universal Login page
* you can log in or sign up
* Auth0 redirects you to your application using the value of the `authorizationParams.redirect_uri` you used to configure the `Auth0Provider`

:::

:::checkpoint-failure
Sorry about that. Here's a couple things to double check:
* you configured the correct `authorizationParams.redirect_uri`
* you added the Login button to the `index.js` file

Still having issues? Check out our [documentation](https://auth0.com/docs) or visit our [community page](https://community.auth0.com) to get more help.

:::
::::

## Add logout to your application {{{ data-action=code data-code="logout.js#10:18" }}}

Users who log in to your project will also need a way to log out. Create a logout button using the SDK’s logout() method. When users log out, they will be redirected to your [Auth0 logout](https://auth0.com/docs/api/authentication?javascript#logout) endpoint, which will then immediately redirect them to the logout URL you set up earlier in this quickstart.

Create a new file in your application called `logout.js` for the logout button component, and copy in the code from the interactive panel, which contains the logic needed for logout. Then, update your `index.js` file to include the logout button.

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

Now that your users can log in and log out, you will likely want to be able to retrieve the [profile information](https://auth0.com/docs/users/concepts/overview-user-profile) associated with authenticated users. For example, you may want to be able to display a logged-in user’s name or profile picture in your project.

The Auth0 React SDK provides user information through the `user` property. Review the `profile.js` code in the interactive panel to see an example of how to use it.

Because the `user` property contains sensitive information related to the user's identity, its availability depends on the user's authentication status. To prevent render errors, you should always:
- use the `isAuthenticated` property to determine whether Auth0 has authenticated the user before React renders any component that consumes the `user` property.
- ensure that the SDK has finished loading by checking that `isLoading` is false before accessing the `isAuthenticated` property.

::::checkpoint

:::checkpoint-default

Verify that:
* you can display the `user.name` or any other user property within a component correctly after you have logged in

:::

:::checkpoint-failure
Sorry about that. Here's a couple things to double check:
* you added the `isLoading` check before accessing the `isAuthenticated` property
* you added the `Profile` component to the `index.js` file 

Still having issues? Check out our [documentation](https://auth0.com/docs) or visit our [community page](https://community.auth0.com) to get more help.
:::

::::
