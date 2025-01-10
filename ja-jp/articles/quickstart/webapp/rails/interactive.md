---
title: Add Login to Your Ruby on Rails Application
description: This tutorial demonstrates how to add user login to a Ruby on Rails application using OmniAuth.
interactive: true
files:
  - files/config
  - files/initializer
  - files/controller
  - files/routes
  - files/concern
---

# Add Login to Your Ruby on Rails Application

<%= include('../../_includes/_configure_auth0_interactive', { 
  callback: 'http://localhost:3000/auth/auth0/callback',
  returnTo: 'http://localhost:3000',
  webOriginUrl: 'http://localhost:3000',
  showWebOriginInfo: true
}) %>

## Add dependencies

Use `omniauth-auth0`, a custom [OmniAuth strategy](https://github.com/intridea/omniauth#omniauth-standardized-multi-provider-authentication), to handle the authentication flow.

Add the following dependencies to your `Gemfile`:

```ruby
gem 'omniauth-auth0', '~> 3.0'
gem 'omniauth-rails_csrf_protection', '~> 1.0' # prevents forged authentication requests
```

Once your gems are added, install the gems with `bundle install`.

## Configure the SDK {{{ data-action=code data-code="auth0.yml" }}}

Create a configuration file `./config/auth0.yml` to specify your Auth0 domain, client ID, and client secret values located in your Auth0 Dashboard under application **Settings**.

## Configure OmniAuth middleware {{{ data-action=code data-code="auth0.rb" }}}

Create the following initializer file `./config/initializers/auth0.rb` and [configure](https://github.com/auth0/omniauth-auth0/blob/master/EXAMPLES.md#send-additional-authentication-parameters) the **OmniAuth** middleware with the configuration file you created in the previous step.

Ensure that `callback_path` matches the value given in the "Allowed Callback URLs" setting in your Auth0 application.

## Add an Auth0 controller {{{ data-action=code data-code="auth0_controller.rb" }}}

Create an Auth0 controller to handle the authentication callback, `logout` action, and methods for constructing the logout URL.

Run the command: `rails generate controller auth0 callback failure logout --skip-assets --skip-helper --skip-routes --skip-template-engine`. 

Inside the callback method, assign the hash of user information - returned as `request.env['omniauth.auth']` - to the active session.

To configure logout, clear all the objects stored within the session by calling the `reset_session` method within the `logout` action. Then, redirect to the Auth0 logout endpoint. To learn more about `reset_session`, read[Ruby on Rails ActionController documentation](http://api.rubyonrails.org/classes/ActionController/Base.html#M000668).

## Configure routes {{{ data-action=code data-code="routes.rb" }}}

Add these routes to your `./config/routes.rb` file.

Routes must be in place so Rails knows how to route the various Auth0 callback URLs to the Auth0 controller you created in the previous step.

::::checkpoint
::: checkpoint-default
Run your application to verify it continues to work as intended and you aren't receive any errors relating to Auth0.
:::

::: checkpoint-failure
Sorry about that. Please double-check that the previous steps completed without error.

Still having issues? Check out our [documentation](https://auth0.com/docs) or visit our [community page](https://community.auth0.com) to get more help.
:::
::::

## Add login to your application

A user can now log into your application by visiting the `/auth/auth0` endpoint.

::: warning
To [prevent forged authentication requests](https://github.com/cookpad/omniauth-rails_csrf_protection), use the `link_to` or `button_to` helper methods with the `:post` method
:::

```erb
<!-- Place a login button anywhere on your application -->
${"<%= button_to 'Login', '/auth/auth0', method: :post %>"}
```

::::checkpoint
::: checkpoint-default
Add a button to your application that redirects the user to the `/auth/auth0` endpoint when selected. Observe that you redirect to Auth0 to log in, and then back to your app after successful authentication.
:::

::: checkpoint-failure
Sorry about that. Here are a couple of things you can check:

- Ensure that the correct URLs have been set in your Auth0 application as per the first step in this quickstart
- Check that all the required gems installed correctly
- Check that the routes have been set up and the Auth0 configuration has been set up in your app
- [Check the logs](https://manage.auth0.com/#/logs) for any other errors or messages that may have prevented login from working

Still having issues? Check out our [documentation](https://auth0.com/docs) or visit our [community page](https://community.auth0.com) to get more help.
:::
::::

## Add logout to your application

Now that you can log in to your Rails application, you need [a way to log out](https://auth0.com/docs/logout/guides/logout-auth0). Log out a user by redirecting to the `auth/logout` action, which redirects them to the Auth0 logout endpoint.

:::note
To test this after the previous step, you may need to clear out your session and then redirect the user to the Auth0 logout endpoint.
:::

```erb
<!-- Place a logout button anywhere on your application -->
${"<%= button_to 'Logout', 'auth/logout', method: :get %>"}
```

::::checkpoint
::: checkpoint-default
Add a button to your application that redirects the user to the `/auth/logout` endpoint when selected. Verify that you redirect to Auth0 and then quickly back to your application, and that you are no longer logged in.
:::

::: checkpoint-failure
Sorry about that. Here are a couple of things you can check:

- Ensure that the correct URLs have been set in your Auth0 client as per the first step in this quickstart
- Check that the routes have been set up and the Auth0 configuration has been set up in your app
- [Check the logs](https://manage.auth0.com/#/logs) for any other errors or messages that may have prevented login from working

Still having issues? Check out our [documentation](https://auth0.com/docs) or visit our [community page](https://community.auth0.com) to get more help.
:::
::::

## Show user profile information {{{ data-action=code data-code="secured.rb" }}}

To display the user's profile, your application should provide a protected route. You can use a [Concern](https://guides.rubyonrails.org/getting_started.html#using-concerns) to control access to routes that can be shared across multiple controllers. The concern should automatically redirect to Auth0 when the user is unauthenticated. Otherwise, the concern should return the current user profile.

Once you have a Concern, include it in any controller that requires a logged in user. You can then access the user from the session `session[:userinfo]` as in the following example:

```ruby
class DashboardController < ApplicationController
  include Secured

  def show
    @user = session[:userinfo]
  end
end
```

Once the user loads from the session, use it to display information in your frontend:

```erb
<div>
  <p>Normalized User Profile:${"<%= JSON.pretty_generate(@user[:info])%>"}</p>
  <p>Full User Profile:${"<%= JSON.pretty_generate(@user[:extra][:raw_info])%>"}</p>
</div>
```

::::checkpoint
::: checkpoint-default
Add the `Secured` concern to your app and then include it in the controller that requires an authenticated user to access it. Verify that an authenticated user has access to actions within that controller and that unauthenticated users are redirected to Auth0 for authentication.
:::
::::
