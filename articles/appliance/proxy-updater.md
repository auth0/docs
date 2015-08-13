# Auth0 Proxy Updater (beta)

__Note:__ The installed Auth0 appliance must be version 1911 or later in order to use this feature.

Auth0 Proxy Updater provides operating system updates to an on-premises Auth0 appliance in situations where the Auth0 appliance does not have internet access.

Proxy Updater is installed on a corporate intranet in a location with outbound internet access. The Debian/Ubuntu `apt-get` mechanism is employed to handle the complex dependencies between update packages and to ensure the integrity of downloaded updates. The Auth0 appliance is configured to then retrieve the updates from the Proxy Updater.

![Auth0 Proxy Updater](/media/articles/appliance/proxy-updater/auth0-proxy-updater.png)


### Install Proxy Updater

1. Download the [Proxy Updater .ova](https://assets.auth0.com/installers/auth0-updater.ova) file. This includes a VM template.
2. Prepare a virtual machine with at least 1 CPU, 2GB of RAM and 6 GB of storage.
3. Import the file. 
4. Start the VM.
5. Configure networking to allow Proxy Updater outbound internet access using the HTTP protocol (port 80) to the following domains:

 * archive.ubuntu.com
 * us.archive.ubuntu.com
 * security.ubuntu.com
 * ppa.launchpad.net
 * www.rabbitmq.com
 * downloads-distro.mongodb.org
 * apt.puppetlabs.com
   
   This access is needed by Proxy Updater to retrieve updates.

6. A black-background screen will appear with the Auth0 logo and two boxes on the left side. Verify that Proxy Updater VM has internet connectivity by noting that the IP address of the VM appears here.
  ![Auth0 Proxy Updater VM](/media/articles/appliance/proxy-updater/auth0-proxy-updater-vm.png)
7. Configure networking to allow the Auth0 appliance to initiate requests to download updates from Proxy Updater using the HTTP protocol (port 3142).
8. Connect the Auth0 appliance to the Auth0 Proxy Updater as described in the following section.

__Note:__ These requests occur over HTTP, not HTTPS. The content is protected from tampering by the use of secure keys by the Ubuntu `apt-get` mechanism.

### Configure Auth0 Server

1. Go to Auth0 Dashboard, Configuration section, which will contain a new _Update Proxy_ field:
  
  ![Update Proxy field](/media/articles/appliance/proxy-updater/auth0-proxy-updater-update-proxy-field.png)
  __Note:__ If the _Update Proxy_ field does not appear and you are running an Auth0 appliance version 1911 or later, restart the server. Contact [Auth0 support](https://auth0.com/support) if the problem persists.
  
2. In the _Update Proxy_ field, enter the following URL: `http://<ip-for-updater>:3142` where `<ip-for-updater>` is the IP address of the Proxy Updater VM.

3. Click the save button.
  
  ![Save button](/media/articles/appliance/proxy-updater/auth0-proxy-updater-save-button.png)
  
### Update the Auth0 Appliance operating system
Once the configuration steps above have been completed, click the *Update System* button on the same Configuration page to start a system update on all nodes. This process will cause Proxy Updater to download updates from the internet. The Auth0 appliance will then retrieve these updates from the Proxy Updater VM.
  ![Update System button](/media/articles/appliance/proxy-updater/auth0-proxy-updater-update-system-button.png)

The system update output will display, in the Configuration section, one text pane for each updated node.

### Updates to Auth0 Proxy Updater
Future updates to Auth0 Proxy Updater will be made available as a new .ova file, which must be deployed following the same steps as described above.

