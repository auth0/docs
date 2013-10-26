# Using Auth0 with Ruby On Rails

This tutorial explains how to integrate Auth0 with a Ruby on Rails application.

## Tutorial

### 1. Install Auth0 gem

Use RubyGems to install the **auth0** gem, running the command:

```
gem install auth0
```

> This gem is essentially an [Omniauth Strategy](https://github.com/intridea/omniauth/wiki/Strategy-Contribution-Guide).

### 2. Setting up the callback URL in Auth0

<div class="setup-callback">
<p>After authenticating the user on Auth0, we will do a GET to a URL on your web site. For security purposes, you have to register this URL  on the <strong>Application Settings</strong> section on Auth0 Admin app.</p>

<pre><code>http://localhost:port/auth/auth0/callback</pre></code>
</div>

### 3. Initialize the auth0 gem

Add the `auth0.rb` file under the `config/initializers` folder with the following settings:

	Rails.application.config.middleware.use OmniAuth::Builder do
	  provider :auth0, '@@account.clientId@@', '@@account.clientSecret@@', '@@account.namespace@@'
	end

### 4. Initialize the auth0 strategy in your app

Create the callback controller

	rails generate controller callback store failure

Open the `callback_controller.rb` under the `app/controllers` folder and implement the methods `store` (used to store the user profile in session), and `failure` (to display error messages):

	class CallbackController < ApplicationController
		def store
			session[:userinfo] = request.env['omniauth.auth']
			redirect_to user_index_path
		end

		def failure
			@error_msg = request.params['message']
		end
	end

Update the callback routes in the `routes.rb` under `config` folder:

	match "auth/auth0/callback" => "callback#store"
	match "auth/failure" => "callback#failure"

### 5. Triggering login manually or integrating the Auth0 widget

@@sdk@@

### 6. Accessing user information

Once the user successfully authenticates and returns to the application, you can retrieve his/her profile attributes through the `session[:userinfo]` stored in `CallbackController`

    class UserController < ApplicationController
      def index
      	@user = session[:userinfo]
      end
    end

The userinfo includes these: `uid`, `name`, `email`, `nickname` and `image`.

    <div class="well clearfix">
    	<h2>UID</h2>
    	<%= @user.uid %>
    </div>

OmniAuth will always return a hash of information after authenticating with an external provider in the Rack environment under the key `omniauth.auth`. This information is meant to be as normalized as possible, so the schema below will be filled to the greatest degree available given the provider upon authentication. For more information about the user profile [read this](https://github.com/intridea/omniauth/wiki/Auth-Hash-Schema), and read [Auth0's normalized user profile](user-profile).
    
**Congratulations!**
