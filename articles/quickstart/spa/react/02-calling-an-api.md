---
title: Call an API
description: This tutorial demonstrates how to make API calls to the Auth0 Management API.
budicon: 448
topics:
  - quickstarts
  - spa
  - react
  - login
github:
  path: Sample-01
contentType: tutorial
sample_download_required_data:
  - client
  - api
useCase: quickstart
---
<!-- markdownlint-disable MD002 MD034 MD041 -->

:::note
Visit the <a href="https://developer.auth0.com/resources/guides/spa/react/basic-authentication#integrate-react-with-an-api-server" target="_blank">Integrate React with an API Server</a> section of the <a href="https://developer.auth0.com/resources/guides/spa/react/basic-authentication" target="_blank">React Authentication By Example</a> guide for a deep dive into calling a protected API from React. This guide allows you to set up a sample API server using a backend technology of your choice, effectively creating a full-stack application.
:::

<%= include('../_includes/_calling_api_preamble_api2") %>

:::note
If you followed the <a href="/quickstart/spa/auth0-react#add-login-to-your-application" target="_blank">previous section where you added user log in to React</a>, make sure that you log out of your application as you'll need a new access token to call APIs.
:::

## Set Up the Auth0 Service

The `Auth0Provider` setup is similar to the one discussed in the <a href="/quickstart/spa/auth0-react#configure-the-auth0provider-component" target="_blank">Configure the `Auth0Provider` component</a> section: you wrap your root component with `Auth0Provider` to which you pass the `domain` and `clientId` props. The values of these two props come from the <a href="https://auth0.com/docs/quickstart/spa/react#configure-auth0" target="_blank">"Settings" values</a> of the single-page application you've registered with Auth0.

However, your React application needs to pass an access token when it calls a target API to access private resources. You can <a href="https://auth0.com/docs/tokens/guides/get-access-tokens" target="_blank">request an access token</a> in a format that the API can verify by passing the `audience` and `scope` props to `Auth0Provider` as follows:

```javascript
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';

const root = createRoot(document.getElementById('root'));

root.render(
  <Auth0Provider
    domain="${account.namespace}"
    clientId="${account.clientId}"
    authorizationParams={{
      redirect_uri: window.location.origin,
      audience: "https://${account.namespace}/api/v2/",
      scope: "read:current_user update:current_user_metadata"
    }}
  >
    <App />
  </Auth0Provider>
);
```

:::note
As Auth0 can only issue tokens for custom scopes that exist on your API, ensure that you define the scopes used above when <a href="https://auth0.com/docs/getting-started/set-up-api" target="_blank">setting up an API</a> with Auth0.
:::

Auth0 uses the value of the `authorizationParams.audience` prop to determine which resource server (API) the user is authorizing your React application to access.

:::note
In the case of the Auth0 Management API, the audience is `https://${account.namespace}/api/v2/`. In the case of your APIs, you create an _Identifier_ value that serves as the _Audience_ value whenever you <a href="https://auth0.com/docs/getting-started/set-up-api" target="_blank">set up an API</a> with Auth0.
:::

The actions that your React application can perform on the API depend on the <a href="https://auth0.com/docs/scopes/current" target="_blank">scopes</a> that your access token contains, which you define as the value of `authorizationParams.scope`. Your React application will request authorization from the user to access the requested scopes, and the user will approve or deny the request.

:::note
In the case of the Auth0 Management API, the `read:current_user` and `update:current_user_metadata` scopes let you get an access token that can retrieve user details and update the user's information. In the case of your APIs, you'll define custom <a href="https://auth0.com/docs/scopes/current/api-scopes" target="_blank">API scopes</a> to implement access control, and you'll identify them in the calls that your client applications make to that API.
:::

## Get an Access Token 

Once you configure `Auth0Provider`, you can easily get the access token using the <a href="https://auth0.github.io/auth0-react/interfaces/Auth0ContextInterface.html#getAccessTokenSilently" target="_blank">`getAccessTokenSilently()`</a> method from the <a href="https://auth0.github.io/auth0-react/functions/useAuth0.html" target="_blank">`useAuth0()`</a> custom React Hook wherever you need it. 

Take this `Profile` component as an example:

```javascript
import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [userMetadata, setUserMetadata] = useState(null);

  return (
    isAuthenticated && (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <h3>User Metadata</h3>
        {userMetadata ? (
          <pre>{JSON.stringify(userMetadata, null, 2)}</pre>
        ) : (
          "No user metadata defined"
        )}
      </div>
    )
  );
};

export default Profile;
```

As it is, `userMetadata` is always `null` in the `Profile` component. Add the following `useEffect()` hook to the component to fetch the user metadata from an API:

```javascript
useEffect(() => {
  const getUserMetadata = async () => {
    const domain = "${account.namespace}";

    try {
      const accessToken = await getAccessTokenSilently({
        authorizationParams: {
          audience: `https://<%= "${domain}" %>/api/v2/`,
          scope: "read:current_user",
        },
      });

      const userDetailsByIdUrl = `https://<%= "${domain}" %>/api/v2/users/<%= "${user.sub}" %>`;

      const metadataResponse = await fetch(userDetailsByIdUrl, {
        headers: {
          Authorization: `Bearer <%= "${accessToken}" %>`,
        },
      });

      const { user_metadata } = await metadataResponse.json();

      setUserMetadata(user_metadata);
    } catch (e) {
      console.log(e.message);
    }
  };

  getUserMetadata();
}, [getAccessTokenSilently, user?.sub]);
```

You use a React Effect Hook to call an asynchronous `getUserMetadata()` function. The function first calls `getAccessTokenSilently()`, which returns a Promise that resolves to an access token that you can use to make a call to a protected API.

You pass an object with the `authorizationParams.audience` and `authorizationParams.scope` properties as the argument of `getAccessTokenSilently()` to ensure that the access token you get is for the intended API and has the required permissions to access the desired endpoint.
 
:::note
In the case of the Auth0 Management API, one of the scopes that the <a href="https://auth0.com/docs/api/management/v2#!/Users/get_users_by_id" target="_blank">`/api/v2/users/{id}` endpoint</a> requires is `read:current_user`.
:::
 
You can then include the access token in the authorization header of the API call that you make. The API will take care of validating the access token and processing the request.

Upon success, you extract the `user_metadata` property from the API response and use `setUserMetadata()` to make React aware of it.

:::panel Checkpoint
Your application will show "No user metadata defined" if you have not set any `user_metadata` for the logged-in user. To further test out this integration, head to the <a href="https://manage.auth0.com/#/users" target="_blank">Users section of the Auth0 dashboard</a> and click on the user who is logged in. Update the `user_metadata` section with a value like `{ "theme": "dark" }` and click "Save". Refresh your React application and verify that it reflects the new `user_metadata`. 
:::

:::note
The `getAccessTokenSilently()` method can renew the access and ID token for you using <a href="https://auth0.com/docs/tokens/concepts/refresh-tokens" target="_blank">refresh tokens</a>. To <a href="https://auth0.com/docs/tokens/guides/get-refresh-tokens" target="_blank">get a refresh token</a> when a user logs in, pass `useRefreshTokens={true}` as a prop to `Auth0Provider`. 
:::

As a final reminder, consult the <a href="https://auth0.com/docs/quickstart/backend" target="_blank">Auth0 API quickstarts</a> to learn how to integrate Auth0 with your backend platform.

