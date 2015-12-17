---
title: Python API Tutorial
name: Python API
alias:
  - python
languages:
  - Python
thirdParty: false
image: /media/platforms/python.png
lodash: true
tags:
  - quickstart
snippets:
  dependencies: server-apis/python/dependencies
  setup: server-apis/python/setup
  use: server-apis/python/use
---

## Python API Tutorial

<%= include('../_includes/_package', {
  pkgRepo: 'auth0-python',
  pkgBranch: 'master',
  pkgPath: 'examples/flask-api',
  pkgFilePath: null,
  pkgType: 'server' + account.clientParam
}) %>

**Otherwise, Please follow the steps below to configure your existing Python app to use it with Auth0.**

### 1. Add the needed dependencies

In this example, we'll be using Flask and we'll be validating the JWT. For that, add the following dependencies to your `requirements.txt`.

${snippet(meta.snippets.dependencies)}

### 2. Create the JWT Validation annotation

Now, you need to validate the [JWT](/jwt). For that, we'll create a custom annotation.

${snippet(meta.snippets.setup)}

### 3. Use this annotation in your methods

Now, you can just use this annotation in your methods

${snippet(meta.snippets.use)}

### 4. You're done!

Now you have both your FrontEnd and Backend configured to use Auth0. Congrats, you're awesome!

### Note for Python 2.7

If you're using Python 2.7 and you already have the `jwt` package installed, you need to do the following to get this working:

```bash
pip uninstall jwt
pip uninstall pyjwt
pip install pyjwt
```
