---
title: Incorporate Deploy CLI into Build Environment
description: Learn how incorporate the Deploy CLI tool into your build environment.
topics:
  - extensions
  - deploy-cli
contentType:
  - how-to
useCase: extensibility-extensions
---
# Incorporate Deploy CLI into Build Environment

We recommended that you incorporate the Deploy CLI tool into your build system. 

* Create a repository to store your deploy configuration.
* Create a set of configuration files for each environment.  
* On your continuous integration server, have a deploy build for each environment which updates a local copy of the deploy configuration repository.
* Run the CLI to deploy it to that environment. 

## Auth0 tenant layout

We recommended that you have a different Auth0 tenant/account for each environment.  For example:

* *fabrikam-dev*
* *fabrikam-uat*
* *fabrikam-staging*
* *fabrikam-prod*

### Your deploy configuration repository

Your configuration repository should contain the files as described in the selected option:

* [Directory Structure](/extensions/deploy-cli/guides/import-export-directory-structure)
* [YAML File](/extensions/deploy-cli/guides/import-export-yaml-file)

You should have a branch for each tenant/account. This allows you to make changes to dev, but not deploy them until you merge. With this setup, you can have each environment have a CI task that automatically deploys the changes to its target environment when the branch is updated with the latest.

So your flow would be as follows:

1. Dev changes are tested.
2. Dev changes are merged to uat.
3. Once tested they are merged to staging.
4. Once staging is tested they are merged to prod.

You may want to set your prod to only deploy when triggered manually.

### Your CI server configuration

Your CI server should have a different deploy task and config for each environment. Since each tenant/account will need to have the auth0-deploy-cli-extension installed in it with a different domain, client ID, and secret, this has to happen anyway and will avoid accidentally deploying to the wrong environment.

The deploy task should follow these steps:

 1.  Update the local repo to the latest. (Each environment should have its own copy of the repo set to its own branch.)
 1.  If there are changes, call `a0deploy`.
 1.  Run a suite of tests to confirm configuration is working.
 1.  (Optional) Merge to next branch.

### Use keyword mappings to handle differences between the environments

You should not have to store differences between environments in the Deploy Configuration Repository. Use the keyword mappings to allow the repository to be environment agnostic, and instead store the differences in the separate `config.json` files for each environment that are stored on the CI server.

For more information, see [Environment Variables and Keyword Mappings](/extensions/deploy-cli/references/environment-variables-keyword-mappings).

## Keep reading

* [Install the Deploy CLI Tool](/extensions/deploy-cli/guides/install-deploy-cli)
* [Call Deploy CLI Tool Programmatically](/extensions/deploy-cli/guides/call-deploy-cli-programmatically)
* [Deploy CLI Tool Options](/extensions/deploy-cli/references/deploy-cli-options)
* [Import/Export Tenant Configuration to a Directory Structure](/extensions/deploy-cli/guides/import-export-directory-structure)
* [Import/Export Tenant Configuration to a YAML File](/extensions/deploy-cli/guides/import-export-yaml-file)
