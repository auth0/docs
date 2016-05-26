# Auth0 Appliance Infrastructure Requirements: Virtual Machines

You may deploy the Auth0 Appliance on your premises using your own infrastructure or on the infrastructure of a cloud provider such as Amazon Web Services (AWS) and Microsoft Azure.

## Virtual Machine Templates

Auth0 provides the Appliance via a Virtual Machine Template for you to provision onto your infrastructure. The template differs depending on the platform you are using for virtualization. For example, if you are using AWS, Auth0 will provide you with an [Amazon Machine Image](http://docs.aws.amazon.com/AWSEC2/latest/WindowsGuide/AMIs.html) (AMI) or a [CloudFormation](https://aws.amazon.com/cloudformation/aws-cloudformation-templates/) template.

## Virtual Machine Infrastructure Requirements

When provisioning the Appliance from the templates, Auth0 recommends the following specifications for the Virtual Machine infrastructure. Please note that, for multi-node clusters, each node requires a separate VM, all of which meet the specifications, created from the template.

* **Memory**: 16 GB RAM (8 GB RAM minimum);
* **CPU**: 4 vCPU (2 vCPU minimum);
* **Storage**:
    * *For Non-Production Nodes*: 40 GB for system/operating system storage and 100 GB of data storage;
    * *For three-node, high availability Production clusters*:
        * Two of the virtual machines each should be allocated 40 GB for system/operating system storage and 100 GB of data storage;
        * One virtual machine should be allocated 40 GB for system/operating system storage and **200** GB of data storage (to be used for backup purposes).

> Please note that solid-state drives (SSD) are **required**. If you anticipate more than **1 million** users, you **must** utilize SSD disks with RAID 0 or RAID 10.

For multi-node clusters, the best practice is to deploy the Appliance virtual machines across more than one physical host server/blade.

## For AWS Users

The **M4.Large** instance is the minimum VM [instance size](https://aws.amazon.com/ec2/instance-types/) that will meet Auth0's requirements.

In order for Auth0 to purblish your Appliance template, Auth0 will need your:

* AWS account number;
* AWS region name.

If your production and development/test environments are within separate AWS accounts/regions, Auth0 will require the credentials for both.
