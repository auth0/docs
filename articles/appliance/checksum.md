# Checking the shasum of a package

To prevent transmission or storage corruption every download file is provided with a SHA-1 checksum.

To check the integrity of the file, use the following command:

### Linux and OS X

```
shasum file
```

The output of this command will be the shasum of the downloaded package. You should compare the number displayed by the shasum command with the shasum provided in the instructions.

### Windows

A shasum tool for Windows can be obtained from:

[http://www.microsoft.com/en-us/download/details.aspx?id=11533](http://www.microsoft.com/en-us/download/details.aspx?id=11533)

Usage:

```
fciv.exe -sha1 file
```

where xxxx is the build number.

You must include the `-sha1` option since __fciv.exe__ uses md5 by default. More information [here](http://support2.microsoft.com/kb/889768).
