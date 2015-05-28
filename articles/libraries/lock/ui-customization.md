# Lock: Customize the look and feel

You can apply your own styles to the elements of the Lock.

All CSS `class`es and `id`s are prefixed with `a0-` to avoid conflicts with your application's basic stylesheets.

There are two ways to override the Lock's main styles:

### CSS specification

Prepend a `body` key in front of the customization CSS in order to win in CSS specification:

```css
body #a0-lock {
  /* your css rules */
}
```

### Adding a new UI element using JavaScript

This code adds a new button to the widget. Since the widget runs as part of the same DOM of the page, you can maniuplate it in the way you want.

![](https://cdn.auth0.com/img/lock-add-btn.png)

```js
widget.once('signin ready', function() {
    var link = $('<a class="a0-zocial a0-sharepoint" href="#"><span>Login with SharePoint</span></a>');
    link.appendTo('.a0-iconlist');
    link.on('click', function() {
        widget.getClient().login({connection: 'your-sharepoint-connection-name'});
    });
});
```

Here is a fiddle to play around with it <http://jsfiddle.net/auth0/2qws7nqz/>

### Automatically logging in with "Windows Authentication"

When Kerberos is available you can automatically trigger Windows Authentication. As a result the user will immediately be authenticated without having to click the **windows authentication** button.

![](https://cdn.auth0.com/docs/img/windows-auth-button.png)

```js
lock.getClient().getSSOData(true, function (err, ssoData) {
    if (!err && ssoData && ssoData.connection) {
        lock.getClient().login({ connection: ssoData.connection });
    }
});
```

### Order of definition

Auth0 Lock inserts it's CSS definitions in the `head` node of the HTML Document and it does at the very last. So, in order to override the Lock's main styles you must insert your CSS in the `body` node, right after the `<script>` tag definition for the Auth0 Lock inclusion:

```html
<script src="https://cdn.auth0.com/js/lock-6.min.js"></script>
<script>
  var lock = new Auth0Lock('your-key', 'your-account.auth0.com');
  lock.show();
</script>

<style>
  #a0-lock {
    /* your css rules */
  }
</style>
```

Make sure to use the one that fits the best to your use case.

## Theme examples

### Reflex theme

![](https://cldup.com/ZgOKH8-5g9.png)

- **repo**: https://github.com/auth0/lock-theme-reflex
- **demo**: https://cdn.auth0.com/widget-theme-reflex/index.html

### Gradient theme

![](https://cldup.com/p1nP0LDr3w.png)

- **repo**: https://github.com/auth0/lock-theme-gradient
- **demo**: https://cdn.auth0.com/widget-theme-gradient/index.html

## Send us an screenshot!

We would love to see what you can do.
