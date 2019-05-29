### Remove the oidcConformant parameter

When the `oidcConformant` flag was set to true, Lock 10 used [Cross Origin Authentication](/cross-origin-authentication), and did not use the '/usernamepassword/login' and '/ssodata' endpoints.

Given Lock 11 always uses Cross Origin Authentication and does not use the '/ssodata' endpoint, this flag is not longer needed. If specified, it will be ignored.
