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

### 1. Add jwt dependency to your Gemfile

You need to add the jwt dependency.

Open your Gemfile and add the following:

```bash
gem 'jwt'
```

### 2. Add your Auth0 account information to secrets.yml

You need to set the ClientID and ClientSecret in `config/secrets.yml` file so that you can then get them and use them to validate and sign [JWT](/jwt)s for you.

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

### 3. Create SecuredController to validate the JWT

Now, let's add a new controller that inherits from ApplicationController which will take care of validating the JWT and checking that the user has been authenticated.

```ruby
class SecuredController < ApplicationController
  before_action :validate_token

  class InvalidTokenError < StandardError; end  

  private

  def validate_token
    begin
      authorization = request.headers['Authorization']
      raise InvalidTokenError if authorization.nil?

      token = request.headers['Authorization'].split(' ').last
      decoded_token = JWT.decode(token,
        JWT.base64url_decode(Rails.application.secrets.auth0_client_secret))

      raise InvalidTokenError if Rails.application.secrets.auth0_client_id != decoded_token["aud"]

      @user = decoded_token
    rescue JWT::DecodeError, InvalidTokenError
      render :json => { :error => "Unauthorized: Invalid token." }, status: :unauthorized
    end
  end

end
```

### 4. Securing your API

Now, every new controller that you create that inherits from `SecuredController` will verify that the user is authenticated.

```ruby
class SecuredPingController < SecuredController

  def ping
    render :json => {
      :message => "All good. You only get this message if authenticated.",
      :user => @user
    }
  end

end
```

### 5. You're done!

Now you have both your FrontEnd and Backend configured to use Auth0. Congrats, you're awesome!
