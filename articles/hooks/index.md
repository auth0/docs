---
url: /hooks
classes: topic-page
title: Hooks
description: Working with Hooks
beta: true
---

<div class="topic-page-header">
  <div data-name="example" class="topic-page-badge"></div>
  <h1>Hooks</h1>
  <p>
    Hooks allow you to extend the Auth0 platform with custom code.
  </p>
</div>

## What are Hooks?

Hooks allow you to customize the behavior of Auth0 using Node.js code that is executed against extensibility points (which are comparable to webhooks that come with a server). Hooks allow you modularity when configuring your Auth0 implementation, and extend the functionality of base Auth0 features.

### Hooks vs. Rules

Hooks will eventually replace [Rules](/rules), the current Auth0 extensibility method. Currently, you can use both Hooks and Rules, but Auth0 will implement new functionality in Hooks.

If you created your Hook early on during the beta testing period, your Webtask Editor window might not populate with the schema required to successfully use the Test Runner. If that is the case, you'll need to save the Hook's code, delete the Hook, and create a new Hook using your existing code.

## Work with Hooks

<ul class="topic-links">
  <li>
    <i class="icon icon-budicon-715"></i><a href="/hooks/overview">Overview of Hooks</a>
    <p>
      Hooks provide an easy-to-use method for extending the functionality of the base Auth0 platform.
    </p>
    <ul>
      <li>
        <i class="icon icon-budicon-695"></i><a href="/hooks/extensibility-points">Auth0 Extensibility Points</a>
      </li>
    </ul>
  </li>
  <li>
    <i class="icon icon-budicon-715"></i><a href="/hooks/dashboard">Work with Hooks in the Management Dashboard</a>
    <p>
      How to work with Hooks using the Auth0 Management Dashboard
    </p>
  </li>
  <li>
    <i class="icon icon-budicon-715"></i><a href="/hooks/cli">Work with Hooks using the Command-Line Interface</a>
    <p>
      How to work with Hooks using the Auth0 Command-Line Interface
    </p>
  </li>
</ul>

## Use the Webtask Editor

You can edit Hooks directly using the Webtask Editor. Please see the [Webtask documentation](https://webtask.io/docs/editor) for detailed information.
