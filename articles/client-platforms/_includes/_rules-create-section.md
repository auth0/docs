To create a rule, go to the [New Rule](${manage_url}/#/rules/new) page. You can create a rule from scratch by selecting an empty rule, or you may use one of the existing templates. These templates are written by Auth0 to cover common scenarios and use cases.

For this example, select the **Add country to the user profile** rule.

![Empty rule](/media/articles/rules/rule-choose-add-country-template.png)

This rule extracts the `country_name` from the `context` and adds it to the user profile as a new `country` attribute.

![Add country rule](/media/articles/rules/rule-create-add-country-country.png)

This is just the beginning, as you can edit the rule to meet your business needs. Once complete, click **Save**. The rule will execute any time a user logs in, and the country will be added to the user's profile.
