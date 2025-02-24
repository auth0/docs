---
title: Incorporate Deploy CLI into Build Environment
description: Learn how to incorporate the Deploy CLI tool into your build environment.
topics:
  - extensions
  - deploy-cli
contentType:
  - how-to
useCase: extensibility-extensions
---
# Incorporate Deploy CLI into Build Environment

Auth0 offers a Deploy CLI tool that we recommend you incorporate into your build system. The Deploy CLI tool allows you to:

* Deploy using the command line
* Create a repository to store your deployment configuration
* Create a set of configuration files for each environment (e.g., development, production)
* Have a deployment build for each environment that updates a local copy of the deployment configuration repository on your continuous integration server

## Auth0 tenant layout

We recommend that you have a separate Auth0 tenant/account for each environment you have. For example, you might have the following environments and Auth0 tenants:

| Environment | Tenant |
| - | - |
| Development | *fabrikam-dev* |
| Testing | *fabrikam-uat* |
| Staging | *fabrikam-staging* |
| Production | *fabrikam-prod* |

### Your deploy configuration repository

Your configuration repository should contain a specific set of files based on how you've chosen to import/export your tenant configuration information:

* [Directory Structure](/extensions/deploy-cli/guides/import-export-directory-structure)
* [YAML File](/extensions/deploy-cli/guides/import-export-yaml-file)

You should have at least one branch for each tenant/account in your repository, which allows you to make changes without deploying them (the changes would only deploy when you merged your branch into the master, or primary, branch). With this setup, you can have a continuous integration task for each environment that automatically deploys changes to the targeted environment whenever the master branch receives updates.

Your workflow would, therefore, look something like this:

1. Make changes to development.
2. Merge changes to testing (or `uat`).
3. Test changes to `uat`. When ready, move and merge the changes to `staging`.
4. Test `staging`. When ready, move and merge the changes to `production`.

You may want to set your production environment to deploy only when triggered manually.

### Your continuous integration (CI) server configuration

Your CI server should have a different deploy task and config for each environment. Since each tenant/account needs to have the `auth0-deploy-cli-extension` installed and using a different domain, client ID, and secret, you will need to create individual configurations -- this has the bonus of helping you avoid accidental deployments to the wrong environment.

The deploy task should do the following:

 1.  Update the local repo to include the latest changes (each environment should have its own branch of the repository that can later be merged with other branches)
 1.  If there are changes, call `a0deploy`.
 1.  Run a suite of tests to confirm configuration is working.
 1.  (Optional) Merge to next branch (e.g. `development` to `uat` or `uat` to `staging`.

### Use keyword mappings to handle differences between the environments

You should not have to store differences between environments in the Deploy Configuration Repository. Use the keyword mappings to allow the repository to be environment agnostic, and save the differences in the separate `config.json` files for each environment on the CI server.

For more information, see [Environment Variables and Keyword Mappings](/extensions/deploy-cli/references/environment-variables-keyword-mappings).

## Keep reading

* [Install the Deploy CLI Tool](/extensions/deploy-cli/guides/install-deploy-cli)
* [Call Deploy CLI Tool Programmatically](/extensions/deploy-cli/guides/call-deploy-cli-programmatically)
* [Deploy CLI Tool Options](/extensions/deploy-cli/references/deploy-cli-options)
* [Import/Export Tenant Configuration to a Directory Structure](/extensions/deploy-cli/guides/import-export-directory-structure)
* [Import/Export Tenant Configuration to a YAML File](/extensions/deploy-cli/guides/import-export-yaml-file)
* [Troubleshooting Deploy CLI Tool](/extensions/deploy-cli/references/troubleshooting)
