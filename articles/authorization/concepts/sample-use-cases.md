---
description: Learn how to implement roles-based authorization (RBAC) in different scenarios and explore how to use rules with RBAC.
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
# Sample Use Cases: Role-Based Access Control and Rules with Authorization

## Role-based access control

Let's take a look at an example of why you might need and how you could use [role-based access control (RBAC)](/authorization/concepts/rbac) in your authorization flow.

Let's say you are a business who provides business-to-business software-as-a-service to non-profit organizations. Your product allows non-profits to create, manage, and market products to potential donors. Your application contains several different modules, two of which are:

* a gift shop point of sale (POS) module that enables non-profits to effectively create pop-up teeshirt shops and manage their sales. 
* a marketing module that allows non-profits to create and distribute newsletters to their donors.

You want to use Auth0 to control the access of your non-profit customers to different parts of your application. Without RBAC, all non-profit employees and volunteers will have access to all features of your application, which is not ideal, especially since one of them is an animal rescue who has a variety of volunteers with knowledge of only the area in which they volunteer.

Instead, you implement RBAC, creating some permissions that users of your gift shop POS module would need:

* `read:catalog-item`
* `read:customer-profile`
* `create:invoice`

And to make these easier to manage, you create a role called `Gift Shop Manager` and assign these permissions to that role.

Similarly, you create permissions for users of your marketing module, which include:

* `create:newsletter`
* `edit:newsletter`
* `delete:newsletter`
* `send:newsletter`
* `edit:distribution-list`

And you create a role called `Newsletter Admin` and assign these permissions to that role.

Now, when your animal rescue brings in their volunteer, Astrid, to run their pop-up teeshirt shop, Astrid can be assigned the role of `Gift Shop Manager`. When you assign this role to Astrid, she is granted all the permissions that you assigned to that role. Since Astrid knows nothing about publishing newsletters (and isn't the best with email), you never assigned her the `Newsletter Admin` role, so she never has access to the marketing module.
 
From a more technical perspective, when Astrid logs into your product, Auth0 authenticates and authorizes her and includes the permissions in the returned Access Token. Then, your product inspects the token to learn which module to display to Astrid.

By using Auth0's RBAC, you avoid building and maintaining separate authorization systems; instead, you use the token you already receive during authorization. And when Astrid moves away or decides she is tired of running the gift shop and would rather coordinate the foster program, you can easily remove the `Gift Shop Manager` role from her and assign her a new role.

And if maintaining the roles and permissions for all of your customers becomes too unwieldy, you can also use the Auth0 API to create a module within your product that allows customers to manage their own RBAC, thereby reducing liability and cutting staffing costs.

## Rules with authorization

With rules, you can modify or complement the outcome of the decision made by the pre-configured [authorization policy](/authorization/concepts/policies) to handle more complicated cases than is possible with [role-based access control (RBAC)](/authorization/concepts/rbac) alone. Based on the order in which they run, rules can change the outcome of the authorization decision prior to the permissions being added to the Access Token. They can also allow you to customize the content of your tokens.

### Allow access only on weekdays for a specific application

Let's say you have an application that you want to make sure is only accessible during weekdays. To do this, you would create the following rule:

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

If it is weekend, a user will be denied access to the specified application even if they successfully authenticate.

### Allow access to users who have recently changed their password

Let's say you want to allow access, but only for users who have changed their password within the last month. To do this, you would create the following rule:

```js
function (user, context, callback) {
  function daydiff (first, second) {
    return (second-first)/(1000*60*60*24);
  }

  const last_password_change = user.last_password_reset || user.created_at;

  if (daydiff(new Date(last_password_change), new Date()) > 30) {
    return callback(new UnauthorizedError('Please change your password.'));
  }
  callback(null, user, context);
}
```

If the user has not changed their password within 30 days, they will be denied access even if they successfully authenticate.

## Add user roles to tokens

If you [enable RBAC for APIs](/authorization/guides/enable-rbac) and set the **Token Dialect** appropriately, you will receive user permissions in your Access Tokens. To add user roles to tokens, you would use the `context.authorization` object in the following rule:

```js
function (user, context, callback) {
  const namespace = 'http://demozero.net';
  const assignedRoles = (context.authorization || {}).roles;

  let idTokenClaims = context.idToken || {};
  let accessTokenClais = context.accessToken || {};

  idTokenClaims['${namespace}/roles'] = assignedRoles;
  accessTokenClaims['${namespace}/roles'] = assignedRoles;

  context.idToken = idTokenClaims;
  context.accessToken = accessTokenClaims;
  callback(null, user, context);
}

```

## Keep reading

- [Role-Based Access Control (RBAC)](/authorization/concepts/rbac)
- [Rules for Authorization Policies](/authorization/concepts/authz-rules)
- [How to Use Auth0's Core Authorization Feature Set](/authorization/guides/how-to)