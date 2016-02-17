---
title: Ruby API Tutorial
name: Ruby API
alias:
  - ruby
languages:
  - Ruby
thirdParty: false
image: /media/platforms/rails.png
lodash: true
tags:
  - quickstart
snippets:
  dependencies: server-apis/ruby/dependencies
  setup: server-apis/ruby/setup
  use: server-apis/ruby/use
---

## Ruby API Tutorial

You can get started by either downloading the seed project or if you would like to add Auth0 to an existing application you can follow the tutorial steps.

::: panel-info System Requirements
This tutorial and seed project have been tested with the following:

* Ruby 2.1.7
:::

<%= include('../_includes/_package', { pkgRepo: 'auth0-ruby-samples', pkgBranch: 'master', pkgPath: 'ruby-api', pkgFilePath: null, pkgType: 'server' + account.clientParam }) %>

> Note: If you're creating a Ruby On Rails app, please check [this other tutorial](/server-apis/rails).

Otherwise, Please follow the steps below to configure your existing Ruby app to use it with Auth0.

### 1. Add jwt dependency to your Gemfile

You need to add the jwt dependency.

Open your Gemfile and add the following:

${snippet(meta.snippets.dependencies)}

### 2. Validate JWT token

You need to validate the [JWT](/jwt)s to make sure the user is authenticated. For that, in a filter or in a middleware processor that runs before your actions, you should write the following code:

${snippet(meta.snippets.use)}

### 3. You're done!

Now you have both your FrontEnd and Backend configured to use Auth0. Congrats, you're awesome!
