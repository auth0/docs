---
section: appliance
description: How to manage the time on Appliances
---

# Time Synchronization

Auth0 uses several cryptographic functions that depend on the system clock.

If you are running Auth0 on an IaaS (Infrastracture as a Service) provider (e.g. AWS, Microsoft Azure, etc.), time synchronization is managed automatically and you can skip these instructions.

If you are running Auth0 on your own hardware or a VM host, the Auth0 Appliance must have NTP configured correctly. In most cases, the NTP server is your Domain Controller. Contact your IT administrator for details.

The NTP server address can be changed in the configuration section of the Dashboard:

![ss-2014-12-15T11-34-37.png](/media/articles/appliance/clock/ss-2014-12-15T11-34-37.png)

Enter either the IP address or the DNS name of the NTP server.

### Configuration options

Auth0 uses __ntpd__ for internal time synchronization. As described in the [ntpd documentation](http://doc.ntp.org/4.1.1/confopt.htm), to change the various configuration parameters from the default settings, enter these on the same line after the NTP server address.

For example, the following settings will increase the frequency of updates:

![ss-2014-12-15T11-36-53.png](/media/articles/appliance/clock/ss-2014-12-15T11-36-53.png)

```
1.south-america.pool.ntp.org burst iburst minpoll 3 maxpoll 5
```

__Note:__ These options specify the minimum and maximum poll intervals for NTP messages in seconds to the power of two. The maximum poll interval defaults to 10 (1,024 s), but can be increased by the maxpoll option to an upper limit of 17 (36.4 h). The minimum poll interval defaults to 6 (64 s), but can be decreased by the minpoll option to a lower limit of 4 (16 s).

__Note:__ Fine tuning is only available to Auth0's engineers.

If the virtual-machine hosting software, such as VMware, has an option for the host operating system (OS) to update the guest OS, this must be turned off so that the host will not interfere with the NTP time synchronization of the guest Auth0 appliance.

For example, in VMware Tools, the "sync guest time with host" checkbox must be unchecked (off) for the Auth0 guest virtual machine.
