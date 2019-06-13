---
description: How to use Liquid syntax in your email templates.
topics:
  - email
  - liquid
contentType: 
    - how-to
    - concept
useCase: customize-emails
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

::: note
For more information on supported output attributes and their usage, see [Customizing Your Emails](/email/templates).
:::

You can further customize the appearance of the output by using filters, which are simple methods. For example, the `upcase` filter will convert the text which is passed to the filter to upper case:

`Hello {{ name | upcase }}!`

Multiple filters are separated by `|` and are processed from left to right, applying the subsequent filter to the result of the previous one. The template will render the final result.

The following filters are supported:


Filter | Description | Example
---------|----------|---------
`append` | Append a string | `{{ 'foo' | append:'bar' }} #=> 'foobar'`
`capitalize` | Capitalize words in the input sentence | `{{ "my great title" | capitalize }} #=> My great title`
`date` | Reformat a date ([syntax reference](http://docs.shopify.com/themes/liquid-documentation/filters/additional-filters#date)) |
`default` | Returns the given variable unless it is null or the empty string, when it will return the given value | `{{ undefined_variable | default: "Default value" }} #=> "Default value"`
`divided_by` | Integer division | `{{ 10 | divided_by:3 }} #=> 3`
`downcase` | Convert an input string to lowercase, | `{{ "Parker Moore" | downcase }} #=> parker moore`
`escape` | HTML escape a string | `{{ "Have you read 'James & the Giant Peach'?" | escape }} #=> Have you read &#39;James &amp; the Giant Peach&#39;?`
`escape_once` | Returns an escaped version of HTML without affecting existing escaped entities | `{{ "1 < 2 &amp; 3" | escape_once }} #=> 1 &lt; 2 &amp; 3`
`first` | Get the first element of the passed in array |
`join` | Join elements of the array with certain character between them |
`last` | Get the last element of the passed in array |
`map` | Map/collect an array on a given property |
`minus` | Subtraction |  `{{ 4 | minus:2 }} #=> 2`
`modulo` | Remainder | `{{ 3 | modulo:2 }} #=> 1`
`newline_to_br` | Replace each newline (\n) with HTML break |
`plus` | Addition |  `{{ '1' | plus:'1' }} #=> 2`, `{{ 1 | plus:1 }} #=> 2`
`prepend` | Prepend a string | `{{ 'bar' | prepend:'foo' }} #=> 'foobar'`
`remove` | Remove each occurrence | `{{ 'foobarfoobar' | remove:'foo' }} #=> 'barbar'`
`remove_first` | Remove the first occurrence | `{{ 'barbar' | remove_first:'bar' }} #=> 'bar'`
`replace` | Replace each occurrence | `{{ 'foofoo' | replace:'foo','bar' }} #=> 'barbar'`
`replace_first` | Replace the first occurrence | `{{ 'barbar' | replace_first:'bar','foo' }} #=> 'foobar'`
`round` | Rounds input to the nearest integer or specified number of decimals | `{{ 4.5612 | round: 2 }} #=> 4.56`
`size` | Return the size of an array or string | `{{ "Ground control to Major Tom." | size }} #=> 28`
`sort` | Sort elements of the array
`split` | Split a string on a matching pattern | `{{ "a~b" | split:"~" }} #=> ['a','b']`
`strip_html` | Strip HTML from string | `{{ "How <em>are</em> you?" | strip_html }} #=> How are you?`
`strip_newlines` | Strip all newlines (\n) from string |
`times` | Multiplication  | `{{ 5 | times:4 }} #=> 20`
`truncate` | Truncate a string down to x characters. It also accepts a second parameter that will append to the string | `{{ 'foobarfoobar' | truncate: 5, '.' }} #=> 'foob.'`
`truncatewords` | Truncate a string down to x words |
`upcase` | Convert an input string to uppercase | `{{ "Parker Moore" | upcase }} #=> PARKER MOORE`

### Liquid Markup: Tag

**Tag** markup does not resolve to text and is surrounded by a pair of matched curly braces and percent signs:

`{% this does not resolve to text %}`

Tags are typically used to apply logic to your template. Using the [supported tags](https://github.com/Shopify/liquid/wiki/Liquid-for-Designers#tags), you can have one template meet several needs.

You could use tags to execute `if / else` statements to have a single template send out emails in multiple languages.

For example:

```HTML
{% if user.user_metadata.lang == 'en' %}
  [email body in English]
{% elsif user.user_metadata.lang == 'de' %}
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
