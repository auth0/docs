To run it from the command line:

```bash
go get "github.com/gorilla/mux"
go get "gopkg.in/square/go-jose.v2"
go get "github.com/auth0-community/go-auth0"
go get "github.com/joho/godotenv"

go run main.go server.go
```

To run it from the docker image:

```bash
# In Linux / OSX
sh exec.sh

# In Windows' Powershell
./exec.ps1
```