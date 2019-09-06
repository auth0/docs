Before you add support for native SIWA, you'll need:

* An [Apple Developer](https://developer.apple.com/programs/) account, which is a paid account with Apple. (There is no free trial available unless you are part of their [iOS Developer University Program](https://developer.apple.com/support/compare-memberships/)).
* A domain (such as `<YOUR CUSTOM DOMAIN>.com`) that you can use and point to (for web apps) and an internet-accessible server where you will run the app, and that responds on behalf of this domain. You will also need to configure this server with a TLS certificate (Apple won't accept unsecured HTTP connections). Lastly, to use the Email Relay Service (for web apps only), you will need to configure your domain with Sender Policy Framework (SPF) DNS TXT records. 
* A [Custom Domain](/custom-domains) set up on your Auth0 tenant for domain verification with Apple. Custom domains are not strictly required to use SIWA authorization. Domain validation is required for sending emails to private Apple addresses in native and web apps. 

::: note
You can set this up using [DigitalOcean](https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-18-04), [Freenom](https://freenom.com/), or [Let's Encrypt](https://letsencrypt.org/).
:::