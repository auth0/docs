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

<%= include('../_includes/_getting_started', { library: 'Next.js', callback: 'http://localhost:3000/auth/callback' }) %>

<%= include('../../../_includes/_logout_url', { returnTo: 'http://localhost:3000' }) %>

## Install the Auth0 Next.js SDK

Run the following command within your project directory to install the Auth0 Next.js SDK:

```sh
npm install @auth0/nextjs-auth0
```

The SDK exposes methods and variables that help you integrate Auth0 with your Next.js application using <a href="https://nextjs.org/docs/app/building-your-application/routing/route-handlers" target="_blank" rel="noreferrer">Route Handlers</a> on the backend and <a href="https://react.dev/reference/react/useContext" target="_blank" rel="noreferrer">React Context</a> with <a href="https://react.dev/reference/react/hooks" target="_blank" rel="noreferrer">React Hooks</a> on the frontend.

### Configure the SDK

In the root directory of your project, create the file `.env.local` with the following <a href="https://nextjs.org/docs/basic-features/environment-variables" target="_blank" rel="noreferrer">environment variables</a>:

```sh
AUTH0_SECRET='use [openssl rand -hex 32] to generate a 32 bytes value'
APP_BASE_URL='http://localhost:3000'
AUTH0_DOMAIN='https://${account.namespace}'
AUTH0_CLIENT_ID='${account.clientId}'
AUTH0_CLIENT_SECRET='${account.clientSecret}'
'If your application is API authorized add the variables AUTH0_AUDIENCE and AUTH0_SCOPE'
AUTH0_AUDIENCE='your_auth_api_identifier'
AUTH0_SCOPE='openid profile email read:shows' 
```

- `AUTH0_SECRET`: A long secret value used to encrypt the session cookie. You can generate a suitable string using `openssl rand -hex 32` on the command line.
- `APP_BASE_URL`: The base URL of your application
- `AUTH0_DOMAIN`: The URL of your Auth0 tenant domain
- `AUTH0_CLIENT_ID`: Your Auth0 application's Client ID
- `AUTH0_CLIENT_SECRET`: Your Auth0 application's Client Secret

The SDK will read these values from the Node.js process environment and configure itself automatically.

::: note
Manually add the values for `AUTH0_AUDIENCE` and `AUTH_SCOPE` to the file `lib/auth0.js`.  These values are not configured automatically.
If you are using a <a href="https://auth0.com/docs/custom-domains" target="_blank" rel="noreferrer">Custom Domain with Auth0</a>, set `AUTH0_DOMAIN` to the value of your Custom Domain instead of the value reflected in the application "Settings" tab.
:::

### Create the Auth0 SDK Client

Create a file at `lib/auth0.js` to add an instance of the Auth0 client. This instance provides methods for handling authentication, sesssions and user data. 

```javascript
// lib/auth0.js

import { Auth0Client } from "@auth0/nextjs-auth0/server";

// Initialize the Auth0 client 
export const auth0 = new Auth0Client({
  // Options are loaded from environment variables by default
  // Ensure necessary environment variables are properly set
  // domain: process.env.AUTH0_DOMAIN,
  // clientId: process.env.AUTH0_CLIENT_ID,
  // clientSecret: process.env.AUTH0_CLIENT_SECRET,
  // appBaseUrl: process.env.APP_BASE_URL,
  // secret: process.env.AUTH0_SECRET,

  authorizationParameters: {
    // In v4, the AUTH0_SCOPE and AUTH0_AUDIENCE environment variables for API authorized applications are no longer automatically picked up by the SDK.
    // Instead, we need to provide the values explicitly.
    scope: process.env.AUTH0_SCOPE,
    audience: process.env.AUTH0_AUDIENCE,
  }
});
```


### Add the dynamic API route handler

Create a file at `app/api/shows/route.js`. This is your route Handler file using <a href="https://nextjs.org/docs/app/building-your-application/routing/route-handlers#dynamic-route-segments" target="_blank" rel="noreferrer">Dynamic Route Segment</a>. The file declares a `GET` export to call the `shows()` method from the SDK to create the API routes. import the `handleAuth` method from the SDK and call it from the `GET` export.

```javascript
// app/api/shows/route.js
import { NextResponse } from 'next/server';
import { auth0 } from '../../../lib/auth0';

export const GET = async function shows() {
  try {
    const session = await auth0.getSession();

    if (!session) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const res = new NextResponse();
    const { token: accessToken } = await auth0.getAccessToken();
    const apiPort = process.env.API_PORT || 3001;
    const response = await fetch(`http://localhost:${apiPort}/api/shows`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    const shows = await response.json();

    return NextResponse.json(shows, res);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: error.status || 500 });
  }
};
```

Upon execution, the following routes are available:

- `/auth/login`: The route to perform login with Auth0
- `/auth/logout`: The route to log the user out
- `/auth/callback`: The route Auth0 will redirect the user to after a successful login
- `/auth/profile`: The route to fetch the user profile
- `/auth/access-token`: The route to verify the user's session and return an <a href="https://auth0.com/docs/secure/tokens/access-tokens" target="_blank" rel="noreferrer">access token</a> (which automatically refreshes if a refresh token is available)
- `/auth/backchannel-logout`: The route to receive a `logout_token` when a configured Back-Channel Logout initiator occurs

To learn more about routing in Auth0, read <a href="https://auth0.com/blog/auth0-stable-support-for-nextjs-app-router/" target="_blank" rel="noreferrer"> Add the dynamic API route</a>.

:::note
The `/auth/access-token` route is enabled by default. If your clients do not need access tokens, you can disable the route by editing the file `lib/auth0.js` and setting `enableAccessTokenEndpoint` to `false` in the instance of the Auth0 client. :::

## Add Login to Your Application

Users can now log in to your application at `/auth/login` route provided by the SDK. Use an **anchor tag** to add a link to the login route to redirect your users to the Auth0 Universal Login Page, where Auth0 can authenticate them. Upon successful authentication, Auth0 redirects your users back to your application.

```html
<a href="/auth/login">Login</a>
```

:::note
Next.js suggests using <a href="https://nextjs.org/docs/api-reference/next/link" target="_blank" rel="noreferrer">Link</a> components instead of anchor tags, but since these are API routes and not pages, anchor tags are needed.
:::

:::panel Checkpoint
Add the login link to your application. Select it and verify that your Next.js application redirects you to the <a href="https://auth0.com/universal-login" target="_blank" rel="noreferrer">Auth0 Universal Login</a> page and that you can now log in or sign up using a username and password or a social provider.

Once that's complete, verify that Auth0 redirects back to your application.

If you are following along with the sample app project from the top of this page, run the command:

```sh
npm i && npm run dev 
```
and visit http://localhost:3000 in your browser.
:::

![Auth0 Universal Login](/media/quickstarts/universal-login.png)

<%= include('../_includes/_auth_note_dev_keys') %>

## Add Logout to Your Application

Now that you can log in to your Next.js application, you need <a href="https://auth0.com/docs/logout/log-users-out-of-auth0" target="_blank" rel="noreferrer">a way to log out</a>. Add a link that points to the `/auth/logout` API route. To learn more, read <a href="https://auth0.com/docs/authenticate/login/logout/log-users-out-of-auth0" target="_blank" rel="noreferrer">Log Users out of Auth0 with OIDC Endpoint</a>.

```html
<a href="/auth/logout">Logout</a>
```

:::panel Checkpoint
Add the logout link to your application. When you select it, verify that your Next.js application redirects you to the address you specified as one of the "Allowed Logout URLs" in the application "Settings".
:::

## Show User Profile Information

The Auth0 Next.js SDK helps you retrieve the <a href="https://auth0.com/docs/users/user-profiles" target="_blank" rel="noreferrer">profile information</a> associated with the logged-in user, such as their name or profile picture, to personalize the user interface.

### From a Client Component

The profile information is available through the `user` property exposed by the `useUser()` hook. Take this <a href="https://nextjs.org/docs/getting-started/react-essentials#client-components" target="_blank" rel="noreferrer">Client Component</a> as an example of how to use it:

```jsx
'use client';
import React from 'react';
import { Row, Col } from 'reactstrap';
import { useUser } from '@auth0/nextjs-auth0';
import Loading from '../../components/Loading';
import Highlight from '../../components/Highlight';

export default function Profile() {
  const { user, isLoading } = useUser();
  return (
    <>
      {isLoading && <Loading />}
      {user && (
        <>
          {isLoading && <p>Loading...</p>}
          {user && (
            <div data-testid="profile" style={{ textAlign: "center" }}>
              <img
                src={user.picture}
                alt="Profile"
                style={{ borderRadius: "50%", width: "80px", height: "80px" }}
                data-testid="profile-picture"
              />
              <h2 data-testid="profile-name">{user.name}</h2>
              <p data-testid="profile-email">{user.email}</p>
              <pre data-testid="profile-json">{JSON.stringify(user, null, 2)}</pre>
            </div>
          )}
        </>
      )}
    </>
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
import { auth0 } from "@/lib/auth0";

export default async function ProfileServer() {
  const { user } = await auth0.getSession(); 
  return ( user && ( <div> <img src={user.picture} alt={user.name}/> <h2>{user.name}</h2> <p>{user.email}</p> </div> )  ); 
}

```

:::panel Checkpoint
Verify that you can display the `user.name` or <a href="https://auth0.com/docs/users/user-profile-structure#user-profile-attributes" target="_blank" rel="noreferrer">any other</a> `user` property within a component correctly after you have logged in.
:::                                              

## What's next?

We put together a few <a href="https://github.com/auth0/nextjs-auth0/blob/main/EXAMPLES.md" target="_blank" rel="noreferrer">examples</a> on how to use <a href="https://github.com/auth0/nextjs-auth0" target="_blank" rel="noreferrer">nextjs-auth0</a> for more advanced use cases.
