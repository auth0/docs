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

* **Responsible**: the assigned party is responsible for implementing the task as required;
* **Accountable**: the assigned party who is ultimately accountable for the task being completed as required;
* **Consulted**: the party (or parties) whose opinions are requested and with whom there is two-way communication;
* **Informed**: the party (or parties) who are kept up-to-date with regards to progress and with whom there is one-way communication

<table class="table">
  <th>Appliance-Related Tasks or Deliverables</th>
  <th>Auth0</th>
  <th>Subscriber</th>
  <th>Notes</th>
  <tr>
    <td>Preparing VM Infrastructure, including: <ul> <li>memory</li> <li>storage</li> <li>processors</li> <li>load balancers</li> <li>networks</li> <li>SSL certificates</li> <li>DNS records</li> <li>SMTP servers</li> <li>enabling Auth0 access via Jumphost or VPN</li> </ul></td>
    <td>C</td>
    <td>R </br> A - subscriber's infrastructure engineer</td>
    <td><p>[Auth0 Infrastructure Requirements](/appliance/infrastructure)</p> <p>The subscriber will submit the Appliance Infrastructure Checklist when the VMs are ready and the infrastructure requirements are met.
</p></td>
  </tr>
  <tr>
    <td>Deployment to Development and Production environments</td>
    <td>R </br> A - Auth0 Customer Success Engineer</td>
    <td>I</td>
    <td>The Auth0 Customer Success Engineer will SSH into the VMs and deploy the Appliance.</td>
  </tr>
  <tr>
    <td>Configuration of Development and Production environments</td>
    <td>C</td>
    <td>R</td>
    <td>The Auth0 CSE will show the subscriber's infrastructure engineer [how to upload the SSL certificates, enter the SMTP credentials, and add administrators](/appliance/dashboard). </td>
  </tr>
  <tr>
    <td>Operations Handover</td>
    <td>R</td>
    <td>C</td>
    <td>Auth0 Customer Success Engineers will provide a 90-minute Operations Handover meeting to review information regarding Appliance monitoring, backup, and updates, as well as answer questions.</td>
  </tr>
  <tr>
    <td>Monitoring</td>
    <td>I (in the event that there are issues)</td>
    <td>R </br> A</td>
    <td>The subscriber is responsible for [monitoring the Appliance](/appliance/monitoring). </td>
  </tr>
  <tr>
    <td>Backing Up</td>
    <td>I (in the event that there are issues)</td>
    <td>R </br> A</td>
    <td>The subscriber is responsible for [backing up the Appliance](/appliance/disaster-recovery) using the [Command-Line Tools](/appliance/cli)</td>
  </tr>
  <tr>
    <td>Code Integration into Applications</td>
    <td>C </br>I (in the event that there are issues)</td>
    <td>R </br> A</td>
    <td>The subscriber is responsible for Auth0 code integration.</td>
  </tr>
  <tr>
    <td>User Migration (if required)</td>
    <td>C </br>I (in the event that there are issues)</td>
    <td>R </br> A</td>
    <td>The subscriber is responsible for migrating users where appropriate.</td>
  </tr>
  <tr>
    <td>Updates</td>
    <td>R</td>
    <td>R </br> A</td>
    <td>
    <p>Auth0 Customer Success Engineers will partner with the subscriber's infrastructure engineers to update the Appliance on an agreed-upon basis.</p>

    <p>The subscriber is responsible for: <ul><li>taking VM snapshot(s) prior to the update</li><li>providing access to the Appliance</li> <li>being present as the Appliance updates</li></ul></p>

    <p>Auth0 is responsible for:
    <ul><li>running manual scripts (if required)</li>
    <li>informing the subscriber on the status of the upgrade</li></ul></p></td>
  </tr>
  <tr>
    <td>Testing Updates</td>
    <td>C </br>I (in the event that there are questions/issues)</td>
    <td>R </br> A</td>
    <td>The subscriber will test the Appliance after the DEV node is updated and inform Auth0 in the event there are issues.
    </td>
  </tr>
  <tr>
    <td>Issue Identification and Support Ticket Submission</td>
    <td>C</td>
    <td>R </br> A</td>
    <td>The subscriber is responsible for submitting issues via the [Support Center](/onboarding/enterprise-support).</td>
  </tr>
  <tr>
    <td>Issue Resolution</td>
    <td>R</td>
    <td>C</td>
    <td>Auth0 will provide support for issues within the *core* of the Appliance. Auth0 will *consult* on issues pertaining to integration between Auth0 APIs and Dashboards.</td>
  </tr>
</table>

## Further Reading

For more information about the Appliance, see:

* [Appliance Overview](/appliance/appliance-overview )
* [Infrastructure](/appliance/infrastructure)
* [Dashboard](/appliance/dashboard)
* [Monitoring](/appliance/monitoring)
* [Disaster Recovery](/appliance/disaster-recovery)
* [Command-Line Interface (CLI)](/appliance/cli)
* [Enterprise Support](/onboarding/enterprise-support)
* [Critical Support Issues Guidance](/appliance/critical-issue)
