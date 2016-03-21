# Creating and Installing a Custom Extension

## Creating a Custom Extension
To begin creating an your custom extension, please feel free to fork/clone any one of Auth0's extension repositories:

- [Auth0 Extension Boilerplate](https://github.com/auth0/auth0-extension-boilerplate)
- [Auth0 Extension with API Boilerplate](https://github.com/auth0/auth0-extension-boilerplate-with-api)
- [Auth0 Extension with React Boilerplate](https://github.com/auth0/auth0-extension-boilerplate-with-react)

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
