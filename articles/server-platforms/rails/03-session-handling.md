---
title: Session Handling
description: Learn how to store user data in your session and clean it up upon logout.
---

## Ruby On Rails - Session Handling
In this step you'll learn how to use the session to store authentication data in your Rails application.

::: panel-info System Requirements
This tutorial and seed project have been tested with the following:
* Ruby 2.3.1
* Rails 5.0.0
:::

<%= include('../../_includes/_package', {
  githubUrl: 'https://github.com/auth0-samples/auth0-rubyonrails-sample',
  pkgRepo: 'auth0-rubyonrails-sample',
  pkgBranch: 'master',
  pkgPath: '03-Session-Handling',
  pkgFilePath: null,
  pkgType: 'server'
}) %>_


### 1. Store session data upon login
Upon successful authentication, OmniAuth-Auth0 sets a special hash called the Authentication Hash of a request to `/auth/auth0/callback`. To handle this request, add a new route in your routes file:

```ruby
get "/auth/auth0/callback" => "auth0#callback"
```

And store the user information in the session adding the following code to the `auth0_controller\callback` method:

```ruby
  def callback
    # This stores all the user information that came from Auth0
    # and the IdP
    session[:userinfo] = request.env['omniauth.auth']

    # Redirect to the URL you want after successful auth
    redirect_to '/dashboard'
  end
```

### 2. Logout action

To clear out all the objects stored within the session, call the `reset_session` method within the `logout_controller\logout` method. [Learn more about `reset_session` here](http://api.rubyonrails.org/classes/ActionController/Base.html#M000668).

A typical logout action would look like this:

```ruby
class LogoutController < ApplicationController
  include LogoutHelper
  def logout
    reset_session
    redirect_to logout_url.to_s
  end
end
```

You can take advantage of the SDK for generating the logout URL.

```ruby
module LogoutHelper
  def logout_url
    creds = { client_id: ENV['AUTH0_CLIENT_ID'],
    client_secret: ENV['AUTH0_CLIENT_SECRET'],
    api_version: 1,
    domain: ENV['AUTH0_DOMAIN'] }
    client = Auth0Client.new(creds)
    client.logout_url(root_url)
  end
end
```

**NOTE**: The final destination URL (the `returnTo` value) needs to be in the list of `Allowed Logout URLs`. [Read more about this](/logout#redirecting-users-after-logout).
