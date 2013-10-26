---
title: SiteMinder
layout: doc.nosidebar
---
# Configuring SiteMinder as an Identity Provider

Most options are the default values. These are the most important configuration parameters you will need:

* __EntityID:__ `urn:auth0:@@account.tenant@@`
* __Assertion Consumer Service URL:__ `https://@@account.namespace@@/login/callback`
* __Logout URL:__ `https://@@account.namespace@@/logout`
* __HTTP-Redirect__ binding for SAML Request
* __HTTP-POST__ binding for SAML Response

The instructions below will guide you into where these values need to be entered in SiteMinder.

###1. Open the SAML Service Provider Dialog 

Provide an appropriate name for this Service Provider. We suggest using:

* __Name:__ `@@account.tenant@@`

![](img/siteminder-users.png)

###2. Defining NameIdentifier

You can define many ways of generating a `NameIdentifier` for users authenticating with SiteMinder. Typically you will map this value to one of the user properties in the User Directory as `uid` in the example blow:

![](img/siteminder-nameids.png)

###3. Configure the Service Provider General SAML properties

Use the following values for this configuration screen:

* __SP ID:__ `urn:auth0:@@account.tenant@@`
* __SAML Version:__ `2.0`
* __Skew Time:__ `30 seconds`

![](img/siteminder-general.png)

###4. Configure the Assertion Consumer Service URL

The __Assertion Consumer Service URL__ is the location where SiteMinder will POST back the SAML Token. This Service Provider (@@account.tenant@@) only supports the `HTTP-POST` binding for SAML Responses. Use these values:

* __Assertion Consumer Service:__ `https://@@account.namespace@@/login/callback`
* __HTTP-Post__: `checked`

![](img/siteminder-sso.png)

###5. Configure additional user properties to send in the token

Add any other properties you wish to share about the authenticated user to this Service Provider. Common values are: `name`, `lastname`, `e-mail address`, etc. This Service Provider will use the `NameIdentifier` defined in [step 2](siteminder#2) as a unique handle of the user. These attributes will be treated as reference information:

![](img/siteminder-attributes.png)

###6. Enter the Single Sign Out URL

* __SLO Location URL:__ `https://@@account.namespace@@/logout`

![](img/siteminder-slo.png)

###7. Optional Assertion Encryption

The Service Provider supports encryption of Assertions. If this option is used, __[download the SP public key certificate]()__ and add it to the __Policy Server Keystore__.

![](img/siteminder-encryption.png)

