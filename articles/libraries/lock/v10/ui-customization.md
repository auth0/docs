::: panel-info Lock Version
Heads up! This document is using the latest version of Lock (version 10). See changes from the old version in the [new features](/libraries/lock/v10/new-features) page, see a learn how to migrate from version 9 to version 10 in the [migration guide](/libraries/lock/v10/migration-guide), or see the [Lock 9 Documentation](/libraries/lock/v9) if you're looking for information about Lock 9.
:::

# Customizing the Look and Feel of Lock 10

## JavaScript Options
You can set up a variety of customizations to your Lock via the `options` parameter when you instantiate your Lock. Some of them allow you to customize your UI. The UI customization options are a work in progress - we expect to be adding more as we go. 

First, you'll define the `options` object, containing whichever options you're wanting to customize.

### Theming Options
There are a couple of theming options currently available, namespaced under the `theme` property.

#### logo {String}
The value for `logo` is an URL for an image that will be placed in the Lock's header, and defaults to Auth0's logo. It has a recommended max height of `58px` for a better user experience.

```js
var options = {
  theme: {
    logo: 'https://example.com/assets/logo.png'
  }  
};
```

#### primaryColor {String}
The `primaryColor` property defines the primary color of the Lock; all colors used in the widget will be calculated from it. This option is useful when providing a custom `logo`, to ensure all colors go well together with the `logo`'s color palette. Defaults to `#ea5323`.

```js
var options = {
  theme: {
    logo: 'https://example.com/assets/logo.png',
    primaryColor: 'green'
  }  
};
```

### Customizing Text
The `languageDictionary` option allows customization of every piece of text displayed in the Lock. Defaults to {}. See below Language Dictionary Specification for the details.

```js
var options = {
  languageDictionary: {
    emailInputPlaceholder: "something@youremail.com",
    title: "Log me in"
  },
};
```
### Instantiating Lock
Finally, you'll want to go ahead and instantiate your Lock, with the `options` object that you've defined with your custom options.

```js
// Initiating our Auth0Lock
var lock = new Auth0Lock('${account.clientId}', '${account.namespace}', options);
```

## Overriding CSS
If you intend to override CSS to further style your Lock, we recommend that you use a specific patch version of Lock rather than a major or minor version, so that you limit the amount of unexpected results that may occur when you alter the styles, and then another patch is deployed that might cause unexpected behavior in your UI due to the changes. 

## Further Information
If you're looking for more detailed information while working to customize Lock for your application, check out the [customization options](/libraries/lock/v10/customization) page or the [Lock API](/libraries/lock/v10/api) page!

If you have specific theming options that you would like to see added, let us know. We are working on improving the available customization options through JavaScript, and this list will be updated as new options are added.

