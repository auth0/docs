::: panel Best Practice
It’s a recommended best practice to use variables to contain tenant-specific values as well as any sensitive secrets that should not be exposed in your custom code. If your custom code is deployed in GitHub/Gitlab/Bitbucket/VSTS, then using a tenant-specific variable avoids exposure of sensitive values via your repository.
:::