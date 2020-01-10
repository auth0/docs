---
title: Connect Your App to ADFS
connection: ADFS
image: /media/connections/adfs.png
public: true
alias:
    - active-directory-federation-services
    - adfs-2
seo_alias: adfs
description: Learn how to connect your application to Active Directory Federation Services (ADFS) using enterprise connections.
crews: crew-2
topics:
    - connections
    - enterprise
    - azure
    - active-directory
    - microsoft
    - ad-fs
contentType: how-to
toc: true
useCase:
    - customize-connections
    - add-idp
---
# Connect Your App to ADFS

To connect your application to Microsoft's Active Directory Federation Services (ADFS), you will need to provide the following information to your ADFS administrator:

* Realm Identifier: `urn:auth0:${account.tenant}`
* Endpoint: `https://${account.namespace}/login/callback` or `https://<YOUR CUSTOM DOMAIN>/login/callback`, if you are using a [custom domain](/custom-domains).

::: panel Federated Metadata
The Federation Metadata file contains information about the ADFS server's certificates. If the Federation Metadata endpoint (`/FederationMetadata/2007-06/FederationMetadata.xml`) is enabled in ADFS, Auth0 can periodically (once a day) look for changes in the configuration, like a new signing certificate added to prepare for a rollover. Because of this, enabling the Federation Metadata endpoint is preferred to providing a standalone metadata file. If you provide a standalone metadata file, we will notify you via email when the certificates are close to their expiration date.
:::

You can use a script to to setup the connection or set it up manually. 

## Scripted setup

Run the following two commands in the Windows PowerShell window.

::: note
You must run this script as an administrator of your system.
:::

```powershell
(new-object Net.WebClient -property @{Encoding = [Text.Encoding]::UTF8}).DownloadString("https://raw.github.com/auth0/adfs-auth0/master/adfs.ps1") | iex
```

```powershell
AddRelyingParty "urn:auth0:${account.tenant}" "https://${account.namespace}/login/callback"
```

For automated integration, this script uses the [ADFS PowerShell SnapIn](http://technet.microsoft.com/en-us/library/adfs2-powershell-basics.aspx) to create and configure a **Relying Party** that will issue, for the authenticated user, the following claims: **email**, **upn**, **given name** and **surname**.

::: note
If you are using the [custom domains](/custom-domains) feature, you will need to replace the `$webAppEndpoint` value with `https://<YOUR CUSTOM DOMAIN>/login/callback`.
:::

The script creates the Relying Party Trust on ADFS, as follows:

```powershell
$realm = "urn:auth0:${account.tenant}";
$webAppEndpoint = "https://${account.namespace}/login/callback";

Add-PSSnapin Microsoft.Adfs.Powershell
Add-ADFSRelyingPartyTrust -Name $realm -Identifier $realm -WSFedEndpoint $webAppEndpoint
$rp = Get-ADFSRelyingPartyTrust -Name $realm
```

The script also creates rules to output the most common attributes, such as email, UPN, given name, or surname:

```powershell
$rules = @'
@RuleName = "Store: ActiveDirectory -> Mail (ldap attribute: mail), Name (ldap attribute: displayName), Name ID (ldap attribute: userPrincipalName), GivenName (ldap attribute: givenName), Surname (ldap attribute: sn)"
c:[Type == "http://schemas.microsoft.com/ws/2008/06/identity/claims/windowsaccountname", Issuer == "AD AUTHORITY"]
=> issue(store = "Active Directory",
    types = ("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress",
             "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name",
             "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier",
             "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname",
             "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname"), query = ";mail,displayName,userPrincipalName,givenName,sn;{0}", param = c.Value);
'@

Set-ADFSRelyingPartyTrust –TargetName $realm -IssuanceTransformRules $rules

$rSet = New-ADFSClaimRuleSet –ClaimRule '=> issue(Type = "http://schemas.microsoft.com/authorization/claims/permit", Value = "true");'
Set-ADFSRelyingPartyTrust –TargetName $realm –IssuanceAuthorizationRules $rSet.ClaimRulesString
```

## Manual setup

1. Open the ADFS Management Console.
1. Click **Add Relying Party Trust**.
1. Click **Start**.
1. Select **Enter data about the relying party manually** and click **Next**.
1. Enter a name (such as `${account.appName}`) and click **Next**.
1. Use the default (`ADFS 2.0 profile`) and click **Next**.
1. Use the default (`no encryption certificate`) and click **Next**.
1. Check **Enable support for the WS-Federation...** and enter the following value in the textbox:

    `https://${account.namespace}/login/callback` or if you are using a [custom domain](/custom-domains), use `https://<YOUR CUSTOM DOMAIN>/login/callback`

1. Click **Next**.
1. Add a Relying Party Trust identifier with the following value:

    `urn:auth0:${account.tenant}`

1. Click **Add** and then **Next**.
1. Leave the default `Permit all users...` and click **Next**.
1. Click **Next** and then **Close**.
1. In the **Claim Rules** window, click **Add Rule...**.
1. Leave the default `Send LDAP Attributes as Claims`.
1. Give the rule a name that describes what it does. 
1. Select the following mappings under `Mapping of LDAP attributes to outgoing claim types` and click **Finish**.

    | LDAP Attribute | Outgoing Claim Type |
    | --- | --- |
    | E-Mail-Addresses | E-Mail Address |
    | Display-Name | Name |
    | User-Principal-Name | Name ID |
    | Given-Name | Given Name |
    | Surname | Surname |

### Add additional LDAP attributes

The mappings in the previous steps are the most commonly used, but if you need additional LDAP attributes with information about the user, you can add more claim mappings.

1. If you closed the window on the previous step, select **Edit Claim Rules** on the context menu for the Relying Party Trust you created, and edit the rule.

2. Create an additional row for every LDAP attribute you need, choosing the attribute name in the left column and desired claim type in the right column.

3. If the claim type you are looking for doesn't exist, you have two options:

    * Type a [namespace-qualified name](/tokens/guides/create-namespaced-custom-claims) for the new claim (for example `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/department`).
    * Register a new claim type (under **ADFS > Services > Claim Descriptions**) on the ADFS admin console), and use the claim name in the mapping.

    Auth0 uses the name part of the claim type (for example `department` in `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/department`) as the attribute name for the user profile.

## Next Steps

Now that you have a working connection, the next step is to configure your application to use it. You can follow our step-by-step quickstarts or use our libraries and API.

::: next-steps
* [Get started with our Quickstarts](/quickstarts)
* [Configure your application using our Lock login form](/libraries/lock)
* [Configure your application using our Auth0.js library and your own UI](/libraries/auth0js)
* [Use our Authentication API to authenticate](/api/authentication)
* [Authenticate PHP with ADFS using Auth0](https://auth0.com/authenticate/php/adfs)
:::
