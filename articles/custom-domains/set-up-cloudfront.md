---
toc: true
name: Configure AWS CloudFront for Use as Reverse Proxy
description: How to set up AWS CloudFront for use as the custom domain proxy for Auth0
tags:
  - custom-domains
  - aws
  - cloudfront
---
# Configure AWS CloudFront for Use as Reverse Proxy
In this article, we will show you how to configure AWS CloudFront for use as the reverse proxy with custom domain names for your Auth0 tenant.

Log in to AWS, and navigate to [CloudFront](https://console.aws.amazon.com/cloudfront).

![](/media/articles/custom-domains/aws/cloudfront.png)

Click **Create Distribution**.

You can choose the delivery method for your content. Click **Get Started** under the **Web** section.

![](/media/articles/custom-domains/aws/delivery-method.png)

Next, configure your distribution settings. 

Under **Origin Settings**, here are the values you'll need to change:

| Parameter | Value |
| - | - |
| Origin Domain Name | Set this to the **Origin Domain Name** value obtained from the Auth0 Dashboard during the Custom Domains setup process |
| Origin ID | A description for the origin. This value lets you distinguish between multiple origins in the same distribution and therefore must be unique. |
| Origin Protocol Policy | Set to `HTTPS Only` |
| Alternate Domain Names (CNAMEs) | Set to your custom domain name (the same one your configured in the Auth0 Dashboard) |

![](/media/articles/custom-domains/aws/create-distribution.png)

You'll also need to provide information on the **Origin Custom Headers** (the **Header Name** and **Value** fields appear only after you've provided an **Origin Domain Name**):

| Parameter | Value |
| - | - |
| Header Name | Set to `cname-api-key` |
| Value | Set to the CNAME API Key value that you were given immediately after you verified ownership of your domain name with Auth0 |

![](/media/articles/custom-domains/aws/origin-custom-headers.png)

Next, you'll configure the **Default Cache Behavior Settings**. Here are the values you'll need to change:

| Parameter | Value |
| - | - |
| Viewer Protocol Policy | Select **Redirect HTTP to HTTPS** |
| Allowed HTTP Methods | Select **GET, HEAD, OPTIONS, PUT, POST, PATCH, DELETE** |
| Cache Based on Selected Request Headers | Select **Whitelist** |
| Whitelist Headers | Enter `User-Agent` and click **Add Custom >>** to add the custom whitelist header |
| Forward Cookies | Select **All** |
| Query String Forwarding and Caching | Select **Forward all, cache based on all** |

Scroll to the bottom of the page and click **Create Distribution**.

You'll see your newly-created distribution in your CloudFront Distributions list. Note that the Status will reflect `In progress` until the distribution is Deployed.

![](/media/articles/custom-domains/aws/distributions.png)

Finally, add a new CNAME record to your DNS for your custom domain pointing to the CloudFront Domain Name for your Distribution. This can be found by clicking on your Distribution ID, under the General tab, Domain Name (for example, `e2zwy42nt1feu7.cloudfront.net`).

Your CloudFront setup is now ready for use!
