::: warning
Embedded login for web uses Cross Origin Authentication, which [does not work reliably on all browsers](/cross-origin-authentication#limitations-of-cross-origin-authentication) if you do not [set up a Custom Domain](/custom-domains) **and host your app on the same domain**. The use of Custom Domains with Auth0 is a paid feature. A good alternative is to [migrate to Universal Login](/guides/login/migration-embedded-universal) if you cannot use Custom Domains in your application.
:::
