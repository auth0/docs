# Appliance Monitoring

You have several options when it comes to monitoring your appliance.

1. A health dashboard under the troubleshooting section. Each node reports metrics every minute that you can check when logged in.
2. An unauthenticated endpoint for automated monitoring, `testall` that returns a 200 status code (and the text *OK*). This is typically used by the load balancer.
3. A series of authenticated endpoints that will return a *204*, *520*, or *429* status codes.
4. Pre-integrated *New Relic* monitoring. You need a license key, and need to make sure there is internet connectivity to the *New Relic* cloud services.
5. Run a synthetic transaction using a system monitoring tool like *Microsoft System Center*.

## Unuuthenticated testing - testall
The `testall` endpoint can be accessed over http or https. It runs through a set of basic checks to ensure that all services are running. It returns a status code of `200` if everything is OK as shown in this example:

```
$ curl -v  http://10.1.0.248/testall
*   Trying 10.1.0.248...
* Connected to 10.1.0.248 (10.1.0.248) port 80 (#0)
> GET /testall HTTP/1.1
> Host: 10.1.0.248
> User-Agent: Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0)
> Accept: */*
> Referer:
>
< HTTP/1.1 200 OK
< Date: Mon, 28 Mar 2016 21:38:35 GMT
< Content-Type: text/plain
< Content-Length: 2
< Connection: keep-alive
< X-Powered-By: Express
< X-Frame-Options: DENY
<
* Connection #0 to host 10.1.0.248 left intact
OK
```

If it is not working, then it will return a 500 with some detail about what is failing. Please don't depend on any of the detail, as we will be removing this detail in the future.

```
curl -v  http://10.1.0.248/testall
*   Trying 10.1.0.248...
* Connected to 10.1.0.248 (10.1.0.248) port 80 (#0)
> GET /testall HTTP/1.1
> Host: 10.1.0.248
> User-Agent: Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0)
> Accept: */*
> Referer:
>
< HTTP/1.1 500 Internal Server Error
< Date: Mon, 28 Mar 2016 21:40:00 GMT
< Content-Type: text/html; charset=utf-8
< Content-Length: 288
< Connection: keep-alive
< X-Powered-By: Express
< X-Frame-Options: DENY
<
manage seems down. Reason: connect ENOENT /var/lib/auth0/sockets/auth0-manage.socket
docs seems down. Reason: connect ECONNREFUSED 127.0.0.1:5000
users seems down. Reason: connect ECONNREFUSED 127.0.0.1:7777
* Connection #0 to host 10.1.0.248 left intact
api2 seems down. Reason: connect ENOENT /var/lib/auth0/sockets/auth0-api2.socket
```

## Authenticated testing -
Tests that provide more information can be used for attacks, so the appliance requires that these test be authenticated. You create an authentication key in the settings section of the dashboard. They authentication key is then used in the request header to authenticate the incoming request.

* 204: The resource is OK.
* 429: Too many request.
* 520: There is something wrong with the resource.

The available endpoints to check are:

* /status/cpu
* /status/memory
* /status/disk
* /status/services
* /status/network
* /status/internet
* /status/email
* /status/db
* /status/replicaset

```
$ curl --user  api_keys_health:S9ranHlz0qQmIs0NgcYb8hU3MLKcBB4Khth2pom5VzLryYeW -v http://10.1.0.248:9110/status/cpu
* Hostname was NOT found in DNS cache
*   Trying 10.1.0.248...
* Connected to 10.1.0.248 (10.1.0.248) port 9110 (#0)
* Server auth using Basic with user 'api_keys_health'
> GET /status/cpu HTTP/1.1
> Authorization: Basic YXBpX2tleXNfaGVhbHRoOlM5cmFuSGx6MHFRbUlzME5nY1liOGhVM01MS2NCQjRLaHRoMnBvbTVWekxyeVllVw==
> User-Agent: curl/7.35.0
> Host: 10.1.0.248:9110
> Accept: */*
>
< HTTP/1.1 204 No Content
< X-Powered-By: Express
< X-Auth0-Host: a0-1
< ETag: W/"a-oQDOV50e1MN2H/N8GYi+8w"
< Date: Mon, 28 Mar 2016 22:21:29 GMT
< Connection: keep-alive
<
* Connection #0 to host 10.1.0.248 left intact
```

You can also check on https, although you will add health to the url path and eliminate the port number:
```
$ curl -k --user  api_keys_health:S9ranHlz0qQmIs0NgcYb8hU3MLKcBB4Khth2pom5VzLryYeW -v https://10.1.0.248/health/status/cpu
*   Trying 10.1.0.248...
* Connected to 10.1.0.248 (10.1.0.248) port 443 (#0)
* TLS 1.2 connection using TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256
* Server certificate: *.myauth0.com
* Server auth using Basic with user 'api_keys_health'
> GET /health/status/cpu HTTP/1.1
> Host: 10.1.0.248
> Authorization: Basic YXBpX2tleXNfaGVhbHRoOlM5cmFuSGx6MHFRbUlzME5nY1liOGhVM01MS2NCQjRLaHRoMnBvbTVWekxyeVllVw==
> User-Agent: Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0)
> Accept: */*
> Referer:
>
< HTTP/1.1 204 No Content
< Date: Tue, 29 Mar 2016 11:18:23 GMT
< Connection: keep-alive
< X-Powered-By: Express
< X-Auth0-Host: a0-1
< ETag: W/"a-oQDOV50e1MN2H/N8GYi+8w"
<
* Connection #0 to host 10.1.0.248 left intact
```

## Synthetic Transaction
See https://auth0.com/docs/monitoring for an example.

## New Relic Configuration
To configure New Relic, simply add the key in the dashboard and save settings. (this will be fixed next release, < 2 weeks). New Relic is a cloud service that provides monitoring of servers for you, including performance health monitoring and alerting.
