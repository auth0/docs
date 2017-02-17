# Lock iOS: Passwordless with Magic Link


## Set Up Universal Link Domains for Your iOS App

iOS needs to know which domains your application handles. To configure this:

1. Go to your project's Xcode settings page and open the *Capabilities* tab.
2. Find the *Associated Domains* section, and move the slider (located near the top right) so that it displays **On**. This enables the use of Associated Domains.
3. Click on the **plus sign** to add your Auth0 Client's domain. You'll need to use the following format: `applinks:{$account.namespace}`
