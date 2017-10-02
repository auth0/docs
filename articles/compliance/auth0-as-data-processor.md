---
title:
description:
---
# Auth0 as a Data Processor

This document lists the types of data handled by Auth0, as well as the responsibilities of Auth0 as a data processor vs. the responsibilities of the customer as the data controllers.

## Roles

Auth0 customers are **data controllers**. Auth0 is a **data processor**.

## Categories of Personal Data Handled by Auth0

The following are the categories of personal data handled by Auth0, including examples of each. This is **not** an exhaustive list.

| Data Category | Examples of Data |
| - | - |
| Customer/End User Data | User Profiles, User Metadata, User Activity Logs |
| Customer Data | Marketing Form Data, Webinar Signup Details, Email Addresses, Auth0 Trial Signups, Dashboard Administrator Details |
| Auth0 Employees | Human Resources Records, Payroll Records |

## Customer Responsibilities

Ultimately, the customer is responsible for GDPR compliance, which mostly consists of operational procedures and documentation.

More specifically, the customer is responsible for:

* End-user notification, consent, and withdrawal of consent
* Deciding what data they expose to Auth0
* Deciding what connections (where end user data and passwords reside) to use
* Signing up and, if necessary, creating new users
* Ensuring their users meet the age requirements and obtaining the appropriate consent if necessary (such as parental consent for children)
* Implementing the mechanisms necessary for their end users to retrieve, review, correct, or remove personal data
* Deleting user data after receiving right-to-be-forgotten requests
* Providing data in standardized formats
* Responding to their end users' privacy-related requests (DSAR)
* Responding to communications from the European Union Data Privacy Authorities
* Data breach notifications sent to supervisory authorities and end users (Auth0 will assist the customer and provide the necessary information if we are involved)
* Selecting an EU tenant when setting up their Auth0 tenants

The customer is the party that's responsible for the security of their data. Auth0 has no knowledge of how the customer processes data, configures their applications, and so on.

## Auth0 Responsibilities

Auth0 is responsible for:

* Following the data processor's instructions as explicated in the MSA and DPA (for enterprise customers) or Terms of Service (for self-service customers)
* Notifying the customer if it receives requests from the customer's end users exercising their GDPR rights as subjects for data access, erasure, and so on
* Notifying the customer if it receives requests from EU Data Privacy Authorities (unless prohibited by law enforcement)
* Notifying the customer if it becomes aware of a confirmed security breach
* Notifying the customer if any of its subprocessors notify Auth0 about a confirmed data breach that impacts Auth0 customer data (unless prohibited by law enforcement)
* Providing a privacy policy, terms of service, security statement, data protection agreement, and so on, to provide info on its policies and practices

* Providing information about its data processing, so that customer has info it needs to process data lawfully
* Defining its services and features, how data is processed, and the rights and obligations of customers

* Providing the means to enable customers to retrieve, review, correct, or delete customer data via the Auth0 Dashboard and the Auth0 Management API
* Providing a mechanism for customers to display consent terms and a consent agreement checkbox on the Lock widget. Customers can also design custom signup and login forms if more elaborate consent schemes are needed