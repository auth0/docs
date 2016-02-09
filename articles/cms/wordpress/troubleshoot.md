# WordPress Troubleshoot

## My configuration is wrong and I can't authenticate using Auth0. Is there another way to access the plugin?

The plugin can be accessed using valid WordPress credentials through the regular WordPress login by adding `?wle` to the login url. For example: `http://yourdomain.com/wp-login.php?wle`.

## I am having problems when a user logs in. Where can I find a log of what is happening?

The plugin provides an error log where you can check what has happened. Access it through the **Error Log** sub-item of the **Auth0** menu. 

## How can I redirect the users to a certain URL after login

### On the login page

This plugin leverages WordPress features to work seamless with default settings, so one way is to use the `redirect_to` query parameter when you redirect the user to the login page. The plugin will redirect the user to this url after a successful login.

Also, you can use the `Login redirection URL` setting in the plugin settings page, this will be used to redirect the user when `redirect_to` is not supplied.

### Using the widget

The widget does not provide an specific setting for this but you can use the `Extra conf`. This field allows you to set a json that will be sent to Lock. In this case, the json needs to look like this:

``` 
{
	"state":"{\"redirect_to\":\"http://...\"}"
} 
```

> The state attribute expects to receive an string, because of that you need to be sure to scape all the quotes.

### Using the shortcode

Like the widget, the way to set the redirection url in the shortcode is using the Extra conf setting. In this case like this:

```
[auth0 extra_conf="{ \"state\" : \"{\\\"redirect_to\\\":\\\"http://...\\\"}\" }" ]
``` 

>Note the double scape of the state value, have in mind that now this json is enclosed in the shortcode quotes

## How can I migrate my wordpress users to auth0

The current version of the plugin does not provides a way to migrate the users to auth0 out of the box, but you still have a couple of options. 

- One is to export all your users to a json file and upload to be batch imported to auth0. Your users will need to reset their password before login using Auth0 (this is because there is no way to decrypt the wordpress passwords to migrate them to auth0). You can follow [this doc](https://auth0.com/docs/bulk-import) to generate the json file, and you need then up upload using the api [here] (https://auth0.com/docs/api/v2#!/Jobs/post_users_imports).

- The other is to use the [WordPress XML RPC](https://codex.wordpress.org/XML-RPC_Support) endpoint and set up the [migration flow using a custom db connection](https://auth0.com/docs/connections/database/migrating) with [this scripts](https://gist.github.com/glena/b31716e3c8fe48927be2).

> You can use the next version of the plugin (you can download it [here](https://github.com/auth0/wp-auth0/archive/dev.zip)). It is under beta currently and will be released soon.

## The session expires too soon

The plugin does not handle the sessions by it self, it leverate the default WordPress mechanisms instead. By default, user sessions are kept alive for 2 hours but you can do something to make them live for 14 hours thought.

For this, you need to open the `WP_Auth0.php` file in the plugin root directory, and add a second parameter to each `wp_set_auth_cookie` call with a `true` value (it should be on [line 573](https://github.com/auth0/wp-auth0/blob/master/WP_Auth0.php#L573) and and [line 584](https://github.com/auth0/wp-auth0/blob/master/WP_Auth0.php#L584)). You can find more info about this functio [here](https://codex.wordpress.org/Function_Reference/wp_set_auth_cookie).

> The upcoming version of the plugin provides a setting to handle this, so you will be able to safely upgrade when it is released.
