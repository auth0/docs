Every company has some form of Software Development Life Cycle (SDLC), and throughout the development process you will want to align with that strategy. For instance, you need to be able to test your integration with Auth0 in a similar fashion as you test the applications themselves. It is therefore important to [structure Auth0 tenants to support your SDLC](/dev-lifecycle/setting-up-env), and there is a consistent pattern which our customers typically follow when it comes to the best practices associated with tenant layout for doing so:

| Environment | Sample Tenant Name | Description |
| - | - | - |
| Development | **company-dev** | A shared environment where most of your development work occurs |
| QA/Testing | **company-qa** or **company-uat** | An environment for formal testing of the changes you've made |
| Production | **company-prod** | The production tenant |

In some cases you may also want to create one or more sandboxes (e.g., **company-sandbox1**, **company-sandbox2**) so that you can test changes without compromising your development environment. This might be where you test deployment scripts and the like.

::: panel Best Practice
You can also take advantage of our [Implementation Checklists](/architecture-scenarios/checklists) that you can download and customize to meet your implementation project needs.
:::

::: warning
Though Auth0 allows you to create as many free tenants as you'd like, you may be limited for the number of tenants where all paid features are enabled. By default, you are provided with **three** tenants where all features are available.
:::
