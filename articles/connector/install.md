# Installing the Connector on Windows

## Download the installer

The Connector is packaged as a standard Microsoft Installer file (__MSI__). Download from here:

<div class="platform-selector">
  <div class="installers"  style="display: block; margin: auto;">
    <ul>
      <li>
        <a class="download-link" href="http://cdn.auth0.com/adldap.msi">
          <img src="//cdn.auth0.com/docs/img/node-windows.png" alt="">
          Auth0 Active Directory/LDAP Connector for Windows
          <small class="download-version"></small>
        </a>
        <span class="hash"></span>
      </li>
    </ul>
  </div>

<script type="text/javascript">
  $.getJSON('https://cdn.auth0.com/connector/windows/latest.json', function (data) {
    $('.download-link').attr('href', data.url);
    $('.download-version').text('Current version: ' + data.version);
    $('.hash').text('Checksum (SHA1): ' + data.checksum);
  })
</script>

## Run the installer

Run the installer and follow the instructions:

![](/media/articles/connector/install/adldap-connector-setup.png)

The __AD/LDAP Connector__ in Windows is installed as a Windows Service:

![](/media/articles/connector/install/adldap-connector-services.png)

## Link to Auth0

Once the installation is complete, you will see the following screen in a browser pointing to localhost:

![](/media/articles/connector/install/adldap-connector-admin-ticket.png)

Enter the __TICKET URL__ provided when you provisioned the connection.

The __TICKET URL__ uniquely identifies this connector in Auth0. The Connector will use this to communicate with Auth0 Server and automatically complete the configuration.

## Link to LDAP

Once you have entered the __TICKET URL__, you must enter the LDAP settings:

![](/media/articles/connector/install/adldap-connector-admin-settings.png)

-  **LDAP Connection String (eg: ldap://ldap.internal.contoso.com):** This is the protocol + the domain name or ip address of your LDAP server. The protocol can be either `ldap` or `ldaps`. If you need to use `ldaps` make sure that the certificate is valid in the current server.
-  **Base DN (eg: dc=contoso,dc=com):** This is the base container for all the queries performed by the connector.
-  **Username (eg: cn=svcauth0,dc=services,dc=contoso,dc=com):** The full distinguish name of a user to perform queries.
-  **Password:** The password of the user.

Once you submit the above information, the connector will perform a series of tests:

![](/media/articles/connector/install/adldap-connector-admin-settings-ok.png)

Make sure that all tests are in green.

Congratulations, your connector is installed and ready to use.

## Troubleshooting

After clicking "Save", the AD/LDAP Connector configuration console will perform a series of tests to validate the entered information.  The results of the tests are displayed under the **"Configuration log"** heading in the console screen.  An explanation is provided below of the tests performed.

Test 1: Attempts to establish a TCP connection to the LDAP server and port specified.

If Test 1 fails, check basic network connectivity and firewall settings that might prevent such a connection.

Test 2: Attempts to perform an LDAP bind on the LDAP server and port specified and with the username and password provided.

If Test 2 fails, check the LDAP connection string, search path, username and password.

Test 3: Attempts to perform an LDAP search against the directory to check the privileges of the specified username.

If Test 3 fails, check the privileges of the username in the target directory.

Test 4: Attempts to establish a connection to the Auth0 server.

If Test 4 fails, check network connectivity and firewall settings that might prevent such a connection.
