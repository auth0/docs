---
title: Authenticate
description: This tutorial demonstrates how to add authentication to Ruby on Rails API
---

<%= include('../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-rubyonrails-api-samples',
  path: '01-Authenticate-RS256',
  requirements: [
    'Ruby 2.1.8',
    'Rails 4.2.5.1'
  ]
}) %>

<%= include('_includes/_api_auth_preamble') %>

This sample demonstrates how to check for a JWT in the `Authorization` header of an incoming HTTP request and verify that it is valid. The validity check is done using the **jwt** Gem within a custom `JsonWebToken` class. A Concern called `Secured` is used to mark endpoints which require authentication through an incoming `access_token`. If the token is valid, the resources which are served by the endpoint can be released, otherwise a `401 Authorization` error will be returned.

## Install the Dependencies

Install the **jwt** Gem.

```bash
gem `jwt`
bundle install
```

## Create a JsonWebToken Class

<%= include('_includes/_api_jwks_description', { sampleLink: 'https://github.com/auth0-samples/auth0-rubyonrails-api-samples/tree/OIDC/02-Authentication-HS256' }) %>

Create a class called `JsonWebToken` which decodes and verifies the incoming `access_token` taken from the `Authorization` header of the request. The public key for your Auth0 tenant can be fetched to verify the token.

```rb
# lib/tasks/json_web_token.rb

# frozen_string_literal: true
class JsonWebToken
  def self.decode(token)
    JWT.decode(token, nil,
               true, # Verify the signature of this token
               algorithm: 'RS256',
               iss: Rails.application.secrets.auth0_domain,
               verify_iss: true,
               aud: Rails.application.secrets.auth0_api_audience,
               verify_aud: true) do |header|
      jwks_hash[header['kid']]
    end
  end

  def self.jwks_hash
    jwks_raw = Net::HTTP.get URI("#{Rails.application.secrets.auth0_domain}.well-known/jwks.json")
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

## Define a Secured Concern

Create a Concern called `Secured` which looks for the `access_token` in the `Authorization` header of an incoming request. If the token is present, it should be passed to `JsonWebToken.decode`.

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
    JsonWebToken.decode(http_token)
  end
end
```

## Apply Authentication to Routes

With the `Secured` Concern in place, you can now apply it to whichever endpoints you wish to protect. Applying the Concern means that a valid `access_token` **must** be present in the request before the resource can be released.

```rb
# app/controllers/secured_ping_controller.rb

# frozen_string_literal: true
class SecuredPingController < ActionController::API
  include Secured

  def ping
    render json: "All good. You only get this message if you're authenticated."
  end
end
```