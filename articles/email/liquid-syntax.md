# Using Liquid Syntax in Email Templates

When using the [Email Templates](/email) available via the Auth0 Management Portal, you have the option of using [Liquid](https://github.com/Shopify/liquid/wiki/Liquid-for-Designers) to select the appropriate data and formatting your emails.

Liquid is an open-source templating language that extends the functionality of HTML so that your emails dynamically display various pieces of information. For example, you might structure the `Subject` of your emails to display the appropriate application name, rather than hardcoding a particular value:

`We are {{application.name}}!`

HTML + Liquid syntax is supported in every field except `URL Lifetime` on the Verification, Change Password Confirmation, and Blocked Account email templates.

## Using Liquid

There are two types of markup in Liquid: `output` and `tag`.

### Liquid Markup: Output

`Output` resolves to text and is surrounded by two pairs of matched curly braces:

`Hello {{ name }}!`

You can further customize the appearance of your output by using [filters](https://github.com/Shopify/liquid/wiki/Liquid-for-Designers#standard-filters), which are simple methods.

`Hello {{name | upcase}}!`

The first parameter the filter takes is the output of the left side of the filter. The return value will be used as the new left-hand side value if there is a second filter present. When there are no more filters, the template will receive and render the final string.

### Liquid Markup: Tag

`Tag` does not resolve to text and is surrounded by a pair of matched curly braces and a pair of percent signs:

`{% this does not resolve to text %}`

Tags are typically used to apply logic to your template. Using the [supported tags](https://github.com/Shopify/liquid/wiki/Liquid-for-Designers#tags), you can have one template meet several business needs at once.

One way you might choose to use tags is to include `if / else` to set up a template capable of sending out multi-language emails.

```HTML
{% if CONDITION %}
  [email body in language 1]
{% else %}
  [email body in language 2]
{% endif %}
```

If you need to use additional conditions, consider using a [case statement](https://github.com/Shopify/liquid/wiki/Liquid-for-Designers#case-statement).

#### Tag: Comments

Any content between the `{% comment %}` and `{% endcomment %}` tags will be rendered as a comment.

`This will be seen. {% comment %} This will not be seen. {% endcomment %}`

#### Tag: Raw

To temporarily disable processing of Liquid markup, use the `{% raw %}` and `{% endraw %}`. This is useful if you are using syntax that conflicts with Liquid.

For example, you might escape the following Mustache.js line as follows:

```text
{% raw %}
  var clients = "Clients:<ul>{{#client}}<li>{{fn}} {{ln}}" + {{phone}}</li>{{/client}}</ul>";
{% endraw %}
```
