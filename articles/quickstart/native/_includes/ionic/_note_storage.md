<!--markdownlint-disable MD041 -->

:::warning
To persist authentication after closing and reopening the application, you may want to set `cacheLocation` to `localstorage` when configuring the SDK, but please be aware of <a href="https://auth0.com/docs/libraries/auth0-single-page-app-sdk#change-storage-options" target="_blank" rel="noreferrer">the risks of storing tokens in localstorage</a>. Also, localstorage should be treated as **transient** in Capacitor app as the data might be recovered unexpectedly in certain circumstances. Please read the <a href="https://capacitorjs.com/docs/guides/storage#why-cant-i-just-use-localstorage-or-indexeddb" target="_blank" rel="noreferrer">guidance on storage in the Capacitor docs</a>.

Additionally, the SDK has the ability to <a href="https://github.com/auth0/auth0-spa-js/blob/master/EXAMPLES.md#creating-a-custom-cache" target="_blank" rel="noreferrer">use a custom cache implementation</a> to store tokens, if you have a requirement to use a more secure and persistent storage mechanism.

**Note** that we recommend **against** using <a href="https://capacitorjs.com/docs/apis/storage" target="_blank" rel="noreferrer">Capacitors Storage plugin</a> to store tokens, as this is backed by <a href="https://developer.apple.com/documentation/foundation/userdefaults" target="_blank" rel="noreferrer">UserDefaults</a> and <a href="https://developer.android.com/reference/android/content/SharedPreferences" target="_blank" rel="noreferrer">SharedPreferences</a> on iOS and Android respectively. Data stored using these APIs is not encrypted, not secure, and could also be synced to the cloud.
:::
