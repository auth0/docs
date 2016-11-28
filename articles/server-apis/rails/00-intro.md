---
title: Introduction
name: Introduction to the Quickstart, and configuring environment
description: This Quickstart will guide you through the various tasks related to using Auth0-issued JSON Web Tokens to secure your Rails API.
---

## Introduction
This is the very beginning of a simple, practical and multi-step quickstart that will guide you through managing authentication in your Ruby on Rails APIs with Auth0.

::: panel-info System Requirements
This tutorial and seed project have been tested with the following:
* Ruby 2.3.1
* Rails 5.0.0
:::

<%= include('../../_includes/_package', {
  githubUrl: 'https://github.com/auth0-samples/auth0-rubyonrails-api-samples',
  pkgRepo: 'auth0-rubyonrails-api-samples',
  pkgBranch: 'master',
  pkgPath: '00-Starter-Seed',
  pkgFilePath: null,
  pkgType: 'server'
}) %>_

## Seed & Samples
To follow along this quickstart you can either download the [seed project](https://github.com/auth0-samples/auth0-rubyonrails-api-samples/tree/master/00-Starter-Seed) or the [samples](https://github.com/auth0-samples/auth0-rubyonrails-api-samples) provided at each page of this quickstart.

The seed is a regular RoR API, with all the Auth0 dependencies set, but nothing more. It's an empty canvas meant to be filled as you follow along the steps of this quickstart. If you prefer this option download the seed from our [GitHub repository](https://github.com/auth0-samples/auth0-rubyonrails-api-samples/tree/master/00-Starter-Seed) and follow along.

You can also follow the samples that are included in each step. Each sample uses the seed project as starting point and applies each step configuration to it. If you choose to follow this approach continue reading, the rest of this document will guide you through setting up the required prerequisites.

## Dependencies

Add the following dependencies to your `Gemfile` and run `bundle install`:

${snippet(meta.snippets.dependencies)}

This was already done for you in the seed project, so no need to add them if you are using the seed project as a starting point (you'll still need to run `bundle install`).

That's all you need to start working with Auth0 in your Rails API!


## Basic Application Structure
The seed application exposes 2 endpoints: `ping` and `secured_ping`. The former does not require authentication, while as the second does.

```Ruby
#routes.rb
Rails.application.routes.draw do
  get 'ping' => 'ping#ping'
  get 'ping/secured' => 'secured_ping#ping'
end
```
Both routes are mapped to the corresponding controller. The difference between them is that the `SecuredPingController` includes a concern, where the access token validation takes place.

```Ruby
class PingController < ActionController::API
  def ping
    render json: "All good. You don't need to be authenticated to call this"
  end
end
```

```Ruby
class SecuredPingController < ActionController::API
  include Secured

  def ping
    render json: "All good. You only get this message if you're authenticated."
  end
end
```

```Ruby
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

The validation changes slightly depending on the signing algorithm chosen for the API: Auth0 can sign JSON Web Tokens (JWT) using either a symmetric key (HS256) or an asymmetric key (RS256). The next two sections of this quickstart show the changes needed to use either.

*Note*: Take a look at [this article](https://auth0.com/blog/json-web-token-signing-algorithms-overview/) to learn more about JWT Signing Algorithms.

Please continue with the [Authentication](/quickstart/backend/rails/01-authentication-rs256) tutorial to secure your Web API.
