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

You can further customize the appearance of the output by using filters, which are simple methods. For example, the `upcase` filter will convert the text which is passed to the filter to upper case:

`Hello {{ name | upcase }}!`

Multiple filters are separated by `|` and are processed from left to right, applying the subsequent filter to the result of the previous one. The template will render the final result.

The following filters are supported:

* `append` - append a string *e.g.* `{{ 'foo' | append:'bar' }} #=> 'foobar'`
* `capitalize` - capitalize words in the input sentence, *e.g.* `{{ "my great title" | capitalize }} #=> My great title`
* `date` - reformat a date ([syntax reference](http://docs.shopify.com/themes/liquid-documentation/filters/additional-filters#date))
* `default` - returns the given variable unless it is null or the empty string, when it will return the given value, *e.g.* `{{ undefined_variable | default: "Default value" }} #=> "Default value"`
* `divided_by` - integer division *e.g.* `{{ 10 | divided_by:3 }} #=> 3`
* `downcase` - convert an input string to lowercase, *e.g.* `{{ "Parker Moore" | downcase }} #=> parker moore`
* `escape` - html escape a string, *e.g.* `{{ "Have you read 'James & the Giant Peach'?" | escape }} #=> Have you read &#39;James &amp; the Giant Peach&#39;?`
* `escape_once` - returns an escaped version of html without affecting existing escaped entities, *e.g.* `{{ "1 < 2 &amp; 3" | escape_once }} #=> 1 &lt; 2 &amp; 3`
* `first` - get the first element of the passed in array
* `join` - join elements of the array with certain character between them
* `last` - get the last element of the passed in array
* `map` - map/collect an array on a given property
* `minus` - subtraction *e.g.*  `{{ 4 | minus:2 }} #=> 2`
* `modulo` - remainder, *e.g.* `{{ 3 | modulo:2 }} #=> 1`
* `newline_to_br` - replace each newline (\n) with html break
* `plus` - addition *e.g.*  `{{ '1' | plus:'1' }} #=> 2`, `{{ 1 | plus:1 }} #=> 2`
* `prepend` - prepend a string *e.g.* `{{ 'bar' | prepend:'foo' }} #=> 'foobar'`
* `remove` - remove each occurrence *e.g.* `{{ 'foobarfoobar' | remove:'foo' }} #=> 'barbar'`
* `remove_first` - remove the first occurrence *e.g.* `{{ 'barbar' | remove_first:'bar' }} #=> 'bar'`
* `replace` - replace each occurrence *e.g.* `{{ 'foofoo' | replace:'foo','bar' }} #=> 'barbar'`
* `replace_first` - replace the first occurrence *e.g.* `{{ 'barbar' | replace_first:'bar','foo' }} #=> 'foobar'`
* `round` - rounds input to the nearest integer or specified number of decimals *e.g.* `{{ 4.5612 | round: 2 }} #=> 4.56`
* `size` - return the size of an array or string, *e.g.* `{{ "Ground control to Major Tom." | size }} #=> 28`
* `sort` - sort elements of the array
* `split` - split a string on a matching pattern *e.g.* `{{ "a~b" | split:"~" }} #=> ['a','b']`
* `strip_html` - strip html from string, *e.g.* `{{ "How <em>are</em> you?" | strip_html }} #=> How are you?`
* `strip_newlines` - strip all newlines (\n) from string
* `times` - multiplication  *e.g* `{{ 5 | times:4 }} #=> 20`
* `truncate` - truncate a string down to x characters. It also accepts a second parameter that will append to the string *e.g.* `{{ 'foobarfoobar' | truncate: 5, '.' }} #=> 'foob.'`
* `truncatewords` - truncate a string down to x words
* `upcase` - convert an input string to uppercase, *e.g* `{{ "Parker Moore" | upcase }} #=> PARKER MOORE`

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
