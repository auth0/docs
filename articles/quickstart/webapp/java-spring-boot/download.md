<!-- markdownlint-disable MD031 MD041 -->

To run the sample follow these steps:

1) Set the **Allowed Callback URLs** in the <a href="$manage_url/#/applications/$account.clientId/settings" target="_blank" rel="noreferrer">Application Settings</a> to:
```text
http://localhost:3000/login/oauth2/code/auth0
```

2) Set the **Allowed Logout URLs** in the <a href="$manage_url/#/applications/$account.clientId/settings" target="_blank" rel="noreferrer">Application Settings</a> to:
```text
http://localhost:3000/
```

3) Make sure <a href="http://www.oracle.com/technetwork/java/javase/downloads/" target="_blank" rel="noreferrer">Java</a> is installed and execute the following commands in the sample's directory:

```bash
# In Linux / macOS
./gradlew clean bootRun
# In Windows
gradlew clean bootRun
```

You can also run it from a <a href="https://www.docker.com" target="_blank" rel="noreferrer">Docker</a> image with the following commands:

```bash
# In Linux / macOS
sh exec.sh
# In Windows' Powershell
./exec.ps1
```