---
title: Add login to your Python Flask app
description: This tutorial demonstrates how to add user login to a Python web application built with the Flask framework and Authlib OAuth library.
interactive: true
files:
- files/server
- files/home
contentType: tutorial
useCase: quickstart
topics:
  - quickstarts
  - webapp
  - login
  - python
  - flask
github:
  path: 01-Login
---

<!-- markdownlint-disable MD025 MD034 -->

# Add Login to Your Python Flask Application

Auth0 allows you to add authentication and gain access to user profile information in your application. This guide demonstrates how to integrate Auth0 with a Python [Flask](https://flask.palletsprojects.com) application using the [Authlib](https://authlib.org/) SDK.

<%= include('../../_includes/_configure_auth0_interactive', {
callback: 'http://localhost:3000/callback',
returnTo: 'http://localhost:3000'
}) %>

## Install dependencies

Create a `requirements.txt` file in your project directory:

```python
# 📁 requirements.txt -----

flask>=2.0.3
python-dotenv>=0.19.2
authlib>=1.0
requests>=2.27.1
```

Run the following command from your shell to enable these dependencies in your project:

```sh
pip install -r requirements.txt
```

## Configure your `.env` file

Next, create an `.env` file in your project directory. This file will hold your client keys and other configuration details.

```ini
# 📁 .env -----

AUTH0_CLIENT_ID=${account.clientId}
AUTH0_CLIENT_SECRET=${account.clientSecret}
AUTH0_DOMAIN=${account.namespace}
APP_SECRET_KEY=
```

- Generate a string for `APP_SECRET_KEY` using `openssl rand -hex 32` from your shell.

## Setup your application {{{ data-action=code data-code="server.py#1:27" }}}

Next, set up your application. Create a `server.py` file in your project directory - this file will contain your application logic.

Import all the libraries your application needs.

Load the configuration `.env` file you made in the previous step.

Configure Authlib to handle your application's authentication with Auth0. To learn more about the configuration options available for Authlib's OAuth `register()` method from [their documentation.](https://docs.authlib.org/en/latest/client/frameworks.html#using-oauth-2-0-to-log-in)

## Setup your routes {{{ data-action=code data-code="server.py#30:59" }}}

In this example, you will add four routes to the application: login, callback, logout, and home.

When visitors to your app visit the `/login` route, your application will route them to the Auth0 login page.

After your users log in with Auth0, your application will route them to the `/callback` route. This route saves the session for the user and bypasses the need for them to login again when they return.

The `/logout` route signs users out from your application. This route clears the user session in your app and redirects to the Auth0 logout endpoint to ensure the session is no longer saved. Then, the application redirects the user to your home route.

Your `/ ` home route either renders an authenticated user's details or  allows visitors to sign in.

## Add templates {{{ data-action=code data-code="templates/home.html" }}}

Next, create the template file used in the home route (during `render_template()` calls).

Create a new sub-directory in your project folder named `templates`, and create `home.html`  in the directory. Paste the content from the right into that file.

## Run your application

To run your application, navigate to the root of your project directory and open a terminal. Run the following command:

```sh
python3 server.py
```

::::checkpoint
:::checkpoint-default
Visit [http://localhost:3000](http://localhost:3000) to verify. You should find a login button routing to Auth0 for login, then back to your application to see your profile information.
:::

:::checkpoint-failure
If your application did not start successfully:
* Verify any errors in the console.
* Verify the domain and Client ID imported correctly.
* Verify your tenant configuration.

Still having issues? Check out our [documentation](https://auth0.com/docs) or visit our [community page](https://community.auth0.com) to get more help.
:::
::::
