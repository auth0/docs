---
title: Authenticate
description: This tutorial will show you how to use the Auth0 Python SDK to add authentication and authorization to your API.
---

You can get started by either downloading the seed project or if you would like to add Auth0 to an existing application you can follow the tutorial steps.


<%= include('../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-python-api-samples',
  path: '00-Starter-Seed',
  requirements: [
    'Python 2.7',
    'Flask 0.10.1',
    'Flask-Cors 2.1.0',
    'PyJWT 1.4.0'
  ]
}) %>


**If you have an existing application, please follow the steps below.**

### 1. Add the needed dependencies

In this example, we'll be using Flask and we'll be validating the JWT. For that, add the following dependencies to your `requirements.txt`.

${snippet(meta.snippets.dependencies)}

### 2. Create the JWT Validation decorator

Now, you need to validate the [JWT](/jwt). For that, we'll create a custom decorator.

${snippet(meta.snippets.setup)}

### 3. Use this decorator in your methods

Now, you can just decorate any route's method that requires authentication

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

Now you have both your frontend and backend configured to use Auth0. Congrats, you're awesome!

### Note for Python 2.7

If you're using Python 2.7 and you already have the `jwt` package installed, you need to do the following to get this working:

```bash
pip uninstall jwt
pip uninstall pyjwt
pip install pyjwt
```
