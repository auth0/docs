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

Auth0's Universal Login is the most secure way to authenticate users for your applications. Universal Login centers around your Auth0 login page. The appearance and behavior of the login page is customizable right from the [Dashboard](${manage_url}/#/login_settings). The logo and colors of the login page can be changed, and when using the Classic Experience, the code of the page itself can be modified.

In the Universal Login flow, the user will click a login button or link in your application, which will redirect to the `/authorize` route at the Auth0. If there is no session detected for the end user, Auth0 will redirect them to the login page, where they will be able to login or signup using the connections you have already configured, such as a database or social connection(s). Once the user is authenticated (or if they were already signed in) Auth0 will redirect them to your application, along with the requisite credentials.

::: note
If the incoming authentication request includes a `connection` parameter that uses an external identity provider (such as a social provider), the login page will not display. Instead, Auth0 will direct the user to the [identity provider's](/identityproviders) login page.
:::

For information on the differences between Universal Login and traditional embedded login within your application, see [our comparison guide](/guides/login/universal-vs-embedded).

## Implementing Universal Login

In addition to configuring Universal Login for your tenant's applications, you will also need to set up a connection(s) and set up your application in Auth0's dashboard. You will also need to configure your application's code to call Auth0's `/authorize` endpoint in order to trigger Universal Login, and then to deal with the response.

For step by step instructions on setting up your application to use Universal Login, check out our [Quickstart guides](/docs/quickstart).

### Simple customization

![Customization Settings for Login Page](/media/articles/universal-login/settings.png)

In the [Dashboard](${manage_url}), you can see the settings for your login page by navigating to [Universal Login](${manage_url}/#/login_setting) and looking at the Settings tab.

The settings available here are:

* Logo
* Primary Color
* Background Color

These settings, once changed, will take effect on your Universal Login page regardless of whether you use the Classic Experience or the New Experience. The settings will also work if you use the Classic Experience and have enabled customization, as long as you are using the predefined templates and have not changed those options directly in the code. These settings will also modify the appearance of other related pages such as Password Reset.

## Choosing an experience

There are two available experiences for Universal Login. The Classic Experience is the same experience that has been available for quite some time, and allows for extensive customization of the login page. The New Experience uses less weighty JavaScript (and works entirely without it) and, while less customizable, is a simpler and faster to use experience for end-users.

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
        <li>Modern styling with simple customization options</li>
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

For more detailed comparisons of the two experiences, see our [guide on choosing an experience for Universal Login](/universal-login/experiences).

## Other facets of Universal Login

Auth0 offers you the ability to customize and display several other pages containing Auth0-related functionality and to which Auth0 redirects your users during the authorization process, beyond just the login page described above. You can modify the following types of pages from your [Dashboard](${manage_url}):

* [Password Reset Page](/universal-login/password-reset)
* [Guardian Multi-factor Page](/universal-login/guardian)
* [Error Pages](/universal-login/error-pages)

While Auth0 hosts these custom pages, you can still [manage your pages using the version control system of your choice](/universal-login/version-control).
