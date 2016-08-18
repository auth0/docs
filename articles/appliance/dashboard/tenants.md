---
section: appliance
---

# Auth0 Appliance Dashboard: Tenants

> For additional information on navigating to and using the Appliance Dashboard, please see the section on [Appliance Controls](/appliance/dashboard#appliance-controls).

The Tenants page of the Appliance Dashboard lists all tenants associated with your Appliance instance.

![](/media/articles/appliance/dashboard/tenants.png)

For each associated tenant, you will see the following pieces of information:

* **Name**: the name of the tenant;
* **Clients**: the number of clients associated with the tenant;
* **Connections**: the number of Connections enabled for the tenant;
* **Total Users**: the total number of users associated with the tenant;
* **Total Logins**: the total number of logins by users associated with the tenant.

## Custom Domains

![](/media/articles/appliance/dashboard/tenant-custom-domain.png)

The name column of the Tenants page is a hyperlink. Clicking on this brings up the page where you can set up custom domains for this particular tenant, as well overview information for any currently-existing custom domains.

### Adding a Custom Domain

To add a custom domain, click on the "Add Domain" button. You will be prompted for the following information:


![](/media/articles/appliance/dashboard/tenant-add-custom-domain.png)

* **Domain**: the custom domain for your tenant;
* **SSL Available**: the SSL certificate format (either *PFX/PKCS12* or *Standard PEM*);

    *If you are using a PFX/PKCS12 certificate:*
* **SSL PFX Cert**: the password associated with your PFX/PKCS12 certificate;
* **PFX Certificate**: clicking this button enables you to upload a copy of your PFX Certificate;

    *If you are using a Standard PEM certificate:*
* **Upload Public Key...**: clicking this button enables you to upload the file containing your public key;
* **Upload Private Key...**: clicking this button enables you to upload the file containing your private key.

    **NOTE: The private key cannot be password protected.**

Once you have provided the required information and uploaded your certificate, click the "Add" button to save your changes and add the custom domain. You will then see a green banner appear on the Custom Domain page that says:

`Updating configuration... check Activity section for progress.`

Once the change has been implemented and you have refreshed the custom domains page, you will see the following overview information about your newly-created domain:

* **Domain**: the custom domain URL;
* **SSL Available**: indicates successful application of the SSL certificate;
* **Certificate Subject**: the subject of the certificate, or the target of the certificate (e.g. what is being secured);
* **Certificate Expiration**: the date and time when the certificate expires;
* **Remove Domain**: clicking the "X" button removes this domain from the tenant.
