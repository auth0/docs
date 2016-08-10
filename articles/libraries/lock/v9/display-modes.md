# Lock: Display Modes

You can display Lock embedded or as a modal dialog with an overlay

## Overlay Mode

Shows the widget on top of your web page. This is the default mode.

![](https://auth0.com/lib/lock/img/mode-1.png)

Here is the code you would add to your web application.

```html
<script>
  var lock = new Lock('xxxxx', '<account>.auth0.com');

  lock.show();
</script>
```

## Embedded Mode

The embedded mode will render the widget inside a `<div>` that you specify.

![](https://auth0.com/lib/lock/img/mode-2.png)

```html
<div id="hiw-login-container"></div>

Here is the code you would add to your web application.

<script>
  var lock = new Lock('xxxxx', '<account>.auth0.com');

  // render in `#hiw-login-container` element
  lock.show({
    container: 'hiw-login-container'
  });
</script>
```

Notice that when you use the embedded mode the widget can't be "closed" unless you change the `closable` [property](/libraries/lock/v9/customization#closable-boolean).
