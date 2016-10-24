---
description: Outlines the Auth0 enterprise support options, definitions, coverage offered and procedures to follow for the best support experience. 
---

# Enterprise Support Guidance

This document outlines the Auth0 enterprise support options, definitions, coverage offered and procedures to follow for the best support experience.  It's relevant for customers only with enterprise subscription agreements which differ from the standard pay-as-you-go/self-service subscription offerings acquired directly from our website.

Refer to your subscription agreement to confirm which support offering was included in your subscription.

## For general queries related to functionality, integration, best practice advice etc

[Auth0 Support Forum](https://ask.auth0.com) - Post questions to our audience of Customer Success Engineers, as well as other Auth0 users, or search and read existing posts for useful information.

__Customer Success Manager__ - Your Auth0 Customer Success Manager is always a great source for general queries and helping you navigate to the right Auth0 resource.  The orientation information you received during onboarding should have the contact details for your Customer Success Manager.

[Auth0 Docs](https://auth0.com/docs) - Offers comprehensive documentation across the Auth0 platform.

[Search all resources](/search#gsc.tab=0) - Quering from this search page will return results across Docs, Ask.Auth0 and our popular [Auth0 blog](https://auth0.com/blog).

## For issues impacting or blocking production (SLA applied)

### Standard Enterprise Support (Gold, Silver and Home Grown plans)

![](/media/articles/onboarding/standard-enterprise-support.png)

### Premium Enterprise Support (Enterprise and Platinum plans)

![](/media/articles/onboarding/premium-enterprise-support.png)

### Using Support Center
[Learn more about creating tickets with Support Center](/support/tickets)


## Guidance for Logging a Support Issue

### Validity of SLA

To ensure your support issue is assigned the correct priority and SLA it must be logged via the methods outlined in the section “For issues impacting or blocking the ability to launch in production” above.  Any other method may not be tracked correctly within our support systems.

### What to Expect

When an issue has been logged correctly:

* it will be acknowledged immediately in support center with confirmation it was submitted successfully and assigned a ticket ID number.  You will also receive email confirmation.  Additional information may be requested.  See the section below, “Information to provide”.
* A responding Auth0 support staff member may direct you to join a private Slack channel and/or a Zoom web conference to facilitate faster communications.  However, it’s important to remember you should not initiate requests for help via a Slack channel - only via the methods outlined above. Slack channels may not be actively monitored.
* In addition to communications over a web conference or Slack, to preserve a record of an issue, any critical information, such as log files, symptoms, etc should be sent as updates to the ticket via support center.  Any conclusions or next steps should be added to the ticket as well.
* Upon resolution of the issue, an Auth0 support staff member will ask the customer for confirmation the issue has been resolved to their satisfaction and the ticket will be closed only when customer has responded and confirmed issue is resolved.

### What to Check Before Logging an Issue

To speed resolution, please check the following before logging an issue:

* Is the issue experienced by all users or just a few?
  * All? - Could be a service or configuration issue
    * Check status of Auth0 service
      * Americas: (http://status.auth0.com)
      * EU Region: (http://status.eu.auth0.com)
      * APAC Region: (http://status.au.auth0.com)
      * You can subscribe to updates via the button on those pages
    * Check authentication services (connections) are up and reachable
    * Check application components - make sure they are functioning
    * Check certificates - make sure valid/not expired (cert-related errors)
    * Check NTP running on Auth0 AD/LDAP connector, IDPs
    * Check if any Rules have changed recently
    * Check if any recent changes on IDPs that could cause error
    * Can users log into other apps that use the same authentication provider?
  * Few users impacted - usually a user profile or browser/device issue
    * Have user clear cookies and try again
    * Make sure user isn’t hitting the ‘back’ button
    * Make sure user has cookies and javascript turned on in browser
    * Check user profile in the authentication service
    * Check if any rules changed recently that impact user profile
    * Is user device in violation of MDM device policies (if used)
    * Does it happen consistently and can be repeated?


### Information to provide when logging an issue

To speed resolution, please provide the following when logging an issue:

* Name of Auth0 account/tenant
* Name of application(s)
* Name of connection(s)
* Description of the problem - what happens?  How far into login sequence does user get? (e.g. does issue happen before or after entering credentials, etc)
* When did it start?  (first noticed)
* Issue experienced by all users or just some?
* Issue experienced by users every time or just some times?
* Issue experienced with all browsers or just one?
* Screenshot of error message (if any)
* HTTP trace in the form of a [.har file](/har)

For Appliance Customers:
* Appliance version/build number (top left hand corner of configuration screen on config tenant, e.g. https://yourmanage.yourdomain.com/configuration#/)
* Status of nodes https://yourmanage.yourdomain.com/configuration#/nodes
* Status of health check https://yourmanage.yourdomain.com/configuration#/troubleshoot
