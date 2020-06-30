Nearly every B2C application provides the ability for their customers to create a new set of credentials. This is a common form of authentication that all users are familiar with.

Username password authentication comes in multiple flavors at Auth0. If your application is a green-field application with no existing user base, then a simple Auth0 out-of-the-box [Database Connection](/connections/database) will give you everything you need to start authenticating your users. However, if you have a legacy user store (such as your own database of users or an existing LDAP system) you have a couple of different options for migrating your users as discussed in our guidance on [User migration](/architecture-scenarios/implementation/${platform}/${platform}-provisioning#user-migration).

However you end up provisioning the users for your database connection, the authentication of those users is quite similar. It requires you to present users with a form to enter their username and password. As mentioned in the guidance concerning [Universal Login](#universal-login), the simplest and safest way to authenticate users with a username and password is to redirect them to a centralized login page and collect their username and password there. This allows Auth0 to determine whether they have already authenticated and skip the login form entirely when it's not needed.

::: panel Best Practice
Collecting credentials only at the centralized login page will reduce the surface area for potential leak of user secrets. It will also reduce the need to collect credentials unnecessarily. See [Universal Login](#universal-login) for more information.
:::
