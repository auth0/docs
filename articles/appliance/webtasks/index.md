---
url: /appliance/webtasks
---

# Auth0 Appliance: Webtasks

Beginning with Appliance Build 7247, you may use use the `auth0-sandbox` stage to run your custom code. The `auth0-sandbox` uses the Appliance's version of  [Webtasks](http://webtask.io/), which executes a snippet of custom code via an HTTP call without requiring you to host it yourself.

## Installation

Webtasks will be installed using [Docker](https://www.docker.com/) on each node of the Appliance cluster.

The Webtask service will then be accessible via an API located at https://webtask.com (please note that this URL may be overwritten). On each node, this URL resolves to 127.0.0.1 to avoid unnecessary roundtrips when executing Rules or Custom Database scripts.

**Note:** The `auth0-sandbox` is only available for installations running Ubuntu 14.04.
