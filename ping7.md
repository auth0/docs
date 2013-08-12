---
title: PingFederate
layout: doc.nosidebar
---
# Configuring PingFederate 7 as an Identity Provider

Most options are the default values. You will just need to press __Next__ in most screens. If metadata import fails for some reason, keep these values at hand. Tehse are the most important configuration parameters:

* __EntityID:__ `urn:auth0:@@account.tenant@@`
* __Assertion Consumer Service URL:__ `https://@@account.namespace@@/login/callback`
* __Logout URL:__ `https://@@account.namespace@@/logout`
* __HTTP-Redirect__ binding for SAML Request
* __HTTP-POST__ binding for SAML Response


##1. Download Auth0 Metadata File

Download the metadata file from [here](https://@@account.namespace@@/samlp/mex). This will be used in [step 5](ping7#5) to import information about your partner (@@account.tenant@@).

##2. Create a new __SP Connection__

Login to _PingFederate_ as an administrator (https://{your ping server}:{port}/pingfederate/app). Select __Create New__ from the __SP Connections__ section:

![](http://puu.sh/3ZKnL.png)

###2.1 Configure the __SP Connection__

Select the __Browser SSO Profles__ as the __Connection Type__:

![](http://puu.sh/3ZKQg.png)

Select __Browser SSO__ as the __Connection Options__:

![](http://puu.sh/3ZKUx.png)

Upload the [__metadata file__](https://@@account.namespace@@/samlp/mex) you downloaded in step 1. The __Entity ID__, __Connection Name__ and the __Base URL__ will be automatically completed based on the information from the metadata file. You can also complete other relevant information from your partner (@@account.tenant@@):

![](http://puu.sh/3ZL2v.png)

###2.3 Configure __Browser SSO__

Select __SP-Initiated SSO__ and __SP-Initiated SLO__ in __SAML Profiles__:

![](http://puu.sh/3ZLwv.png)

Move on to the __Assertion Creation__ section and click on __Configure Assertion__:

![](http://puu.sh/3ZLzH.png)

You can leave all defaults for the next two screens. Move on to the __IdP Adapter Mapping__ section: 

![](http://puu.sh/3ZLBg.png)
![](http://puu.sh/3ZLBL.png)

The last step is to add an __IdP Adapter Mapping__. This is where users will actually be authenticated. Likely, you already have one configured in your _PingFederate_ installation. Select one, or ad a new one.

In principle, Auth0 only requires the __NameIdentifier__ claim. All other  attributes will be passed further to the end application.

![](http://puu.sh/3ZVAD.png)

In this example, we are just using the `username` from an simple HTML IdP Adapter. No __Issuance Criteria__ are being used. 

![](http://puu.sh/3ZVJg.png)

###2.4 Configure __Protocol Settings__

All important values for __Protocol Settings__ are imported from the __Metadata File__. You should see the __Assertion Consumer Service URL__:

![](http://puu.sh/3ZVM7.png)

And the Sign-Off urls. Just click __Next__ to the __Allowable SAML Bindings__ section.

![](http://puu.sh/3ZVQb.png)

Leave __POST__ and __Redirect__ enabled:

![](http://puu.sh/3ZVSQ.png)

Make sure __SAML Assertion__ is always signed and move on to the end of this section.

![](http://puu.sh/3ZVTG.png)


###2.5 Configure __Credentials__

This is the last step for configuring __Browser SSO__. On __Digital Signature Settings__, select your signing certificate and make sure you check the option to include it in the `<KeyInfo>` element:

![](http://puu.sh/3ZW5a.png)

The last two options to configure are the certificate used to sign incoming requests. Auth0 will not sign `SAMLRequests` by default. For some reason, there's no way around this setting. You can download Auth0 certificate from [here](https://@@account.tenant@@.auth0.com/pem). 

![](http://puu.sh/3ZW9f.png)
![](http://puu.sh/3ZWdK.png)

###2.6 Activation of the __SP Connection__

In the last step, you'll see the summary of all your previous settings and an option to set is as __Active__ or __Inactive__:

![](http://puu.sh/3ZWeR.png)

In any case, make sure your click the button __Save__ at the bottom of the screen. 

You are done! You should see the new connection on the __Main__ screen:

![](http://puu.sh/3ZWk7.png)

---
