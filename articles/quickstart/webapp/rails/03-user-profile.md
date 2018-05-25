---
title: User Profile
description: This tutorial demonstrates shows how to access the user profile information using OmniAuth-Auth0 strategy.
budicon: 448
github:
  path: 03-User-Profile
---

## Process the Callback

After receiving a successful callback at `/auth/oauth2/callback`, the **OmniAuth** strategy provides available user profile information via the `request.env['omniauth.auth']` hash.

::: note
The full contents of the authentication hash retrieved by the Auth0 strategy are detailed [here](https://github.com/auth0/omniauth-auth0#auth-hash).
:::

In the [login](/quickstart/webapp/rails/01-login) step, you configured the application for **OmniAuth** to start the **OmniAuth-Auth0** strategy and for **OmniAuth** to take over and complete the authentication process. You also set a route that matches the callback URL in the application routes.

```ruby
get "/auth/oauth2/callback" => "auth0#callback"
```

The `callback` action in the `auth0` controller retrieves the auth hash and stores it in the application's session hash. It then redirects to the dashboard controller `show` action, which renders the dashboard view.

```ruby
# app/controllers/auth0_controller

def callback
  session[:userinfo] = request.env['omniauth.auth']

  redirect_to '/dashboard'
end
```

## Display the User Profile

The auth hash built by the **OmniAuth** Auth0 strategy has the user profile data under the `info` key. Each element is named according to [the normalized user profile definition](/user-profile/normalized).

The auth hash also contains the full user profile under the `raw` key. The difference is that the normalized user profile data is pre-processed and guaranteed to be present, while the full user profile data may vary depending on several factors, including which social identity provider is used to log the user in.

Add a template which displays the user's profile data.

```html
<!-- app/views/dashboard/show.html.erb -->
<section class="jumbotron  text-center">
  <h2><img class="jumbo-thumbnail img-circle" src="${ '<%= @user[:info][:image] %>' }"/></h2>
  <h1>Welcome, ${ '<%= @user[:info][:name] %>' }</h1>
</section>
<section class="container">
  <div class="panel panel-default">
    <div class="panel-heading">Normalized User Profile</div>
    <div class="panel-body">
      <pre>${ '<%= JSON.pretty_generate(@user[:info]) %>' }</pre>
    </div>
  </div>
  <div class="panel panel-default">
    <div class="panel-heading">Full User Profile</div>
    <div class="panel-body">
      <pre>${ '<%= JSON.pretty_generate(@user[:extra][:raw_info]) %>' }</pre>
    </div>
  </div>
</section>
```

Additionally, declare and assign the contents to the `user` variable in the dashboard controller:

```ruby
# app/controller/dashboard_controller

class DashboardController < ApplicationController
  include Secured
  def show
    @user = session[:userinfo]
  end
end
```
