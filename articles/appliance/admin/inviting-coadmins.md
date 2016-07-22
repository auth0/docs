# Appliance Administration: Inviting Co-Administrators

You may invite additional users to become co-administrators of your Appliance instances. This is done via the Appliance configuration area of the Management Dashboard.

> The User whom you'd like to be added as a co-administrator must be have an existing entity in the root tenant authority (RTA), or the primary tenant, in the Appliance. Do not create the users in the app tenants. Please see the section on [adding users via the Management Dashboard](/creating-users) for additional information.

[![](/media/articles/appliance/admin/invite-co-admins.png)](https://auth0-1.wistia.com/medias/2t8n98qc5j)

1. Switch over to the App Tenant so that you will have access to the Appliance configuration options.

2. Open up the Account Settings page.

3. Navigate to the Dashboard Admins tab.

4. Click "Add" to add the user as an administrator. You will be asked to provide the user's email address and to set the Applications over which they will have administrative rights. When finished, click "Send Invite".

At this point, if you have SMTP configured on the Appliance, the user will receive an email inviting them to log in as an administrator.

If you do not have SMTP configured, hover over the "pending" link next to the user's name, copy the link, and forward it, along with the new username/password, to the user. The user will be able to use the link and credentials to log in as an administrator.
