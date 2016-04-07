# Troubleshooting with HAR files

Sometimes during development the authentication flow doesn't work as expected.

The fastest way to identify the underlying issue is to export a `HAR` file from Google Chrome Dev Tools. An **HTTP Archive (HAR) format** file, is a JSON formatted log file of all web browser interactions with web servers.

## Generating a HAR file:

1. Close all __incognito__ windows from Google Chrome.
1. Open a __new incognito__ tab on Google Chrome.
1. Open __Google Chrome Developers Tools__ on the new Incognito Window and click the Network Tab. Make sure you check the __Preserve Log__ options to record all interactions.
1. Proceed with the navigation that presents issues.
1. When complete, go back to the __Network__ tab, right click and then select **Save as HAR**: ![docs/img/ss-2015-01-19T11-32-15.png](/media/articles/har/ss-2015-01-19T11-32-15.png)
1. Before sending the HAR file to us, make sure to obfuscate any sensitive information using a text editor (e.g. remove passwords, client_secrets, etc).
1. Send the file to support by opening a [support ticket](https://support.auth0.com)
