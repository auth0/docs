# Installing the AD LDAP Connector on different platforms

NOTE: On most platforms, you will need to run the following steps as root (e.g. `sudo su`).

1.  [Install Git](https://git-scm.com/download/linux).
2.  [Install node.js v0.10](https://nodejs.org).
3.  [Install npm] (http://blog.npmjs.org/post/85484771375/how-to-install-npm)
4.  Use the GitHub repository to download the package: <br>
    <code>curl -Lo /tmp/adldap.tar.gz \
    https://github.com/auth0/ad-ldap-connector/archive/v2.21.3.tar.gz</code>
5.  Expand the package and install dependencies: <br>
<code>
        mkdir /opt/auth0-adldap
        tar -xzf /tmp/adldap.tar.gz -C /opt/auth0-adldap --strip-components=1
        cd /opt/auth0-adldap
        npm install
</code>

6.  Run `node server.js` and follow the steps to finish the process, insert the full token URL from the "Setup AD/LDAP connector" screen when prompted for "token number"

7.  you will be asked to edit the configuration file, config.json, make sure you check out [modify.md] (https://github.com/auth0/docs/blob/960dca588a5c52346092509aa7008cf0ac70e01b/articles/connector/modify.md) if you're using LDAP 

8.  Once the connector is running you will need to daemonize the connector using a tool like upstart, systemd, init.d, etc. b

<script type="text/javascript">
  $.getJSON('https://cdn.auth0.com/connector/windows/latest.json', function (data) {
    // https://github.com/auth0/ad-ldap-connector/archive/v2.10.4.tar.gz
    $('.download-github')
        .attr('href', 'https://github.com/auth0/ad-ldap-connector/releases/tag/v' + data.version)
        .text('adldap-' + data.version);

    $('.curl-example')
      .text('curl -Lo /tmp/adldap.tar.gz \\\n    https://github.com/auth0/ad-ldap-connector/archive/v' + data.version + '.tar.gz');
  })
</script>
