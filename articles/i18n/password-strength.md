### Translate the password strength validations.

The way to do this is described in this section.

First, include the CDN with:

```js
<script src="https://cdn.auth0.com/js/change-password-1.0.1.min.js"></script>
```

Then the way to translate the Lock password strength validations is changing these fields by validations in the language that you choose. All the strings in the snippet below should be in the desired language.
For example:

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


