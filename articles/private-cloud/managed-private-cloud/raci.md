---
section: private-cloud
description: Differences between the two Managed Private Cloud deployment options and the Customer-Hosted RACI
topics: managed-private-cloud
contentType: concept
useCase: private-cloud
---
# Customer-Hosted Differences and RACI

The customer-hosted Managed Private Cloud provides you with everything you need to run Auth0 in your Amazon Web Services environment.

## Differences between the Auth0-Hosted and the Customer-Hosted Managed Private Cloud

<table class="table">
    <tr>
        <td></td>
        <td><b>Auth0-Hosted</b></td>
        <td><b>Customer-Hosted on AWS</b></td>
    </tr>
    <tr>
        <td><b>Public-Facing?</b></td>
        <td>Yes</td>
        <td>Can be configured to be public-facing or not</td>
    </tr>
    <tr>
        <td><b>Service and Uptime Reporting</b></td>
        <td>Auth0 responsible for monitoring</td>
        <td>Customer responsible for monitoring</td>
    </tr>
    <tr>
        <td><b>Infrastructure and Backup Responsibility</b></td>
        <td>Auth0 responsible for backups</td>
        <td>Customer responsible for backups</td>
    </tr>
    <tr>
        <td><b>PCI Compliance Add-On</b></td>
        <td>Available</td>
        <td>Not available</td>
    </tr>
    <tr>
        <td><b>Breached Password Detection</b></td>
        <td>Available</td>
        <td>Not available</td>
    </tr>
    <tr>
        <td><b>AWS Costs</b></td>
        <td>Not applicable</td>
        <td>Customer responsible for all AWS costs associated with running the infrastructure required for a customer-hosted deployment</td>
    </tr>
</table>

## Responsibilities regarding the Customer-Hosted Private Cloud

Auth0 is responsible for:

* The initial installation
* General maintenance
* Installation of patches and updates

The subscriber/customer is responsible for supplying and monitoring the infrastructure on which the Private Cloud runs. This includes, but is not limited to:

* The EC2 hosts
* Data storage
* Network resources
* Any required dependencies

### Detailed Division of Responsibilities

The following RACI Matrix provides an in-depth summary of the roles and responsibilities that will be allocated between Auth0 and the customer/subscriber.

**RACI**:

* **Responsible**: the assigned party who is responsible for executing the task
* **Accountable**: the assigned party who is accountable for the task being completed
* **Consulted**: the party/parties whose opinions are requested and with whom there is two-way communication
* **Informed**: the party/parties who are kept up-to-date with regards to progress and with whom there is one-way communication

<table class="table">
    <tr>
        <td><b>Private Cloud-Related Tasks or Deliverables</b></td>
        <td><b>Auth0</b></td>
        <td><b>Customer/Subscriber</b></td>
        <td><b>Notes</b></td>
    </tr>
    <tr>
        <td>Preparing AWS Infrastructure (including memory, storage, processors, load balances, networks, SSL certificates, DNS records, SMTP servers, enabling Auth0 access via Jumphost/VPN)</td>
        <td>C</td>
        <td>R, A (the subscriber's infrastructure engineer)</td>
        <td>The subscriber will contact Auth0 when the AWS environment is ready and the infrastructure requirements are met</td>
    </tr>
    <tr>
        <td>Set up Development and Production environments</td>
        <td>R, A (the Managed Services Engineer (MSE))</td>
        <td>I</td>
        <td>The Auth0 Managed Service Engineer will SSH into the AWS environment and deploy the Auth0 Private Cloud</td>
    </tr>
    <tr>
        <td>Configure Development and Production environments</td>
        <td>C</td>
        <td>R</td>
        <td>The Auth0 Managed Service Engineer will show the subscriber's infrastructure engineer how to upload the SSL certificates, enter the SMTP credentials, and add administrators</td>
    </tr>
    <tr>
        <td>Operations Handover</td>
        <td>R</td>
        <td>C</td>
        <td>The Auth0 Managed Service Engineer and Technical Account Managers will hold an Operations Handover meeting to review information regarding Private Cloud monitoring, backup, and updates and to answer questions</td>
    </tr>
    <tr>
        <td>Monitoring</td>
        <td>I</td>
        <td>R, A</td>
        <td>The subscriber is responsible for monitoring the Private Cloud Deployment</td>
    </tr>
    <tr>
        <td>Backing Up</td>
        <td>I (in the event there are issues)</td>
        <td>R, A</td>
        <td>The subscriber is responsible for backing up the Private Cloud deployment using the Command-Line Tools</td>
    </tr>
    <tr>
        <td>User Migration (if required)</td>
        <td>C, I (in the event there are issues)</td>
        <td>R, A</td>
        <td>The subscriber is responsible for migrating users where appropriate</td>
    </tr>
    <tr>
        <td>Updates</td>
        <td>R</td>
        <td>R, A</td>
        <td>The Auth0 Managed Service Engineers will partner with the subscriber's infrastructure engineers to update the Private Cloud Deployment on an agreed-upon basis. The subscriber is responsible for taking AMI snapshot(s) prior to the update, providing access to the Private Cloud deployment, and being present during the update. Auth0 is responsible for running manual scripts (if required) and informing the subscriber on the status of the update</td>
    </tr>
    <tr>
        <td>Testing Updates in Non-Production Environment(s)</td>
        <td>C, I (in the event that there are questions/issues)</td>
        <td>R, A</td>
        <td>The subscriber will test the Private Cloud after the Development node has been updated and inform Auth0 of any issues</td>
    </tr>
    <tr>
        <td>Testing Updates in Production</td>
        <td>C, I (in the event that there are questions/issues)</td>
        <td>R, A</td>
        <td>The subscriber will test the Private Cloud after the Production node has been updated and inform Auth0 of any issues</td>
    </tr>
    <tr>
        <td>Issue Identification and Support Ticket Submission</td>
        <td>C</td>
        <td>R, A</td>
        <td>The subscriber is responsible for submitting issues via the <a href="${env.DOMAIN_URL_SUPPORT}">Support Center</a></td>
    </tr>
    <tr>
        <td>Issue Resolution</td>
        <td>R, C</td>
        <td>C</td>
        <td>Auth0 will provide support for issues within the *core* of the Auth0 product. Auth0 will consult on issues pertaining to integration with the Auth0 product</td>
    </tr>
</table>