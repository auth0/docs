---
name: settings.json Sample
language: json
---
    
```json
{
  "rendering_mode": "advanced",
  "context_configuration": [
    "screen.texts"
  ],
  "default_head_tags_disabled": false,
  "head_tags": [
    {
      "attributes": {
        "async": true,
        "defer": true,
        "integrity": [
          "ASSET_SHA"
        ],
        "src": "http://127.0.0.1:8080/index.js"
      },
      "tag": "script"
    },
    {
      "attributes": {
        "href": "http://127.0.0.1:8080/index.css",
        "rel": "stylesheet"
      },
      "tag": "link"
    }
  ]
}
```
