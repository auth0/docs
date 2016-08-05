---
title: Custom Login
description: Learn how to login using the Authentication API SDK instead of OmniAuth.
---

## Ruby On Rails - Custom Login
[Login](/quickstart/webapp/rails/01-login) explains how to login using a widget called Lock and a gem called OmniAuth (and a specific Auth0 strategy for OmniAuth). You can build an application with Auth0 using your custom design without including neither Lock nor OmniAuth. In this section, you'll learn how to create a custom login form using the Auth0 Ruby SDK.

::: panel-info System Requirements
This tutorial and seed project have been tested with the following:
* Ruby 2.3.1
* Rails 5.0.0
:::

<%= include('../../_includes/_package', {
  githubUrl: 'https://github.com/auth0-samples/auth0-rubyonrails-sample',
  pkgRepo: 'auth0-rubyonrails-sample',
  pkgBranch: 'master',
  pkgPath: '02-Custom-Login',
  pkgFilePath: null,
  pkgType: 'server'
}) %>

### 1. Add dependencies

Add the following dependencies to your `Gemfile` and run `bundle install`:

${snippet(meta.snippets.dependencies)}

### 2. Create a login form in the home view
**NOTE**: `home` is not a mandatory name for the view / controller.

```ruby
<div id="login-container">
  ${ '<%= form_tag do %>' }
      ${ '<%= text_field_tag :user, "", class:"form-control" %>' }
      <br>
      ${ '<%= password_field_tag :password, "", class:"form-control"%>' }</p>
      <br>
      ${ '<%= submit_tag("Login", class: "btn btn-success btn-lg") %>' }
      ${ '<%= submit_tag("Sign up", name: "signup", class:"btn btn-success btn-lg") %>' }
  ${' <% end %> '}
  ${ '<%= link_to "Login with Google" , controller: :auth0, action: :google_authorize %>' }
</div>
```

In order for this form to post its contents to the auth action of the home controller, you need to make this a valid route. To do so, add the following to your `config/routes.rb` file:
```ruby
post "/" => "auth0#callback"
```

### 3. Create an auth action in the home controller

Add the following actions in the `auth0` controller:

```ruby
def callback
  if params[:user]
    signup if params[:signup]
    session[:token_id] = login
  else
    session[:token_id] = google_login
  end
  redirect_to '/dashboard'
  rescue Auth0::Unauthorized
    redirect_to '/', notice: 'Invalid email or password'
  rescue => ex
    redirect_to '/', notice: ex.message
end
```
The `callback` controller action calls the `signup` or `login` actions, depending on the contents of the `params` hash. Upon successful execution of either, it redirects to `/dashboard`. In case of an exception, it redirects to `/` and flashes the exception message.

Next, add the definitions for the `login` and `signup` actions under `private`:

```ruby
def login
  client.login(
    params[:user],
    params[:password],
    authParams: {
      scope: 'openid name email'
    },
    connection: 'Username-Password-Authentication'
  )
end

def signup
  client.signup(
    params[:user],
    params[:password]
  )
end
```

### 4. Add an SDK client instance in the Application Controller
In order to call the API methods using the Auth0 Ruby SDK, you need to initialize a client instance. Add the following code in your Application Controller (`controllers/application_controller.rb`):

```ruby
def client
  creds = { client_id: Rails.application.secrets.auth0_client_id,
            client_secret: Rails.application.secrets.auth0_client_secret,
            api_version: 1,
            domain: Rails.application.secrets.auth0_domain }
  @client ||= Auth0Client.new(creds)
end
```

### 5. Checking if the user is authenticated
In [Login](/quickstart/webapp/rails/01-login) you used a controller concern with a `before_action` to prevent users from executing actions in controllers that included it. You will use the same strategy now, but the code will change slightly.

Create a `Secured` controller concern with the code below:

```ruby
module Secured
  extend ActiveSupport::Concern

  included do
    before_action :logged_in?
  end

  def logged_in?
    redirect_to '/' unless session[:token_id].present?
  end
end
```

Then, update the `DashboardController` so that it includes this concern:

```ruby
class DashboardController < ApplicationController
  include Secured
  def show
  end
end
```

This way, if a user attempts to access the routes governed by the `DashboardController` actions, it will be redirected to `/`.

### 6. Login with Google

For your users to login using a Social Connection without using neither Lock nor OmniAuth, follow these steps:

**NOTE**: Social connections support only browser based (passive) authentication. The providers don't allow entering the user/password in applications that don't belong to them, so the user gets redirected to the provider (e.g. Google sign in page). Three steps take place in this process: initiation, authentication, and getting the access token. You'll trigger the Initiation, Auth0 will take care of the Authentication, and then you'll obtain the access and id token for the user (*to learn more about this process go to: [Authentication API](/api/authentication#!%23get--authorize_social) and [OAuth Server Side](/protocols#oauth-server-side) documents*).

For this particular example, you'll configure Google as your social provider. The API methods called by the API also support Facebook, Twitter and Weibo.

**Prerequisite**: configure your Google Social Connection by following [this tutorial](/connections/social/google).

To trigger initiation, you'll need to generate a redirect to the social provider. To do so, create the `google_authorize method` in the `Auth0Controller`:

```ruby
def google_authorize
  redirect_to client.authorization_url(
    Rails.application.secrets.auth0_callback_url,
    connection: 'google-oauth2',
    scope: 'openid'
  ).to_s
end
```

Next, add the actual link to the controller action in the home view:

```ruby
${ '<%= link_to "Login with Google" , controller: :auth0, action: :google_authorize %>' }
```
And the corresponding route in the `routes` file:

```ruby
get 'auth0/google_authorize' => 'auth0#google_authorize'
```

The authentication will be handled by Auth0, the common visible part of this process is that the user is redirected to the identity provider site. When this process finishes, a request will be made to the callback URL, which will be handled by the application. You'll need to extract the access_code in this request and post a request to the Auth0 token endpoint using the SDK to get the access and id tokens.

Add the following method to the `Auth0Controller`:

```ruby
def google_login
  client.obtain_user_tokens(params['code'], Rails.application.secrets.auth0_callback_url, 'google-oauth2', 'openid')['id_token']
end
```

And call this method from the controller `callback` action.

**NOTE**: this logic is only necessary if you're mixing the login form from the first section of the tutorial and social authentication. Otherwise, you can call `google_login` straight from the `callback` action.

```ruby
def callback
  begin
    if params[:user]
      if params[:signup]
        signup
      end
      session[:token_id] = login
    else
      session[:token_id] = google_login
    end
    redirect_to '/dashboard'
  rescue Auth0::Unauthorized
    redirect_to '/', notice: 'Invalid email or password'
  rescue => ex
    redirect_to '/', notice: ex.message
  end
end
```

### Additional considerations

For the sake of simplicity, this sample does not go into details such as creating a user model and combining a custom login and the Lock widget. [OmniAuth documentation](https://github.com/intridea/omniauth#integrating-omniauth-into-your-application) suggests using a `SessionsController`, such as the one displayed below. Combining authentication mechanisms could be achieved by having several User model creation methods.

```ruby
class SessionsController < ApplicationController
  def create
    @user = User.find_or_create_from_auth_hash(auth_hash)
    self.current_user = @user
    redirect_to '/'
  end

  protected

  def auth_hash
    request.env['omniauth.auth']
  end
end
```
