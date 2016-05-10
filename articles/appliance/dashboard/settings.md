# Auth0 Appliance Dashboard: Settings

The Settings page of the Appliance Dashboard is where you will make changes to a major portion of your configuration. The Settings page is broken down into the following sections:

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
* **NTP Servers**: the IP address of an internal NTP server (e.g.: *10.4.2.39*) or a public NTP server (e.g.: *1.north-america.pool.ntp.org burst iburst minpoll 3 maxpoll 5*);
* **Enable GeoIP**: if enabled, Auth0 will update the geo-coding database for mapping IP addresses to locations (you **MUST** permit access to www.maxmind.com through your firewall);
* **Enforce Logout URLs**: if enabled, Auth0 requires the Logout URL used to be included in the list indicated under the Allowed Logout URLs.

## Dashboard

* **Enable "New Account" in Dashboard**: if enabled, you may create new isolated accounts (called tenants) in the Appliance;
* **Federated Logout**: if enabled, signing out of the Dashboard also signs you out from the ldP (e.g. when using enterprise connections with the Dashboard).

## HTTPS Configuration

* **SSL Certificate Format**: indicates whether the certificate is either *PFX/PKCS12* or *Standard PEM*;
* **SSL PFX Cert**: the password used to authenticate your PFX Certificate;
* **PFX Certificate**: the actual (uploaded) copy of your PFX Certificate;
* **Disable TLSv1**: disables TLSv1, which reduces compatibility with technologies like .NET 4.0;
* **Disable TLSv1.1**: disables TLSv1.1, which reduces compatibility with older browsers like IE 11.

## SMTP Server

* **Send Mails From**: the email address to be used as the return address when sending emails;
* **SMTP Server**: the name of your email server;
* **SMTP Port**: the port through which you access your email server;
* **SMTP User**: the username to log in to your email server;
* **SMTP Password**: the password to log in to your email server;

## Session
* **Dashboard Session Timeout (min)**:
* **SSO Session Absolute Timeout**:
* **SSO Session Inactive Timeout**:
* **SSO Session Ephemeral Cookie**:
* **MFA Session Absolute Timeout**:
* **MFA Session Inactive Timeout**:

## Update Settings

## Monitoring

## API Keys

## Advanced Settings

## Deprecated
