## Provide your domain name to Auth0

1. Go to [Dashboard > Tenant Settings](${manage_url}/#/tenant). 

2. Select the **Custom Domains** tab.

  <% if (platform === "auth0") { %>
  ![Tenant Settings](/media/articles/custom-domains/custom-domains.png)
  <%  } %>

  <% if (platform === "self") { %>
  ![Tenant Settings](/media/articles/custom-domains/custom-domains-self-managed.png)
  <% } %>

3. Enter your custom domain in the provided box and select **Auth0-managed certificates**. 

4. Click **Add Domain**.

  ::: note
  You can only add one domain per tenant even though the **Add Domain** button still appears after you add a domain.
  :::
