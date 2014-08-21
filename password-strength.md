### Password Strength

> WARNING: This is an upcoming feature that is not currently available in Auth0.

> Note: Password Strength feature is only available to database connections, as for social and enterpise connections security level is enforced by their providers.

#### Policies

Auth0 allows to customize the level of security that will be required for user passwords during signup. By default, we are offering 5 levels of security (which match [OWASP password recommendations](https://www.owasp.org/index.php/Authentication_Cheat_Sheet#Implement_Proper_Password_Strength_Controls)):

 * **none** (by default): Non-empty password (or that the password has at least 1 character in length).
 * **low**: At least 6 characters in length.
 * **fair**: At least 8 characters in length, it must contain a lower case letter, a upper case letter and a number.
 * **good**: At least 8 characters in length. Contain at least 3 of the following 4 characters: A lower case letter, an upper case letter, a number or an special character  (e.g. !@#$%^&*)
 * **excellent**: At least 10 characters in length. No more than 2 identical characters in a row (e.g., "aaa" not allowed). Contain at least 3 of the following 4 types of characters: a lower case letter, an upper case letter, number and special characters (e.g. !@#$%^&*).


#### Changing your policy

In order to change which policy should be used, go to [Database connections](https://app.auth0.com/#/connections/database) and in the connection you want to apply the policy click on the `Security` button. You will see the following panel where you can select the required level of security:

![Password Strength Panel in Auth0](https://i.cloudup.com/jH0kabJPoi.png)

After doing that, next time a user signs up or changes their password it will be prompted to follow the guidelines. In case their password does not match the required criteria, the password will be rejected by Auth0 and they will be asked to pick another password that complies with the requirements.
