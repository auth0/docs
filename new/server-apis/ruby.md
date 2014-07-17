---
lodash: true
---

## Ruby

> Note: If you're creating a Ruby On Rails app, please check [this other tutorial](http://docs.auth0.com/new/server-apis/rails). 

Otherwise, Please follow the steps below to configure your existing Ruby app to use it with Auth0.

### 1. Add jwt dependency to your Gemfile

You need to add the jwt dependency.

Open your Gemfile and add the following:

```bash
gem 'jwt'
```

### 2. Validate JWT token

You need to validate the [JWT](https://docs.auth0.com/jwt)s to make sure the user is authenticated. For that, in a filter or in a middleware processor that runs before your actions, you should write the following code:

```ruby
class InvalidTokenError < StandardError; end

def validate_token
  begin
    auth0_client_id = '<%= account.clientId %>'
    auth0_client_secret = '<%= account.clientSecret %>'
    authorization = request.headers['Authorization']
    raise InvalidTokenError if authorization.nil?

    token = request.headers['Authorization'].split(' ').last
    decoded_token = JWT.decode(token,
      JWT.base64url_decode(auth0_client_secret))

    raise InvalidTokenError if auth0_client_id != decoded_token[0]["aud"]
  rescue JWT::DecodeError
    raise InvalidTokenError
  end
end
```

### 3. You've nailed it.

Now you have both your FrontEnd and Backend configured to use Auth0. Congrats, you're awesome!
