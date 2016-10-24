---
description: Explains the different ways to update the AD/LDAP Connector.
---

# Updating the AD/LDAP Connector

If there are multiple instances of the AD/LDAP Connector in a deployment, it is recommended that the set of steps below be done to each instance, one at a time, so that only one instance is down at any point in time.

## Updating using the Admin Console (Windows Only)

Starting from version 2.17.0 the AD/LDAP Connector can be updated from the Admin Console. Open the Admin Console by navigating to [http://localhost:8357/](http://localhost:8357/). If the Admin Console has outbound access to the internet it will verify if a new version is available and show this on top of the page:

![](/media/articles/connector/update/connector-update-available.png)

The **Update** tab in the dashboard will allow you to update the installation on the current machine to the latest version. The update will take about 2 minutes and the updater logs will be displayed in the Admin Console.

![](/media/articles/connector/update/connector-update-dashboard.png)

## Updating using the updater script (Windows Only)

The updater script will update the AD/LDAP Connector from the command line by running the following steps:

  1. Verify if an update is available
  2. Backup the existing configuration, certificates and profileMapper.js
  3. Uninstall the AD/LDAP Connector
  4. Download the update
  5. Install the AD/LDAP Connector
  6. Restore the existing configuration, certificates and profileMapper.js
  7. Start the Windows Service
 
 To run the updater script execute the following statement in the command line:
 
 ```
 @powershell -NoProfile -ExecutionPolicy Bypass -Command "iex ((new-object net.webclient).DownloadString('https://cdn.auth0.com/connector/windows/update-connector.ps1'))"
 ```

![](/media/articles/connector/update/connector-update-script.png)
 
**NOTE:** The updater script uses specific PowerShell commands that are only avaible in Windows PowerShell 3.0 and higher. If you're running on Windows 2008 and Windows 2008 R2 you might need to update your [PowerShell](https://www.microsoft.com/en-us/download/details.aspx?id=34595) version first.

## Updating manually (Windows/Linux)

These are the steps to update the AD/LDAP Connector to the latest version:

### 1. Verify the version you have installed

Hover over the Connector status indicator on the dashbaord:

![](/media/articles/connector/update/adldap-connector-version.png)

The tooltip will indicate the current status and the installed version.

### 2. Download the latest version

The latest released version of the connector is <span class="version"></span>.

Download the Windows Installer from <a class="download-link" href=""></a>. The sha1 checksum is:

<pre><code class="checksum"></code></pre>

Use the GitHub repository for other platforms: <a class="download-github" href=""></a>.

**Note:** Always verify the checksum of the downloaded installer as explained [here](/checksum).

### 3. Backup your current config

#### From the Admin Console

The configuration can be exported from the Admin Console. The **Download** button will generate a .zip file which contains the `config.json` file, the `certs` folder and the `lib\\profileMapper.js` file.

![](/media/articles/connector/update/connector-import-export.png)

#### Manually 

Before updating the connector backup these files from `%Program Files(x86)%\Auth0\AD LDAP Connector\`:

*  `config.json`
*  `certs` folder
*  `lib\profileMapper.js` **only if you modified this file manually**

> The PATH above works for Windows based machines. Installations in other platforms will be located somewhere else, but contain the same assets.

### 4. Run the installer

Start the installer and follow the instructions.

Close the configuration dialog without changing anything.

### 5. Restore files

#### From the Admin Console

If the configuration was exported from the Admin Console as a .zip file, it can be re-imported by uploading the .zip file on the **Import / Export** tab.

#### Manually

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
