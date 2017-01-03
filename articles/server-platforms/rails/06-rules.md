---
title: Rules
description: This tutorial will show you how to use Auth0 rules to extend what Auth0 has to offer.
budicon: 448
---

<%= include('../_includes/_rules-introduction') %>

## Create a Rule

<%= include('../_includes/_rules-create-section') %>

## Test Rule Result

![Country rule sample](/media/articles/server-platforms/rails/rule_country_preview.png)

**NOTE**: No additional code is required, as the new property will be included in the full user profile.

After the rule executes, the output that the application will receive for the full user profile is the following user object:

```bash
{
  "email": "test@test.com",
  "nickname": "test",
  "user_id": "auth0|575acb630e8da29012778689",
  //...
  "country": "Argentina"  // NEW PROPERTY ADDED BY THE RULE
}
```

This is just one of the tons of cool things we can do with rules. Go ahead and create any rule that fits your needs.
