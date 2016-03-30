# Creating and Installing a Custom Extension

Rather that using one of Auth0's provided extensions, you may choose to create your own.

## Creating a Custom Extension
To begin creating an your custom extension, please feel free to fork/clone any one of Auth0's extension repositories:

- [Auth0 Extension Boilerplate](https://github.com/auth0/auth0-extension-boilerplate)
- [Auth0 Extension with API Boilerplate](https://github.com/auth0/auth0-extension-boilerplate-with-api)
- [Auth0 Extension with React Boilerplate](https://github.com/auth0/auth0-extension-boilerplate-with-react)

Alternatively, you may following the Development Instructions provided via the "New Extension" window that appears when you click on the "+ Extension" button. This allows you to create your own extension using the command line.

## Installing a Custom Extension
Once you have created your own extension, you may install it manually via the Auth0 Management Portal.

Near the top right-hand side of the window, click the "+ NEW EXTENSION" button. In the "New Extension" window that pops open, provide the GitHub URL to the repository that contains the files required by your extension.

> At this time, only repositories hosted by GitHub may be used.

Alternatively, you may host your files elsewhere and simply provide a link to the `webtask.json` file in the box (e.g. `http://example.com/webtask.json`).

![]()

Once you have provided the link to your files and clicked "Create", you will be prompted to install the extension. If you would like to proceed, click "Install."

At this point, you have two options in addition to completing the installation of the extension. You may:

- complete the installation at a later date. If you click on the "X" at the top right to exit the window, Auth0 will add your extension to the "All Extensions" tab. At a later date, you may choose this to complete the installation;
- delete the extension completely by clicking on the "Delete" button.

## Configuring the Installed Extension

Once you have installed your extension, you...

Under the "Installed Extensions" tab you will find your newly-installed extension listed. Click on the link to obtain more information about the app. You will be prompted to authorize the extension's access to your Auth0 account.

After you've authorized the extension's access to your account, you will be presented with a [JSON Web Token](/tokens/) that is similar to the following:

```
eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlJERTFPRVV5UkRFNFJVWTVPVGRCT0RNM09UZ3hNRUpFTWtGQ01VUkZRVGcxTlRVeFJERkRSQSJ9.eyJpc3MiOiJodHRwczovL2F1dGgwLmF1dGgwLmNvbS8iLCJzdWIiOiJnb29nbGUtYXBwc3xrYXRpZUBhdXRoMC5jb20iLCJhdWQiOlsiaHR0cHM6Ly9hdXRoMHVzZXIuYXV0aDAuY29tL2FwaS92Mi8iLCJodHRwczovL2F1dGgwLmF1dGgwLmNvbS91c2VyaW5mbyJdLCJhenAiOiJodHRwczovL3NhbmRib3guaXQuYXV0aDAuY29tL2FwaS9ydW4vYXV0aDB1c2VyL2F1dGgwLWV4dGVuc2lvbi1ib2lsZXJwbGF0ZSIsImV4cCI6MTQ1ODg3MTE5MywiaWF0IjoxNDU4ODM1MTkzLCJzY29wZSI6InJlYWQ6Y29ubmVjdGlvbnMgb3BlbmlkIHByb2ZpbGUifQ.GJgPrH_s0_u3wRdHvlvvoOm0wyA6JLFEa8R_gfAyu08wQiGVGNtnvyG1wWAEHk7ALnhDHn3O-qyB4R21ttbNtYxpxxthhhQrwR4lt2enyBnMxfxgSYWQdv2PNNAvPWm3qOkuy0M7t__RdB8utajsd4OALB0M6v8hqmkinXguTy0YL7lQzWajHzEcuR9QwKeoIPwTRRWQOrea4Z9bGhhWsIrdUmCCSevlxGPm2ol0HTDHqSwB_oDYmG7GDqZ-XxTUA-rRJ6Q8LA6wOvC12NYuIMaho-iM52k5pN3ItLVIfxVAjfvA_zXkErMAbJWdDW8Kl32Jyp9bXUkqt_yxejeN9A
```
