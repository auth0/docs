When enabled, the system will disallow passwords that are part of the password dictionary, which includes a list of the [10,000 most common passwords](https://github.com/danielmiessler/SecLists/blob/master/Passwords/Common-Credentials/10k-most-common.txt). You may also customize the dictionary with your own entries.

Properties include:

- `enable` (boolean): Whether or not to enable password dictionary.
- `dictionary` (array (string)): Custom entries that you would like to add to the password dictionary for this connection. Each entry may contain a maximum of 50 characters. We use case-insensitive comparison. Maximum: 200.