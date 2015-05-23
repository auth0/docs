# Kerberos Support

Kerberos is a security protocol used in Active Directory which is based on tickets and can provide nearly invisible authentication to users on domain-joined machines. This allows users to use resources in the corporate network (eg: SharePoint, Dynamics CRM, Web Applications) without having to enter their credentials for each application.

The AD/LDAP connector supports Kerberos to make it easer for your users to authenticate when they're on a domain-joined machine within the corporate network.

## Configuration 

To activate Kerberos on an Active Directory, simply enable the option in the dashboard.

![](../../media/articles/connector/kerberos/connector-kerberos-configuration.png)

After enabling Kerberos you'll also be able to configure the **IP Ranges**. When users originate from these IP address ranges this information will be exposed in the **SSO endpoint** which means client-side SDKs like **auth0.js** and the **Lock** will be able to detect Kerberos support and allow Integrated Windows Authentication.

The IP addresses are configured using the [CIDR-notation](http://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing). Note that these should be ranges that are visible by Auth0. If Auth0 is deployed on-premises you'll typically enter internal IP address ranges of your users. 

But when Auth0 is running in the cloud, it won't be able to see your user's internal IP address. In that case you'll configure the Public/WAN IP address(es) of the office/your company/...

## Flow

Depending on the location of the user the authentication flow will be different when Kerberos is enabled. Let's take Fabrikam as an example. Since Fabrikam uses the SaaS version of Auth0 they configured their Public IP Address (`24.12.34.56/32`) in the connection.

Users connecting from within the building will all originate from `24.12.34.56` (as configured on the connection). When they authenticate, the users can follow the Kerberos flow and have a SSO experience.

**Note:** For this to work, the network must allow the users to connect to the AD/LDAP Connector on the port configured in the `config.json` file.

![](../../media/articles/connector/kerberos/connector-kerberos-flow.png)

On the other hand, when users are not in the corporate network (eg: at a customer) they won't be able to access the AD/LDAP Connector directly. The users will need to enter their username/password and Auth0 will validate these credentials with the AD/LDAP Connector (which will in turn talk to Active Directory).

![](../../media/articles/connector/kerberos/connector-credentials-flow.png)

## End-user Experience

Users on a domain-joined machine, coming from the configured IP addres range:

![Login Kerberos](../../media/articles/connector/kerberos/office-365-idp-login-kerberos.gif)

Users that are not in the corporate network will need to enter their AD credentials:

![Login External](../../media/articles/connector/kerberos/office-365-idp-login-external.gif)

