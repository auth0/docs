---
title: Authorization
description: This tutorial demonstrates how to add authorization to a Ruby API.
github:
  path: 01-Authorization-RS256
---

<%= include('../../../_includes/_api_auth_intro') %>

<%= include('../_includes/_api_create_new') %>

<%= include('../_includes/_api_auth_preamble') %>

## Validate Access Tokens

### Install dependencies

This tutorial performs Access Token validation using the **jwt** Gem within a custom `JsonWebToken` class. An `authenticate!` method is used to mark endpoints which require authentication through an incoming `access_token`. 

Install the **jwt** Gem.

```bash
gem `jwt`
bundle install
```

### Create a `JsonWebToken` Class

Create a class called `JsonWebToken` which decodes and verifies the incoming `access_token` token from the `Authorization` header of the request. The public key for your Auth0 tenant can be fetched to verify the token.

```rb
# lib/jwt/json_web_token.rb

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
               # auth0_api_audience is the identifier for the API set up in the Auth0 dashboard
               aud: auth0_api_audience,
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

The `JsonWebToken.verify` method above verifies that the `access_token` included in the request is valid; however, it doesn't yet include any mechanism for checking that the token has the sufficient `scope` to access the requested resources.

To look for a particular `scope` in an `access_token`, provide an array of required scopes and check if they are present in the payload of the token.

In this example the `SCOPES` array for the given key `/api/private-scoped` is intersected with the `scopes` contained in the payload of the `access_token` to determine if it contains one or more items from the array.

```rb
# lib/server_rs256.rb

SCOPES = {
  '/api/private' => nil,
  '/api/private-scoped' => ['read:messages']
}

def authenticate!
  # Extract <token> from the 'Bearer <token>' value of the Authorization header
  supplied_token = String(request.env['HTTP_AUTHORIZATION']).slice(7..-1)

  @auth_payload, @auth_header = JsonWebToken.verify(supplied_token)

  halt 403, json(error: 'Forbidden', message: 'Insufficient scope') unless scope_included

rescue JWT::DecodeError => e
  halt 401, json(error: e.class, message: e.message)
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

### Define an `authenticate!` method

Create an `authenticate!` method to run before each endpoint which looks for the `access_token` in the `Authorization` header of an incoming request. If the token is present, it should be passed to `JsonWebToken.verify`.

```rb
# lib/server_rs256.rb

def authenticate!
  # Extract <token> from the 'Bearer <token>' value of the Authorization header
  supplied_token = String(request.env['HTTP_AUTHORIZATION']).slice(7..-1)

  @auth_payload, @auth_header = JsonWebToken.verify(supplied_token)

rescue JWT::DecodeError => e
  halt 401, json(error: e.class, message: e.message)
end
```

## Protect API Endpoints

<%= include('../_includes/_api_endpoints') %>

The `/public` endpoint does not require to use the `authenticate!` method.

```rb
get '/api/public' do
  json( message: 'Hello from a public endpoint! You don't need to be authenticated to see this.' )
end
```

The protected endpoints need to include the `authenticate!` method. The scopes required for each one are defined in the code of the `authenticate!` method.

```rb
get '/api/private' do
  authenticate!
  json( message: 'Hello from a private endpoint! You need to be authenticated to see this.' )
end

get '/api/private-scoped' do
  authenticate!
  json( message: 'Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this.' )
end
```
