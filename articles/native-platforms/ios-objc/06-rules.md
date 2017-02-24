---
title: Rules
description: This tutorial will show you how to create a basic rule that you can use in your app.
---

<%= include('../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-ios-objc-sample',
  path: '06-Rules',
  requirements: [
    'CocoaPods 1.1.1',
    'Version 8.2 (8C38)',
    'iPhone 6 - iOS 10.2 (14C89)'
  ]
}) %>

Rules are one of the cool features of Auth0. The reason behind that coolness is their flexibility, which gives you the ability to extend what Auth0 has to offer. They are just JavaScript functions that work like middleware. To see a detailed description, please refer to [the full documentation](/rules).

### 1. Create a Rule

To create a rule, just go to the [new rule page](${manage_url}/#/rules/new). You can create it from scratch or use an existing template These templates are written by Auth0 team to assist you with completing common tasks.

Let's use the template called "*Add country to the user profile*", under the *Enrich Profile* section:

![Add country template](/media/articles/rules/rule-choose-add-country-template.png)

This rule just gets the `country_name` from the context and adds it as a new `country` attribute to the user profile.

![Country rule sample](/media/articles/angularjs2/rule-country-show.png)

This is just a starting template: you can edit it to meet your business needs. Once you are done, save the rule and that's it. Whenever you login, the rule will be executed, and the country will be added.

### 2. Test the Rule

To see the results of the rule you created, just implement a login and fetch the user profile information (you can check out how to do this the [login tutorial](/quickstart/native/ios-objc/01-login).

You can access the `country` added by the rule within the `extraInfo` dictionary from the `A0UserProfile` object, like so:

```objc
#import <Lock/Lock.h>
```

```objc
NSString *userCountry = self.userProfile.extraInfo[@"country"];
```

### Done!

That's it. You've just experienced how to implement a basic rule. This is just one of all the cool things you can do with them. Go ahead and create any that fit your needs.
