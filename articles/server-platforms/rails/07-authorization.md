---
title: Authorization
description: Learn how to assign roles to your users, and use those claims to authorize or deny a user to access certain portions of the app.
budicon: 448
---

Authentication tells your application to trust a user, granting him or her access to it. But that might not be enough. Most times, you will need to grant or restrict users from accessing specific parts of your application based on a number of attributes (commonly named "claims", being their "role", "department", or "country" a few examples). In this section, you'll learn how to assign a "role" claim to your users, and use those claims to authorize them to access an "admin" page.

<%= include('../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-rubyonrails-sample',
  path: '07-Authorization',
  requirements: [
    'Ruby 2.3.1',
    'Rails 5.0.0'
  ]
}) %>

## Create a Rule to Assign Roles

<%= include('../_includes/_authorization-introduction', { ruleslink: '/quickstart/webapp/rails/06-rules' }) %>

## Add Dependencies

Add the following dependencies to your `Gemfile` and run `bundle install`:

${snippet(meta.snippets.dependencies)}

## Create the Admin and Unauthorized Views

Add a placeholder text to indicate the user has accessed the admin area in the Admin View (```app/views/admin/show.html.erb```):

```ruby
<div class="alert alert-success" role="alert">
  You are viewing this because you are logged in and you have 'admin' role.
</div>
${' <%= link_to "Back to Home", dashboard_path %> '}
```

And a placeholder to indicate the user cannot access the requested content in the Unauthorized View (```app/views/unauthorized/show.html.erb```):

```ruby
<div class="alert alert-danger" role="alert">
  Unauthorized: you are not allowed to see this content
</div>
${' <%= link_to "Back to Home", dashboard_path %> '}
```

## Create the Admin Controller

In the Admin Controller, add a ```before_action``` to check if the user has the admin role. If not, redirect the user to the unauthorized page:

```ruby
class AdminController < ApplicationController
  include Secured
  before_action :admin?

  def show
  end

  private

  def admin?
    redirect_to unauthorized_show_path unless roles.include?('admin')
  end

  def roles
    app_metadata ? app_metadata[:roles] : []
  end

  def app_metadata
    session[:userinfo][:extra][:raw_info][:app_metadata]
  end
end
```

That's it. Now you can verify that only users logged in with an email that contains `@example` (or following the rule you've introduced) will be able to access the admin page.
