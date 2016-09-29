---
description: This page has help and troubleshooting with using the connector.

# Troubleshooting

We do our best to support many scenarios and different configurations.

Unfortunately some issues are very hard to predict. Especially those that happen behind our customer's firewall. We have less control over that environment, and the related infrastructure dependencies (e.g. network, proxies, OS versions, etc).

If you are experiencing problems with the connector, please [open a support ticket](https://support.auth0.com) with the following information:

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

![](/media/articles/connector/troubleshooting/connector-admin-console-logs.png)

The __Run__ button on the __Troubleshooting__ page will run the troubleshooting tool to detect the most common problems related to the AD/LDAP Connector.

![](/media/articles/connector/troubleshooting/connector-admin-console-troubleshooter.png)

**Note:** In order to detect issues with certificates you'll need to set `CONNECTIONS_API_V2_KEY` in the `config.json` file as described [here](/connector/modify#using-the-configuration-file).

The __Export__ button will create a .zip file containing the `config.json` file, the `lib\\profileMapper.js` file, the `certs` folder and the output of the troubleshooting tool. Send this troubleshooting package to us by opening a [support ticket](https://support.auth0.com) if you're experiencing problems with the connector.

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


    nltest /dsgetdc:


When the domain does not exist or is unreachable `nltest` will return an error message:

    Getting DC name failed: Status = 1355 0x54b ERROR_NO_SUCH_DOMAIN

### UNABLE_TO_VERIFY_LEAF_SIGNATURE error message

This error applies to the AD/LDAP Connector in combination with the Auth0 Appliance.

When the connector will fail to start if unable to validate the SSL certificate configured in the appliance. This can happen when the Root Certificate (or any Intermediate Certificates) are missing in the machine's Certificate Store (Windows). In order to solve this you should import the certificate chain in the **Local Machine > Trusted Root** certificate store on the machine where the AD/LDAP Connector is installed.

### Running the connector behind a proxy

If the machine hosting the connector is behind a proxy, you can configure an `HTTP_PROXY` system environment variable pointing to the URL of your proxy, or you can set this variable in the `config.json` file in the connector installation directory.
If using an authenticated proxy, the URL must be in the format `http://USERNAME:PASSWORD@SERVER_URL:PORT`.

> Changing the `config.json` file or setting environment variables requires restarting the connector service for the changes to take effect.

The `HTTP_PROXY` URL cannot point to a [.pac (proxy auto-config) file](https://en.wikipedia.org/wiki/Proxy_auto-config), it must be the URL of the proxy itself.
If your proxy is configured through a .pac file, you must download the .pac file and find the proxy URL there.

An incorrectly configured proxy can result in several problems, such as:

* Auth0 servers not reachable
* `SELF_SIGNED_CERT_IN_CHAIN` errors

If you have configured a proxy URL and restarted the connector service but are still seeing `SELF_SIGNED_CERT_IN_CHAIN` errors, make sure that your server is trusting the root certificate of the proxy.
On Windows servers, you can check this by opening `certmgr.msc` and looking for your proxy's certificate.

### No internet connectivity

`https://${account.namespace}` should be reachable from the server.
A quick test for this is to open a browser pointing to [https://${account.namespace}/test](https://${account.namespace}/test).

### Service account permissions

The Service account used to configure the connector must have read permissions on the AD/LDAP server, as well as capable of querying groups for users.

### Kerberos issues

To enable verbose logging of Kerberos requests, add a system level environment variable `DEBUG=kerberos-server`. Then restart the Connector. Try logging in again, and check the logs for more information.

If you have Kerberos enabled, but your users are being prompt for username/password, you likely don't have the [IP address settings properly configured](/connector/kerberos#configuration).

### Changes in user profile in AD are not immediately reflected in the app

The Connector uses two levels of configurable caching:

* One on the Auth0 server, which caches both credentials and user profile.
* A second level in the connector itself, which only caches group membership of a user.

The server caches the _"last successfully authenticated user profile"_, including the username and password (hash). It is enabled by default, and can be disabled.

> The purpose of this first level cache is to maximize availability of authentication transactions when AD is unavailable (e.g. a network outage). It is only activated if the Connector/AD/LDAP servers are unavailable.

The Connector caches only *groups* a user might be a member of. Its lifetime is controlled with the `GROUPS_CACHE_SECONDS` configuration variable. If not present, the value is 600 seconds.

> Groups are cached, because by default, the Connector retrieves all group membership of a user recursively, which can be costly in some AD/LDAP installations. Cache is deleted on each Connector restart.

These two settings might affect how profile information flows to an app. But in general, AD changes don't happen very often. 

In some AD/LDAP installations, user attributes synchronization takes few minutes too.
