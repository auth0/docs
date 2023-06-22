---
title: Add Login to your Next.js application
description: This guide demonstrates how to integrate Auth0 with any new or existing Next.js application using the Auth0 Next.js SDK.
topics:
  - quickstarts
  - webapp
  - nextjs
  - login
github:
  path: Sample-01
contentType: tutorial
useCase: quickstart
interactive: true
files:
  - files/env
  - files/auth
  - files/app
  - files/login
  - files/logout
  - files/profile
---

<!-- markdownlint-disable MD025 MD034 -->

# Add Login to your Next.js application

This guide demonstrates how to integrate Auth0 with any new or existing Next.js application using the Auth0 Next.js SDK. We recommend that you log in to follow this quickstart with examples configured for your account.

<%= include('../../_includes/_configure_auth0_interactive', {
callback: 'http://localhost:3000/api/auth/callback',
returnTo: 'http://localhost:3000'
}) %>

## Install the Auth0 Next.js SDK

Run the following command within your project directory to install the Auth0 Next.js SDK:

```sh
npm install @auth0/nextjs-auth0
```

The SDK exposes methods and variables that help you integrate Auth0 with your Next.js application using [API Routes](https://nextjs.org/docs/api-routes/introduction) on the backend and [React Context](https://reactjs.org/docs/context.html) with [React Hooks](https://reactjs.org/docs/hooks-overview.html) on the frontend.

## Configure the SDK {{{ data-action=code data-code=".env.local" }}}

In the root directory of your project, add the file `.env.local` with the following [environment variables](https://nextjs.org/docs/basic-features/environment-variables):

- `AUTH0_SECRET`: A long secret value used to encrypt the session cookie. You can generate a suitable string using `openssl rand -hex 32` on the command line.
- `AUTH0_BASE_URL`: The base URL of your application.
- `AUTH0_ISSUER_BASE_URL`: The URL of your Auth0 tenant domain. If you are using a [Custom Domain with Auth0](https://auth0.com/docs/custom-domains), set this to the value of your Custom Domain instead of the value reflected in the "Settings" tab.
- `AUTH0_CLIENT_ID`: Your Auth0 application's Client ID.
- `AUTH0_CLIENT_SECRET`: Your Auth0 application's Client Secret.

The SDK will read these values from the Node.js process environment and automatically configure itself.

## Add the dynamic API route {{{ data-action=code data-code="[...auth0].js" }}}

Create an `auth` directory under the `pages/api` directory. Under this newly created `auth` directory, create a `[...auth0].js` file. The path to your [dynamic API route](https://nextjs.org/docs/api-routes/dynamic-api-routes) file should then be `pages/api/auth/[...auth0].js`.

Then, import in that file the `handleAuth` method from the SDK, and export the result of calling it. This creates the following routes:

- `/api/auth/login`: The route used to perform login with Auth0.
- `/api/auth/logout`: The route used to log the user out.
- `/api/auth/callback`: The route Auth0 will redirect the user to after a successful login.
- `/api/auth/me`: The route to fetch the user profile from.

## Add the `UserProvider` component {{{ data-action=code data-code="_app.jsx" }}}

On the frontend side, the SDK uses React Context to manage the authentication state of your users. To make that state available to all your pages, you need to override the [App component](https://nextjs.org/docs/advanced-features/custom-app) and wrap its inner component with a `UserProvider` in the file `pages/_app.jsx`.

:::note
Support for the new `app` directory is coming. Check out the [beta release](https://github.com/auth0/nextjs-auth0/issues/1235).
:::

The authentication state exposed by `UserProvider` can be accessed in any component using the `useUser()` hook.

::::checkpoint
:::checkpoint-default
Now that you have added the dynamic route and `UserProvider`, run your application to verify that your application is not throwing any errors related to Auth0.
:::
:::checkpoint-failure
Sorry about that. Here's a couple of things to double check:
* Are your environment variables populated correctly?
* did you put the `[...auth0].js` and `_app.jsx` files in the correct folder?
* make sure the domain and client ID are configured correctly

Still having issues? Check out our [documentation](https://auth0.com/docs) or visit our [community page](https://community.auth0.com) to get more help.
:::
::::

## Add Login to Your Application {{{ data-action=code data-code="login.jsx" }}}

Users can now log in to your application by visiting the `/api/auth/login` route provided by the SDK. Add a link that points to the login route using an **anchor tag**. Clicking it redirects your users to the Auth0 Universal Login Page, where Auth0 can authenticate them. Upon successful authentication, Auth0 will redirect your users back to your application.

:::note
Next linting rules might suggest using the `Link` component instead of an anchor tag. The `Link` component is meant to perform [client-side transitions between pages](https://nextjs.org/docs/api-reference/next/link). As the link points to an API route and not to a page, you should keep it as an anchor tag.
:::

::::checkpoint
:::checkpoint-default
Add the login link to your application. 
- When you click it, verify that your Next.js application redirects you to the [Auth0 Universal Login](https://auth0.com/universal-login) page and that you can now log in or sign up using a username and password or a social provider.
- Once that's complete, verify that Auth0 redirects back to your application.
:::
:::checkpoint-failure
Sorry about that. Here's a couple of things to double check:
* are your environment variables populated correctly?
* make sure that "Allowed Callback URLs" is configured correctly in your tenant

Still having issues? Check out our [documentation](https://auth0.com/docs) or visit our [community page](https://community.auth0.com) to get more help.
:::
::::

![Auth0 Universal Login](/media/quickstarts/universal-login.png)

<%= include('../_includes/_auth_note_dev_keys') %>

## Add Logout to Your Application {{{ data-action=code data-code="logout.jsx" }}}

Now that you can log in to your Next.js application, you need [a way to log out](https://auth0.com/docs/logout/log-users-out-of-auth0). Add a link that points to the `/api/auth/logout` API route. Clicking it redirects your users to your [Auth0 logout endpoint](https://auth0.com/docs/api/authentication?javascript#logout) (`https://YOUR_DOMAIN/v2/logout`) and then immediately redirects them back to your application.

::::checkpoint
:::checkpoint-default
Add the logout link to your application. When you click it, verify that your Next.js application redirects you to the address you specified as one of the "Allowed Logout URLs" in the "Settings".
:::
:::checkpoint-failure
Sorry about that. Here's a couple of things to double check:
* are your environment variables populated correctly?
* make sure that "Allowed Logout URLs" is configured correctly in your tenant

Still having issues? Check out our [documentation](https://auth0.com/docs) or visit our [community page](https://community.auth0.com) to get more help.
:::
::::

## Show User Profile Information {{{ data-action=code data-code="profile.jsx" }}}

The Auth0 Next.js SDK helps you retrieve the [profile information](https://auth0.com/docs/users/user-profiles) associated with the logged-in user, such as their name or profile picture, to personalize the user interface. The profile information is available through the `user` property exposed by the `useUser()` hook. Take this `Profile` page component as an example of how to use it.

The `user` property contains sensitive information and artifacts related to the user's identity. As such, its availability depends on the user's authentication status. To prevent any render errors:

- Ensure that the SDK has completed loading before accessing the `user` property by checking that `isLoading` is `false`.
- Ensure that the SDK has loaded successfully by checking that no `error` was produced.
- Check the `user` property to ensure that Auth0 has authenticated the user before React renders any component that consumes it.

::::checkpoint
:::checkpoint-default
Verify that you can display the `user.name` or [any other](https://auth0.com/docs/users/user-profile-structure#user-profile-attributes) `user` property within a component correctly after you have logged in.
:::
:::checkpoint-failure
Sorry about that. Here's a couple of things to double check:
* are your environment variables populated correctly?
* make sure the SDK has finished loading using the `loading` property
* make sure there are no errors in the `error` property or the console

Still having issues? Check out our [documentation](https://auth0.com/docs) or visit our [community page](https://community.auth0.com) to get more help.
:::
::::
