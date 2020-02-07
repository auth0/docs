In addition to adopting best practices for change management and [QA](/architecture-scenarios/implementation/${platform}/${platform}-qa), successful customers will also integrate Auth0 collateral management as part of some automated deployment process. As discussed in the Architecture section under [SDLC support](/architecture-scenarios/implementation/${platform}/${platform}-architecture#sdlc-support), you will want to ensure you configure separate Auth0 tenants for development, testing, and production environments, and you will want that configuration to be almost identical for the tenant in each environment. Using deployment automation helps ensure this, so that each environment tenant is configured the same, and you will be less likely to see bugs show up as a result of mismatched configurations between environments.

::: panel Best Practice
However you configure deployment automation, we’d recommend you unit test your rules, custom DB scripts, and hooks prior to deployment, and run some integration tests against your tenant post-deployment too. For more details regarding this, see the [Quality Assurance](/architecture-scenarios/implementation/${platform}/${platform}-qa) guidance provided.
:::

Auth0 provides support for a couple of different options when it comes to the deployment automation approaches you can use, and each can be used in conjunction with the other if desired:

* The [Auth0 Deploy CLI tooling](/extensions/deploy-cli) provides you with an easy-to-use script that can help you integrate with your existing Continuous Integration/Continuous Deployment (CI/CD) pipeline.
* If you can’t integrate directly with, or for some reason you don’t have a CI/CD pipeline, then the Auth0 [Source Control Extensions](/extensions#deploy-hosted-pages-rules-and-database-connections-scripts-from-external-repositories) can provide an easy-to-set-up basic automation process with very low maintenance.

::: warning
Note that both the Deploy CLI Tool and source control extensions can cause destructive changes; manual changes made directly in the dashboard between automated deployments could be lost! For this reason, if either is used, then **all** changes should be deployed from the source control subsystem referenced via the tooling and not made manually.
:::

Each environment may also need some environment-specific configuration--Application Client ID’s and Client Secrets will be different between the Auth0 tenants, for example--so you’re going to want some way of being able to dynamically reference this rather than having hard-coded values. Auth0 provides support for handling environment-specific configuration information through one of the following two approaches:

* Use [Tenant Specific Variables](#tenant-specific-variables)
* Use [keyword replacement](extensions/deploy-cli/references/environment-variables-keyword-mappings) if using the Auth0 Deploy CLI tool

## Tenant specific variables

Auth0 allows you to configure variables that are available from within custom [extensibility](/topics/extensibility); these can be thought of as environment variables for your Auth0 tenant. Rather than hard code references that change when moving code between development, test, and production environments, you can use a variable name that is configured in the tenant and referenced by the custom extensibility code. This makes it easier for the same custom code to function, without changes, in different tenants as the code can reference variables which will be populated with tenant-specific values at execution time:

* For use of variables in Rules, see how to [configure values](/rules/guides/configuration#configure-values)
* For use of variables in Hooks, see how to configure [secrets](/hooks/secrets) in the editor
* For use of variables in Custom DB Scripts, see the [configuration parameters](/connections/database/custom-db/create-db-connection#step-3-add-configuration-parameters) 

::: panel Best Practice
It’s a recommended best practice to use variables to contain tenant-specific values as well as any sensitive secrets that should not be exposed in your custom code. If your custom code is deployed in GitHub/Gitlab/Bitbucket/VSTS, then using a tenant-specific variable avoids exposure of sensitive values via your repository.
:::
