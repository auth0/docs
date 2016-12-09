Create the Webtask. You will need to set the following static metadata fields for the Webtask:

* `wt-compiler = auth0-ext-compilers/${grant}`
* `auth0-extension = runtime`
* `auth0-extension-name = ${grant}`
* `auth0-extension-secret = {random_secret}`

The same `{random_secret}` value provided to the `auth0-extension-secret` metadata property must also be provided to the webtask code as an `auth0-extension-secret` secret parameter. This prevents unauthorized calls to this webtask. A secret may be conveniently created using `openssl` tool if your platform has it available:

```
SECRET=$(openssl rand 32 -base64) && \
wt create myrule.js \
  --meta wt-compiler=auth0-ext-compilers/${grant} \
  --meta auth0-extension=runtime \
  --meta auth0-extension-name=${grant} \
  --meta auth0-extension-secret=$SECRET \
  --secret auth0-extension-secret=$SECRET
```
