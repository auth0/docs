---
title: Login
description: This tutorial will show you how to use the Auth0 Ruby On Rails SDK to add authentication and authorization to your web app.
---

<%= include('../../_includes/_package', {
  pkgRepo: 'omniauth-auth0',
  pkgBranch: 'master',
  pkgPath: 'examples/ruby-on-rails-webapp',
  pkgFilePath: null,
  pkgType: 'server'
}) %>


::: panel-info System Requirements
This tutorial and seed project have been tested with the following:
* Ruby 2.1.8
* Rails 4.2.5.1
:::

<%= include('../../_includes/_signup') %>

**Otherwise, Please follow the steps below to configure your existing Ruby On Rails WebApp to use it with Auth0.**

### 1. Add dependencies

Add the following dependencies to your `Gemfile` and run `bundle install`

${snippet(meta.snippets.dependencies)}

### 2. Initialize Omniauth Auth0

Create a file named `auth0.rb` under `config/initializers` with the following content:

${snippet(meta.snippets.setup)}

### 3. Add the Auth0 callback handler

Use the following command to create the controller that will handle Auth0 callback:

```bash
rails generate controller auth0 callback failure --skip-template-engine --skip-assets
```

Now, go to the newly created controller and add the code to handle the success and failure of the callback.

```ruby
class Auth0Controller < ApplicationController
  def callback
    # This stores all the user information that came from Auth0
    # and the IdP
    session[:userinfo] = request.env['omniauth.auth']

    # Redirect to the URL you want after successfull auth
    redirect_to '/dashboard'
  end

  def failure
    # show a failure page or redirect to an error page
    @error_msg = request.params['message']
  end
end
```

Now, replace the generated routes on `routes.rb` with the following ones:

```ruby
get "/auth/auth0/callback" => "auth0#callback"
get "/auth/failure" => "auth0#failure"
```

### 4. Specify the callback on Auth0 Dashboard

${include('../_callbackRegularWebApp')}

In this case, the callbackURL should look something like:

```
http://yourUrl/auth/auth0/callback
```
### 5. Triggering login manually or integrating the Auth0Lock

${lockSDK}

> **Note:** Please note that the `redirectUrl` specified in the `Auth0Lock` constructor **must match** the callback specified in the previous step

Also if you need to force an identity provider just redirect to Omniauth's path like this:

```ruby
redirect_to '/auth/auth0?connection=CONNECTION_NAME'
```

### 6. Accessing user information

You can access the user information via the `userinfo` you stored in the session on step 3

```ruby
class DashboardController < SecuredController
  def show
    @user = session[:userinfo]
  end
end
```

```html
<div>
  <img class="avatar" src="<%= "\<%= @user[:info][:image] %\>" %>"/>
  <h2>Welcome <%= "\<%= @user[:info][:name] %\>" %></h2>
</div>
```

[Click here](https://github.com/intridea/omniauth/wiki/Auth-Hash-Schema) to check all the information that the userinfo hash has.

### 7. You're done!

You have configured your Ruby on Rails Webapp to use Auth0. Congrats, you're awesome!

### Optional steps

#### Checking if the user is authenticated

You can add the following parent controller to all pages that need the user to be authenticated:

```ruby
class SecuredController < ApplicationController

  before_action :logged_in_using_omniauth?

  private

  def logged_in_using_omniauth?
    unless session[:userinfo].present?
      # Redirect to page that has the login here
      redirect_to '/'
    end
  end

end
```

### Optional steps
#### Getting the error description on Failure

In case of failure, you may want to get the description of the error. For that, in your `config/environments/production.rb` add the following:

```ruby
OmniAuth.config.on_failure = Proc.new { |env|
  message_key = env['omniauth.error.type']
  error_description = Rack::Utils.escape(env['omniauth.error'].error_reason)
  new_path = "#{env['SCRIPT_NAME']}#{OmniAuth.config.path_prefix}/failure?message=#{message_key}&error_description=#{error_description}"
  Rack::Response.new(['302 Moved'], 302, 'Location' => new_path).finish
}
```

### Troubleshooting

#### Troubleshooting ActionDispatch::Cookies::CookieOverflow issue

If you are getting this error it means that you are using Cookie sessions and since you are storing the whole profile it overflows the max-size of 4K. Also, if you are unable to access the user profile and you get an error similar to `NoMethodError`, `undefined method '[]' for nil:NilClass`, please try this solution as well.

You can change to use In-Memory store for development as follows.

1. Go to `/config/initializers/session_store.rb` and add the following:

```ruby
Rails.application.config.session_store :cache_store
```
2. Go to `/config/enviroments/development.rb` and add the following

```ruby
config.cachestore = :memorystore
```

For production, we recommend using another memory store like MemCached or something similar

#### Troubleshooting SSL issues

It seems that under some configurations Ruby can't find certification authority certificates (CA Certs).

Download CURL's CA certs bundle to the project directory:

```bash
$ curl -o lib/ca-bundle.crt http://curl.haxx.se/ca/ca-bundle.crt
```

Then add this initializer `config/initializers/fix_ssl.rb`:

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
#### Troubleshooting "failure message=invalid_credentials"

This issue isn't presented while working on your local (development). After deployment on your staging or production environment and after hitting your callback this issue may appear.

Example of an error message that may occur:

```
omniauth: (auth0) Authentication failure! invalid_credentials: OAuth2::Error, server_error: The redirect URI is wrong. You send [wrong url], and we expected [callback url set in your app settings]
```

To fix the above error, add the following at your config/environments/staging.rb or production.rb

```ruby
OmniAuth.config.full_host = "http://www.example.com"
```

Substitute `http://www.example.com` with the actual URL you'll be using in your application.
