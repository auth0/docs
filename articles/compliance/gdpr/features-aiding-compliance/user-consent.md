---
title: GDPR Compliance: Conditions for Consent
description: This article discusses which Auth0 features can help customers comply with the Conditions for Consent GDPR requirements
toc: true
---
# GDPR Compliance: Conditions for Consent

According to article 7 of GDPR, you have to ask users for consent on the processing of their personal data, in a clear and easily accessible form. You also have to be able to show that the user has consented, and provide an easy way to withdraw consent at any time. 

This article explains how you can use Auth0 features to implement these requirements.

## Ask for consent

Upon signup you have to ask your users for consent. With Auth0, you can save this information at the [user metadata](/metadata). There are several available options here, depending on how you use Auth0 to authenticate your users.

::: note
Before you design your solution using `user_metadata` make sure you have reviewed the [custom fields limitations](/libraries/custom-signup#custom-fields-limitations).
:::

---

**If you use Lock and authenticate users with a database connection**, add an extra field to the signup screen using the [additionalSignUpFields Lock option](/libraries/lock/configuration#additionalsignupfields-array-). This extra field will be automatically added to the `user_metadata`.

Alternatively, you can use the [mustAcceptTerms Lock option](/libraries/lock/configuration#mustacceptterms-boolean-). This, when set to `true`, displays a checkbox alongside the terms and conditions that must be checked before signing up. The terms and conditions can be specified using the [languageDictionary option](/libraries/lock/configuration#languagedictionary-object-). Once the user accepts and signs up, save the consent information at the `user_metadata` using the [additionalSignUpFields Lock option](/libraries/lock/configuration#additionalsignupfields-array-).

---

**If you use Lock and authenticate users with social providers**, you cannot add a custom field to the signup screen, but you can redirect the user to another page where you ask for consent and then redirect back to finish the authentication transaction. Implement the redirection using [redirect rules](/rules/redirect). Once you get the user's consent and the signup process is complete, save the consent information at the `user_metadata` by calling the [Management API's Update User endpoint](/api/management/v2#!/Users/patch_users_by_id).

---

**If you use a custom signup form with a database connection**, you have to add an extra field to the signup screen in order to capture the user's consent. Afterwards, call the [Authentication API's Signup endpoint](/api/authentication#signup) in order to create the user in Auth0. At this point, you can set the consent information as part of the `user_metadata`. For a sample request, refer to [Custom Signup > Send the Form Data](/libraries/custom-signup#2-send-the-form-data).

Alternatively, if you use Auth0.js, you can use [the signup method](/libraries/auth0js#sign-up) in order to create the user in Auth0 and set the consent info as part of the `user_metadata`.

---

**If you use a custom signup form with social providers**, you have to add an extra field to the signup screen in order to capture the user's consent. Save the consent information at the `user_metadata` by calling the [Management API's Update User endpoint](/api/management/v2#!/Users/patch_users_by_id).

---

:::panel What else do I have to do?
- You must write up the notification users will see around how users' data is being used, how long data will be used, users' rights, etc. as well as customize the UI sign-up box
- You must determine if re-consent is required for your users, depending on your old terms and conditions and previous privacy certifications
:::

## Track consent

According to GDPR, you should be able to show that the user has consented to the processing of their personal data. 

With Auth0 you can save the user's consent information as part of the user_metadata. You can either save only a flag, showing if the user has consented or not, or a set of consent information and preferences (including for example, the day the user provided consent, the terms he consented to, etc). Afterwards, you can access and manipilate this information using our Management API:

- [Search for a user using their email address](/users/search#users-by-email)
- [Search for a user using their Id](/users/search#users-by-id)
- [Search for a set of users](/users/search#users)
- [Update a user's metadata](/api/management/v2#!/Users/patch_users_by_id)
- [Export a list of your users](/users/search#user-export)

:::panel Whar else do I have to do?
- Determine how you want to track consent. We recommend putting in not just the date but the correct version of terms and conditions, specifying the version, and including an array for those who will withdraw, provide and withdraw consent again.
- Choose where you want to store consent, in Auth0's database or elsewhere
:::

## Withdraw consent

The user should have the option to withdraw consent using your app. This option should be easily accessible, and clearly distinguishable. Once the users decides to withdraw their consent, you should take action. First, you have to decide how you will handle withdrawal of consent: will you delete the users or flag them as deleted?

To delete a user, use the [Delete a user endpoint](/api/management/v2#!/Users/delete_users_by_id). The response body for this endpoint is empty, so if you want to confirm that the user was successfully deleted try to [retrieve the user using their email](/users/search#users-by-email). If the endpoint returns an error, then your call to delete the user was successful.

If you don't want to completely delete the user, flag their profile as deleted at the `app_metadata` (endpoint: [Update a user](/api/management/v2#!/Users/patch_users_by_id)). Then, add a rule that will make the authentication process to fail for any user with their profile flagged as such. This way you can keep a record of deleted users in case you need to refer to this information in the future.

:::panel What else do I have to do?
- Ensure the consent withdrawal piece is granular enough
- Configure into the app the area where customers will withdraw consent
:::

<%= include('../_stepnav', {
 prev: ["Go back", "/compliance/gdpr/features-aiding-compliance"],
 navHeader: "Auth0 Features and GDPR Compliance"
}) %>