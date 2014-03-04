# Connecting Active Directory with Auth0

Auth0 integrates with Active Directory/LDAP through the __Active Directory/LDAP Connector__ that you install in your network. 

The __AD/LDAP Connector (1)__, is a bridge between your __Active Directory (2)__  and the __Auth0 Service (3)__. This bridge is necessary because AD is typically locked down to your internal network, and Auth0 is as cloud service running on a completely different context.

<img src="https://docs.google.com/drawings/d/1X30jQAsatQTibLXgxKgDanbCH1RJ9ZAfoDmHV33jdBY/pub?w=630&amp;h=526">


Configuring an AD/LDAP connection in Auth0 requires two simple steps:

###1. Creating an AD/LDAP Connection in Auth0

The first step is creating a new Connection on the dashboard:

__Connections > Enterprise > AD/LDAP__

![](http://puu.sh/7iXKl.png)

Name the connection and check whether you want `Kerberos` enabled for this connection. If you enable this, you need to enter the range of IP addresses from where `Kerberos` authentication will be enabled. These would typically be the intranet where `Kerberos` would work.

![](http://blog.auth0.com.s3.amazonaws.com/adldap_create_01.PNG)

__Save__ the configuration. You are done on the Auth0 side! You will then be prompted to download the __AD/LDAP Connector__ on your machine.

![](http://blog.auth0.com.s3.amazonaws.com/adldap_create_02.PNG)

> We ship different versions of the Connector to install it on multiple platforms: Windows, Linux and MacOS

Keep the __TICKET URL__ at hand as you will need it later.

###2. Installing the AD/LDAP Connector

#### Auth0 AD LDAP Connector Setup (Windows Agent)
On Windows, the Connector is packaged as a standard installer file (__MSI__). Run it on the machine you want to install it and follow the installation wizard:

![](http://blog.auth0.com.s3.amazonaws.com/adldap_01.PNG)

![](http://blog.auth0.com.s3.amazonaws.com/adldap_02.PNG)

> The __AD/LDAP Connector__ in Windows is installed as a Service: ![](http://blog.auth0.com.s3.amazonaws.com/adldap_06.PNG)

Once the installation is complete, you will see the following screen on a browser (notice that the browser is opening a page on the local machine).

Enter the __TICKET URL__ that was generated in __Step 1__.

The __Ticket URL__ uniquely identifies this connector in Auth0. Don't share it with anyone. The Connector will use this to communicate with Auth0 Server and automatically complete the configuration.

![](http://blog.auth0.com.s3.amazonaws.com/adldap_03.PNG)

If successful, the next screen will allow you to enter your __Active Directory__ connection parameters. Namely:

* The __LDAP Connection String__ (this is the network location of the server)
* The __Base DN__
* A __Username__ and a __Password__

These are credentials used by the __AD/LDAP Connector__ to authenticate itself with AD.

![](http://blog.auth0.com.s3.amazonaws.com/adldap_04.PNG)


##3. Testing your new Active Directory/LDAP connection

Go back to your Auth0 Dashboard and you should see a green dot next to your Connection definition:

![](http://blog.auth0.com.s3.amazonaws.com/adldap_07.png)

This signals that the __AD/LDAP Connector__ is online and working. Click in __Try__ to test the entire flow. If you configured `Kerberos` and testing this inside your network, your login will happen automatically.

If you didn't configure `Kerberos` or you are outside your intranet you will be prompted for credentials. After successful authentication you should see the test screen showing the user profile:

![](http://blog.auth0.com.s3.amazonaws.com/adldap_08.png)


