Auth0 can be customized with a look and feel that aligns with your organization's brand requirements and user expectations. Branding Auth0 collateral provides a consistent user experience for your customers, and gives them peace of mind that they’re using a product from a trusted and secure provider.

Auth0 provides support for [internationalization (I18N)](/i18n) and localization (L10N), both of which are important if you work on branding for an international clientele. Out-of-box collateral, such as the Auth0 Lock UI widget, comes ready enabled for multiple language support, with built-in extensibility for adding more languages if what you require [doesn’t already exist](/libraries/lock/v11/i18n).
 
::: panel Best Practice
Almost all applications need Internationalization and/or Localization in one form or another. Auth0 makes it easy to add, but you need to account for it up front: retro-fitting localization, for example, can be a painful process if left too late.
:::

When considering the items you want to brand, as well as how best to brand them, there are a number of things you'll want to review:

* Will you brand your login page?
* Will you need to localize your login page?
<% if (platform === "b2b") { %>
* If you are sharing an Auth0 tenant across customer organizations, should you add organization-specific branding to their login experience?
<%  } %>
* Will you customize emails so that they're not just branded, but vary based on user preference?
* How will users know that they're still on your domain when they see your login page?
* What do you need to do to provide additional browser security (e.g., implement Extended Validation)?
* How will you direct users in the event of errors?

Auth0 provides tremendous flexibility when it comes to customizing and configuring Auth0 pages such as [Universal Login](#universal-login-and-login-pages) and [Password Reset](#password-reset-page-customization). So you can pretty much set up whatever UX look and feel you require. For many, the out-of-the-box experience - with perhaps a little alteration - is all that's required. However, for others the value of their brand and brand awareness requires more extensive customization. This flexibility extends to not only Auth0 pages, but via extensibility can also be applied to the [email templates](/architecture-scenarios/implementation/${platform}/${platform}-branding#email-template-customization). Auth0 [Custom Domain](/architecture-scenarios/implementation/${platform}/${platform}-branding#custom-domain-naming) functionality further enhances consumer awareness by providing users with the confidence and peace of mind when it comes to safety and security. 

<% if (platform === "b2b") { %>
If you are sharing an Auth0 tenant across multiple customer organizations, providing each organization with their own domain of users and managing their credentials, you will need to consider how each user will know which credentials they should use and how they will trust that they are entering them somewhere safe and secure. See [Branding login by organization](#branding-login-by-organization) for details. 
<%  } %>

While Auth0 provides for default information when it comes to error situations, out-of-the-box information can be somewhat cryptic as the context that can only be provided by you is missing. Auth0 [error page customization](/architecture-scenarios/implementation/${platform}/${platform}-branding#error-page-customization) guidance can however help mitigate that by allowing you to provide information of a more context-specific nature via your own support organization. 

::: panel Best Practice
To provide users with helpful resources if they experience problems you should also configure a friendly name and a suitable logo, as well as the support email and support URL for your organization. See [Dashboard Tenant Settings](/dashboard/dashboard-tenant-settings#settings) for further details.
:::
