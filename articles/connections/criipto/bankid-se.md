---
title: Connect Swedish BankID with Auth0 through Criipto Verify
connection: Swedish BankID
image: /media/articles/connections/criipto/bankid-se.png
seo_alias: bankid
description: Connecting Swedish BankID with Auth0 through the Criipto Verify service
toc: true
crews: crew-2
---

# Log in with Swedish BankID through Auth0

When you need to know the legal identity of your Swedish users, your choice is BankID jointly offered by the Swedish banks.
The BankID technology by itself is proprietary and takes a bit of work to understand and integrate, but through the [Criipto Verify service](https://criipto.com/products/criipto-verify)
you may avoid the integration trouble.

Below is an outline of the steps to get ready to accept Swedish BankID logins, but you may also view
[a short screen cast](https://criipto.com/easyid/auth0/2016/12/07/easyid-and-auth0/)) at Criipto's website.

::: panel Process to use Swedish BankID in Production
While the technical integration complexity is simple, to use Swedish BankID in production you will have to go through a formal process to register and obtain the necessary certificate to identify yourself to your users.
More on this process can be found once you sign into the Criipto Verify service, and with the help of Criipto.
:::

## 1. Create an account with Criipto Verify

Go to [criipto.com/verify](https://criipto.com/products/criipto-verify) and click the sign-up button.

Once registered you will be asked to create your tenant.

![Create new tenant](/media/articles/connections/criipto/easyid-signup.png)

## 2. Create an Application to point to Auth0

In Criipto Verify go to the **APPLICATIONS** tab and create a new application by clicking the **with Auth0** button.
Give it a meaningful name, select the domain and remember to select the **SE BankID**.

![Create application with Auth0](/media/articles/connections/criipto/auth0-app-se.png)

Click **Save** to open the next dialog

## 3. Name the connection (prefix) as it will appear in Auth0

If you do not run off the public Auth0 service, enter the  DNS name of the login tenant. Otherwise just leave the **Auth0 tenant** field as is.

Secondly enter a name to be used as the prefix for the connections created in Auth0.

![Auth0 connections details](/media/articles/connections/criipto/auth0-details.png)

Click **Proceed**.

## 4. Create new connections in Auth0

If you are not already logged in to Auth0 in this session, you will be prompted to do so in the popup window.

Once logged in you must grant Criipto Verify consent to create connections and read the applications.

::: note
If you have more than one Auth0 tenant, remember to select the right one. in the dialog.
:::

![Auth0 connections details](/media/articles/connections/criipto/auth0-consent.png)

Click the check mark in the green area at the bottom to allow Criipto Verify to set up the connections.

## 5. Verify the connections

Go to the **Connections > Enterprise** section and open the **ADFS** connections to see the connections for
Swedish BankID created from the previous steps.

::: note
One connection has been created for each kind of authentication supported by Swedish BankID:
Native BankID application or mobile app. Both applications must be installed prior to BankID authentication.
:::

![ADFS connections created](/media/articles/connections/criipto/adfs-connections-se.png)

Remember to enable at least one application before clicking the **Try** button! For more on test users see the documentation
on Criipto Verify.

## 6. Create your test users

With the above setup you will be ready to start testing. But first you must create one or more test users here: [demo.bankid.com/](https://demo.bankid.com/). If you don't already have a test or real BankID, go to the section named **Log in with a personal code**.

## 7. Enable production use

To start accepting real BankID logins from real legal persons, you must first enter into a formal agreement with a Swedish Bank,
possibly through Criipto, or directly with your bank.

Once this agreement is in place you will receive a certificate to upload to Criipto Verify.

Go to the **IDENTITY SERVICES** tab
and open the **SE BankID** section.

This is where you will upload your organization's BankID certificate.

![Identity Service production](/media/articles/connections/criipto/se-bankid-prod.png)
