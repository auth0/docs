---
section: appliance
---

# Appliance Administration: Inviting Co-Administrators

You may invite additional users to become co-administrators of your Appliance instances. This is done via the Appliance configuration area of the Management Dashboard.

> Administrators for the Appliance instances are authenticated with the root tenant authority (RTA, the primary tenant, sometimes called the **config** tenant). The Dashboard is represented by the **"Auth0"** app/client in the RTA account. By default the RTA has a DB connection enabled, **"Initial-Connection"**, that is used to authenticate Dashboard users. 
Since that connection has signups disabled, users will be have to be created beforehand.

[![](/media/articles/appliance/admin/invite-co-admins.png)](https://auth0-1.wistia.com/medias/2t8n98qc5j)

1. In the RTA tenant (usually named **rta** or **config**) add a new user in the **Initial-Connection** connection with the email of the administrator you will invite, and choose a password. Please see the section on [adding users via the Management Dashboard](/creating-users) for additional information.

2. Switch over to the App Tenant so that you will have access to the Appliance configuration options.

3. Open up the Account Settings page.

4. Navigate to the Dashboard Admins tab.

5. Click "Add" to add the user as an administrator. You will be asked to provide the user's email address and to set the Applications over which they will have administrative rights. When finished, click "Send Invite".

At this point, if you have SMTP configured on the Appliance, the user will receive an email inviting them to log in as an administrator. He will have to user the email and password used in step 1.

If you do not have SMTP configured, hover over the "pending" link next to the user's name, copy the link, and forward it, along with the new username/password, to the user. The user will be able to use the link and credentials to log in as an administrator.
