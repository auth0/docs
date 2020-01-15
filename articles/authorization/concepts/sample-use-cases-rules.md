---
description: Learn how to use rules with roles-based access control (RBAC). For use with our Authorization Core feature set.
toc: true
topics:
  - authorization
  - authorization-extension
  - rbac
  - roles
  - permissions
  - policies
  - rules
contentType: 
    - concept
useCase:
  - build-an-app
  - call-api
  - secure-api
---
# Sample Use Cases: Rules with Authorization

With [rules](/rules), you can modify or complement the outcome of the decision made by the pre-configured [authorization policy](/authorization/concepts/policies) to handle more complicated cases than is possible with [role-based access control (RBAC)](/authorization/concepts/rbac) alone. Based on the order in which they run, rules can change the outcome of the authorization decision prior to the permissions being added to the <dfn data-key="access-token">Access Token</dfn>. They can also allow you to customize the content of your tokens.

## Allow access only on weekdays for a specific application

Let's say you have an application that you want to make sure is only accessible during weekdays. To do this, you would [create the following rule](/dashboard/guides/rules/create-rules):

```js
function (user, context, callback) {

  if (context.clientName === 'APP_NAME') {
    const d = Date.getDay();

    if (d === 0 || d === 6) {
      return callback(new UnauthorizedError('This app is only available during the week.'));
    }
  }

  callback(null, user, context);
}
```

If a user attempts to access the application during the weekend, access will be denied, even if they authenticate and have the appropriate privileges.

## Allow access only to users who are inside the corporate network

Let's say you want to allow access to an application, but only for users who are accessing the application from inside your corporate network. To do this, you would [create the following rule](/dashboard/guides/rules/create-rules):

```js
function (user, context, callback) {
  const ipaddr = require('ipaddr.js');
  const corp_network = "192.168.1.134/26";
  const current_ip = ipaddr.parse(context.request.ip);

  if (!current_ip.match(ipaddr.parseCIDR(corp_network))) {
    return callback(new UnauthorizedError('This app is only available from inside the corporate network.'));
  };

  callback(null, user, context);
}
```

If the user is outside the corporate network, they will be denied access even if they successfully authenticate and have the appropriate privileges.

## Add user roles to tokens

If you [enable RBAC for APIs](/dashboard/guides/apis/enable-rbac) and set the **Token Dialect** appropriately, you will receive user permissions in your Access Tokens. To add user <dfn data-key="role">roles</dfn> to tokens, you would use the `context.authorization` object when you [create the following rule](/dashboard/guides/rules/create-rules):

```js
function (user, context, callback) {
  const namespace = 'http://demozero.net';
  const assignedRoles = (context.authorization || {}).roles;

  let idTokenClaims = context.idToken || {};
  let accessTokenClaims = context.accessToken || {};

  idTokenClaims[`<%= "${namespace}" %>/roles`] = assignedRoles;
  accessTokenClaims[`<%= "${namespace}" %>/roles`] = assignedRoles;

  context.idToken = idTokenClaims;
  context.accessToken = accessTokenClaims;

  callback(null, user, context);
}

```

## Manage Delegated Administration Extension roles using the Authorization Core feature set

Although the [Delegated Administration Extension (DAE)](/extensions/delegated-admin) and the Authorization Core feature set are completely separate features, you can use the Authorization Core feature set to create and manage roles for the DAE if you use a rule.

1. [Create DAE roles](/dashboard/guides/roles/create-roles) using the Authorization Core feature set. 

The names of the roles you create must match the names of the [pre-defined DAE roles](/extensions/delegated-admin#assign-roles-to-users).

2. [Assign the DAE roles you created to the appropriate users](/dashboard/guides/users/assign-roles-users) using the Authorization core feature set.

3. Add user roles to the DAE namespace in the ID Token. To do so, [create the following rule](/dashboard/guides/rules/create-rules), remembering to replace the `CLIENT_ID` placeholder value with your application's Client ID:

```js
function (user, context, callback) {
    if (context.clientID === 'CLIENT_ID') {
        const namespace = 'https://example.com/auth0-delegated-admin';
        context.idToken[namespace] = {
            roles: (context.authorization || {}).roles
        };
    }
    callback(null, user, context);
}
```

::: note
Your claim should be [namespaced](/tokens/guides/create-namespaced-custom-claims).
:::

## Keep reading

- [Rules for Authorization Policies](/authorization/concepts/authz-rules)
- [How to Use Auth0's Core Authorization Feature Set](/authorization/guides/how-to)
- [Troubleshooting: Role-Based Access Control and Authorization](/authorization/concepts/troubleshooting)
