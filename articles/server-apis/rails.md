---
name: Ruby On Rails API
thirdParty: false
image: //auth0.com/lib/platforms-collection/img/rails.png
lodash: true
tags:
  - quickstart
---

## Ruby on Rails API Tutoial

<div class="package" style="text-align: center;">
  <blockquote>
    <a href="/auth0-ruby-samples/master/create-package?path=ruby-on-rails-api&type=server@@account.clientParam@@" class="btn btn-lg btn-success btn-package" style="text-transform: uppercase; color: white">
      <span style="display: block">Download a Seed project</span>
      <% if (account.userName) { %>
      <span class="smaller" style="display:block; font-size: 11px">with your Auth0 API Keys already set and configured</span>
      <% } %>
    </a>
  </blockquote>
</div>


**Otherwise, Please follow the steps below to configure your existing Ruby on Rails app to use it with Auth0.**

### 1. Setup the knock gem

Add this line to your application's Gemfile:

#### Install

```ruby
gem 'knock', '~> 1.2'
```

And then execute:

    $ bundle install

Finally, run the install generator:

    $ rails generate knock:install

It will create the following initializer `config/initializers/knock.rb`.
This file contains all the informations about the existing configuration options.

#### Usage

Then include the `Knock::Authenticable` module in your `ApplicationController`

```ruby
class ApplicationController < ActionController::API
  include Knock::Authenticable
end
```

You can now protect your resources by adding the `authenticate` before_action
to your controllers like this:

```ruby
class SecuredResourceController < ApplicationController
  before_action :authenticate

  def index
    # etc...
  end

  # etc...
end
```

If no valid token is passed with the request, Knock will respond with:

```
head :unauthorized
```

### 2. Add your Auth0 account information to secrets.yml

You need to set the ClientID and ClientSecret in `config/secrets.yml` file so they can be used to validate and sign [JWT](/jwt)s for you.

```yaml
development:
  secret_key_base: 3342e9faedd8fe9ea360c0af568d00a46917923791c23e144d66849b272d2ff63e743f9bb209dab7d6e732bb5f919e46e3fe552b8919140805bb89c346e68876,
  auth0_client_id: <%= account.clientId %>
  auth0_client_secret: <%= account.clientSecret %>

production:
  secret_key_base: ENV["SECRET_KEY_BASE"]
  auth0_client_id: <%= account.clientId %>
  auth0_client_secret: <%= account.clientSecret %>
```

**Warning:**
If you share your code, you should use environment variable to protect your ClientID and ClientSecret.

### 3. Tell knock to use your Auth0 account information

In `config/initializer/knock.rb`, uncomment the following lines:

```ruby
config.token_audience = -> { Rails.application.secrets.auth0_client_id }
```

```ruby
config.token_secret_signature_key = -> { JWT.base64url_decode Rails.application.secrets.auth0_client_secret }
```  

### 4. You're done!

Now you have both your FrontEnd and Backend configured to use Auth0. Congrats, you're awesome!
