---
title: Rules
description: This tutorial will show you how to use Auth0 rules to extend what Auth0 has to offer.
---

::: panel-info System Requirements
This tutorial and seed project have been tested with the following:

* Java 1.8
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

Rules are one of the cool features of Auth0. The reason is their flexibility, which gives you the ability to extend what Auth0 has to offer. They are just JavaScript functions which work like middlewares. To see a detailed description, please refer to [the Rules documentation](/rules).

## Create a rule

To create a rule go to the [Create Rule page](${uiURL}/#/rules/new). You can create it from scratch or use an existing template. These templates are written by Auth0 team to assist you complete common tasks. 

Let's create a rule to implement some basic role-based authorization. If the user logs in using a `@gmail.com` or a `@auth0.com` email, the user will be assigned the `ROLE_ADMIN` role, otherwise the user will be assigned the `ROLE_USER` role. We will print some text on screen to see how this works. 

The template you can use for this example is called `Set roles to a user`.

In our example we use this script:

${snippet(meta.snippets.rulesSetRoles)}

Once you are done, save the rule.

**NOTE**: Keep in mind that this is just a starting template, you can edit it to meet your business needs. 

## Retrieve the role

The web app will read this information from the `UserProfile` and apply the granted authorities when checking authorization access to secured endpoints configured with Role based permissions.

To do thi, edit the `/src/main/java/com/auth0/example/AppConfig.java` by replacing this:

```java
.antMatchers("/portal/**").hasAuthority("ROLE_ADMIN")
```

with this:

```java
.antMatchers("/portal/**").hasAnyAuthority("ROLE_USER", "ROLE_ADMIN")
```


## Display result

Let's display some info to see that our rule actually works. 


**WAITING ON FEEDBACK**

Edit the `src/main/webapp/WEB-INF/jsp/login.jsp`. We need to add the `roles` scope so we can retrieve this information.

Replace this:

```html
scope: 'openid user_id name nickname email picture'
```

with this:

```html
scope: 'openid roles user_id name nickname email picture'
```

**WAITING ON FEEDBACK**

Add the following code at the `src/main/webapp/WEB-INF/jsp/home.jsp`, inside your `jumbotron` div:

${snippet(meta.snippets.rulesHomeJsp)}

That's all the changes we need. Let's test this!


## Test the rule

Once you login, depending on the email you used, you should see one of the two texts we configured.

![Role rule sample](/media/articles/java/rule-role.png)


## Done!

You have implemented a rule for your application! 

This is just one of the tons of cool things we can do with rules. Go ahead and create any rule that fits your needs.


## Optional: Create a demo resource

In order to demonstrate the Role based authorization, let's create a resource which only an authenticated and authorized User with Admin rights can access.

**NOTE:** This is an optional step, used for demonstration purposes, you can skip it.

Create a new `AdminService.java` under `/src/main/java/com/auth0/example`. Paste the following code:

${snippet(meta.snippets.rulesAdminService)}

Let's edit our `HomeController.java` to use this AdminService resource. We will autowire the AdminService resource, create a new `adminChecks` method and invoke it from the `HomeController`. 

Paste the following code:

${snippet(meta.snippets.rulesHomeController)}

Run the app and check that the logger displays the *Current user accessed Admin secured resource* message.
