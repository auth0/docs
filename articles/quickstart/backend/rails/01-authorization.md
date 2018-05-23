---
title: Authentication
description: This tutorial demonstrates how to add authorization to Ruby on Rails API.
github:
  path: 01-Authentication-RS256
---

<%= include('../../../_includes/_api_auth_intro') %>

<%= include('../_includes/_api_create_new') %>

<%= include('../_includes/_api_auth_preamble') %>

This sample demonstrates how to check for a JWT in the `Authorization` header of an incoming HTTP request and verify that it is valid. The validity check is done using the **jwt** Gem within a custom `JsonWebToken` class. A Concern called `Secured` is used to mark endpoints which require authentication through an incoming `access_token`. If the token is valid, the resources which are served by the endpoint can be released, otherwise a `401 Authorization` error will be returned.

## Install the Dependencies

Install the **jwt** Gem.

```bash
gem `jwt`
bundle install
```

## Create a JsonWebToken Class

<%= include('../_includes/_api_jwks_description', { sampleLink: 'https://github.com/auth0-samples/auth0-rubyonrails-api-samples/tree/OIDC/02-Authentication-HS256' }) %>

Create a class called `JsonWebToken` which decodes and verifies the incoming `access_token` taken from the `Authorization` header of the request. The public key for your Auth0 tenant can be fetched to verify the token.

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

## Define a Secured Concern

Create a Concern called `Secured` which looks for the `access_token` in the `Authorization` header of an incoming request. If the token is present, it should be passed to `JsonWebToken.verify`.

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

## Apply Authentication to Routes

With the `Secured` Concern in place, you can now apply it to whichever endpoints you wish to protect. Applying the Concern means that a valid `access_token` **must** be present in the request before the resource can be released.

```rb
# app/controllers/public_controller.rb

# frozen_string_literal: true
class PublicController < ActionController::API
  # This route doesn't need authentication
  def public
    render json: { message: 'Hello from a public endpoint! You don't need to be authenticated to see this.' }
  end
end
```

```rb
# app/controllers/private_controller.rb

# frozen_string_literal: true
class PrivateController < ActionController::API
  include Secured

  def private
    render json: 'Hello from a private endpoint! You need to be authenticated to see this.'
  end
end
```

## Configure Scopes

The `JsonWebToken.verify` method above verifies that the `access_token` included in the request is valid; however, it doesn't yet include any mechanism for checking that the token has the sufficient **scope** to access the requested resources.

Scopes provide a way for you to define which resources should be accessible by the user holding a given `access_token`. For example, you might choose to permit `read` access to a `messages` resource if a user has a **manager** access level, or a `write` access to that resource if they are an **administrator**.

To configure scopes in your Auth0 dashboard, navigate to [your API](${manage_url}/#/apis) and choose the **Scopes** tab. In this area you can apply any scopes you wish, including one called `read:messages`, which will be used in this example.

## Protect Individual Endpoints

To look for a particular `scope` in an `access_token`, provide an array of required scopes and check if they are present in the payload of the token.

In this example the `SCOPES` array for the given key `/private-scoped` is intersected with the scopes coming in the payload, to determine if it contains one or more items from the other array.

```rb
# app/controllers/private_controller.rb

# frozen_string_literal: true
class PrivateController < ActionController::API
  include Secured

  # ...

  def private_scoped
    render json: { message: 'Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this.' }
  end
end
```

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

With this configuration in place, only `access_token`s which have a scope of `read:messages` will be allowed to access this endpoint.
