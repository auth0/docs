---
section: appliance
---

# Auth0 Appliance Dashboard: Settings

::: panel-info Appliance Dashboard Navigation

For additional information on navigating to and using the Appliance Dashboard, please see the section on [Appliance Controls](/appliance/dashboard#appliance-controls).

:::

The Settings page is where you will make most of the changes that pertain to your Appliance configuration.

![](/media/articles/appliance/dashboard/settings.png)

The Settings page is broken down into the following sections:

* [General](#general)
* [Dashboard](#dashboard)
* [HTTPS Configuration](#https-configuration)
* [SMTP Server](#smtp-server)
* [Session](#session)
* [Update Settings](#update-settings)
* [Monitoring](#monitoring)
* [API Keys](#api-keys)
* [Advanced Settings](#advanced-settings)
* [Deprecated](#deprecated)

## General

* **Company Handle**: the internal identifier for your company. Use only lowercase characters (no spaces or special characters);
* **NTP Servers**: the IP address of an internal NTP server (e.g.: *10.4.2.39*) or a public NTP server (e.g.: *1.north-america.pool.ntp.org burst iburst minpoll 3 maxpoll 5*). This setting is particularly important, since it assists in time synchronization among the various pieces of your infrastructure;
* **Enable GeoIP**: if enabled, Auth0 will update the geo-coding database for mapping IP addresses to locations (you **MUST** permit access to www.maxmind.com through your firewall);
* **Enforce Logout URLs**: if enabled, Auth0 requires the Logout URL used to be included in the list indicated under Allowed Logout URLs.

## Dashboard

* **Enable "New Account" in Dashboard**: if enabled, you may create new isolated accounts (called tenants) in the Appliance;
* **Federated Logout**: if enabled, signing out of the Dashboard also signs you out from the ldP (e.g. when using enterprise connections with the Dashboard).

## HTTPS Configuration

* **SSL Certificate Format**: indicates whether the certificate is either *PFX/PKCS12* or *Standard PEM*;

    *If you are using a PFX/PKCS12 certificate:*
* **SSL PFX Cert**: the password used to authenticate your PFX Certificate;
* **PFX Certificate**: clicking this button enables you to upload a copy of your PFX Certificate;

    *If you are using a Standard PEM certificate:*
* **Upload Public Key...**: clicking this button enables you to upload the file containing your public key;
* **Upload Public Key...**: clicking this button enables you to upload the file containing your public key;

* **Disable TLSv1**: disables TLSv1, which reduces compatibility with technologies like .NET 4.0;
* **Disable TLSv1.1**: disables TLSv1.1, which reduces compatibility with older browsers like IE 11.

## SMTP Server

* **Send Mails From**: *Deprecated.* The email address used in the "From" field typically comes from that provided on your [custom email template](https://${uiURL}/#/emails);
* **SMTP Server**: the name of your SMTP server;
* **SMTP Port**: the port through which you access your SMTP server;
* **SMTP User**: the username to log in to your SMTP server;
* **SMTP Password**: the password to log in to your SMTP server.

## Session

* **Dashboard Session Timeout (min)**: the amount of idle time allowed prior to the Dashboard session getting logged out. Use 0 to avoid expiration;
* **SSO Session Absolute Timeout**: the absolute time window for which the user can have an SSO session. After this period of time elapses, the user will be required to log in again;
* **SSO Session Inactive Timeout**: the maximum time window for which the user can have an SSO session without logging in again or calling the "ssodata" endpoint. If the user logs in again or calls the "ssodata" endpoint, the time window will be extended again;
* **SSO Session Ephemeral Cookie**: if enabled, the SSO session cookie will not be persist and users will lose their SSO session in Auth0 after closing their browsers;
* **MFA Session Absolute Timeout**: the absolute time window for which the user can have an MFA session. After this period of time elapses, the user will be prompted again for MFA;
* **MFA Session Inactive Timeout**: the maximum time window for which the user can have an MFA session without logging in again. If the user logs in prior to the expiration of this time period, the window will be extended.

## Update Settings

* **Update Proxy**: unless your specific configuration is set up for offline updates, please leave this field blank.

## Monitoring

* **New Relic License Key**: if you use New Relic for monitoring, enter your license key here to monitor your Appliance instances.

## API Keys

* **Health service**: generates a key that authenticates your API calls for status information regarding your Appliance instances;

    ![](/media/articles/appliance/dashboard/health-keys-api-service.png)

    **Please be sure to save the Settings page to persist the newly-generated key.**

## Advanced Settings

* **Enable Large Cookie Size**: if enabled, cookies larger than 4kb will be permitted (this might be required for protocols such as SAML and WS-Federation).
* **Max Custom Database Timeout**: the maximum time allowed in seconds to make a query to your database (in seconds) for a custom database connection.

## Deprecated

* **Updated URL**: unless your specific configuration is set up for offline updates, please update via [Auth0's hosted mirror site](http://apt-mirror.it.auth0.com).
