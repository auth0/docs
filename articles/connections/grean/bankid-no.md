---
title: Connect Norwegian BankID with Auth0 through Grean easyID
connection: Norwegian BankID
image: /media/articles/connections/grean/bankid-no.svg
seo_alias: bankid
description: Connecting Norwegian BankID with Auth0 through Grean's easyID service
---

# Log in with Norwegian BankID through Auth0

When you need to know the legal identity of your Norwegian users, your choice is BankID jointly offered by the Norwegian banks. 
The BankID technology by itself is rather complicated to integrate, but through [Grean's easyID service](https://grean.com/easyid) 
you may avoid the integration trouble.

Below is an outline of the steps to get ready to accept Norwegian BankID logins, but you may also view 
[a short screen cast](https://grean.com/easyid/auth0/2016/12/07/easyid-and-auth0.html) at Grean's website.

**NOTE:** While the technical integration complexity is simple, to use Norwegian BankID in production you will have to go through a formal process to 
register and obtain the necessary certificate to identify yourself to your users. 
More on this proceess can be found once you sign into the easyID service, and with the help of Grean.

## 1. Create an account with Grean easyID

Go to [grean.com/easyid](https://grean.com/easyid) and click the sign-up button. 

Once registered you will be asked to create your tenant.

![Create new tenant](/media/articles/connections/grean/easyid-signup.png)

## 2. Create an Application to point to Auth0

In easyID go to the **Applications** tab and create a new application, a client, by clikcing the **with Auth0** button.
Give it a meaningful name, select the domain and remember to select the **NO BankID**.

![Create application with Auth0](/media/articles/connections/grean/auth0-app-no.png)

Click **Save** to open the next dialog

## 3. Name the connection (prefix) as it will appear in Auth0

If you do not run off the public Auth0 service, enter the  DNS name of the login tenant. Otherwise just leave the **Auth0 tenant** field as is.

Secondly enter a name to be used as the prefix for the connections created in Auth0.

![Auth0 connections details](/media/articles/connections/grean/auth0-details.png)

Click **Proceed**.

## 4. Create new connections in Auth0

If you are not already logged in to Auth0 in this session, you will be prompted to do so in the popup window.

Once logged in you must grant Grean easyID consent to create connections and read the clients. 

**Note:** If you have more than one Auth0 tenant, remember to select the right one. in the dialog.

![Auth0 connections details](/media/articles/connections/grean/auth0-consent.png)

Click the check mark in the green area at the bottom to allow Grean easyID to set up the connections.

## 5. Verify the connections

Go to the **Connections > Enterprise** section and open the **ADFS** connections to see the connections for 
Norwegian BankID created from the previous steps.

**Note:** One connection has been created for each kind of authentication supported by Norwegian BankID: 
Browser based and mobile. The mobile method requires a special SIM card issued by a Norwegian provider.

![ADFS connections created](/media/articles/connections/grean/adfs-connections-no.png)

Remember to enable at least one client before clicking the **Try** button! For more on test users see documentation
on easyID.

## 6. Create your test users

With the above setup you will be ready to start testing. You will find a test user's credentials in your easyID tenant
to start testing the web based flow. To get your own test users and to get the special SIM cards need to test the mobile
flow, work with Grean to sign up for production use of Norwegian BankID.

## 7. Enable production use

To start accepting real BankID logins from real legal persons, you must first enter into a formal agreement with a Norwegian Bank, 
possibly through Grean, or directly with you bank.

Once this agreement is in place you will receive a certificate to upload to Grean easyID. Go to the **IDENTITY SERVICES** tab 
and open the **NO BankID** section. This is where you will upload your organization's BankID certificate.

![Identity Service production](/media/articles/connections/grean/no-bankid-prod.png)






