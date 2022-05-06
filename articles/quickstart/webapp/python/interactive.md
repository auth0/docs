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

# Add login to your Python Flask app

Auth0 allows you to quickly add authentication and gain access to user profile information in your application. This guide demonstrates how to integrate Auth0 with a Python [Flask](https://flask.palletsprojects.com) application using the [Authlib](https://authlib.org/) SDK.

<%= include('../../_includes/_configure_auth0_interactive', {
callback: 'http://localhost:3000/callback',
returnTo: 'http://localhost:3000'
}) %>

## Install dependencies

Begin by creating a `requirements.txt` file in your project directory:

```python
# 📁 requirements.txt -----

flask>=2.0.3
python-dotenv>=0.19.2
authlib>=1.0
requests>=2.27.1
```

You should now run `pip install -r requirements.txt` from your shell to make these dependencies available to your project.

## Configure your `.env` file

Next, create an `.env` file in your project directory. This file will hold your client keys and other configuration details.

```ini
# 📁 .env -----

AUTH0_CLIENT_ID=${account.clientId}
AUTH0_CLIENT_SECRET=${account.clientSecret}
AUTH0_DOMAIN=${account.namespace}
APP_SECRET_KEY=
```

- Generate a suitable string for `APP_SECRET_KEY` using `openssl rand -hex 32` from your shell.

## Setup your application {{{ data-action=code data-code="server.py#1:27" }}}

Now you're ready to start writing your application. Create a `server.py` file in your project directory - this file will hold all of your application logic.

Begin by importing all the libraries your application will be making use of.

Then load the configuration `.env` file you made in the previous step.

Then configure Authlib to handle your application's authentication with Auth0. You can learn more about the configuration options available for Authlib's OAuth `register()` method from [their documentation.](https://docs.authlib.org/en/latest/client/frameworks.html#using-oauth-2-0-to-log-in)

## Setup your routes {{{ data-action=code data-code="server.py#30:59" }}}

For this demonstration, we'll be adding 4 routes for your application: your login, callback, logout and home routes.

When visitors to your app visit the `/login` route, they'll be redirected to Auth0 to begin the authentication flow.

After your users finish logging in with Auth0, they'll be returned to your application at the `/callback` route. This route is responsible for actually saving the session for the user, so when they visit again later, they won't have to sign back in all over again.

As you might expect, the `/logout` route handles signing a user out from your application. It will clear the user's session in your app, and briefly redirect to Auth0's logout endpoint to ensure their session is completely clear, before they are returned to your home route.

Last but not least, your `/` home route will serve as a place to either render an authenticated user's details, or offer to allow visitors to sign in.

## Add templates {{{ data-action=code data-code="templates/home.html" }}}

Now we just need to create the simple template file used in the home route (during `render_template()` calls).

Create a new sub-directory in your project folder named `templates`, and create `home.html`. You can paste the content from the right into that file.

## Run your application

You're ready to run your application! From your project directory, open a shell and use:

```sh
python3 server.py
```

Your application should now be ready to open from your browser at [http://localhost:3000](http://localhost:3000).
