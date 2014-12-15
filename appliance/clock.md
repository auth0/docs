## Configuring Time Sincronization

Auth0 uses several cryptographical function that depends on the system clock to be synchronized.

If you are running Auth0 on a IaaS (Infrastracture as a Service) provider you can skip this document since this is automatically managed for you at a higher level.

If you are running Auth0 on premises you will need to tell the appliance where is your company's ntp server. In most of the cases this is the same server than the Domain Controller, please consult your IT department for it.

You can change the address on the configuration section:

![ss-2014-12-15T11-34-37.png](https://s3.amazonaws.com/blog.auth0.com/ss-2014-12-15T11-34-37.png)

This can be either an ip address or a domain name.

### Fine tunning

Auth0 uses [ntpd](http://doc.ntp.org/4.1.1/confopt.htm) for time synchronization. You can establish different configuration parameters as follows:

![ss-2014-12-15T11-36-53.png](https://s3.amazonaws.com/blog.auth0.com/ss-2014-12-15T11-36-53.png)

```
1.south-america.pool.ntp.org burst iburst minpoll 3 maxpoll 5
```

This increases the frequency as described in the **ntpd** documentation:

> These options specify the minimum and maximum poll intervals for NTP messages, in seconds to the power of two. The maximum poll interval defaults to 10 (1,024 s), but can be increased by the maxpoll option to an upper limit of 17 (36.4 h). The minimum poll interval defaults to 6 (64 s), but can be decreased by the minpoll option to a lower limit of 4 (16 s).