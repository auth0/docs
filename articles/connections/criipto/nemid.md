---
title: Connect Danish NemID with Auth0 through Criipto Verify
connection: Danish NemID
image: /media/articles/connections/criipto/nemid_black.png
seo_alias: nemid
description: Connecting Danish NemID with Auth0 through the Criipto Verify service
toc: true
crews: crew-2
topics:
    - connections
    - criipto
contentType: how-to
useCase:
    - customize-connections
    - add-idp
---

# Log in with Danish NemID through Auth0

When you need to know the legal identity of your Danish users, your choice is NemID  offered by the Danish Government. NemID exists in
both a version private citizens and one for employees of an organization.

The NemID technology by itself is proprietary and takes quite a bit of work to understand and integrate, but through the [Criipto Verify service](https://criipto.com/products/criipto-verify)
you may avoid the integration trouble.

Below is an outline of the steps to get ready to accept Danish NemID logins, but you may also view
[a short screen cast](https://criipto.com/easyid/auth0/2016/12/07/easyid-and-auth0/) at Criipto's website.

::: panel Process to use Swedish BankID in Production
While the technical integration is simple, to use Danish NemID in production you will have to go through a formal process to register and obtain the necessary certificate to identify yourself to your users. This process must be completed with the Danish NemID operator, Nets. 
More on this process can be found once you sign into the Criipto Verify service, and with the help of Criipto.
:::

## 1. Create an account with Criipto Verify

Go to [criipto.com/verify](https://criipto.com/products/criipto-verify) and click the sign-up button.

Once registered you will be asked to create your tenant.

![Create new tenant](/media/articles/connections/criipto/easyid-signup.png)

## 2. Create an Application to point to Auth0

In Criipto Verify go to the **APPLICATIONS** tab and create a new application by clicking the **with Auth0** button.
Give it a meaningful name, select the domain and remember to select the **DK NemID**.

![Create application with Auth0](/media/articles/connections/criipto/auth0-app-dk.png)

Click **Save** to open the next dialog

## 3. Name the connection (prefix) as it will appear in Auth0

If you do not run off the public Auth0 service, enter the  DNS name of the login tenant. Otherwise just leave the **Auth0 tenant** field as is.

Secondly enter a name to be used as the prefix for the connections created in Auth0.

![Auth0 connections details](/media/articles/connections/criipto/auth0-details.png)

Click **Proceed**.

## 4. Create new connections in Auth0

If you are not already logged in to Auth0 in this session, you will be prompted to do so in the popup window.

Once logged in you must grant Criipto Verify consent to create connections and read the details of your applications.

::: note
If you have more than one Auth0 tenant, remember to select the right one. in the dialog.
:::

![Auth0 connections details](/media/articles/connections/criipto/auth0-consent.png)

Click the check mark in the green area at the bottom to allow Criipto Verify to set up the connections.

## 5. Verify the connections

Go to the **Connections > Enterprise** section and open the **ADFS** connections to see the connections for
Danish NemID  created from the previous steps.

::: note
One connection has been created for each kind of authentication supported by NemID:
Personal NemID (POCES), Employee NemID (MOCES), and Employee NemID with a code file.
:::

![ADFS connections created](/media/articles/connections/criipto/adfs-connections-dk.png)

Remember to enable at least one application before clicking the **Try** button! For more on test users see the documentation
on Criipto Verify.

## 6. Create your test users

With the above setup you will be ready to start testing. But first you must create one or more test users or get some from Criipto.
See more in the documentation in your Criipto Verify tenant.

## 7. Enable production use

To start accepting real NemID logins from real legal persons, you must first enter into a formal agreement with Nets,
the company providing the service under contract from the Danish Government. More on this here (in Danish):
[www.nets.eu/dk-da/l%C3%B8sninger/nemid/nemid-tjenesteudbyder/Pages/bestil.aspx](https://www.nets.eu/dk-da/l%C3%B8sninger/nemid/nemid-tjenesteudbyder/Pages/bestil.aspx)

Once this agreement is in place you will receive a certificate to upload to Criipto Verify. Go to the **IDENTITY SERVICES** tab
and open the **DK NemID** section. This is where you will upload your organization's BankID certificate and provide the rest of the
needed information.

![Identity Service production](/media/articles/connections/criipto/dk-nemid-prod.png)
