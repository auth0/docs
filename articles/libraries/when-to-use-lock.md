---
section: libraries
description: When customizing the Classic Universal Login page what tools should you use? Lock (Auth0's drop-in authentication widget) or a custom UI built on top of an Auth0 SDK? This guide will help you decide.
topics:
  - libraries
  - lock
  - custom-ui
contentType:
  - concept
useCase:
  - add-login
  - enable-mobile-auth
---
# Universal Login Page Customization

When adding Auth0 to your web apps, the best solution is to use Auth0's <dfn data-key="universal-login">Universal Login</dfn>. If you plan to use the [New Experience](/universal-login/new), you won't even need to choose an Auth0 library to use inside of the login page, and can stop here. If you are using the [Classic Experience](/universal-login/classic), this guide will help you choose a technology to power your login page.

Universal Login is less complex than embedding the authentication process within your app. It also prevents the dangers of cross-origin authentication.

The Classic login page uses the <dfn data-key="lock">Lock Widget</dfn> by default for user authentication. It also has templates for Lock in <dfn data-key="passwordless">Passwordless</dfn> Mode and for a custom UI built with the Auth0.js SDK. 

* [Lock for Web](/libraries/lock), Auth0's drop-in login and signup widget
* The [Auth0 SDK for Web](/libraries/auth0js) with your custom designed interface
* Or, a custom user interface that you have created which directly ties into the [Authentication API](/auth-api).

::: note
<dfn data-key="passwordless">Passwordless authentication</dfn> from native mobile apps currently must use Universal Login - there is no native passwordless option at this time.
:::

## When to Implement Lock vs. a Custom UI

**Lock** is a drop-in authentication widget that provides a standard set of behaviors and a customizable user interface.  

**Auth0 SDKs** are client-side libraries that **do not** come with a user interface but allow for expanded customization of the behavior and appearance of the login page.

The **Authentication API** provides integration without requiring the use of Auth0 SDKs. The best option to choose will depend on the needs of your app.

Below is a quick overview of reasons you might want to use Lock, versus using an Auth0 SDK or the authentication API. There are details about each option (Lock, Auth0 SDKs, Authentication API) below the table, to assist you in finding the right way to implement Auth0 in your application!

<table class="table">
    <thead>
        <tr>
            <th class="text-left"><b>Desired UI Attributes:</b></th>
            <th>Lock</th>
            <th>Custom&nbsp;UI</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Has a simple design that fits in with most modern websites with just a few tweaks to its options.</td>
            <td class="success text-center">Yes</td>
            <td class="danger text-center">No</td>
        </tr>
        <tr>
            <td>Adapts to your configuration and only show the allowable options in the appropriate situations</td>
            <td class="success text-center">Yes</td>
            <td class="danger text-center">No</td>
        </tr>
        <tr>
            <td>Chooses the correct connection automatically</td>
            <td class="success text-center">Yes</td>
            <td class="danger text-center">No</td>
        </tr>
        <tr>
            <td>Remembers the last used connection for a given user</td>
            <td class="success text-center">Yes</td>
            <td class="danger text-center">No</td>
        </tr>
        <tr>
            <td>Automatically accommodates internationalization</td>
            <td class="success text-center">Yes</td>
            <td class="danger text-center">No</td>
        </tr>
        <tr>
            <td>Automatically provides password policy checking at signup</td>
            <td class="success text-center">Yes</td>
            <td class="danger text-center">No</td>
        </tr>
        <tr>
            <td>Provide secure authentication via Auth0</td>
            <td class="success text-center">Yes</td>
            <td class="success text-center">Yes</td>
        </tr>
        <tr>
            <td>Potential to provide auth without having to create custom code to deal directly with Auth0's API</td>
            <td class="success text-center">Yes</td>
            <td class="success text-center">Yes</td>
        </tr>
        <tr>
            <td>Follows strict appearance requirements as set by your company</td>
            <td class="danger text-center">No</td>
            <td class="success text-center">Yes</td>
        </tr>
        <tr>
            <td>Allows you to retain your existing UI for authentication</td>
            <td class="danger text-center">No</td>
            <td class="success text-center">Yes</td>
        </tr>
        <tr>
            <td>Allows for expert usage of HTML, CSS, and JavaScript for customization</td>
            <td class="danger text-center">No</td>
            <td class="success text-center">Yes</td>
        </tr>
        <tr>
            <td>Handles multiple databases or Active Directory connections</td>
            <td class="danger text-center">No</td>
            <td class="success text-center">Yes</td>
        </tr>
    </tbody>
</table>

## Lock

**Lock** is a login form that makes it easy for your users to authenticate using a selected connection. **Lock** will automatically handle most of the details involved in creating and authenticating users. [Lock](/libraries/lock) is provided as a drop-in solution for the Classic Universal Login experience.

![](/media/articles/libraries/lock/lock-default.png)

With **Lock**, you will be implementing a UI that:

* Is robust and provides an excellent user experience on any device with any resolution
* Has a simple design that fits in with most websites with just a few tweaks to its custom color
* Adapts to your configuration, displaying the appropriate form controls for each available connection and only those which are allowed (such as sign up or password reset)
* Selects the correct connection automatically. You may specify a desired default behavior for ambiguous cases
* Remembers the last used connection for a given user
* Automatically accommodates internationalization
* Provides instant password policy checking at sign up

Although you cannot alter Lock's behavior significantly, you can configure several [basic options](/libraries/lock/customization) to make Lock look and behave differently.

![](/media/articles/libraries/lock/lock-phantom.png)

### When to use Lock

Consider using **Lock** if:

* You like the structure, look, and feel of **Lock**
* You prefer a quicker and easier implementation of Auth0 and a ready-made responsive UI
* Your process includes many of the use cases that **Lock** handles out of the box:
  * Enterprise logins
  * Databases with password policies
  * User signup and password reset
  * Authentication using social providers
  * Avatars

## Custom User Interface

If the requirements of your app cannot be met by the standardized behavior of **Lock**, or if you have a complex custom authentication process, a custom user interface is needed. You also might prefer this option if you already have a user interface which you would prefer to keep.

With Auth0's library for [Web](/libraries/auth0js), you can customize the behavior and flow of the process used to trigger signup and authentication. You can also directly use the [Authentication API](/auth-api), without any wrapper at all, if you so choose.

![](/media/articles/libraries/lock-vs-customui/customui.png)

Unlike with **Lock**, neither of these options includes a user interface. You will have complete control over the user experience for signup and authentication flow, and for the UI aspects of layout, look and feel, branding, internationalization, RTL support, and more.

### When to use a custom user interface

Consider implementing a custom user interface in conjunction with an Auth0 library or the Authentication API for your app if:

* You have strict requirements for the appearance of the user interface
* You have strict requirements for file sizes - the Auth0 libraries are significantly smaller than Lock, and if you instead choose to deal with the API directly, that would not require any additional weight.
* You are comfortable with HTML, CSS, and JavaScript - you'll be creating your own UI
* You only need to handle username/password and social provider authentication
* You have multiple database or Active Directory Connections

## See Also

You can also see specific examples of the usage of both Lock and Auth0 SDKs for a wide variety of programming languages and platforms in our [Quickstarts](/quickstart). These guides may further assist you in your decision about which to use for your specific app needs.
