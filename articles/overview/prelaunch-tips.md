---
url: /gettingstarted-tips
title: Tips for Getting Started with Auth0 Services 
description: A list of tips that will help you to get started with Auth0 services.
---

# Tips for Getting Started with Auth0 Services

Before you begin to use Auth0 services, consider the following tips:

* Ensure that the URLs in your allowed callbacks, Cross-Origin Resource Sharing (CORS) mechanism, and allowed redirect URLs for logging out are correct and complete. Ensure that `file:///` and `localhost` are not used. Consider the security ramifications when wildcards are used, and use wildcards only when they are necessary.

* Use unique production, test, and development environments. For more information, see [using separate tenants for prod, test and dev.](/dev-lifecycle/setting-up-env)

* Configure your network so that traffic flows to and from our sets of public APIs. Production environments might be set up differently than development and staging environments.

* Ensure that the certificates you added to your configuration during development cycles won't expire during or shortly after you launch.

* To correctly sync the time, ensure that all remote IDPs are running NTP.

* The number of days of log data that are available varies by plan, and the maximum is 30 days. If you need to store log data for an extended period of time, set up one of the [Auth0 extensions](/extensions#export-auth0-logs-to-an-external-service), which will send log data to a third-party service. Set this up before you go live so that you can access the log data when you need it.

* Ensure that your usage of our APIs remains within [allowed limits](/policies/rate-limits) and that you have written your code to handle errors and to dynamically adjust to rate-limit information returned in the header. If you anticipate rate limits being a problem for your application, let us know, and we will determine whether we can briefly raise your limits until the traffic flow stabilizes. To avoid unnecessary queries to an API endpoint, consider using a cache of user data.

* If you use [social connections](/identityproviders), obtain your own credentials from the provider and add them to the configuration of the social connection.

* If you use [custom DB connections](/connections/database/mysql), ensure that all custom DB scripts are implemented and return a consistent user profile with a unique user ID.

* To use email, [setup a custom email provider](/email/providers).

* If you use the Auth0 CDN for the Lock widget, [pin it to a specific version.](/libraries/lock/v10#installation-sources)

* Ensure that external components that are called from rules, hooks, and custom DB connection scripts can handle the expected load.

* Securely protect all of your client's secret values.

* If you use [user_metadata](/metadata), ensure that it does not contain values that users should not be allowed to modify. For example, in most cases users should not be allowed to modify their payment status.

* To understand how to unblock users that have been blocked, review your [Anomaly Detection settings](${manage_url}/#/anomaly), and read the [Anomaly Detection documentation](/anomaly-detection).

* To ensure that only appropriate administrators have access to the Auth0 dashboard, review your [Account Settings Admin section](${manage_url}/#/account/admins).

* Ensure that you have tested all core use cases for your application on all devices that might be used by your end users. For example, test the login, single sign-on, and logout functions, and test the outcome of running your application in multiple browser tabs.

* Review your [list of rules](${manage_url}/#/rules), and ensure that only the appropriate rules are enabled. 

* Review your rule code, all custom DB scripts, and all custom code in the hosted login page to ensure that every call has adequate error trapping and handling and that return statements are called correctly.

* Configure your application name, technical support URL, and technical support email address in the [Account Settings General](${manage_url}/#/account) section so that your end users can contact the technical support team when they encounter errors.

* Ensure that your application is [dynamically obtaining a management API token](/api/management/v2/tokens), and read the [FAQ about API tokens](/api/management/v2/tokens#frequently-asked-questions).

* Remove all `console.log` statements from your rules and custom DB scripts. Some of these statements might leak user-identifiable information, such as email addresses, user names, or passwords.

* Do not use plain-text secrets in rules or DB-connections. Instead, add them in the configuration part of the interface. The configuration is encrypted and provided just in time. Do not log the configuration object. 
