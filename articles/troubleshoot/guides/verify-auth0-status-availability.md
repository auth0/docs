---
title: Verify Auth0 Status and Availability
description: 
topics:
  - system-status
  - netowrk-availability
contentType: how-to
useCase: troubleshooting
---

# Verify Auth0 Status and Availability

## Check network status

If something isn’t working, first make sure network connectivity isn’t the cause. Here are some quick checks to help you identify if there are any network connectivity issues.

* Can you reach any other, non-Auth0 sites?
    - If not, you may have a general network outage
* Can you reach the [Auth0 website](https://auth0.com)?
* Can you reach the [Auth0 dashboard](${manage_url})?
* Can you reach the authorize URL which invokes a login page? 
    - `https://${account.namespace}/authorize?client_id=${account.clientId}&response_type=token`
    - Note: Login won’t work, but if the login page appears it tells you connectivity exists.
* If any of the above checks fail, try them from a different location or have another person in a different location do the checks. This will help you determine if the issue is in your network or not.

## Check Auth0 service availability

Did something stop working that previously worked? Check the Auth0 status page for issues or interruptions to the Auth0 service. If there's an outage, you can determine if it's related to your issue.

* Check the [Auth0 Status](https://status.auth0.com) for notices of any outages.
* If there's an outage listed on the status page, you do not need to file a ticket. Auth0 is already working on the issue.
* Subscribe to the status page to get alerted if there is any outage with the Auth0 service.

## Keep reading

* 