# Kerberos Support

Kerberos is a security protocol used by Active Directory which is based on tickets and can provide nearly invisible authentication to users on domain-joined machines. This allows users to use resources in the corporate network (eg: SharePoint, Dynamics CRM, Web Applications) without having to enter their credentials for each application.

The AD/LDAP connector supports Kerberos to make it easer for your users to authenticate when they are on a domain-joined machine within the corporate network.

## Configuration

To activate Kerberos on an Active Directory, simply enable the option in the dashboard.

![](/media/articles/connector/kerberos/connector-kerberos-configuration.png)

After enabling Kerberos you'll also be able to configure the **IP Ranges**. When users originate from these IP address ranges this information will be exposed in the **SSO endpoint** which means client-side SDKs like **auth0.js** and the **Lock** will be able to detect Kerberos support and allow Integrated Windows Authentication.

> We recommend restarting the Windows Service that hosts the AD Connector every time this setting is changed. This way, changes will take effect immediately.

The IP addresses are configured using the [CIDR-notation](http://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing). Note that these should be ranges that are visible by Auth0. If Auth0 is deployed on-premises you'll typically enter internal IP address ranges of your users.

When Auth0 is running in the cloud, it won't be able to see your user's internal IP address. In that case you'd configure the public facing/WAN IP address(es) of your company.

> Normally the step above is not necessary. When Kerberos is enabled, Auth0 server will assume all requests coming from that IP address are originating from your intranet. For normal use then, simply turn Kerberos on and then leave the IP configurations empty. If your intranet spans multiple networks and those are different from where the connector is installed, then it is important to define it here.

## Flow

Depending on the location of the user the authentication flow will be different when Kerberos is enabled. Let's take Fabrikam as an example. Since Fabrikam uses the SaaS version of Auth0 they configured their Public IP Address (`24.12.34.56/32`) in the connection.

Users connecting from within the building will all originate from `24.12.34.56` (as configured on the connection). When they authenticate, the users can follow the Kerberos flow and have a seamless SSO experience.

**Note:** For this to work, the network must allow the users to connect to the AD/LDAP Connector on the port configured in the `config.json` file. In [highly available](/connector/high-availability) deployments of the connector, the address users will be connecting to is the network load balancer in front of all connectors instances.

![](/media/articles/connector/kerberos/connector-kerberos-flow.png)

On the other hand, when users are not in the corporate network (e.g.: at a customer, working from home without VPN) they won't be able to access the AD/LDAP Connector directly. The users will need to enter their username/password, and Auth0 will validate these credentials with the AD/LDAP Connector (which will in turn use Active Directory to validate those credentials).

![](/media/articles/connector/kerberos/connector-credentials-flow.png)

## Auto-login with Lock

When an application is using the Login Page hosted by Auth0 (typicaly used for SAML/WS-Federation protocols and SSO Integrations) the Lock will show a button which allows users to authenticate using "Windows Authentication". If they don't want to use this they can continue and have the Lock show all other available connections.

In some cases the requirement could be to automatically sign in the user if Kerberos is possible (based on the IP-address of the end user). The following changes can be added to the Auth0 Login Page (or to your own page hosting the Lock) to automatically sign in the user if Kerberos is possible:

```js
/*
 * Helper to get a querystring value.
 */
function getParameterByName( name ){
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( window.location.href );
  if( results == null )
    return "";
  else
    return decodeURIComponent(results[1].replace(/\+/g, " "));
}

/*
 * Verify if Kerberos is possible (based on the IP address).
 * If it is, try to authenticate the user.
 */
lock.$auth0.getSSOData(true, function(err, data) {
  if (!err) {
    if (data.connection && data.strategy === 'ad') {
      lock.$auth0.signin({
        connection: data.connection,
        state: getParameterByName('state'),
        protocol: getParameterByName('protocol') || 'oauth2',
        scope: getParameterByName('scope') || 'openid'
      });
    }
  }
});
```
## Troubleshooting

To enable verbose logging of Kerberos requests, add a system level environment variable `DEBUG=kerberos-server`. Then restart the Connector. Try logging in again, and check the logs for more information.
