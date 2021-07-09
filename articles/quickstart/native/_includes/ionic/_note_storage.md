<!--markdownlint-disable MD041 -->

:::note
`localStorage` should be considered **transient** in a Capacitor app, as the operating system may recover disk space from `localStorage` if it is running low. Please read the [guidance on storage in the Capacitor docs](https://capacitorjs.com/docs/guides/storage#why-cant-i-just-use-localstorage-or-indexeddb).

The underlying SDK has the ability to use a custom cache implementation to store tokens, if you have a requirement to use a more secure and persistent storage mechanism.

**Note** that we recommend against using [Capacitor's Storage plugin](https://capacitorjs.com/docs/apis/storage) to store tokens, as this is backed by [UserDefaults](https://developer.apple.com/documentation/foundation/userdefaults) and [SharedPreferences](https://developer.android.com/reference/android/content/SharedPreferences) on iOS and Android respectively. Data stored using these APIs is not encrypted, not secure, and could also be synced to the cloud.
:::