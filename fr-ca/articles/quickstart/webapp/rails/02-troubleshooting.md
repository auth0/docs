---
title: Troubleshooting
description: Troubleshooting tips for using Rails with Auth0.
budicon: 448
topics:
  - quickstarts
  - webapp
  - login
  - rails
contentType: tutorial
useCase: quickstart
---

# Troubleshooting

The following are troubleshooting topics that you might run into when using the Rails quickstart.

## Using a reverse proxy

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

## ActionController::InvalidAuthenticityToken

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

## ActionDispatch::Cookies::CookieOverflow

This error means that a cookie session is being used and because the whole profile is being stored, it overflows the max-size of 4 kb. If you are unable to access the user profile, or you get an error similar to `NoMethodError`, `undefined method '[]' for nil:NilClass`, try using In-Memory store for development.

Go to `/config/initializers/session_store.rb` (or create it if it does not exist) and add the following:

```ruby
Rails.application.config.session_store :cache_store
```

Go to `/config/environments/development.rb` and add the following:

```ruby
config.cache_store = :memory_store
```

Restart your Rails server for these changes to take effect.

:::note
It is recommended that a memory store, such as MemCached, is being used for production applications.
:::

## SSL Issues

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

## "failure message=invalid_credentials"

This issue doesn't occur when working locally but may happen in a staging or production environment. The error message may be displayed as:

```
omniauth: (auth0) Authentication failure! invalid_credentials: OAuth2::Error, server_error: The redirect URI is wrong. You send [wrong url], and we expected [callback url set in your app settings]
```

To solve this, add the following to `config/environments/staging.rb` or `production.rb`:

```ruby
OmniAuth.config.full_host = "http://www.example.com"
```

Substitute `http://www.example.com` with the actual URL you'll be using in your application.
