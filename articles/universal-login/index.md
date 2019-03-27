---
description: Overview of Universal Login with Auth0
topics:
  - login
  - universal-login
  - password-reset
  - guardian
  - mfa
  - error-pages
  - hosted-pages
contentType: index
toc: true
useCase: customize-hosted-pages
---
# Auth0 Universal Login

Universal Login is Auth0's implementation of the login flow, which is the key feature of an Authorization Server. Each time a user needs to prove its identity, your applications will redirect to Universal Login and Auth0 will do what's needed to guarantee the user's identity. 

This implies that applications do not need to handle security credentials, or know anything about how authentication should be performed. The user will click a login button or link in your application, which will redirect to the `/authorize` route at your Auth0 tenant. If there is no session detected for the end user, Auth0 will prompt them for credentials, or let them login with an Enterprise or social connection. Once the user is authenticated Auth0 will redirect them to your application, along with the corresponding identity tokens.

The login page appearance and behavior is customizable right from the [Dashboard](${manage_url}). The logo and colors of the login pages can be changed, and in more advanced use cases, the code of each page itself can be modified.

For information on the differences between Universal Login and traditional embedded login within your application, see [our comparison guide](/guides/login/universal-vs-embedded).

## Implementing Universal Login

In addition to configuring Universal Login for your tenant's applications, you will also need to set up a connection(s) and set up your application in Auth0's dashboard. You will also need to configure your application's code to call Auth0's `/authorize` endpoint in order to trigger Universal Login, and then to deal with the response.

For step by step instructions on setting up your application to use Universal Login, check out our [Quickstart guides](/quickstarts).

### Simple Customization

![Customization Settings for Login Page](/media/articles/universal-login/settings.png)

In the [Dashboard](${manage_url}), you can see the settings for your login page by navigating to [Universal Login](${manage_url}/#/login_setting) and looking at the Settings tab.

The settings available here are:

* Logo
* Primary Color
* Background Color

These settings, once changed, will take effect on all your Universal Login pages if you have not enabled customization of the pages' code. The settings will also work if you have enabled customization but are using the predefined templates and have not changed those options in the code.

## Choosing an experience

There are two available Experiences in Universal Login. The Classic Experience is the same experience that has been available for quite some time, and it uses Javascript controls for each page. The New Experience does not require Javascript to work, and it offers a simpler and faster experience for end-users. 

The dialog below lets you select which Experience will be used for default, non-customized pages:

<div class="code-picker">
  <div class="languages-bar">
    <ul>
      <li class="active"><a href="#experience-new" data-toggle="tab">New Experience</a></li>
      <li><a href="#experience-classic" data-toggle="tab">Classic Experience</a></li>
    </ul>
  </div>
  <div class="tab-content">
    <div id="experience-new" class="tab-pane active">
      <h3>New Experience Features</h3>
      <ul>
        <li>No JavaScript is required for end-users</li>
        <li>Enhanced multi-factor authentication options</li>
        <li>Modern styling</li>
      </ul>
    </div>
    <div id="experience-classic" class="tab-pane">
      <h3>Classic Experience Features</h3>
      <ul>
        <li>Default UI is based on Auth0's Lock widget</li>
        <li><a href="/universal-login/advanced-customization">Extensive customization options</a> available</li>
        <li>Is no longer receiving new feature updates</li>
      </ul>
    </div>
  </div>
</div>

You can learn more about the [Classic Experience](/universal-login/classic), the [New Experience](/universal-login/new) and its [current limitations](/universal-login/new-experience-limitations).
