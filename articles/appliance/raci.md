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
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
</table>
