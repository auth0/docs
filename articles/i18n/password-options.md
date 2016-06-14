## Password Options Translation

You can customize the translation of the following Lock password features in your own code:

* Password Strength
* Password History
* Change Password widget

To customize any of these features, you must include the most recent version of the change password widget library:

`<script src="https://cdn.auth0.com/js/change-password-1.1.min.js"></script>`

To translate the text any of the Lock password features, include the following code, replacing all strings with text in the desired language:

### Password Strength

```js
dict: {
    passwordStrength: {
      containsAtLeast: "Contain at least %d of the following %d types of characters:",
      identicalChars: "No more than %d identical characters in a row (e.g., \"%s\" not allowed)",
      nonEmpty: "Non-empty password required",
      numbers: "Numbers (i.e. 0-9)",
      lengthAtLeast: "At least %d characters in length",
      lowerCase: "Lower case letters (a-z)",
      shouldContain: "Should contain:",
      specialCharacters: "Special characters (e.g. !@#$%^&*)",
      upperCase: "Upper case letters (A-Z)"
    }
}
```

### Password History

```js
dict: {
  passwordHistoryError: "Password has previously been used"
}
```

### Change Password widget

```js
dict: {
    passwordPlaceholder: "your new password",
    passwordConfirmationPlaceholder: "confirm your new password",
    passwordConfirmationMatchError: "Please ensure the password and the confirmation are the same.",
    successMessage: "Your password has been reset successfully.",
    configurationError: "An error ocurred. There appears to be a misconfiguration in the form.",
    networkError: "The server cannot be reached, there is a problem with the network.",
    timeoutError: "The server cannot be reached, please try again.",
    serverError: "There was an error processing the password reset.",
    headerText: "Enter a new password for<br />{email}",
    title: "Change Password",
    weakPasswordError: "Password is too weak."
}
```