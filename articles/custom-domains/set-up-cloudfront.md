---
name: Configure AWS CloudFront for Use as Reverse Proxy
description: Learn how to configure AWS CloudFront for use as the custom domain proxy for Auth0.
topics:
  - custom-domains
  - aws
  - cloudfront
  - reverse-proxy
contentType: how-to
useCase: 
  - customize-domains
  - self-managed-certificates
---
# Configure AWS CloudFront for Use as Reverse Proxy

<%= include('./_subscription') %>

You can configure AWS CloudFront for use as the reverse proxy with custom domain names for your Auth0 tenant.

1. Log in to AWS, and navigate to [CloudFront](https://console.aws.amazon.com/cloudfront).

  ![Cloudfront Getting Started](/media/articles/custom-domains/aws/cloudfront.png)

2. Click **Create Distribution**.

3. You can choose the delivery method for your content. Click **Get Started** under the **Web** section.

  ![Select Delivery Method](/media/articles/custom-domains/aws/delivery-method.png)

4. Configure your distribution settings. Under **Origin Settings**, here are the values you'll need to change:

  | Setting | Value |
  | - | - |
  | Origin Domain Name | Set this to the **Origin Domain Name** value obtained from the Auth0 Dashboard during the Custom Domains setup process |
  | Origin ID | A description for the origin. This value lets you distinguish between multiple origins in the same distribution and therefore must be unique. |
  | Origin Protocol Policy | Set to `HTTPS Only` |
  | Alternate Domain Names (CNAMEs) | Set to your custom domain name (the same one your configured in the Auth0 Dashboard) |
  | SSL Certificate | Set to the SSL Certificate for your custom domain stored in AWS Certificate Manager (ACM) in the US East(N. Virginia) Region or in IAM. |

  ![Create Distribution](/media/articles/custom-domains/aws/create-distribution.png)

5. Provide information on the **Origin Custom Headers** (the **Header Name** and **Value** fields appear only after you've provided an **Origin Domain Name**):

  | Setting | Value |
  | - | - |
  | Header Name | Set to `cname-api-key` |
  | Value | Set to the CNAME API Key value that you were given immediately after you verified ownership of your domain name with Auth0 |

  ![Origin Custom Headers](/media/articles/custom-domains/aws/origin-custom-headers.png)

6. Configure the **Default Cache Behavior Settings**. Here are the values you'll need to change:

  | Setting | Value |
  | - | - |
  | Viewer Protocol Policy | Select **Redirect HTTP to HTTPS** |
  | Allowed HTTP Methods | Select **GET, HEAD, OPTIONS, PUT, POST, PATCH, DELETE** |
  | Cache Based on Selected Request Headers | Select **Whitelist** |
  | Whitelist Headers | Enter `User-Agent` and click **Add Custom >>** to add the custom whitelist header. Do the same for `Origin`, `Referer` and `Accept` headers. |
  | Forward Cookies | Select **All** |
  | Query String Forwarding and Caching | Select **Forward all, cache based on all** |

7. Scroll to the bottom of the page and click **Create Distribution**.

  You'll see your newly-created distribution in your CloudFront Distributions list. Note that the Status will reflect `In progress` until the distribution is Deployed.

  ![Cloudfront Distributions](/media/articles/custom-domains/aws/distributions.png)

8. Add a new CNAME record to your DNS for your custom domain pointing to the CloudFront Domain Name for your Distribution. This can be found by clicking on your Distribution ID, under the General tab, Domain Name (for example, `e2zwy42nt1feu7.cloudfront.net`).

## Keep reading

* [Troubleshooting Custom Domains](/custom-domains/troubleshoot)
* [Configure Custom Domains with Self-Managed Certificates](/custom-domains/self-managed-certificates)
