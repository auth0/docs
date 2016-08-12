---
section: appliance
---

# Auth0 Appliance Infrastructure Overview

## Project Coordination and Execution

Auth0 provides a project plan methodology to help customers get up and running with the Auth0 Appliance as efficiently as possible. This requires significant cooperation and coordination across a number of your internal teams. Below is a list of teams commonly required to be involved in the Auth0 Appliance project and tasks they may be required to complete. In our experience, early exposure of the teams to the project and the tasks they'll have results in a more effective execution of the project plan.

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
            <td>Backup and monitor Appliance infrastructure</td>
        </tr>
    </tbody>
</table>

## Overview of Required Steps

The following basic steps are required to get the infrastructure up and running and the Appliance deployed:

1. Understand the Appliance infrastructure requirements as detailed in this document;
2. Complete and submit the Pre-Appliance Installation Checklist to ensure that you have everything you need ready and on hand for the Appliance deployment;
3. Access and install the Appliance;
4. Complete and submit the Post-Appliance Install Checklist to notify Auth0 that you have everything in place and that Auth0 can commence configuring the Appliance;
5. Complete the steps detailed in the Appliance Setup Guide.

## Development/Test/Production Lifecycle

> Production and non-Production (test/development) must be on completely isolated networks.

All Appliance multi-node cluster subscription agreements require the deployment of a single-node Development/Test (non-Production) instance. This node is used to verify that the Appliance is working as expected with your applications prior to deployment to Production. It also allows for a thorough Appliance update and testing cadence. Lastly, this improves any possible support experiences, since Auth0 engineers prefer testing or reviewing planned changes/fixes to your implementation in a non-Production environment.
