---
url: /libraries/lock/v10
sitemap: false
---

# Lock 10 Preview

Lock 10 is a new version of the Auth0 authentication widget that provides:

* support for custom sign up fields;
* easier [redirect mode](/libraries/lock/authentication-modes#redirect-mode) implementation;
* improved UX;
* and more.

## What's new?

* Lock now uses Redirect Mode by default. To use Popup Mode, you must enable this explicitly.
* The Lock Public API has been updated so there are not significant differences between Redirect and Popup Mode. This makes Redirect Mode, which is the recommended mode, much easier to use. Also, related options are grouped together.
* The current release candidate of Lock does not support as many foreign languages as the previous version. You can still translate the widget via `languageDictionary`.
* You can create simple Lock themes using JavaScript to via `primaryColor` and `logo` properties of the `theme` option. You may also make customizations with CSS.
* The improved Lock UX comes with smoother transitions and animations and is keyboard friendly.
* Lock comes with support for pre-filled fields and custom avatar implementations.
* Lock comes with support for custom sign up fields.

Please see [New Features in Lock 10](/libraries/lock/v10/new-features) for additional information.

## Migrating to Lock 10

Please see [Migrating to Lock 10](/libraries/lock/v10/installation) for installation instructions.
