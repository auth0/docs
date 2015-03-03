# Auth0 Proxy Updater (beta)

> Note: Auth0 appliance must be version 1911 or later in order to use this feature.

The **Auth0 Proxy Updater** is designed to provide to the on premises Auth0 appliance **operating system updates** in situations where the Auth0 appliance does not have internet access.

The **Auth0 Proxy Updater** is designed to be installed on a corporate intranet in a location with outbound internet access in order to retrieve updates.  It uses the Debian/Ubuntu `apt-get` mechanism to retrieve updates in a manner that will successfully handle complex dependencies between packages being updated.  Once the Proxy Updater has retrieved the updates, the Auth0 appliance can then be configured to retrieve updates from the Proxy Updater. The apt-get mechanism used by the Proxy Updater has a mechanism for ensuring the integrity of the updates downloaded.


![Auth0 Proxy Updater](http://assets.auth0.com/docs/img/auth0-proxy-updater.png)


### Install Proxy Updater

1. [Download the Proxy Updater .ova file](https://assets.auth0.com/installers/auth0-updater.ova).
2. Import it and prepare a virtual machine with at least 1 CPU,  2GB RAM and 6 GB storage.
3. Once the Proxy Updater is installed and configured, start the VM.
4. Set up networking so that the Proxy Updater has outbound access to the internet for the HTTP protocol (port 80). This is needed to retrieve updates.
5. A black-background screen with the Auth0 logo should appear.  On the left side, underneath the Auth0 logo, there are two boxes.  Verify that the proxy updater VM has internet connectivity.
  ![Auth0 Proxy Updater VM](http://assets.auth0.com/docs/img/auth0-proxy-updater-vm.png)
6. The Auth0 appliance will need to pull updates from the Proxy Updater.  Therefore, it will need to initiate requests via the HTTP protocol. Auth0 appliance will need to be allowed by the firewall to connect to Auth0 Proxy Updater 3142 port. The protocol used for that communication is HTTP.
7. Connect Auth0 appliance to Auth0 Proxy Updater


> Note: These requests will occur over HTTP, not HTTPS.  The content received is protected from tampering via the use of keys used by the Ubuntu apt-get mechanism.

### Setup Auth0 Server

1. Go to Auth0 server Configuration section, it will have a new *Update Proxy* field:
  
  ![Update Proxy field](http://assets.auth0.com/docs/img/auth0-proxy-updater-update-proxy-field.png)
  > Note: If you are not able to see that new field you might need to restart and make sure you are running an Auth0 appliance version greater than 1911. Please contact [Auth0 support](https://auth0.com/support) if that’s not the case.
2. In the _Update Proxy_ field, enter the following URL: `http://<ip-for-updater>:3142` where <ip-for-updater> is the IP address of the auth0-updater vm.
3. Press the save button.
  
  ![Save button](http://assets.auth0.com/docs/img/auth0-proxy-updater-save-button.png)
4. Once the save process is finished, click on the *Update System* button in the same configuration page to start a System Update on all nodes.  This process will pull updates from the proxy updater VM.
  ![Update System button](http://assets.auth0.com.s3.amazonaws.com/docs/img/auth0-proxy-updater-update-system-button.png)

The output from the system update will appear in the **Configuration** section in a text pane for each node.

