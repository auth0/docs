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
npm install @auth0/nextjs-auth0
```

The SDK exposes methods and variables that help you integrate Auth0 with your Next.js application using [Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers) on the backend and [React Context](https://reactjs.org/docs/context.html) with [React Hooks](https://reactjs.org/docs/hooks-overview.html) on the frontend.

### Configure the SDK

In the root directory of your project, add the file `.env.local` with the following [environment variables](https://nextjs.org/docs/basic-features/environment-variables):

```sh
AUTH0_SECRET='use [openssl rand -hex 32] to generate a 32 bytes value'
AUTH0_BASE_URL='http://localhost:3000'
AUTH0_ISSUER_BASE_URL='https://${account.namespace}'
AUTH0_CLIENT_ID='${account.clientId}'
AUTH0_CLIENT_SECRET='${account.clientSecret}'
```

- `AUTH0_SECRET`: A long secret value used to encrypt the session cookie. You can generate a suitable string using `openssl rand -hex 32` on the command line.
- `AUTH0_BASE_URL`: The base URL of your application.
- `AUTH0_ISSUER_BASE_URL`: The URL of your Auth0 tenant domain. If you are using a [Custom Domain with Auth0](https://auth0.com/docs/custom-domains), set this to the value of your Custom Domain instead of the value reflected in the "Settings" tab.
- `AUTH0_CLIENT_ID`: Your Auth0 application's Client ID.
- `AUTH0_CLIENT_SECRET`: Your Auth0 application's Client Secret.

The SDK will read these values from the Node.js process environment and automatically configure itself.

### Add the dynamic API route handler

Create a file at `app/api/auth/[auth0]/route.js`. This is your Route Handler file with a [Dynamic Route Segment](https://nextjs.org/docs/app/building-your-application/routing/route-handlers#dynamic-route-segments).

Then, import the `handleAuth` method from the SDK and call it from the `GET` export.

```javascript
// app/api/auth/[auth0]/route.js
import { handleAuth } from '@auth0/nextjs-auth0';

export const GET = handleAuth();
```

This creates the following routes:

- `/api/auth/login`: The route used to perform login with Auth0.
- `/api/auth/logout`: The route used to log the user out.
- `/api/auth/callback`: The route Auth0 will redirect the user to after a successful login.
- `/api/auth/me`: The route to fetch the user profile from.

::: note
This QuickStart targets the Next.js [App Router](https://nextjs.org/docs/app). If you're using the [Pages Router](https://nextjs.org/docs/pages), check out the example in the SDK's [README](https://github.com/auth0/nextjs-auth0#page-router).
:::

### Add the `UserProvider` component

On the frontend side, the SDK uses React Context to manage the authentication state of your users. To make that state available to all your pages, you need to override the [Root Layout component](https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#root-layout-required) and wrap the `<body>` tag with a `UserProvider` in the file `app/layout.jsx`. 

Create the file `app/layout.jsx` as follows:

```jsx
// app/layout.jsx
import { UserProvider } from '@auth0/nextjs-auth0/client';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <UserProvider>
      <body>{children}</body>
    </UserProvider>
    </html>
  );
}
```

The authentication state exposed by `UserProvider` can be accessed in any Client Component using the `useUser()` hook.

:::panel Checkpoint
Now that you have added the dynamic route and `UserProvider`, run your application to verify that your application is not throwing any errors related to Auth0.
:::

## Add Login to Your Application

Users can now log in to your application by visiting the `/api/auth/login` route provided by the SDK. Add a link that points to the login route using an **anchor tag**. Clicking it redirects your users to the Auth0 Universal Login Page, where Auth0 can authenticate them. Upon successful authentication, Auth0 will redirect your users back to your application.

:::note
Next linting rules might suggest using the `Link` component instead of an anchor tag. The `Link` component is meant to perform [client-side transitions between pages](https://nextjs.org/docs/api-reference/next/link). As the link points to an API route and not to a page, you should keep it as an anchor tag.
:::

```html
<a href="/api/auth/login">Login</a>
```

:::panel Checkpoint
Add the login link to your application. When you click it, verify that your Next.js application redirects you to the [Auth0 Universal Login](https://auth0.com/universal-login) page and that you can now log in or sign up using a username and password or a social provider.

Once that's complete, verify that Auth0 redirects back to your application.
:::

![Auth0 Universal Login](/media/quickstarts/universal-login.png)

<%= include('../_includes/_auth_note_dev_keys') %>

## Add Logout to Your Application

Now that you can log in to your Next.js application, you need [a way to log out](https://auth0.com/docs/logout/log-users-out-of-auth0). Add a link that points to the `/api/auth/logout` API route. Clicking it redirects your users to your [Auth0 logout endpoint](https://auth0.com/docs/api/authentication?javascript#logout) (`https://YOUR_DOMAIN/v2/logout`) and then immediately redirects them back to your application.

```html
<a href="/api/auth/logout">Logout</a>
```

:::panel Checkpoint
Add the logout link to your application. When you click it, verify that your Next.js application redirects you to the address you specified as one of the "Allowed Logout URLs" in the "Settings".
:::

## Show User Profile Information

The Auth0 Next.js SDK helps you retrieve the [profile information](https://auth0.com/docs/users/user-profiles) associated with the logged-in user, such as their name or profile picture, to personalize the user interface.

### From a Client Component

The profile information is available through the `user` property exposed by the `useUser()` hook. Take this [Client Component](https://nextjs.org/docs/getting-started/react-essentials#client-components) as an example of how to use it:

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

The profile information is available through the `user` property exposed by the `getSession` function. Take this [Server Component](https://nextjs.org/docs/getting-started/react-essentials#server-components) as an example of how to use it:

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
Verify that you can display the `user.name` or [any other](https://auth0.com/docs/users/user-profile-structure#user-profile-attributes) `user` property within a component correctly after you have logged in.
:::                                              

## What's next?

We put together a few examples of how to use [nextjs-auth0](https://github.com/auth0/nextjs-auth0) in more advanced use cases:

- [Protecting a Server Side Rendered (SSR) Page](https://github.com/auth0/nextjs-auth0/blob/main/EXAMPLES.md#protecting-a-server-side-rendered-ssr-page)
- [Protecting a Client Side Rendered (CSR) Page](https://github.com/auth0/nextjs-auth0/blob/main/EXAMPLES.md#protecting-a-client-side-rendered-csr-page)
- [Protect an API Route](https://github.com/auth0/nextjs-auth0/blob/main/EXAMPLES.md#protect-an-api-route)
- [Access an External API from an API Route](https://github.com/auth0/nextjs-auth0/blob/main/EXAMPLES.md#access-an-external-api-from-an-api-route)
