---
section: appliance
description: PSaaS Appliance infrastructure information about installation
topics:
    - appliance
    - infrastructure
    - installation
contentType: 
    - concept
    - how-to
useCase: appliance
applianceId: appliance36
sitemap: false
---

<!-- markdownlint-disable MD033 -->

# PSaaS Appliance Infrastructure Overview

## Project Coordination and Execution

Auth0 provides a project plan methodology to help customers get up and running with the PSaaS Appliance as efficiently as possible. This requires significant cooperation and coordination across a number of your internal teams. Below is a list of teams commonly required to be involved in the PSaaS Appliance project and tasks they may be required to complete. In our experience, early exposure of the teams to the project and the tasks they'll have results in a more effective execution of the project plan.

<table class="table">
    <thead>
        <tr>
            <th>Team</th>
            <th>Sample Tasks</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>IT Infrastructure</td>
            <td>Provision Virtual Machines</td>
        </tr>
        <tr>
            <td>IT Security</td>
            <td>Generate SSL certificates; approve Internet access/ports</td>
        </tr>
        <tr>
            <td>IT Networking</td>
            <td>Configure firewall; deploy/configure load balancer</td>
        </tr>
        <tr>
            <td>IT Operations</td>
            <td>Backup and monitor PSaaS Appliance infrastructure</td>
        </tr>
    </tbody>
</table>

## Overview of Required Steps

The following basic steps are required to get the infrastructure up and running and the PSaaS Appliance deployed:

1. Understand the PSaaS Appliance infrastructure requirements as detailed in this document.
2. Set up the infrastructure after the Appliance Project Manager has shared the required AMI file with you.
3. Complete and submit the [PSaaS Appliance Install Checklist](https://docs.google.com/forms/d/e/1FAIpQLSckWRi2MWpzhBkUXoqjaEzMPGUsyL4ICbOetcGvSnn64dSM-A/viewform?c=0&w=1) to notify Auth0 that you have the required infrastructure in place and that Auth0 can begin configuring the PSaaS Appliance.
4. Meet with Auth0 to deploy the DEV and PROD environments (the Appliance Project Manager will set up this meeting).

## Development/Test/Production Lifecycle

::: note
Production and non-Production (test/development) must be on completely isolated networks.
:::

All PSaaS Appliance multi-node cluster subscription agreements require the deployment of a single-node Development/Test (non-Production) instance. This node is used to verify that the PSaaS Appliance is working as expected with your applications prior to deployment to Production. It also allows for a thorough PSaaS Appliance update and testing cadence. Lastly, this improves any possible support experiences, since Auth0 engineers prefer testing or reviewing planned changes/fixes to your implementation in a non-Production environment.
