---
url: /connector
classes: topic-page
title: Active Directory/LDAP Connector
description: Explains what the connector is and links to resources to learn more about it.
---

<div class="topic-page-header">
  <div data-name="example" class="topic-page-badge"></div>
  <h1>Active Directory/LDAP Connector</h1>
  <p>
    Auth0 integrates with Active Directory/LDAP through the Active Directory/LDAP Connector that you install in your network.
  </p>
</div>

## Planning & Installing

<%= include('../_includes/_topic-links', { links: [
  'connector/overview',
  'connector/prerequisites',
  'connector/install',
  'connector/install-other-platforms',
  'connector/update',
  'connector/test-dc'
] }) %>

## Configuration

<%= include('../_includes/_topic-links', { links: [
  'connector/modify',
  'connector/kerberos',
  'connector/client-certificates',
  'connector/considerations-non-ad',
  'connector/high-availability'
] }) %>

## Monitoring & Troubleshooting

<%= include('../_includes/_topic-links', { links: [
  'connector/scom-monitoring',
  'extensions/adldap-connector',
  'connector/troubleshooting'
] }) %>
