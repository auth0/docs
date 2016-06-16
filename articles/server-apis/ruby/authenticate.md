---
title: Authenticate
description: This tutorial will show you how to use the Auth0 Ruby SDK to add authentication and authorization to your API.
---

## Ruby API Tutorial

You can get started by either downloading the seed project or if you would like to add Auth0 to an existing application you can follow the tutorial steps.

::: panel-info System Requirements
This tutorial and seed project have been tested with the following:

* Ruby 2.1.7
:::

<%= include('../../_includes/_package', { pkgRepo: 'ruby-auth0', pkgBranch: 'master', pkgPath: 'examples/ruby-api', pkgFilePath: null, pkgType: 'server' }) %>

> Note: If you're creating a Ruby On Rails app, please check [this other tutorial](/server-apis/rails).

Otherwise, Please follow the steps below to configure your existing Ruby app to use it with Auth0.

### 1. Add jwt dependency to your Gemfile

You need to add the jwt dependency.

Open your Gemfile and add the following:

${snippet(meta.snippets.dependencies)}

### 2. Validate JWT token

You need to validate the [JWT](/jwt)s to make sure the user is authenticated. For that, in a filter or in a middleware processor that runs before your actions, you should write the following code:

${snippet(meta.snippets.use)}

__Note:__ If you are using Sinatra, instead of using `authorization = request.headers['Authorization']`, you should use `authorization = env['HTTP_AUTHORIZATION']`.

### 3. Call Your API
You can now make requests against your secure API by providing the Authorization header in your requests with a valid JWT id_token.

```har
{
  "method": "GET",
  "url": "http://localhost:8000/path_to_your_api",
  "headers": [
    { "name": "Authorization", "value": "Bearer YOUR_ID_TOKEN_HERE" }
  ]
}
```

### 4. You're done!

Now you have both your FrontEnd and Backend configured to use Auth0. Congrats, you're awesome!
