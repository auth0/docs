# Contributing to Auth0 Documentation

:+1::tada: First off, thanks for taking the time to contribute! :tada::+1:

The following is a set of guidelines for contributing to the Auth0 documentation. These are just guidelines, not rules, use your best judgment and feel free to propose changes to this document in a pull request.

#### Table Of Contents

[General Guidelines](#general-guidelines)

[Reusing Content](#reusing-content)

[Markdown](#markdown)
  * [Headings](#headings)
  * [Warning banner](#warning-banner)
  * [Panels](#panels)
  * [HTTP Request Snippets](#http-request-snippets)
  * [Escaping Strings](#escaping-strings)
  * [Screenshots](#screenshots)
  * [Front Matter](#front-matter)

[Test Procedures](#text-procedures)

[Review Apps](#review-apps)

[Quickstarts](#quickstarts)
  * [Creating Quickstarts](#creating-quickstarts)
  * [Quickstart Guidelines](#quickstart-guidelines)
  * [Seed Projects](#seed-projects)

[Updates Feed](#updates-feed)

[API](#api)

[Document Front-matter](#document-front-matter)

[Document Variables](#document-variables)
  * [Common Variables](#common-variables)
  * [User Specific Variables](#user-specific-variables)




## General Guidelines
* Read and follow the [Style Guide](STYLEGUIDE.md).
* Consult the [Words](WORDS.md) document for Auth0 specific spellings and definitions.
* Always use relative URLs for internal `auth0.com/docs` links. For example, if the absolute path to the document is `https://auth0.com/docs/identityproviders`, use `/identityproviders`. These links will be correctly formatted in the build process.
* Do not hard code links to Auth0 sites like `docs.auth0.com` or `manage.auth0.com`. Instead, use [Parameter Aliases](#parameter-aliases), such as `${uiUrl}`.
* Name files with all lowercase using dashes (-) to separate words. If using a date in the file name, it should be in the format YYYY-MM-DD. For example, `this-is-my-file.md` or `this-is-a-title-2015-10-01.md`.
* Do not store images in external locations like Dropbox, CloudUp, or the Auth0 CDN. Link to images in this repo using a relative path `![](/media/folder/image-name.png)`. The image will be uploaded to the CDN and the link will be formatted during the build process.
* Keep images to no more than 750 pixels wide.
* Screenshots of the Auth0 dashboard including the browser window with dropshadow can be up to 900 pixels wide to maintain legibility.
* Run all images through [TinyPNG](https://tinypng.com/).

## Reusing content
To avoid duplication of content, you can create document fragments to be referenced from other documents. The process of including another document is shown below.

First, create your fragment document. The convention is to name fragments with an underscore, like: `_mydocument.md`.

After you create your markdown document, you can reference it in another document with a relative path:

```
<%= include('../_mydocument.md') %>
```

Additionally, you can send variables to the included document:

```
<%= include('../_mydocument.md', { key: 'value', something: true }) %>
```

## Markdown
Markdown on this site conforms to the [CommonMark](http://commonmark.org/) spec. Additionally, there are a few custom markdown features available as described below.

### Headings
One common mistake with formatting of headings is to not include a space between the hashes and the text. Some markdown processors allow this, but we do not. You must put a space as shown below.

INVALID: `#My Heading`

VALID: `# My Heading`

### Warning banner
You can add a warning banner to the top of a page to notify that a page is deprecated or other similar messages.

```
::: warning-banner
You message here
:::
```

### Panels
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

### HTTP Request Snippets
You can add a [HAR request format](http://www.softwareishard.com/blog/har-12-spec/#request) snippet to make an example HTTP request availible in a variety of languages. This will generate a tab view showing the HTTP request in various languages.

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
    "postData" : {
      "mimeType": "application/json",
      "text" : "{ \"test\": \"foo\" }",
    },
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
* postData [object, optional] - Posted data info. See: http://www.softwareishard.com/blog/har-12-spec/#postData
* headersSize [number] - Total number of bytes from the start of the HTTP request message until (and including) the double CRLF before the body. Set to -1 if the info is not available.
* bodySize [number] - Size of the request body (POST data payload) in bytes. Set to -1 if the info is not available.
* comment [string, optional] (new in 1.2) - A comment provided by the user or the application.

#### Escaping Strings
Occasionally you will need to use strings that contain the characters that are used for template replacement. The examples of this are `${example}`, `<% example %>` and `<%= example %>`. If you try to include these in your doc or a code snippet the document will fail to render because our template engine will try to replace your variable, i.e. `example`. However, you can include these by escaping them as shown below.

Change `${example}` to `<%= "${example}" %>`.

Change `<%= example %>` to `${ "<%= example %>" }`.

Change `<% example %>` to `${ "<% example %>" }`.

### Screenshots
On Mac OS X screenshots of the Auth0 interface need to be taken with Chrome, taking into account the following:

 1. The browser cannot show any plugins, customizations, or bookmarks.
 1. The browser cannot be in incognito mode.
 1. The browser needs to be resized to the standard size. Using the below script:

  ```bash
  osascript -e 'tell application "Chrome" to set the bounds of the front window to {100, 150, 1200, 900}'
  ```
 1. Auth0 screenshots should capture the complete browser window (**Control + Shift + 4**, then press **Space**).
 1. Use color **#0099CC** for highlights.
 2. Resize image to a maximum 900px width.

 Example:

 ![Sample CDN image](https://cdn.auth0.com/docs/img/chrome-sample-screenshot.png)

#### Close-ups
The exception to showing the full browser window is for highlighting a detail as part of a tutorial, for example, to show a field requiring input.

It is often best to shrink the screenshot slightly to avoid having the image of the UI be mistaken for the actual UI.

#### Borders
For close-ups and other screenshots that do not include the browser window, apply a 1px centered border (**select all > edit > stroke**) of color **#cccccc** to keep the image from blending with the background and appearing to float.

### Front Matter
You can set various properties of articles in the front matter of the document. Each document should have the `title` and `description` properties set. You can set other variables depending on the document.

Example front matter:
```
---
title: My Document
description: This is a document
---
```

#### URLs
Document urls are by default in the same format as the forlder structure after the `articles` folder. So for example if you document is stored at `articles/my-folder/document.md`, the url would be `/docs/my-folder/document`.

If you create a folder that will have multiple articles, the best practice is to set the default document as `index.md`. However, the url must be set in that document to a friendly url. For example, if you have a document `/articles/my-folder/index.md`, you should set the url to be `/my-folder`.

URL Front Matter
```
---
url: /path/to/document
---
```

## Test Procedures
When testing a document or tutorial:

1. Ensure that the code in the tutorials is correct and functions as expected.
1. Ensure that the steps (1..n) are in an order that makes sense and that there are no missing or duplicate steps.
1. Check for broken links.
1. Check for outdated screenshots of the Auth0 dashboard or product and third-party sites.
1. Ensure that the code in the seed project download functions as expected.
1. Check for outdated dependencies, both Auth0 dependencies and third-party (i.e. node modules, nuget packages, gems, etc.).

## Review Apps
If you have access to the Auth0 Heroku account, you can create a preview release for your pull request:

1. Login to Heroku and open the `auth0-docs-content` pipeline.
2. Find the Review App for your pull request and click the **Create Review App** button.
  ![Create Review App](media/readme/create_review_app.png)
3. Once the app begins deployment, you will see the status of your PR updating. The deployment takes about 5 minutes.
  ![Requested Deployment](media/readme/requested_deployment.png)
4. Once the deployment completes, you will see the status change. You can click the link in the PR to open the preview site.
  ![Deployed](media/readme/deployed.png)

## Quickstarts

### Creating Quickstarts
All quickstart data comes directly from the docs API at `/meta/quickstart`. This means that the quickstart on docs and manage will both consume the same datasource and will always be up-to-date. To add a new quickstart, create a folder with the name of the quickstart in the appropriate folder: [server-apis](/articles/server-apis), [server-platforms](/articles/server-platforms), [native-platforms](/articles/native-platforms), or [client-platforms](/articles/client-platforms). Inside that folder you will need to create an `index.yml` file that contains the following:

```yaml
---
title: Quickstart Name
image: //cdn.auth0.com/path/to/icon.png
thirdParty: true|false  # For server apis only
hybrid: true|false # For native platforms only
snippets:
  dependencies: folder/dependencies.html
  setup: folder/app.js
  use: folder/login.js
articles:
  - 00-Intro
  - 01-Login
---
```

For each quickstart, you must specify the snippets and create the associated snippet file in the `/snippets` folder. You must provide all three snippets for each quickstart: `dependencies`, `setup`, and `use`. To include the snippet in the quickstart document simply reference it as follows:

```md
${snippet(meta.snippets.use)}
```

For each article inside a quickstart you create a markdown file for the article as well as add it to the `articles` list in the `index.yml` file.

The markdown for a quickstart article is of the normal format. You must specify the following front matter for every article:

```yaml
---
title: Title
description: The article's description
---
```

The `title` will generally be a single word like Introduction or Login as it will be contacted when displayed.

After you publish the doc update, the new quickstart will automatically appear on both docs and manage.

### Quickstart Guidelines
Each framework will have a set of articles that comprise the quickstarts. The set of articles each framework will have depends on the function of each. Below is an outline of the documentats that should be created for each framework.


#### Library References
Each library that we publish should have appropriate reference documentation. There will be two kinds of reference documentation for each library. The first is automatically generated. Each library should generate reference docs using a tool like jsDocs on every build/release. This will ensure consistent and up to date documentation.


Additionally, many libraries may also need manual documentation showing more sophisticated scenarios. Certainly, Auth0.js and Lock will need significant manual documentation. Other libraries will as needed.

#### Quickstarts
Each framework will have a set of articles that comprise the quickstarts. The set of articles each framework will have depends on the function of each. Below is an outline of the documentats that should be created for each framework.


##### Native
0. Intro - Introduction and summary of what the quickstart is about and a Table of Contents
1. Login - Shows how to create an auth0 application, add the login widget to your code, setup everything, and perform a login.
2. Login with Custom UI - Using head-less library to do login without Lock
3. Session Handling - How to store tokens, refresh tokens, and logout
4. User Profile - How to access the user profile from within the app. The core concepts of this are how to retrieve profile data as well as any claims that are present in the token.
5. Linking Accounts - How to link two accounts using both the lock widget or using the API manually.
6. Rules - Using rules to change what is in the token. This document is likely shared with all quickstarts[a].
7. Authorization - How to pull scope or other access control claims from the token and use those claims to authorize a user to perform certain actions in the application.[b]
8. Calling Your API - How to take the access token from
9. MFA - how to add MFA to your app. This should probably be a single document that is shared with all native apps[c].
10. Customizing Lock - Document explaining the basics of how to custom lock. There are full documents about this as well that show the complete details.

##### Web
0. Intro - Introduction and summary of what the quickstart is about and a Table of Contents
1. Login - Shows hot to create an auth0 application, add the login widget to your code, setup everything, and perform a login.
2. Login with Custom UI - Using auth0.js to build a custom login without Lock.
3. Session Handling - How to store tokens, how to handle sessions (serialization, etc.), and logout
4. User Profile - How to access the user profile from within the app. The core concepts of this are how to retrieve profile data as well as any claims that are present in the token.
5. Linking Accounts - How to link two accounts using both the lock widget or using the API manually.
6. Rules - Using rules to change what is in the token. This document is likely shared with all quickstarts.
7. Authorization - How to pull scope or other access control claims from the token and use those claims to authorize a user to perform certain actions in the application.
8. Multifactor Authentication - how to add MFA to your app. This should probably be a single document that is shared with all native apps.
9. Customizing Lock - Document explaining the basics of how to custom lock. There are full documents about this as well that show the complete details.


##### SPA
0. Intro - Introduction and summary of what the quickstart is about and a Table of Contents
1. Login - Shows hot to create an auth0 application, add the login widget to your code, setup everything, and perform a login.
2. Login with Custom UI - Using auth0.js to build a custom login without Lock.
3. Session Handling - How to store tokens and logout
4. User Profile - How to access the user profile from within the app. The core concepts of this are how to retrieve profile data as well as any claims that are present in the token.
5. Linking Accounts - How to link two accounts using both the lock widget or using the API manually.
6. Rules - Using rules to change what is in the token. This document is likely shared with all quickstarts.
7. Authorization - How to pull scope or other access control claims from the token and use those claims to authorize a user to perform certain actions in the application. This section will include information on how to use rules and authorization together.
8. Calling Your API - How to take the access token from
9. MFA - how to add MFA to your app. This should probably be a single document that is shared with all native apps.
10. Customizing Lock - Document explaining the basics of how to customize lock. There are full documents about this as well that show the complete details.


##### API/Services
1. Authentication - How to authenticate a user to call an API
2. Authorization - How to perform authorization in a API

#### Libraries
As appropriate every framework/language should have libraries to help with common functions. THese libraries will include things like:

* Management API Libraries
* Authentication API Libraries
* Authentication Middlewares
* Helpers Libraries

We want to make authentication and authorization as easy as possible for our developers. These libraries are a critical part of that. However, libraries must not wrap functionality of the Lock widgets. We iterate on our Lock widgets too frequently to keep wrappers up to date. We can provide helpers that make Lock easier to include in an app for a particular framework, but these should only expose the core Lock functionality directly, never wrap or abstract it.

#### Samples
Each seed project will have a corresponding sample (seed project). The idea of a seed project is that a user can download this and everything is setup and ready for them to run.

Each sample for a quickstart should have its own repository in github in the github.com/auth0-samples organization. The structure of the repository is as follows:

```text
/README.md
/LICENSE
/00-Start
/01-Login
/02-User-Profile
/03-etc
/04-etc
```

In this way, each section of the quickstart has a sample showing the appropriate step. The sample in the numbered folder should exactly match the completed code of the tutorial. The 00 step is the blank empty project. The empty project would typically start with the standard “File->New” project for that particular framework. This means that anyone who is familiar with the framework will understand the starting point.

##### Sample README’s
The README for each sample folder should be written to reflect the objectives of the sample and should also show some important code snippets. The goal is to give the reader context in a quick and concise way while outlining exactly what learning outcomes can be expected. It’s important to make content within each README specific to the subject sample.

* **Example**: 02-User-Profile
* **Title**: “User Profile”
* **Body**: “User information can be stored under user_metadata for any Auth0 user. You may choose to include this data in the user’s JWT or you can simply access it from the user’s profile object returned by Auth0. Many applications will require functionality that enables users to update their own profile information, and this can be done through Auth0’s Management API.

This sample demonstrates how to retrieve an Auth0 user’s profile and how to update it via the Management API. After following the steps outlined here, you will be able to retrieve, set, and update a user profile.”


* Add link to quickstart in README


##### Important Snippets:
1. Installation
2. Retrieving the user’s profile
3. Setting the user’s profile
4. Updating the user’s profile


#### Continuous Integration
Each sample repo should have appropriate CI setup. You should use the appropriate CI system for the sample. Typically this is Travis CI. The CI system does not need to have extensive tests, but should simply ensure that the project downloads dependencies and builds correctly. If possible we should test to make sure there are no build warnings either.


In the case of things like iOS and Android samples, we should build with multiple version of Android/Xcode, etc. You can see an example here: https://travis-ci.org/auth0/Auth0.swift
1. No need to write code or specialized guide for mobile
2. We don't have a lot of stuff finished to be doing this one in mobile.
3. No need to write code or specialized guide for mobile until we allow users to enroll mfa from mobile apps. Currently is web only

### Seed Projects
Each quickstart should have a seed project. The seed projects are hosted in github in the `auth0-samples` organization. In order to add a seed project to a quickstart simply use the `_package` include.

The seed project packager service replaces placeholder configuration values with the values of the user's real application. This means the sample is ready to use without additional configuration. The strings that get set are shown below.

| String | Description |
| :------| :-----------|
| `AUTH0_CLIENT_ID` | This sets the client ID of the currently selected application. |
| `AUTH0_CLIENT_SECRET` | This sets the client secret of the currently selected application. |
| `AUTH0_DOMAIN` | This sets the domain of Auth0 the current application is using. i.e. `foo.auth0.com` or `foo.eu.auth0.com` |
| `AUTH0_CALLBACK_URL` | This sets the callback url for the application. |
| `MOBILE_CUSTOM_SCHEME` | This a unique ID for mobile apps. The string is `a0` + the value of the client ID. |
| `RANDOM_STRING_64` | This is a random string. Typically used for things like encryption keys, etc. For security reasons we set this with a reasonable default so if end-users forget to change them, they wont all be something like `YOUR_ENCRYPTION_KEY`. |

There are four types of packaging that can happen with this service.

1. `server` - This creates a `.env` file in the sample project with the configuration values set. The output file will contain the following.
  ```
  AUTH0_CLIENT_ID=VALUE
  AUTH0_CLIENT_SECRET=VALUE
  AUTH0_DOMAIN=VALUE
  AUTH0_CALLBACK_URL=VALUE
  ```
2. `js` - This creates a `auth0-variables.js` file in the sample project with the configuration values set (except for client secret). The output file will contain the following.
  ```
  var JS_CLIENT_ID='VALUE';
  var JS_CALLBACK_URL='VALUE';
  var JS_DOMAIN='VALUE';
  ```
3. `replace` - This does a string replacement of any of the above configuration values in the the format `{KEY_NAME}` in the entire project. For example anywhere in the config you want to use the real client id simple add `{CLIENT_ID}`. This is the most flexible option as you can use this anywhere in the sample project.
4. `none` - This doesn't do any replacement or setting of variables. It simply bundles the sample for download.

```
<%= include('../../_includes/_package', {
  githubUrl: 'https://github.com/auth0-samples/sample-project',
  pkgRepo: 'node-auth0',
  pkgBranch: 'master',
  pkgPath: 'examples/nodejs-regular-webapp',
  pkgFilePath: null,
  pkgType: 'server'
}) %>
```

The follow are the values for the package configuration.


| Variable  | Description |
| :---------------------------- | :----------------------------------------- |
| `githubUrl` | The url to the github project. This will be used in the "Fork on Github" button. |
| `pkgRepo` | The name of the github repository. |
| `pkgBranch` | Optional. The branch of the repo to download from. Defaults to `master`. |
| `pkgPath` | The path where the sample is contained. This will be the folder that gets downloaded. |
| `pkgFilePath` | Optional. The path to the file to run the replacement on. i.e. the path to a config file. |
| `pkgType` | The type of processing to perform on the page. Valid options are `server`, `js`, `replace`, and `none`. See above. |

## Updates Feed
Publishing content updates is easy. Just create a yml file in the `/updates` folder in the format `YYYY-MM-DD.yml`. The document should be in the following format. There are three sections of content: added, changed, and fixed. If you are releasing a new thing (such as a new tutorial, document, or new version of an SDK) put it under `added`. Otherwise use `changed` or `fixed`.

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

To request a document in embedded format (i.e. no template html) to embed externally, append `?e=1` to any url.

To request a document in the framed format (i.e. no header, footer, or navigation) to use in a window popup or an iframe, append `?framed=1` to any url.

To request content in JSON or JSONP format, pass the header `Accept: 'application/json'` and optionally specify a ``?callback=foo` query parameter for JSONP.

You can also request the document metadata be included in the JSON or JSONP responses by appending `?m=1` to the query.

## Code snippets
Code snippets are available both through the API and for use in markdown.

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

Use in markdown:

```md
${snippet('{hash}')}
```

### Connections
Connections are available both through the API and for use in markdown.

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

## Document Front-matter

- `sitemap`: (Boolean) Indicates if the document will be indexed into `sitemap.xml`. Defaults to `true`.
- `public`: (Boolean) Indicates if the document will be rendered through a public url or in the sitemap. The document will still be available from the API. Defaults to `true`.
- `description`: Every browsable document requires a description of up to 2 complete sentences. Please add a description to all new docs and any existing doc that you are working on.


## Document Variables
When writing docs you can use the following variables instead of hard-coding these values. You can use `${variableName}` within any markdown document to reference the value.

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
| `browser`       | Displays a browser window with Lock. | |
| `lockSDK`       | Displays a browser window with Lock and a dropdown with the options to trigger login. | |


### User Specific Variables

| Variable  | Description | Default Value |
| :--------------------- | :------------------------------------------------- | :------------------------------------- |
| `account.appName`      | The name of the current Auth0 app.                 | `YOUR_APP_NAME`                        |
| `account.tenant`       | The name of the current Auth0 tenant.              | `YOUR_TENANT`                          |
| `account.namespace`    | The name of the current Auth0 namespace.           | `YOUR_NAMESPACE`                       |
| `account.clientId`     | The Client ID of the current Auth0 app.            | `YOUR_CLIENT_ID`                       |
| `account.clientSecret` | The Client Secret of the current Auth0 app.        | `YOUR_CLIENT_SECRET`                   |
| `account.callback`     | The first callback URL of the current Auth0 app.   | `http://YOUR_APP.auth0.com/callback`   |
