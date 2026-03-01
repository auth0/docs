---
name: webappexample/settings.py
language: python
---

<!-- markdownlint-disable MD041 -->

```python
import os
from pathlib import Path
from dotenv import load_dotenv, find_dotenv

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent
TEMPLATE_DIR = os.path.join(BASE_DIR, "webappexample", "templates")

# ... other settings ...

TEMPLATES = [
    {
        # Leave other lines as they are; we're just updating `DIRS`.
        "DIRS": [TEMPLATE_DIR],
    },
]

# ... other settings ...

# Load environment definition file
ENV_FILE = find_dotenv()
if ENV_FILE:
    load_dotenv(ENV_FILE)

# Load Auth0 application settings into memory
AUTH0_DOMAIN = os.environ.get("AUTH0_DOMAIN")
AUTH0_CLIENT_ID = os.environ.get("AUTH0_CLIENT_ID")
AUTH0_CLIENT_SECRET = os.environ.get("AUTH0_CLIENT_SECRET")
```
