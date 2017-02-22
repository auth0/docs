---
section: private-saas
description: Private SaaS infrastructure information about virtual machines
---

# Auth0 Private SaaS Infrastructure Requirements: Virtual Machines

You may deploy the Auth0 Private SaaS on your premises using your own infrastructure or the infrastructure of a cloud provider. Currently, Auth0 supports the following Private SaaS usage on the following cloud providers:

* Amazon Web Services (AWS);
* Microsoft Azure;
* VMware.

## Virtual Machine Templates

Auth0 provides the Private SaaS via a Virtual Machine Template for you to provision on to your infrastructure. The template differs depending on the platform you are using for virtualization. For example, if you are using AWS, Auth0 will provide you with an [Amazon Machine Image](http://docs.aws.amazon.com/AWSEC2/latest/WindowsGuide/AMIs.html) (AMI) or a [CloudFormation](https://aws.amazon.com/cloudformation/aws-cloudformation-templates/) template.

## Virtual Machine Infrastructure Requirements

When provisioning the Private SaaS from the templates, Auth0 recommends the following specifications for the Virtual Machine infrastructure. For multi-node clusters, each node requires a separate VM that meet the specifications.

* **Memory**: 16 GB RAM (8 GB RAM minimum);
* **CPU**: 4 vCPU (2 vCPU minimum);
* **Storage**:
    * *For Non-Production Nodes*: 40 GB for system/operating system storage, 50 GB for data storage, and 50 GB for backup purposes (if you want to test the backup process).
    * *For three-node, high availability Production clusters*:
        * Two of the virtual machines each should be allocated 40 GB for system/operating system storage and 100 GB for data storage;
        * One virtual machine should be allocated 40 GB for system/operating system storage, 100 GB for data storage, and 100 GB for backup purposes.
        * If you anticipate more than 10 million users, please let us know for additional storage requirements and considerations.
        * Drives should be thick provisioned.

> Large installations will require higher IO performance. Auth0 will work with you to determine the required storage performance levels.

For multi-node clusters, Auth0 recommends deploying the Private SaaS virtual machines across more than one physical host server/blade.

## For AWS Users

* The **M4.Large** instance is the minimum VM [instance size](https://aws.amazon.com/ec2/instance-types/) that will meet Auth0's requirements.
* Auth0 will need the following pieces of information to share the AMI with you:
    * AWS account number;
    * AWS region name.
* If your production and development/test environments are within separate AWS accounts/regions, Auth0 will require the credentials for both environments.
