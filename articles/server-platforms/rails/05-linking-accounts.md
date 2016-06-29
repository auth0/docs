---
title: Linking Accounts
description: Link and Unlink accounts from other identity providers using the Rails SDK.
---

## Ruby On Rails - Linking Accounts

::: panel-info System Requirements
This tutorial and seed project have been tested with the following:
* Ruby 2.3.1
* Rails 5.0.0
:::

<%= include('../../_includes/_package', {
  pkgRepo: 'omniauth-auth0',
  pkgBranch: 'master',
  pkgPath: 'examples/ruby-on-rails-webapp',
  pkgFilePath: null,
  pkgType: 'server'
}) %>

In this tutorial you'll learn how to use the Auth0 Rails SDK to link user accounts from different identity providers, allowing a user to authenticate from any of their accounts and still be recognized by your app and associated with the same user profile.

The sample application allows the users to log in with an initial provider, and provides a form that enables them to link another account using Auth0 Lock. Click [here](/link-accounts) to learn more about account linking.

### 1. Add dependencies

Add the following dependencies to your `Gemfile` and run `bundle install`

${snippet(meta.snippets.dependencies)}

### 2. Handling the second authentication with Lock
In [Login](/quickstart/webapp/rails/01-login), you created a js function to handle the authentication with Lock. You'll use the same pattern for your application to trigger the second authentication.

Add the following method to `/app/assets/javascripts/home.js.rb`:

```js
function linkPasswordAccount(){
	connection = $("#link_provider").val();
  var linkOptions = {
		auth: {
			redirectUrl: '${" <%= Rails.application.secrets.auth0_callback_url %> "}',
	allowLogin: true
		},
    languageDictionary: {
	title: 'Link another account'
    }
  };
  if (connection){
    linkOptions.allowedConnections = [connection];
  }
	var linkLock = new Auth0Lock('${"<%= Rails.application.secrets.auth0_client_id %> "}', '${"<%= Rails.application.secrets.auth0_domain %> "}', linkOptions);

  //open lock in signin mode, with the customized options for linking
  linkLock.show();
}
```

### 3. Create the Settings view
This view will contain two forms for linking and unlinking accounts, respectively.
- The first form will show a submit button that, when clicked, will launch Lock allowing the user to login to a second account. Upon successful authentication, the `Auth0Controller` `callback` action will process the account linking using the SDK.
- The second form will have a dropdown listing the user providers, and a submit button. Upon clicking the button, the `SettingsController` `unlink_provider` action will use the SDK to unlink the selected account.

To create the linking form, add the following markup to the settings view:

```ruby
${ "<%= form_tag({ action: 'link_provider' },{ class: 'form-horizontal col-xs-10 col-xs-offset-1' }) do %>" }
  <div class="form-group">
    <label class="col-xs-3 control-label">Provider</label>
    <div class="col-xs-9">
      ${" <%= select_tag(:link_provider, options_for_select(@providers), class: 'form-control') %> "}
    </div>
  </div>
  <div class="form-group">
    <div class="col-xs-offset-3 col-xs-9">
      <a class="btn btn-success btn-lg" onclick="linkPasswordAccount()">Link Accounts</a>
    </div>
  </div>
${ "<% end %>" }
```

To create the second form, add the following code to the settings view:

```ruby
${" <%= form_tag({ action: 'unlink_provider', method: 'post' },{ class: 'form-horizontal col-xs-10 col-xs-offset-1' }) do %> "}
  <div class="form-group">
    <label class="col-xs-3 control-label">Provider</label>
    <div class="col-xs-9">
      ${" <%= select_tag(:unlink_provider, options_for_select(@unlink_providers), class: 'form-control') %> "}
    </div>
  </div>
  <div class="form-group">
    <div class="col-xs-offset-3 col-xs-9">
      ${" <%= button_tag(type: 'submit', class: 'btn btn-danger btn-lg') do %> "}
        Unlink Accounts
      ${" <% end %> "}
    </div>
  </div>
${" <% end %> "}
```

### 4. Create the Settings Controller

Create the `show` action that will continue to retrieve the user information as in the previous steps, but addittionally it will collect the list of the current user's identity providers into the `providers` hash:

```ruby
def show
  @user = session[:userinfo]
  @unlink_providers = unlink_providers.keys - [user[:provider]]
  @providers = link_providers - @unlink_providers - [user[:provider]]
end
```

Next, create the `link_provider` and `unlink_provider` actions
- `link_provider` will obtain the second identity from the `linkuserinfo` session hash and call the `link_user_account` method of the ruby SDK. Upon successful linkage, it will redirect the user back to the settings page, flashing a success notice.

```ruby
    @user = session[:userinfo]
    link_user = session[:linkuserinfo]
    ClientHelper.auth0_client(user).link_user_account(user['uid'], link_with: link_user[:credentials][:id_token])
    redirect_to '/settings', notice: 'Provider succesfully linked.'
  end
```

- `unlink_provider` will obtain the main identity from the `userinfo` session hash and call the `unlink_users_account` method of the ruby SDK, passing the selected provider as a parameter. Then, it will redirect the user back to the settings page, flashing the corresponding notice.

```ruby
def unlink_provider
  @user = session[:userinfo]
  unlink_user_id = unlink_providers[params['unlink_provider']]
  ClientHelper.auth0_client(user).unlink_users_account(user['uid'], params['unlink_provider'], unlink_user_id)
  redirect_to '/settings', notice: 'Provider succesfully unlinked.'
end
```
Add the `unlink_providers` private method, which will build a hash of the user identities in the different providers.

```ruby
def unlink_providers
  user_info = ClientHelper.auth0_client_user(user).user_info
  Hash[user_info['identities'].collect { |identity| [identity['provider'], identity['user_id']] }]
end
```

And finally, create the private `link_providers` method, which retrieves the providers enabled for the client.

```ruby
def link_providers
  connections = ClientHelper.auth0_client_admin.connections
  connections.map do |connection|
    connection['strategy'] if connection['enabled_clients'].include?(ENV['AUTH0_CLIENT_ID'])
  end.compact
end
```
> You can read more about the OmniAuth Auth0 custom strategy and the authentication hash [here](https://github.com/auth0/omniauth-auth0#auth-hash).

### 5.Update the Auth0Controller
You need to update the `callback` action in this controller to handle the second authentication / account linking.

```ruby
class Auth0Controller < ApplicationController
  def callback
    unless session[:userinfo].present?
      session[:userinfo] = request.env['omniauth.auth']
      redirect_to '/dashboard'
      return
    end
    session[:linkuserinfo] = request.env['omniauth.auth']
    redirect_to '/settings/link_provider'
  end
```
### 6. Update the DashboardController to reflect profile updates
Since linking and unlinking accounts will change the user profile, you will need to change the `DashboardController` slightly so that it retrieves the user profile using the SDK upon page refresh:

```ruby
include ClientHelper
def show
  @user = ClientHelper.auth0_client_user(session[:userinfo]).user_info
end
```

### 7. Update the ClientHelper to init the SDK client with different credentials
Last, but not least, add the following methods to `helpers\client_helper`. It will allow you to call the Authentication SDK with different credentials:

```ruby
def self.auth0_client_user(user)
  creds = { client_id: Rails.application.secrets.auth0_client_id,
            token: user[:credentials][:token],
            api_version: 2,
            domain: Rails.application.secrets.auth0_domain }

  Auth0Client.new(creds)
end

def self.auth0_client(user)
  creds = { client_id: Rails.application.secrets.auth0_client_id,
            token: user[:credentials][:id_token],
            api_version: 2,
            domain: Rails.application.secrets.auth0_domain }

  Auth0Client.new(creds)
end

def self.auth0_client_admin
  creds = { client_id: Rails.application.secrets.auth0_client_id,
            token: Rails.application.secrets.auth0_master_jwt,
            api_version: 2,
            domain: Rails.application.secrets.auth0_domain }
  Auth0Client.new(creds)
end
```
