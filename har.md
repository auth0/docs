## Throubleshooting with HAR files

Some times during development the authentication flow doesn't work as expected.

The fastest way to get support is to export a HAR file from chrome dev tools. A **HTTP Archive (HAR) format** file, is a JSON formatted log file of the web browser interactions with web servers.

Generating a HAR file:


1.  Close all Incognito windows from Google Chrome.
2.  Open a new Incognito tab on Google Chrome.
3.  Open Chrome Developers Tools on the new Incognito Window and click the Network Tab.
4.  Proceed to demo the issue you want to show us by trying to authenticate.
5.  Once finished, go to the network tab, right click and then **Save as HAR**: ![docs/img/ss-2015-01-19T11-32-15.png](https://cdn.auth0.com/docs/img/ss-2015-01-19T11-32-15.png)
6.  Before sending the HAR file to us, make sure to obfuscate any sensitive information in a text editor.
7.  Send us the file