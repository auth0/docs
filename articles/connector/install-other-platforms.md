---
description: A guide on installing the AD/LDAP Connector on different platforms.
---

# Install the AD LDAP Connector on different platforms

**NOTE**: On most platforms, you will need to run the following steps as root (e.g. `sudo su`).

1. [Install Git](https://git-scm.com/download/linux).
2. [Install Node.js](https://nodejs.org).
3. [Install npm](http://blog.npmjs.org/post/85484771375/how-to-install-npm).
4. Use the GitHub repository to download the package <a class="download-github" href=""></a> to `/tmp`: <br>
    <code class="curl-example"></code>
5. Expand the package and install dependencies:

    ```
    mkdir /opt/auth0-adldap
    tar -xzf /tmp/adldap.tar.gz -C /opt/auth0-adldap --strip-components=1
    cd /opt/auth0-adldap
    npm install
    ```
6. Run `node server.js` and insert the full ticket URL from the **Setup AD/LDAP connector** screen in the Auth0 console when prompted for "ticket number".

    ```
    Please enter the ticket number: https://YOUR_DOMAIN.auth0.com/some/other/stuff
    ```

7. You will be asked to edit the `config.json` configuration file. If you're using LDAP, see: [Modifying the Connector Settings](/connector/modify). Edit the `config.json` file to add your LDAP connection and authentication details as follows:

    ```
    "LDAP_URL": "ldap://YOUR_LDAP_SERVER_FQDN",
    "LDAP_BASE": "dc=YOURDOMAIN,dc=com",
    "LDAP_BIND_USER":"YOUR_LDAP_USER",
    "LDAP_BIND_PASSWORD":"YOUR_LDAP_USER_PASSWORD" //cleartextpassword
    ```

    When you next start the connector server with `node server.js`, the password will be read, hashed, and the line changed to
`"LDAP_BIND_CREDENTIALS":"hashed password"`

8. Run `node server.js` once more to start the connector.

9. Once the connector is running, you will need to daemonize the connector using a tool like upstart, systemd, init.d, etc.

<script type="text/javascript">
  $.getJSON('https://cdn.auth0.com/connector/windows/latest.json', function (data) {
    $('.download-github')
        .attr('href', 'https://github.com/auth0/ad-ldap-connector/releases/tag/v' + data.version)
        .text('adldap-' + data.version);

    $('.curl-example')
      .text('curl -Lo /tmp/adldap.tar.gz https://github.com/auth0/ad-ldap-connector/archive/v' + data.version + '.tar.gz');
  })
</script>
