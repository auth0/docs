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

# Troubleshooting invalid state in Login by Auth0

We added state validation to the WordPress plugin in [version 3.6.0](https://github.com/auth0/wp-auth0/releases/tag/3.6.0). This security measure helps mitigate CSRF attacks by ensuring that the response belongs to a request that was initiated by the same user ([more information on state validation here](https://auth0.com/docs/protocols/oauth2/oauth-state)).

It works in the plugin by:

1. Setting an `auth0_state` cookie in the browser via JS when the Lock login form is shown (on `wp-login.php` or any other page when using a shortcode or widget).
2. Passing that value to the Lock embedded login form so it can be sent with the authentication request.
3. Receiving that value back from Auth0 unchanged in a `state` URL parameter if the Auth0 login was successful.
4. Validating the that value received matches the value sent and stored in the `auth0_state` cookie. If it's valid, then the login process continues. If not, the process stops and an "Invalid state" error message is shown.
5. Deleting the cookie, regardless of validity.
6. Using values in the base64 decoded object to redirect or perform other login actions, if valid.

This process should be completely opaque to both the logging-in user and the site admin. The Auth0 server does not validate or require a state value and returns it untouched to the callback URL. If the "Invalid state" message is seen, then one of the first 4 steps above is not happening.

A few common causes of this error:
- The most common way that this process fails is is when the callback URL (typically `https://yoursite.com/index.php?auth0=1` but may be slightly different based on your setup) is cached on the server. Remove caching from all the URLs listed in the "Allowed Callback URLs" field for your Application in the Auth0 dashboard and test again. If that does not solve the issue, continue with the troubleshooting steps below.
- If you refresh the page after seeing a different error message (email verification, etc), the "Invalid state" message will appear as it's trying to revalidate an already used value. This is expected.
- Some hosts, like Pantheon, require specific cookie names to be used. You can alter the cookie name using the [`auth0_state_cookie_name`](/cms/wordpress/extending#auth0_state_cookie_name) filter (see the [issue here](https://github.com/auth0/wp-auth0/issues/494) and [fix here](https://github.com/auth0/wp-auth0/pull/495)) in your theme or a custom plugin.
- If your site is using the Universal Login Page and you're building the link yourself in a theme or plugin, you need to set a cookie called `auth0_state` with a randomly-generated value and send that value in a `state` URL parameter. Alternatively, you can turn on Settings > Features tab > Universal Login Page and redirect login requests to the `wp-login.php` page where that cookie and URL parameter will be set automatically. The code that runs this process is [here](https://github.com/auth0/wp-auth0/blob/master/lib/WP_Auth0_LoginManager.php#L90) if you want to continue to use a custom-built `/authorize` URL.
- If you visit your callback URL (typically `yourdomain.com/index.php?auth0=1`) directly or a second time after the authorization code has been exchanged, this error might display, indicating that the state has already been verified and deleted.

Note that some of the steps below will require the login process to be broken during the process (marked as such):

1. While logged out of WordPress and Auth0, visit the login page being tested.
2. Check that the `auth0_state` cookie is being set (in Chrome, View > Developer > JavaScript Console > Application tab > Storage on the left > Cookies > domain being tested, look for an `auth0_state` cookie with a non-empty value). If this value is not set, check for errors in the JS console and that your browser can accept cookies (login will not work without cookies). This is set in `/assets/js/lock-init.js` ([code on GitHub](https://github.com/auth0/wp-auth0/blob/master/assets/js/lock-init.js#L22))
3. If the value is set, copy the value and view the source code of the page (in Chrome, View > Developer > View Source). Search for that value in the code and it should appear in JavaScript as the value of `wpAuth0LockGlobal.auth.settings.state` ([sample JSON](https://gist.github.com/joshcanhelp/1b8bb990048325eb7214e2b3d7136b78)). Make a note of this value by copying and pasting into a text file.
4. If the value appears there and the Lock form is loading normally then steps 1 and 2 from the first list above are functioning properly. Before logging in, add [this snippet](https://gist.github.com/joshcanhelp/ba98f748747c7fd2ecdf54e73c6110f3) to the top of your `wp-config.php`. **WARNING**: This will break login for the WordPress site being tested so use it only on a non-production install.
5. Log in normally and when you're redirected back to your site's callback URL, the process will stop and you should see an output like what's shown in the linked Gist in step #4 above. If you see something like `Array()` with no additional values, then one of two things could be happening:
  - The WordPress callback URL is cached. Page caching can happen in many different ways so there are not explicit steps we can provide here. Check any caching plugins you may have installed, they usually have some kind of URL exclusion built-in. Also check with your host as caching may be automatic and require support involvement.
  - The server is not reading the Auth0 cookie. See the [issue here](https://github.com/auth0/wp-auth0/issues/494) and [fix here](https://github.com/auth0/wp-auth0/pull/495) for a possible solution.
6. If the values are present, check the response headers for the callback URL being loaded (in Chrome, View > Developer > JavaScript Console > Network tab, click the first "document" listed with a 500 status and look for "Response Headers"). We're looking for any evidence of caching here, like a `Cache-Control` with a non-zero `max-age`, an `x-cache` of something other than `MISS`, or any other clue that this page is being served from a cache.
8. Also in the response headers, check that `set-cookie` includes a directive like `auth0_state=deleted` so we know the validation process is happening.  
9. Make sure that the `state` parameter in the URL matches the one recorded from the cookie being set in step #3 above.
10. If there is no evidence of caching, remove the debugging snippet from `wp-config.php` and refresh the callback URL. You should see the "Invalid state" message again. If any caching changes were made, attempt the login process all the way through (make sure to clear your cookies and browser cache for the site before testing).
11. **Note**: The remainder of the troubleshooting steps will require changes to the plugin that will break the login process and need to be rolled back once complete. These should be done on a test or staging server.
12. Next, we need to check why the state is coming in but does not match the stored value. In `lib/WP_Auth0_LoginManager.php`, output the values of the stored and returned state and kill the process after. Just before [this line](https://github.com/auth0/wp-auth0/blob/master/lib/WP_Auth0_LoginManager.php#L148), add `echo '<h1>$_REQUEST</h1>'; var_dump($_REQUEST); echo '<h1>$_COOKIE</h1>'; var_dump($_COOKIE); die('<h1>Done</h1>');`. Once again, make sure you're logged out and walk through the login process completely again. You should see values output when redirected back to the WordPress callback URL. Check that the `state` value in `$_REQUEST` exists and matches the `auth0_state` value in `$_COOKIE`. If it's different, it should match the original value recorded in step #3 above. This means that the `$_COOKIE` state value has changed somewhere in the process.

If none of the steps above resolve the issue, please collect the results of the steps above and [contact support](https://support.auth0.com/) or post on [Community](https://community.auth0.com/tags/wordpress) with the tag `wordpress`. Also include:

- PHP version
- WordPress version
- Auth0 plugin version
- Browser and OS used to test
- A [HAR file](https://support.zendesk.com/hc/en-us/articles/204410413-Generating-a-HAR-file-for-troubleshooting) recording the entire process from loading the page with the login form all the way through the "Invalid state" message.

## Related posts:

- ["Invalid state" error during Auth0 WordPress redirect](https://community.auth0.com/t/invalid-state-error-during-auth0-wordpress-redirect/12552/9)
- [Invalid state when visiting the callback URL directly](https://wordpress.org/support/topic/unable-to-resolve-troubleshooting-with-a-client-grant-for-already-exists/)
