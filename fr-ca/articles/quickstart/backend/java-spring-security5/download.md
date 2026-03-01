The sample can be run from the command line as follows:

Linux / macOS:
```bash
./gradlew clean bootRun
```

Windows:
```bash
gradlew.bat clean bootRun
```

The application will be served from `http://localhost:3010/`.

The sample includes a [Docker](https://www.docker.com) image ready to run with the following command:

```bash
# Linux / macOs
sh exec.sh
```

```bash
# Windows
./exec.ps1
```

The application will be served from `http://localhost:3010/`, just as if running with Gradle.