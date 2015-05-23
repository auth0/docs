# Monitoring Auth0

If you are using the public cloud version of Auth0 we recommend you subscribe to [http://status.auth0.com](http://status.auth0.com) for a continuous stream of notifications regarding the availability of the service. Any incidents are reported there by the Auth0 Devops team. Current and historical uptime is available on [http://uptime.auth0.com](http://uptime.auth0.com).

## Monitoring your own Auth0 account

You can add Auth0 health probes to your own monitoring infrastructure easily by querying these two endpoints:

	https://@@account.namespace@@/test 

This should return a Json object with a single property:

```
200
content-type: application/json
{"clock":1417220191640}
```

This other one:

	https://@@account.namespace@@/testall

returns a simple text:

```
200
content-type: text/plain 
OK
```

Each of these tests verifies correct functioning of various components of the server, memory consumption, I/O operations, database, etc.

If you extended Auth0 through [rules](rules) or [a custom db connection](mysql-connection-tutorial), you can also build a synthetic transaction that excercises these capabilities. We recommend using an authentication flow that won't require a UI (e.g. `Resource Owner flow`). Other ones might require a monitoring tool able to mimick what a user would do (e.g. follow redirects, input username/password on a form, etc.).

```
POST https://@@account.namespace@@/oauth/ro
Content-Type: 'application/json'
{
  "client_id":   "{An app registered in Auth0 for monitoring}",
  "username":    "{A system account for monitoring}",
  "password":    "{A password}",
  "connection":  "{A user store defined in Auth0}",
  "grant_type":  "password",
  "scope":       "openid",
  "device":      "SCOM"
}
```

A successful request would return:

```
HTTP 200
{
  "id_token": "eyJ0eXAi......3Jia5WgM",
  "access_token": "F25VQ.....NWpS",
  "token_type": "bearer"
}
```

Many tools exist for monitoring using this approach: [New Relic](http://newrelic.com), [Pingdom](http://pingdom.com), etc. 

---

## Monitoring a private deployment

If you are using the __Auth0 Appliance__, monitoring is very similar to the steps described above.

The health endpoints are equivalent, only with the private URL:

	https://{your_auth0_server}/{test | testall}

In a dedicated deployment we recommend you monitor the following endpoints:

* __Dashboard__: `https://app.myauth0.com/test`
* __Documentation site__: `https://docs.myauth0.com/test`
* __Login endpoints__: `https://login.myauth0.com/test` and  `https://login.myauth0.com/lo/test`

As before, the above endpoints return a timestamp:

```
200
content-type: application/json
{"clock":1417196777540}
```

### Monitoring individual nodes of a cluster

The endpoints above will normally hit the load-balancer that is fronting the nodes of a cluster. We also recommend you monitor individual nodes. A typical highly-available deployment will have at leasts 3 nodes:

* `https://{IP Address Node 1}/testall`
* `https://{IP Address Node 2}/testall`
* `https://{IP Address Node 3}/testall`

If all is working fine, the endpoints will return a simple string:

```
200
content-type: text/plain
OK
```

Individual nodes that are not responding, or timeout can be __removed from the load balancer without affecting the service__. All nodes of a cluster can serve requests to client applications. All configuration information is continruously replicated across nodes.

> If a node stops responding, contact [Auth0 Support](mailto://support@auth0.com).

### Configuring SCOM

Auth0 can be monitored as a standard web application on System Center Operations Manager (or any other similar tool that supports synthetic transactions). 

We recommend adding probes in SCOM for all the endpoints describe before, including a login synthetic transaction.

#### Configuring System Center Operations Manager

Setup for SCOM is straight forward as shown on these screenshots:

![ss-2014-11-21T15-44-34.png](../media/articles/monitoring/ss-2014-11-21T15-44-34.png)

![ss-2014-11-21T16-31-15.png](../media/articles/monitoring/ss-2014-11-21T16-31-15.png)

![ss-2014-11-21T16-32-25.png](../media/articles/monitoring/ss-2014-11-21T16-32-25.png)

![ss-2014-11-21T16-33-51.png](../media/articles/monitoring/ss-2014-11-21T16-33-51.png)

![ss-2014-11-21T16-34-25.png](../media/articles/monitoring/ss-2014-11-21T16-34-25.png)

Make sure to configure proper alerts against these probes. Timeouts on endpoints are dependent on the network configuration, but should resemble the expected behavior of applications.

#### Monitoring

You can monitor System Center activity throught the monitoring tab as shown bellow:

![ss-2014-11-25T17-20-47.png](../media/articles/monitoring/ss-2014-11-25T17-20-47.png)

![ss-2014-11-25T17-22-10.png](../media/articles/monitoring/ss-2014-11-25T17-22-10.png)

> If any of these alarms are triggered, contact [Auth0 support](mailto://support@auth0.com) immediately.

