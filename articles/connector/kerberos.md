---
description: Explains AD/LDAP Federation Support with Auth0, how to configure it, the flow, and auto-login with Lock.
toc: true
topics:
  - connector
  - ad/ldap
  - kerberos
contentType: 
    - how-to
    - concept
useCase:
  - add-login
  - customize-connections
  - add-idp
---
# Federating with Active Directory through the AD/LDAP Connector

The AD/LDAP connector makes it easy for your users to authenticate when they are on a domain-joined machine within the corporate network.

## Configuration

To activate this feature for Active Directory/LDAP, simply enable the option in the Dashboard. 

Go to the **Connections > Enterprise > Active Directory > LDAP**, select the connection you want configure, and click the **Settings** icon.

![](/media/articles/connector/kerberos/connector-kerberos-configuration.png)

After enabling it, you'll also be able to configure the **IP Ranges**. When users originate from these IP address ranges Auth0 will be able to redirect to the AD/LDAP identity provider and leverage their native authentication mechanisms.

The IP addresses are configured using the [CIDR-notation](http://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing). Note that these should be ranges that are visible by Auth0. If Auth0 is deployed on-premises you'll typically enter internal IP address ranges of your users.

::: note
We recommend restarting the Windows Service that hosts the AD Connector every time this setting is changed. This way, changes will take effect immediately.
:::

When Auth0 is running in the cloud, it won't be able to see your user's internal IP address. In that case you'd configure the public facing/WAN IP address(es) of your company.

### Auto-detected range for Kerberos

When Kerberos authentication is enabled, the visible IP address of the server where the AD Connector is running is implicitly added to the network IP range.  

This means that if a user's requests originate from the same visible IP address as that of the AD Connector, then Kerberos authentication will be attempted.

## Flow

Depending on the location of the user the authentication flow will be different when IP ranges are set. Let's take Fabrikam as an example. Since Fabrikam uses the SaaS version of Auth0 they configured their Public IP Address (`24.12.34.56/32`) in the connection.

Users connecting from within the building will all originate from `24.12.34.56` (as configured on the connection). When they authenticate, the users can follow the AD/LDAP native flow and have a seamless <dfn data-key="single-sign-on">Single Sign-on (SSO)</dfn> experience.

::: note
For this to work, the network must allow the users to connect to the AD/LDAP Connector on the port configured in the `config.json` file. In [highly available](/connector/high-availability) deployments of the connector, the address users will be connecting to is the network load balancer in front of all connectors instances.
:::

![](/media/articles/connector/kerberos/connector-kerberos-flow.png)

On the other hand, when users are not in the corporate network (for example, at a customer site, working from home without VPN) they won't be able to access the AD/LDAP Connector directly. The users will need to enter their username/password, and Auth0 will validate these credentials with the AD/LDAP Connector (which will in turn use Active Directory to validate those credentials).

![](/media/articles/connector/kerberos/connector-credentials-flow.png)

## Auto-login with Lock

::: warning
Detecting IP ranges in an Active Directory/LDAP connection and using those ranges with Lock to allow integrated Windows Authentication is a feature that works in Lock 10, but can only be used in Lock 11 in Universal Login scenarios. This feature is *disabled* in Lock 11 when Lock 11 is used in Embedded Login scenarios.
:::

When an application is using Lock 10 or 11 within the Login Page hosted by Auth0 (typically used for <dfn data-key="security-assertion-markup-language">SAML</dfn>/WS-Federation protocols and <dfn data-key="single-sign-on">Single Sign-on (SSO)</dfn> Integrations), there will be a button which allows users to authenticate using "Windows Authentication". 

In some cases the requirement could be to automatically sign in the user if Kerberos is possible (based on the IP-address of the end user). The following changes can be added to the Auth0 Login Page to automatically sign in the user if Kerberos is possible:

```html
<script src="https://cdn.auth0.com/js/lock/11.x.x/lock.min.js"></script>
<script src="https://cdn.auth0.com/js/auth0/9.x/auth0.min.js"></script>
<script src="https://cdn.auth0.com/js/polyfills/1.0/object-assign.min.js"></script>

<script>
  var config = JSON.parse(decodeURIComponent(escape(window.atob('@@config@@'))));
  
  var lock = new Auth0Lock(config.clientID, config.auth0Domain, {
      //...additional configuration
  });
  
  function handleError(err) {
    // add proper error handling
    console.log(err);
  };
  
  var params = Object.assign(
    {
      /* additional configuration needed for use of custom domains 
      overrides: {
        __tenant: config.auth0Tenant,
        __token_issuer: 'YOUR_CUSTOM_DOMAIN'
      }, */
      domain: config.auth0Domain,
      clientID: config.clientID,
      redirectUri: config.callbackURL,
      responseType: 'code'
    },
    config.internalOptions
  );
  
  var webAuth = new auth0.WebAuth(params);
  
  /*
   * Verify if Kerberos is possible, if it is, try to authenticate the user.
   *
   * the response from getSSOData will only have a connection and strategy if 
   * the IP address is within the Kerberos range in the connection's settings
   */
  webAuth.client.getSSOData(true, function(err, data) {
    if (err) handleError(err);
  
    if (data.connection && data.strategy === 'ad') {
      webAuth.authorize({connection: data.connection}, function(err) {
        if (err) handleError(err);
      });
    } else {
      lock.show();
    }
  });
</script>
```

## Skipping Kerberos at runtime

You can prevent Kerberos from being used, even if the user is logging in from an IP address within the range configured in the connection's settings, by passing `rememberLastLogin: false` to `lock.show()`


```js

function useKerberos() {
  // return true to use Kerberos, false to bypass
};

lock.show({rememberLastLogin: useKerberos()});
```

## Troubleshooting

To enable verbose logging of Kerberos requests, add a system level environment variable `DEBUG=kerberos-server`. Then restart the Connector. Try logging in again, and check the logs for more information.

## Firefox support for Kerberos

By default, [Firefox](https://www.mozilla.org/firefox) [rejects all "negotiate" requests required to authenticate users with Kerberos](https://developer.mozilla.org/en-US/docs/Mozilla/Integrated_authentication). If you wish to use Firefox with Kerberos, you need to whitelist the server where the connector is installed. To do that:

* Open a Firefox tab and type `about:config` in the address bar.
* Dismiss any warning message, and in the search box type `negotiate`.
* Locate the `network.negotiate-auth.trusted-uris` item and double click to change its value.
* Type the domain name of the server where the connector is installed. If you have multiple instances of the connector behind a load balancer, add the dns name of the balancer. 
The value accepts a comma-separated list of URL prefixes or domains in the form of `mydomain.com, https://myotherdomain.com`.
* Click **Ok**. You don't need to restart the server for the changes to take effect.
