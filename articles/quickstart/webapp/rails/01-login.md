---
title: Login
description: This tutorial demonstrates how to add user login to a Ruby on Rails application.
budicon: 448
topics:
  - quickstarts
  - webapp
  - login
  - rails
contentType: tutorial
useCase: quickstart
---

<%= include('../_includes/_getting_started', { library: 'Rails', callback: 'http://localhost:3000/auth/auth0/callback' }) %>

<%= include('../../../_includes/_logout_url', { returnTo: 'http://localhost:3000' }) %>

## Install the Auth0 SDK

### Install Dependencies

This tutorial uses `omniauth-auth0`, a custom [OmniAuth strategy](https://github.com/intridea/omniauth#omniauth-standardized-multi-provider-authentication), to handle the authentication flow.  Add the following dependencies to your `Gemfile`:

```ruby
gem 'omniauth-auth0', '~> 3.0'
gem 'omniauth-rails_csrf_protection', '~> 1.0' # prevents forged authentication requests
```

Once your gems are added, install the gems with `bundle install`:

### Initialize Auth0 Configuration

Create an Auth0 config file `./config/auth0.yml`

```yaml
# ./config/auth0.yml
development:
  auth0_domain: ${account.namespace}
  auth0_client_id: ${account.clientId}
  auth0_client_secret: <YOUR AUTH0 CLIENT SECRET>
```

Create the following initializer file `./config/initializers/auth0.rb` and [configure](https://github.com/auth0/omniauth-auth0/blob/master/EXAMPLES.md#send-additional-authentication-parameters) the **OmniAuth** middleware.

```ruby
# ./config/initializers/auth0.rb
AUTH0_CONFIG = Rails.application.config_for(:auth0)

Rails.application.config.middleware.use OmniAuth::Builder do
  provider(
    :auth0,
    AUTH0_CONFIG['auth0_client_id'],
    AUTH0_CONFIG['auth0_client_secret'],
    AUTH0_CONFIG['auth0_domain'],
    callback_path: '/auth/auth0/callback',
    authorize_params: {
      scope: 'openid profile'
    }
  )
end
```

### Add an Auth0 controller
Create an Auth0 controller for handling the authentication callback. Run the command `rails generate controller auth0 callback failure logout --skip-assets --skip-helper --skip-routes --skip-template-engine`. 

Inside of the callback method assign the hash of user information, returned as `request.env['omniauth.auth']`, to the active session.

```ruby
# ./app/controllers/auth0_controller.rb
class Auth0Controller < ApplicationController
  def callback
    # OmniAuth stores the information returned from Auth0 and the IdP in request.env['omniauth.auth'].
    # In this code, you will pull the raw_info supplied from the id_token and assign it to the session.
    # Refer to https://github.com/auth0/omniauth-auth0/blob/master/EXAMPLES.md#example-of-the-resulting-authentication-hash for complete information on 'omniauth.auth' contents.
    auth_info = request.env['omniauth.auth']
    session[:userinfo] = auth_info['extra']['raw_info']

    # Redirect to the URL you want after successful auth
    redirect_to '/dashboard'
  end

  def failure
    # Handles failed authentication -- Show a failure page (you can also handle with a redirect)
    @error_msg = request.params['message']
  end

  def logout
    # you will finish this in a later step
  end
end
```

Add the following routes to your `./config/routes.rb` file:

```ruby
# ./config/routes.rb
Rails.application.routes.draw do
  # ..
  get '/auth/auth0/callback' => 'auth0#callback'
  get '/auth/failure' => 'auth0#failure'
  get '/auth/logout' => 'auth0#logout'
end
```

## Add Login to Your Application
A user can now log into your application by visiting the `/auth/auth0` endpoint.

::: warning
To [prevent forged authentication requests](https://github.com/cookpad/omniauth-rails_csrf_protection), use the `link_to` or `button_to` helper methods with the `:post` method
:::

```erb
  <!-- Place a login button anywhere on your application -->
  ${"<%= button_to 'Login', '/auth/auth0', method: :post, data: \{ turbo: false \} %>"}
```

## Add Logout to Your Application
Now that you can log in to your Rails application, you need [a way to log out](https://auth0.com/docs/logout/guides/logout-auth0). Revisit the Auth0Controller you created earlier, and finish up the logout method added there.

You will need to clear out your session and then redirect the user to the Auth0 logout endpoint.

To clear out all the objects stored within the session, call the `reset_session` method within the `auth0_controller/logout` method. [Learn more about reset_session here](http://api.rubyonrails.org/classes/ActionController/Base.html#M000668).  Add the following code to `./app/controllers/auth0_controller.rb`:

```ruby
# ./app/controllers/auth0_controller.rb
class Auth0Controller < ApplicationController
  # ..
  # ..Insert the code below
  def logout
    reset_session
    redirect_to logout_url, allow_other_host: true
  end

  private

  def logout_url
    request_params = {
      returnTo: root_url,
      client_id: AUTH0_CONFIG['auth0_client_id']
    }

    URI::HTTPS.build(host: AUTH0_CONFIG['auth0_domain'], path: '/v2/logout', query: request_params.to_query).to_s
  end
end
```

::: note
The final destination URL (the `returnTo` value) needs to be in the list of `Allowed Logout URLs` . See the [logout documentation](/logout/guides/redirect-users-after-logout) for more.
:::

The user will now be able to logout of your application by visiting the `/auth/logout` endpoint.

```erb
  <!-- Place a logout button anywhere on your application -->
  ${"<%= button_to 'Logout', 'auth/logout', method: :get, data: \{ turbo: false \} %>"}
```

## Show User Profile Information
To display the user's profile, your application should provide a protected route. You can use a controller `concern` to control access to routes. Create the following file `./app/controllers/concerns/secured.rb`

```ruby
# ./app/controllers/concerns/secured.rb
module Secured
  extend ActiveSupport::Concern

  included do
    before_action :logged_in_using_omniauth?
  end

  def logged_in_using_omniauth?
    redirect_to '/' unless session[:userinfo].present?
  end
end
```

After you have created the secured controller concern, include it in any controller that requires a logged in user. You can then access the user from the session `session[:userinfo]`.

```ruby
# ./app/controllers/dashboard_controller.rb
class DashboardController < ApplicationController
  include Secured

  def show
    # session[:userinfo] was saved earlier on Auth0Controller#callback
    @user = session[:userinfo]
  end
end
```

Now that you have loaded the user from the session, you can use it to display information in your frontend.
```erb
<!-- ./app/views/dashboard/show.html.erb -->
<div>
  <p>Normalized User Profile:${"<%= JSON.pretty_generate(@user[:info])%>"}</p>
  <p>Full User Profile:${"<%= JSON.pretty_generate(@user[:extra][:raw_info])%>"}</p>
</div>
```
