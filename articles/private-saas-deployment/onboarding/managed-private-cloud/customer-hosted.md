---
section: private-saas-deployment
description: Overview of the Customer-hosted Managed Private Cloud onboarding process
topics: private-cloud
contentType: concept
useCase: private-saas-deployment
---
# Onboarding

This article will cover all facets of the **Customer-hosted Managed Private Cloud** onboarding process, including timelines, information about future updates, technical requirements, and implementation instructions for key Managed Private Cloud features.

## Timeline

After your purchase of the Managed Private Cloud, Auth0 will host a **kickoff meeting** with you to begin the implementation process. We strongly recommend that this meeting occur no later than **five (5) days** after the contract signing.

Implementation begins immediately after the kickoff meeting, and the process takes between **three (3) to four (4) weeks**. The specific amount of time required is highly depending on the amount of time you need to provision your infrastructure per Auth0 requirements.

At the end of the implementation process, you're ready for the **Environment Handover**. Your Managed Private Cloud deployment is, at this point, ready for Production use.

## Infrastructure

The following steps are required to get your AWS infrastructure ready to deploy the Managed Private Cloud:

1. Set up the infrastructure after Auth0 provides you with the required AMI file
2. Complete and submit the Managed Private Cloud Install Checklist to notify Auth0 that you have the required infrastructure in place and that Auth0 can begin configuring the Managed Private Cloud
3. Meet with Auth0 to deploy your Development and Production environments

### Development/Test/Production lifecycle

All PSaaS Appliance multi-node cluster subscription agreements require the deployment of a single-node Development/Test (non-Production) instance. This node is used to verify that the PSaaS Appliance is working as expected with your applications prior to deployment to Production. It also allows for a thorough PSaaS Appliance update and testing cadence. Lastly, this improves any possible support experiences, since Auth0 engineers prefer testing or reviewing planned changes/fixes to your implementation in a non-Production environment.

Please note that Production and non-Production (test/development) must be on completely isolated networks.

### Virtual machine templates

Auth0 provides the Managed Private Cloud via an [Amazon Machine Image (AMI)](http://docs.aws.amazon.com/AWSEC2/latest/WindowsGuide/AMIs.html) file for you to provision on to your infrastructure.

Before Auth0 can share the AMI with you, please provide Auth0 with your:

* AWS account number
* AWS region name

Your AWS region should have at least three [availability zones](https://aws.amazon.com/about-aws/global-infrastructure) for your Production cluster.

If your production and development/test environments are within separate AWS accounts/regions, Auth0 will require the account number for **both** environments.

### Infrastructure requirements

Auth0 recommends use of the **M4.2xlarge** [instance type](https://aws.amazon.com/ec2/instance-types/) (at minimum).

The following are the minimum requirements for your virtual machine. Note that each *node* requires a separate virtual machine that meets the specifications.

<table class="table">
    <tr>
        <td><b>Memory</b></td>
        <td>32 GB RAM</td>
    </tr>
    <tr>
        <td><b>CPU</b></td>
        <td>8 vCPU</td>
    </tr>
    <tr>
        <td><b>Storage (all drives should be thick provisioned)</b></td>
        <td></td>
    </tr>
    <tr>
        <td><i>For Non-Production Nodes</i></td>
        <td>4 drives: 60 GB for system/operating system storage, 50 GB for data storage, 50 GB for User Search, and 50 GB for backup purposes (if you want to test the backup process)</td>
    </tr>
    <tr>
        <td><i>For three-node, high availability Production clusters</i></td>
        <td>
            <ul>
                <li>Two of the virtual machines with 3 drives: 60 GB for system/operating system storage, 100 GB for data storage, and 100 GB for User Search</li>
                <li>One virtual machine with 4 drives: 60 GB for system/operating system storage, 100 GB for data storage, 100 GB for User Search, and 100 GB for backup purposes.</li>
            </ul>
        </td>
    </tr>
</table>

For multi-node clusters, Auth0 recommends deploying the Private Cloud virtual machines across more than one physical host server/blade.

### Networking

Auth0 supports and recommends cross-LAN availability zones.

Each Private Cloud virtual machine (VM) must have its own private static IP address and outbound access. This can be accomplished through:

* A public IP address
* NAT or transparent proxy

For multi-node clusters, all virtual machines must be:

* On the same segment of the internal network;
* Able to communicate between each other via ports `7777`, `27017`, `8721`, and `8701`.
* Able to reach the load balancer via port `443`



## Updates

Auth0 will issue monthly updates to the Managed Private Cloud, but the specific time during which the update is applied will be coordinated with you. 

Auth0 provides monthly releases to the Managed Private Cloud, of which the four most recent are considered *active*. Updating to an active release is mandatory and ensures that you receive:

* The latest features
* Security fixes and enhancements
* Bug fixes

Auth0 will reach out to you to coordinate the specific dates and times during which updates are applied to your deployment.

The [Private Cloud Release Notes](https://auth0.com/releases/) will contain full details on the changes made to your deployment.

## Custom domains

See [Custom Domains](/custom-domains) for instructions on how to map your tenant domain to a custom domain of your choosing, as well as how to manage the required certificates.

## Tenant logging

Auth0 provides [logs] that are accessible via the Dashboard of the Management API's [`logs` endpoint](/api/v2#!/Logs/get_logs).

You can also choose to send the data logged by Auth0 to an external service. To help with this, there are Auth0 extensions that support automatic log export to services like Sumo Logic or Loggly. The following is a list of Auth0 log export extensions currently available:

* [Auth0 Logs to Application Insights](/extensions/application-insight)
* [Auth0 Logs to Azure Blob Storage](/extensions/azure-blob-storage)
* [Auth0 Logs to Loggly](/extensions/loggly)
* [Auth0 Logs to Papertrail](/extensions/papertrail)
* [Auth0 Logs to Sumo Logic](/extensions/sumologic)
* [Auth0 Logs to Splunk](/extensions/splunk)
* [Auth0 Logs to Logstash](/extensions/logstash)
* [Auth0 Logs to Mixpanel](/extensions/mixpanel)
* [Auth0 Logs to Logentries](/extensions/logentries)

## Rate limits

To ensure the quality of Auth0's services, the APIs are subject to [rate limiting](/policies/rate-limits).

## Support

You can reach out to the Auth0 [Support](${env.DOMAIN_URL_SUPPORT}) team with any questions or concerns you might have. To help expedite your request, please provide as much information as possible in the [Support ticket you open](/support/tickets).

## Create Dashboard administrators

To create additional Dashboard administrators, an *existing* administrator must reach out to Auth0 [Support](${env.DOMAIN_URL_SUPPORT}) requesting that an additional administrative account be made. Please include in your request:

* The name(s) of the tenant(s) for which the new administrator should have access
* The email addresses of those to be invited