# Troubleshooting

We do our best to support many scenarios and different configurations.

Unfortunately some issues are very hard to predict. Especially those that happen behind our customer's firewall. We have less control over that environment, and the related infrastructure dependencies (e.g. network, proxies, OS versions, etc).

If you are experiencing problems with the connector, please send us an email to [support](mailto:support@auth0.com) with the following information:

-  Symptoms, explain your problem
-  the `config.json` from:
    -  Windows: **C:\Program Files (x86)\Auth0\AD LDAP Connector\config.json**
    -  Linux: **/opt/auth0-adldap/config.json**
-  the service log files from:
    -  Windows: **C:\Program Files (x86)\Auth0\AD LDAP Connector\logs.log**
    -  Linux: **/var/log/auth0-adldap.log**

These logs are not accessible to us directly.

It is usually a good idea to keep the connector up to date. You can check the version of the installed connector on the Dashboard:

![](https://cdn.auth0.com/docs/img/adldap-connector-version.png)

##Common issues

These are the most common problems:

### Clock skew

Make sure the clock of your server is current.

If the time is not correct, it will cause authentication requests to fail. This can be fixed by ensuring that the System is properly configured to use to pool a sync server via the NTP (Network Time Protocol).

Note: on windows environments the ntp provider is usually the same domain controller. Make sure that your Domain Controller is synchronized with some external service.

### No internet connectivity

`https://@@account.namespace@@` should be reachable from the server.

If proxies are installed, make sure they are configured correctly.

A quick test for this is to open a browser pointing to [https://@@account.namespace@@/test](https://@@account.namespace@@/test).

We don't recommend using Proxies for the connector, but if you need to use one, you can setup an environment variable `HTTP_PROXY=http://your_proxy`.

### Service account permissions

The Service account used to configure the connector must have read permissions on the AD/LDAP server, as well as capable of querying groups for users.
