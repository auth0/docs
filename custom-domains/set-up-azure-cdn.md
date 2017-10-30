
## Configure Azure

Log in to Microsoft's [Azure Portal](https://azure.microsoft.com/en-us/features/azure-portal/).

![](/azure-dashboard.png)

In the navigation bar on the left, click on **+ New**. When the new blade appears, enter **CND** into the search bar, and in the results, select **CDN** (you'll see that Microsoft is the publisher and the Category is Web + Mobile). 

![](/cdn.png)

On the CDN profile page, scroll to the bottom of the page and click **Create**.

![](/cdn-home.png)

Provide the details for your CDN profile.

| Parameter | Value |
| - | - |
| Name | A descriptive name for your CDN profile |
| Subscription | CDNs are a paid feature, so select the Azure Subscription you want billed for your use of this service |
| Resource group | Select **Create new** and enter a name for your new resource group. If you're not familiar with what resource groups are, please see [Resource Group Overview](https://docs.microsoft.com/en-us/azure/azure-resource-manager/resource-group-overview) |
| Resource group location | The Azure location where your CDN profile is stored (it has no impact on the CDN's endpoint locations) |
| Pricing tier | Select **Premium Verizon**. |

![](/cdn-profile-1.png)

Underneath the parameters mentioned above, you'll see an option to **create a new CDN endpoint now**. Make sure that you check the box next to this option. You'll need to provide a few additional configuration values:

| Parameter | Value |
| - | - |
| CDN endpoint name | A descriptive name for the endpoint. We suggest using something similar to your custom domain (if not the domain itself) |
| Origin type | Select **Custom origin** |
| Origin hostname | Provide the fully-qualified URL using the following format: `www.tenant.custom_domain_id.edge.tenants.auth0.com`. Be sure to replace the `tenant` (this is the name of your Auth0 account and is reflected in your domain name as `tenant.auth0.com`) and `custom_domain_id` placeholder values. 

::: warning
If your Auth0 tenants are **not** in a US region, you'll need to use the following as your **Origin hostname**:

* EU: tenant.custom_domain_id.edge.tenants.eu.auth0.com
* AU: tenant.custom_domain_id.edge.tenants.au.auth0.com

Be sure to replace the `tenant` placeholder value with the name of your tenant.
:::

![](/cdn-profile-2.png)

Click **Create** to proceed.

While Azure creates your CDN, it'll redirect you to the Azure Portal Dashboard. You can check on its progress using the drop-down menu under the alarm bell icon.

![](/creating-profile.png)

When done, you'll see your new CDN profile and Endpoint under your list of resources.

![](/resources.png)

### Finish Configuring the Endpoint

At this point, we will need to finish configuring your newly-created endpoint. Under your list of resources (you can find this on the Dashboard page), select your endpoint to launch its configuration area.

![](/endpoint.png)

In the near-left column (under **Settings**), click **Origin**.

![](/endpoint-origin.png)

Check that the **Origin hostname** and the **Origin host header** values are identical. Then, uncheck the **HTTP** box to disable the protocol (you want to allow only calls using the HTTPS protocol).

![](/disable-http.png)

Return to the top of the window and click **Save**.

### Finish Configuring the CDN Profile

You will need to [add your custom domain name to your Azure CDN endpoint](https://docs.microsoft.com/en-us/azure/cdn/cdn-map-content-to-custom-domain#register-a-custom-domain-for-an-azure-cdn-endpoint-using-the-intermediary-cdnverify-subdomain).

Return to your Azure Portal Dashboard, and open up your newly-created CDN profile.

![](/cdn-profile.png)



