---
description: Describes how to create an enrollment ticket from api
---

## Create an enrollment ticket

If you don't want that auth0 sent an email containing the link to enroll device new device for a particular user, you could use the following API [Create an enrollment ticket](/api/management/v2#!/Guardian/post_ticket).

To use this api, it is necessary to know the `user_id` for the user that is about to be enrolled, to do this you may use [List or search users](/api/management/v2#!/Users/#Get_users).

The response of this api will contain two properties, `ticket_id` and` ticket_url`. If you want, you can mail the content of `ticket_url` this link will start the enrollment process for `user_id`.

On the other hand, it is possible to use `ticket_id` to initialize from your app using our client library [auth0-guardian.js](https://github.com/auth0/auth0-guardian.js).

## Further reading

* [Restricting user-initiated enrollments](/multifactor-authentication/administrator/guardian-enrollment-email#restricting-user-initiated-enrollments)

