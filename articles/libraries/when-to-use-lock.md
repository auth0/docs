---
section: libraries
description: When should you use Lock, Auth0's drop-in authentication widget, and when should you use a custom UI with an Auth0 Library? This page will help you decide.
---

# Lock vs. a Custom UI

When adding Auth0 to your web apps, you have the option to implement either:

* Lock, Auth0's drop-in login and signup widget
  * [Lock for Web](/libraries/lock)
  * [Lock for iOS](/libraries/lock-ios)
  * [Lock for Android](/libraries/lock-android)
* One of our libraries (along with a custom interface)
  * [Auth0 SDK for Web](/libraries/auth0js)
  * [Auth0 SDK for iOS](/libraries/auth0-swift)
  * [Auth0 SDK for Android](/libraries/auth0-android)
* Or, a custom user interface that you have created directly tying into the [Authentication API](/auth-api).

**Lock** is a drop-in authentication widget that provides a standard set of behaviors and a customizable user interface. The Auth0 Libraries are client-side libraries that *do not* come with a user interface but allow for expanded customization of the behavior and appearance of the login. The **Authentication API** provides integration without requiring the use of Auth0 libraries. The best option to choose will depend on the needs of your app.

### When to Implement Lock vs. a Custom UI

<table class="table">
    <thead>
        <tr>
            <th align="left"><b>Desired UI Attributes:</b></th>
            <th>Lock</th>
            <th>Custom&nbsp;UI</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Has a simple design that fits in with most modern websites with just a few tweaks to its options.</td>
            <td class="success" align="center">Yes</td>
            <td class="danger" align="center">No</td>
        </tr>
        <tr>
            <td>Adapts to your configuration and only show the allowable options in the appropriate situations</td>
            <td class="success" align="center">Yes</td>
            <td class="danger" align="center">No</td>
        </tr>
        <tr>
            <td>Chooses the correct connection automatically</td>
            <td class="success" align="center">Yes</td>
            <td class="danger" align="center">No</td>
        </tr>
        <tr>
            <td>Remembers the last used connection for a given user</td>
            <td class="success" align="center">Yes</td>
            <td class="danger" align="center">No</td>
        </tr>
        <tr>
            <td>Automatically accommodates internationalization</td>
            <td class="success" align="center">Yes</td>
            <td class="danger" align="center">No</td>
        </tr>
        <tr>
            <td>Automatically provides password policy checking at signup</td>
            <td class="success" align="center">Yes</td>
            <td class="danger" align="center">No</td>
        </tr>
        <tr>
            <td>Follows strict appearance requirements as set by your company</td>
            <td class="danger" align="center">No</td>
            <td class="success" align="center">Yes</td>
        </tr>
        <tr>
            <td>Allows for expert usage of HTML, CSS, and JavaScript.</td>
            <td class="danger" align="center">No</td>
            <td class="success" align="center">Yes</td>
        </tr>
        <tr>
            <td>Adapts to a simpler process for username/password and social provider authentication</td>
            <td class="danger" align="center">No</td>
            <td class="success" align="center">Yes</td>
        </tr>
        <tr>
            <td>Handles multiple databases or Active Directory connections</td>
            <td class="danger" align="center">No</td>
            <td class="success" align="center">Yes</td>
        </tr>
    </tbody>
</table>

## Lock

**Lock** is an embeddable login form that makes it easy for your users to authenticate using a selected connection. **Lock** will automatically handle most of the details involved in creating and authenticating users. Lock is provided as a drop-in solution for [Web](/libraries/lock), as well as for native [iOS](/libraries/lock-ios) or [Android](/libraries/lock-android) apps.

![](/media/articles/libraries/lock/lock-default.png)

With **Lock**, you will be implementing a UI that:

* Is robust and provides an excellent user experience on any device with any resolution
* Has a simple design that fits in with most websites with just a few tweaks to its custom color
* Adapts to your configuration, displaying the appropriate form controls for each available connection and only those which are allowed (such as sign up or password reset)
* Selects the correct connection automatically. You may specify a desired default behavior for ambiguous cases
* Remembers the last used connection for a given user
* Automatically accommodates internationalization
* Provides instant password policy checking at sign up

Although you cannot alter Lock's behavior, you can configure several [basic options](/libraries/lock/customization).

### When to Use Lock

Consider using **Lock** if:

* You like structure, look, and feel of **Lock**
* You prefer an easier implementation
* Your process includes many of the use cases that **Lock** handles out of the box, such as Enterprise logins, databases with password policies, sign up and password reset, authentication with social providers, and avatars
* You want a login form that can be reused in multiple areas

## Custom User Interface

If the requirements of your app cannot be met by the standardized behavior of **Lock**, or if you have a complex custom authentication process, a custom user interface is needed.

With Auth0's library for [Web](/libraries/auth0js), or with native libraries for [iOS](/libraries/auth0-swift) or [Android](/libraries/auth0-android), you can customize the behavior and flow of the process used to trigger signup and authentication. You an also go directly to the [Authentication API](/auth-api), without any wrapper at all.

![](/media/articles/libraries/lock-vs-customui/customui.png)

Unlike with **Lock**, neither of these options includes a user interface. You will have complete control over the user experience for sign up and authentication flow, and for the UI aspects of layout, look and feel, branding, internationalization, RTL support, and more.

### When to Use a Custom User Interface

Consider implementing a custom user interface in conjunction with an Auth0 library or the Authentication API for your app if:

* You have strict requirements for the appearance of the user interface
* You are comfortable with HTML, CSS, and JavaScript
* You only need to handle username/password and social provider authentication
* You have multiple database or Active Directory Connections

## See also

* [What is SSO](/sso)
* [Single Sign On with username/password logins](/sso/sso-username-password)
