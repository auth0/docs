---
title: Authorization
description: This tutorial demonstrates how to add authorization to a Ruby on Rails API.
topics:
    - quickstart
    - backend
    - rails
github:
  path: 01-Authentication-RS256
contentType: tutorial
useCase: quickstart
---

<%= include('../../../_includes/_api_auth_intro') %>

<%= include('../_includes/_api_create_new', { sampleLink: 'https://github.com/auth0-samples/auth0-rubyonrails-api-samples/tree/OIDC/02-Authentication-HS256' }) %>

<%= include('../_includes/_api_auth_preamble') %>

## Validate Access Tokens

### Install dependencies

This tutorial performs access token validation using the  **[jwt](https://github.com/jwt/ruby-jwt)** Gem within a custom `Auth0Client` class. A Concern called `Secured` is used to authorize endpoints which require authentication through an incoming access token.

Install the **jwt** Gem.

```bash
gem 'jwt'
bundle install
```

### Create an Auth0Client class

Create a class called `Auth0Client` which decodes and verifies the incoming access token taken from the `Authorization` header of the request. The public key for your Auth0 tenant can be fetched to verify the token.

```rb
# app/lib/auth0_client.rb

# frozen_string_literal: true

require 'jwt'
require 'net/http'

class Auth0Client 

  # Auth0 Client Objects 
  Error = Struct.new(:message, :status)
  Response = Struct.new(:decoded_token, :error)

  # Helper Functions 
  def self.domain_url
    "https://#{Rails.configuration.auth0.domain}/"
  end

  def self.decode_token(token, jwks_hash)
    JWT.decode(token, nil, true, {
                 algorithm: 'RS256',
                 iss: domain_url,
                 verify_iss: true,
                 aud: Rails.configuration.auth0.audience,
                 verify_aud: true,
                 jwks: { keys: jwks_hash[:keys] }
               })
  end

  def self.get_jwks
    jwks_uri = URI("#{domain_url}.well-known/jwks.json")
    Net::HTTP.get_response jwks_uri
  end

  # Token Validation 
  def self.validate_token(token)
    jwks_response = get_jwks

    unless jwks_response.is_a? Net::HTTPSuccess
      error = Error.new(message: 'Unable to verify credentials', status: :internal_server_error)
      return Response.new(nil, error)
    end

    jwks_hash = JSON.parse(jwks_response.body).deep_symbolize_keys

    decoded_token = decode_token(token, jwks_hash)

    Response.new(decoded_token, nil)
  rescue JWT::VerificationError, JWT::DecodeError => e
    error = Error.new('Bad credentials', :unauthorized)
    Response.new(nil, error)
  end
end
```

### Define a Secured concern

Create a Concern called `Secured` which looks for the access token in the `Authorization` header of an incoming request. If the token is present, it should be passed to `Auth0Client.validate_token`.

```rb
# app/controllers/concerns/secured.rb

# frozen_string_literal: true

module Secured
  extend ActiveSupport::Concern

  REQUIRES_AUTHENTICATION = { message: 'Requires authentication' }.freeze
  BAD_CREDENTIALS = {
    message: 'Bad credentials'
  }.freeze
  MALFORMED_AUTHORIZATION_HEADER = {
    error: 'invalid_request',
    error_description: 'Authorization header value must follow this format: Bearer access-token',
    message: 'Bad credentials'
  }.freeze

  def authorize
    token = token_from_request

    return if performed?
    
    validation_response = Auth0Client.validate_token(token)
    
    return unless (error = validation_response.error)
    
    render json: { message: error.message }, status: error.status
  end

  private

  def token_from_request
    authorization_header_elements = request.headers['Authorization']&.split

    render json: REQUIRES_AUTHENTICATION, status: :unauthorized and return unless authorization_header_elements

    unless authorization_header_elements.length == 2
      render json: MALFORMED_AUTHORIZATION_HEADER, status: :unauthorized and return
    end

    scheme, token = authorization_header_elements

    render json: BAD_CREDENTIALS, status: :unauthorized and return unless scheme.downcase == 'bearer'

    token
  end
end
```

### Validate scopes

The `Auth0Client.validate_token` method above verifies that the access token included in the request is valid; however, it doesn't yet include any mechanism for checking that the token has the sufficient **scope** to access the requested resources.

To look for a particular `scope` in an access token, create a new struct in your `Auth0Client` class called `Token` and define a new method inside, `validate_permissions`, that given an array of required scopes it will check if they are present in the payload of the token.

Go to the `Auth0Client` class. Add the new `Token` struct and update the return value of the `validate_token` method as follows: 

```ruby
# app/lib/auth0_client.rb

# frozen_string_literal: true

require 'jwt'
require 'net/http'

class Auth0Client 

  # Auth0 Client Objects 
  Error = Struct.new(:message, :status)
  Response = Struct.new(:decoded_token, :error)

  Token = Struct.new(:token) do
    def validate_permissions(permissions)
      required_permissions = Set.new permissions
      scopes = token[0]['scope']
      token_permissions = scopes.present? ? Set.new(scopes.split(" ")) : Set.new
      required_permissions <= token_permissions
    end
  end

  # ... 

  # Token Validation 
  def self.validate_token(token)
    jwks_response = get_jwks

    unless jwks_response.is_a? Net::HTTPSuccess
      error = Error.new(message: 'Unable to verify credentials', status: :internal_server_error)
      return Response.new(nil, error)
    end

    jwks_hash = JSON.parse(jwks_response.body).deep_symbolize_keys

    decoded_token = decode_token(token, jwks_hash)

    Response.new(Token.new(decoded_token), nil)
  rescue JWT::VerificationError, JWT::DecodeError => e
    error = Error.new('Bad credentials', :unauthorized)
    Response.new(nil, error)
  end
end
```

Next, in the `Secured` concern, define a new error constant `INSUFFICIENT_PERMISSIONS` to return a proper error message in case there was a attempt to request a resource without the right permissions. Next, update the return value of the `Auth0Client.validate_token` call and finally create a new method `validate_permissions` where to check if the token has the right permissions, or return a `403 FORBIDDEN` status code with the `INSUFFICIENT_PERMISSIONS` error message otherwise. 

Apply these changes in your `Secured` concern by adding the following code: 

```rb
# app/controllers/concerns/secured.rb

# frozen_string_literal: true

module Secured
  extend ActiveSupport::Concern

  # ... 

  INSUFFICIENT_PERMISSIONS = {
    error: 'insufficient_permissions',
    error_description: 'The access token does not contain the required permissions',
    message: 'Permission denied'
  }.freeze

  def authorize
    token = token_from_request

    return if performed?

    validation_response = Auth0Client.validate_token(token)

    @decoded_token = validation_response.decoded_token # Add this line

    return unless (error = validation_response.error)

    render json: { message: error.message }, status: error.status
  end

  def validate_permissions(permissions)
    raise 'validate_permissions needs to be called with a block' unless block_given?
    return yield if @decoded_token.validate_permissions(permissions)

    render json: INSUFFICIENT_PERMISSIONS, status: :forbidden
  end

  private
  # ... 
end
```

## Protect API Endpoints

<%= include('../_includes/_api_endpoints') %>

Add the `Secured` concern to the `ApplicationController`: 

```ruby
class ApplicationController < ActionController::API
  include Secured
end
```

You only ned to protect the `PrivateController` as follows:

```ruby
class PrivateController < ApplicationController
  before_action :authorize

  # ...
end
```

In order to check that your access token has the right permissions, call the `validate_permissions` method as follows in the `private-scoped` action:

```ruby
class PrivateController < ApplicationController
  before_action :authorize

  def private
    render json: { message: 'Hello from a private endpoint! You need to be authenticated to see this.' }
  end

  def private_scoped
    validate_permissions ['read:messages'] do
      render json: { message: 'Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this.' }
    end
  end
end
```