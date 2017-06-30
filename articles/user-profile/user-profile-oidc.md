# User Profiles Returned from OIDC-Compliant Pipelines

When you're using an OIDC-compliant pipeline, the user profile you receive in return may differ slightly from the Auth0 Normalized User Profile.

* `sub` [string]: unique identifier for the user

* `name` [string]: name of the user

* `given_name` [string]: the first/given name of the user

* `family_name` [string]: the surname/last name of the user

* `middle_name` [string]: the middle name of the user

* `nickname` [string]: casual name of the user that may/may not be the same as the `given_name`

* `preferred_username` [string]: identifier by which the user wishes to be referred to

* `profile` [string]: URL of the user's profile page

* `picture` [string]: URL of the user's profile picture

* `website` [string]: URL of the user's website/blog

* `email` [string]: preferred email address of the user

* `email_verified` [boolean]: `true` if user's email address is verified; else, false

* `gender` [string]: gender of the user

* `birthdate` [string]: birthday of the user

* `zoneinfo` [string]: time zone in which the user is located

* `locale` [string]: location where the user is located

* `phone_number` [string]: preferred telephone number for the user

* `phone_number_verified` [boolean]: `true` if user's phone number is verified; else, false

* `address` [JSON object]: preferred postal address of the user

* `updated_at` [number]: time when the user's profile was last updated