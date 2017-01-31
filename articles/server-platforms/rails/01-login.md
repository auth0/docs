---
title: Login
description: Learn how to login using the Auth0 Lock widget and OmniAuth.
budicon: 448
---

<%= include('../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-rubyonrails-sample',
  path: '01-Login',
  requirements: [
    'Ruby 2.3.1',
    'Rails 5.0.0'
  ]
}) %>

The easiest way to add authentication to your Rails application is to use Auth0's [Lock widget](/lock) and OmniAuth authentication [strategy](https://github.com/auth0/omniauth-auth0).

## Initialize Omniauth Auth0

Create a file named `auth0.rb` under `config/initializers` with the following content:

${snippet(meta.snippets.setup)}

> **NOTE:** This tutorial uses omniauth-auth0, a custom [OmniAuth strategy](https://github.com/intridea/omniauth#omniauth-standardized-multi-provider-authentication).

## Add the Auth0 Callback Handler

Use the following command to create the controller that will handle the Auth0 callback:

```bash
rails generate controller auth0 callback failure --skip-template-engine --skip-assets
```

In the newly created controller, add a callback success and failure handler.

```ruby
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

Replace the generated routes on `routes.rb` with the following:

```ruby
get "/auth/oauth2/callback" => "auth0#callback"
get "/auth/failure" => "auth0#failure"
```

## Trigger Login with Lock

<%= include('../../_includes/_lock-sdk') %>

> **NOTE:** The `callbackURL` specified in the `Auth0Lock` constructor **must match** the one specified in the **Allowed Callback URLs** area in your Auth0 dashboard. Follow the [introduction](/quickstart/webapp/rails/00-introduction) step for further detail.

If you wish to force an identity provider, you may redirect the user and specify the connection name in the query string.

```ruby
redirect_to '/auth/oauth2?connection=CONNECTION_NAME'
```

> [Click here](https://github.com/intridea/omniauth/wiki/Auth-Hash-Schema) to check all the information that the userinfo hash has.

## Check the User's Authentication Status 

You can use a controller concern to control access to routes that require the user to be authenticated.

```ruby
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

Include the concern in the corresponding controller to prevent unauthenticated users from accessing its routes:

```ruby
class DashboardController < ApplicationController
 include Secured

  def show
  end
end
```

## Display Error Descriptions

Configuration the application to display erros by adding the following to `config/environments/production.rb`:

```ruby
OmniAuth.config.on_failure = Proc.new { |env|
  message_key = env['omniauth.error.type']
  error_description = Rack::Utils.escape(env['omniauth.error'].error_reason)
  new_path = "#{env['SCRIPT_NAME']}#{OmniAuth.config.path_prefix}/failure?message=#{message_key}&error_description=#{error_description}"
  Rack::Response.new(['302 Moved'], 302, 'Location' => new_path).finish
}
```

## Troubleshooting

### ActionDispatch::Cookies::CookieOverflow

This error means that a cookie session is being used and because the whole profile is being stored, it overflows the max-size of 4 kb. If you are unable to access the user profile and you get an error similar to `NoMethodError`, `undefined method '[]' for nil:NilClass`, try using In-Memory store for development.

Go to `/config/initializers/session_store.rb` and add the following:

```ruby
Rails.application.config.session_store :cache_store
```

Go to `/config/enviroments/development.rb` and add the following:

```ruby
config.cachestore = :memorystore
```

It is recommended that a memory store such as MemCached being used for production applications.

### SSL Issues

Under some configurations, Ruby may not be able to find certification authority certificates (CA certs).

Download the CA certs bundle to the project directory:

```bash
$ curl -o lib/ca-bundle.crt http://curl.haxx.se/ca/ca-bundle.crt
```

Add this initializer to `config/initializers/fix_ssl.rb`:

```ruby
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