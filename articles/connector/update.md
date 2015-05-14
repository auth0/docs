# Updating the AD/LDAP Connector

If there are multiple instances of the AD/LDAP Connector in a deployment, it is recommended that the set of steps below be done to each instance, one at a time, so that only one instance is down at any point in time.

These are the steps to update the AD/LDAP Connector to the latest version:

###1. Verify the version you have installed

Hover over the Connector status indicator on the dashbaord:

![](https://cdn.auth0.com/docs/img/adldap-connector-version.png)

The tooltip will indicate the current status and the installed version.

###2. Download the latest version

The latest released version of the connector is <span class="version"></span>.

Download the Windows Installer from <a class="download-link" href=""></a>. The sha1 checksum is:

<pre><code class="checksum"></code></pre>

Use the GitHub repository for other platforms: <a class="download-github" href=""></a>.

**Note:** Always verify the checksum of the downloaded installer as explained [here](@@env.BASE_URL@@/checksum).

###3. Backup your current config

Before updating the connector backup these files from `%Program Files(x86)%\Auth0\AD LDAP Connector\`:

*  `config.json`
*  `certs` folder
*  `lib\profileMapper.js` **only if you modified this file manually**

> The PATH above works for Windows based machines. Installations in other platforms will be located somewhere else, but contain the same assets.

###4. Run the installer

Start the installer and follow the instructions.

Close the configuration dialog without changing anything.

###5. Restore files

Copy all the files from __Step 2__ into `%Program Files(x86)%\Auth0\AD LDAP Connector\`.

Restart the **"Auth0 AD LDAP"** service from the service console.

<script type="text/javascript">
  $.getJSON('https://cdn.auth0.com/connector/windows/latest.json', function (data) {
    $('.download-link').attr('href', data.url)
                       .text(data.url.split('/').pop())
    $('.checksum').text(data.checksum);
    $('.version').text(data.version);

    $('.download-github')
        .attr('href', 'https://github.com/auth0/ad-ldap-connector/releases/tag/v' + data.version)
        .text('adldap-' + data.version);
  })
</script>
