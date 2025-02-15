To run the sample follow these steps:

1) Set the **Allowed Callback URLs** in the <a href="$manage_url/#/applications/$account.clientId/settings" target="_blank">Application Settings</a> to:
```text
http://localhost:3000/callback
```

2) Set the **Allowed Logout URLs** in the <a href="$manage_url/#/applications/$account.clientId/settings" target="_blank">Application Settings</a> to:
```text
http://localhost:3000/login
```

3) Make sure <a href="http://www.oracle.com/technetwork/java/javase/downloads/" target="_blank">Java</a> is installed and execute the following commands in the sample's directory:

```bash
# In Linux / macOS
./gradlew clean appRun
# In Windows
gradlew clean appRun
```

You can also run it from a <a href="https://www.docker.com" target="_blank">Docker</a> image with the following commands:

```bash
# In Linux / macOS
sh exec.sh
# In Windows' Powershell
./exec.ps1
```