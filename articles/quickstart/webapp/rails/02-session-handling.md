---
title: Session Handling
description: Learn how to store user data in your session and clean it up upon logout.
budicon: 448
topics:
  - quickstarts
  - webapp
  - login
  - sessions
contentType: tutorial
useCase: quickstart
github:
  path: 02-Session-Handling
---
## Store Session Data on Login

Upon successful authentication, **OmniAuth** sets the authentication hash of a request to `/auth/auth0/callback`. To handle this request, add a new route in your routes file.

```ruby
get "/auth/auth0/callback" => "auth0#callback"
```

Store the user information in the session in `auth0_controller/callback`.

```ruby
# app/controllers/auth0_controller.rb

def callback
  # This stores all the user information that came from Auth0
  # and the IdP
  session[:userinfo] = request.env['omniauth.auth']

  # Redirect to the URL you want after successful auth
  redirect_to '/dashboard'
end
```

## Clear Session on Logout

To clear out all the objects stored within the session, call the `reset_session` method within the `logout_controller/logout` method. [Learn more about `reset_session` here](http://api.rubyonrails.org/classes/ActionController/Base.html#M000668).

```ruby
# app/controllers/logout_controller.rb

class LogoutController < ApplicationController
  include LogoutHelper
  def logout
    reset_session
    redirect_to logout_url.to_s
  end
end
```
