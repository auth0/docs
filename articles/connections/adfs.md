---
title: ADFS
layout: doc.nosidebar
---
# ADFS

This is the data you should give to the ADFS admin:

* Realm Identifier: `urn:auth0:@@account.tenant@@`
* Endpoint: `https://@@account.namespace@@/login/callback`

> If you want to use the [/oauth/ro](/auth-api#post--oauth-ro) endpoint make sure to enable `/adfs/services/trust/13/usernamemixed`.

### Scripted setup

For automated integration, this script uses the [ADFS PowerShell SnapIn](http://technet.microsoft.com/en-us/library/adfs2-powershell-basics.aspx) to create and configure a Relying Party that will issue the following claims: __email__, __upn__, __given name__ and __surname__ for the authenticated user.

    (new-object Net.WebClient -property @{Encoding = [Text.Encoding]::UTF8}).DownloadString("https://raw.github.com/auth0/adfs-auth0/master/adfs.ps1") | iex
    AddRelyingParty "urn:auth0:@@account.tenant@@" "https://@@account.namespace@@/login/callback"

Copy & Paste the script above on Windows PowerShell.

![](//cdn.auth0.com/docs/img/adfs-script.png)

> You must run the script above as an administrator of your system.

#### What does the script do?

#####1. Creates the Relying Party on ADFS

    $realm = "urn:auth0:@@account.tenant@@";
    $webAppEndpoint = "https://@@account.namespace@@/login/callback";

    Add-PSSnapin Microsoft.Adfs.Powershell
    Add-ADFSRelyingPartyTrust -Name $realm -Identifier $realm -WSFedEndpoint $webAppEndpoint
    $rp = Get-ADFSRelyingPartyTrust -Name $realm

#####2. Creates the rules to output the most common Active Directory attributes (email, UPN, given name, surname)

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

### Manual setup

If you don't feel comfortable executing the script, you can follow these manual steps.

1- Open the ADFS Management Console

2- Click on `Add Relying Party Trust`

3- Click `Start` on the first step

4- Select `Enter data about the relying party manually` and click `Next`

![](//cdn.auth0.com/docs/img/adfs-importmanual.png)

5- Enter an arbitrary name (e.g. "@@account.appName@@") and click `Next`

6- Leave the default selection (ADFS 2.0 profile) and click `Next`

7- Leave the default (no encryption certificate) and click `Next`

8- Check `Enable support for the WS-Federation...`, enter the following value in the textbox and click `Next`

    https://@@account.namespace@@/login/callback

![](//cdn.auth0.com/docs/img/adfs-url.png)

9- Add a relying party identifier with the following value and click `Add` and then `Next`

    urn:auth0:@@account.tenant@@

![](//cdn.auth0.com/docs/img/adfs-identifier.png)

10- Leave the default option (Permit all users...) and click `Next`

11- Click `Next` and then `Close`. The UI will show a new window to edit the Claim Rules

12- Click on `Add Rule...`

13- Leave the default option (Send LDAP Attributes as Claims)

![](//cdn.auth0.com/docs/img/adfs-sendldap.png)

14- Give the rule an arbitrary name that describes what it does. For example:

    Map ActiveDirectory attributes (mail -> Mail, displayName -> Name, userPrincipalName -> NameID, givenName -> GiveName, sn -> Surname)

15- Select the following mappings and click `Finish`

![](//cdn.auth0.com/docs/img/adfs-claimrules.png)

Yes, running the script is definitely easier.
