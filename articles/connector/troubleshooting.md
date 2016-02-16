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

![](/media/articles/connector/troubleshooting/adldap-connector-version.png)

## Troubleshooting in the Admin Console

The __Troubleshooting__ section in the Admin Console will show the logs for the AD/LDAP Connector:

![](https://cdn.auth0.com/docs/img/connector-admin-console-logs.png)

The __Run__ button on the __Troubleshooting__ page will run the troubleshooting tool to detect the most common problems related to the AD/LDAP Connector.

![](https://cdn.auth0.com/docs/img/connector-admin-console-troubleshooter.png)

+**Note:** in order to detect issues with certificates you'll need to set `CONNECTIONS_API_V2_KEY` in the `config.json` file as described [here](/connector/modify#using-the-configuration-file).

The __Export__ button will create a .zip file containing the `config.json` file, the `lib\\profileMapper.js` file, the `certs` folder and the output of the troubleshooting tool. Send this troubleshooting package to [support](mailto:support@auth0.com) if you're experiencing problems with the connector.

## Troubleshooting Tool

The troubleshooting tool is part of the AD LDAP Connector and can be launched on Windows using **C:\Program Files (x86)\Auth0\AD LDAP Connector\troubleshoot.cmd** or on Linux using **node troubleshoot.js**.

This tool will try to detect the most common problems related to the AD/LDAP Connector:

![](/media/articles/connector/troubleshooting/connector-troubleshooter.png)

## Common issues

These are the most common problems:

### Clock skew

Make sure the clock of your server is current.

If the time is not correct, it will cause authentication requests to fail. This can be fixed by ensuring that the System is properly configured to use to pool a sync server via the NTP (Network Time Protocol).

Note: on windows environments the ntp provider is usually the same domain controller. Make sure that your Domain Controller is synchronized with some external service.

### No connection to Active Directory

The connector should be installed on a server that can reach the LDAP server. When firewalls, VPN connections, ... are placed between the connector and the LDAP server this might lead to connectivity issues between the connector and the LDAP server.

In a Windows Network with Active Directory you can try the `nltest` command. To test if a specific machine can reach the `fabrikam.local` domain you can try `nltest /dsgetdc:fabrikam.local`.

![](/media/articles/connector/troubleshooting/connector-nltest-domain.png)

To see to which domain the current server is connected you can also try:

```
nltest /dsgetdc:
```

When the domain does not exist or is unreachable `nltest` will return an error message:

> Getting DC name failed: Status = 1355 0x54b ERROR_NO_SUCH_DOMAIN

### UNABLE_TO_VERIFY_LEAF_SIGNATURE error message

This error applies to the AD/LDAP Connector in combination with the Auth0 Appliance. 

When the connector will fail to start if unable to validate the SSL certificate configured in the appliance. This can happen when the Root Certificate (or any Intermediate Certificates) are missing in the machine's Certificate Store (Windows). In order to solve this you should import the certificate chain in the **Local Machine > Trusted Root** certificate store on the machine where the AD/LDAP Connector is installed.

### No internet connectivity

`https://${account.namespace}` should be reachable from the server.

If proxies are installed, make sure they are configured correctly.

A quick test for this is to open a browser pointing to [https://${account.namespace}/test](https://${account.namespace}/test).

We don't recommend using Proxies for the connector, but if you need to use one, you can setup an environment variable `HTTP_PROXY=http://your_proxy`.

### Service account permissions

The Service account used to configure the connector must have read permissions on the AD/LDAP server, as well as capable of querying groups for users.
