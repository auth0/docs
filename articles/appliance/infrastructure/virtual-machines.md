---
section: appliance
description: PSaaS Appliance infrastructure information about virtual machines
topics:
    - appliance
    - infrastructure
    - virtual-machines
contentType: reference
useCase: appliance
applianceId: appliance41
sitemap: false
---

# PSaaS Appliance Infrastructure Requirements: Virtual Machines

You may deploy the PSaaS Appliance on your premises using your own infrastructure or the infrastructure of a cloud provider. Currently, Auth0 supports PSaaS Appliance usage on Amazon Web Services (AWS).

## Virtual Machine Templates

Auth0 provides the PSaaS Appliance via a Virtual Machine Template for you to provision on to your infrastructure. The template differs depending on the platform you are using for virtualization. For example, if you are using AWS, Auth0 will provide you with an [Amazon Machine Image](http://docs.aws.amazon.com/AWSEC2/latest/WindowsGuide/AMIs.html) (AMI) or a [CloudFormation](https://aws.amazon.com/cloudformation/aws-cloudformation-templates/) template.

## Virtual Machine Infrastructure Requirements

When provisioning the PSaaS Appliance from the templates, Auth0 recommends the following specifications for the Virtual Machine infrastructure. For multi-node clusters, each node requires a separate VM that meet the specifications.

* **Memory**: 32 GB RAM (minimum);
* **CPU**: 8 vCPU (minimum);
* **Storage**:
    * *For Non-Production Nodes*: 4 drives: 60 GB for system/operating system storage, 50 GB for data storage, 50 GB for User Search, and 50 GB for backup purposes (if you want to test the backup process).
    * *For three-node, high availability Production clusters*:
        * Two of the virtual machines with 3 drives: 60 GB for system/operating system storage, 100 GB for data storage, and 100 GB for User Search;
        * One virtual machine with 4 drives: 60 GB for system/operating system storage, 100 GB for data storage, 100 GB for User Search, and 100 GB for backup purposes.
        * If you anticipate more than 10 million users, please let us know for additional storage requirements and considerations.
        * Drives should be thick provisioned.

::: note
  Large installations will require higher IO performance. Auth0 will work with you to determine the required storage performance levels.
:::

For multi-node clusters, Auth0 recommends deploying the PSaaS Appliance virtual machines across more than one physical host server/blade.

## For AWS Users

* The *recommended* [instance type](https://aws.amazon.com/ec2/instance-types/) is **M4.2xlarge** (minimum).
* Auth0 will need the following pieces of information to share the AMI with you:
    * AWS account number;
    * AWS region name. The region should have at least three [availability zones](https://aws.amazon.com/about-aws/global-infrastructure) for your Production cluster.
* If your production and development/test environments are within separate AWS accounts/regions, Auth0 will require the account number for both environments.
