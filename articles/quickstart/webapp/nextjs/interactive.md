---
title: Add Login to your Next.js application
description: This guide demonstrates how to integrate Auth0 with any new or existing Next.js application using the Auth0 Next.js v4 SDK (Beta).
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
 - files/auth0
 - files/env
 - files/middleware
 - files/page

---

<!-- markdownlint-disable MD025 MD034 -->

# Add Login to Your Next.js Application

This guide demonstrates how to integrate Auth0 with any new or existing Next.js application using the Auth0 Next.js v4 SDK (Beta). We recommend that you log in to follow this quickstart with examples configured for your account.

<%= include('../../_includes/_configure_auth0_interactive', {
callback: 'http://localhost:3000/auth/callback',
returnTo: 'http://localhost:3000'
}) %>

## Install the Auth0 Next.js v4 SDK

Run the following command within your project directory to install the Auth0 Next.js SDK:

```sh
npm i @auth0/nextjs-auth0
```

The SDK exposes methods and variables that help you integrate Auth0 with your Next.js application using <a href="https://nextjs.org/docs/app/building-your-application/routing/route-handlers" target="_blank" rel="noreferrer">Route Handlers</a> on the backend and <a href="https://react.dev/reference/react/useContext" target="_blank" rel="noreferrer">React Context</a> with <a href="https://react.dev/reference/react/hooks" target="_blank" rel="noreferrer">React Hooks</a> on the frontend.

## Configure the SDK {{{ data-action=code data-code=".env.local" }}}

In the root directory of your project, add the file `.env.local` with the following <a href="https://nextjs.org/docs/basic-features/environment-variables" target="_blank" rel="noreferrer">environment variables</a>:

- `AUTH0_SECRET`: A long secret value used to encrypt the session cookie. You can generate a suitable string using `openssl rand -hex 32` on the command line.
- `APP_BASE_URL`: The base URL of your application.
- `AUTH0_DOMAIN`: The URL of your Auth0 tenant domain. If you are using a <a href="https://auth0.com/docs/custom-domains" target="_blank" rel="noreferrer">Custom Domain with Auth0</a>, set this to the value of your Custom Domain instead of the value reflected in the "Settings" tab.
- `AUTH0_CLIENT_ID`: Your Auth0 application's Client ID.
- `AUTH0_CLIENT_SECRET`: Your Auth0 application's Client Secret.

The SDK will read these values from the Node.js process environment and automatically configure itself.

## Create the Auth0 SDK Client {{{ data-action=code data-code="src/lib/auth0.ts" }}}

Create a file at `src/lib/auth0.ts`. This file provides methods for handling authentication, sessions and user data. 

Then, import the `Auth0Client` class from the SDK to create an instance and export it as `auth0`. This instance is used in your app to interact with Auth0. 

## Add the Authentication Middleware {{{ data-action=code data-code="src/middleware.ts" }}}

::: note
The Next.js Middleware allows you to run code before a request is completed. 
:::

Create a file at `src/middleware.ts`. This file is used to enforce authentication on specific routes. 

The `middleware` function intercepts incoming requests and applies Auth0's authentication logic. 
The `matcher` configuration ensures that the middleware runs on all routes except for static files and metadata. 

## Add the Landing Page Content {{{ data-action=code data-code="src/app/page.tsx" }}}

The Landing page `src/app/page.tsx` is where users interact with your app. It displays different content based on whether the users is logged in or not. 

Edit the file `src/app/page.tsx` to add the `auth0.getSession()` method to determine if the user is logged in by retrieving the user session. 

If there is no user session, the method returns `null` and the app displays the **Sign up** or **Log in** buttons.
If a user sessions exists, the app displays a welcome message with the user's name and a **Log out** button. 

::: note
The Logout functionality is already included in the file `src/app/page.tsx`. 
When the user selects the **Log out** button, they are redirected to the Auth0 logout endpoint, which clears their session and redirects back to your app. 
:::

## Run Your Application

Run this command to start your Next.js development server:

```sh
npm run dev
``` 

Visit the url `http://localhost:3000` in your browser. 

You will see:
- A **Sign up** and **Log in** button if the user is not authenticated.
- A welcome message and a **Log out** button if the user is authenticated.

::::checkpoint
:::checkpoint-default
Run Your application. 
- Verify that your Next.js application redirects you to the <a href="https://auth0.com/universal-login" target="_blank" rel="noreferrer">Auth0 Universal Login</a> page and that you can now log in or sign up using a username and password or a social provider.
- Once that's complete, verify that Auth0 redirects back to your application.
:::
:::checkpoint-failure
Sorry about that. Here's a couple of things to double check:
* are your environment variables populated correctly?
* make sure that "Allowed Callback URLs" is configured correctly in your tenant

Still having issues? Check out our <a href="https://auth0.com/docs" target="_blank" rel="noreferrer">documentation</a> or visit our <a href="https://community.auth0.com" target="_blank" rel="noreferrer">community page</a> to get more help.
:::
::::

![Auth0 Universal Login](/media/quickstarts/universal-login.png)
