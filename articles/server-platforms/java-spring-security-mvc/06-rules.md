---
title: Rules
description: This tutorial will show you how to use Auth0 rules to extend what Auth0 has to offer.
---

::: panel-info System Requirements
This tutorial and seed project have been tested with the following:

* Java 1.7
* Maven 3.3
:::

<%= include('../../_includes/_package', {
githubUrl: 'https://github.com/auth0-samples/auth0-spring-security-mvc-sample/tree/master/06-Rules',
pkgOrg: 'auth0-samples',
pkgRepo: 'auth0-spring-security-mvc-sample',
pkgBranch: 'master',
pkgPath: '06-Rules',
pkgFilePath: null,
pkgType: 'none'
}) %>

Rules are one of the cool features of Auth0. The reason is their flexibility, which gives you the ability to extend what Auth0 has to offer. They are just JavaScript functions which work like middlewares. To see a detailed description, please refer to [the full documentation](https://auth0.com/docs/rules).

### Create a rule

To create a rule just go to [rule new page](https://manage.auth0.com/#/rules/new). You can create it from scratch or use an existing template. These templates are written by Auth0 team to assist you complete common tasks. 

Let's create a rule to implement some very basic role-based authorization. If the user logs in using a `@gmail.com` or a `@auth0.com` email, the user will be considered to have the `ROLE_ADMIN`, otherwise the user will be considered to have the `ROLE_USER`. We will print some text on screen to see that this works. 

The template you can use for this example is called `Set roles to a user`.

Once you are done, save the rule. In our example we are using this script:

```javascript
function (user, context, callback) {
    user.app_metadata = user.app_metadata || {};
    // You can add a Role based on what you want
    // Here, we simply check domain
    var addRolesToUser = function(user, cb) {
        if (user.email.indexOf('@gmail.com') > -1) {
            cb(null, ['ROLE_ADMIN']);
        } else if (user.email.indexOf('@auth0.com') > -1) {
            cb(null, ['ROLE_ADMIN']);
        } else {
            cb(null, ['ROLE_USER']);
        }
    };

    addRolesToUser(user, function(err, roles) {
        if (err) {
            callback(err);
        } else {
            user.app_metadata.roles = roles;
            auth0.users.updateAppMetadata(user.user_id, user.app_metadata)
                .then(function(){
                callback(null, user, context);
                })
                .catch(function(err){
                    callback(err);
                });
        }
    });
}
```

This is just a starting template, you can edit it to meet your business needs. 

Our Spring Security Sample app will read this information from the `UserProfile` and apply the granted authorities when checking authorization access to secured endpoints configured with Role based permissions.

Edit the `AppConfig.class` by replacing this:

```java
.antMatchers("/portal/**").hasAuthority("ROLE_ADMIN")
```

with this:

```java
.antMatchers("/portal/**").hasAnyAuthority("ROLE_USER", "ROLE_ADMIN")
```

Edit the `src/main/webapp/WEB-INF/jsp/login.jsp`. We need to add the `roles` scope so we can retrieve this information.

Replace this:

```html
scope: 'openid user_id name nickname email picture'
```

with this:
```html
scope: 'openid roles user_id name nickname email picture'
```

Let's print some text to verify functionality. Add the following code at the `src/main/webapp/WEB-INF/jsp/home.jsp`, inside your `jumbotron` div:

```html
<p class="lead">
    <sec:authorize access="hasRole('ADMIN')">
        <label>This line is only visible if you have ROLE_ADMIN</label>
    </sec:authorize>
</p>
<p class="lead">
    <sec:authorize access="hasRole('USER')">
        <label>This line is only visible if you have ROLE_USER</label>
    </sec:authorize>
</p>
```

That's all the changes we need. Let's proceed with testing.


### Test rule result

Once you login, depending on the email you used, you should see one of the two texts we configured.

![Role rule sample](/media/articles/java/rule-role.png)


### Done!
You have implemented the usage of rule for your application.   
This is just one of the tons of cool things we can do with rules. Go ahead and create any rule that fits your needs.
