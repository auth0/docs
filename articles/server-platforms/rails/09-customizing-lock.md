---
title: Customizing Lock
description: This tutorial will show you how to customize lock widget.
---

## Ruby On Rails - Customizing Lock
In addition to a carefully-considered default user interface, Lock offers UI customization functionality.

::: panel-info System Requirements
This tutorial and seed project have been tested with the following:
* Ruby 2.3.1
* Rails 5.0.0
:::

<%= include('../../_includes/_package', {
  githubUrl: 'https://github.com/auth0-samples/auth0-rubyonrails-sample',
  pkgRepo: 'auth0-rubyonrails-sample',
  pkgBranch: 'master',
  pkgPath: '09-Customizing-Lock',
  pkgFilePath: null,
  pkgType: 'server'
}) %>

## 1. Lock options

Some UI customization can be done via the `options` parameter when creating a `Lock` instance. You can edit the Lock options in the corresponding javascript initialization code. In this tutorial, it is located in ```app/assets/javascripts/home.js.erb```.

> **NOTE:** If you're setting up your rails application from scratch, refer to [Introduction](/quickstart/webapp/rails/00-introduction).


### Theme options

You can set custom theme properties like using a different logo, or changing the primary color. Just add a `theme` property with custom values when initializing the auth0 Lock widget. See full details [here](/libraries/lock/v10/customization#theming-options).

```ruby
#app/assets/javascripts/home.js.erb
var options = {
   auth: {
		redirectUrl: '${" <%= Rails.application.secrets.auth0_callback_url %> "}',
		params: {
			scope: 'openid name email picture'
		}
        },
   theme: {
          logo: '${" <%= image_url('test-icon.png')%> "}',
          primaryColor: '#b81b1c'
        }
 };
var lock = new Auth0Lock('${" <%= Rails.application.secrets.auth0_client_id %> "}', '${" <%= Rails.application.secrets.auth0_domain %> "}', options);

function signin() {
	lock.show();
}
```

### Language Dictionary Specification

You can also customize every piece of text `Lock` needs to display. The option parameter to do this is `languageDictionary`.
See full details [here](/libraries/lock/v10/customization#languagedictionary-object-)

```ruby
#app/assets/javascripts/home.js.erb
var options = {
  auth: {
    redirectUrl: '${" <%= Rails.application.secrets.auth0_callback_url %> "}',
    params: {
	scope: 'openid name email picture'
    }
  },
 languageDictionary: {
        title: 'My Company'
 }
};
var lock = new Auth0Lock('${" <%= Rails.application.secrets.auth0_client_id %> "}', '${" <%= Rails.application.secrets.auth0_domain %> "}', options);

function signin() {
  lock.show();
}
```

### Results

This is how it looks like using custom logo, color, and title:

![Custom lock](/media/articles/server-platforms/rails/widget-custom-logo-color.png)

### 2. All done!

You have customized the Lock widget!
