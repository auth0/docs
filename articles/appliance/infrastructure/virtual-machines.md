# Auth0 Appliance Infrastructure Requirements: Virtual Machines

You may deploy the Auth0 Appliance on your premises using your own infrastructure or on the infrastructure of a cloud provider such as Amazon Web Services (AWS) and Microsoft Azure.

## Virtual Machine Templates

Auth0 provides the Appliance via a Virtual Machine Template for you to provision onto your infrastructure. The template differs depending on the platform you are using for virtualization. For example, if you are using AWS, Auth0 will provide you with an [Amazon Machine Image](http://docs.aws.amazon.com/AWSEC2/latest/WindowsGuide/AMIs.html) (AMI) or a [CloudFormation](https://aws.amazon.com/cloudformation/aws-cloudformation-templates/) template.

## Virtual Machine Infrastructure Requirements

When provisioning the Appliance from the templates, Auth0 recommends the following specifications for the Virtual Machine infrastructure. Please note that, for multi-node clusters, each node requires a separate VM, all of which meet the specifications, created from the template.

* **Memory**: 16 GB RAM (8 GB RAM minimum);
* **CPU**: 4 vCPU (2 vCPU minimum);
* 
