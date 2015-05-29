This is the repository for the Auth0 documentation.


* Always use absolute links
* Do not hard code links to auth0 sites like `docs.auth0.com`, `manage.auth0.com`, etc. Use variables instead such as `@@uiUrl@@`
* Do not store images in external locations like Dropbox, CloudUp, or the Auth0 CDN. Link to images in this repo using `![](/media/folder/image_name.png)`. The image will get automatically uploaded to the CDN and the link will be transformed.


## Test Procedures
When testing a document or tutorial below are several areas to look for.

1) Ensure that the code in the tutorials is correct and functions as expected
2) Ensure that the steps (1..n) are in an order that makes sense and that there are no missing or duplicate steps.
3) Check for broken links
4) Check for old screenshots (both in auth0's dashboard/product and on referenced third-party sites)
5) Ensure that the code in the seed project that you download functions as expected
6) Check for outdated dependancies (both auth0 dependancies and third-party i.e. node modules, nuget packages, gems, etc.)
