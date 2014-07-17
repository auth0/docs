# Using Auth0 with Ruby

This tutorial explains how to integrate Auth0 with a Ruby on Rails application. If you are using Sinatra, it's very similar, look at the one file [example below](#8).

## Tutorial

### 1. Install Auth0 gem

Add the gem to your Gemfile:

    gem 'omniauth', '~> 1.2'
    gem 'omniauth-auth0', '~> 1.1'

Then run:

    $ bundle install

### 2. Setting up the callback URL in Auth0

<div class="setup-callback">
<p>After authenticating the user on Auth0, we will do a GET to a URL on your web site. For security purposes, you have to register this URL on the <a href="@@uiAppSettingsURL@@" target="_new">Application Settings</a> section on Auth0 Admin app.</p>

<pre><code>http://localhost:port/auth/auth0/callback</pre></code>
</div>

### 3. Initialize the auth0 gem

Add the `auth0.rb` file under the `config/initializers` folder with the following settings:

    Rails.application.config.middleware.use OmniAuth::Builder do
      provider(
        :auth0,
        '@@account.clientId@@',
        '@@account.clientSecret@@',
        '@@account.namespace@@',
        callback_path: "/auth/auth0/callback"
      )
    end

Don't forget to change the callback_path if you're using a different route for the callback.

### 4. Initialize the auth0 strategy in your app

Create the callback controller

    rails generate controller callback store failure

Open the `callback_controller.rb` under the `app/controllers` folder and implement the methods as follows:

    class CallbackController < ApplicationController
      def store
        # example request.env['omniauth.auth'] in https://github.com/auth0/omniauth-auth0#auth-hash
        # id_token = session[:userinfo]['credentials']['id_token']
        # store the user profile in session and redirect to root
        session[:userinfo] = request.env['omniauth.auth']
        
        redirect_to '/'
      end

      def failure
        #show a failure page
        @error_msg = request.params['message']
      end
    end

This stores the user profile in the session. Note, that you can get the JSON Web Token by doing `session[:userinfo]['credentials']['id_token']`.

Now replace the auto-generated route in routes.rb:

    get "/auth/auth0/callback" => "auth0#callback"
    get "/auth/failure" => "callback#failure"

### 5. Triggering login manually or integrating the Auth0 widget

@@sdk2@@

### 6. Accessing user information

Once the user successfully authenticates and returns to the application, you can retrieve his/her profile attributes through the `session[:userinfo]` stored in `Auth0Controller`

    class UserController < ApplicationController
      def index
        @user = session[:userinfo]
      end
    end

The userinfo includes these attributes: `uid`, `name`, `email`, `nickname` and `image`.

    <div class="well clearfix">
      <h2>UID</h2>
      Hello <%= @user["info"]["name"] %>
    </div>

OmniAuth will always return a hash of information after authenticating with an external provider in the Rack environment under the key `omniauth.auth`. This information is meant to be as normalized as possible, so the schema below will be filled to the greatest degree available given the provider upon authentication. For more information about the user profile [read this](https://github.com/intridea/omniauth/wiki/Auth-Hash-Schema), and read [Auth0's normalized user profile](user-profile).

**Congratulations!**

### Sinatra

    require 'sinatra'
    require 'omniauth'
    require 'omniauth-auth0'

    use Rack::Session::Cookie
    use OmniAuth::Builder do
      provider :auth0, '@@account.clientId@@', '@@account.clientSecret@@', '@@account.namespace@@'
    end

    get '/' do
      # render the login widget form Step 5
      erb :login
    end

    get '/auth/auth0/callback' do
      auth = request.env['omniauth.auth']
      p auth.inspect
      # auth will have the user info!
      # auth['credentials']['id_token'] is the JSON Web Token
    end

### Troubleshooting ActionDispatch::Cookies::CookieOverflow issue

If you are getting this error it means that you are using Cookie sessions and since you are storing the whole profile it overflows the max-size of 4K.

You can change to use In-Memory store for development as follows:

  # /config/initializers/session_store.rb
  CrazyApp::Application.config.session_store :cache_store

  # /config/environments/development.rb
  config.cache_store = :memory_store

### Troubleshooting SSL issues

It seems that under some configurations Ruby can't find certification authority certificates (CA Certs).

Download CURL's CA certs bundle to the project directory:

    $ curl -o lib/ca-bundle.crt http://curl.haxx.se/ca/ca-bundle.crt

Then add this initializer `config/initializers/fix_ssl.rb`:

    require 'open-uri'
    require 'net/https'

    module Net
      class HTTP
        alias_method :original_use_ssl=, :use_ssl=

        def use_ssl=(flag)
          path = ( Rails.env == "development") ? "lib/ca-bundle.crt" : "/usr/lib/ssl/certs/ca-certificates.crt"
          self.ca_file = Rails.root.join(path).to_s
          self.verify_mode = OpenSSL::SSL::VERIFY_PEER
          self.original_use_ssl = flag
        end
      end
    end
