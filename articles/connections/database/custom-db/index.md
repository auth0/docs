---
title: Authenticate Users Using Your Database
connection: MySQL
image: /media/connections/mysql.svg
seo_alias: mysql
description: Learn how to authenticate users using your database as an identity provider.
crews: crew-2
toc: true
topics:
    - connections
    - custom-database
contentType: tutorial
useCase:
    - customize-connections
---
# Authenticate Users Using Your Database

If you have your own user database, you can use it as an identity provider in Auth0 to authenticate users.

In this tutorial, you'll learn how to connect your user database to Auth0 and configure it for use as an identity provider. More specifically, you will:

* Create a [create and configure a custom database connection](/connections/database/custom-db/create-db-connection) using the [Auth0 dashboard](${manage_url}).
* Make sure that your database has the appropriate fields to store user profiles attributes, such as **id**, **nickname**, **email**, and **password**. See [Auth0 Normalized User Profile](/user-profile/normalized) for details on Auth0's user profile schema and the expected fields.
* Provide database action scripts to configure the database for use as an identity provider.

## Before you begin

Here are some things to know before you begin the process of setting up your database for use as an identity provider.

* You'll write your database action scripts in JavaScript. The scripts run in a [Webtask](https://webtask.io/) environment that supports JavaScript and [select Node.js libraries](https://tehsis.github.io/webtaskio-canirequire/).

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

* [Update Users Using Your Database](/user-profile/customdb) has information on updating user profile fields.