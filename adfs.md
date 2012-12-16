---
title: ADFS
layout: doc.nosidebar
---
# ADFS

### Scripted setup
The script uses the [ADFS PowerShell SnapIn](http://technet.microsoft.com/en-us/library/adfs2-powershell-basics.aspx) to create and configure a Relying Party that will issue email, upn, given name and surname attributes for the user. 

    (new-object Net.WebClient -property @{Encoding = [Text.Encoding]::UTF8}).DownloadString("https://docs.auth0.com/scripts/adfs.ps1") | iex
    AddRelyingParty "urn:auth0:@@{account.clientId}" "https://@@{account.namespace}/login/callback"

#### What the script does?

Create the Relying Party on ADFS

    $realm = "urn:auth0:@@{account.clientId}";
    $webAppEndpoint = "https://@@{account.namespace}/login/callback";
    
    Add-PSSnapin Microsoft.Adfs.Powershell
    Add-ADFSRelyingPartyTrust -Name $realm -Identifier $realm -WSFedEndpoint $webAppEndpoint
    $rp = Get-ADFSRelyingPartyTrust -Name $realm

Create the rules to output the most common Active Directory attribute (email, UPN, given name, surname)

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

If you don't feel confortable executing the script, you can follow the manual steps.

1- Open the ADFS Management Console

2- Click on `Add Relying Party Trust`

3- Click `Start` on the first step

4- Select `Enter data about the relying party manually` and click `Next`

![](img/adfs-importmanual.png)

5- Enter an arbitrary name (like "@@{account.appName}") and click `Next`

6- Leave the default selection (ADFS 2.0 profile) and click `Next`

7- Leave the default (no encryption certificate) and click `Next`

8- Check `Enable support for the WS-Federation...`, enter the following value in the textbox and click `Next`

    https://@@{account.namespace}/login/callback

![](img/adfs-url.png)

9- Add a relying party identifier with the following value and click `Add` and then `Next`

    urn:auth0:@@{account.clientId}


![](img/adfs-identifier.png)

10- Leave the default option (Permite all users...) and click `Next`

11- Click `Next` and then `Close`. The UI will show a new window to edit the Claim Rules

12- Click on `Add Rule...`

13- Leave the default option (Send LDAP Attributes as Claims)

![](img/adfs-sendldap.png)

14- Give the rule n arbitrary name like

    Store: ActiveDirectory -> Mail (ldap attribute: mail), Name (ldap attribute: displayName), Name ID (ldap attribute: userPrincipalName), GivenName (ldap attribute: givenName), Surname (ldap attribute: sn)

15- Select the following mappings and click `Finish`

![](img/adfs-claimrules.png)


