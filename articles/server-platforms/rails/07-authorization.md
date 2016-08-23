---
title: Authorization
description: Learn how to assign roles to your users, and use those claims to authorize or deny a user to access certain portions of the app.
---

## Ruby On Rails - Authorization
Authentication tells your application to trust a user, granting her access to it. But that might not be enough. Most times, you will need to grant or restrict users from accessing specific parts of your application based on a number of attributes (commonly named "claims", being their "role", "department", or "country" a few examples). In this section, you'll learn how to assign a "role" claim to your users, and use those claims to authorize them to access an "admin" page.

::: panel-info System Requirements
This tutorial and seed project have been tested with the following:
* Ruby 2.3.1
* Rails 5.0.0
:::

<%= include('../../_includes/_package', { githubUrl: 'https://github.com/auth0-samples/auth0-rubyonrails-sample/tree/master/07-Authorization' }) %>_

<%= include('../_includes/_authorization-introduction', { ruleslink: '/quickstart/webapp/rails/06-rules' }) %>_

## 1. Create a Rule to assign roles

<%= include('../_includes/_authorization-create-rule') %>_

### 2. Add dependencies

Add the following dependencies to your `Gemfile` and run `bundle install`:

${snippet(meta.snippets.dependencies)}

### 3. Create the admin and unauthorized views
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

### 4. Create the admin controller
In the Admin Controller, add a ```before_action``` to check if the user has the admin role. Redirect her to the unauthorized page if she does not have the admin role:

```ruby
class AdminController < ApplicationController
  include Secured
  before_action :isAdmin?

  def show
  end

  private

  def isAdmin?
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
