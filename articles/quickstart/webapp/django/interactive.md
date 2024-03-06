---
title: Add Login to your Django application
description: This tutorial demonstrates how to add user login to a Django application.
topics:
  - quickstarts
  - webapp
  - django
  - login
github:
  path: 01-Login
contentType: tutorial
useCase: quickstart
interactive: true
files:
  - files/index
  - files/settings
  - files/urls
  - files/views
---

<!-- markdownlint-disable MD025 MD034 -->

# Add Login to Your Django Application

Auth0 allows you to add authentication and gain access to user profile information in your application. This guide demonstrates how to integrate Auth0 with a Python [Django](https://www.djangoproject.com/) application using the [Authlib](https://authlib.org/) SDK.

<%= include('../../_includes/_configure_auth0_interactive', {
callback: 'http://localhost:3000/callback',
returnTo: 'http://localhost:3000'
}) %>

## Install dependencies

For this integration, you will add several library dependencies, such as Authlib. Create a `requirements.txt` file in your project directory, and include the following:

```python
# 📁 requirements.txt -----

authlib ~= 1.0
django ~= 4.0
python-dotenv ~= 0.19
requests ~= 2.27
```

Run the following command from your shell to make these dependencies available:

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
```

## Create an application

If you already have a Django application setup, skip to the next step. For a new application project, run the following command:   

```sh
django-admin startproject webappexample
```

Change to the new project folder:

```sh
cd webappexample
```

## Update `settings.py` {{{ data-action=code data-code="webappexample/settings.py" }}}

Open the `webappexample/settings.py` file to review the `.env` values.

At the top of the file, add the `os` and `dotenv` imports.

Next, beneath the `BASE_DIR` definition, add the `TEMPLATE_DIR` variable.

Next, find the `TEMPLATES` variable and update the `DIRS` value to add our `TEMPLATE_DIR` string. This determines the path of the template files, which you will create in a future step.
Keep any other content of this array the same.

At the end of this file, add the code to load the Auth0 config.

## Setup your application {{{ data-action=code data-code="webappexample/views.py#1:18" }}}

To begin creating your application, open the `webappexample/views.py` file in your IDE.

Import all the libraries your application needs.

Now you can configure Authlib to handle your application's authentication with Auth0.

Learn more about the configuration options available for Authlib's OAuth `register()` method from [their documentation.](https://docs.authlib.org/en/latest/client/frameworks.html#using-oauth-2-0-to-log-in)

## Setup your route handlers {{{ data-action=code data-code="webappexample/views.py#21:57" }}}

In this example, you will add four routes for your application: the login, callback, logout, and index routes.

- `login` - When visitors to your app visit the `/login` route, they will reach Auth0 to begin the authentication flow.
- `callback` - After your users finish logging in with Auth0, they will return to your application at the `/callback` route. This route saves the session for the user and bypasses the need for them to login again when they return.
- `logout` - +The `/logout` route signs users out from your application. This route clears the user session in your app and redirects to the Auth0 logout endpoint to ensure the session is no longer saved. Then, the application redirects the user to your home route.
- `index` - The home route will render an authenticated user's details or allow visitors to sign in.

## Register your routes {{{ data-action=code data-code="webappexample/urls.py" }}}
 
Replace the contents of your `webappexample/urls.py` file with the code on the right to connect to these new routes.

This will route the `/login`, `/callback`, `/logout` and `/` routes to the correct handlers.

## Add templates {{{ data-action=code data-code="webappexample/templates/index.html" }}}

Next, you will create a template file used in the home page route.

Create a new sub-directory within the `webappexample` folder named `templates`, and create a `index.html` file.

The `index.html` file will contain template code to display the user's info if logged in or present them with a login button if logged out. 

## Run your application

You're ready to run your application! From your project directory, open a shell and use:

```sh
python3 manage.py migrate
python3 manage.py runserver 3000
```

Your application should now be ready to open from your browser at [http://localhost:3000](http://localhost:3000).

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
