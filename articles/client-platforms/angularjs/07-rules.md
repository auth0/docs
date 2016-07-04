---
title: Rules
description: This tutorial will show you how to use Auth0 rules to extend what Auth0 has to offer.
---

<%= include('../../_includes/_github', {
  link: 'https://github.com/auth0-samples/auth0-angularjs-sample/tree/master/06-Rules',
}) %>_

<%= include('../_includes/_rules-introduction') %>


#### Test rule result

The created rule will inject additional data to the user's profile so you need to fetch that as seen in [User Profile](/quickstart/spa/angular/03-user-profile) step.

Display user profile's new `country` attribute added in the created rule:

```html
<div class="col-md-6 col-md-offset-3">
  <h3>Profile</h3>
  <img src="{{userProfile.picture}}" alt="">
  <p><strong>Name: </strong> {{userProfile.name}}</p>
  <p><strong>Email: </strong> {{userProfile.email}}</p>
  <p><strong>Nickname: </strong> {{userProfile.nickname}}</p>
  <p><strong>Created At: </strong> {{userProfile.created_at}}</p>
  <p><strong>Updated At: </strong> {{userProfile.updated_at}}</p>
  <p><strong>Country (added with rule): </strong> {{userProfile.country}}</p>
</div>
```

![Country rule sample](/media/articles/angularjs/rule_country_preview.png)

After the rule executes, the output that the application will receive is the following user object:

```bash
{
  "email": "johnfoo@gmail.com",
  "family_name": "Foo",
  "user_id": "google-oauth2|103547991597142817347",

  //... other props ...

  "country": "Nigeria"  // NEW PROPERTY ADDED BY THE RULE
}
```

This is just one of the tons of cool things we can do with rules. Go ahead and create any rule that fits your needs.
