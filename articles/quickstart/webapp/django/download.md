To run the sample follow these steps:

1) Set the **Callback URL** in the [Application Settings](${manage_url}/#/applications/${account.clientId}/settings) to:

```text
http://localhost:3000/complete/auth0
```

2) Make sure [Python](https://www.python.org/downloads/) is installed and execute the following commands in the sample's directory:

```bash
pip install -r requirements.txt
python manage.py migrate 
python manage.py runserver 3000
```

You can also run it from a [Docker](https://www.docker.com) image with the following commands:

```bash
# In Linux / macOS
sh exec.sh
# In Windows' Powershell
./exec.ps1
```