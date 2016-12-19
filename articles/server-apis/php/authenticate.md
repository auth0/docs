---
title: Authenticate
description: This tutorial will show you how to use the Auth0 PHP SDK to add authentication and authorization to your API.
---

<%= include('../../_includes/_package', {
  org: 'auth0',
  repo: 'auth0-PHP',
  path: 'examples/basic-api',
  requirements: [
    'PHP 5.6.14',
    'Composer 1.0-dev'
  ]
}) %>

**Otherwise, Please follow the steps below to configure your existing PHP app to use it with Auth0.**

### 1. Add the needed dependencies

We need 2 dependencies to make this work:

* **auth0-php**: this will take care of checking the JWT
* **router**: we'll use this for creating simple routes

${snippet(meta.snippets.dependencies)}

> This sample uses **[Composer](https://getcomposer.org/doc/00-intro.md)**, a tool for dependency management in PHP. It allows you to declare the dependent libraries your project needs and it will install them in your project for you.

### 2. Create the JWT Validation filter

Now, you need to validate the [JWT](/jwt). For that, we'll create a filter that will run in the routes we need.

${snippet(meta.snippets.setup)}

### 3. Create a `/secured` route that will use this filter

Now, you can just create routes under `/secured` route which will check the JWT

${snippet(meta.snippets.use)}

### 4. Call Your API
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

### 5. You're done!

Now you have both your FrontEnd and Backend configured to use Auth0. Congrats, you're awesome!

### Optional Steps
#### Configure CORS

You can configure CORS, by just adding [these lines](https://github.com/auth0/auth0-PHP/blob/master/examples/basic-api/index.php#L47-L58) to your `index.php`

#### Define `apache_request_headers` if not available

If the function is not available, just [copy these lines](https://github.com/auth0/auth0-PHP/blob/master/examples/basic-api/index.php#L8-L29) to your `index.php`
