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
 
Yahoo changed the way to retrieve the User Profile from their [Social Directory API](https://developer.yahoo.com/oauth/social-directory-eol/) to a Yahoo `/userinfo` endpoint. This change implies that the structure of the user profile for Yahoo users in Auth0 will change.

Auth0 previously loaded all the profile data that Yahoo returned, and added these additional fields that were mapped from the Yahoo profile:

|Auth0 Attribute|Yahoo Attribute|
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

Yahoo stopped returning `url`, `profileUrl`, `isConnected` and a set of other attributes listed in [Yahoo’s documentation](https://developer.yahoo.com/oauth/social-directory-eol/) (see ‘List Of Attributes Deprecated in Social Directory Profile Api’). Those other attributes will also not be part of the profile.

The Yahoo `/userinfo` endpoint will return different fields depending on the scopes you configure in the Yahoo connection, and they will be mapped to Auth0’s profile using the same attribute names:

|Yahoo Connection Scopes|Profile Attributes|
|--|--|
|Basic Profile| sub, name, given_name, family_name, locale|
|E-mail|email, email_verified|

**Do I need to take any action?**

If you are using the Yahoo connection to authenticate users and get their basic information (email, name), your application will still work without changes.

If your application is accessing fields in the user profile that are no longer available, then you will need to make sure you enable the right scopes in the Auth0 dashboard and adjust your application code to use the proper field names.
