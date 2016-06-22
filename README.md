# Auth0 Documentation
This is the repository for the Auth0 documentation.

## Contribution Guidelines
* Read and follow the [Style Guide](STYLEGUIDE.md).
* Consult the [Words](WORDS.md) document for Auth0 specific spellings and definitions.
* Always use absolute links from the root of the site. Note, that your links should NOT start with `/docs` or any other base path. If the site is hosted with a base like on `auth0.com/docs` the links will be corrected at runtime.
* Do not hard code links to auth0 sites like `docs.auth0.com`, `manage.auth0.com`, etc. Use  [Parameter Aliases](#parameter-aliases) instead, such as `${uiUrl}`.
* Name files with all lowercase using dashes (-) to separate words. If using a year in the file name it should be in the format YYYY-MM-DD. For example, `this-is-my-file.md` or `this-is-a-title-2015-10-01.md`.
* Do not store images in external locations like Dropbox, CloudUp, or the Auth0 CDN. Link to images in this repo using `![](/media/folder/image-name.png)`. The image will get automatically uploaded to the CDN and the link will be transformed.
* Try to keep images to no more than 750 pixels wide
* Screenshots of the Auth0 dashboard including the browser window and dropshadow can be up to 900 pixels wide to maintain legibility.
* Run all images through [TinyPNG](https://tinypng.com/).

## Contributing

### Reusing content
You can create document fragments that can be reused in other documents in order to avoid duplication of content. The process of including another document is shown below.

First, create your fragment document. The convention is to name fragments with an underscore, like: `_mydocument.md`.

After you create your markdown document, you can reference it in another document with a relative path:

```
<%= include('../_mydocument.md') %>
```

Additionally, you can send a context to the included document.

```
<%= include('../_mydocument.md', { key: 'value', something: true }) %>
```

### Markdown
Markdown on this site confirms to the [CommonMark spec](http://commonmark.org/). Additionally, there are a few special markdown features available as described below.

#### Warning banner
You can add a warning banner to the top of a page to notify that a page is deprecated or other similar messages.

```
::: warning-banner
You message here
:::
```


#### Panels
Panels can be useful to separate information from the main body of a document.

```
::: panel-primary This is a panel
Panel content
:::

::: panel-warning This is a warning
Panel content
:::

::: panel-info This is info
Panel content
:::

::: panel-danger This is a dangerous
Panel content
:::

::: panel-success This is good
Panel content
:::
```

#### HTTP Request Snippets
You can add a [HAR request format](http://www.softwareishard.com/blog/har-12-spec/#request) snippet to make an example HTTP request availible in a variety of languages. This will generate a tab view showing how to make the HTTP request in many languages.

**NOTE:** You need to set the language type to `har` for this to work. View this raw markdown document for an example.


```har
{
    "method": "GET",
    "url": "http://www.example.com/path/?param=value",
    "httpVersion": "HTTP/1.1",
    "cookies": [],
    "headers": [
      { "name" "Authorization", "value": "Bearer ABCD" }
    ],
    "queryString" : [],
    "postData" : {},
    "headersSize" : 150,
    "bodySize" : 0,
    "comment" : ""
}
```

* method [string] - Request method (GET, POST, ...).
* url [string] - Absolute URL of the request (fragments are not included).
* httpVersion [string] - Request HTTP Version.
* cookies [array] - List of cookie objects.
* headers [array] - List of header objects.
* queryString [array] - List of query parameter objects.
* postData [object, optional] - Posted data info.
* headersSize [number] - Total number of bytes from the start of the HTTP request message until (and including) the double CRLF before the body. Set to -1 if the info is not available.
* bodySize [number] - Size of the request body (POST data payload) in bytes. Set to -1 if the info is not available.
* comment [string, optional] (new in 1.2) - A comment provided by the user or the application.



### Auth0 Screenshots
On Mac OS X screenshots of the Auth0 interface need to be taken with Chrome, taking into account the following:

 1. The browser cannot show any plugins, customizations, or bookmarks
 1. The browser cannot be in incognito mode
 1. The browser needs to be resized to the standard size. Using the below script:

  ```bash
  osascript -e 'tell application "Chrome" to set the bounds of the front window to {100, 150, 1200, 900}'
  ```
 1. Screenshots should use the complete browser window (Control + Shift + 4, then press Space)
 1. Highlighting should use color #0099CC
 2. Resize to a maximum 900px width.

 Example:

 ![Sample CDN image](https://cdn.auth0.com/docs/img/chrome-sample-screenshot.png)

#### Close-ups
The exception to showing the full browser window is if you are showing a detailed instruction as part of a tutorial. i.e. "Enter text in this field" and you are showing the field.

It is often best to shrink the screenshot slightly to avoid having the image of the UI be mistaken for the actual UI.

#### Borders
For close-ups and other screenshots that do not include the browser window, apply a 1px centered border (select all > edit > stroke) of color #cccccc to keep the image from blending with the background and appearing to float.


## Test Procedures
When testing a document or tutorial below are several areas to look for.

1. Ensure that the code in the tutorials is correct and functions as expected.
1. Ensure that the steps (1..n) are in an order that makes sense and that there are no missing or duplicate steps.
1. Check for broken links.
1. Check for old screenshots (both in auth0's dashboard/product and on referenced third-party sites)
1. Ensure that the code in the seed project that you download functions as expected.
1. Check for outdated dependencies (both auth0 dependencies and third-party i.e. node modules, nuget packages, gems, etc.).

## Review Apps
If you have access to the Auth0 heroku account, you can create a preview release for you pull requests. To do so, login to Heroku and open the `auth0-docs-content` pipeline.

1. Next find the Review App for your pull request and click the "Create Review App" button.
  ![Create Review App](media/readme/create_review_app.png)
2. Once the app starts deploying you will see the status of your Pull Request updating. The deployment takes about 5 minutes.
  ![Requested Deployment](media/readme/requested_deployment.png)
3. Once the deployment has completed you will see the status change. You can click the link in the associated PR to open the preview site.
  ![Deployed](media/readme/deployed.png)

## Quickstarts
All quickstart data comes directly from the docs API at `/meta/quickstart`. This means that the quickstart on docs and manage will both consume the same datasource and will always be up to date. To add a new quickstart you simply need to add the markdown document in the appropriate folder: [server-apis](/articles/server-apis), [server-platforms](/articles/server-platforms), [native-platforms](/articles/native-platforms), or [client-platforms](/articles/client-platforms). The only requirement is that you need to specify the correct front matter.

For all quickstart docs, provide the following:

```yaml
---
title: Document Title
name: Quickstart Name
image: //cdn.auth0.com/path/to/icon.png
thirdParty: true|false  # For server apis only
hybrid: true|false # For native platforms only
snippets:
  dependencies: folder/dependencies.html
  setup: folder/app.js
  use: folder/login.js
---
```

For each quickstart you must specify the snippets and create the associated snippet file in the `/snippets` folder. You must provide all three snippets for each quickstart: `dependencies`, `setup`, and `use`. To include the snippet in the quickstart document simply reference it:

```md
${snippet(meta.snippets.use)}
```

After you publish the doc update, the new quickstart will automatically appear on both docs and manage.

Additionally, the quickstart configuration is also in this repository here: [quickstart.yml](/quickstart.yml).

## Updates Feed
Publishing content updates is fairly easy. Just create a yml file in the `/updates` folder in the format `YYYY-MM-DD.yml`. The document should be in the following format. There are three sections of content added, changed, and fixed. If you are releasing a new thing (such as a new tutorial, document, or new version of an SDK) put it here. Otherwise use changed or fixed.

```
added:
  -
    title: "Name of new thing"
    tags:
      - tag1
      - tag2
    description: |
      The description can be as long as it needs, but keep it reasonable. If you need more you should probably write a separate document. Descriptions can contain markdown such as [link](https://auth0.com) or `code snippets`.
  -
    title: "Name of update"
    tags:
      - tag1
      - tag2
    description: |
      The description can be as long as it needs, but keep it reasonable. If you need more you should probably write a separate document. Descriptions can contain markdown such as [link](https://auth0.com) or `code snippets`.
changed:
  -
    title: "Name of thing that changed or was removed"
    tags:
      - tag1
      - tag2
    description: |
      The description can be as long as it needs, but keep it reasonable. If you need more you should probably write a separate document. Descriptions can contain markdown such as [link](https://auth0.com) or `code snippets`.
fixed:
  -
    title: "Name of bug fixed"
    tags:
      - tag1
      - tag2
    description: |
      The description can be as long as it needs, but keep it reasonable. If you need more you should probably write a separate document. Descriptions can contain markdown such as [link](https://auth0.com) or `code snippets`.
```

## API

> WARNING: This API is for Auth0 internal use only. You should not rely on the docs API for anything. There is *NO SLA or support* for the document API.

All document content is accessible through the docs API as well as through regular HTML.

To request a document in embedded format (i.e. no template html) to embed externally simply append `?e=1` to any url.

To request a document in the framed format (i.e. no header, footer, or naviation) to use in a window popup or an iframe simply append `?framed=1` to any url.

To request content in JSON or JSONP format simply pass the header `Accept: 'application/json'` and optionally specify a ``?callback=foo` query parameter for JSONP.

In the JSON or JSONP responses you can also request the document metadata by appending `?m=1` to the query.

## Code snippets
Code snippets are available both through the API and to use in markdown docs.

Access via API:

GET: `/docs/meta/snippets/{hash}`
Response:
```json
{
  "title": "{title}",
  "content": "{<pre><code class="{class}">{code}</code></pre> }",
  "hash": "{hash}"
  "additional_metadata": ""
}
```

Use in markdown docs:

```md
${snippet('{hash}')}
```

## Connections
Connections are available both through the API and to use in markdown docs.

Access via API:

GET: `/docs/meta/connections`
GET: `/docs/meta/connections/{type}`
GET: `/docs/meta/connections/{type}/{connection}`
Response:
```json
{
  "title": "{title}",
  "hash": "{hash}",
  "url": "https://auth0.com/docs/path/to/doc",
  "image": "https://cdn.auth0.com/docs/path/to/image.png",
  "type": "database|social|enterprise",
  "alias": [
    "alias1"
  ]
}
```

## Documents metadata properties

- `sitemap`: (Boolean) Instructs when to skip indexation into the `sitemap.xml`. Defaults to `true`.
- `public`: (Boolean) Disables the document from being rendered through a public url or showing in the sitemap. Document still available in the APIs, etc.. Defaults to `true`.
- `description`: Every browsable document requires a description of up to 2 complete sentences. Please add a description to all new docs and any existing doc that you are working on.


## Parameter Aliases
When writing docs you can use the following variables instead of hard coding these values. Within any markdown document simply use `${variableName}` to reference the value.

### Common Variables

| Variable  | Description | Default Value |
| :---------------------------- | :----------------------------------------- | :-------------------------------------- |
| `uiURL`                       | The url to the management portal.          | `https://manage.auth0.com`              |
| `auth0js_url`                 | The url to the auth0.js CDN location.      | |
| `auth0js_url_no_scheme`       | The url to the auth0.js CDN location without the 'https:'. | |
| `auth0_angular_url`           | The url to the auth0 angular script CDN location. | |
| `auth0_angular_url_no_scheme` |  The url to the auth0 angular script in the CDN location without the 'https://'. | |
| `widget_url`                  | The url to the Lock script CDN location.   | |
| `widget_url_no_scheme`        | The url to the Lock script CDN location without the 'https:'. | |
| `lock_passwordless_url`       | The url to the Passwordless Lock script CDN location. | |


### User Specific Variables

| Variable  | Description | Default Value |
| :--------------------- | :------------------------------------------------- | :------------------------------------- |
| `account.appName`      | The name of the current Auth0 app.                 | `YOUR_APP_NAME`                        |
| `account.tenant`       | The name of the current Auth0 tenant.              | `YOUR_TENANT`                          |
| `account.namespace`    | The name of the current Auth0 namespace.           | `YOUR_NAMESPACE`                       |
| `account.clientId`     | The Client ID of the current Auth0 app.            | `YOUR_CLIENT_ID`                       |
| `account.clientSecret` | The Client Secret of the current Auth0 app.        | `YOUR_CLIENT_SECRET`                   |
| `account.callback`     | The first callback URL of the current Auth0 app.   | `http://YOUR_APP.auth0.com/callback`   |

## Issue Reporting

If you have found a bug or if you have a feature request, please report it in this repository's issues section. Please do not report security vulnerabilities on the public GitHub issue tracker. The [Responsible Disclosure Program](https://auth0.com/whitehat) details the procedure for disclosing security issues.

## Author

[Auth0](auth0.com)

## License

This project is licensed under the MIT license. See the [LICENSE](LICENSE) file for more info.
