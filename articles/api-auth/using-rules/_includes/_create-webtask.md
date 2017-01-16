Create the Webtask. You will need to set the following static metadata fields for the Webtask:

* `wt-compiler = auth0-ext-compilers/${compiler}`
* `auth0-extension = runtime`
* `auth0-extension-name = ${grant}`
* `auth0-extension-secret = {random_secret}`

The same `{random_secret}` value provided to the `auth0-extension-secret` metadata property must also be provided to the webtask code as an `auth0-extension-secret` secret parameter. This prevents unauthorized calls to this webtask. A secret may be conveniently created using `openssl` tool if your platform has it available:

```
SECRET=$(openssl rand 32 -base64) && \
wt create myrule.js \
  --meta wt-compiler=auth0-ext-compilers/${compiler} \
  --meta auth0-extension=runtime \
  --meta auth0-extension-name=${grant} \
  --meta auth0-extension-secret=$SECRET \
  --secret auth0-extension-secret=$SECRET
```

::: panel-warning Troubleshooting
If you have more than one webtask profiles, make sure that your webtask is created using your Auth0 tenant's profile. The URL of your webtask should be like `https://${account.tenant}.us.webtask.io/myrule`. To ensure that this is the case append the following at the `wt create` command: `-p ${account.tenant}-default`. This should match the profile name you used when you [installed the Webtask CLI for your tenant](${manage_url}/#/account/webtasks). If the webtask is created under another profile then you will get an `Unauthorized extensibility point` error, when you test your newly created webtask.
:::
