---
section: appliance
description: This document details who is responsible for what aspects of a given Appliance installation.
---

# Auth0 Appliance: Roles and Responsibilities

The Auth0 Appliance is a managed service that is used if your organization's compliance and/or policy requirements prevent you from utilizing a multi-tenant cloud service. The Appliance provides the packaging and services required to run the Auth0 code base in a third-party environment.

## General Division of Responsibilities

**Auth0** is responsible for:

* Initial installation;
* General maintenance;
* Installation of patches/updates.

The **subscriber** is responsible for supplying and monitoring the infrastructure on which the Appliance runs. This includes, but is not limited to:

* The Virtual Machine host;
* Storage;
* Network resources;
* Required dependencies.

## Detailed Division of Responsibilities

The following RACI Matrix provides a more in-depth summary of the roles and responsibilities that will be allocated between Auth0 and the subscriber.

### RACI

* **Responsible**: the assigned party who is responsible for implementing the task as required;
* **Accountable**: the assigned party who is accountable for the task being completed as required;
* **Consulted**: the party (or parties) whose opinions are requested and with whom there is two-way communication;
* **Informed**: the party (or parties) who are kept up-to-date with regards to progress and with whom there is one-way communication

|Appliance-Related Tasks or Deliverables|Auth0|Subscriber|Notes|
|---|---|---|---|
|Preparing VM Infrastructure, including: memory, storage, processors, load balances, networks, SSL certificates, DNS records, SMTP servers, enabling Auth0 access via Jumphost/VPN|C|R, A (subscriber's infrastructure engineer)|The subscriber will submit the Appliance Infrastructure Checklist when the VMs are ready and the [infrastructure requirements](/appliance/infrastructure) are met.|
|Deployment to Development and Production environments|R, A - Auth0 Customer Success Engineer|I|The Auth0 Customer Success Engineer will SSH into the VMs and deploy the Appliance.|
|Configuration of Development and Production environments|C|R|The Auth0 CSE will show the subscriber's infrastructure engineer [how to upload the SSL certificates, enter the SMTP credentials, and add administrators](/appliance/dashboard).|
|Operations Handover|R|C|Auth0 Customer Success Engineers will provide a 90-minute Operations Handover meeting to review information regarding Appliance monitoring, backup, and updates, as well as answer questions.|
|Monitoring|I|R, A|The subscriber is responsible for [monitoring the Appliance](/appliance/monitoring).|
|Backing Up|I (in the event that there are issues)|R, A|The subscriber is responsible for [backing up the Appliance](/appliance/disaster-recovery) using the [Command-Line Tools](/appliance/cli).|
|Code Integration into Applications|C, I (in the event that there are issues)|R, A|The subscriber is responsible for Auth0 code integration.|
|User Migration (if required)|C, I (in the event that there are issues)|R, A|The subscriber is responsible for migrating users where appropriate.|
|Updates|R|R, A|Auth0 Customer Success Engineers will partner with the subscriber's infrastructure engineers to update the Appliance on an agreed-upon basis. The subscriber is responsible for: taking VM snapshot(s) prior to the update, providing access to the Appliance, being present as the Appliance updates. Auth0 is responsible for: running manual scripts (if required), informing the subscriber on the status of the upgrade.|
|Testing Updates|C, I (in the event that there are questions/issues)|R, A|The subscriber will test the Appliance after the Development node has been updated and inform Auth0 about any issues.|
|Issue Identification and Support Ticket Submission|C|R, A|The subscriber is responsible for submitting issues via the [Support Center](/onboarding/enterprise-support).|
|Issue Resolution|R|C|Auth0 will provide support for issues within the *core* of the Appliance. Auth0 will *consult* on issues pertaining to integration between Auth0 APIs and Dashboards.|

## Further Reading

For more information about the Appliance, see:

* [Overview](/appliance/appliance-overview )
* [Infrastructure](/appliance/infrastructure)
* [Dashboard](/appliance/dashboard)
* [Monitoring](/appliance/monitoring)
* [Disaster Recovery](/appliance/disaster-recovery)
* [Command-Line Interface (CLI)](/appliance/cli)
* [Enterprise Support](/onboarding/enterprise-support)
* [Critical Support Issues Guidance](/appliance/critical-issue)
