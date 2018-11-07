To run the sample follow these steps:

1) Set the **Callback URL** in the [Application Settings](${manage_url}/#/applications/${account.clientId}/settings) to:

```text
http://localhost:9000/callback
```

2) Make sure [Scala](https://www.scala-lang.org/download/) is installed and execute the following commands in the sample's directory:

```bash
sbt run
```

You can also run it from a [Docker](https://www.docker.com) image with the following commands:

```bash
# In Linux / macOS
sh exec.sh
# In Windows' Powershell
./exec.ps1
```