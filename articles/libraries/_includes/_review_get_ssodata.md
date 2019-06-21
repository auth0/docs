### Review calls to getSSOData()

The deprecated `getSSOData()` function was reimplemented in Auth0.js v9 to simplify migration from older versions, but the behavior is not exactly the same. 

The function will not work as expected when you use it in Web Applications that use the [Authorization Code Flow](/flows/concepts/auth-code) (such as when you specify `response_type='code'`). It will always return that there is not a current session.

If you want to avoid showing the Lock dialog when there is an existing session in the server, you can use the [checkSession()](/libraries/auth0js#using-checksession-to-acquire-new-tokens) function in Auth0.js.

We recommend that you do not use `getSSOData()` and use [checkSession()](/libraries/auth0js#using-checksession-to-acquire-new-tokens) instead. Note that in order for `checkSession()` to work properly, it requires that you set the **Allowed Web Origins** field in the dashboard.

::: note
Note that `checkSession()` triggers any [rules](/rules) you may have set up, whereas `getSSOData()` does not. It is possible that this could cause unintended behavior depending on what rules you have set up (if any) so you should check on your rules in the [Dashboard](${manage_url}/#/rules) prior to switching methods.
:::

If you are going to keep using `getSSOData()`, take into account the changes in the return values described in the table below. In most applications, the only value that was actually used was the `sso` property, which still has the same semantics. 

| **Property** | **Old Value** | **New Value** |
| --- | --- | --- |
| sso | `true` if user has an existing session, `false` if not | The same |
| sessionClients | List of applications ids the user has active sessions with | List with a single element with the client id configured in auth0.js |
| lastUsedClientId | The client id for the last active connection | The last application used when authenticating from the current browsers |
| lastUsedUserId | The user id for the current session | The same  |
| lastUsedUsername | User's email or name | The same (requires `scope=’openid profile email’)` |
| lastUsedConnection | Last used connection and strategy. | Last connection used when authenticated from the current browser. It will be `null` if the user authenticated via <dfn data-key="universal-login">Universal Login</dfn>. It will not return `strategy`, only `name` |

For the function to work properly, you need to ask for `scope='openid profile email'` when you initialize Auth0.js.
