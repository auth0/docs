# Checking the shasum of an update package

To prevent transmission or storage corruption every patch package will be provided with a SHA-1 checksum.

To check the integrity of the downloaded package, use the following command:

### Linux

```
shasum myauth0.xxxx.tar.gz
```

where xxxx is the build number.

For example: 

```
shasum myauth0.1234.tar.gz
```

The output from this command will be the shasum of the downloaded package. You should compare the number displayed by the shasum command with the shasum provided with the patch to make sure they are the same.

### Windows

A shasum tool for Windows can be obtained from:

[http://www.microsoft.com/en-us/download/details.aspx?id=11533](http://www.microsoft.com/en-us/download/details.aspx?id=11533)

Usage:

```
fciv.exe -sha1 myauth0.xxxx.tar.gz
```

where xxxx is the build number.

You must include the `-sha1` option since __fciv.exe__ uses md5 by default.