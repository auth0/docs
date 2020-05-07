---
section: private-cloud
description: Public Cloud to Private Cloud migration
topics: private-cloud
contentType: concept
useCase: private-cloud
---
# Public Cloud to Private Cloud Migration

Due to the extra security and isolation provided in our Private Cloud environment, the architecture that it's built on differs from the Public Cloud, which makes migrations between the two a bit more involved. Migrating from a Auth0 Public Cloud to Private Cloud configuration essentially involves rebuilding your environment from scratch, however we have designed the migration process to minimize the impact as much as possible.

The migration process complexity depends on the Auth0 features you are currently using. The process consists of a migration assessment done with the Auth0 team which results in a custom migration guide for your specific implementation as well as a technical validation. Auth0 provides guidance and consulting on the process with a personalized migration plan designed for minimal intervention from Auth0. 

After the migration is complete, your users will have to re-log in and all their sessions will be invalidated. Other impacts depends on features you are using and will be outlined in your migration plan.

## Migration assessment

During the assessment, your Auth0 Technical Account Manager will ask you a series of questions to determine the complexity of your migration. Here are some examples of the questions they will ask you:

* Why do you want to migrate to Private Cloud?
* Are you using custom domains and if so, how? Are you using custom domains with self-managed certificates or Auth0-Managed certificates?
* Do you have over 100 tenants? There are limitation to how custom domain certificates work if you have over 100 tenants.
* Do you use Auth0 database connections?
* Do you use enterprise connections?
* Do you use SAML or WS-Fed connections and/or application addons?
* Do you have metadata on enterprise or social users?
* Do you use Auth0 Rules, Extensions, or Hooks?
* Do you use multi-factor authentication?
* Do you use anomaly detection?
* Do you have different user roles configured?

## Customized migration plan

After the assessment is complete, Auth0 will provide you with a document that outlines the steps to follow to migrate your Auth0 Public Cloud environment to a Private Cloud. The steps are relevant to your specific requirements and are grouped into the following categories:

* Phase 1: Initial Steps 
    General considerations, tooling and limitations.

* Phase 2: Asynchronous Steps
    This phase can be executed in any order, but should be completed prior to moving on to the Final Simultaneous Steps

* Phase 3: Final Simultaneous Steps
    This phase must be executed last and should be completed as close to simultaneously as possible.

Following a review of the plan and a **Go** decision, your Auth0 Technical Account Manager will manage the commercial process and facilitate the handover to the Private Cloud Service Delivery Team.

The Service Delivery Team will coordinate the onboarding of your new Private Cloud environment. Subsequently, you may start executing the migration steps detailed within this guide, either on your own, or by engaging Auth0 Professional Services.

## Technical validation

Following creation of your migration plan, an Auth0 Solutions Architect will technically validate the migration steps. The steps should be validated against both the current source environment and the desired target environment to evaluate migration feasibility.
