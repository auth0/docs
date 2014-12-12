# Monitoring the ADLDAP Connector with System Center Operation Management

The Auth0 ADLDAP connector runs as a Service on Windows.

You can monitor the service status with System Center as any other service.

Open the "Add Monitoring Wizard" and select the Monitoring Type "Windows Service":

![ss-2014-12-11T22-48-51.png](https://s3.amazonaws.com/blog.auth0.com/ss-2014-12-11T22-48-51.png)

Enter a name and description:

![ss-2014-12-11T22-49-57.png](https://s3.amazonaws.com/blog.auth0.com/ss-2014-12-11T22-49-57.png)

Select the Server and then the "Auth0 ADLDAP" windows service:

![ss-2014-12-11T22-50-37.png](https://s3.amazonaws.com/blog.auth0.com/ss-2014-12-11T22-50-37.png)

Lastly select the desired **CPU** and **Memory limits**.