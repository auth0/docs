---
description: How to setup deep linking.
---

## Deep Linking

Certain implementations might require deep linking to SharePoint Online for example. In that case a smart link needs to be constructed which starts on the Office 365 login page:

```
https://login.microsoftonline.com/login.srf?wa=wsignin1.0&whr={YOUR_CUSTOM_DOMAIN}&wreply={DEEP_LINK}
```

The first parameter, `YOUR_CUSTOM_DOMAIN` should be the domain you've configured in Azure AD for SSO (eg: `fabrikam.com`). By specifying this as the `whr`, Azure AD will know it needs to redirect to Auth0 instead of showing the login page.

The `DEEP_LINK` parameter should be an encoded url within Office 365 (like a page in SharePoint Online, Exchange, ...).

Example url:

```
https://login.microsoftonline.com/login.srf?wa=wsignin1.0&whr=fabrikam.com&wreply=https%3A%2F%2Ffabrikam%2Esharepoint%2Ecom
```
