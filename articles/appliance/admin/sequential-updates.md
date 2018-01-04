---
section: appliance
title: Sequential Updates for the PSaaS Appliance
description:
---
# Sequential Updates

Beginning with PSaaS Appliance release **13896**, you can upgrade your PSaaS Appliance one of two ways: in parallel or sequentially.

Previously, you could only update or reconfigure clusters in parallel.

## Modes

When using **parallel mode**, you update or reconfigure multiple nodes simultaneously. You do not have to wait for tasks related to one node to complete before beginning work on another node.

When using **sequential mode**, you will only update or reconfigure one node at a time. Only when this particular node has been updated or reconfigured will another node begin the process. 

The goal of using sequential mode is to minimize or prevent service downtime in the event you need to restart a service due to a newly-applied configuration change.

## How to Choose Your Mode

::: note
Before proceeding, be sure that you are running PSaaS Appliance version **13896**.
:::

You can toggle between parallel and sequential modes using [Settings](${manage_url}/configuration/#settings).

Please note that, when making a change to the mode you're using, you'll impact:

* Configuration changes to the PSaaS Appliance
* Version updates
* The new tenant creation process
* Runs involving force updates

::: panel Force Updates
When you run a **force-update** script, the PsaaS Appliance will, by default, use the mode you've selected. That is, it will either update your nodes sequentially or in parallel. However, if you want to override the default behavior, you can use the `force-update --sequential` or `force-update --parallel` commands.

This override will affect any configuration-related process occurring on your PSaaS Appliance until the force-update script finishes *or* you've forced another update strategy. That is, all subsequent calls to `force-update` will use the last-specified mode.
:::

When using sequential updates, the state of your cluster(s) is eventually consistent. That is, there may be discrepancies in your nodes until all your clusters have been updated successfully.