---
description: Understand how browser changes, such as the samesite cookie attribute, affects your web applications that embed content from third-party domains. 
topics:
  - saml
  - identity-providers
  - oidc
  - cookies
  - samesite
  - google-chrome
  - microsoft-edge
contentType:
  - concept
useCase:
  - third-party-content
  - use-samesite-cookie-attribute
  - maintain-browser-compatiblity
---
# sameSite Cookie Attributes

Cookies, primarily used for authentication and maintaining sessions, can be secured by setting cookie attributes. [Auth0 cookies](https://auth0.com/privacy#cookie-policy) are secured by setting certain attributes. Auth0 uses cookies across origins for many reasons: 

* OIDC Enterprise with `form_post`
* SAML HTTP-POST Binding
* Web message (aka `checkSession`)

`sameSite` is a cookie attribute that acts as a restriction for the browser’s cookie jar telling it to omit sending the associated cookie key+value pair based on the type of interaction that triggered the HTTP request.

Other cookie attributes you are already familiar include:

* `httpOnly` - makes a cookie only be sent with HTTP Requests and not readable using javascript’s document.cookie.

* `secure` - makes the browser only send the cookie to a secure context, “secure” is defined per browser vendor but in reality it means HTTP over TLS (https).

* `max-age / expires` - controls whether the cookie is “session” cookie /dropped when your browser terminates the browsing session/, or one that is “persistent” /persists browsing session termination/.

Aside from cookies set by the browser’s javascript context, these options are provided by the server with its HTTP responses as part of the set-cookie headers, the browser, upon receipt of the responses parses these and maintains its cookie jar according to them.

## `sameSite` attributes changes

Effective around February 2020, Google Chrome (v80) will change its cookie handling. Two things are changing with this planned release:

* Cookies set without `sameSite` attribute will be defaulted to `lax` instead of the current implicit value `none`.

* Cookies set with `sameSite=none` must also be secure or they’ll be rejected to be saved in the browser’s cookie jar. 

The reason for this change is to improve default security and prevent CSRF attacks. 

### Changes Auth0 has made

Auth0 has made changes to the following cookies: 

* `auth0`: User session
* `auth0-mf`: Multi-Factor information
* `did`: Device/User agent identifier

For all the cookies: 
* We will set the `sameSite=None` attribute and the cookie will always require to use HTTPS regardless of the environment.
* We will set a fallback cookie `*_compat` for legacy browsers.

### Changes You Need to Make
To be ready for this change, you should ensure the following: 

* Review the list of [currently unsupported browsers](https://www.chromium.org/updates/same-site/incompatible-client.)
* If you use `form_post`, you must also use `sameSite=none` running on `https://` - no exceptions are being made by Chrome for `localhost`.
* Whenever a cookie `sameSite` attribute has an explicit value set to `none`, it must also be set as secure with an attribute otherwise it will be rejected by the browser. If you use `http://` Callback URLs, these will break if you use those cookies for binding the authorization request state/nonce. These must either be changed to use TLS or use `sameSite=lax`.

## How it works

The diagram below shows what happens during a fresh interaction, the end user requests a page they have not visited before. The server wishes to change the way it renders the next time so it sets a *seen* cookie. The grey part of the set-cookie header is the actual cookie key+value, the red part are all cookie attributes the browser stores internally in its cookie jar to be able to decide later on if it includes the cookie key+value pair in its requests.

![Fresh Interaction](/media/articles/sessions/cookie-fresh-interaction.png)

Now let’s make that request again in the same browsing session.

In the next diagram, a request is being made to the same server and since the cookie attributes do not prohibit the *seen* cookie to be sent it is automatically included as a cookie header in the request. The server can now respond differently based on the fact that such cookie has been received.

![Fresh Interaction](/media/articles/sessions/cookie-return-interaction.png)

The following table describes the `sameSite` attribute values.

| Attribute | Description |
| -- | -- |
| `strict` | Only send the cookie if the user is navigating within the website origin bounds it came from. |
| `lax` | Only send the cookie if the user is navigating within the website origin bounds it came from or if he’s being redirected to it. |
| None | (No sameSite attribute provided option) Unless other conditions (such as other options or  third-party cookies blocked) disqualify the cookie from being sent. |

## Affects 

The table below shows how the `sameSite` attribute changes may affect your apps.

| App Behavior | Affected by Change |
| -- | -- |
| Cookies set as `sameSite=nome` while the website is not `https://` | Yes |
| Cookies don't have explicit `sameSite` attribute value set and are required in a cross-origin context (such as HTTP Form Post, embedding an iframe) | Yes |
| Native apps (everything not cookies + web based) | No (M2M) |
| Already setting an excplicit `sameSite` cookie attribute value | No |
| Different subdomain on the same eTLD+1 (app is on the same eTLD+1 as the custom domain Auth0 tenant) | Potentially |

If you are using a web app with sessions (e.g. for saving user preferences, shopping carts, etc.), and you allow users to sign in using identity providers such as Google, Apple or Auth0, then you rely on cookies to achieve that functionality. There are browser cookie behavior changes that may break your user experience. Google Chrome, for example, is going to be the first browser vendor to roll out a change that might not be compatible with your web application.

You may notice that the Google Chrome and Microsoft Edge specs for setting `sameSite` to undefined has changed from `sameSite` defaulting to `none` to `lax` instead. 

As an example, you are building a new UI and have several services that you proxy to via an Auth0 gateway. At this gateway, you create a cookie session. If you make a cross-origin request, you may see this warning in the js console:

``` text
A cookie associated with a cross-site resource (URL) was set without the SameSite attribute. 
A future release of Chrome will only deliver cookies with cross-site requests if they are 
set with SameSite=None and Secure. You can review cookies in developer tools under 
Application>Storage>Cookies and see more details at 
https://www.chromestatus.com/feature/5088147346030592 and 
https://www.chromestatus.com/feature/5633521622188032
```

Previously, in Auth0, `sameSite` attribute options were listed as `true`, `false`, `strict` or `lax`. If you did not set the attribute, the default would be `false`. Now, we have also added the ability for you to set the attribute to `none`.

## Keep reading

* [Auth0 Privacy & Cookie Policy](https://auth0.com/privacy)
* [Web Apps vs Web APIs/Cookies vs Tokens](/design/web-apps-vs-web-apis-cookies-vs-tokens)
* [Cross-Origin Authentication](/cross-origin-authentication)
* [Manage Users](/users)
* [Session Layers](/sessions/concepts/session-layers)
* [Session Use Cases](/sessions/references/sample-use-cases-sessions)
* [Security](/security)
