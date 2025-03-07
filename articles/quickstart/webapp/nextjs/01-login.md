---
title: Login
description: "This guide demonstrates how to integrate Auth0 with any new or existing Next.js application using the Auth0 Next.js SDK."
budicon: 448
topics:
  - quickstarts
  - nextjs
  - next.js
  - login
github:
  path: Sample-01
contentType: tutorial
useCase: quickstart
---
<!-- markdownlint-disable MD002 MD034 MD041 -->

<%= include('../_includes/_getting_started', { library: 'Next.js', callback: 'http://localhost:3000/api/auth/callback' }) %>

<%= include('../../../_includes/_logout_url', { returnTo: 'http://localhost:3000' }) %>

## Install the Auth0 Next.js SDK

Run the following command within your project directory to install the Auth0 Next.js SDK:

```sh
npm i @auth0/nextjs-auth0
```

The SDK exposes methods and variables that help you integrate Auth0 with your Next.js application using <a href="https://nextjs.org/docs/app/building-your-application/routing/route-handlers" target="_blank" rel="noreferrer">Route Handlers</a> on the backend and <a href="https://reactjs.org/docs/context.html" target="_blank" rel="noreferrer">React Context</a> with <a href="https://reactjs.org/docs/hooks-overview.html" target="_blank" rel="noreferrer">React Hooks</a> on the frontend.

### Configure the SDK

In the root directory of your project, add the file `.env.local` with the following <a href="https://nextjs.org/docs/basic-features/environment-variables" target="_blank" rel="noreferrer">environment variables</a>:

```sh
AUTH0_SECRET='use [openssl rand -hex 32] to generate a 32 bytes value'
AUTH0_BASE_URL='http://localhost:3000'
AUTH0_ISSUER_BASE_URL='https://${account.namespace}'
AUTH0_CLIENT_ID='${account.clientId}'
AUTH0_CLIENT_SECRET='${account.clientSecret}'
```

- `AUTH0_SECRET`: A long secret value used to encrypt the session cookie. You can generate a suitable string using `openssl rand -hex 32` on the command line.
- `AUTH0_BASE_URL`: The base URL of your application.
- `AUTH0_ISSUER_BASE_URL`: The URL of your Auth0 tenant domain. If you are using a <a href="https://auth0.com/docs/custom-domains" target="_blank" rel="noreferrer">Custom Domain with Auth0</a>, set this to the value of your Custom Domain instead of the value reflected in the "Settings" tab.
- `AUTH0_CLIENT_ID`: Your Auth0 application's Client ID.
- `AUTH0_CLIENT_SECRET`: Your Auth0 application's Client Secret.

The SDK will read these values from the Node.js process environment and automatically configure itself.

### Create the Auth0 SDK Client

Create a file at `src/lib/auth0.ts`. This file provides methods for handling authentication, sessions and user data.

Then, import the Auth0Client class from the SDK to create an instance and export it as auth0. This instance is used in your app to interact with Auth0.

```javascript
// src/lib/auth0.ts
import { Auth0Client } from "@auth0/nextjs-auth0/server";

export const auth0 = new Auth0Client();
```

### Add the Authentication Middleware

::: note
The Next.js Middleware allows you to run code before a request is completed.
:::

Create a file at `src/middleware.ts`. This file is used to enforce authentication on specific routes.

The `middleware` function intercepts incoming requests and applies Auth0's authentication logic. The `matcher` configuration ensures that the middleware runs on all routes except for static files and metadata.

```javascript
// src/middleware.ts
import type { NextRequest } from "next/server";
import { auth0 } from "./lib/auth0";

export async function middleware(request: NextRequest) {
  return await auth0.middleware(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
```

### Add the Landing Page Content

The Landing page `src/app/page.tsx` is where users interact with your app. It displays different content based on whether the users is logged in or not.

Edit the file `src/app/page.tsx` to add the `auth0.getSession()` method to determine if the user is logged in by retrieving the user session.

If there is no user session, the method returns `null` and the app displays the **Sign up** or **Log in** buttons. If a user sessions exists, the app displays a welcome message with the user's name and a **Log out** button.

```javascript
// src/app/page.tsx
import { auth0 } from "@/lib/auth0";
import './globals.css';

export default async function Home() {
  // Fetch the user session
  const session = await auth0.getSession();

  // If no session, show sign-up and login buttons
  if (!session) {
    return (
      <main>
        <a href="/auth/login?screen_hint=signup">
          <button>Sign up</button>
        </a>
        <a href="/auth/login">
          <button>Log in</button>
        </a>
      </main>
    );
  }

  // If session exists, show a welcome message and logout button
  return (
    <main>
      <h1>Welcome, {session.user.name}!</h1>
      <p>
        <a href="/auth/logout">
          <button>Log out</button>
        </a>
      </p>
    </main>
  );
}
```
::: note
The Logout functionality is already included in the file src/app/page.tsx. When the user selects the Log out button, they are redirected to the Auth0 logout endpoint, which clears their session and redirects back to your app.
:::

### Run the Sample

Run this command to start your Next.js development server:

```sh
npm run dev
```
Visit the url `http://localhost:3000` in your browser.

You will see:

A **Sign up** and **Log in** button if the user is not authenticated.
A welcome message and a **Log out** button if the user is authenticated.

:::panel Checkpoint

Run your application.

Verify that your Next.js application redirects you to the <a href="https://auth0.com/universal-login" target="_blank" rel="noreferrer">Auth0 Universal Login</a> page and that you can now log in or sign up using a username and password or a social provider.

Once that's complete, verify that Auth0 redirects back to your application.
:::

![Auth0 Universal Login](/media/quickstarts/universal-login.png)

<%= include('../_includes/_auth_note_dev_keys') %>


## Show User Profile Information

The Auth0 Next.js SDK helps you retrieve the <a href="https://auth0.com/docs/users/user-profiles" target="_blank" rel="noreferrer">profile information</a> associated with the logged-in user, such as their name or profile picture, to personalize the user interface.

### From a Client Component

The profile information is available through the `user` property exposed by the `useUser()` hook. Take this <a href="https://nextjs.org/docs/getting-started/react-essentials#client-components" target="_blank" rel="noreferrer">Client Component</a> as an example of how to use it:

```jsx
'use client';

import { useUser } from '@auth0/nextjs-auth0/client';

export default function ProfileClient() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    user && (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
    )
  );
}
```

The `user` property contains sensitive information and artifacts related to the user's identity. As such, its availability depends on the user's authentication status. To prevent any render errors:

- Ensure that the SDK has completed loading before accessing the `user` property by checking that `isLoading` is `false`.
- Ensure that the SDK has loaded successfully by checking that no `error` was produced.
- Check the `user` property to ensure that Auth0 has authenticated the user before React renders any component that consumes it.

### From a Server Component

The profile information is available through the `user` property exposed by the `getSession` function. Take this <a href="https://nextjs.org/docs/getting-started/react-essentials#server-components" target="_blank" rel="noreferrer">Server Component</a> as an example of how to use it:

```jsx
import { getSession } from '@auth0/nextjs-auth0';

export default async function ProfileServer() {
  const { user } = await getSession();

  return (
      user && (
          <div>
            <img src={user.picture} alt={user.name} />
            <h2>{user.name}</h2>
            <p>{user.email}</p>
          </div>
      )
  );
}
```

:::panel Checkpoint
Verify that you can display the `user.name` or <a href="https://auth0.com/docs/users/user-profile-structure#user-profile-attributes" target="_blank" rel="noreferrer">any other</a> `user` property within a component correctly after you have logged in.
:::                                              

## What's next?

We put together a few examples of how to use <a href="https://github.com/auth0/nextjs-auth0" target="_blank" rel="noreferrer">nextjs-auth0</a> in more advanced use cases:

- <a href="https://github.com/auth0/nextjs-auth0/blob/main/EXAMPLES.md#protecting-a-server-side-rendered-ssr-page" target="_blank" rel="noreferrer">Protecting a Server Side Rendered (SSR) Page</a>
- <a href="https://github.com/auth0/nextjs-auth0/blob/main/EXAMPLES.md#protecting-a-client-side-rendered-csr-page" target="_blank" rel="noreferrer">Protecting a Client Side Rendered (CSR) Page</a>
- <a href="https://github.com/auth0/nextjs-auth0/blob/main/EXAMPLES.md#protect-an-api-route" target="_blank" rel="noreferrer">Protect an API Route</a>
- <a href="https://github.com/auth0/nextjs-auth0/blob/main/EXAMPLES.md#access-an-external-api-from-an-api-route" target="_blank" rel="noreferrer">Access an External API from an API Route</a>
