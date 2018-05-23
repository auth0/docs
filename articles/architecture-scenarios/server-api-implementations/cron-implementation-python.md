---
title: "Server Client + API: Python Implementation for the Cron Job"
description: The Python implementation of the server cron job for the Server Client + API architecture scenario
url: /architecture-scenarios/application/server-api/cron-implementation-python
---

# Server Client + API: Python Implementation for the Cron Job

::: panel Server + API Architecture Scenario
This document is part of the [Server + API Architecture Scenario](/architecture-scenarios/application/server-api) and it explains how to implement the server process in Python. Please refer to the [Server + API Architecture Scenario](/architecture-scenarios/application/server-api) document for information on the implemented solution.
:::

Full source code for the Python implementation of the server process can be found in [this GitHub repository](https://github.com/auth0-samples/auth0-pnp-exampleco-timesheets/tree/master/timesheets-cron/python).

## Get an Access Token

In order to make the HTTP request to the Auth0 `/oauth/token` API endpoint we will use the libraries `json`, `urllib` and `urllib2`.

This is our sample implementation:

```python
def main():
  import json, urllib, urllib2, httplib

  # Configuration Values
  domain = "${account.namespace}" # Your Auth0 Domain
  api_identifier = "API_IDENTIFIER" # API Identifier of your API
  client_id = "${account.clientId}" # Client ID of your Non Interactive Client
  client_secret = "YOUR_CLIENT_SECRET" # Client Secret of your Non Interactive Client
  api_url = "http://localhost:8080/timesheets/upload"
  grant_type = "client_credentials" # OAuth 2.0 flow to use

  # Get an Access Token from Auth0
  base_url = "https://{domain}".format(domain=domain)
  data = urllib.urlencode({'client_id': client_id,
                            'client_secret': client_secret,
                            'audience': api_identifier,
                            'grant_type': grant_type})
  req = urllib2.Request(base_url + "/oauth/token", data, headers={"Accept": "application/json"})
  response = urllib2.urlopen(req)
  resp_body = response.read()
  oauth = json.loads(resp_body)
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

  # Get an Access Token from Auth0 - code omitted

  #Post new timesheet to API
  timesheet = {'user_id': '007',
                          'date': '2017-05-10T17:40:20.095Z',
                          'project': 'StoreZero',
                          'hours': 5}
  req = urllib2.Request(api_url, data = json.dumps(timesheet))
  req.add_header('Authorization', 'Bearer ' + access_token)
  req.add_header('Content-Type', 'application/json')

  try:
    response = urllib2.urlopen(req)
    res = json.loads(response.read())
    print 'Created timesheet ' + str(res['id']) + ' for employee ' + str(res['user_id'])
  except urllib2.HTTPError, e:
    print 'HTTPError = ' + str(e.code) + ' ' + str(e.reason)
  except urllib2.URLError, e:
    print 'URLError = ' + str(e.reason)
  except httplib.HTTPException, e:
    print 'HTTPException'
  except Exception, e:
    print 'Generic Exception' + str(e)

# Standard boilerplate to call the main() function - code omitted
```

To test this make sure your API is running and run the process using `python cron.py`.

That's it! You are done!
