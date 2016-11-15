---
title: "Server Client + API: Python Implementation for the Cron Job"
description: The Python implementation of the server cron job for the Server Client + API architecture scenario
url: /architecture-scenarios/application/server-api/cron-implementation-python
---

# Server Client + API: Python Implementation for the Cron Job

::: panel-info Server + API Architecture Scenario
This document is part of the [Server + API Architecture Scenario](/architecture-scenarios/application/server-api) and it explains how to implement the server process in Python. Please refer to the [Server + API Architecture Scenario](/architecture-scenarios/application/server-api) document for information on the implemented solution.
:::

Full source code for the Python implementation of the server process can be found in [this GitHub repository](https://github.com/auth0-samples/auth0-pnp-abc-timesheets/tree/master/timesheets-cron/python).

## Get an Access Token

In order to make the HTTP request to the Auth0 `/oauth/token` API endpoint we will use the libraries `json`, `urllib` and `urllib2`.

This is our sample implementation:

```python
def main():
  import json, urllib, urllib2

  # Configuration Values
  DOMAIN = "YOUR-AUTH0-DOMAIN"
  AUDIENCE = "YOUR_API_IDENTIFIER"
  CLIENT_ID = "YOUR_CLIENT_ID"
  CLIENT_SECRET = "YOUR_CLIENT_SECRET"
  API_URL = "http://localhost:8080/timesheet"
  GRANT_TYPE = "client_credentials" # OAuth 2.0 flow to use

  # Get an access token from Auth0
  base_url = "https://{domain}".format(domain=DOMAIN)
  data = urllib.urlencode([('client_id', CLIENT_ID),
                          ('client_secret', CLIENT_SECRET),
                          ('audience', AUDIENCE),
                          ('grant_type', GRANT_TYPE)])
  req = urllib2.Request(base_url + "/oauth/token", data)
  response = urllib2.urlopen(req)
  oauth = json.loads(response.read())
  access_token = oauth['access_token']

# Standard boilerplate to call the main() function.
if __name__ == '__main__':
  main()
```

To test this modify your code to print the `access_token` variable and run the process using `python cron.py`.

## Invoke the API

The steps we follow in our implementation are:
- Build a JSON object containing timesheet data and assign it to a `timesheet` variable.
- Add the API URL and the `timesheet` variable contents to the request body using `urllib2.Request`.
- Add the `Authorization` header to the request.
- Set the `Content-Type` header to `application/json`.
- Invoke the API using `urllib2.urlopen` and add some error handling.
Retrieve the response using `json.loads` and print it in the console.

This is our sample implementation (some code is omitted for brevity):

```python
def main():
  # import libraries - code omitted

  # Configuration Values - code omitted

  # Get an access token from Auth0 - code omitted

  #Post new timesheet to API
  timesheet = {'user_type': 'Employee',
              'user_id': '007',
              'year': 2016,
              'week': 24,
              'project': 'StoreZero',
              'hours': 40}
  req = urllib2.Request(API_URL, data = json.dumps(timesheet))
  req.add_header('Authorization', 'Bearer ' + access_token)
  req.add_header('Content-Type', 'application/json')

  try:
    response = urllib2.urlopen(req)
    res = json.loads(response.read())
    print res['message']
  except urllib2.HTTPError, e:
    print 'HTTPError = ' + str(e.code) + ' ' + str(e.reason)
  except urllib2.URLError, e:
    print 'URLError = ' + str(e.reason)
  except urllib2.HTTPException, e:
    print 'HTTPException'
  except Exception:
    print 'Generic Exception'

# Standard boilerplate to call the main() function - code omitted
```

To test this make sure your API is running and run the process using `python cron.py`.

That's it! You are done!
