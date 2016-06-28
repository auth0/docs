# Automatic Creation of Tenants


## Creating a Management API Client for the Root Tenant Authority

1. Choose the Root Tenant Authority (RTA) tenant using the drop-down menu located in the top right-hand side of the Dashboard.
2. Go to the Applications page.
3. Create an application called "Tenant Provisioning."
4. Once you have created the "Tenant Provisioning" client, go to the Connections tab and disable **all** Connections for this client. By default, a newly-created client will have one Database and one Social Connection.
5. Navigate to `${uiUrl}/#/apis`. Click the link to open the Auth0 Management API.
6. Go to the Non Interactive Clients tab, and enable Tenant Provisioning by moving the associated slide to the right.
7. Under the Scopes section that pops up, select the option to `create:client_grants`. Click "Update" to save your changes.

## Getting an Access Token

## Creating a Tenant

## Getting an Access Token for the Newly-Created Tenant
