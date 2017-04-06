---
section: appliance
description: Compares features available in the Auth0 Public Cloud and the Appliance
---

# Auth0 Features Comparison

While most features are available to you regardless of your deployment choice, there are some differences in what's available in the Public Cloud and what's available to those using the Appliance (more specifically, deployments hosted on-premise, in your private cloud environment, or in Auth0's Private Cloud).

## Current Limitations for Customers Using the Appliance

1. Multifactor Authentication (MFA) is only available for TOTP and HOTP-style factorization. Guardian and SMS-based MFA is *not* available.
2. Breached Password Detection is unavailable.
3. The Appliance supports a fixed Webtask module model. It does *not* support all of the available Webtask NPM modules.
4. The Appliance limits tenant log retention.
5. The Appliance limits tenant log search to a subset of indeces and does *not* support full Lucene search syntax.

Auth0 strives to close the feature gap between the Appliance and the Public Cloud, and as we add features, we will update the above list accordingly.

## Operating the Appliance with Restricted Internet Access

If you operate the Appliance in an environment with restricted Internet access, you will *not* have access to:

* Extensions;
* Lock (requires access to the CDN hosting Lock);
* Management/Authentication API Explorers (requires access to the CDN hosting the API Explorers);
* Quickstarts (requires access to GitHub).
