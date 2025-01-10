---
description: Troubleshooting invalid state errors in the Login by Auth0 WordPress plugin.
topics:
    - wordpress
    - cms
    - state
contentType: reference
useCase:
  - add-login
  - build-an-app
  - customize-connections
  - secure-an-api
  - manage-users  
---

# Troubleshoot WordPress Plugin Invalid State Errors

We added state validation to the WordPress plugin in [version 3.6.0](https://github.com/auth0/wp-auth0/releases/tag/3.6.0). This security measure helps mitigate CSRF attacks by ensuring that the response belongs to a request initiated by the same user For more information, see [State Parameter](/protocols/oauth2/oauth-state).

## How state validation works

The plugin performs state validation by:

1. Setting an `auth0_state` cookie in the browser via Javascript when the Lock login form is shown (on `wp-login.php` or any other page when using a shortcode or widget).
2. Passing that value to the Lock embedded login form so it can be sent with the authentication request.
3. Receiving that value back from Auth0 unchanged in a `state` URL parameter if the Auth0 login was successful.
4. Validating the that value received matches the value sent and stored in the `auth0_state` cookie. If it's valid, then the login process continues. If not, the process stops and an "Invalid state" error message is shown.
5. Deleting the cookie, regardless of validity.
6. Using values in the base64 decoded object to redirect or perform other login actions, if valid.

This process should be completely opaque to both the logging-in user and the site admin. The Auth0 server does not validate or require a state value and returns it untouched to the callback URL. If the "Invalid state" message is seen, then one of the first 4 steps above is not happening.

## Common causes of the invalid state error

Below are some common causes of the invalid state error as well troubleshooting steps you can take.

### Cached callback URLs

The most common cause of the invalid state error is when the callback URL is cached on the server.

Exclude caching on your server for all the URLs listed in the **Allowed Callback URLs** field for your [Application Settings](${manage_url}/#/applications/${account.clientId}/settings) in the Auth0 Dashboard and test again. In addition, exclude caching the site URL (`/index.php` on a regular install) if it has an Auth0 URL parameter. 

Check to see if your server’s time is not set properly. The `BeforeValidException` error can occur when the token is perceived to have been generated before the current time, which can happen if the server times are off. You can check server time by using `echo current_time( 'c' )`. A temporary workaround may also be to modify the plugin to add a time offset if you cannot modify the server time, but it should be fixed for production.

If that does not solve the issue, continue with the troubleshooting steps below. 

### Cached cookies and URL parameters 

If you're on a managed host like WP-Engine, you may need to contact their support team for additional assistance. We've had reports of issues accessing required cookies on the callback URL, as well as problems with checking authentication on the final page that users see after logging in. Specifically, ask to have cache exclusions added for:

- **Cookie:** `auth0_state`
- **Cookie:** `auth0_nonce`
- **Arg/URL parameter:** `auth0`
- **Arg/URL parameter:** `code`
- **Arg/URL parameter:** `state`
- **Arg/URL parameter:** `id_token`

### Page refresh after error message

If you refresh the page after seeing a different error message (email verification, etc) the invalid state message will appear, as it’s trying to revalidate an already used value. This is expected.

### Cookie names requirement

Some hosts, like Pantheon, require specific cookie names to be used. You can alter the cookie name using the [`auth0_state_cookie_name`](/cms/wordpress/extending#auth0_state_cookie_name) filter (see the [issue here](https://github.com/auth0/wp-auth0/issues/494) and [fix here](https://github.com/auth0/wp-auth0/pull/495)) in your theme or a custom plugin.

### Universal Login Page and link building

If your site is using the Universal Login Page and you're building the link yourself in a theme or plugin, you need to:

* Set a cookie called `auth0_state` with a randomly-generated value
* Send that value in a `state` URL parameter.

Alternatively, you can go to Settings > Features tab > Universal Login Page and redirect login requests to the `wp-login.php` page where that cookie and URL parameter will be set automatically. The code that runs this process is [here](https://github.com/auth0/wp-auth0/blob/master/lib/WP_Auth0_LoginManager.php#L90) if you want to continue to use a custom-built `/authorize` URL.

### Visiting the callback URL directly

If you visit your callback URL (typically `yourdomain.com/index.php?auth0=1`) directly or a second time after the authorization code has been exchanged, the invalid state error might display. This indicates that the state has already been verified and deleted.

## Troubleshoot invalid state errors

Note that some of the steps below will require the login process to be broken during the process (marked as such):

1. While logged out of WordPress and Auth0, visit the login page being tested.
2. Check if the `auth0_state` cookie is being set (in Chrome, View > Developer > JavaScript Console > Application tab > Storage on the left > Cookies > domain being tested, look for an `auth0_state` cookie with a non-empty value).

	* If this value is not set, check for errors in the JS console and that your browser can accept cookies (login will not work without cookies). This is set in `/assets/js/lock-init.js` ([code on GitHub](https://github.com/auth0/wp-auth0/blob/master/assets/js/lock-init.js#L22))
	* If the value is set, copy the value and view the source code of the page (in Chrome, **View** > **Developer** > **View Source**). Search for the value, and it should appear as the value associated with parameter `wpAuth0LockGlobal.settings.auth.params.state` ([sample JSON](https://gist.github.com/joshcanhelp/1b8bb990048325eb7214e2b3d7136b78)). Make a note of this value (you'll need it in a following step).

3. If the value appears there and the Lock form is loading normally then steps 1 and 2 from the first list above are functioning properly.
4. Before logging in, add [this snippet](https://gist.github.com/joshcanhelp/ba98f748747c7fd2ecdf54e73c6110f3) to the top of your `wp-config.php`. **WARNING**: This will break login for the WordPress site being tested so use it only on a non-production install.
5. Log in normally.
6. After you're redirected back to your site's callback URL, the process will stop. You should see an output like what's shown in the linked Gist in step #4 above. If you see something like `Array()` with no additional values, then one of two things could be happening:

	* The WordPress callback URL is cached. Page caching can happen in many different ways so there are not explicit steps we can provide here. Check any caching plugins you may have installed, they usually have some kind of URL exclusion built-in. Also check with your host as caching may be automatic and require support involvement.
	* The server is not reading the Auth0 cookie. See the [issue here](https://github.com/auth0/wp-auth0/issues/494) and [fix here](https://github.com/auth0/wp-auth0/pull/495) for a possible solution.

7. If the values are present, check the response headers for the callback URL being loaded (in Chrome, View > Developer > JavaScript Console > Network tab, click the first "document" listed with a 500 status and look for "Response Headers"). Look for any evidence of caching here, like a `Cache-Control` with a non-zero `max-age`, an `x-cache` of something other than `MISS`, or any other clue that this page is being served from a cache.
8. Also in the response headers, check that `set-cookie` includes a directive like `auth0_state=deleted`  to confirm the validation process is happening.  
9. Make sure that the `state` parameter in the URL matches the one recorded from the cookie being set in step #3 above.
10. If there is no evidence of caching, remove the debugging snippet from `wp-config.php` and refresh the callback URL. You should see the "Invalid state" message again. If any caching changes were made, attempt the login process all the way through (make sure to clear your cookies and browser cache for the site before testing).

The following troubleshooting steps require plugin changes that will break the login process and need to be rolled back once complete. These steps should be performed on a test or staging server.

11. Next, we need to check why the state is coming in but does not match the stored value. 
12. In `lib/WP_Auth0_LoginManager.php`, output the values of the stored and returned state and kill the process after. Just before [this line](https://github.com/auth0/wp-auth0/blob/master/lib/WP_Auth0_LoginManager.php#L148), add: 

```php
echo '<h1>$_REQUEST</h1>'; var_dump($_REQUEST); echo '<h1>$_COOKIE</h1>'; var_dump($_COOKIE); die('<h1>Done</h1>');
```

13. Once again, make sure you're logged out and complete the login process.
14. You should see values output when redirected back to the WordPress callback URL.
15. Check if the `state` value in `$_REQUEST` exists and matches the `auth0_state` value in `$_COOKIE`.

	* If it's different, it should match the original value recorded in step #3 above. This means that the `$_COOKIE` state value has changed somewhere in the process.

If none of the steps above resolve the issue, please collect the results of the steps above and [contact support](https://support.auth0.com/) or post on [Community](https://community.auth0.com/tags/wordpress) with the tag `wordpress`. Also include:

- PHP version
- WordPress version
- Auth0 plugin version
- Browser and OS used to test
- A [HAR file](/troubleshoot/guides/generate-har-files) recording the entire process from loading the page with the login form all the way through the "Invalid state" message.

## Related posts:

- ["Invalid state" error during Auth0 WordPress redirect](https://community.auth0.com/t/invalid-state-error-during-auth0-wordpress-redirect/12552/16)
- [Invalid state when visiting the callback URL directly](https://wordpress.org/support/topic/unable-to-resolve-troubleshooting-with-a-client-grant-for-already-exists/)
