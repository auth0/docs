---
section: exercises
description: Auth0 digital identity labs
topics:
  - digital identity
  - OIDC
  - OpenId Connect
  - OAuth2
contentType:
    - index
---
# Auth0 Identity Labs

<i class="icon icon-budicon-529"></i> **Welcome to the home for Auth0's digital identity labs!** These exercises serve as a learning tool to be combined with our [Learn Identity video series](/videos/learn-identity). Each lab is meant to be completed once a video (or series of videos) is complete.

_A few general things to keep in mind as you work through these labs:_

**Plan to take around 1 hour or so (longer depending on your coding experience) for each lab.**

**These labs are designed to illustrate the basic concepts of digital identity, OAuth, and OpenID Connect.** The goal is to see the parameters and data that come together to create a complete authentication flow. As such, take your time and read through each section carefully. Completing the lab successfully is less important than understanding the concepts within.

**The code samples here should not be used as-is in a production app.** The code here was written for instructional purpose and simplicity. For guidance on integrating Auth0 with a new or existing app, please see the Quickstarts listed on our [documentation home page](/) (choose an application type, then the technology you're using).

Each lab will have a list of pre-requisites to complete or install. Please take note of specific version numbers as these can have an effect on how the labs work.

ℹ️ The error messages displayed in the browser and in the console can often clue you into something that is going wrong. Auth0 error pages typically include a link under the "Technical Details" header that will give you more information about what went wrong. A "SyntaxError" line in your terminal window when starting the server indicates a typo or missed line.

ℹ️ The code samples will indicate what lines to add or modify. In most cases, the order of operations (as in, when a particular line of code runs) matters greatly, so pay attention to those lines and the description above each snippet.

```js
// lab-01/begin/server.js
// 👆 That is the file you should be in for these changes.

require('dotenv').config();
// 👆 This is code that should not be changed.

// ... other required packages
// 👆 This is information to help you place the new code.

// Add the code below 👇
const session = require('cookie-session');
const { auth } = require('express-openid-connect');
// 👆 This is what should be added

// ...
// 👆 This indicates that there is other code after that should not be changed.
```

ℹ️ Terminal commands are proceeded by a `❯` character. If you're copying those commands, exclude that character and the space that follows. Exclude all lines that do not start with `❯`; those are there to show the expected output.

```text
# This line is informational; read but don't use.
❯ this line is the command to copy

This line shows sample output; read but don't use.
```

**And with that, let's get started!**

<ul class="topic-links">
  <li>
    <i class="icon icon-budicon-529"></i><a href="/identity-labs/01-web-sign-in"> Lab 1: Web Sign-In</a>
  </li>
  <li>
    <i class="icon icon-budicon-529"></i><a href="/identity-labs/02-calling-an-api"> Lab 2: Calling an API</a>
  </li>
  <li>
    <i class="icon icon-budicon-529"></i><a href="/identity-labs/03-mobile-native-app"> Lab 3: Mobile Application</a>
  </li>
  <li>
    <i class="icon icon-budicon-529"></i><a href="/identity-labs/04-single-page-app"> Lab 4: Single-Page Application</a>
  </li>
</ul>
