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

<%= include('../_includes/_getting_started', { library: 'Rails', callback: 'http://localhost:3000/auth/oauth2/callback' }) %>

## Configure Rails to Use Auth0 

### Install the Dependencies

To follow along with this guide, add the following dependencies to your `Gemfile` and run `bundle install`.

${snippet(meta.snippets.dependencies)}

::: note
If you are using Windows, uncomment the `tzinfo-data` gem in the Gemfile.
:::

### Initialize Omniauth Auth0

Create a file named `auth0.rb` under `config/initializers` and configure the **OmniAuth** middleware in it.

${snippet(meta.snippets.setup)}

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
  get 'auth/oauth2/callback' => 'auth0#callback'
  get 'auth/failure' => 'auth0#failure'
end
```

## Trigger Authentication

We need a way for users to trigger authentication. Add a link to `/auth/auth0` anywhere in an existing template or use the steps below to generate a homepage in a new app. 

Run the following command to generate the homepage controller and views:

```bash
rails generate controller home show --skip-assets
```

Add the following to the generated `show.html.erb` file:

```html
<!-- app/views/home/show.html.erb -->

<img src="https://cdn.auth0.com/styleguide/1.0.0/img/badge.svg">
<h1>RoR Auth0 Sample</h1>
<p>Step 1 - Login.</p>
<a href="/auth/auth0">Login</a>
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

Include the `concern` in the this new controller to prevent unauthenticated users from accessing its routes:

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

### Troubleshooting

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
curl -o lib/ca-bundle.crt http://curl.haxx.se/ca/ca-bundle.crt
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
