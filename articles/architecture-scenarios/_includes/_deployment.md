Auth0 provides support for a couple of different options when it comes to the deployment automation approaches you can use, and each can be used in conjunction with the other if desired:

* The [Auth0 Deploy CLI tooling](/extensions/deploy-cli) provides you with an easy-to-use script that can help you integrate with your existing Continuous Integration/Continuous Deployment (CI/CD) pipeline.
* If you can’t integrate directly with, or for some reason you don’t have a CI/CD pipeline, then the Auth0 [Source Control Extensions](/extensions#deploy-hosted-pages-rules-and-database-connections-scripts-from-external-repositories) can provide an easy-to-set-up basic automation process with very low maintenance.

::: warning
Note that both the Deploy CLI Tool and source control extensions can cause destructive changes; manual changes made directly in the dashboard between automated deployments could be lost! For this reason, if either is used, then **all** changes should be deployed from the source control subsystem referenced via the tooling and not made manually.
:::

Each environment may also need some environment-specific configuration--Application Client ID’s and Client Secrets will be different between the Auth0 tenants, for example--so you’re going to want some way of being able to dynamically reference this rather than having hard-coded values. Auth0 provides support for handling environment-specific configuration information through one of the following two approaches:

* Use [Tenant Specific Variables](#tenant-specific-variables)
* Use [keyword replacement](extensions/deploy-cli/references/environment-variables-keyword-mappings) if using the Auth0 Deploy CLI tool

