<!--markdownlint-disable MD041 -->

:::warning
To persist authentication after closing and reopening the application, you may want to set `cacheLocation` to `localstorage` when configuring the SDK, but please be aware of [the risks of storing tokens in localstorage](https://auth0.com/docs/libraries/auth0-single-page-app-sdk#change-storage-options). Also, localstorage should be treated as **transient** in Capacitor app as the data might be recovered unexpectedly in certain circumstances. Please read the [guidance on storage in the Capacitor docs](https://capacitorjs.com/docs/guides/storage#why-cant-i-just-use-localstorage-or-indexeddb).

Additionally, the SDK has the ability to [use a custom cache implementation](https://github.com/auth0/auth0-spa-js/blob/master/EXAMPLES.md#creating-a-custom-cache) to store tokens, if you have a requirement to use a more secure and persistent storage mechanism.

**Note** that we recommend **against** using [Capacitor's Storage plugin](https://capacitorjs.com/docs/apis/storage) to store tokens, as this is backed by [UserDefaults](https://developer.apple.com/documentation/foundation/userdefaults) and [SharedPreferences](https://developer.android.com/reference/android/content/SharedPreferences) on iOS and Android respectively. Data stored using these APIs is not encrypted, not secure, and could also be synced to the cloud.
:::
