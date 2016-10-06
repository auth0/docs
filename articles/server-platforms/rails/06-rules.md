---
title: Rules
description: This tutorial will show you how to use Auth0 rules to extend what Auth0 has to offer.
---
## Ruby On Rails - Rules
<%= include('../_includes/_rules-introduction') %>

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

### 1. Create a rule

<%= include('../_includes/_rules-create-section') %>

### 2. Test rule result

<%= include('../_includes/_rules-test-result-intro', { profilelink: '/quickstart/webapp/rails/03-user-profile' }) %>

![Country rule sample](/media/articles/server-platforms/rails/rule_country_preview.png)

**NOTE**: No additional code is required, as the new property will be included in the full user profile.

After the rule executes, the output that the application will receive for the full user profile is the following user object:

```bash
{
  "email": "test@test.com",
  "nickname": "test",
  "user_id": "auth0|575acb630e8da29012778689",

  //... other properties ...

  "country": "Argentina"  // NEW PROPERTY ADDED BY THE RULE
}
```

This is just one of the tons of cool things we can do with rules. Go ahead and create any rule that fits your needs.
