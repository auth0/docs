---
description: How to use Lock Passwordless with Universal Login
---
# Universal Login with Lock Passwordless

Using Lock Passwordless in the login page is the easiest and most secure implementation of [passwordless authentication](/connections/passwordless) that can be achieved. Additionally, the login page is the only place that passwordless authentication can be implemented for new clients at this time.

## Use the Lock Passwordless Template in the Login Page

You can start out with a basic template that will provide you with a working, ready-to-use example of Lock Passwordless in the login page. 

In the [dashboard](${manage_url}), go to **Hosted Pages**, and then to the **Login** page section. 

At the top of the code editor for the page contents, you'll see a dropdown, titled **Default Templates**. Here you can choose from `Lock`, `Lock Passwordless`, or `Custom UI`. 

Choose `Lock Passwordless` to get started.

![Hosted Login Page](/media/articles/hosted-pages/hlp-lock-passwordless.png)

## Call the Login Page From Your Application

Now, in your application, all you will have to do is call the login page via the `authorize` endpoint. This can be done via use of Auth0.js, if your app is a web app.

```html
```html
<script src="${auth0js_url}"></script>

<script type="text/javascript">

  var webAuth = new auth0.WebAuth({
    domain:       '${account.namespace}',
    clientID:     '${account.clientId}'
  });

webAuth.authorize();

</script>
```

For more information on how to use Auth0.js when calling the login page, check out the [Auth0.js documentation](/libraries/auth0js).

## Next Steps

Are you looking for more information about Lock Passwordless? Or are you ready to get started with your own Hosted Login Page?

::: next-steps
* [The Lock Passwordless Repository](https://github.com/auth0/lock-passwordless)
* [Get Started on Your Own Hosted Login Page](${manage_url}/#/login_page)
:::
