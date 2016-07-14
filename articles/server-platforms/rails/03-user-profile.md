---
title: User Profile
description: Access the user profile information using OmniAuth-Auth0 strategy.
---

<%= include('../../_includes/_package', {
  pkgRepo: 'omniauth-auth0',
  pkgBranch: 'master',
  pkgPath: 'examples/ruby-on-rails-webapp',
  pkgFilePath: null,
  pkgType: 'server'
}) %>

**Otherwise, Please follow the steps below to configure your existing Ruby On Rails WebApp to use it with Auth0.**

[Step 01](/quickstart/webapp/rails/01-login) explains how to login using a widget called Lock and a gem called [OmniAuth](https://github.com/intridea/omniauth) (and a specific Auth0 strategy for OmniAuth). In this step, you'll learn how to access the user profile data once the user has logged into the application.

### The OmniAuth auth hash
Using Auth0's OmniAuth strategy, you need only to redirect users to `/auth/auth0` (which you did in [Step 01](/quickstart/webapp/rails/01-login)). From there, OmniAuth will take over and take the user through the necessary steps to authenticate them with the Auth0 strategy.

Once the user has authenticated, OmniAuth sets a special hash called the Authentication Hash on the Rack environment of a request to `/auth/auth0/callback`. This hash contains information about the user that OmniAuth was able to glean from the Auth0 strategy.

> **Note**: The full contents of the authentication hash retrieved by the Auth0 strategy are detailed [here](https://github.com/auth0/omniauth-auth0#auth-hash).

### 1. Add dependencies

Add the following dependencies to your `Gemfile` and run `bundle install`

${snippet(meta.snippets.dependencies)}

### 2. Retrieve the auth hash

In [Step 01](/quickstart/webapp/rails/01-login) you configured the application for Lock to start the OmniAuth strategy, and for OmniAuth to take over and complete the authentication process. Also, you set a route that matches the callback URL in the application routes.

```ruby
get "/auth/auth0/callback" => "auth0#callback"
```

The `callback` action in the auth0 controller retrieves the auth hash and stores it in the application's session hash. It then redirects to the dashboard controller `show` action, which renders the dashboard view.

```ruby
session[:userinfo] = request.env['omniauth.auth']

redirect_to '/dashboard'
```

### 3. Display the User Profile data
The auth hash built by the OmniAuth Auth0 strategy has the data corresponding to the normalized user profile under the `info` key. Each element is named according to [the normalized user profile definition](https://auth0.com/docs/user-profile/normalized).

The auth hash also contains the full user profile under the `raw` key. The difference is that the normalized user profile data is pre-processed and guaranteed to be present, while as the full user profile data may vary depending on several factors, such as the user's identity provider and its linked profile, among others.

Add the following lines in the dashboard view in order to retrieve the user profile data:

```ruby
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
class DashboardController < SecuredController
  def show
    @user = session[:userinfo]
  end
end
```
