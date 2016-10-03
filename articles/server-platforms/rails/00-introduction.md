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
  githubUrl: 'https://github.com/auth0-samples/auth0-rubyonrails-sample',
  pkgRepo: 'auth0-rubyonrails-sample',
  pkgBranch: 'master',
  pkgPath: '00-Starter-Seed',
  pkgFilePath: null,
  pkgType: 'server'
}) %>

### Seed & Samples
To follow along this quickstart you can either download the [seed project](https://github.com/auth0-samples/auth0-rubyonrails-sample/tree/master/00-Starter-Seed) or the [samples](https://github.com/auth0-samples/auth0-rubyonrails-sample) provided at each page of this quickstart.

The seed is a regular RoR app, with all the Auth0 dependencies set, but nothing more. It's an empty canvas meant to be filled as you follow along the steps of this quickstart. If you prefer this option download the seed from our [GitHub repository](https://github.com/auth0-samples/auth0-rubyonrails-sample/tree/master/00-Starter-Seed) and follow along.

You can also follow the samples that are included in each step. Each sample uses the seed project as starting point and applies each step configuration to it, so for example the Login sample would be the seed project plus the login configuration. If you choose to follow this approach continue reading, the rest of this document will guide you through setting up the required prerequisites.

### 1. Create a Client

Get your credentials (Domain, Client ID, and Client Secret) from the dashboard. The sample will be configured with your Default App credentials.

![App Dashboard](/media/articles/server-platforms/rails/app_dashboard.png)

### 2. Configure Callback URLs

A user will be redirected to a "Callback URL" on your application, as part of the authorization flow. To keep this flow secure, you must configure your Auth0 client with one or more Allowed Callback URLs.

${include('../_callbackRegularWebApp')}

In this case, the callbackURL should look something like:

```
https://yourUrl/auth/oauth2/callback
```

### 3. Structure
The project structure follows the regular RoR application structure. The tree below displays the location of the most referred files in the quickstart.

```bash
├── app
│   ├── assets
│   │   └── javascripts
│   │       └──home.js.erb
│   ├── controllers
│   │   └── concerns
│   │   |   └── secured.rb
│   │   └── home_controller.rb
│   │   └── dashboard_controller.rb
│   │   └── auth0_controller.rb
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
