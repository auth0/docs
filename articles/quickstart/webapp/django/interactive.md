---
title: Add Login to your Django application
description: This tutorial demonstrates how to add user login to a Django application.
topics:
  - quickstarts
  - webapp
  - django
  - login
github:
  path: Quickstart/Sample
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

# Add login to your Django app

Auth0 allows you to quickly add authentication and gain access to user profile information in your application. This guide demonstrates how to integrate Auth0 with a Python [Django](https://www.djangoproject.com/) application using the [Authlib](https://authlib.org/) SDK.

<%= include('../../_includes/_configure_auth0_interactive', {
callback: 'http://localhost:3000/callback',
returnTo: 'http://localhost:3000'
}) %>

## Install dependencies

For this integration you'll need few library dependencies, such as Authlib. Go ahead and create a `requirements.txt` file in your project directory, and include the following:

```python
# 📁 requirements.txt -----

authlib ~= 1.0
django ~= 4.0
python-dotenv ~= 0.19
requests ~= 2.27
```

You should now run `pip install -r requirements.txt` from your shell to make these dependencies available to your project.

## Configure your `.env` file

Next, create an `.env` file in your project directory. This file will hold your client keys and other configuration details.

```ini
# 📁 .env -----

AUTH0_CLIENT_ID=${account.clientId}
AUTH0_CLIENT_SECRET=${account.clientSecret}
AUTH0_DOMAIN=${account.namespace}
```

## Create an application

If you already have a Django application setup, you can skip to the next step. Otherwise, create your new application project. From your shell, run the following command, and switch to the new project folder:

```sh
django-admin startproject webappexample
cd webappexample
```

## Update `settings.py` {{{ data-action=code data-code="webappexample/settings.py" }}}

Make some minor changes to your `webappexample/settings.py` file to read those `.env` values.

At the top of the file, add the `os` and `dotenv` imports.

Next, beneath the `BASE_DIR` definition, add the `TEMPLATE_DIR` variable.

Next, find the `TEMPLATES` variable and update the `DIRS` value to add our `TEMPLATE_DIR` string. This tells Django where to look for our template files, once we create them. Keep any other content of this array the same.

Finally, at the end of this file, add the code to load the Auth0 config.

## Setup your application {{{ data-action=code data-code="webappexample/views.py#1:18" }}}

Now you're ready to start writing your application. Open the `webappexample/views.py` file in your IDE.

Begin by importing all the libraries your application will be making use of.

Now you can configure Authlib to handle your application's authentication with Auth0.

You can learn more about the configuration options available for Authlib's OAuth `register()` method from [their documentation.](https://docs.authlib.org/en/latest/client/frameworks.html#using-oauth-2-0-to-log-in)

## Setup your route handlers {{{ data-action=code data-code="webappexample/views.py#21:57" }}}

For this demonstration, we'll be adding 4 routes for your application: your login, callback, logout and index routes.

- `login` - When visitors to your app visit the `/login` route, they'll be redirected to Auth0 to begin the authentication flow.
- `callback` - After your users finish logging in with Auth0, they'll be returned to your application at the `/callback` route. This route is responsible for actually saving the session for the user, so when they visit again later, they won't have to sign back in all over again.
- `logout` - As you might expect, this route handles signing a user out from your application. It will clear the user's session in your app, and briefly redirect to Auth0's logout endpoint to ensure their session is completely clear, before they are returned to your home route (covered next.)
- `index` - Last but not least, your home route will serve as a place to either render an authenticated user's details, or offer to allow visitors to sign in.

## Register your routes {{{ data-action=code data-code="webappexample/urls.py" }}}
 
Tell Django how to connect these new routes by replacing the contents of your `webappexample/urls.py` file with the code on the right.

This will route the `/login`, `/callback`, `/logout` and `/` routes to the correct handlers.

## Add templates {{{ data-action=code data-code="webappexample/templates/index.html" }}}

Now we just need to create a simple template file used in the home page route.

Create a new sub-directory within the `webappexample` folder named `templates`, and create a `index.html` file.

The `index.html` file will contain template code that will show the user's info if they're logged in, or present them with a login button if they're logged out. 

## Run your application

You're ready to run your application! From your project directory, open a shell and use:

```sh
python3 manage.py migrate
python3 manage.py runserver 3000
```

Your application should now be ready to open from your browser at [http://localhost:3000](http://localhost:3000).

::::checkpoint
:::checkpoint-default
Your application should be running, when you visit [http://localhost:3000](http://localhost:3000) you should see a login button that takes you to Auth0 to login, then back to your application to see your profile information.
:::

:::checkpoint-failure
Sorry about that. Here's a couple things to double check:
* Make sure there are no errors in the console.
* Make sure the domain and client ID imported correctly.
* Make sure your tenant is correctly configured.

Still having issues? Check out our [documentation](https://auth0.com/docs) or visit our [community page](https://community.auth0.com) to get more help.
:::
::::
