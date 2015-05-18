# Configuring Time Synchronization

Auth0 uses several cryptographic functions that depend on the system clock.

If you are running Auth0 on an IaaS (Infrastracture as a Service) provider (e.g. AWS, Microsoft Azure, etc.), you can skip this document since this is automatically managed for you.

If you are running Auth0 on your own hardware or VM host, you will need to make sure the Auth0 Appliance has NTP configured correctly. In most cases, the NTP server is your Domain Controller. Please contact your IT administrator for details.

You can change the NTP server address on the configuration section of the Dashboard:

![ss-2014-12-15T11-34-37.png](../@@env.MEDIA_URL@@/articles/appliance/clock/ss-2014-12-15T11-34-37.png)

This can be either an IP address or a server name.

### Fine-tuning

Internally, Auth0 uses [ntpd](http://doc.ntp.org/4.1.1/confopt.htm) for time synchronization. You can establish different configuration parameters as follows:

![ss-2014-12-15T11-36-53.png](../@@env.MEDIA_URL@@/articles/appliance/clock/ss-2014-12-15T11-36-53.png)

```
1.south-america.pool.ntp.org burst iburst minpoll 3 maxpoll 5
```

This command increases the frequency of updates as described in the **ntpd** documentation:

> These options specify the minimum and maximum poll intervals for NTP messages, in seconds to the power of two. The maximum poll interval defaults to 10 (1,024 s), but can be increased by the maxpoll option to an upper limit of 17 (36.4 h). The minimum poll interval defaults to 6 (64 s), but can be decreased by the minpoll option to a lower limit of 4 (16 s).

> Fine tuning is only available for Auth0's engineers.

If the virtual machine-hosting software, such as VMware, has an option for the host operating system (OS) to update the guest OS, this should be turned off, so it will not interfere with the NTP time synchronization of the Auth0 appliance guest. For example, in VMware Tools, the "sync guest time with host" checkbox should be unchecked (off) for the Auth0 guest virtual machine.  
