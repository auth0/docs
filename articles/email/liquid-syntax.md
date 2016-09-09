---
description: How to use Liquid syntax in your email templates.
---

# Liquid Syntax in Email Templates

When using the [Email Templates](${manage_url}/#/emails) available on the Auth0 dashboard, you have the option of using [Liquid](https://github.com/Shopify/liquid/wiki/Liquid-for-Designers) to select the appropriate data and formatting your emails.

Liquid is an open-source templating language that extends the functionality of HTML that you can use to dynamically generate your emails to contain varying information. 

For example, you can structure the `Subject` of your emails to display the appropriate application name, rather than hardcoding a particular value:

`We are {{application.name}}!`

HTML + Liquid syntax is supported in every field (except `URL Lifetime`) on the **Verification**, **Change Password Confirmation**, and **Blocked Account** email templates.

## Using Liquid

There are two types of markup in Liquid: **output** and **tag**.

### Liquid Markup: Output

**Output** markup resolves to text and is surrounded by two pairs of matching curly braces:

`Hello {{ name }}!`

You can further customize the appearance of the output by using [filters](https://github.com/Shopify/liquid/wiki/Liquid-for-Designers#standard-filters), which are simple methods.

`Hello {{name | upcase}}!`

Multiple filters are separated by `|` and are processed from left to right, applying the subsequent filter to the result of the previous one. The template will render the final result.

### Liquid Markup: Tag

**Tag** markup does not resolve to text and is surrounded by a pair of matched curly braces and percent signs:

`{% this does not resolve to text %}`

Tags are typically used to apply logic to your template. Using the [supported tags](https://github.com/Shopify/liquid/wiki/Liquid-for-Designers#tags), you can have one template meet several needs.

You could use tags to execute `if / else` statements to have a single template send out emails in multiple languages.

For example:

```HTML
{% if user.user_metadata.lang == 'en' %}
  [email body in English]
{% elseif user.user_metadata.lang == 'de' %}
  [email body in German]
{% endif %}
```

If you need to use additional conditions, consider using a [case statement](https://github.com/Shopify/liquid/wiki/Liquid-for-Designers#case-statement).

#### Tag: Comments

Any content between `{% comment %}` and `{% endcomment %}` tags will not be rendered.

`This will be seen. {% comment %} This will not be seen. {% endcomment %}`

#### Tag: Raw

To temporarily disable processing of Liquid markup, use `{% raw %}` and `{% endraw %}`. This is useful if you are using syntax that conflicts with Liquid.

For example, you can escape the following `Mustache.js` line as follows:

```text
{% raw %}
  var clients = "Clients:<ul>{{#client}}<li>{{fn}} {{ln}}" + {{phone}}</li>{{/client}}</ul>";
{% endraw %}
```
