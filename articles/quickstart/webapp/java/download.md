To run the sample follow these steps:

1) Set the **Allowed Callback URLs** in the [Application Settings](${manage_url}/#/applications/${account.clientId}/settings) to:
```text
http://localhost:3000/callback
```

2) Set the **Allowed Logout URLs** in the [Application Settings](${manage_url}/#/applications/${account.clientId}/settings) to:
```text
http://localhost:3000/login
```

3) Make sure [Java](http://www.oracle.com/technetwork/java/javase/downloads/) is installed and execute the following commands in the sample's directory:

```bash
# In Linux / macOS
./gradlew clean appRun
# In Windows
gradlew clean appRun
```

You can also run it from a [Docker](https://www.docker.com) image with the following commands:

```bash
# In Linux / macOS
sh exec.sh
# In Windows' Powershell
./exec.ps1
```