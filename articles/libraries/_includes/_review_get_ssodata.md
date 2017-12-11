### Review calls to getSSOData()

The deprecated `getSSOData()` function was reimplemented in Auth0.js v9 to simplify migration from older versions, but the behavior is not exactly the same. 

We recommend that you don’t use `getSSOData()` for new code and use [checkSession](/libraries/auth0js#using-checksession-to-acquire-new-tokens) instead.

If you are going to keep using `getSSOData()` take into account the changes in the return values described in the table below. In most applications the only value that was actually used was the ‘sso’ property, which still has the same semantics. 

| **Property** | **Old Value** | **New Value** |
| --- | --- | --- |
| sso | `true` if user has an existing session, `false` if not | The same |
| sessionClients | List of clients ids the user has active sessions with | List with a single element with the client id configured in auth0.js |
| lastUsedClientId | The client id for the last active connection | The last client used when authenticating from the current browsers |
| lastUsedUserId | The user id for the current session | The same  |
| lastUsedUsername | User's email or name | The same (requires `scope=’openid profile email’)` |
| lastUsedConnection | Last used connection and strategy. | Last connection used when authenticated from the current browser. It will be `null` if the user authenticated with the Hosted Login Page. It will not return `strategy`, only `name` |

In order for the function to work properly, you need to ask for `scope='openid profile email'` when you initialize Auth0.js.
