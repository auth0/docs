
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

However, before you proceed, create a CNAME entry in your DNS record for the custom domain name that points to the CDN endpoint name. It'll look something like this: `login.mydomain.com CNAME login-mydomain-com.azureedge.net`.

At this point, return to your Azure Portal Dashboard, and open up your newly-created CDN profile.

![](/new-cdn-profile.png)

In the near-left navigation menu, select **Endpoints**, which is located under the **General** section.

![](/cdn-endpoints.png)

Select your endpoint.

![](/select-endpoint.png)

Click **+ Custom Domain** located in the tool bar near the top.

![](/cdn-otpions.png)

In the **Custom hostname** dialog box, provide your custom domain, including the subdomain (for example `login.mydomain.com`).

![](/provide-custom-hostname.png)

Azure will verify that the CNAME record exists and that it's pointing to the CDN's public DNS name. If successful, click **Add** to proceed.

#### Enable HTTPS for the Custom Domain

Now that you have created the custom domain, be sure to [enable HTTPS for the domain name](https://docs.microsoft.com/en-us/azure/cdn/cdn-custom-ssl). This process will require you to verify ownership of the domain. Afterwards, it will take Azure up to six hours to deploy the certificate to all the CDN pop locations.

### Configure Communication with Auth0

In this step, you will setup the configuration for the custom domain's communication with Auth0 by using the Azure CDN [Rules Engine](https://docs.microsoft.com/en-us/azure/cdn/cdn-rules-engine).

From the Azure Portal Dashboard, open up your CDN profile, and select **Manage**.

![](/manage-cdn-profile.png)

Hover over the **HTTP Large** option and click **Rules Engine**.

![](/select-rules-engine.png)

First, provide a **Name** for your rule, such as **Auth0 Custom Domain**.

You will create a rule that allows only requests sent to the custom domain to be processed by Auth0. Therefore, in the list of request types, select **Edge CName**. In the new drop-down menu that appears after making this choice, select your custom domain name.

Now, you'll need to add two features to your rule (you can add one feature at a time by clicking the **plus icon** next to **Features**).

* First Feature: Select **Bypass Cache** and set to **Enabled**
* Second Feature: Select **Modify Client Request Header** and select **Overwrite**. Set the **Name** to **cname-api-key** and provide your CNAME API Key provided by Auth0 in the **Value** field

When done, click **Add** to save your rule. All new rules require approval, which may take as long as four hours. You'll know that your rule has been approved when the status changes from **Pending XML** to **Active XML**.

::: note
We suggest you create another rule to deny usage of the `azureedge.net` CNAME.
:::

![](/configure-rule.png)

## Summary

In this article, we showed you how to configure Azure for use as the custom domain proxy for Auth0.
