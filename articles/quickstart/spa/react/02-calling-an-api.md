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

When you use Auth0, you delegate the authentication process to a centralized service. Auth0 provides you with functionality to log in and log out users from your React application. However, your application may need to access resources from a secured API.

You can also [protect an API with Auth0](https://auth0.com/docs/microsites/protect-api/protect-api). We offer multiple [Auth0 API quickstarts](https://auth0.com/docs/quickstart/backend) to help you integrate Auth0 with your backend platform.

When you use Auth0 to protect your API, you delegate the authentication process to a centralized service that ensures only approved applications can access private resources. Your React application authenticates the user and receives an [access token from Auth0](https://auth0.com/docs/tokens/concepts/access-tokens). The application can then pass that access token to your API as a credential. In turn, your API can use [Auth0 libraries](https://auth0.com/docs/libraries) to verify the access tokens it receives from the calling application and issue a response with the desired data.

The focus of this guide is to show you how to get an access token and how to use it to make an API request. Instead of creating a demo API to test the client-server connection, you'll use the [Auth0 Management API](https://auth0.com/docs/api/management/v2), which comes bundled with your Auth0 tenant. However, you can adapt this guide to work with any API that you are securing with Auth0.

:::note
If you followed the [previous section where you added user log in to React](/quickstart/spa/auth0-react#add-login-to-your-application), make sure that you log out of your application as you'll need a new access token to call APIs.
:::

## Set Up the Auth0 Service

The `Auth0Provider` setup is similar to the one discussed in the [Configure the `Auth0Provider` component](/quickstart/spa/auth0-react#configure-the-auth0provider-component) section: you wrap your root component with `Auth0Provider` to which you pass the `domain` and `clientId` props. The values of these two props come from the ["Settings" values](https://auth0.com/docs/quickstart/spa/react#configure-auth0) of the single-page application you've registered with Auth0.

However, your React application needs to pass an access token when it calls a target API to access private resources. You can [request an access token](https://auth0.com/docs/tokens/guides/get-access-tokens) in a format that the API can verify by passing the `audience` and `scope` props to `Auth0Provider` as follows:

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
    audience="https://${account.namespace}/api/v2/"
    scope="read:current_user update:current_user_metadata"
  >
    <App />
  </Auth0Provider>,
  document.getElementById("root")
);
```

Auth0 uses the value of the `audience` prop to determine which resource server (API) the user is authorizing your React application to access. 

:::note
In the case of the Auth0 Management API, the audience is `https://${account.namespace}/api/v2/`. In the case of your APIs, you create an _Identifier_ value that serves as the _Audience_ value whenever you [set up an API](https://auth0.com/docs/getting-started/set-up-api) with Auth0.
:::

The actions that your React application can perform on the API depend on the [scopes](https://auth0.com/docs/scopes/current) that your access token contains, which you define as the value of `scope`. Your React application will request authorization from the user to access the requested scopes, and the user will approve or deny the request.

:::note
In the case of the Auth0 Management API, the `read:current_user` and `update:current_user_metadata` scopes let you get an access token that can retrieve user details and update the user's information. In the case of your APIs, you'll define custom [API scopes](https://auth0.com/docs/scopes/current/api-scopes) to implement access control, and you'll identify them in the calls that your client applications make to that API.
:::

## Get an Access Token 

Once you configure `Auth0Provider`, you can easily get the access token using the [`getAccessTokenSilently()`](https://auth0.github.io/auth0-react/interfaces/auth0contextinterface.html#getaccesstokensilently) method from the [`useAuth0()`](https://auth0.github.io/auth0-react/globals.html#useauth0) custom React Hook wherever you need it. 

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
        audience: `https://<%= "${domain}" %>/api/v2/`,
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
 
:::note
In the case of the Auth0 Management API, one of the scopes that the [`/api/v2/users/{id}` endpoint](https://auth0.com/docs/api/management/v2#!/Users/get_users_by_id) requires is `read:current_user`.
:::
 
You can then include the access token in the authorization header of the API call that you make. The API will take care of validating the access token and processing the request.

Upon success, you extract the `user_metadata` property from the API response and use `setUserMetadata()` to make React aware of it.

For a more detailed example, see how to [create a `useApi` hook](https://github.com/auth0/auth0-react/blob/master/EXAMPLES.md#4-create-a-useapi-hook-for-accessing-protected-apis-with-an-access-token) for accessing protected APIs with an access token.

:::panel Checkpoint
Your application will show "No user metadata defined" if you have not set any `user_metadata` for the logged-in user. To further test out this integration, head to the [Users section of the Auth0 dashboard](https://manage.auth0.com/#/users) and click on the user who is logged in. Update the `user_metadata` section with a value like `{ "theme": "dark" }` and click "Save". Refresh your React application and verify that it reflects the new `user_metadata`. 
:::

:::note
The `getAccessTokenSilently()` method can renew the access and ID token for you using [refresh tokens](https://auth0.com/docs/tokens/concepts/refresh-tokens). To [get a refresh token](https://auth0.com/docs/tokens/guides/get-refresh-tokens) when a user logs in, pass `useRefreshTokens={true}` as a prop to `Auth0Provider`. 
:::

As a final reminder, consult the [Auth0 API quickstarts](https://auth0.com/docs/quickstart/backend) to learn how to integrate Auth0 with your backend platform.
