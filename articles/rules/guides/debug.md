---
description: How to debug your Auth0 Rules.
toc: true
topics:
  - rules
  - extensibility
  - debug
contentType: how-to
useCase: extensibility-rules
---

# Debug Rules

You can use `console.log` in Rules code for debugging. There are several ways to see the `console.log` output.

## Try this Rule

**TRY THIS RULE** in the [Rules Editor](${manage_url}/#/rules/create) lets you run a Rule in isolation with mock **user** and **context** objects. Clicking **TRY** will run the Rule with those two objects as input, and any `console.log` output will be displayed too.

![Try this Rule](/media/articles/rules/try-rule.png)

::: note
The **TRY THIS RULE** feature functions outside a specific client context. When using this feature, you may run into issues if your Rule depends on data that would be provided when called from an actual application.
:::

## Real-time logs extension

The [Real-time Webtask Logs](/extensions/realtime-webtask-logs) extension displays all logs, in real-time, for all custom code in your account. This includes all `console.log` output and exceptions.

## Debug Rule CLI

Similar to the above, the **DEBUG RULE** button displays instructions for installing, configuring, and running the [webtask CLI](https://github.com/auth0/wt-cli) for debugging Rules. Paste these commands into a terminal to see the `console.log` output and any unhandled exceptions that occur during Rule execution.

For example:

```sh
  ~  npm install -g wt-cli
  ~  wt init --container "youraccount" --url "https://sandbox.it.auth0.com" --token "eyJhbGci...WMPGI" -p "youraccount-default-logs"
  ~  wt logs -p "youraccount-default-logs"
  [18:45:38.179Z]  INFO wt: connected to streaming logs (container=youraccount)
  [18:47:37.954Z]  INFO wt: webtask container assigned
  [18:47:38.167Z]  INFO wt: ---- checking email_verified for some-user@mail.com! ----
```

This debugging method works for Rules tried from the Dashboard and for those actually running during user authentication.