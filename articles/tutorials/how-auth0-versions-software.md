---
title: How Auth0 versioning works?
---

# Versioning

We believe versioning is a crucial part of our offering. By providing a consistent versioning scheme for our products we are able to help our users manage and predict how our changes will impact usage.

## Semantic versioning

> This scheme is used in [Auth0 Lock](https://github.com/auth0/lock), [Auth0 AD Connector](https://github.com/auth0/ad-ldap-connector), [Auth0.js](https://github.com/auth0/auth0.js) and SDKs.

[Semantic versioning](http://semver.org) (also known as semver) is a versioning strategy whose main feature is making breaking changes discoverable. A version is composed of 3 numbers separated by dots: `{major}.{minor}.{patch}`. For instance, `2.12.5`, `0.1.0` and `10.5.35` are valid semver numbers. 

- The first number represents a **major change**: **the library API has changed in a non-backwards compatible way**. When the major part of a version is bumped, the public API of that library has changed. For example, code and functionality previously marked as deprecated is removed from the code base.
- The second number represents a **minor change**: **the library API has new functionality added or marked as deprecated while keeping backward compatibility**. The new minor version is expected to be safe for use and we encourage customers to update. However, as it is impossible to know every way customers use a component, there is always a chance that changes might have impact on the current usage of the component. Therefore, we recommend verifying and testing before performing an update.
- The third number, represents **a patch change**: **A bug has been fixed and should not have any impact on the user facing API**. This should be safe to update but testing is always encouraged.

More information about this versioning scheme can be found at [semver](http://semver.org)

### Production Usage

Auth0 provides links to our [Content Delivery Network (CDN)](http://en.wikipedia.org/wiki/Content_delivery_network) where we serve some of our libraries. The way you reference a component in your code will impact whether and when you automatically pick up changes.  For instance, Auth0 Lock can be found at the following URLs:

```js
<!-- major release -->
<script src="http://cdn.auth0.com/example/1/library.js"></script>

<!-- minor release -->
<script src="http://cdn.auth0.com/example/1.0/library.js"></script>

<!-- patch release (recommended for production) -->
<script src="http://cdn.auth0.com/example/1.0.1/library.js"></script>
```

If you link to the major release (the first script) and we release a new minor, you will get the update as soon as it is released. We encourage this practice for development environments and experimenting with Auth0. 

**When Auth0 components are deployed to production, we encourage our users to anchor to a full version and thoroughly test using that version**. Although adding new features in a backwards compatible way shouldn’t break your code, the interactions with the component outcome could be hard to predict.  Even trivial bug fixes may introduce changes in the assumptions you were making about the component which may no longer be true.

> Note about git: Each Auth0 open source component that follows semver will have a tag matching a released version in its git repository. As some of the projects use [npm](https://npmjs.com) tooling to release versions the tags will have a “v” letter as a prefix. For instance, version `5.2.3` tag will be `v5.2.3`.
