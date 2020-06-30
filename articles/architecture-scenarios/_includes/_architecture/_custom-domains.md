When you setup your Auth0 tenant, the URL for accessing that tenant will be of the form  `https://${account.tenant}.auth0.com`. Providing a [Custom Domain](/custom-domains) (also known as a vanity URL), for your Auth0 tenant is not only an important factor for supporting your Branding requirements, but more importantly will also provide you with security benefits too:

* Some browsers will, by default, make it [difficult to communicate in an iFrame if you don't have a shared domain](/api-auth/token-renewal-in-safari).
* It's [harder to phish your domain if you have a vanity URL](https://auth0.com/blog/introducing-custom-domains-preview-with-auth0/), as the phisher must also create a vanity URL to mimic yours. For example, with a custom domain you can use your own certificate to get an "Extended Validation", making phishing even harder.

::: note
You are allowed only one custom domain per Auth0 Tenant. This is because a tenant in Auth0 is intended to represent a “domain” of users. If you need more than one vanity URL, then you likely have more than one domain of users and should be using multiple tenants.
:::

Your custom domain name should also give the user confidence that this is the appropriate place to enter their credentials, and we recommend that you create your custom domain in all environments early on to ensure that you are testing consistently between environments. **It's extremely important to train your users to to look for suspicious URLs when entering their credentials!**

::: panel Best Practice
Create a custom domain (a.k.a. `CNAME`) for your Auth0 tenant, and also create one in development too so you can ensure you have managed the `CNAME` correctly. For example, you could create a `CNAME` which maps `login.mycompany.com` to `mycompany-prod.auth0.com`.
:::

In almost all cases, customers have been most successful when adopting a strategy of a centralised domain for authentication across multiple product or service brands. This strategy provides users with a consistent UX, and also mitigates the complexity of deploying and maintaining multiple Auth0 tenants in a production environment. If you are considering having multiple domains for different brands, please refer to the [Branding](/architecture-scenarios/implementation/${platform}/${platform}-branding) guidance before you begin implementing.
