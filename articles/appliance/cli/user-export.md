---
section: appliance
description: How to export user data using CLI
topics:
    - appliance
    - cli
    - user-export
contentType: how-to
useCase: appliance
applianceId: appliance15
---

# How to export user data using Command Line Interface(a0cli)

1 - a0cli can be used to export userdata using the user-export sub-command. 
Creating a user-export is a time consuming process and depends on the size of your user database.
You can start the user-export process as shown below. We recommend not to use any specials character in this password($PASS).

 `a0cli -t <YourIP> user-export $PASS 'user_id,email,phone_number,name'` 

Following fields are valid for user-export
'_id',
'email',
'email_verified',
'phone_number',
'phone_verified',
'name',
'user_id',
'lastLogin',
'updated_at',
'__tenant'

::: note
You can keep checking the status of the export using the `$a0cli user-export-status` command.
Once it shows `"message":"User export found"...`, the export can be downloaded/retrieved using the following commands.
:::

2 - Download the created export using the following command.

 `a0cli -t <YourIP> user-export-retrieve`

3 - The Downloaded export will be encrypted with the Password hence needs to be decrypted. Use the folllowing openssl command to decrypt the export file.

`openssl enc -aes-256-ctr -in user_export.tar.gz.enc -out user_export_open.tar.gz -d -md md5 -nosalt -k $PASS`

4 - Now this file can be unarchived.

 `tar xf user_export_open.tar.gz`

5 - Verify if the file contains the requested data.

 `head user-export.json`
