Rules are one of the most powerful features of Auth0. As JavaScript functions that execute each time a user authenticates, rules serve as middleware to extend the flexibility of your authentication flow. For a detailed description of rules, see the [full documentation](/rules).

## Create a Rule

To create a rule, go to the [new rule page](${manage_url}/#/rules/new). You can create a new rule from scratch or use an existing template. These templates are written by Auth0 team to assist you complete common tasks.

Select the template called "Add country to the user profile"

![Empty rule](/media/articles/rules/rule-choose-add-country-template.png)

This rule simply gets the `country_name` from the context and adds it as a new `country` attribute to the user profile.

![Add country rule](/media/articles/rules/rule-create-add-country-country.png)

This is just a starting template, and you can edit it to meet your business needs. Once you are done, save the rule and that's it. Whenever a user log in, the rule will be executed, and the country will be added to the user's profile.
