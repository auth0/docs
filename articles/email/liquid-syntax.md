# Using Liquid Syntax in Email Templates

When setting up emails using the Email Templates available via the Auth0 Management Portal, you have the option of formatting your emails using [Liquid](https://github.com/Shopify/liquid/wiki/Liquid-for-Designers).

Liquid is an open-source templating language that extends the functionality of HTML so that your emails dynamically display various pieces of information. For example, you might structure the `Subject` of your emails to display the appropriate application name, rather than hardcoding a particular value:

`We are {{application.name}}!`

HTML + Liquid syntax is supported in every field except `URL Lifetime` on the Verification, Change Password Confirmation, and Blocked Account email templates.

## Using Liquid

There are two types of markup in Liquid: `output` and `tag`.

### Liquid Markup: Output

`Output` resolves to text and is surrounded by two pairs of matched curly braces:

`Hello {{ name }}!`

You can further customize your output by using [filters](https://github.com/Shopify/liquid/wiki/Liquid-for-Designers#standard-filters), which are simple methods.

`Hello {{name | upcase}}!`

The first parameter the filter takes is the output of the left side of the filter. The return value will be used as the new left-hand side value if there is a second filter present. When there are no more filters, the template will receive and render the final string.



### Liquid Markup: Tag

`Tag` does not resolve to text and is surrounded by a pair of matched curly braces and a pair of percent signs:

`{% this does not resolve to text %}`


## Applying Logic Using Tags

With Liquid, you can use [tags](https://github.com/Shopify/liquid/wiki/Liquid-for-Designers#tags) to include logic in your template.

One way you might choose to use tags is to include `if / else` to set up one template capable of sending out multi-language emails.

```HTML
{% if CONDITION %}
  [email body in language 1]
{% else %}
  [email body in language 2]
{% endif %}
```
