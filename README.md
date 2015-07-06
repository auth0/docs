This is the repository for the Auth0 documentation.


* Always use absolute links
* Do not hard code links to auth0 sites like `docs.auth0.com`, `manage.auth0.com`, etc. Use variables instead such as `@@uiUrl@@`
* Do not store images in external locations like Dropbox, CloudUp, or the Auth0 CDN. Link to images in this repo using `![](/media/folder/image_name.png)`. The image will get automatically uploaded to the CDN and the link will be transformed.
* Try to keep images no more than 750 pixels wide


## Test Procedures
When testing a document or tutorial below are several areas to look for.

1. Ensure that the code in the tutorials is correct and functions as expected
1. Ensure that the steps (1..n) are in an order that makes sense and that there are no missing or duplicate steps.
1. Check for broken links
1. Check for old screenshots (both in auth0's dashboard/product and on referenced third-party sites)
1. Ensure that the code in the seed project that you download functions as expected
1. Check for outdated dependancies (both auth0 dependancies and third-party i.e. node modules, nuget packages, gems, etc.)

## Quickstarts
All quickstart data now comes directly from the docs API at `/meta/quickstart`. This means that the quickstart on docs and manage will both consume the same datasource and will always be up to date. To add a new quickstart you simply need to add the markdown document in the appropriate folder: [server-apis](/articles/server-apids), [server-platforms](/articles/server-platforms), [native-platforms](/articles/native-platforms), or [client-platforms](/articles/client-platforms). The only requirement is that you need to specify the correct front matter.

For all quickstart docs, provide the following:

```yaml
---
title: Document Title
name: Quickstart Name
image: //cdn.auth0.com/path/to/icon.png
thirdParty: true|false  # For server apis only
hybrid: true|false # For native platforms only
snippets:
  dependancies: folder/dependancies.html
  setup: folder/app.js
  use: folder/login.js
---
```

For each quickstart you must specify the snippets and create the associated snippet file in the `/snippets` folder. You must provide all three snippets for each quickstart: `dependancies`, `setup`, and `use`. To include the snippet in the quickstart document simply reference it:

```md
@@snippet(meta.snippets.use)@@
```

After you publish the doc update, the new quickstart will automatically appear on both docs and manage.

Additionally, the quickstart configuration is also in this repository here: [quickstart.yml](/quickstart.yml).
