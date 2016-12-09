---
title: Authenticate
description: This tutorial will show you how to use the Auth0 Ruby on Rails SDK to add authentication and authorization to your API.
---

<%= include('../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-rubyonrails-api-sample',
  path: '',
  requirements: [
    'Ruby 2.1.8',
    'Rails 4.2.5.1'
  ]
}) %>

### 1. Set up the knock gem

Add this line to your application's Gemfile:

#### Install

${snippet(meta.snippets.dependencies)}

And then execute:
```
bundle install
```

Finally, run the install generator:
```
rails generate knock:install
```

It will create the following initializer `config/initializers/knock.rb`.
This file contains all the information about the existing configuration options.

#### Usage

Then include the `Knock::Authenticable` module in your `ApplicationController`

${snippet(meta.snippets.setup)}

You can now protect your resources by adding the `authenticate_user` before_action
to your controllers like this:

${snippet(meta.snippets.use)}

If no valid token is passed with the request, Knock will respond with:

```
head :unauthorized
```

If a token is given, Knock makes two assumptions by default:

1. Your app defines a `User` model with an `id` field.
2. The 'sub' claim in the token payload contains the user id.

To retrieve the current user you should implement within your entity model a class method from_token_payload that takes the payload in argument:

```ruby
class User < ActiveRecord::Base
  def self.from_token_payload payload
    # Returns a valid user, `nil` or raise
    # e.g.
    #   self.find payload["sub"]
  end
end
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

### 4. Call Your API
You can now make requests against your secure API by providing the Authorization header in your requests with a valid JWT id_token.
```har
{
"method": "GET",
"url": "http://localhost:8000/path_to_your_api",
"headers": [
{ "name": "Authorization", "value": "Bearer YOUR_ID_TOKEN_HERE" }
]
}
```

### 5. You're done!

Now you have both, your FrontEnd and Backend configured to use Auth0. Congrats, you're awesome!

### Optional Steps
#### Configure CORS

In order to configure CORS, install [rack-cors](https://github.com/cyu/rack-cors) gem and follow [these instructions](https://github.com/cyu/rack-cors#rails).
