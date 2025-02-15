---
section: private-cloud
description: Configuring Parameters for a Group of Auth0 Nodes
topics: managed-private-cloud
contentType: concept
useCase: private-cloud
---
# Work with Zones in the Managed Private Cloud

Beginning with **Managed** Private Cloud Release **1910.0**, you will be able to:

* Group your Auth0 nodes into **zones**
* Uniquely configure each zone so that each zone has its own parameters and configuration settings

## Zones 101

If you have multiple nodes, you can group the nodes into zones. For example, you might group six nodes as follows:

* **Region 1** consists of nodes `a0-1`, `a0-2`, and `a0-3`.
* **Region 2** consists of nodes `a0-4`, `a0-5`, and `a0-6`.

Each zone has its own configuration, which informs the base configuration for a zone (therefore, the configuration for a node is inherited from the zone).

## How to create zones

You can create new zones via the Private Cloud Dashboard.

Go to **<manage_url>/psaas/dashboard** (replace **manage_url** with your specific URL). In the left-hand navigation bar, click **Zones**.

![](/media/articles/private-cloud/zones/zones-1.png)

In the top-right corner, click **Create Zone**. Auth0 will create for you a new, inactive zone.

![](/media/articles/private-cloud/zones/zones-2.png)

Click on the downward pointing arrow to reveal the zones creation screen. You'll be asked to provide a **Name** for the zone, as well as the nodes you want to be **Members** of the zone.

![](/media/articles/private-cloud/zones/zones-3.png)

Once you provide a **Name** and indicate the **Members** of the zone, you can click **Save Zones** to persist your changes. Your zone remains inactive until you switch the toggle to **Active** (only one zone may be active at any given time).

![](/media/articles/private-cloud/zones/zones-4.png)

Once you have a zone created, you will see a new drop-down menu in the left-hand navigation bar.

![](/media/articles/private-cloud/zones/zones-6.png)

This new drop-down menu allows you to switch between zones for configuration.

![](/media/articles/private-cloud/zones/zones-5.png)

## Configure zones

To change the configuration for your zone, go to **Cloud Resources** using the left-hand navigation bar.

Recall that the drop-down menu on the left-hand navigation bar allows you to switch between zones for configuration. Make sure that this area shows the zone for which you are adjusting the configuration.

![](/media/articles/private-cloud/zones/zones-7.png)

Once you've made sure that you're adjusting the settings for the correct zone, you can change the **Credentials**, information about the **PostgreSQL instance**, and **Listener** information. 

### Configuration notes

By default, the **Base Configuration**, which contains the configuration parameters all nodes that don't belong to a zone get, is propagated to all nodes and is the default selection.

Any changes you make to the configuration when you have a specific zone selected will be propagated **only to the nodes that are members of that zone**.

When working with zones, modify parameters on a per-zone basis. Any parameters that are shared between multiple nodes should be specified at the Base Configuration level.

### A configuration example

If your **Base Configuration** for your PostgreSQL instance is:

```code
PostgreSQL:
    **host**: foo.bar
    **username**: auth0
    **password**: password
```

And you change, for a given zone, the **host**:

```code
PostgreSQL:
    **host**: bar.baz
```

Then the specific configuration applied to a node that's a member of the zone is:

```code
PostgreSQL:
    **host**: bar.baz
    **username**: auth0
    **password**: password
```
