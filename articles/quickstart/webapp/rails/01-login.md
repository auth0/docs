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
github:
  path: 01-Login
---

<%= include('../_includes/_getting_started', { library: 'Rails', callback: 'http://localhost:3000/auth/auth0/callback' }) %>

<%= include('../../../_includes/_logout_url', { returnTo: 'http://localhost:3000' }) %>

## Configure Rails to Use Auth0

### Install the Dependencies

To follow along with this guide, add the following dependencies to your `Gemfile`:

```ruby
gem 'omniauth-auth0', '~> 2.2'
```

To prevent forged authentication requests, we need to also include CSRF protection. If you're using OmniAuth with Rails, include:

```ruby
gem 'omniauth-rails_csrf_protection', '~> 0.1'
```

Once your gems are added, install with the following command:

```bash
bundle install
```

::: note
If you are using Windows, uncomment the `tzinfo-data` gem in the Gemfile.
:::

### Initialize OmniAuth Auth0

Create a file named `auth0.rb` under `config/initializers` and configure the **OmniAuth** middleware in it.

```ruby
Rails.application.config.middleware.use OmniAuth::Builder do
  provider(
    :auth0,
    '${account.clientId}',
    'YOUR_CLIENT_SECRET',
    '${account.namespace}',
    callback_path: '/auth/auth0/callback',
    authorize_params: {
      scope: 'openid email profile'
    }
  )
end
```

::: note
This tutorial uses omniauth-auth0, a custom [OmniAuth strategy](https://github.com/intridea/omniauth#omniauth-standardized-multi-provider-authentication).
:::

### Add the Auth0 Callback Handler

Use the following command to create the controller that will handle the Auth0 callback:

```bash
rails generate controller auth0 --skip-template-engine --skip-assets --no-helper
```

In the newly created controller, add success and failure callback handlers.

```ruby
# app/controllers/auth0_controller.rb

class Auth0Controller < ApplicationController
  def callback
    # This stores all the user information that came from Auth0
    # and the IdP
    session[:userinfo] = request.env['omniauth.auth']

    # Redirect to the URL you want after successful auth
    redirect_to '/dashboard'
  end

  def failure
    # show a failure page or redirect to an error page
    @error_msg = request.params['message']
  end
end
```

Replace the generated routes with the following:

```ruby
# config/routes.rb

Rails.application.routes.draw do
  get 'auth/auth0/callback' => 'auth0#callback'
  get 'auth/failure' => 'auth0#failure'
end
```

## Trigger Authentication

We need a way for users to trigger authentication. Add a link to `/auth/auth0` anywhere in an existing template or use the steps below to generate a homepage in a new app.

::: warning
To prevent forged authentication requests, make sure that you add a link with a method of `:post` (as described below using the `link_to` function in Rails) or create a form with a CSRF token included.
:::

Run the following command to generate the homepage controller and views:

```bash
rails generate controller home show --skip-assets
```

Add the following to the generated `show.html.erb` file:

```
<!-- app/views/home/show.html.erb -->

<img src="https://cdn.auth0.com/styleguide/1.0.0/img/badge.svg">
<h1>RoR Auth0 Sample</h1>
<p>Step 1 - Login.</p>
${ "<%= button_to 'Login', 'auth/auth0', method: :post %>" }
```

Finally, point the `root` path to generated controller:

```ruby
# config/routes.rb

Rails.application.routes.draw do
  root 'home#show'
  # ...
end
```

Run `bin/rails server` and go to [localhost:3000](http://localhost:3000) in your browser. You should see the Auth0 logo and a link to log in.

### Check the User's Authentication Status

You can use a controller `concern` to control access to routes that require the user to be authenticated:

```ruby
# app/controllers/concerns/secured.rb

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

Now generate a controller for the dashboard view that users will see once they are authenticated:

```bash
rails generate controller dashboard show --skip-assets
```

Include the `concern` in this new controller to prevent unauthenticated users from accessing its routes:

```ruby
# app/controllers/dashboard_controller.rb

class DashboardController < ApplicationController
  include Secured

  def show
  end
end
```

Add the session data for `userinfo` to the dashboard view to see what is returned:

```html
<!-- app/views/dashboard/show.html.erb -->

<h1>Dashboard#show</h1>
${ '<%= session[:userinfo].inspect %>' }
```

Finally, adjust your routes to point `/dashboard` to this new, secured controller:

```ruby
# config/routes.rb

Rails.application.routes.draw do
  # ...
  get 'dashboard' => 'dashboard#show'
  # ...
end
```

With the Rails server still running, go to [localhost:3000/dashboard](http://localhost:3000/dashboard) in your browser and you should be redirected to the homepage.

Click the **Login** link and log in or sign up. Accept the consent modal that appears (for `localhost` only) and you should end up on at `/dashboard` with your user info showing.

### Display Error Descriptions

Configure the application to display errors by adding the following to the `production` environment config:

```ruby
# config/environments/production.rb

OmniAuth.config.on_failure = Proc.new { |env|
  message_key = env['omniauth.error.type']
  error_description = Rack::Utils.escape(env['omniauth.error'].error_reason)
  new_path = "#{env['SCRIPT_NAME']}#{OmniAuth.config.path_prefix}/failure?message=#{message_key}&error_description=#{error_description}"
  Rack::Response.new(['302 Moved'], 302, 'Location' => new_path).finish
}
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
  def logout_url
    domain = Rails.application.secrets.auth0_domain
    client_id = Rails.application.secrets.auth0_client_id
    request_params = {
      returnTo: root_url,
      client_id: client_id
    }

    URI::HTTPS.build(host: domain, path: '/v2/logout', query: to_query(request_params))
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

## Troubleshooting

### Using a reverse proxy

The `redirect_uri` parameter that OmniAuth generates when redirecting to login is based on the `Host` header that is passed to Rails. This can cause incorrect callback URLs to be passed when using this strategy (and OmniAuth in general) with a reverse proxy. You can adjust the host used by OmniAuth with the following snippet:

```ruby
OmniAuth.config.full_host = lambda do |env|
    scheme         = env['rack.url_scheme']
    local_host     = env['HTTP_HOST']
    forwarded_host = env['HTTP_X_FORWARDED_HOST']
    forwarded_host.blank? ? "#{scheme}://#{local_host}" : "#{scheme}://#{forwarded_host}"
end
```

[See this StackOverflow thread for more information](https://stackoverflow.com/a/7135029/728480). 

### ActionController::InvalidAuthenticityToken

This is likely caused by a missing CSRF token needed to POST the login request. If you inspect the login button in your browser, you should see something like this:

```html
<a data-method="post" href="auth/auth0">Login</a>
```

... and in the `<head>` element for the page, you should have CSRF meta tags like these:

```html
<meta name="csrf-param" content="authenticity_token">
<meta name="csrf-token" content="UY2XpKwxzwBWalxFVJ8yKsao/33it7If09BnZewpHifVPSpFJd2LrA7xgQn6VQrhZNGjgZoLI3kV+bkQHtr+Rw==">
```

With those elements in place, Rails will convert the login link to POST the CSRF token to the backend to verify it before redirecting to login.

### ActionDispatch::Cookies::CookieOverflow

This error means that a cookie session is being used and because the whole profile is being stored, it overflows the max-size of 4 kb. If you are unable to access the user profile and you get an error similar to `NoMethodError`, `undefined method '[]' for nil:NilClass`, try using In-Memory store for development.

Go to `/config/initializers/session_store.rb` and add the following:

```ruby
Rails.application.config.session_store :cache_store
```

Go to `/config/environments/development.rb` and add the following:

```ruby
config.cachestore = :memorystore
```

It is recommended that a memory store such as MemCached being used for production applications.

### SSL Issues

Under some configurations, Ruby may not be able to find certification authority certificates (CA certs).

Download the CA certs bundle to the project directory:

```bash
curl -L -o lib/ca-bundle.crt http://curl.haxx.se/ca/ca-bundle.crt
```

Add this initializer to `config/initializers/fix_ssl.rb`:

```ruby
# config/initializers/fix_ssl.rb

require 'open-uri'
require 'net/https'

module Net
  class HTTP
    alias_method :original_use_ssl=, :use_ssl=

    def use_ssl=(flag)
      path = ( Rails.env == "development") ? "lib/ca-bundle.crt" : "/usr/lib/ssl/certs/ca-certificates.crt"
      self.ca_file = Rails.root.join(path).to_s
      self.verify_mode = OpenSSL::SSL::VERIFY_PEER
      self.original_use_ssl = flag
    end
  end
end
```

### "failure message=invalid_credentials"

This issue doesn't occur when working locally but may happen in a staging or production environment. The error message may be displayed as:

```
omniauth: (auth0) Authentication failure! invalid_credentials: OAuth2::Error, server_error: The redirect URI is wrong. You send [wrong url], and we expected [callback url set in your app settings]
```

To solve this, add the following to `config/environments/staging.rb` or `production.rb`:

```ruby
OmniAuth.config.full_host = "http://www.example.com"
```

Substitute `http://www.example.com` with the actual URL you'll be using in your application.
