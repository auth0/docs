# Verify the integrity of an update package

To avoid corruption in the transmission or storage of a package, every downloaded file is provided with a SHA-1 checksum.

### Linux and OS X

To verify the integrity of a file, use the `shasum` command with the following syntax:

```
shasum file
```

The output of this command is the SHA-1 checksum of the downloaded package. Compare the number displayed by the shasum command with the shasum provided in the instructions.

### Windows

A shasum tool for Windows is available at:

[Microsoft File Checksum Integrity Verifier](http://www.microsoft.com/en-us/download/details.aspx?id=11533)

To verify the integrity of a file, use the `fciv.exe` command with the `-sha1` option:

```
fciv.exe -sha1 file
```

where _xxxx_ is the build number.

__Note:__ The `-sha1` option must be included since `fciv.exe` uses md5 by default. 

More information is available at [How to compute the MD5 or SHA-1 cryptographic hash values for a file](http://support2.microsoft.com/kb/889768).
