---
title: Rules
description: This tutorial will show you how to create a basic rule that you can use in your app.
---

<%= include('../../_includes/_package', {
  githubUrl: 'https://github.com/auth0-samples/auth0-ios-swift-sample/tree/master/06-Rules',
  pkgOrg: 'auth0-samples',
  pkgRepo: 'auth0-ios-swift-sample',
  pkgBranch: 'master',
  pkgPath: '06-Rules',
  pkgFilePath: null,
  pkgType: 'none'
}) %>



Rules are one of the cool features of Auth0. The reason behind that coolness is their flexibility, which gives you the ability to extend what Auth0 has to offer. They are just JavaScript functions which work like middlewares. To see a detailed description, please refer to [the full documentation](/rules).

## Create a Rule

To create a rule, just go to the [new rule page](${manage_url}/#/rules/new). You can create it from scratch or use an existing template. These templates are written by Auth0 team to assist you complete common tasks.

Let's use the template called "*Add country to the user profile*", under the *Enrich Profile* section:

![Add country template](/media/articles/rules/rule-choose-add-country-template.png)

This rule just gets the `country_name` from the context and adds it as a new `country` attribute to the user profile.

![Country rule sample](/media/articles/angularjs2/rule-country-show.png)

This is just a starting template, you can edit it to meet your business needs. Once you are done, save the rule and that's it. Whenever you login, the rule will be executed, and the country will be added.

## Test the Rule

To see the created rule results, just implement a login and fetch the user profile information (you can check out how to do it in the [login tutorial](01-login)).

You can access the `country` added by the rule within the `extraInfo` dictionary from the `A0UserProfile` object, like so:

```swift
import Lock
```

```swift
let profile: A0UserProfile = ... // the user profile you get upon login
guard let country = profile.extraInfo["country"] as? String else {
    // test failed
    return
}
print("user country is: \(country)")
```
