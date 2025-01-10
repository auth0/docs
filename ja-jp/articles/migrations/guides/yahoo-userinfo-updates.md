---
title: Changes to Yahoo Profile
description: The latest version of the Yahoo API changes the structure of the user profile
toc: true
contentType:
  - how-to
useCase:
  - add-login
  - migrate
---

# Changes to Yahoo Profile
 
Yahoo changed the API that applications need to use to retrieve the User Profile from their [Social Directory API](https://developer.yahoo.com/oauth/social-directory-eol/) to a Yahoo `/userinfo` endpoint. This change implies that the structure of the user profile for Yahoo users in Auth0 will change.

Auth0 previously loaded all the profile data that Yahoo returned, and added these additional fields that were mapped from the Yahoo profile:

|Auth0 field|Yahoo field|
|---|---|
|user_id|guid|
|sub|guid|
|name|nickname|
|time_zone|timeZone|
|uri|uri|
|url|profileUrl|
|isConnected|isConnected|
|email_verified|verified|
|email|email|

Yahoo stopped returning `url`, `profileUrl`, `isConnected`, and a set of other fields listed in [Yahoo’s documentation](https://developer.yahoo.com/oauth/social-directory-eol/) (see ‘List Of Attributes Deprecated in Social Directory Profile Api’). Those other fields will also not be part of the profile.

The Yahoo `/userinfo` endpoint will return different fields depending on the API Permissions you configure in the [Yahoo Application](https://developer.yahoo.com/apps/) definition. 

Yahoo lets you grant one of four permissions in the **Profile (Social Directory)** permissions section:

- Read Public Basic
- Read Public Extended
- Read Write Public
- Read Write Public and Private

When configuring the Yahoo Connection in your Auth0 Dashboard, you need to select the attribute that corresponds to the permissions you granted in your Yahoo setup. If you choose an attribute that does not match what you specified on Yahoo, the login transaction will fail.

|Yahoo Connection Attributes|Profile Fields|
|--|--|
|Basic Profile| sub, name, given_name, family_name, locale|
|Basic Profile Write| sub, name, given_name, family_name, locale|
|Extended Profile |sub, name, given_name, family_name, locale, email, email_verified, birthdate, profile_images, picture, preferred_username, phone_number, nickname |
|Extended Write | sub, name, given_name, family_name, locale, email, email_verified, birthdate, profile_images, picture, preferred_username, phone_number, nickname |

If you do not select any permissions in the Auth0 connection settings, Auth0 will by default ask for the `openid` scope, which will return the profile fields that correspond to whatever API Permission you specified in the Yahoo Application. For example, if your Yahoo application is configured with `Read Public Extended`, it will return the `sub, name, given_name, family_name, locale, email, email_verified, birthdate, profile_images, picture, preferred_username, phone_number and nickname` fields.

**Do I need to take any action?**

Auth0 will default to send the `openid` scope when authenticating with Yahoo.

If you are using the Yahoo connection to authenticate users and get their basic information, your application will continue to work without changes.

If your application is accessing fields in the user profile that are no longer available, then you will need to make sure you enable the right Connection Attribute in the Auth0 dashboard and adjust your application code to use the proper field names.
