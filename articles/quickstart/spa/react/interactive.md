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

# Add Login to your React App

Auth0 allows you to add authentication to almost any application type quickly. This guide demonstrates how to integrate Auth0, add authentication, and display user profile information in any React application using the Auth0 React SDK.

To use this quickstart, you’ll need to:
- Sign up for a free Auth0 account or log in to Auth0.
- Have a working React project that you want to integrate with. Alternatively, you can view or download a sample application after logging in.

## Configure Auth0 {{{ data-action=configure }}}

To use Auth0 services, you’ll need to have an application set up in the Auth0 Dashboard. The Auth0 application is where you will configure how you want authentication to work for the project you are developing.

### Configure an application

Use the interactive selector to create a new Auth0 application or select an existing application that represents the project you want to integrate with. Every application in Auth0 is assigned an alphanumeric, unique client ID that your application code will use to call Auth0 APIs through the SDK.

Any settings you configure using this quickstart will automatically update for your Application in the <a href="${manage_url}/#/">Dashboard</a>, which is where you can manage your Applications in the future.

If you would rather explore a complete configuration, you can view a sample application instead.

### Configure Callback URLs

A callback URL is a URL in your application that you would like Auth0 to redirect users to after they have authenticated. If not set, users will not be returned to your application after they log in.

::: note
If you are following along with our sample project, set this to http://localhost:3000.
:::

### Configure Logout URLs

A logout URL is a URL in your application that you would like Auth0 to redirect users to after they have logged out. If not set, users will not be able to log out from your application and will receive an error.

::: note
If you are following along with our sample project, set this to http://localhost:3000.
:::

### Configure Allowed Web Origins

An Allowed Web Origin is a URL that you want to be allowed to access to your authentication flow. This must contain the URL of your project. If not properly set, your project will be unable to silently refresh authentication tokens, so your users will be logged out the next time they visit your application or refresh a page.

::: note
If you are following along with our sample project, set this to http://localhost:3000.
:::

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
- `redirectUri`: The URL in your application that you would like Auth0 to redirect users to after they have authenticated. This corresponds to the callback URL you set up earlier in this quickstart. You can also find this value in the Auth0 Dashboard under your Application's Settings in the Callback URLs field. Make sure what you enter in your code matches what you set up earlier or your users will see an error.

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

## Add Login to Your Application {{{ data-action=code data-code="login.js#4:7" }}}

Now that you have configured your Auth0 Application and the Auth0 React SDK, you need to set up login for your project. To do this, you will use the SDK’s loginWithRedirect() method to create a login button that redirects users to the Auth0 Universal Login page. After a user successfully authenticates, they will be redirected to the callback URL you set up earlier in this quickstart.

<%= include('../../_includes/_auth0-react-classes-info.md') %>

Create a new file in your application called `login.js` for the login button component, and copy in the code from the interactive panel to the right, which contains the logic needed for login. Then, update your `index.js` file to include the new login button.

::::checkpoint

:::checkpoint-default

You should now be able to log in or sign up using a username and password.

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
