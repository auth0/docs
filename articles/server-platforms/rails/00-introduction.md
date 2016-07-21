---
title: Introduction
description: This tutorial will show you how to integrate Auth0 in your Rails app to add authentication and authorization.
---

## Introduction
This is the very beginning of a simple, practical and multi-step quickstart that will guide you through managing authentication in your Ruby on Rails apps with Auth0.

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

### Seed & Samples
There are two options to following along this quickstart. You can either download the [seed project](https://github.com/auth0-samples/auth0-rubyonrails-sample/tree/master/00-Starter-Seed) or the [samples](https://github.com/auth0-samples/auth0-rubyonrails-sample) provided at each page of this quickstart.

The seed is a regular RoR app, with all the Auth0 dependencies set, but nothing more. It's an empty canvas meant to be filled as you follow along the steps of this quickstart. If you prefer this option download the seed from our [GitHub repository](https://github.com/auth0-samples/auth0-rubyonrails-sample/tree/master/00-Starter-Seed) and follow along.

Instead you can choose to follow the samples that are included in each step. Each sample uses the seed project as a starting point and applies to it the configuration of each step, so for example the Login sample would be the seed project plus the configuration required to implement login functionality. If you choose to follow this approach continue reading, the rest of this document will guide you through setting up the required prerequisites.

::: panel-info System Requirements
This tutorial and seed project have been tested with the following:
* Ruby 2.3.1
* Rails 4.2.6
:::

<%= include('../../_includes/_package', {
  pkgRepo: 'omniauth-auth0',
  pkgBranch: 'master',
  pkgPath: 'examples/ruby-on-rails-webapp',
  pkgFilePath: null,
  pkgType: 'server'
}) %>

### 1. Create a Client

Get your credentials (Domain, Client ID, and Client Secret) from the dashboard. The sample will be configured with your Default App credentials.

![App Dashboard](/media/articles/server-platforms/rails/app_dashboard.png)

### 2. Configure Callback URLs

Callback URLs are the URLs that Auth0 invokes after the authentication process is completed. Auth0 routes your application back to this URL and attaches some details to the user's session including a token. Since callback URLs can be manipulated, you will need to add your application's URL in the client's Allowed Callback URLs for security. This will enable Auth0 to recognize these URLs as valid. If omitted, the authentication will not be successful for the application's instance.

${include('../_callbackRegularWebApp')}

In this case, the callbackURL should look something like:

```
http://yourUrl/auth/auth0/callback
```

### 3. Structure
The structure of the project does not differ from a regular RoR application. The tree below displays the location of the files most referred to in the quickstart.

```bash
├── app
│   ├── assets
│   │   └── javascripts
│   │       └──home.js.erb
│   ├── controllers
│   │   └── home_controller.rb
│   │   └── dashboard_controller.rb
│   │   └── auth0_controller.rb
│   │   └── secured_controller.rb
│   └── views
│       └── auth0
│       │   └── failure.html.rb
│       └── dashboard
│       │   └── show.html.rb
│       └── home
│           └── show.html.rb
└── config
│    └── initializers
│    │   └── auth0.rb
│    └── routes.rb
│    └── secrets.yml
└── .env
```

### 4. Dependencies

Add the following dependencies to your `Gemfile` and run `bundle install`

${snippet(meta.snippets.dependencies)}


That's all you need to start working with Auth0!
Please continue with login tutorial to know how to implement basic login.
