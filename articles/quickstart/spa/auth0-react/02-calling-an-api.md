---
title: Call an API
description: This tutorial demonstrates how to make API calls for protected resources on your server.
budicon: 448
topics:
  - quickstarts
  - spa
  - react
  - login
github:
  path: Sample-01
contentType: tutorial
useCase: quickstart
---
<!-- markdownlint-disable MD002 MD034 MD041 -->

Your React application may need to access protected data from an API that you are also [securing with Auth0](https://auth0.com/docs/microsites/protect-api/protect-api). For that use case, you'll need to retrieve an access token to authorize any calls you make to that secured API.

For this example, you'll use the [Auth0 Management API](https://auth0.com/docs/api/management/v2) to quickly test how to make calls to a protected external API.

:::note
If you followed the [previous section where you added user log in](/quickstart/spa/auth0-react#add-login-to-your-application), make sure that you log out of your application as you'll need a new access token to call APIs.
:::

For the Auth0 React SDK to configure the access token correctly, you need to pass an `audience` and a `scope` property to the `Auth0Provider` as follows:

```javascript
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
  <Auth0Provider
    domain="${account.namespace}"
    clientId="${account.clientId}"
    redirectUri={window.location.origin}
    audience={`https:// <%= "${process.env.REACT_APP_AUTH0_DOMAIN}" %>/api/v2/`}
    scope="read:users update:current_user_metadata"
  >
    <App />
  </Auth0Provider>,
  document.getElementById("root")
);
```

The set up is similar to the one discussed in the [Configure the `Auth0Provider` component](/quickstart/spa/auth0-react#configure-the-auth0provider-component) section: you wrap your root component with `Auth0Provider` and use the "Settings" values of the single-page application you've registered with Auth0 to populate the values of `domain` and `clientId`.

However, your React application needs to pass an access token when it calls a target API to access private user data. You [request an access token](https://auth0.com/docs/tokens/guides/get-access-tokens) in a format that the API can verify by passing the `audience` and `scope` to `Auth0Provider`.

The `audience` lets the API verify that it has received an access token intended for it and not for some other API. The `scope` lets the API understand the permissions that the client application has in order to apply authorization properly.

:::note
When you [set up an API](https://auth0.com/docs/getting-started/set-up-api) with Auth0, you define its audience value.
:::

Once you configure `Auth0Provider`, you can easily get the access token using the `getAccessTokenSilently()` method from the `useAuth0()` custom React Hook wherever you need it. 

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
    const domain = process.env.REACT_APP_AUTH0_DOMAIN;

    try {
      const accessToken = await getAccessTokenSilently({
        audience: `https://<%= "${domain}" %>/api/v2`,
        scope: "read:current_user",
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
}, []);
```

You use a React Effect Hook to call an asynchronous `getUserMetadata()` function. The function first calls `getAccessTokenSilently()`, which returns a Promise that resolves to an access token that you can use to make a call to a protected API.

You pass an object with the `audience` and `scope` properties as the argument of `getAccessTokenSilently()` to ensure that the access token you get is for the intended API and has the required permissions to access the desired endpoint.
 
In this case, one of the scopes that the [`/api/v2/users/{id}` endpoint](https://auth0.com/docs/api/management/v2#!/Users/get_users_by_id) of the Auth0 Management API requires is `read:current_user`.
 
You can then include the access token in the authorization header of the API call that you make. The API will take care of validating the access token and processing the request.

Upon success, you extract the `user_metadata` property from the API response and use `setUserMetadata()` to make React aware of it.

For a more detailed example, see how to [create a `useApi` hook](https://github.com/auth0/auth0-react/blob/master/EXAMPLES.md#4-create-a-useapi-hook-for-accessing-protected-apis-with-an-access-token) for accessing protected APIs with an access token.

:::panel Checkpoint
Your application will show "No user metadata defined" if you have not set any `user_metadata` for the logged-in user. To further test out this integration, head to the [Users section of the Auth0 dashboard](https://manage.auth0.com/#/users) and click on the user who is logged in. Update the `user_metadata` section with a value like `{ "theme": "dark" }` and click "Save". Refresh your React application and verify that it reflects the new `user_metadata`. 
:::

:::note
The `getAccessTokenSilently()` method can renew the access and ID token for you using [refresh tokens](https://auth0.com/docs/tokens/concepts/refresh-tokens). To [get a refresh token](https://auth0.com/docs/tokens/guides/get-refresh-tokens) when a user logs in, pass `useRefreshTokens={true}` as a prop to `Auth0Provider`. 
:::

Feel free to consult the [Auth0 API quickstarts](https://auth0.com/docs/quickstart/backend) to learn how to integrate Auth0 with your backend platform.