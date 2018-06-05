---
toc: true
section: appliance
description: Outlines the Auth0 enterprise support options, definitions, coverage offered and procedures to follow for the best support experience.
tags:
  - appliance
  - onboarding 
---
# Enterprise Support Guidance

This document outlines the Auth0 enterprise support options, definitions, coverage offered, and procedures to follow for the best support experience.  It is relevant for customers only with Enterprise Plan subscription agreements, which differ from the standard pay-as-you-go/self-service subscription offerings acquired directly from our website.

Refer to your subscription agreement to confirm which support offering is included in your subscription.

## For General Queries

For general queries related to functionality, integration, best practice, or advice, you can use the following resources:

- The [Auth0 Community](https://community.auth0.com/): Post questions to our audience of Customer Success Engineers, as well as other Auth0 users, or search and read existing posts for useful information.
- Your __Customer Success Manager__: Your Auth0 Customer Success Manager is always available for general queries and helping you navigate to the right Auth0 resource.  The orientation information you received during onboarding should have the contact details for your Customer Success Manager.
- The [Auth0 Docs](/search#gsc.tab=0)

## For Issues Impacting Production Environments (SLA Applicable)

::: note

Critical Production issues should always be reported via the [Support Center](${env.DOMAIN_URL_SUPPORT}) for fastest response.

[Learn more about creating tickets with Support Center](/support/tickets)
:::


For the purposes of the following descriptions, the following capitalized words and phrases are ascribed the following meanings:

**“Defect”** means a failure of the Auth0 Platform, in the form provided or modified by Auth0, to conform to its applicable specifications set forth in the Documentation. A Defect includes a failure of one or more components of the environment or infrastructure provided by Auth0 or AWS to perform in accordance with their applicable documentation or specifications.

**“Demand Services”** has the meaning ascribed to it in Section 7 below.

**“Fix”** means a modification or an addition to the Auth0 Platform that overcomes a Defect when made or added to the Auth0 Platform. Auth0 may provide a Workaround in lieu of a Fix in Auth0’s sole discretion, but will provide a Fix to you as specified in Section 3.2 below.

**“Response Time”** means, for purposes of this Support Program description, the time between Auth0’s receipt of a Defect notification from you, and Auth0’s confirmation via one of its personnel that Auth0 is working on resolution of the Defect. (While your submission of a trouble ticket may trigger an automated response from Auth0, automated responses are disregarded for purposes of determining Response Times.)

**“Update”** means a patch, correction, or other modification or addition to the Auth0 Platform that Auth0 makes generally available to you for maintenance fixes, Defect corrections, and minor improvements to the Auth0 Platform, including fixes, patches, updates and releases to address any security vulnerabilities. “Update” also includes significant enhancements, or new features or functionalities that Auth0 makes generally available to you.  

**“Workaround”** means a set of procedures that you may follow to circumvent or mitigate the impact of a Defect, notwithstanding that the Defect still exists.

## Defect Resolution Procedures

Auth0 will assign all Defects one of four response priorities, dependent upon the problems caused by the Defect. Auth0 may re-assign prioritization levels assigned by you in Auth0’s trouble ticketing system, to reflect the problem descriptions below. Auth0’s assignment will be consistent with the problem descriptions described below. Priority categories are as follows:

| Severity Level | Description |
| - | - |
| 1 (Urgent) | **Emergency Issue**. Defect resulting in full or partial system outage or a condition that makes the Auth0 Platform unusable or unavailable in production for all of your Users. |
| 2 (High) | **Significant Business Impact**. Defect resulting in a condition where major functionality is impacted or significant performance degradation is experienced; issue is persistent and affects many Users and/or major functionality. |
| 3 (Normal) | **Minor Feature / Function Issue / General Question**. Defect results in a component of the Auth0 Platform not performing as expected or documented **or** an inquiry by your representatives regarding general technical issues/questions |
| 4 (Low) | **Minor Problem / Enhancement Request**. Information requested on Auth0 Platform capabilities, navigation, installation, or configuration; enhancement request. |

## Guidance for Logging Support Issues

To ensure that your support issue is assigned the correct priority and SLA, it must be logged via the [Auth0 Support Center](${env.DOMAIN_URL_SUPPORT}). Other methods may not track your issue correctly.

## What to Expect

After you've correctly logged your issue:

1. Your issue will be acknowledged immediately to confirm that it was submitted successfully. You'll be assigned and receive a ticket ID number.
2. Auth0 support staff may direct you to join a private Slack channel and/or a Zoom web conference to facilitate faster communications. Please remember that you should not initiate support requests via Slack -- you should only use the [Support Center](${env.DOMAIN_URL_SUPPORT}).
3. Be sure to send any critical information, such as log files, issue-related descriptions, and so on, to the [Support Center](${env.DOMAIN_URL_SUPPORT}) so that they can be attached to the ticket you opened.

Upon resolution of the issue, an Auth0 support staff member will ask you for confirmation the issue has been resolved to you satisfaction. The ticket will be closed only when you have responded and confirmed issue is resolved.

## What to Check Before Logging an Issue

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

## Information to Provide When Logging an Issue

To speed resolution, please provide the following when logging an issue:

* Name of Auth0 account/tenant
* Name of application(s)
* Name of connection(s)
* Description of the problem - what happens?  How far into login sequence does user get? (for example, does issue happen before or after entering credentials, and so on)
* When did it start?  (first noticed)
* Issue experienced by all users or just some?
* Issue experienced by users every time or just some times?
* Issue experienced with all browsers or just one?
* Screenshot of error message (if any)
* HTTP trace in the form of a [.har file](/har)

*For PSaaS Appliance Customers*:

* PSaaS Appliance version/build number (top left hand corner of configuration screen on config tenant, such as https://yourmanage.yourdomain.com/configuration#/)
* Status of nodes (https://yourmanage.yourdomain.com/configuration#/nodes)
* Status of health check (https://yourmanage.yourdomain.com/configuration#/troubleshoot)