To run the sample follow these steps:

1) Set the **Allowed Callback URLs** in the <a href="$manage_url/#/applications/$account.clientId/settings" target="_blank" rel="noreferrer">Application Settings</a> to:

```text
http://localhost:3000/callback
```

2) Set the **Allowed Logout URLs** in the <a href="$manage_url/#/applications/$account.clientId/settings" target="_blank" rel="noreferrer">Application Settings</a> to:
```text
http://localhost:3000
```

3) Make sure <a href="https://www.python.org/downloads/" target="_blank" rel="noreferrer">Python</a> is installed and execute the following commands in the sample's directory:
```bash
pip install -r requirements.txt
python3 server.py
```

You can also run it from a <a href="https://www.docker.com" target="_blank" rel="noreferrer">Docker</a> image with the following commands:

```bash
# In Linux / macOS
sh exec.sh
# In Windows' Powershell
./exec.ps1
```
