::: note
You can provide up to 100 URLs in the **Allowed Callback URLs**, **Allowed Web Origins**, **Allowed Logout URLs**, **Allowed Origins (CORS)** fields.
:::

- **Allowed Callback URLs**: Set of URLs to which Auth0 is allowed to redirect the users after they authenticate. You can specify multiple valid URLs by comma-separating them (typically to handle different environments like QA or testing). For production environments, verify that the URLs do not point to localhost. You can use the star symbol as a wildcard for subdomains (`*.google.com`). Make sure to specify the protocol, `http://` or `https://`, otherwise the callback may fail in some cases.

- **Allowed Web Origins**: List of URLs from where an authorization request, using [`web_message` as the response mode](/protocols/oauth2#how-response-mode-works), can originate from. You can specify multiple valid URLs by comma-separating them. For production environments, verify that the URLs do not point to localhost.

- **Allowed Logout URLs**: After a user logs out from Auth0 you can redirect them with the `returnTo` query parameter. The URL that you use in `returnTo` must be listed here. You can specify multiple valid URLs by comma-separating them.  For production environments, verify that the URLs do not point to localhost. You can use the star symbol as a wildcard for subdomains (`*.google.com`). Notice that querystrings and hash information are not taken into account when validating these URLs. Read more about this at: [Logout](/logout).

- **Allowed Origins (CORS)**: Set of URLs that will be allowed to make requests from JavaScript to Auth0 API (typically used with CORS). This prevents same-origin policy errors when using Auth0 from within a web browser. By default, all your callback URLs will be allowed. This field allows you to enter other origins if you need to. You can specify multiple valid URLs by comma-separating them. For production environments, verify that the URLs do not point to localhost. You can use the star symbol as a wildcard for subdomains (`*.google.com`). Notice that paths, querystrings and hash information are not taken into account when validating these URLs (and may, in fact, cause the match to fail).

- **ID Token Expiration (seconds)**: The amount of time (in seconds) before the Auth0 ID Token expires. The default value is `36000` seconds which is 10 hours.

- **Use Auth0 instead of the IdP to do <dfn data-key="single-sign-on">Single Sign-on</dfn>**: If enabled, this setting prevents Auth0 from redirecting authenticated users with valid [sessions](/sessions) to the identity provider (such as Facebook, ADFS, and so on). **Legacy tenants only.**

![Application Settings Page](/media/articles/applications/settings.png)
