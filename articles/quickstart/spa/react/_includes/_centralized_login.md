<!-- markdownlint-disable MD002 MD041 MD034 -->

## Create a Sample Application

::: note
The following tutorial creates a new React application using `create-react-app`, and presents some common ways to build React applications, in terms of its structure and naming conventions. If you are using this guide to integrate the Auth0 SDK into your own React application, you may need to adjust some of the steps to suit your scenario.
:::

If you don't already have an existing application, you can create one using the [Create React App](https://facebook.github.io/create-react-app/) CLI tool. Using the terminal, find a location on your drive where you want to create the project and run the following commands:

```bash
# Create the application using create-react-app
npx create-react-app my-app

# Move into the project directory
cd my-app
```

(npx comes with npm 5.2+ and higher, see [instructions for older npm versions](https://gist.github.com/gaearon/4064d3c23a77c74a3614c498a8bb1c5f))

### Install dependencies

Install the following packages using `npm` in the terminal:

```bash
npm install react-router-dom @auth0/auth0-spa-js
```

- [`@auth0/auth0-spa-js`](https://github.com/auth0/auth0-spa-js) - Auth0's JavaScript SDK for Single Page Applications
- [`react-router-dom`](https://github.com/ReactTraining/react-router/tree/master/packages/react-router-dom) - React's router package for the browser. This will allow users to navigate between different pages with ease

### Create react-router's `history` instance

Create a new folder inside the `src` folder called `utils`. This is where you will add all the utilitary functions your application might need.

Create a new file in the `utils` folder called `history.js`. This file will be responsible for exporting react-router's `history` module so we can [redirect the user programatically](https://github.com/ReactTraining/react-router/blob/master/FAQ.md#how-do-i-access-the-history-object-outside-of-components).

```js
// src/utils/history.js

import { createBrowserHistory } from "history";
export default createBrowserHistory();
```

### Create the Auth0 React wrapper

Create a new file in the `src` directory called `react-auth0-spa.js` and populate it with the following content:

```jsx
// src/react-auth0-spa.js
import React, { useState, useEffect, useContext } from "react";
import createAuth0Client from "@auth0/auth0-spa-js";
import history from "./utils/history";

export const Auth0Context = React.createContext();

export const useAuth0 = () => useContext(Auth0Context);

export const Auth0Provider = ({ children, config }) => {
  // Auth0 State
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState();
  const [user, setUser] = useState();

  // Auth0 Client
  const [auth0Client, setAuth0] = useState();

  useEffect(() => {
    (async function initAuth0() {
      const auth0FromHook = await createAuth0Client({ ...config });
      setAuth0(auth0FromHook);

      const { search } = window.location;
      if (search.includes("code=") && search.includes("state=")) {
        const { appState } = await auth0FromHook.handleRedirectCallback();
        const targetUrl = appState?.targetUrl;
        history.push(targetUrl || "/");
      }

      const isAuthenticated = await auth0FromHook.isAuthenticated();
      setIsAuthenticated(isAuthenticated);

      if (isAuthenticated) {
        const user = await auth0FromHook.getUser();
        setUser(user);
      }

      setLoading(false);
    })();
  }, [config]);

  return (
    <Auth0Context.Provider
      value={{
        auth0State: { loading, isAuthenticated, user },
        auth0Client
      }}
    >
      {children}
    </Auth0Context.Provider>
  );
};
```

This is a set of custom [React hooks](https://reactjs.org/docs/hooks-intro.html) that enable you to work with the Auth0 SDK in a more idiomatic way, providing functions that allow the user to log in or log out. They also supply information such as whether the user is logged in.

Notice that the `Auth0Provider` component routes the user to the right place once they have logged in. For example, if the user tries to access a page that requires them to be authenticated, they will be asked to log in. When they return to the application, they will be forwarded to the page they were originally trying to access.

The next few sections will integrate these hooks into the various components that make up the app.

<%= include('../../_includes/_silent-auth-social-idp') %>

### Create the NavBar component

Create a new folder inside the `src` folder called `components`. This is where you will house all the components for this application.

Create a new component in the `components` folder called `NavBar.js`. This component will be responsible for showing the login and logout buttons:

```jsx
// src/components/NavBar.js

import React from "react";
import { useAuth0 } from "../react-auth0-spa";

const NavBar = () => {
  const { auth0State, auth0Client } = useAuth0();

  if (!auth0State.isAuthenticated) {
    return (
      <nav>
        <button onClick={() => auth0Client.loginWithRedirect()}>Log in</button>
      </nav>
    );
  }

  return (
    <nav>
      <button onClick={() => auth0Client.logout()}>Log out</button>
    </nav>
  );
};

export default NavBar;
```

Here the component renders two buttons for logging in and logging out, depending on whether the user is currently authenticated.

Notice the use of `useAuth0` — provided by the wrapper you created in the previous section — which provides the functionality needed to log in, log out, and determine if the user is logged in through the `isAuthenticated` property.

### Integrate the SDK

In order for the authentication system to work properly, the application components should be wrapped in the `Auth0Provider` component that is provided by the SDK wrapper created earlier in the tutorial. This means that any components inside this wrapper will be able to access the Auth0 SDK client.

Open the `src/index.js` file and replace its contents with the following:

```jsx
// src/index.js

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Auth0Provider } from "./react-auth0-spa";
import config from "./auth_config.json";

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider config={config}>
      <App />
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
```

Notice that the `App` component is now wrapped in the `Auth0Provider` component, where the Auth0 configuration is specified.

Next, create a new file `auth_config.json` in the `src` folder, and populate it with the following:

```json
{
  "domain": "${account.namespace}",
  "client_id": "${account.clientId}",
  "redirect_uri": "http://localhost:3000"
}
```

Details about the Auth0 domain and client ID are specified here. The `redirect_uri` property is also specified. Doing this here means that you don't need to pass this URI to every call to `loginWithRedirect`, and it keeps the configuration in one place.

:::note
The values for `domain` and `client_id` should be replaced with those for your own Auth0 app.
:::

Next, open the `App.js` file in the `src` folder, populate it with the following content:

```jsx
// src/App.js

import React from "react";
import NavBar from "./components/NavBar";
import { useAuth0 } from "./react-auth0-spa";

function App() {
  const { auth0State } = useAuth0();

  if (auth0State.loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <header>
        <NavBar />
      </header>
    </div>
  );
}

export default App;
```

This replaces the default content created by `create-react-app` and simply shows the `NavBar` component you created earlier.

Notice the use of the `useAuth0` hook to retrieve a `loading` property. This property can be used to display some kind of "loading" text or spinner graphic while the user's data is being retrieved.

:::panel Checkpoint
At this point, you should be able to go through the complete authentication flow: logging in and logging out. Start the application from the terminal using `npm start` and browse to [localhost:3000](http://localhost:3000) (if the application does not open automatically). From there, clicking the **Log in** button should redirect you to the Auth0 login page where you will be given the opportunity to log in.

Once you are logged in, control returns to your application and you should see that the **Log out** button is now visible. Clicking this should log you out of the application and return you to an unauthenticated state.
:::

## Read the User Profile

When a user is logged in, the associated **user profile** information can be retrieved. Typically this is used to display their name and profile picture.

To display this information to the user, create a new file called `Profile.js` inside the `components` folder and populate it with the following content:

```jsx
// src/components/Profile.js

import React from "react";
import { useAuth0 } from "../react-auth0-spa";

const Profile = () => {
  const { auth0State } = useAuth0();

  if (!auth0State.user) {
    return <div>User profile unavailable</div>;
  }

  return (
    <>
      <img src={auth0State.user.picture} alt="Profile" />

      <h2>{auth0State.user.name}</h2>
      <p>{auth0State.user.email}</p>
      <code>{JSON.stringify(auth0State.user, null, 2)}</code>
    </>
  );
};

export default Profile;
```

Notice here that the `useAuth0` hook is again being used, this time to retrieve the user's profile information (through the `user` property).

In the UI for this component, the user's profile picture, name, and email address are being retrieved from the `user` property and displayed on the screen.

To access this page, modify the `index.js` file to include a router so that the application can navigate between pages. Remember to pass the `history` module we previously created to the `Router` component. The `index.js` file should now look something like this:

```jsx
// src/index.js

import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Auth0Provider } from "./react-auth0-spa";
import config from "./auth_config.json";
import history from "./utils/history";

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider config={config}>
      <Router history={history}>
        <App />
      </Router>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
```

Next, modify the `App.js` file to include `Route` components for displaying the different pages.

```jsx
// src/App.js

import React from "react";
import NavBar from "./components/NavBar";

// New - import the React Router components, and the Profile page component
import { Route, Switch } from "react-router-dom";
import Profile from "./components/Profile";

function App() {
  const { auth0State } = useAuth0();

  if (auth0State.loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <header>
        <NavBar />
      </header>
      <Switch>
        <Route path="/" exact />
        <Route path="/profile" component={Profile} />
      </Switch>
    </div>
  );
}

export default App;
```

Notice that a `Router` component has been included, and that two routes have been defined — one for the home page, and another for the profile page.

To complete this step, open the `NavBar.js` file and modify the navigation bar's UI to include a link to the profile page. In addition, import the `Link` component at the top of the file.

The `NavBar` component should now look something like this:

```jsx
// src/components/NavBar.js

import React from "react";
import { useAuth0 } from "../react-auth0-spa";

// NEW - import the Link component
import { Link } from "react-router-dom";

const NavBar = () => {
  const { auth0State, auth0Client } = useAuth0();

  if (!auth0State.isAuthenticated) {
    return (
      <nav>
        <button onClick={() => auth0Client.loginWithRedirect()}>Log in</button>
      </nav>
    );
  }

  return (
    <nav>
      <button onClick={() => auth0Client.logout()}>Log out</button>
      {/* NEW - add a link to the home and profile pages */}
      <span>
        <Link to="/">Home</Link>&nbsp;
        <Link to="/profile">Profile</Link>
      </span>
    </nav>
  );
};

export default NavBar;
```

:::panel Checkpoint
Go ahead and run the project one more time. Now if the user is authenticated and you navigate to the `/profile` page, you will see their profile data. See how this content disappears when you log out.
:::

## Secure the Profile Page

The profile page should be protected in such a way that if the user tries to access it directly without logging in, they will be automatically redirected to Auth0 to log in.

To accomplish this, you can make a Higher-Order Component that will wrap any component to check if the user is authenticated.

Start by creating a new component `components/PrivateRoute.js` that can wrap another component. Populate it with the following content:

```jsx
// src/components/PrivateRoute.js

import React from "react";
import { Route } from "react-router-dom";
import { useAuth0 } from "../react-auth0-spa";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { auth0State, auth0Client } = useAuth0();

  return (
    <Route
      {...rest}
      render={props => {
        // 1. Redirect to login if not logged in
        if (!auth0State.isAuthenticated) {
          if (!auth0State.loading) {
            return auth0Client.loginWithRedirect({
              appState: { targetUrl: window.location.pathname }
            });
          } else {
            return null;
          }
        }

        // 2. Render component
        return <Component {...props} />;
      }}
    />
  );
};

export default PrivateRoute;
```

This component takes another component as one of its arguments. It redirects the user to the login page if they are not yet authenticated.

If the user is authenticated, the redirect will not take place and the component that was specified as the argument will be rendered instead. In this way, components that require the user to be logged in can be protected simply by wrapping the component using `PrivateRoute`.

### Protect application routes

With the `PrivateRoute` component in place, the application router can now be modified to secure the `/profile` route, ensuring that users must log in to the application to see it.

Open `App.js` once again, import the `PrivateRoute` component, and update the router so that the `Profile` component is wrapped by the `PrivateRoute` component instead of the `Route` component:

```jsx
// src/App.js

// .. other imports removed for brevity

// NEW - import the PrivateRoute component
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    {/* other components removed for brevity */}

    {/* NEW - Modify the /profile route to use PrivateRoute instead of Route */}
    <PrivateRoute path="/profile" component={Profile} />
  );
}

export default App;
```

:::panel Checkpoint
Run the project again. Now if the user is not authenticated and you navigate to the `/profile` page through the URL bar in the browser, you will be sent through the authentication flow, and you will see the Profile page upon your return.
:::
