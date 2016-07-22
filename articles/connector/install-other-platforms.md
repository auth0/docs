---
description: A guide on installing the AD/LDAP Connector on different platforms.
---

# Install the AD LDAP Connector on different platforms

**NOTE**: On most platforms, you will need to run the following steps as root (e.g. `sudo su`).

1. [Install Git](https://git-scm.com/download/linux).
2. [Install node.js v0.10](https://nodejs.org).
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

6. Edit the `config.json` file to add the following

    ```
    "LDAP_BIND_USER":"YOUR_LDAP_USER",
    "LDAP_BIND_PASSWORD":"YOUR_LDAP_USER_PASSWORD" //cleartextpassword
    ```

    When you then start the connector server `node server.js`, this line will be read, the password hashed, and the line changed to
`"LDAP_BIND_CREDENTIALS":"hashed password"`

7. Run `node server.js` and follow the steps to finish the process. Insert the full token URL from the **Setup AD/LDAP connector** screen when prompted for "token number".
8. You will be asked to edit the `config.json` configuration file. If you're using LDAP, see: [Modifying the Connector Settings](/connector/modify). 
9. Once the connector is running, you will need to daemonize the connector using a tool like upstart, systemd, init.d, etc.

<script type="text/javascript">
  $.getJSON('https://cdn.auth0.com/connector/windows/latest.json', function (data) {
    $('.download-github')
        .attr('href', 'https://github.com/auth0/ad-ldap-connector/releases/tag/v' + data.version)
        .text('adldap-' + data.version);

    $('.curl-example')
      .text('curl -Lo /tmp/adldap.tar.gz \\\n    https://github.com/auth0/ad-ldap-connector/archive/v' + data.version + '.tar.gz');
  })
</script>
