---
title: Authentication (RS256)
name: Shows how to secure your API using the standard JWT middeware
description: Shows how to secure your API using the standard JWT middeware.
---

<%= include('../../_includes/_package', {
  githubUrl: 'https://github.com/auth0-samples/auth0-rubyonrails-api-samples',
  pkgRepo: 'auth0-rubyonrails-api-samples',
  pkgBranch: 'master',
  pkgPath: '01-Authentication-RS256',
  pkgFilePath: null,
  pkgType: 'server'
}) %>_

Auth0 can sign JSON Web Tokens (JWT) using either a symmetric key (HS256) or an asymmetric key (RS256). This particular document will describe how to configure Auth0 to sign tokens using RS256.

> If you want to use HS256 then please go to the [Authentication using HS256](/quickstart/backend/rails/02-authentication-hs256) tutorial.

## Create an API

Browse [APIs](https://manage.auth0.com/#/apis) in the Auth0 Dashboard and click "Create API". Enter a Name and Identifier, then choose RS256 as the signing algorithm. Auth0 will create the API and a non interactive test client, which will be authorized to request access tokens from your API.

*Note*: Once the API is created, the signing algorithm cannot be changed.

## RS256 Signature Validation

RS256 is an asymmetric algorithm, and it uses a public/private key pair: the identity provider has a private (secret) key used to generate the signature, and the consumer of the JWT gets a public key to validate the signature. In this tutorial you'll setup your application to query the auth0 JWKS endpoint which exposes your signing keys, and then validate the JWT using such keys.

The JsonWebToken class defines the decode method, which obtains the public key from the JWKS endpoint and then uses the [ruby-jwt](https://github.com/jwt/ruby-jwt) implementation to validate the token. Notice that the method verifies the issuer and audience of the JWT.

*Note*: Although this tutorial does not cover this topic, consider implementing a cache strategy to avoid querying the JWKS endpoint for the public keys on each request.

```Ruby
class JsonWebToken

  # Step 2: Validate the token
  def self.decode(token)
    JWT.decode( token,  nil,
    true,
    algorithm: 'RS256',
    iss: Rails.application.secrets.auth0_domain,
    verify_iss: true,
    aud: Rails.application.secrets.auth0_api_audience,
    verify_aud: true) do |header|
      jwks_hash[header['kid']]
    end
  end

  # Step 1: Get the public key
  def self.jwks_hash
    jwks_raw = Net::HTTP.get URI("#{Rails.application.secrets.auth0_domain}.well-known/jwks.json")
    jwks_keys = Array(JSON.parse(jwks_raw)['keys'])
    Hash[
      jwks_keys
        .map { |k|
          [
            k['kid'],
            OpenSSL::X509::Certificate.new(
              Base64.decode64(k['x5c'].first)).public_key
          ]
        }
    ]
  end
end
```

## Testing your API

During development you may want to test your API.

If you make a request to the `/ping/secured` endpoint you will notice that the API returns an HTTP status code 401 (Unauthorized):

```
curl --request GET \
  --url http://<your_api_url>/ping/secured
```

In order to get authenticated, you will need to pass along an `access_token` in the HTTP Authorization header. A quick and easy way to obtain an `access_token` is to call the `/oauth/token` endpoint:

```
curl   --request POST  --url https://<your_auth0_domain>/oauth/token   \
--header 'content-type: application/json' \
--data '{"client_id":"<your_non_interactive_client_id>", "client_secret":"<your_non_interactive_client_secret>",   "audience":"<your_api_identifier>",   "grant_type":"client_credentials"}'

```

Now you can use the `access_token` and pass it along in the Authorization header as a Bearer token, let's tweak the original call a bit:

```
curl --request GET \
  --url http://localhost:3000/ping/secured \
  --header 'authorization: Bearer <your_access_token>'

```

That's it, you just called a secured API endpoint!
