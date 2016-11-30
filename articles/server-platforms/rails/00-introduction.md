---
title: Introduction
description: This tutorial demonstrates how to integrate Auth0 in a Ruby on Rails app to add authentication and authorization
budicon: 448
---

This multistep quickstart guide will walk you through managing authentication in your Ruby on Rails apps with Auth0.

## Seed and Samples

To follow along this quickstart you can either download the [seed project](https://github.com/auth0-samples/auth0-rubyonrails-sample/tree/master/00-Starter-Seed) or the [samples](https://github.com/auth0-samples/auth0-rubyonrails-sample) provided at each page of this quickstart.

The seed is a regular RoR app, with all the Auth0 dependencies set, but nothing more. It's an empty canvas meant to be filled as you follow along the steps of this quickstart. If you prefer this option download the seed from our [GitHub repository](https://github.com/auth0-samples/auth0-rubyonrails-sample/tree/master/00-Starter-Seed) and follow along.

You can also follow the samples that are included in each step. Each sample uses the seed project as starting point and applies each step configuration to it, so for example the Login sample would be the seed project plus the login configuration. If you choose to follow this approach continue reading, the rest of this document will guide you through setting up the required prerequisites.

## Create a Client

Create a new client application in your Auth0 doashboard and retrieve the the domain, client ID and client secret for the app. The downloadable samples throughout the quickstart steps will be configured with your default app credentials.

![App Dashboard](/media/articles/server-platforms/rails/app_dashboard.png)

<%= include('../../_includes/_callback_url') %>

${include('../_callbackRegularWebApp')}

In this case, the callbackURL should look something like:

```bash
https://example.com/auth/oauth2/callback
```

### 3. Structure
The project structure follows the regular Ruby on Rails application structure. The tree below displays the location of the most referred files in the quickstart.

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

## Dependencies

To follow along with the integration steps, add the following dependencies to your `Gemfile` and run `bundle install`

${snippet(meta.snippets.dependencies)}
