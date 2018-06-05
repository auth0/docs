---
title: Pre-launch Tips 
description: A list of helpful tips for when getting started with Auth0 services based on feedback and experience from others.
tags:
    - pre-deployment
    - pre-launch
    - tips-and-tricks
---

# Pre-Launch Tips 

Here is a list of tips our customers have found most useful when first getting started with Auth0 services:

* Check the URLs in your allowed callbacks, CORS and allowed redirect URLs for Logout to make sure they are correct, complete, and do not involve use of `file:///` or `localhost`.  Minimize the use of wildcards and consider carefully the security ramifications of wildcards.

* Separate production use from ongoing development work by [using separate tenants for prod, test and dev.](/dev-lifecycle/setting-up-env)

* Configure your network correctly to allow traffic to and from our sets of public APIs (prod envs might have a different setup than dev/staging).

* Check the expiration date of certificates you have added to your configuration to make sure certificates uploaded during development cycles won’t expire during or shortly after launch.

* Make sure any remote IDPs are running NTP so that the time will be properly synced.

* The number of days of log data available varies by plan up to a max of 30 days. If you need log data for a longer retention period, you should set up one of the [Auth0 extensions](/extensions#export-auth0-logs-to-an-external-service) that will send log data to a third party service. This will enable you to keep log data for longer periods.  Be sure to set this up before you go live so you are sure to have log data when you need it.

* Make sure your usage of our APIs remains within [allowed limits](/policies/rate-limits) and you have written your code to dynamically adjust to rate limit information returned in the header and to handle errors. If you anticipate rate limits being a problem for your application, discuss with us up-front to check if it would be possible to momentarily raise them until the traffic returns to normal. You should consider using a cache of user data in order to not have to query an API endpoint more than necessary.

* If using [social connections](/identityproviders) make sure to obtain your own credentials from the provider and add them to the configuration of the social connection.

* If using [custom DB connections](/connections/database/mysql) make sure all custom DB scripts are implemented and return a consistent user-profile with a unique user ID.

* For sending emails first make sure to [setup a custom email provider.](/email/providers)

* If you use our CDN for the Lock widget, make sure to [pin to a specific version.](/libraries/lock/v10#installation-sources)

* Make sure **external** components called from rules, hooks and custom DB connection scripts can handle the expected load.

* Adequately protect any client secret values.

* Check your [grant types](/applications/application-grant-types) for your applications. Make sure you have the right ones enabled and more importantly, disable any grant types that aren't needed.

* If you make use of [user_metadata](/metadata) confirm that this is data that users should be able to change on their own (eg. not “payment status”).

* Review your [Anomaly Detection settings](${manage_url}/#/anomaly) and read the [Anomaly Detection doc](/anomaly-detection) to understand how to unblock users that have been blocked.

* Review your [Tenant Settings Admin section](${manage_url}/#/tenant/admins) to make sure that only appropriate admins have access to the Auth0 dashboard.

* Make sure you have tested all core use cases for your application on all devices that might be used by the end-user population for your application.  Be sure to test both login, single-sign-on (if supported) and log as well as what happens if a user runs your application in multiple browser tabs.

* Review your [list of rules](${manage_url}/#/rules) and make sure only the appropriate rules are turned on. 

* Review your rule code, any custom DB scripts and any custom code in the login page to ensure that every call has adequate error trapping and handling.  Also review to make sure that return/callback statements are called correctly.

* Configure your application name, support URL and support email in the [Tenant Settings General](${manage_url}/#/tenant) section so when an error occurs your end users will be directed to an appropriate page.

* Make sure that your application is [dynamically obtaining a management API token](/api/management/v2/tokens) and make sure to read the [FAQ about API tokens](/api/management/v2/tokens#frequently-asked-questions).

* Remove any `console.log` statements from your rules or custom DB scripts. Especially those that might leak user identifiable information such as email, username or password.

* Do not use plain text secrets in rules or db-connections. They should be added in the configuration part of the interface. The configuration is encrypted and provided just in time. Do not log the configuration object. 
