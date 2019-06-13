---
title: Authentication
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

This tutorial performs Access Token validation using the  **jwt** Gem within a custom `JsonWebToken` class. A Concern called `Secured` is used to mark endpoints which require authentication through an incoming Access Token. 

Install the **jwt** Gem.

```bash
gem `jwt`
bundle install
```

### Create a JsonWebToken class

Create a class called `JsonWebToken` which decodes and verifies the incoming Access Token taken from the `Authorization` header of the request. The public key for your Auth0 tenant can be fetched to verify the token.

```rb
# lib/json_web_token.rb

# frozen_string_literal: true
require 'net/http'
require 'uri'

class JsonWebToken
  def self.verify(token)
    JWT.decode(token, nil,
               true, # Verify the signature of this token
               algorithm: 'RS256',
               iss: 'https://${account.namespace}/',
               verify_iss: true,
               aud: Rails.application.secrets.auth0_api_audience,
               verify_aud: true) do |header|
      jwks_hash[header['kid']]
    end
  end

  def self.jwks_hash
    jwks_raw = Net::HTTP.get URI("https://${account.namespace}/.well-known/jwks.json")
    jwks_keys = Array(JSON.parse(jwks_raw)['keys'])
    Hash[
      jwks_keys
      .map do |k|
        [
          k['kid'],
          OpenSSL::X509::Certificate.new(
            Base64.decode64(k['x5c'].first)
          ).public_key
        ]
      end
    ]
  end
end
```

### Define a Secured concern

Create a Concern called `Secured` which looks for the Access Token in the `Authorization` header of an incoming request. If the token is present, it should be passed to `JsonWebToken.verify`.

```rb
# app/controllers/concerns/secured.rb

# frozen_string_literal: true
module Secured
  extend ActiveSupport::Concern

  included do
    before_action :authenticate_request!
  end

  private

  def authenticate_request!
    auth_token
  rescue JWT::VerificationError, JWT::DecodeError
    render json: { errors: ['Not Authenticated'] }, status: :unauthorized
  end

  def http_token
    if request.headers['Authorization'].present?
      request.headers['Authorization'].split(' ').last
    end
  end

  def auth_token
    JsonWebToken.verify(http_token)
  end
end
```

### Validate scopes

The `JsonWebToken.verify` method above verifies that the Access Token included in the request is valid; however, it doesn't yet include any mechanism for checking that the token has the sufficient **scope** to access the requested resources.

To look for a particular `scope` in an Access Token, provide an array of required scopes and check if they are present in the payload of the token.

In this example we define an `SCOPES` array for all protected routes, specifying the required scopes for each one. For the `/private-scoped` route, the scopes defined will be intersected with the scopes coming in the payload, to determine if it contains one or more items from the other array.

```rb
# app/controllers/concerns/secured.rb

  SCOPES = {
    '/private' => nil,
    '/private-scoped'    => ['read:messages']
  }

  private

  def authenticate_request!
    @auth_payload, @auth_header = auth_token

    render json: { errors: ['Insufficient scope'] }, status: :unauthorized unless scope_included
  rescue JWT::VerificationError, JWT::DecodeError
    render json: { errors: ['Not Authenticated'] }, status: :unauthorized
  end

  def scope_included
    if SCOPES[request.env['PATH_INFO']] == nil
      true
    else
      # The intersection of the scopes included in the given JWT and the ones in the SCOPES hash needed to access
      # the PATH_INFO, should contain at least one element
      (String(@auth_payload['scope']).split(' ') & (SCOPES[request.env['PATH_INFO']])).any?
    end
  end
```

## Protect API Endpoints

<%= include('../_includes/_api_endpoints') %>

The `/public` endpoint does not require to use the `Secured` concern.

```rb
# app/controllers/public_controller.rb

# frozen_string_literal: true
class PublicController < ActionController::API
  # This route doesn't need authentication
  def public
    render json: { message: "Hello from a public endpoint! You don't need to be authenticated to see this." }
  end
end
```

The protected endpoints need to include the `Secured` concern. The scopes required for each one are defined in the code of the `Secured` concern.

```rb
# app/controllers/private_controller.rb

# frozen_string_literal: true
class PrivateController < ActionController::API
  include Secured

  def private
    render json: 'Hello from a private endpoint! You need to be authenticated to see this.'
  end

  def private_scoped
    render json: { message: 'Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this.' }
  end
end

```
