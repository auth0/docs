---
title: Add Login to your Ruby on Rails App
description: "Auth0 allows you to add authentication to your Ruby on Rails application quickly and to gain access to user profile information. This guide demonstrates how to integrate Auth0 with any new or existing Ruby on Rails application using the OmniAuth."
interactive: true
files:
  - files/config
  - files/initializer
  - files/controller
  - files/routes
  - files/concern
---

# Add Login to your Ruby on Rails App

<%= include('../../_includes/_configure_auth0_interactive', { 
  callback: 'http://localhost:3000/auth/auth0/callback',
  returnTo: 'http://localhost:3000',
  webOriginUrl: 'http://localhost:3000',
  showWebOriginInfo: true
}) %>

## Add Dependencies

This quickstart uses `omniauth-auth0`, a custom [OmniAuth strategy](https://github.com/intridea/omniauth#omniauth-standardized-multi-provider-authentication), to handle the authentication flow.

Add the following dependencies to your `Gemfile`:

```ruby
gem 'omniauth-auth0', '~> 3.0'
gem 'omniauth-rails_csrf_protection', '~> 1.0' # prevents forged authentication requests
```

Once your gems are added, install the gems with `bundle install`.

## Configure the SDK {{{ data-action=code data-code="config/auth0.yml" }}}

Create a configuration file `./config/auth0.yml` to specify your Auth0 domain, client ID, and client secret. These values are presented to you when the Auth0 application in the first step of this quickstart was created.

## Configure OmniAuth Middleware {{{ data-action=code data-code="config/initializers/auth0.rb" }}}

Create the following initializer file `./config/initializers/auth0.rb` and [configure](https://github.com/auth0/omniauth-auth0#additional-authentication-parameters) the **OmniAuth** middleware using the configuration file created in the previous step.

Ensure that `callback_path` matches value given in the "Allowed Callback URLs" setting in your Auth0 client application.

## Add an Auth0 Controller {{{ data-action=code data-code="app/controllers/auth0_controller.rb#1:23" }}}

Create an Auth0 controller for handling the authentication callback.

Run the command: `rails generate controller auth0 callback failure logout --skip-assets --skip-helper --skip-routes --skip-template-engine`. 

Inside the callback method, assign the hash of user information - returned as `request.env['omniauth.auth']` - to the active session.

## Configure Routes {{{ data-action=code data-code="config/routes.rb" }}}

Add the following routes to your `./config/routes.rb` file.

These must be in place so that Rails knows how to route the various Auth0 callback URLs to the Auth0 controller that you created in the previous step.

::::checkpoint
::: checkpoint-default
Run your application to verify that it continues to work as intended and that you don't receive any errors relating to Auth0.
:::

::: checkpoint-failure
Sorry about that. Please double-check that the previous steps completed without error.

Still having issues? Check out our [documentation](https://auth0.com/docs) or visit our [community page](https://community.auth0.com) to get more help.
:::
::::

## Add Login to Your Application

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
Add a button to your application that redirects the user to the `/auth/auth0` endpoint when clicked. Observe that you are redirected to Auth0 to log in, and then back to your app after successfull authentication.
:::

::: checkpoint-failure
Sorry about that. Here are a couple of things you can check:

- Ensure that the correct URLs have been set in your Auth0 client as per the first step in this quickstart
- Check that all the required gems installed correctly
- Check that the routes have been set up and the Auth0 configuration has been set up in your app
- [Check the logs](https://manage.auth0.com/#/logs) for any other errors or messages that may have prevented login from working

Still having issues? Check out our [documentation](https://auth0.com/docs) or visit our [community page](https://community.auth0.com) to get more help.
:::
::::

## Add Logout to Your Application {{{ data-action=code data-code="app/controllers/auth0_controller.rb#21:40" }}}

Now that you can log in to your Rails application, you need [a way to log out](https://auth0.com/docs/logout/guides/logout-auth0). Revisit the Auth0 controller you created earlier, and finish up the logout method added there.

:::note
To test this after the previous login step, you will need to clear out your session and then redirect the user to the Auth0 logout endpoint.
:::

To clear out all the objects stored within the session, call the `reset_session` method within the `auth0_controller/logout` method. [Learn more about reset_session here](http://api.rubyonrails.org/classes/ActionController/Base.html#M000668).

::: note
The final destination URL (the `returnTo` value) needs to be in the list of `Allowed Logout URLs` . See the [logout documentation](/logout/guides/redirect-users-after-logout) for more.
:::

Similar to logging in, the user will now be able to logout of your application by visiting the `/auth/logout` endpoint.

```erb
  <!-- Place a logout button anywhere on your application -->
  ${"<%= button_to 'Logout', 'auth/logout', method: :get %>"}
```

::::checkpoint
::: checkpoint-default
Add a button to your application that redirects the user to the `/auth/logout` endpoint when clicked. Verify that you are redirect to Auth0 and then quickly back to your application, and that you are no longer logged in.
:::

::: checkpoint-failure
Sorry about that. Here are a couple of things you can check:

- Ensure that the correct URLs have been set in your Auth0 client as per the first step in this quickstart
- Check that the routes have been set up and the Auth0 configuration has been set up in your app
- [Check the logs](https://manage.auth0.com/#/logs) for any other errors or messages that may have prevented login from working

Still having issues? Check out our [documentation](https://auth0.com/docs) or visit our [community page](https://community.auth0.com) to get more help.
:::
::::

## Show User Profile Information {{{ data-action=code data-code="app/controllers/concerns/secured.rb" }}}

To display the user's profile, your application should provide a protected route. You can use a controller `concern` to control access to routes. Create the following file `./app/controllers/concerns/secured.rb`

After you have created the secured controller concern, include it in any controller that requires a logged in user. You can then access the user from the session `session[:userinfo]`, as in the following example:

```ruby
class DashboardController < ApplicationController
  include Secured

  def show
    # session[:userinfo] was saved earlier on Auth0Controller#callback
    @user = session[:userinfo]
  end
end
```

Now that you have loaded the user from the session, you can use it to display information in your frontend:

```erb
<!-- ./app/views/dashboard/show.html.erb -->
<div>
  <p>Normalized User Profile:${"<%= JSON.pretty_generate(@user[:info])%>"}</p>
  <p>Full User Profile:${"<%= JSON.pretty_generate(@user[:extra][:raw_info])%>"}</p>
</div>
```

::::checkpoint
::: checkpoint-default
Add the `Secured` concern to your app and then include it in controller that requires an authenticated user to be able to access it. Verify that an authenticated user has access to actions within that controller, and that unauthenticated users are redirected to Auth0 for authentication.
:::
::::
