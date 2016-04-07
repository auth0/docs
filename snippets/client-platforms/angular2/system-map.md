```html
  <!-- index.html -->
  
  <script>
    //configure system loader
    System.config({
      defaultJSExtensions: true,
      packages: {
        "/angular2-jwt": {
          "defaultExtension": "js"
        }
      },
      map: {
        "angular2-jwt": "node_modules/angular2-jwt/angular2-jwt"
      }
    });
  </script>
```
