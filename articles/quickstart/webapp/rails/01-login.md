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

## Integrate Auth0

### Install the Dependencies

This tutorial uses `omniauth-auth0`, a custom [OmniAuth strategy](https://github.com/intridea/omniauth#omniauth-standardized-multi-provider-authentication), to handle the authentication flow.  Add the following dependencies to your `Gemfile`:

```ruby
gem 'omniauth-auth0', '~> 2.5'
gem 'omniauth-rails_csrf_protection', '~> 0.1' # prevents forged authentication requests
```

Once your gems are added, install the gems with `$ bundle install`:

### Initialize OmniAuth Auth0

Create an Auth0 config file `./config/auth0.yml`

```yaml
# ./config/auth0.yml
development:
  auth0_domain: ${account.namespace}
  auth0_client_id: ${account.clientId}
  auth0_client_secret: <YOUR AUTH0 CLIENT SECRET>
```

Create the following initializer file `./config/initializers/auth0.rb` and [configure](https://github.com/auth0/omniauth-auth0#additional-authentication-parameters) the **OmniAuth** middleware.

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
Create an Auth0 controller `./config/controllers/auth0_controller.rb` for handling of the authentication callback.  Inside of the callback method assign the hash of user information, returned as `request.env['omniauth.auth']`, to the active session.

```ruby
# ./app/controllers/auth0_controller.rb
class Auth0Controller < ApplicationController
  def callback
    # This stores all the user information that came from Auth0 and the IdP
    session[:userinfo] = request.env['omniauth.auth']

    # Redirect to the URL you want after successful auth
    redirect_to '/dashboard'
  end

  def failure
    # Handles failed authentication -- Show a failure page (you can also handle with a redirect)
    @error_msg = request.params['message']
  end
end
```

Add the following routes to your `./config/routes.rb` file:

```ruby
# ./config/routes.rb
Rails.application.routes.draw do
  get '/auth/auth0/callback' => 'auth0#callback'
  get '/auth/failure' => 'auth0#failure'
end
```

## Login
A user can now log into your application by visiting the `/auth/auth0` endpoint.

::: warning
To prevent forged authentication requests, use the `link_to` or `button_to` helper methods with the `:post` method
:::

```ruby
  # Place the login button anywhere
  ${"<%= button_to 'Login', 'auth/auth0', method: :post %>"}
```

## Display User Profile
To display the user's profile, your application should provide a protected route. You can use a controller `concern` to control access to routes. Create the following file `./app/controllers/concerns/secured.rb`

```ruby
# ./app/controllers/concerns/secured.rb
module Secured
  extend ActiveSupport::Concern

  included do
    before_action :logged_in_using_omniauth?
  end

  def logged_in_using_omniauth?
    redirect_to '/', unless session[:userinfo].present?
  end
end
```

After you have created the secured controller concern, include it in any controller that requires a logged in user.
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

Here is an example of displaying the corresponding user's information
```erb
<!-- ./app/views/dashboard/show.html.erb -->
<div>
  <p>Normalized User Profile:${"<%= JSON.pretty_generate(@user[:info])%>"}</p>
  <p>Full User Profile:${"<%= JSON.pretty_generate(@user[:extra][:raw_info])%>"}</p>
</div>
```

## Logout
Use the following command to create the controller that will handle user logout:

```bash
rails generate controller logout
```

To clear out all the objects stored within the session, call the `reset_session` method within the `logout_controller/logout` method. [Learn more about reset_session here](http://api.rubyonrails.org/classes/ActionController/Base.html#M000668).

```ruby
# app/controllers/logout_controller.rb

class LogoutController < ApplicationController
  include LogoutHelper
  def logout
    reset_session
    redirect_to logout_url.to_s
  end
end
```

In `logout_helper.rb` file add the methods to generate the logout URL.

```ruby
# app/helpers/logout_helper.rb

module LogoutHelper
  AUTH0_CONFIG = Rails.application.config_for(:auth0)

  def logout_url
    request_params = {
      returnTo: root_url,
      client_id: AUTH0_CONFIG['auth0_client_id']
    }

    URI::HTTPS.build(host: AUTH0_CONFIG['auth0_domain'], path: '/v2/logout', query: to_query(request_params))
  end

  private
  def to_query(hash)
    hash.map { |k, v| "#{k}=#{CGI.escape(v)}" unless v.nil? }.reject(&:nil?).join('&')
  end
end
```

::: note
The final destination URL (the `returnTo` value) needs to be in the list of `Allowed Logout URLs`. See the [logout documentation](/logout/guides/redirect-users-after-logout) for more.
:::
