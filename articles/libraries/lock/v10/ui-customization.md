# Customizing the Look and Feel of Lock 10
There are a few available JavaScript options for customizing the look and feel of Lock. The UI customization options are a work in progress - we expect to be adding more as we go.

## JavaScript Options

### Theming Options
There are a couple of theming options currently available. You can read about them in more detail in the [Theming section](/libraries/lock/v10/customization#theming-options) of the Customization page. `logo` allows you to choose a custom logo image file, and `primaryColor` allows you to alter the main color of the Lock. Both of these options are namespaced under the `theme` option.

### Customizing Text
There is also a way to customize the text in your Lock. Again, more detail can be found in the [languageDictionary](https://auth0.com/docs/libraries/lock/v10/customization#languagedictionary-object-) section of the Customization document. The option `languageDictionary` allows you to alter any of the text displayed on your Lock, replacing it with whatever you need it to say.

## Overriding CSS
If you intend to override CSS to further style your Lock, we recommend that you use a specific patch version of Lock rather than a major or minor version, so that you limit the amount of unexpected results that may occur when you alter the styles, and then another patch is deployed that might cause unexpected behavior in your UI due to the changes. 

If you have specific theming options that you would like to see added, let us know. We are working on improving the available customization options through JavaScript, and this list will be updated as new options are added.
