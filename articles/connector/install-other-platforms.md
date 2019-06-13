---
description: A guide on installing the AD/LDAP Connector on different platforms.
topics:
  - connector
contentType: how-to
useCase:
  - add-login
  - customize-connections
  - add-idp
---
# Install the AD/LDAP Connector on Non-Microsoft Platforms

This document covers how to install the AD/LDAP Connector on non-Microsoft Platforms.

::: warning
Prior to installing the AD/LDAP Connector, please ensure that you have already installed [Git](https://git-scm.com/download/linux), [Node.js](https://nodejs.org), and [npm](http://blog.npmjs.org/post/85484771375/how-to-install-npm).
:::

::: note
For most platforms, you will need to run the required commands with root privileges.
:::

1. Download the <a class="download-github" href=""></a> package to `/tmp`:

    <code class="curl-example"></code>

2. Expand the <a class="download-github" href=""></a> package and install its dependencies:

    ```bash
    mkdir /opt/auth0-adldap
    tar -xzf /tmp/adldap.tar.gz -C /opt/auth0-adldap --strip-components=1
    cd /opt/auth0-adldap
    npm install
    ```

3. Start your server.

    ```bash
    node server.js
    ```

    When prompted for the ticket number, enter the full ticket URL from the **Settings** tab of the **Setup AD/LDAP connector** screen in the Auth0 Management Dashboard:

    ```text
    > Please enter the ticket number: https://YOUR_DOMAIN.auth0.com/some/other/stuff
    ```

4. You will be prompted to edit the `config.json` configuration file with your LDAP connection and authentication details:

    ```text
    "LDAP_URL": "ldap://YOUR_LDAP_SERVER_FQDN",
    "LDAP_BASE": "dc=YOURDOMAIN,dc=com",
    "LDAP_BIND_USER":"YOUR_LDAP_USER",
    "LDAP_BIND_PASSWORD":"YOUR_LDAP_USER_PASSWORD" //cleartextpassword
    ```

    ::: note
    If you're using LDAP, refer to the [Modifying the Connector Settings](/connector/modify) page.
    :::

5. Run `node server.js` once more to start the Connector. Note that the `LDAP_BIND_PASSWORD` line in `config.json` changes to `LDAP_BIND_CREDENTIALS` at this point.

6. Once the Connector is running, you will need to daemonize the Connector (if you don't already have a tool selected, you can consider [upstart](http://upstart.ubuntu.com/) or [systemd](https://www.freedesktop.org/wiki/Software/systemd/)). For example, for using systemd with Ubuntu Xenial, the file `/lib/systemd/system/auth0-adldap.service` could contain the following:
  
	```text
    [Unit]
    Description=Auth0 AD LDAP Agent
    After=network.target
    
    [Service]
    Type=simple
    Restart=always
    User=ubuntu
    WorkingDirectory=/opt/auth0-adldap
    ExecStart=/usr/bin/node server.js
    ```

<script type="text/javascript">
  $.getJSON('https://cdn.auth0.com/connector/windows/latest.json', function (data) {
    $('.download-github')
        .attr('href', 'https://github.com/auth0/ad-ldap-connector/releases/tag/v' + data.version)
        .text('adldap-' + data.version);

    $('.curl-example')
      .text('curl -Lo /tmp/adldap.tar.gz https://github.com/auth0/ad-ldap-connector/archive/v' + data.version + '.tar.gz');
  })
</script>

7. Run `node admin/server.js` to access the admin UI -- the admin UI will be running and available on `http://localhost:8357`.

::: note
If you get an `Invalid Ticket` message when configuring the Connector for the first time, the most likely cause is a network issue (for example, you have the Connector running behind a proxy). Try troubleshooting by connecting to `https://YOUR_TENANT.auth0.com/testall` with a browser other than Internet Explorer.
:::
