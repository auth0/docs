---
title: Authenticate Users Using Your Database
image: /media/connections/mysql.svg
seo_alias: mysql
description: Learn how to authenticate users using your database as an identity provider.
toc: true
topics:
    - connections
    - custom-database
    - scripts
contentType: tutorial
useCase:
    - customize-connections
---
# Authenticate Users Using Your Database

If you have your own user database, you can use it as an identity provider in Auth0 to authenticate users.

::: panel Feature availability
Only **Enterprise** subscription plans include the ability to use a custom database for authentication requests.

For more information refer to [Auth0 pricing plans](https://auth0.com/pricing).
:::

In this tutorial, you'll learn how to connect your user database to Auth0 and configure it for use as an identity provider. More specifically, you will:

* [Create and configure a custom database connection](/connections/database/custom-db/create-db-connection) using the [Auth0 dashboard](${manage_url}).
* Make sure that your database has the appropriate fields to store user profiles attributes, such as **id**, **nickname**, **email**, and **password**. See [Normalized User Profile](/users/normalized) for details on Auth0's user profile schema and the expected fields.
* Provide database action scripts to configure the database for use as an identity provider.

## Before you begin

Here are some things to know before you begin the process of setting up your database for use as an identity provider.

 You'll write your database action scripts in JavaScript. The scripts run in a [Webtask](https://webtask.io/) environment and support JavaScript and [select Node.js libraries](https://auth0-extensions.github.io/canirequire/).

* There are two different types of custom database scripts:

  1. **Trickle Migration**: Whenever a user logs into Auth0, if the user is not yet in Auth0, the script will check the legacy database to see if the user is there. If they are there, it will migrate the user to Auth0. This script runs when the **Import users to Auth0** flag is turned on. 

  2. **Legacy DB**: Auth0 will always call out to the underlying database anytime a user tries to log in, is created, changes their password, verifies their email, or is deleted. Users stay in the legacy database and do **not** migrate to Auth0.

* The `get user` script is very important. Here are all the places where it is called:

  * Change email: to validate availability
  * Create user: to validate availability
  * Forgot password: to validate
  * Change password: to create

* Auth0 provides [custom script templates](/connections/database/custom-db/templates) for most of the commonly-used databases, including:

  * ASP.NET Membership Provider
  * MongoDB
  * MySQL
  * Oracle
  * PostgreSQL
  * SQLServer
  * Windows Azure SQL Database
  * Web services accessed via Basic Auth

  Essentially, you can connect to any kind of database or web service with a properly-configured custom script.

* [Update User Profiles Using Your Database](/users/guides/update-user-profiles-using-your-database) has information on updating user profile fields.

<%= include('../../../_includes/_ip_whitelist') %>

### Keep reading

* [Create and Configure a Custom Database Connection](/connections/database/custom-db/create-db-connection)
* [Write Custom Database Action Scripts](/connections/database/custom-db/templates)
* [Update User Profile Using Your Database](/users/guides/update-user-profiles-using-your-database)
* [Handle Errors and Troubleshoot Your Custom DB Scripts](/connections/database/custom-db/error-handling)
