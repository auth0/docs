Rules are one of the cool features of Auth0. The reason behind that coolness is their flexibility, which gives you the ability to extend what Auth0 has to offer. They are just JavaScript functions which work like middlewares. To see a detailed description, please refer to [the full documentation](https://auth0.com/docs/rules).

### Create a rule

To create a rule just go to [rule new page](https://manage.auth0.com/#/rules/new). You can create it from scratch or use an existing template. These templates are written by Auth0 team to assist you complete common tasks. 
Let's use the one called `Add country to the user profile`

![Empty rule](/media/articles/rules/rule-choose-add-country-template.png)


This rule simply gets the `country_name` from the context and adds it as a new `country` attribute to the user profile.


![Add country rule](/media/articles/rules/rule-create-add-country-country.png)

This is just a starting template, you can edit it to meet your business needs. Once you are done, save the rule and that's it. Whenever you login, the rule will be executed, and the country will be added. 

You have added a rule to your Auth0 authentication flow.
