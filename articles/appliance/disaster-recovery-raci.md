---
description: An in-depth summary of the roles and responsibilities allocated between Auth0 and the subscriber
section: appliance
topics:
    - appliance
    - disaster-recovery
    - raci
contentType: reference
useCase: appliance
applianceId: appliance55
sitemap: false
---

<!-- markdownlint-disable MD033 -->

# Disaster Recovery: Detailed Division of Responsibility

The following RACI Matrix provides an in-depth summary of the roles and responsibilities allocated between Auth0 and the subscriber.

## Definitions

RACI refers to the following list of definitions:

* **Responsible**: the assigned party who is responsible for implementing the task as required;
* **Accountable**: the assigned party who is accountable for the task being completed as required;
* **Consulted**: the party (or parties) whose opinions are requested and with whom there is two-way communication;
* **Informed**: the party (or parties) who are kept up-to-date with regards to progress and with whom there is one-way communication

## Database Backup

::: note
Please see [Database Backup](/appliance/disaster-recovery#database-backups) for more information.
:::

The following table details the task division for configuring, creating, and monitoring the data backup process.

<!-- markdownlint-disable MD033 -->
<table class="table">
    <thead>
        <tr>
            <th>PSaaS Appliance-Related Tasks or Actions </th>
            <th>Auth0</th>
            <th>Subscriber</th>
            <th>Notes</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Provision Additional Backup Disk</td>
            <td>I</td>
            <td>R, A</td>
            <td>The subscriber will need to <a href="/appliance/infrastructure/virtual-machines#virtual-machine-infrastructure-requirements">provision an additional drive</a> for backup purposes.</td>
        </tr>
        <tr>
            <td>Download PSaaS Appliance CLI tool</td>
            <td>C</td>
            <td>R, A</td>
            <td>The subscriber will need to contact their Auth0 Technical Account Manager for the <a href="/appliance/cli/configure-cli#downloading-the-cli-setup-files">custom download link</a>.</td>
        </tr>
        <tr>
            <td>Install PSaaS Appliance CLI Tool</td>
            <td>I</td>
            <td>R, A</td>
            <td>The subscriber will need to <a href="/appliance/cli/configure-cli#installing-and-using-the-cli">install the CLI tool</a>.</td>
        </tr>
        <tr>
            <td>Configure Appliance CLI Tool</td>
            <td>I</td>
            <td>R, A</td>
            <td>The subscriber will need to add a <a href="/appliance/cli/adding-node-to-backup-role">node to the backup role</a>.</td>
        </tr>
        <tr>
            <td>Perform Data Backup via CLI Tool</td>
            <td>I</td>
            <td>R, A</td>
            <td>The subscriber will need to <a href="/appliance/cli/backing-up-the-appliance#generate-a-new-backup">initiate a backup action via the CLI</a>, as well as check periodically on the status of the backup.</br>Beginning with version <code>11638</code>, a separate Sensitive Configuration Backup needs to performed as well.</td>
        </tr>
        <tr>
            <td>Store Data Backup at a Secondary Site</td>
            <td>I</td>
            <td>R, A</td>
            <td>The subscriber will need to retrieve an existing backup and store it in a safe location outside the PSaaS Appliance.</td>
        </tr>
        <tr>
            <td>Delete Data Backups</td>
            <td>I</td>
            <td>R, A</td>
            <td>Only one backup should be stored in the backup device. If there exists a backup on the device, the subscriber will be asked to <a href="/appliance/cli/backing-up-the-appliance#delete-a-backup ">delete it</a> prior to creating a new one.</td>
        </tr>
    </tbody>
</table>
<!-- markdownlint-enable MD033 -->

## Restore Data Backup

<!-- markdownlint-disable MD033 -->
<table class="table">
    <thead>
        <tr>
            <th>PSaaS Appliance-Related Tasks or Actions </th>
            <th>Auth0</th>
            <th>Subscriber</th>
            <th>Notes</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Have Data Backup Available</td>
            <td>C</td>
            <td>R, A</td>
            <td>The data backup files should be available and ready to be copied to the Auth0 VMs.</td>
        </tr>
        <tr>
            <td>Provide Backup Password</td>
            <td>I</td>
            <td>R, A</td>
            <td>The subscriber will provide the password used to create and encrypt the backup file. Without this password, the backup file cannot be decrypted and used to restore the environment.</td>
        </tr>
        <tr>
            <td>Create New Virtual Machines from Auth0 Images</td>
            <td>I, C</td>
            <td>R, A</td>
            <td>The subscriber will be responsible for creating the new virtual machines (where the environment will be restored from the backup) using images provided by Auth0.</td>
        </tr>
        <tr>
            <td>Restore the Data Backup</td>
            <td>R, C</td>
            <td>I</td>
            <td>Please open a ticket in the <a href="${env.DOMAIN_URL_SUPPORT}">Auth0 Support Center</a> to request assistance with restoring a backup. Auth0 Customer Success Engineers will review your request, and if necessary, partner with the subscriber's infrastructure engineers to restore the environment. Please note that, in certain cases, a <a href="/services/private-cloud-configuration">Professional Services</a> fee may apply.</td>
        </tr>
    </tbody>
</table>
<!-- markdownlint-enable MD033 -->

## Virtual Machine Snapshots

<!-- markdownlint-disable MD033 -->
<table class="table">
    <thead>
        <tr>
            <th>PSaaS Appliance-Related Tasks or Actions </th>
            <th>Auth0</th>
            <th>Subscriber</th>
            <th>Notes</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Configure / Create VM Snapshots</td>
            <td>I</td>
            <td>R, A</td>
            <td>The subscriber is responsible for configuring and create snapshots on a scheduled basis.</td>
        </tr>
        <tr>
            <td>Restore VM Snapshots</td>
            <td>I</td>
            <td>R, A</td>
            <td>The subscriber is responsible for restoring a VM Snapshot..</td>
        </tr>
        <tr>
            <td>Recover Auth0 Environment</td>
            <td>R</td>
            <td>I, A</td>
            <td>Auth0 is responsible for recovering the authentication environment.</td>
        </tr>
    </tbody>
</table>
<!-- markdownlint-enable MD033 -->

## Backup Cadence Recommendations

Auth0 recommends backing up your data on a daily basis (usually overnight to lessen impact on performance). However, if you need greater assurance of up-to-date data or have concerns about a logical data corruption, you might choose to backup more frequently. If this is the case, please contact your Auth0 Technical Account Manager to schedule a discussion, since the backup process puts a substantial load on the backup node and may impact your Production environment.

Auth0 recommends taking **weekly** Virtual Machine Snapshots.
