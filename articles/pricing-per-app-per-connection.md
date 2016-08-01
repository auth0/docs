# Understanding Auth0 Pricing per App and per Connection

### Introduction
In addition to the IdP type, the number of active users and the addons you select, Auth0 pricing takes into consideration the number of apps you connect to the Auth0 platform as well as the number of connections you establish with your end customers. This article provides additional information about Auth0 per app and per connection pricing.

### Simple scenario: 1 App, 1 Connection
A simple yet very common Auth0 scenario is when an Auth0 customer builds 1 app or api and enables users to authenticate to it via a 1 connection.
In the picture below, an Auth0 customer built and angular.js app and created an active directory connection, allowing active users to authenticate themselves using their corporate credentials, whether they are in the office or on the road.

![](https://docs.google.com/drawings/d/1iZHRuRj7w3jjt4Zn1pNk6T7kxKRbNaii5l8gbF8Pbg0/pub?w=732&h=108)

In this simple example, Auth0 would charge the customer based on the fact that it is an enterprise connection (as opposed to a social or database connection), the number of monthly active users authenticating to the app as well as any addons (e.g. premium support) selected by the customer.

The self service model [https://auth0/pricing](https://auth0/pricing) assumes this scenario.

### Corporate scenario: Multiple apps, 1 Connection
Frequently though, Auth0 customers use the platform for multiple applications. It is important to note that we consider an app different from another when it offers different functionalities. For example an inventory management app and an appointment booking app would be considered separate apps. However, the inventory management website, the inventory management iOS companion app and the inventory management android app would all be considered a single app in the context of Auth0 pricing.

![](https://docs.google.com/drawings/d/16FjBPdKd0R0wDiIyHAGgbRMaTvIPdiW4l4soxV7diVo/pub?w=776&h=274)

In this case, Auth0 would charge the customer, based on the number of monthly active users per ___each___ app. In a self service model, it would be 5 different subscriptions, one for each app based on the active user count for each app. In addition to that, for Box and Zendesk the "3rd Party App SSO" addon will have to be switched on. In other words, active users __cannot__ be pooled across apps in the self service model.
We offer __pooled users__ across multiple apps pricing as well as __unlimited__ app pricing through our custom agreements. Please contact <sales@auth0.com> for more details.

### SaaS or On Prem ISV Model: 1 app, multiple connections

Another common scenario is "the ISV scenario". In this scenario, the Auth0 customer, usually a SaaS or On Prem ISV, builds an application that is used by multiple organizations.  Here is an example. One of our customers offers an online learning platform, every time they sign a new customer of theirs, they add an AD, LDAP, Google Apps (whichever is most relevant) connection in Auth0, allowing this new customer’s users to have single sign on with the online training platform. We consider this approach as “multiple connections” in the context of Auth0 pricing.
On the other hand, when multiple connections are setup to enable users from the same organization, we would consider this as 1 connection in the context of Auth0 pricing. For example, if 1 LDAP connection is created for the accounting division and 1 AD connection for the marketing department of the same organization, we would consider this as 1 connection from a pricing perspective.

![](https://docs.google.com/drawings/d/1Zx2ZDvW4sIfZ0Vz8ObTJlVlQL2CkVpNuPvjySJ5tZd8/pub?w=759&h=285)

In case of multiple connections, Auth0 would charge the customer, based on the number of monthly active users per ___each___ connection. In a self service model, it would be 5 different subscriptions, one for each end customer connection.
We offer __pooled user__ across multiple connections as well as __unlimited__ connection pricing in our custom orders. Please [contact sales](https://auth0.com/?contact=true) for more details.
