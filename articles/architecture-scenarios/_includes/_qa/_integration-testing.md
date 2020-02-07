It is a recommended best practice that you set up different tenants for development, testing, and production as discussed in Architecture guidance for [SDLC support](architecture-scenarios/implementation/${platform}/${platform}-architecture#sdlc-support). Auth0 allows you to configure variables that are available from within custom [extensibility](/topics/extensibility); these can be thought of as environment variables for your Auth0 tenant. Rather than hard code references that change when moving code between development, test, and production environments, you can use a variable name that is configured in the tenant and referenced by the custom extensibility code. This makes it easier for the same custom code to function, without changes, in different tenants as the code can reference variables which will be populated with tenant-specific values at execution time:

* For use of variables in Rules, see how to [configure values](/rules/guides/configuration#configure-values)
* For use of variables in Hooks, see how to configure [secrets](/hooks/secrets) in the editor
* For use of variables in Custom DB Scripts, see the [configuration parameters](/connections/database/custom-db/create-db-connection#step-3-add-configuration-parameters) 

::: panel Best Practice
It’s a recommended best practice to use variables to contain tenant-specific values as well as any sensitive secrets that should not be exposed in your custom code. If your custom code is deployed in GitHub, then using a tenant-specific variable avoids exposure of sensitive values via your GitHub repository.
:::

### Test automation

You can automate your overall build process by incorporating deployment automation as well as test automation. This can be used to deploy new versions of configuration and/or custom code to Auth0 and execute automated tests. If the tests uncover any failures, the deployment automation capabilities can be used to revert to the last working version. For further information, see the [deployment automation guidance](/architecture-scenarios/implementation/${platform}/${platform}-deployment) provided.
