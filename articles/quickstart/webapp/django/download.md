To run it from the command line:

```bash
pip install -r requirements.txt
python manage.py migrate 
python manage.py runserver 3000
```

The example includes a [Docker](https://www.docker.com) image ready to run with the following command:

```bash
# In Linux / OSX
sh exec.sh

# In Windows' Powershell
./exec.ps1
```