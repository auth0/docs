---
title: Connect ADFS with Auth0
connection: ADFS
image: /media/connections/ms.png
alias:
  - active-directory-federation-services
  - adfs-2
seo_alias: adfs
description: How to connect ADFS with Auth0.
---

# Connect ADFS with Auth0

Provide this information to your ADFS administrator:

* Realm Identifier: `urn:auth0:${account.tenant}`
* Endpoint: `https://${account.namespace}/login/callback`

**Note:** If you want to use the [/oauth/ro](/auth-api#post--oauth-ro) endpoint you must enable `/adfs/services/trust/13/usernamemixed`.

### Scripted setup

For automated integration, this script uses the [ADFS PowerShell SnapIn](http://technet.microsoft.com/en-us/library/adfs2-powershell-basics.aspx) to create and configure a **Relying Party** that will issue, for the authenticated user, the following claims: **email**, **upn**, **given name** and **surname**.

    (new-object Net.WebClient -property @{Encoding = [Text.Encoding]::UTF8}).DownloadString("https://raw.github.com/auth0/adfs-auth0/master/adfs.ps1") | iex
    AddRelyingParty "urn:auth0:${account.tenant}" "https://${account.namespace}/login/callback"

Copy and paste the script above into the Windows PowerShell window.

![](/media/articles/connections/enterprise/adfs/adfs-script.png)

**Note:** You must run this script as an administrator of your system.

#### What the script does

##### 1. Creates the *Relying Party* on ADFS

    $realm = "urn:auth0:${account.tenant}";
    $webAppEndpoint = "https://${account.namespace}/login/callback";

    Add-PSSnapin Microsoft.Adfs.Powershell
    Add-ADFSRelyingPartyTrust -Name $realm -Identifier $realm -WSFedEndpoint $webAppEndpoint
    $rp = Get-ADFSRelyingPartyTrust -Name $realm

##### 2. Creates rules to output the most common Active Directory attributes (email, UPN, given name, surname)

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

If you don't feel comfortable executing the script, you can follow these steps:

1. Open the ADFS Management Console.
2. Click on **Add Relying Party Trust**.
3. Click **Start** on the first step.
4. Select **Enter data about the relying party manually** and click **Next**.

    ![](/media/articles/connections/enterprise/adfs/adfs-importmanual.png)
5. Enter an arbitrary name (e.g. "${account.appName}") and click **Next**.
6. Leave the default selection (*ADFS 2.0 profile*) and click **Next**.
7. Leave the default (*no encryption certificate*) and click **Next**.
8. Check **Enable support for the WS-Federation...**, enter the following value in the textbox and click **Next**.

    `https://${account.namespace}/login/callback`

    ![](/media/articles/connections/enterprise/adfs/adfs-url.png)

9. Add a *Relying party trust identifier* with the following value and click **Add** and then **Next**.

    `urn:auth0:${account.tenant}`

    ![](/media/articles/connections/enterprise/adfs/adfs-identifier.png)
10. Leave the default option (*Permit all users...*) and click **Next**.
11. Click **Next** and then **Close**. The UI will show a new window to edit the **Claim Rules**.
12. Click on **Add Rule...**.
13. Leave the default option (*Send LDAP Attributes as Claims*).

    ![](/media/articles/connections/enterprise/adfs/adfs-sendldap.png)

14. Give the rule an arbitrary name that describes what it does. For example:

    `Map ActiveDirectory attributes (mail -> Mail, displayName -> Name, userPrincipalName -> NameID, givenName -> GiveName, sn -> Surname)`

15. Select the mappings as shown in this image and click **Finish**.

    ![](/media/articles/connections/enterprise/adfs/adfs-claimrules.png)

16. (Optional) Adding additional LDAP attributes

  The mappings created on step **15** are the most commonly used, but if you need additional LDAP attributes with information about the user, you can add more claim mappings. 
  
 > If you already closed the window on the previous step, select **Edit Claim Rules** on the context menu for the Relying Party Trust you created, and edit the rule from step **14**).
 
  Create a row for every additional LDAP attribute you need, choosing the attribute name on the left column and desired claim type on the right column. 
  If the claim type you are looking for doesn't exist, you have two options:
 
  - Type a namespace-qualified name for the new claim (i.e. `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/department`).
  - Register a new claim type (under **AD FS | Services | Claim Descriptions**) on the ADFS admin console), and use the claim name in the mapping.

  Auth0 will use the name part of the claim type (i.e. `department` in `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/department`) as the attribute name for the user profile.

Yes, running the script is definitely easier.
