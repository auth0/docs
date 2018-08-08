---
section: appliance
description: How to invite additional administrators to your PSaaS Appliance
topics:
    - appliance
    - coadmins
contentType: how-to
useCase: appliance
applianceId: appliance5
---

# PSaaS Appliance Administration: Inviting Co-Administrators

::: panel-warning PSaaS Appliance in the Dedicated Cloud Service
If you have a PSaaS Appliance in the Dedicated Cloud Service, you do not have access to the RTA tenant, since Auth0 manages this on your behalf. To add new administrators, you'll need to [contact Support](${env.DOMAIN_URL_SUPPORT}) (be sure to mention that you have a PSaaS Appliance in the Dedicated Cloud Service). 

If you're an existing tenant administrator, you can simply forward the tenant administrator invitation link to new administrators.
:::

You may invite additional users to become co-administrators of your PSaaS Appliance. This is done via the PSaaS Appliance configuration area of the Management Dashboard.

::: panel Root Tenant Authority
Administrators for the PSaaS Appliance are authenticated with the root tenant authority (RTA, the primary tenant, sometimes called the **config** tenant). The Dashboard is represented by the **"Auth0"** app/client in the RTA account. By default the RTA has a DB connection enabled, **"Initial-Connection"**, that is used to authenticate Dashboard users.
Since that connection has signups disabled, users will be have to be created beforehand.
:::

[![](/media/articles/appliance/admin/invite-co-admins.png)](https://auth0-1.wistia.com/medias/2t8n98qc5j)

1. In the RTA tenant (usually named **rta** or **config**) add a new user in the **Initial-Connection** connection with the email of the administrator you will invite, and choose a password. Please see the section on [adding users via the Management Dashboard](/creating-users) for additional information.

2. Switch over to the App Tenant so that you will have access to the PSaaS Appliance configuration options.

3. Open up the Account Settings page.

4. Navigate to the Dashboard Admins tab.

5. Click "Add" to add the user as an administrator. You will be asked to provide the user's email address and to set the Applications over which they will have administrative rights. When finished, click "Send Invite".

At this point, if you have SMTP configured on the PSaaS Appliance, the user will receive an email inviting them to log in as an administrator. They will need to use the email and password used in step 1.

If you do not have SMTP configured, hover over the "pending" link next to the user's name, copy the link, and forward it, along with the new username/password, to the user. The user will be able to use the link and credentials to log in as an administrator.
